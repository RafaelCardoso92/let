import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    
    const stocks = await prisma.productStock.findMany({
      include: {
        reservations: {
          where: { status: "reserved" },
          orderBy: { startDate: "asc" },
        },
      },
      orderBy: { productName: "asc" },
    });
    
    return NextResponse.json(stocks);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao carregar stock" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    
    const body = await request.json();
    
    // Upsert stock (create or update)
    const stock = await prisma.productStock.upsert({
      where: { productId: body.productId },
      update: {
        productName: body.productName,
        totalStock: body.totalStock,
      },
      create: {
        productId: body.productId,
        productName: body.productName,
        totalStock: body.totalStock,
      },
    });
    
    return NextResponse.json(stock);
  } catch (error) {
    console.error("Error updating stock:", error);
    return NextResponse.json({ error: "Erro ao atualizar stock" }, { status: 500 });
  }
}
