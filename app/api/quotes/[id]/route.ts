import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
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
    
    // Return limited info for customers (no admin notes)
    return NextResponse.json({
      id: quote.id,
      status: quote.status,
      customerName: quote.customerName,
      eventDate: quote.eventDate,
      eventEndDate: quote.eventEndDate,
      eventLocation: quote.eventLocation,
      eventType: quote.eventType,
      guestCount: quote.guestCount,
      items: quote.items.map((item) => ({
        productName: item.productName,
        category: item.category,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      })),
      estimatedTotal: quote.estimatedTotal,
      finalTotal: quote.finalTotal,
      depositAmount: quote.depositAmount,
      depositPaid: quote.depositPaid,
      quotedAt: quote.quotedAt,
      confirmedAt: quote.confirmedAt,
      createdAt: quote.createdAt,
    });
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json(
      { error: "Erro ao carregar orçamento" },
      { status: 500 }
    );
  }
}

// Customer approves the quote
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const quote = await prisma.quoteRequest.findUnique({
      where: { id },
    });
    
    if (!quote) {
      return NextResponse.json(
        { error: "Orçamento não encontrado" },
        { status: 404 }
      );
    }
    
    // Only allow approval if quote has been sent (status = quoted)
    if (body.action === "approve" && quote.status === "quoted") {
      const updatedQuote = await prisma.quoteRequest.update({
        where: { id },
        data: {
          status: "approved",
        },
      });
      
      // TODO: Send email notification to admin about approval
      
      return NextResponse.json({
        success: true,
        message: "Orçamento aprovado! Receberá instruções para pagamento por email.",
        status: updatedQuote.status,
      });
    }
    
    return NextResponse.json(
      { error: "Ação não permitida" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating quote:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar orçamento" },
      { status: 500 }
    );
  }
}
