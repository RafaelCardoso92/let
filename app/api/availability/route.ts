import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");
    
    if (!dateStr) {
      return NextResponse.json({ error: "Date required" }, { status: 400 });
    }
    
    const date = new Date(dateStr);
    const endOfDay = new Date(dateStr);
    endOfDay.setHours(23, 59, 59, 999);
    
    // Get all products with stock
    const stocks = await prisma.productStock.findMany({
      include: {
        reservations: {
          where: {
            status: "reserved",
            startDate: { lte: endOfDay },
            endDate: { gte: date },
          },
        },
      },
    });
    
    // Calculate available quantity for each product
    const availability = stocks.map((stock) => {
      const reservedQty = stock.reservations.reduce((sum, r) => sum + r.quantity, 0);
      const available = stock.totalStock - reservedQty;
      
      return {
        productId: stock.productId,
        productName: stock.productName,
        totalStock: stock.totalStock,
        reserved: reservedQty,
        available: Math.max(0, available),
        status: available <= 0 ? "sold_out" : available <= stock.totalStock * 0.2 ? "low_stock" : "available",
      };
    });
    
    return NextResponse.json(availability);
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json({ error: "Erro ao carregar disponibilidade" }, { status: 500 });
  }
}
