import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    
    const { id } = await params;
    
    const quote = await prisma.quoteRequest.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
    
    if (!quote) {
      return NextResponse.json(
        { error: "Orçamento não encontrado" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json(
      { error: "Erro ao carregar orçamento" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    
    const { id } = await params;
    const body = await request.json();
    
    // Update quote details
    const updateData: any = {};
    
    if (body.status) updateData.status = body.status;
    if (body.finalTotal !== undefined) updateData.finalTotal = body.finalTotal;
    if (body.depositAmount !== undefined) updateData.depositAmount = body.depositAmount;
    if (body.depositPaid !== undefined) updateData.depositPaid = body.depositPaid;
    if (body.adminNotes !== undefined) updateData.adminNotes = body.adminNotes;
    if (body.paymentRef !== undefined) updateData.paymentRef = body.paymentRef;
    if (body.paymentMethod !== undefined) updateData.paymentMethod = body.paymentMethod;
    
    // Set quotedAt when status changes to quoted
    if (body.status === "quoted") {
      updateData.quotedAt = new Date();
    }
    
    // Set confirmedAt when status changes to confirmed
    if (body.status === "confirmed") {
      updateData.confirmedAt = new Date();
    }
    
    const quote = await prisma.quoteRequest.update({
      where: { id },
      data: updateData,
      include: {
        items: true,
      },
    });
    
    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error updating quote:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar orçamento" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    
    const { id } = await params;
    
    await prisma.quoteRequest.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting quote:", error);
    return NextResponse.json(
      { error: "Erro ao eliminar orçamento" },
      { status: 500 }
    );
  }
}
