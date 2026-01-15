import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// Update item prices and recalculate total
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    
    const { id: quoteId } = await params;
    const { items } = await request.json();
    
    // Update each item's price
    for (const item of items) {
      const totalPrice = item.unitPrice ? item.unitPrice * item.quantity : null;
      
      await prisma.quoteItem.update({
        where: { id: item.id },
        data: {
          unitPrice: item.unitPrice,
          totalPrice,
        },
      });
    }
    
    // Recalculate total
    const updatedItems = await prisma.quoteItem.findMany({
      where: { quoteId },
    });
    
    const finalTotal = updatedItems.reduce((sum, item) => {
      return sum + (item.totalPrice || 0);
    }, 0);
    
    // Update quote with new total
    const quote = await prisma.quoteRequest.update({
      where: { id: quoteId },
      data: { finalTotal },
      include: { items: true },
    });
    
    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error updating items:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar items" },
      { status: 500 }
    );
  }
}
