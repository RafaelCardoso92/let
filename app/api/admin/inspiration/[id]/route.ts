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
    
    const post = await prisma.inspirationPost.findUnique({
      where: { id },
      include: {
        images: { orderBy: { order: "asc" } },
        products: true,
      },
    });
    
    if (!post) {
      return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao carregar post" }, { status: 500 });
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
    
    // Update basic fields
    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.eventType !== undefined) updateData.eventType = body.eventType;
    if (body.style !== undefined) updateData.style = body.style;
    if (body.colorScheme !== undefined) updateData.colorScheme = body.colorScheme;
    if (body.featured !== undefined) updateData.featured = body.featured;
    if (body.published !== undefined) updateData.published = body.published;
    if (body.eventDate !== undefined) updateData.eventDate = body.eventDate ? new Date(body.eventDate) : null;
    
    // If images provided, replace all
    if (body.images) {
      await prisma.inspirationImage.deleteMany({ where: { postId: id } });
      updateData.images = {
        create: body.images.map((img: any, idx: number) => ({
          url: img.url,
          alt: img.alt,
          order: idx,
        })),
      };
    }
    
    // If products provided, replace all
    if (body.products) {
      await prisma.inspirationProduct.deleteMany({ where: { postId: id } });
      updateData.products = {
        create: body.products.map((prod: any) => ({
          productId: prod.productId,
          productName: prod.productName,
          quantity: prod.quantity,
        })),
      };
    }
    
    const post = await prisma.inspirationPost.update({
      where: { id },
      data: updateData,
      include: {
        images: { orderBy: { order: "asc" } },
        products: true,
      },
    });
    
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Erro ao atualizar post" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    
    const { id } = await params;
    
    await prisma.inspirationPost.delete({ where: { id } });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao eliminar post" }, { status: 500 });
  }
}
