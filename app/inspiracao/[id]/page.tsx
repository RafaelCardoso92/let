"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Calendar, 
  Loader2,
  ChevronLeft,
  ChevronRight,
  Package
} from "lucide-react";

interface InspirationImage {
  id: string;
  url: string;
  alt: string | null;
}

interface InspirationProduct {
  id: string;
  productId: string;
  productName: string;
  quantity: number | null;
}

interface Post {
  id: string;
  title: string;
  description: string | null;
  eventType: string;
  style: string | null;
  colorScheme: string | null;
  eventDate: string | null;
  images: InspirationImage[];
  products: InspirationProduct[];
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

export default function InspirationPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/inspiration/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleGetThisLook = () => {
    if (!post) return;
    
    // Store products in sessionStorage to pass to quote form
    const cartItems = post.products.map((prod) => ({
      productId: prod.productId,
      productName: prod.productName,
      category: "",
      quantity: prod.quantity || 1,
    }));
    
    sessionStorage.setItem("inspirationCart", JSON.stringify(cartItems));
    router.push("/orcamento?from=inspiration");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md text-center p-8">
          <p className="text-muted-foreground mb-4">Post não encontrado</p>
          <Button asChild>
            <Link href="/inspiracao">Voltar à Galeria</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back button */}
        <Link 
          href="/inspiracao" 
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar à Galeria
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Image gallery */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-muted mb-4">
              {post.images[currentImage] && (
                <Image
                  src={post.images[currentImage].url}
                  alt={post.images[currentImage].alt || post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              )}
              
              {/* Navigation arrows */}
              {post.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((prev) => (prev - 1 + post.images.length) % post.images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setCurrentImage((prev) => (prev + 1) % post.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {post.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {post.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentImage(idx)}
                    className={"relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all " +
                      (idx === currentImage ? "border-primary" : "border-transparent opacity-70 hover:opacity-100")
                    }
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || ""}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {eventTypeLabels[post.eventType] || post.eventType}
                </span>
                {post.style && (
                  <span className="bg-muted px-3 py-1 rounded-full text-sm">
                    {styleLabels[post.style] || post.style}
                  </span>
                )}
              </div>
              
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
              
              {post.eventDate && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.eventDate).toLocaleDateString("pt-PT", { 
                    year: "numeric", 
                    month: "long" 
                  })}
                </p>
              )}
            </div>

            {/* Products used */}
            {post.products.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Produtos Utilizados
                  </h3>
                  <div className="space-y-3">
                    {post.products.map((prod) => (
                      <div key={prod.id} className="flex justify-between items-center text-sm">
                        <span>{prod.productName}</span>
                        {prod.quantity && (
                          <span className="text-muted-foreground">x{prod.quantity}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Get this look button */}
            {post.products.length > 0 && (
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleGetThisLook}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Quero Este Look
              </Button>
            )}

            <p className="text-xs text-muted-foreground text-center">
              Ao clicar, os produtos serão adicionados ao seu pedido de orçamento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
