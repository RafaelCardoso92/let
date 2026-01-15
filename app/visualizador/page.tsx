"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Download, 
  ShoppingBag, 
  Circle,
  Square,
  RectangleHorizontal,
  Users,
  Check,
  Sparkles,
  RotateCcw,
  User,
  X
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  category: string;
}

interface PlaceSetting {
  guestName: string;
  plate: Product | null;
  cutlery: Product | null;
  glass: Product | null;
  napkin: Product | null;
}

type TableShape = "round" | "rectangular" | "oval" | "square";
type TableSize = "small" | "medium" | "large";

const tableSizes: Record<TableSize, { label: string; guests: number }> = {
  small: { label: "Pequena", guests: 4 },
  medium: { label: "Média", guests: 6 },
  large: { label: "Grande", guests: 10 },
};

const tableShapes: Record<TableShape, { label: string; icon: any }> = {
  round: { label: "Redonda", icon: Circle },
  square: { label: "Quadrada", icon: Square },
  rectangular: { label: "Retangular", icon: RectangleHorizontal },
  oval: { label: "Oval", icon: Circle },
};

const categories = [
  { key: "plates", label: "Pratos", slot: "plate" as const },
  { key: "cutlery", label: "Talheres", slot: "cutlery" as const },
  { key: "glassware", label: "Copos", slot: "glass" as const },
  { key: "linens", label: "Guardanapos", slot: "napkin" as const },
];

export default function VisualizadorPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Table configuration
  const [tableShape, setTableShape] = useState<TableShape>("round");
  const [tableSize, setTableSize] = useState<TableSize>("medium");
  
  // Products
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("plates");
  
  // Selected products for bulk apply
  const [selectedItems, setSelectedItems] = useState<Record<string, Product | null>>({
    plate: null,
    cutlery: null,
    glass: null,
    napkin: null,
  });
  
  // Place settings with guest names
  const [settings, setSettings] = useState<PlaceSetting[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<number | null>(null);

  const numGuests = tableSizes[tableSize].guests;

  // Initialize settings when table size changes
  useEffect(() => {
    setSettings(prev => {
      const newSettings: PlaceSetting[] = [];
      for (let i = 0; i < numGuests; i++) {
        newSettings.push(prev[i] || { 
          guestName: "", 
          plate: null, 
          cutlery: null, 
          glass: null, 
          napkin: null 
        });
      }
      return newSettings;
    });
    setSelectedSeat(null);
  }, [numGuests]);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const getProductsByCategory = (category: string) => {
    return products.filter((p) => p.category === category);
  };

  const getCurrentCategorySlot = () => {
    return categories.find(c => c.key === activeCategory)?.slot || "plate";
  };

  // Select a product for bulk apply
  const selectProductForBulk = (product: Product) => {
    const slot = getCurrentCategorySlot();
    setSelectedItems(prev => ({
      ...prev,
      [slot]: prev[slot]?._id === product._id ? null : product
    }));
  };

  // Apply to specific seat
  const applyToSeat = (seatIndex: number, product: Product) => {
    const slot = getCurrentCategorySlot();
    setSettings(prev => prev.map((s, i) => 
      i === seatIndex ? { ...s, [slot]: product } : s
    ));
  };

  // Apply selected items to all seats
  const applyToAllSeats = () => {
    setSettings(prev => prev.map(s => ({
      ...s,
      plate: selectedItems.plate || s.plate,
      cutlery: selectedItems.cutlery || s.cutlery,
      glass: selectedItems.glass || s.glass,
      napkin: selectedItems.napkin || s.napkin,
    })));
  };

  // Remove item from seat
  const removeFromSeat = (seatIndex: number, slot: string) => {
    setSettings(prev => prev.map((s, i) => 
      i === seatIndex ? { ...s, [slot]: null } : s
    ));
  };

  // Update guest name
  const updateGuestName = (seatIndex: number, name: string) => {
    setSettings(prev => prev.map((s, i) => 
      i === seatIndex ? { ...s, guestName: name } : s
    ));
  };

  const clearAll = () => {
    setSelectedItems({ plate: null, cutlery: null, glass: null, napkin: null });
    setSettings(prev => prev.map(s => ({ 
      ...s, 
      plate: null, 
      cutlery: null, 
      glass: null, 
      napkin: null 
    })));
    setSelectedSeat(null);
  };

  const handleExport = async () => {
    if (!canvasRef.current) return;
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = "mesa-letrent.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error exporting:", error);
    }
  };

  const handleAddToQuote = () => {
    const productCounts: Record<string, { product: Product; quantity: number }> = {};
    
    settings.forEach((setting) => {
      [setting.plate, setting.cutlery, setting.glass, setting.napkin].forEach((product) => {
        if (product) {
          if (productCounts[product._id]) {
            productCounts[product._id].quantity++;
          } else {
            productCounts[product._id] = { product, quantity: 1 };
          }
        }
      });
    });

    const cartItems = Object.values(productCounts).map(({ product, quantity }) => ({
      productId: product._id,
      productName: product.name,
      category: product.category,
      quantity,
    }));

    if (cartItems.length === 0) {
      alert("Adicione produtos à mesa primeiro");
      return;
    }

    sessionStorage.setItem("visualizerCart", JSON.stringify(cartItems));
    router.push("/orcamento?from=visualizer");
  };

  const hasSelectedItems = Object.values(selectedItems).some((item) => item !== null);
  const hasAppliedItems = settings.some((s) => s.plate || s.cutlery || s.glass || s.napkin);

  // Calculate seat positions based on table shape
  const getSeatPositions = () => {
    const positions: { x: number; y: number }[] = [];
    
    if (tableShape === "round") {
      for (let i = 0; i < numGuests; i++) {
        const angle = (i * 360) / numGuests - 90;
        const rad = (angle * Math.PI) / 180;
        positions.push({
          x: 50 + 38 * Math.cos(rad),
          y: 50 + 38 * Math.sin(rad),
        });
      }
    } else if (tableShape === "oval") {
      for (let i = 0; i < numGuests; i++) {
        const angle = (i * 360) / numGuests - 90;
        const rad = (angle * Math.PI) / 180;
        positions.push({
          x: 50 + 42 * Math.cos(rad),
          y: 50 + 35 * Math.sin(rad),
        });
      }
    } else if (tableShape === "rectangular") {
      const topCount = Math.ceil(numGuests / 2);
      const bottomCount = numGuests - topCount;
      
      // Top row
      for (let i = 0; i < topCount; i++) {
        const spacing = 70 / Math.max(topCount - 1, 1);
        positions.push({
          x: 15 + spacing * i,
          y: 18,
        });
      }
      // Bottom row
      for (let i = 0; i < bottomCount; i++) {
        const spacing = 70 / Math.max(bottomCount - 1, 1);
        positions.push({
          x: 15 + spacing * i,
          y: 82,
        });
      }
    } else if (tableShape === "square") {
      const perSide = Math.ceil(numGuests / 4);
      const remainder = numGuests % 4;
      
      const sidesCount = [
        perSide + (remainder > 0 ? 1 : 0), // top
        perSide + (remainder > 1 ? 1 : 0), // right
        perSide + (remainder > 2 ? 1 : 0), // bottom
        perSide,                            // left
      ].map(c => Math.min(c, Math.ceil(numGuests / 4) + 1));
      
      // Distribute evenly
      let remaining = numGuests;
      const distribution = [0, 0, 0, 0];
      for (let side = 0; remaining > 0; side = (side + 1) % 4) {
        distribution[side]++;
        remaining--;
      }
      
      let idx = 0;
      
      // Top side (left to right)
      for (let i = 0; i < distribution[0]; i++) {
        const count = distribution[0];
        const spacing = count > 1 ? 50 / (count - 1) : 0;
        positions.push({ x: 25 + spacing * i, y: 15 });
      }
      
      // Right side (top to bottom)
      for (let i = 0; i < distribution[1]; i++) {
        const count = distribution[1];
        const spacing = count > 1 ? 50 / (count - 1) : 0;
        positions.push({ x: 85, y: 25 + spacing * i });
      }
      
      // Bottom side (right to left)
      for (let i = 0; i < distribution[2]; i++) {
        const count = distribution[2];
        const spacing = count > 1 ? 50 / (count - 1) : 0;
        positions.push({ x: 75 - spacing * i, y: 85 });
      }
      
      // Left side (bottom to top)
      for (let i = 0; i < distribution[3]; i++) {
        const count = distribution[3];
        const spacing = count > 1 ? 50 / (count - 1) : 0;
        positions.push({ x: 15, y: 75 - spacing * i });
      }
    }
    
    return positions;
  };

  const categoryProducts = getProductsByCategory(activeCategory);

  return (
    <>
      <Hero
        title="Visualizador de Mesa"
        subtitle="Monte a sua mesa perfeita - escolha a forma, selecione os produtos e personalize cada lugar"
        backgroundImage="/images/hero/hero-2.jpg"
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-6">
            
            {/* Left Panel - Table & Products */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Table Shape & Size */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Mesa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {(Object.keys(tableShapes) as TableShape[]).map((shape) => {
                      const { label, icon: Icon } = tableShapes[shape];
                      return (
                        <Button
                          key={shape}
                          variant={tableShape === shape ? "default" : "outline"}
                          size="sm"
                          className="flex-col h-auto py-2"
                          onClick={() => setTableShape(shape)}
                        >
                          <Icon className={"h-4 w-4 mb-1 " + (shape === "oval" ? "scale-x-125" : "")} />
                          <span className="text-[10px]">{label}</span>
                        </Button>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(tableSizes) as TableSize[]).map((size) => {
                      const { label, guests } = tableSizes[size];
                      return (
                        <Button
                          key={size}
                          variant={tableSize === size ? "default" : "outline"}
                          size="sm"
                          className="flex-col h-auto py-2"
                          onClick={() => setTableSize(size)}
                        >
                          <Users className="h-4 w-4 mb-1" />
                          <span className="text-[10px]">{guests} lugares</span>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Product Selection */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Produtos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Category Tabs */}
                  <div className="flex gap-1 flex-wrap">
                    {categories.map((cat) => (
                      <Button
                        key={cat.key}
                        variant={activeCategory === cat.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveCategory(cat.key)}
                        className="text-xs"
                      >
                        {cat.label}
                      </Button>
                    ))}
                  </div>

                  {/* Product List */}
                  <div className="space-y-1 max-h-48 overflow-y-auto border rounded-lg p-2">
                    {categoryProducts.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Nenhum produto disponível
                      </p>
                    ) : (
                      categoryProducts.map((product) => {
                        const slot = getCurrentCategorySlot();
                        const isSelected = selectedItems[slot]?._id === product._id;
                        return (
                          <button
                            key={product._id}
                            onClick={() => selectProductForBulk(product)}
                            className={"w-full text-left px-3 py-2 rounded-md transition-all flex items-center justify-between text-sm " +
                              (isSelected
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted")
                            }
                          >
                            <span>{product.name}</span>
                            {isSelected && <Check className="h-4 w-4" />}
                          </button>
                        );
                      })
                    )}
                  </div>

                  {/* Quick Apply */}
                  <div className="space-y-2 pt-2 border-t">
                    {hasSelectedItems && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {Object.entries(selectedItems).map(([slot, product]) => 
                          product && (
                            <Badge key={slot} variant="secondary" className="text-xs">
                              {product.name}
                            </Badge>
                          )
                        )}
                      </div>
                    )}
                    <Button 
                      className="w-full" 
                      size="sm"
                      onClick={applyToAllSeats}
                      disabled={!hasSelectedItems}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Aplicar a Todos
                    </Button>
                    
                    {selectedSeat !== null && (
                      <p className="text-xs text-center text-muted-foreground">
                        Ou clique num produto para aplicar ao <strong>Lugar {selectedSeat + 1}</strong>
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Seat Editor */}
              {selectedSeat !== null && settings[selectedSeat] && (
                <Card className="border-primary">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Lugar {selectedSeat + 1}
                      </CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedSeat(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Nome do convidado</label>
                      <Input
                        placeholder="Ex: Maria Silva"
                        value={settings[selectedSeat].guestName}
                        onChange={(e) => updateGuestName(selectedSeat, e.target.value)}
                        className="h-8 text-sm"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Produtos neste lugar:</label>
                      {["plate", "cutlery", "glass", "napkin"].map((slot) => {
                        const product = settings[selectedSeat][slot as keyof PlaceSetting];
                        const labels: Record<string, string> = {
                          plate: "Prato",
                          cutlery: "Talheres", 
                          glass: "Copo",
                          napkin: "Guardanapo"
                        };
                        if (typeof product === "string") return null;
                        return (
                          <div key={slot} className="flex items-center justify-between text-xs py-1">
                            <span className="text-muted-foreground">{labels[slot]}:</span>
                            {product ? (
                              <div className="flex items-center gap-1">
                                <span>{product.name}</span>
                                <button 
                                  onClick={() => removeFromSeat(selectedSeat, slot)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ) : (
                              <span className="text-muted-foreground/50">-</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => {
                        const slot = getCurrentCategorySlot();
                        const product = selectedItems[slot];
                        if (product) applyToSeat(selectedSeat, product);
                      }}
                      disabled={!selectedItems[getCurrentCategorySlot()]}
                    >
                      Aplicar {categories.find(c => c.key === activeCategory)?.label} Selecionado
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={clearAll}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Limpar
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={handleExport} disabled={!hasAppliedItems}>
                  <Download className="h-4 w-4 mr-1" />
                  Exportar
                </Button>
              </div>
            </div>

            {/* Right Panel - Table Preview */}
            <div className="lg:col-span-3 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Pré-visualização</CardTitle>
                    <Button size="sm" onClick={handleAddToQuote} disabled={!hasAppliedItems}>
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Pedir Orçamento
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div 
                    ref={canvasRef}
                    className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-xl p-4 aspect-square relative"
                  >
                    {/* Table */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div 
                        className={
                          "bg-amber-800/25 shadow-inner border-4 border-amber-900/20 flex items-center justify-center " +
                          (tableShape === "round" ? "rounded-full w-[40%] h-[40%]" :
                           tableShape === "oval" ? "rounded-full w-[50%] h-[35%]" :
                           tableShape === "square" ? "rounded-lg w-[38%] h-[38%]" :
                           "rounded-lg w-[55%] h-[28%]")
                        }
                      >
                        <span className="text-amber-900/40 text-xs font-medium">
                          {tableShapes[tableShape].label}
                        </span>
                      </div>
                    </div>

                    {/* Seats */}
                    {getSeatPositions().map((pos, idx) => {
                      const setting = settings[idx];
                      const hasItems = setting && (setting.plate || setting.cutlery || setting.glass || setting.napkin);
                      const isSelected = selectedSeat === idx;
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedSeat(isSelected ? null : idx)}
                          className={"absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 " +
                            (isSelected ? "scale-110 z-10" : "hover:scale-105")
                          }
                          style={{ left: pos.x + "%", top: pos.y + "%" }}
                        >
                          <div className={"w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center text-xs transition-all " +
                            (isSelected 
                              ? "bg-primary text-primary-foreground border-primary shadow-lg" 
                              : hasItems 
                                ? "bg-white shadow-md border-primary/50" 
                                : "bg-white/90 border-dashed border-gray-300 hover:border-gray-400")
                          }>
                            {setting?.guestName ? (
                              <span className="font-medium text-[10px] truncate max-w-[50px]">{setting.guestName}</span>
                            ) : (
                              <>
                                <span className="text-[9px] opacity-60">Lugar</span>
                                <span className="font-bold text-sm">{idx + 1}</span>
                              </>
                            )}
                            {hasItems && !isSelected && (
                              <div className="flex gap-0.5 mt-1">
                                {setting?.plate && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                                {setting?.cutlery && <div className="w-2 h-2 rounded-full bg-gray-500" />}
                                {setting?.glass && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                                {setting?.napkin && <div className="w-2 h-2 rounded-full bg-rose-500" />}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}

                    {/* Instructions */}
                    {!hasAppliedItems && !selectedSeat && (
                      <div className="absolute bottom-4 left-0 right-0 text-center">
                        <span className="bg-white/90 rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
                          Clique num lugar para personalizar ou selecione produtos e aplique a todos
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Legend & Summary */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-xs font-medium mb-2">Legenda</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <span>Prato</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-500" />
                        <span>Talheres</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span>Copo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500" />
                        <span>Guardanapo</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <p className="text-xs font-medium mb-2">Resumo</p>
                    {hasAppliedItems ? (
                      <div className="space-y-1 text-xs">
                        {(() => {
                          const counts: Record<string, number> = {};
                          settings.forEach(s => {
                            [s.plate, s.cutlery, s.glass, s.napkin].forEach(p => {
                              if (p && typeof p !== "string") {
                                counts[p.name] = (counts[p.name] || 0) + 1;
                              }
                            });
                          });
                          return Object.entries(counts).map(([name, qty]) => (
                            <div key={name} className="flex justify-between">
                              <span className="truncate max-w-[100px]">{name}</span>
                              <span className="text-muted-foreground">x{qty}</span>
                            </div>
                          ));
                        })()}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">Nenhum produto</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
