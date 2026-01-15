"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  LogOut,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  Euro,
  Calendar,
  User,
  MapPin,
  Phone,
  Mail,
  Package,
  Save,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface QuoteItem {
  id: string;
  productId: string;
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
  customerEmail: string;
  customerPhone: string;
  eventDate: string;
  eventEndDate: string | null;
  eventLocation: string;
  eventType: string | null;
  guestCount: number | null;
  notes: string | null;
  adminNotes: string | null;
  items: QuoteItem[];
  estimatedTotal: number | null;
  finalTotal: number | null;
  depositAmount: number | null;
  depositPaid: boolean;
  paymentRef: string | null;
  quotedAt: string | null;
  confirmedAt: string | null;
  createdAt: string;
}

const statusConfig: Record<string, { label: string; icon: any; color: string; bg: string }> = {
  pending: { label: "Pendente", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
  quoted: { label: "Orçamentado", icon: FileText, color: "text-blue-600", bg: "bg-blue-100" },
  approved: { label: "Aprovado", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
  confirmed: { label: "Confirmado", icon: CheckCircle, color: "text-green-700", bg: "bg-green-200" },
  completed: { label: "Concluído", icon: CheckCircle, color: "text-gray-600", bg: "bg-gray-100" },
  cancelled: { label: "Cancelado", icon: AlertCircle, color: "text-red-600", bg: "bg-red-100" },
};

const categoryLabels: Record<string, string> = {
  plates: "Pratos", cutlery: "Talheres", glassware: "Copos",
  furniture: "Mobiliário", linens: "Atoalhados", utensils: "Utensílios",
  lounge: "Lounge", decoration: "Decoração",
};

const eventTypeLabels: Record<string, string> = {
  wedding: "Casamento", corporate: "Corporativo", birthday: "Aniversário",
  baptism: "Batizado", communion: "Comunhão", party: "Festa", other: "Outro",
};

export default function AdminPage() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [expandedQuote, setExpandedQuote] = useState<string | null>(null);
  const [savingQuote, setSavingQuote] = useState<string | null>(null);

  // Editable state for expanded quote
  const [editData, setEditData] = useState<{
    status: string;
    depositAmount: string;
    depositPaid: boolean;
    adminNotes: string;
    paymentRef: string;
    items: { id: string; unitPrice: string }[];
  } | null>(null);

  useEffect(() => {
    fetchQuotes();
  }, [statusFilter]);

  async function fetchQuotes() {
    setLoading(true);
    try {
      const url = statusFilter
        ? `/api/admin/quotes?status=${statusFilter}`
        : "/api/admin/quotes";
      const res = await fetch(url);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setQuotes(data);
    } catch (err) {
      console.error("Error fetching quotes:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const toggleExpand = (quote: Quote) => {
    if (expandedQuote === quote.id) {
      setExpandedQuote(null);
      setEditData(null);
    } else {
      setExpandedQuote(quote.id);
      setEditData({
        status: quote.status,
        depositAmount: quote.depositAmount?.toString() || "",
        depositPaid: quote.depositPaid,
        adminNotes: quote.adminNotes || "",
        paymentRef: quote.paymentRef || "",
        items: quote.items.map((item) => ({
          id: item.id,
          unitPrice: item.unitPrice?.toString() || "",
        })),
      });
    }
  };

  const handleSave = async (quoteId: string) => {
    if (!editData) return;
    setSavingQuote(quoteId);

    try {
      // Update items prices first
      await fetch(`/api/admin/quotes/${quoteId}/items`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: editData.items.map((item) => {
            const quote = quotes.find((q) => q.id === quoteId);
            const originalItem = quote?.items.find((i) => i.id === item.id);
            return {
              id: item.id,
              unitPrice: item.unitPrice ? parseFloat(item.unitPrice) : null,
              quantity: originalItem?.quantity || 1,
            };
          }),
        }),
      });

      // Update quote details
      await fetch(`/api/admin/quotes/${quoteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editData.status,
          depositAmount: editData.depositAmount ? parseFloat(editData.depositAmount) : null,
          depositPaid: editData.depositPaid,
          adminNotes: editData.adminNotes,
          paymentRef: editData.paymentRef,
        }),
      });

      await fetchQuotes();
      setExpandedQuote(null);
      setEditData(null);
    } catch (err) {
      console.error("Error saving:", err);
      alert("Erro ao guardar");
    } finally {
      setSavingQuote(null);
    }
  };

  const handleDelete = async (quoteId: string) => {
    if (!confirm("Tem a certeza que deseja eliminar este orçamento?")) return;
    
    try {
      await fetch(`/api/admin/quotes/${quoteId}`, { method: "DELETE" });
      await fetchQuotes();
    } catch (err) {
      alert("Erro ao eliminar");
    }
  };

  const stats = {
    pending: quotes.filter((q) => q.status === "pending").length,
    quoted: quotes.filter((q) => q.status === "quoted").length,
    approved: quotes.filter((q) => q.status === "approved").length,
    confirmed: quotes.filter((q) => q.status === "confirmed").length,
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin Let'Rent</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(stats).map(([status, count]) => {
            const config = statusConfig[status];
            return (
              <Card
                key={status}
                className={"cursor-pointer transition-all " + (statusFilter === status ? "ring-2 ring-primary" : "")}
                onClick={() => setStatusFilter(statusFilter === status ? null : status)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={"p-2 rounded-lg " + config.bg}>
                      <config.icon className={"h-5 w-5 " + config.color} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{count}</p>
                      <p className="text-sm text-muted-foreground">{config.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={statusFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(null)}
          >
            Todos ({quotes.length})
          </Button>
          {Object.entries(statusConfig).map(([status, config]) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(statusFilter === status ? null : status)}
            >
              {config.label}
            </Button>
          ))}
        </div>

        {/* Quotes list */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : quotes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Nenhum orçamento encontrado.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {quotes.map((quote) => {
              const config = statusConfig[quote.status] || statusConfig.pending;
              const isExpanded = expandedQuote === quote.id;

              return (
                <Card key={quote.id} className="overflow-hidden">
                  {/* Quote header */}
                  <div
                    className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleExpand(quote)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={"p-2 rounded-lg " + config.bg}>
                          <config.icon className={"h-5 w-5 " + config.color} />
                        </div>
                        <div>
                          <p className="font-medium">{quote.customerName}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(quote.eventDate).toLocaleDateString("pt-PT")} • {quote.eventLocation}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {quote.finalTotal && (
                          <p className="font-bold">€{quote.finalTotal.toFixed(2)}</p>
                        )}
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && editData && (
                    <div className="border-t p-4 bg-muted/20">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Customer & Event info */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <User className="h-4 w-4" /> Cliente
                            </h4>
                            <div className="text-sm space-y-1">
                              <p className="flex items-center gap-2">
                                <Mail className="h-3 w-3" /> {quote.customerEmail}
                              </p>
                              <p className="flex items-center gap-2">
                                <Phone className="h-3 w-3" /> {quote.customerPhone}
                              </p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <Calendar className="h-4 w-4" /> Evento
                            </h4>
                            <div className="text-sm space-y-1">
                              <p className="flex items-center gap-2">
                                <MapPin className="h-3 w-3" /> {quote.eventLocation}
                              </p>
                              {quote.eventType && <p>{eventTypeLabels[quote.eventType] || quote.eventType}</p>}
                              {quote.guestCount && <p>{quote.guestCount} convidados</p>}
                              {quote.notes && <p className="text-muted-foreground mt-2">{quote.notes}</p>}
                            </div>
                          </div>
                        </div>

                        {/* Edit form */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Estado</Label>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={editData.status}
                              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                            >
                              {Object.entries(statusConfig).map(([value, conf]) => (
                                <option key={value} value={value}>{conf.label}</option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Sinal (€)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                value={editData.depositAmount}
                                onChange={(e) => setEditData({ ...editData, depositAmount: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Ref. Pagamento</Label>
                              <Input
                                value={editData.paymentRef}
                                onChange={(e) => setEditData({ ...editData, paymentRef: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={"depositPaid-" + quote.id}
                              checked={editData.depositPaid}
                              onChange={(e) => setEditData({ ...editData, depositPaid: e.target.checked })}
                            />
                            <Label htmlFor={"depositPaid-" + quote.id}>Sinal Pago</Label>
                          </div>

                          <div className="space-y-2">
                            <Label>Notas Admin</Label>
                            <Textarea
                              rows={2}
                              value={editData.adminNotes}
                              onChange={(e) => setEditData({ ...editData, adminNotes: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Items pricing */}
                      <div className="mt-6">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Package className="h-4 w-4" /> Produtos
                        </h4>
                        <div className="bg-background rounded-lg border divide-y">
                          {quote.items.map((item, idx) => (
                            <div key={item.id} className="p-3 flex items-center justify-between">
                              <div>
                                <p className="font-medium">{item.productName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {categoryLabels[item.category] || item.category} • Qtd: {item.quantity}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="Preço unit."
                                  className="w-24 h-8"
                                  value={editData.items[idx]?.unitPrice || ""}
                                  onChange={(e) => {
                                    const newItems = [...editData.items];
                                    newItems[idx] = { ...newItems[idx], unitPrice: e.target.value };
                                    setEditData({ ...editData, items: newItems });
                                  }}
                                />
                                <span className="text-sm text-muted-foreground">€/unit</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex items-center justify-between">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(quote.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                        <Button
                          onClick={() => handleSave(quote.id)}
                          disabled={savingQuote === quote.id}
                        >
                          {savingQuote === quote.id ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              A guardar...
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Guardar Alterações
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
