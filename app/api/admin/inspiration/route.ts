import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    
    const posts = await prisma.inspirationPost.findMany({
      include: {
        images: { orderBy: { order: "asc" } },
        products: true,
      },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Erro ao carregar posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    
    const body = await request.json();
    
    const post = await prisma.inspirationPost.create({
      data: {
        title: body.title,
        description: body.description,
        eventType: body.eventType,
        style: body.style,
        colorScheme: body.colorScheme,
        featured: body.featured || false,
        published: body.published !== false,
        eventDate: body.eventDate ? new Date(body.eventDate) : null,
        images: {
          create: (body.images || []).map((img: any, idx: number) => ({
            url: img.url,
            alt: img.alt,
            order: idx,
          })),
        },
        products: {
          create: (body.products || []).map((prod: any) => ({
            productId: prod.productId,
            productName: prod.productName,
            quantity: prod.quantity,
          })),
        },
      },
      include: {
        images: true,
        products: true,
      },
    });
    
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Erro ao criar post" }, { status: 500 });
  }
}
