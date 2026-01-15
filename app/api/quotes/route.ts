import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schema for quote request
const quoteItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  category: z.string().optional(),
  quantity: z.number().min(1),
});

const quoteRequestSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(9),
  eventDate: z.string().transform((str) => new Date(str)),
  eventEndDate: z.string().optional().transform((str) => str ? new Date(str) : undefined),
  eventLocation: z.string().min(5),
  eventType: z.string().optional(),
  guestCount: z.number().optional(),
  notes: z.string().optional(),
  items: z.array(quoteItemSchema).min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = quoteRequestSchema.parse(body);
    
    // Calculate estimated total based on base prices
    let estimatedTotal = 0;
    const itemsWithEstimates = validatedData.items.map((item) => {
      // We don't have unit prices from Sanity in this request, 
      // the admin will set final prices
      return {
        productId: item.productId,
        productName: item.productName,
        category: item.category,
        quantity: item.quantity,
      };
    });
    
    // Create the quote request with items
    const quote = await prisma.quoteRequest.create({
      data: {
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        customerPhone: validatedData.customerPhone,
        eventDate: validatedData.eventDate,
        eventEndDate: validatedData.eventEndDate,
        eventLocation: validatedData.eventLocation,
        eventType: validatedData.eventType,
        guestCount: validatedData.guestCount,
        notes: validatedData.notes,
        estimatedTotal: estimatedTotal > 0 ? estimatedTotal : null,
        items: {
          create: itemsWithEstimates,
        },
      },
      include: {
        items: true,
      },
    });
    
    // TODO: Send email notification to admin
    
    return NextResponse.json({
      success: true,
      quoteId: quote.id,
      message: "Pedido de orçamento enviado com sucesso!",
    });
  } catch (error) {
    console.error("Error creating quote:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Erro ao criar pedido de orçamento" },
      { status: 500 }
    );
  }
}
