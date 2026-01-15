"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag } from "lucide-react";

interface CartItem {
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  basePrice?: number;
  image?: string;
}

interface QuoteCartProps {
  items: CartItem[];
  onRemove: (productId: string) => void;
  onClear: () => void;
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

export function QuoteCart({ items, onRemove, onClear }: QuoteCartProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>O seu carrinho está vazio</p>
            <p className="text-sm mt-1">Selecione produtos para adicionar ao orçamento</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Carrinho ({totalItems} {totalItems === 1 ? "item" : "itens"})
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-muted-foreground hover:text-destructive"
          >
            Limpar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between py-2 border-b last:border-0"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.productName}</p>
              <p className="text-xs text-muted-foreground">
                {categoryLabels[item.category] || item.category} • Qtd: {item.quantity}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(item.productId)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <div className="pt-3 border-t">
          <p className="text-sm text-muted-foreground text-center">
            Os preços serão confirmados pela nossa equipa após análise do pedido.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
