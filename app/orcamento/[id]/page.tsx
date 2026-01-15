"use client";

import { useEffect, useState, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  CheckCircle, 
  FileText, 
  CreditCard,
  AlertCircle,
  Loader2,
  Copy,
  Check
} from "lucide-react";

interface QuoteItem {
  productName: string;
  category: string;
  quantity: number;
  unitPrice: number | null;
  totalPrice: number | null;
}

interface Quote {
  id: string;
  status: string;
  customerName: string;
  eventDate: string;
  eventEndDate: string | null;
  eventLocation: string;
  eventType: string | null;
  guestCount: number | null;
  items: QuoteItem[];
  estimatedTotal: number | null;
  finalTotal: number | null;
  depositAmount: number | null;
  depositPaid: boolean;
  quotedAt: string | null;
  confirmedAt: string | null;
  createdAt: string;
}

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  pending: { label: "Pendente", icon: Clock, color: "text-yellow-600" },
  quoted: { label: "Orçamento Enviado", icon: FileText, color: "text-blue-600" },
  approved: { label: "Aprovado", icon: CheckCircle, color: "text-green-600" },
  confirmed: { label: "Confirmado", icon: CheckCircle, color: "text-green-700" },
  completed: { label: "Concluído", icon: CheckCircle, color: "text-gray-600" },
  cancelled: { label: "Cancelado", icon: AlertCircle, color: "text-red-600" },
};

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

const eventTypeLabels: Record<string, string> = {
  wedding: "Casamento",
  corporate: "Evento Corporativo",
  birthday: "Aniversário",
  baptism: "Batizado",
  communion: "Comunhão",
  party: "Festa",
  other: "Outro",
};

// Bank details for payment
const BANK_DETAILS = {
  bank: "Millennium BCP",
  iban: "PT50 0033 0000 12345678901 05",
  bic: "BCOMPTPL",
  beneficiary: "Let'Rent Lda",
};

export default function QuoteStatusPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [approving, setApproving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch(`/api/quotes/${id}`);
        if (!res.ok) {
          throw new Error("Orçamento não encontrado");
        }
        const data = await res.json();
        setQuote(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, [id]);

  const handleApprove = async () => {
    if (!quote) return;
    setApproving(true);
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      });
      const data = await res.json();
      if (data.success) {
        setQuote((prev) => prev ? { ...prev, status: "approved" } : null);
      } else {
        alert(data.error || "Erro ao aprovar orçamento");
      }
    } catch (err) {
      alert("Erro ao aprovar orçamento");
    } finally {
      setApproving(false);
    }
  };

  const copyIban = () => {
    navigator.clipboard.writeText(BANK_DETAILS.iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Orçamento não encontrado</h2>
            <p className="text-muted-foreground">
              O orçamento que procura não existe ou foi removido.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusInfo = statusConfig[quote.status] || statusConfig.pending;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Estado do Orçamento</h1>
          <p className="text-muted-foreground">
            Referência: <span className="font-mono">{quote.id}</span>
          </p>
        </div>

        {/* Status card */}
        <Card className="mb-8">
          <CardContent className="py-8">
            <div className="flex items-center justify-center gap-3">
              <StatusIcon className={"h-8 w-8 " + statusInfo.color} />
              <span className={"text-2xl font-bold " + statusInfo.color}>
                {statusInfo.label}
              </span>
            </div>
            
            {quote.status === "pending" && (
              <p className="text-center text-muted-foreground mt-4">
                O seu pedido está a ser analisado pela nossa equipa. Receberá um orçamento em breve.
              </p>
            )}
            
            {quote.status === "quoted" && (
              <div className="text-center mt-4">
                <p className="text-muted-foreground mb-4">
                  O seu orçamento está pronto! Reveja os detalhes abaixo e aprove para confirmar.
                </p>
                <Button onClick={handleApprove} disabled={approving} size="lg">
                  {approving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      A aprovar...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Aprovar Orçamento
                    </>
                  )}
                </Button>
              </div>
            )}
            
            {quote.status === "approved" && (
              <p className="text-center text-muted-foreground mt-4">
                Orçamento aprovado! Por favor, efetue o pagamento para confirmar a reserva.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Payment instructions (show when approved) */}
        {(quote.status === "approved" || quote.status === "confirmed") && (
          <Card className="mb-8 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Dados para Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p><span className="text-muted-foreground">Banco:</span> {BANK_DETAILS.bank}</p>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">IBAN:</span>
                  <code className="bg-background px-2 py-1 rounded">{BANK_DETAILS.iban}</code>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyIban}>
                    {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p><span className="text-muted-foreground">BIC/SWIFT:</span> {BANK_DETAILS.bic}</p>
                <p><span className="text-muted-foreground">Beneficiário:</span> {BANK_DETAILS.beneficiary}</p>
              </div>
              
              {quote.depositAmount && (
                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="font-medium">
                    Valor a transferir: <span className="text-lg">€{quote.depositAmount.toFixed(2)}</span>
                    {quote.depositPaid && <span className="text-green-600 ml-2">(Pago)</span>}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Referência: {quote.id}
                  </p>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground">
                Após efetuar a transferência, a nossa equipa irá confirmar o pagamento e a sua reserva será finalizada.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quote details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Event details */}
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Evento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Data:</span>{" "}
                {new Date(quote.eventDate).toLocaleDateString("pt-PT")}
                {quote.eventEndDate && " - " + new Date(quote.eventEndDate).toLocaleDateString("pt-PT")}
              </p>
              <p><span className="text-muted-foreground">Local:</span> {quote.eventLocation}</p>
              {quote.eventType && (
                <p>
                  <span className="text-muted-foreground">Tipo:</span>{" "}
                  {eventTypeLabels[quote.eventType] || quote.eventType}
                </p>
              )}
              {quote.guestCount && (
                <p><span className="text-muted-foreground">Convidados:</span> {quote.guestCount}</p>
              )}
            </CardContent>
          </Card>

          {/* Pricing summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent>
              {quote.finalTotal ? (
                <div className="space-y-2">
                  <p className="text-2xl font-bold">€{quote.finalTotal.toFixed(2)}</p>
                  {quote.depositAmount && (
                    <p className="text-sm text-muted-foreground">
                      Sinal: €{quote.depositAmount.toFixed(2)}
                      {quote.depositPaid && " (Pago)"}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  O valor será definido após análise do pedido.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Items list */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Produtos Selecionados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {quote.items.map((item, i) => (
                <div key={i} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      {categoryLabels[item.category] || item.category} • Qtd: {item.quantity}
                    </p>
                  </div>
                  {item.totalPrice && (
                    <p className="font-medium">€{item.totalPrice.toFixed(2)}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Histórico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Pedido criado em {new Date(quote.createdAt).toLocaleString("pt-PT")}</span>
              </div>
              {quote.quotedAt && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Orçamento enviado em {new Date(quote.quotedAt).toLocaleString("pt-PT")}</span>
                </div>
              )}
              {quote.confirmedAt && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-green-600" />
                  <span>Reserva confirmada em {new Date(quote.confirmedAt).toLocaleString("pt-PT")}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
