import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventType = searchParams.get("eventType");
    const style = searchParams.get("style");
    const colorScheme = searchParams.get("colorScheme");
    const featured = searchParams.get("featured") === "true";
    
    const where: any = { published: true };
    
    if (eventType) where.eventType = eventType;
    if (style) where.style = style;
    if (colorScheme) where.colorScheme = colorScheme;
    if (featured) where.featured = true;
    
    const posts = await prisma.inspirationPost.findMany({
      where,
      include: {
        images: {
          orderBy: { order: "asc" },
          take: 1, // Just first image for grid
        },
        _count: {
          select: { products: true },
        },
      },
      orderBy: [
        { featured: "desc" },
        { createdAt: "desc" },
      ],
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching inspiration:", error);
    return NextResponse.json(
      { error: "Erro ao carregar galeria" },
      { status: 500 }
    );
  }
}
