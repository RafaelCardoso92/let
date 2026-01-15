"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/sections/hero";
import { GalleryGrid } from "@/components/inspiration/GalleryGrid";
import { FilterBar } from "@/components/inspiration/FilterBar";
import { Loader2 } from "lucide-react";

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

export default function InspiracaoPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    eventType: null as string | null,
    style: null as string | null,
    colorScheme: null as string | null,
  });

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.eventType) params.set("eventType", filters.eventType);
        if (filters.style) params.set("style", filters.style);
        if (filters.colorScheme) params.set("colorScheme", filters.colorScheme);
        
        const res = await fetch(`/api/inspiration?${params}`);
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [filters]);

  return (
    <>
      <Hero
        title="Galeria de Inspiração"
        subtitle="Descubra ideias para o seu evento. Veja como os nossos produtos transformam espaços em experiências memoráveis."
        backgroundImage="/images/hero/hero-2.jpg"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-background p-6 rounded-xl border">
                <h3 className="font-bold mb-4">Filtrar Por</h3>
                <FilterBar filters={filters} onChange={setFilters} />
              </div>
            </div>

            {/* Gallery */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <GalleryGrid posts={posts} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
