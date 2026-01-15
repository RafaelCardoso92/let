import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    
    const body = await request.json();
    const { stockId, quantity, startDate, endDate, quoteId } = body;
    
    const reservation = await prisma.stockReservation.create({
      data: {
        stockId,
        quantity,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        quoteId: quoteId || null,
        status: "reserved",
      },
    });
    
    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json({ error: "Erro ao criar reserva" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }
    
    await prisma.stockReservation.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao eliminar reserva" }, { status: 500 });
  }
}
