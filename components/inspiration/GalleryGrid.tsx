"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Heart, Package } from "lucide-react";

interface Post {
  id: string;
  title: string;
  eventType: string;
  style: string | null;
  colorScheme: string | null;
  featured: boolean;
  images: { url: string; alt: string | null }[];
  _count: { products: number };
}

interface GalleryGridProps {
  posts: Post[];
}

const eventTypeLabels: Record<string, string> = {
  wedding: "Casamento",
  corporate: "Corporativo",
  birthday: "Aniversário",
  baptism: "Batizado",
  communion: "Comunhão",
  party: "Festa",
};

const styleLabels: Record<string, string> = {
  rustic: "Rústico",
  modern: "Moderno",
  classic: "Clássico",
  bohemian: "Boémio",
  minimalist: "Minimalista",
};

export function GalleryGrid({ posts }: GalleryGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Nenhuma inspiração encontrada.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link key={post.id} href={`/inspiracao/${post.id}`}>
          <Card className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300">
            <div className="aspect-[4/3] relative bg-muted">
              {post.images[0] ? (
                <Image
                  src={post.images[0].url}
                  alt={post.images[0].alt || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Heart className="h-12 w-12 text-muted-foreground/30" />
                </div>
              )}
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium">Ver Detalhes</span>
              </div>
              
              {/* Featured badge */}
              {post.featured && (
                <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Destaque
                </div>
              )}
              
              {/* Product count */}
              {post._count.products > 0 && (
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  {post._count.products} produtos
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="bg-muted px-2 py-1 rounded">
                  {eventTypeLabels[post.eventType] || post.eventType}
                </span>
                {post.style && (
                  <span className="bg-muted px-2 py-1 rounded">
                    {styleLabels[post.style] || post.style}
                  </span>
                )}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
