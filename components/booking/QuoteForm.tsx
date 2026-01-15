"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductSelector } from "./ProductSelector";
import { QuoteCart } from "./QuoteCart";
import { 
  ArrowLeft, 
  ArrowRight, 
  Package, 
  Calendar, 
  User, 
  CheckCircle,
  Loader2,
  Sparkles
} from "lucide-react";

interface CartItem {
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  basePrice?: number;
  image?: string;
}

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventDate: string;
  eventEndDate: string;
  eventLocation: string;
  eventType: string;
  guestCount: string;
  notes: string;
}

const eventTypes = [
  { value: "wedding", label: "Casamento" },
  { value: "corporate", label: "Evento Corporativo" },
  { value: "birthday", label: "Aniversário" },
  { value: "baptism", label: "Batizado" },
  { value: "communion", label: "Comunhão" },
  { value: "party", label: "Festa" },
  { value: "other", label: "Outro" },
];

export function QuoteForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [prefilledSource, setPrefilledSource] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    eventDate: "",
    eventEndDate: "",
    eventLocation: "",
    eventType: "",
    guestCount: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteId, setQuoteId] = useState<string | null>(null);

  // Load prefilled cart from sessionStorage
  useEffect(() => {
    const from = searchParams.get("from");
    const date = searchParams.get("date");
    
    if (date) {
      setFormData((prev) => ({ ...prev, eventDate: date }));
    }
    
    if (from === "inspiration") {
      const stored = sessionStorage.getItem("inspirationCart");
      if (stored) {
        const items = JSON.parse(stored);
        setCart(items);
        setPrefilledSource("Galeria de Inspiração");
        sessionStorage.removeItem("inspirationCart");
      }
    } else if (from === "visualizer") {
      const stored = sessionStorage.getItem("visualizerCart");
      if (stored) {
        const items = JSON.parse(stored);
        setCart(items);
        setPrefilledSource("Visualizador de Mesa");
        sessionStorage.removeItem("visualizerCart");
      }
    }
  }, [searchParams]);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceedStep1 = cart.length > 0;
  const canProceedStep2 = formData.eventDate && formData.eventLocation;
  const canProceedStep3 = formData.customerName && formData.customerEmail && formData.customerPhone;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          guestCount: formData.guestCount ? parseInt(formData.guestCount) : undefined,
          items: cart.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            category: item.category,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setQuoteId(data.quoteId);
        setStep(5);
      } else {
        alert(data.error || "Erro ao enviar pedido");
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("Erro ao enviar pedido. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (step === 5 && quoteId) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardContent className="py-12 text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Pedido Enviado!</h2>
          <p className="text-muted-foreground mb-6">
            O seu pedido de orçamento foi recebido com sucesso. A nossa equipa irá analisar e enviar-lhe um orçamento detalhado em breve.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Referência do pedido: <span className="font-mono font-bold">{quoteId}</span>
          </p>
          <Button asChild>
            <a href={`/orcamento/${quoteId}`}>Ver Estado do Pedido</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main form area */}
      <div className="lg:col-span-2">
        {/* Prefilled notice */}
        {prefilledSource && cart.length > 0 && step === 1 && (
          <div className="mb-6 p-4 bg-primary/10 rounded-lg flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="text-sm">
              Produtos adicionados a partir da <strong>{prefilledSource}</strong>. 
              Pode adicionar ou remover produtos abaixo.
            </p>
          </div>
        )}

        {/* Progress steps */}
        <div className="flex items-center justify-between mb-8">
          {[
            { num: 1, label: "Produtos", icon: Package },
            { num: 2, label: "Evento", icon: Calendar },
            { num: 3, label: "Contacto", icon: User },
            { num: 4, label: "Confirmar", icon: CheckCircle },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div
                className={"flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors " +
                  (step >= s.num
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground/30 text-muted-foreground")
                }
              >
                <s.icon className="h-5 w-5" />
              </div>
              <span className={"ml-2 text-sm hidden sm:block " + (step >= s.num ? "font-medium" : "text-muted-foreground")}>
                {s.label}
              </span>
              {i < 3 && (
                <div className={"w-8 sm:w-16 h-0.5 mx-2 " + (step > s.num ? "bg-primary" : "bg-muted-foreground/30")} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Products */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">Selecione os Produtos</h2>
              <p className="text-muted-foreground">
                Escolha os produtos que pretende alugar para o seu evento.
              </p>
            </div>
            <ProductSelector cart={cart} onCartChange={setCart} />
          </div>
        )}

        {/* Step 2: Event details */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Evento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Data do Evento *</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => updateFormData("eventDate", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventEndDate">Data de Fim (opcional)</Label>
                  <Input
                    id="eventEndDate"
                    type="date"
                    value={formData.eventEndDate}
                    onChange={(e) => updateFormData("eventEndDate", e.target.value)}
                    min={formData.eventDate || new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventLocation">Local do Evento *</Label>
                <Input
                  id="eventLocation"
                  placeholder="Morada completa"
                  value={formData.eventLocation}
                  onChange={(e) => updateFormData("eventLocation", e.target.value)}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventType">Tipo de Evento</Label>
                  <select
                    id="eventType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.eventType}
                    onChange={(e) => updateFormData("eventType", e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestCount">Número de Convidados</Label>
                  <Input
                    id="guestCount"
                    type="number"
                    placeholder="Ex: 100"
                    value={formData.guestCount}
                    onChange={(e) => updateFormData("guestCount", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas Adicionais</Label>
                <Textarea
                  id="notes"
                  placeholder="Informações adicionais sobre o evento..."
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => updateFormData("notes", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Contact info */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Nome Completo *</Label>
                <Input
                  id="customerName"
                  placeholder="O seu nome"
                  value={formData.customerName}
                  onChange={(e) => updateFormData("customerName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.customerEmail}
                  onChange={(e) => updateFormData("customerEmail", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerPhone">Telefone *</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  placeholder="+351 XXX XXX XXX"
                  value={formData.customerPhone}
                  onChange={(e) => updateFormData("customerPhone", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Confirmar Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Produtos Selecionados</h4>
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  {cart.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span>{item.productName}</span>
                      <span className="text-muted-foreground">x{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Detalhes do Evento</h4>
                <div className="bg-muted rounded-lg p-4 space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Data:</span> {formData.eventDate}</p>
                  {formData.eventEndDate && <p><span className="text-muted-foreground">Até:</span> {formData.eventEndDate}</p>}
                  <p><span className="text-muted-foreground">Local:</span> {formData.eventLocation}</p>
                  {formData.eventType && <p><span className="text-muted-foreground">Tipo:</span> {eventTypes.find(t => t.value === formData.eventType)?.label}</p>}
                  {formData.guestCount && <p><span className="text-muted-foreground">Convidados:</span> {formData.guestCount}</p>}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Contacto</h4>
                <div className="bg-muted rounded-lg p-4 space-y-1 text-sm">
                  <p>{formData.customerName}</p>
                  <p>{formData.customerEmail}</p>
                  <p>{formData.customerPhone}</p>
                </div>
              </div>

              {formData.notes && (
                <div>
                  <h4 className="font-medium mb-2">Notas</h4>
                  <div className="bg-muted rounded-lg p-4 text-sm">
                    <p>{formData.notes}</p>
                  </div>
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                Ao submeter este pedido, a nossa equipa irá analisar e enviar-lhe um orçamento detalhado com os preços finais.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && !canProceedStep1) ||
                (step === 2 && !canProceedStep2) ||
                (step === 3 && !canProceedStep3)
              }
            >
              Continuar
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  A enviar...
                </>
              ) : (
                <>
                  Enviar Pedido
                  <CheckCircle className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Sidebar cart */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <QuoteCart
            items={cart}
            onRemove={(productId) => setCart(cart.filter((i) => i.productId !== productId))}
            onClear={() => setCart([])}
          />
        </div>
      </div>
    </div>
  );
}
