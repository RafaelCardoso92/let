"use client";

import { Button } from "@/components/ui/button";

interface FilterBarProps {
  filters: {
    eventType: string | null;
    style: string | null;
    colorScheme: string | null;
  };
  onChange: (filters: FilterBarProps["filters"]) => void;
}

const eventTypes = [
  { value: "wedding", label: "Casamento" },
  { value: "corporate", label: "Corporativo" },
  { value: "birthday", label: "Aniversário" },
  { value: "baptism", label: "Batizado" },
  { value: "communion", label: "Comunhão" },
  { value: "party", label: "Festa" },
];

const styles = [
  { value: "rustic", label: "Rústico" },
  { value: "modern", label: "Moderno" },
  { value: "classic", label: "Clássico" },
  { value: "bohemian", label: "Boémio" },
  { value: "minimalist", label: "Minimalista" },
];

const colorSchemes = [
  { value: "gold", label: "Dourado" },
  { value: "green", label: "Verde" },
  { value: "blush", label: "Rosa" },
  { value: "navy", label: "Azul" },
  { value: "white", label: "Branco" },
];

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const setFilter = (key: keyof typeof filters, value: string | null) => {
    onChange({ ...filters, [key]: filters[key] === value ? null : value });
  };

  const clearFilters = () => {
    onChange({ eventType: null, style: null, colorScheme: null });
  };

  const hasFilters = filters.eventType || filters.style || filters.colorScheme;

  return (
    <div className="space-y-4">
      {/* Event Type */}
      <div>
        <p className="text-sm font-medium mb-2">Tipo de Evento</p>
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <Button
              key={type.value}
              variant={filters.eventType === type.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("eventType", type.value)}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Style */}
      <div>
        <p className="text-sm font-medium mb-2">Estilo</p>
        <div className="flex flex-wrap gap-2">
          {styles.map((style) => (
            <Button
              key={style.value}
              variant={filters.style === style.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("style", style.value)}
            >
              {style.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Color Scheme */}
      <div>
        <p className="text-sm font-medium mb-2">Paleta de Cores</p>
        <div className="flex flex-wrap gap-2">
          {colorSchemes.map((color) => (
            <Button
              key={color.value}
              variant={filters.colorScheme === color.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("colorScheme", color.value)}
            >
              {color.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Limpar Filtros
        </Button>
      )}
    </div>
  );
}
