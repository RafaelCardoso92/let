"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/sections/hero";
import { AvailabilityCalendar } from "@/components/availability/AvailabilityCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Check, AlertTriangle, X, ArrowRight } from "lucide-react";
import Link from "next/link";

interface AvailabilityItem {
  productId: string;
  productName: string;
  totalStock: number;
  reserved: number;
  available: number;
  status: string;
}

const statusConfig: Record<string, { icon: any; color: string; label: string }> = {
  available: { icon: Check, color: "text-green-600", label: "Disponível" },
  low_stock: { icon: AlertTriangle, color: "text-yellow-600", label: "Stock Baixo" },
  sold_out: { icon: X, color: "text-red-600", label: "Esgotado" },
};

export default function DisponibilidadePage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;
    
    async function fetchAvailability() {
      setLoading(true);
      try {
        const res = await fetch(`/api/availability?date=${selectedDate}`);
        const data = await res.json();
        setAvailability(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAvailability();
  }, [selectedDate]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-PT", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <Hero
        title="Disponibilidade"
        subtitle="Consulte a disponibilidade dos nossos produtos para a data do seu evento."
        backgroundImage="/images/hero/hero-2.jpg"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calendar */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Selecione uma Data</h2>
              <AvailabilityCalendar
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
              />
            </div>

            {/* Availability list */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {selectedDate ? `Disponibilidade para ${formatDate(selectedDate)}` : "Selecione uma data"}
              </h2>
              
              {!selectedDate ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Clique numa data no calendário para ver a disponibilidade dos produtos.</p>
                  </CardContent>
                </Card>
              ) : loading ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    A carregar...
                  </CardContent>
                </Card>
              ) : availability.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">
                      Ainda não temos informação de stock configurada.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Contacte-nos para confirmar disponibilidade.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* Summary cards */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <Card className="bg-green-50">
                      <CardContent className="py-4 text-center">
                        <p className="text-2xl font-bold text-green-700">
                          {availability.filter((a) => a.status === "available").length}
                        </p>
                        <p className="text-xs text-green-600">Disponíveis</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-yellow-50">
                      <CardContent className="py-4 text-center">
                        <p className="text-2xl font-bold text-yellow-700">
                          {availability.filter((a) => a.status === "low_stock").length}
                        </p>
                        <p className="text-xs text-yellow-600">Stock Baixo</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-red-50">
                      <CardContent className="py-4 text-center">
                        <p className="text-2xl font-bold text-red-700">
                          {availability.filter((a) => a.status === "sold_out").length}
                        </p>
                        <p className="text-xs text-red-600">Esgotados</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Product list */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Produtos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="divide-y">
                        {availability.map((item) => {
                          const config = statusConfig[item.status] || statusConfig.available;
                          const StatusIcon = config.icon;
                          
                          return (
                            <div key={item.productId} className="py-3 flex items-center justify-between">
                              <div>
                                <p className="font-medium">{item.productName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {item.available} de {item.totalStock} disponíveis
                                </p>
                              </div>
                              <div className={"flex items-center gap-2 " + config.color}>
                                <StatusIcon className="h-4 w-4" />
                                <span className="text-sm font-medium">{config.label}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* CTA */}
                  <div className="text-center pt-4">
                    <Button asChild size="lg">
                      <Link href={`/orcamento?date=${selectedDate}`}>
                        Pedir Orçamento para esta Data
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
