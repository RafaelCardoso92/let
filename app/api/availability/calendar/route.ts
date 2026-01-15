import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month"); // YYYY-MM format
    
    if (!month) {
      return NextResponse.json({ error: "Month required" }, { status: 400 });
    }
    
    const [year, monthNum] = month.split("-").map(Number);
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 0, 23, 59, 59, 999);
    
    // Get all reservations for the month
    const reservations = await prisma.stockReservation.findMany({
      where: {
        status: "reserved",
        startDate: { lte: endDate },
        endDate: { gte: startDate },
      },
      include: {
        stock: true,
      },
    });
    
    // Get total stock
    const stocks = await prisma.productStock.findMany();
    const totalStock = stocks.reduce((sum, s) => sum + s.totalStock, 0);
    
    // Build calendar data
    const calendar: Record<string, { reservedItems: number; status: string }> = {};
    const daysInMonth = endDate.getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(monthNum).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayDate = new Date(year, monthNum - 1, day);
      const dayEnd = new Date(year, monthNum - 1, day, 23, 59, 59, 999);
      
      const dayReservations = reservations.filter((r) => {
        return r.startDate <= dayEnd && r.endDate >= dayDate;
      });
      
      const reservedItems = dayReservations.reduce((sum, r) => sum + r.quantity, 0);
      const utilizationRate = totalStock > 0 ? reservedItems / totalStock : 0;
      
      calendar[dateKey] = {
        reservedItems,
        status: utilizationRate > 0.8 ? "busy" : utilizationRate > 0.5 ? "moderate" : utilizationRate > 0 ? "light" : "free",
      };
    }
    
    return NextResponse.json(calendar);
  } catch (error) {
    console.error("Error fetching calendar:", error);
    return NextResponse.json({ error: "Erro ao carregar calendário" }, { status: 500 });
  }
}
