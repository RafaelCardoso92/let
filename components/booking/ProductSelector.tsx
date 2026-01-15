"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Package } from "lucide-react";
import Image from "next/image";
import type { Product } from "@/lib/sanity";

interface CartItem {
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  basePrice?: number;
  image?: string;
}

interface ProductSelectorProps {
  onCartChange: (items: CartItem[]) => void;
  cart: CartItem[];
}

const categoryLabels: Record<string, string> = {
  plates: "Pratos",
  cutlery: "Talheres",
  glassware: "Copos",
  furniture: "Mobiliário",
  linens: "Atoalhados",
  utensils: "Utensílios",
  lounge: "Lounge",
  decoration: "Decoração",
};

export function ProductSelector({ onCartChange, cart }: ProductSelectorProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const getQuantity = (productId: string) => {
    const item = cart.find((i) => i.productId === productId);
    return item?.quantity || 0;
  };

  const updateQuantity = (product: Product, delta: number) => {
    const currentQty = getQuantity(product._id);
    const newQty = Math.max(0, currentQty + delta);

    if (newQty === 0) {
      onCartChange(cart.filter((i) => i.productId !== product._id));
    } else {
      const existingItem = cart.find((i) => i.productId === product._id);
      if (existingItem) {
        onCartChange(
          cart.map((i) =>
            i.productId === product._id ? { ...i, quantity: newQty } : i
          )
        );
      } else {
        onCartChange([
          ...cart,
          {
            productId: product._id,
            productName: product.name,
            category: product.category,
            quantity: newQty,
            basePrice: product.basePrice,
            image: product.image?.asset?.url,
          },
        ]);
      }
    }
  };

  const setQuantity = (product: Product, qty: number) => {
    const newQty = Math.max(0, qty);
    if (newQty === 0) {
      onCartChange(cart.filter((i) => i.productId !== product._id));
    } else {
      const existingItem = cart.find((i) => i.productId === product._id);
      if (existingItem) {
        onCartChange(
          cart.map((i) =>
            i.productId === product._id ? { ...i, quantity: newQty } : i
          )
        );
      } else {
        onCartChange([
          ...cart,
          {
            productId: product._id,
            productName: product.name,
            category: product.category,
            quantity: newQty,
            basePrice: product.basePrice,
            image: product.image?.asset?.url,
          },
        ]);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          Todos
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
          >
            {categoryLabels[cat] || cat}
          </Button>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => {
          const qty = getQuantity(product._id);
          return (
            <Card
              key={product._id}
              className={"overflow-hidden transition-all " + (qty > 0 ? "ring-2 ring-primary" : "")}
            >
              <div className="aspect-square relative bg-muted">
                {product.image?.asset?.url ? (
                  <Image
                    src={product.image.asset.url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                )}
                {qty > 0 && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {qty}
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {categoryLabels[product.category] || product.category}
                </p>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(product, -1)}
                    disabled={qty === 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="0"
                    value={qty}
                    onChange={(e) => setQuantity(product, parseInt(e.target.value) || 0)}
                    className="h-8 w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(product, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Nenhum produto encontrado nesta categoria.
        </div>
      )}
    </div>
  );
}
