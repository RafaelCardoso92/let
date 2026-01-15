"use client";

import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  color?: string;
}

interface PlaceSettingProps {
  number: number;
  plate: Product | null;
  cutlery: Product | null;
  glass: Product | null;
  napkin: Product | null;
  onRemove: (slot: string) => void;
}

const slotColors: Record<string, string> = {
  plate: "bg-amber-100 border-amber-300",
  cutlery: "bg-gray-100 border-gray-300",
  glass: "bg-blue-100 border-blue-300",
  napkin: "bg-rose-100 border-rose-300",
};

const slotLabels: Record<string, string> = {
  plate: "Prato",
  cutlery: "Talheres",
  glass: "Copo",
  napkin: "Guardanapo",
};

export function PlaceSetting({ number, plate, cutlery, glass, napkin, onRemove }: PlaceSettingProps) {
  const slots = { plate, cutlery, glass, napkin };

  return (
    <Card className="p-4 bg-white shadow-md">
      <div className="text-center mb-3">
        <span className="text-xs font-medium text-muted-foreground">Lugar {number}</span>
      </div>
      
      {/* Place setting layout - circular arrangement */}
      <div className="relative w-32 h-32 mx-auto">
        {/* Plate (center) */}
        <div className="absolute inset-4 flex items-center justify-center">
          <div 
            className={"w-20 h-20 rounded-full border-2 flex items-center justify-center text-xs text-center p-1 transition-all " +
              (plate ? slotColors.plate : "border-dashed border-gray-300 bg-gray-50")
            }
          >
            {plate ? (
              <div className="relative">
                <span className="text-xs">{plate.name}</span>
                <button 
                  onClick={() => onRemove("plate")}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <span className="text-muted-foreground">Prato</span>
            )}
          </div>
        </div>

        {/* Glass (top right) */}
        <div className="absolute top-0 right-0">
          <div 
            className={"w-8 h-10 rounded-t-full border-2 flex items-center justify-center text-[8px] transition-all " +
              (glass ? slotColors.glass : "border-dashed border-gray-300 bg-gray-50")
            }
          >
            {glass ? (
              <button onClick={() => onRemove("glass")} className="text-blue-700">
                <X className="h-3 w-3" />
              </button>
            ) : (
              "🥂"
            )}
          </div>
        </div>

        {/* Cutlery (left) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <div 
            className={"w-6 h-16 rounded border-2 flex items-center justify-center text-[8px] transition-all " +
              (cutlery ? slotColors.cutlery : "border-dashed border-gray-300 bg-gray-50")
            }
          >
            {cutlery ? (
              <button onClick={() => onRemove("cutlery")} className="text-gray-700">
                <X className="h-3 w-3" />
              </button>
            ) : (
              "🍴"
            )}
          </div>
        </div>

        {/* Napkin (bottom) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div 
            className={"w-12 h-6 rounded border-2 flex items-center justify-center text-[8px] transition-all " +
              (napkin ? slotColors.napkin : "border-dashed border-gray-300 bg-gray-50")
            }
          >
            {napkin ? (
              <button onClick={() => onRemove("napkin")} className="text-rose-700">
                <X className="h-3 w-3" />
              </button>
            ) : (
              "📜"
            )}
          </div>
        </div>
      </div>

      {/* Product names */}
      <div className="mt-3 space-y-1 text-xs">
        {Object.entries(slots).map(([slot, product]) => 
          product && (
            <div key={slot} className="flex justify-between text-muted-foreground">
              <span>{slotLabels[slot]}:</span>
              <span className="font-medium text-foreground truncate max-w-[80px]">{product.name}</span>
            </div>
          )
        )}
      </div>
    </Card>
  );
}
