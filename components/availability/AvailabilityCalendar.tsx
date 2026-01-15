"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarData {
  [date: string]: {
    reservedItems: number;
    status: string;
  };
}

interface AvailabilityCalendarProps {
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
}

const statusColors: Record<string, string> = {
  free: "bg-green-100 hover:bg-green-200 text-green-800",
  light: "bg-green-200 hover:bg-green-300 text-green-900",
  moderate: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800",
  busy: "bg-red-100 hover:bg-red-200 text-red-800",
};

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export function AvailabilityCalendar({ onDateSelect, selectedDate }: AvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarData>({});
  const [loading, setLoading] = useState(true);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    async function fetchCalendar() {
      setLoading(true);
      try {
        const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`;
        const res = await fetch(`/api/availability/calendar?month=${monthStr}`);
        const data = await res.json();
        setCalendarData(data);
      } catch (error) {
        console.error("Error fetching calendar:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCalendar();
  }, [year, month]);

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Generate calendar grid
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = [];
  
  // Empty cells before first day
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="p-2" />);
  }
  
  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayData = calendarData[dateStr];
    const dayDate = new Date(year, month, day);
    const isPast = dayDate < today;
    const isSelected = dateStr === selectedDate;
    
    const status = dayData?.status || "free";
    const colorClass = isPast ? "bg-muted text-muted-foreground" : statusColors[status];
    
    days.push(
      <button
        key={day}
        onClick={() => !isPast && onDateSelect(dateStr)}
        disabled={isPast}
        className={"p-2 rounded-lg text-sm font-medium transition-all " +
          colorClass +
          (isSelected ? " ring-2 ring-primary ring-offset-2" : "") +
          (isPast ? " cursor-not-allowed opacity-50" : " cursor-pointer")
        }
      >
        {day}
      </button>
    );
  }

  return (
    <div className="bg-background rounded-xl border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={goToPrevMonth}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h3 className="font-bold text-lg">
          {MONTHS[month]} {year}
        </h3>
        <Button variant="ghost" size="icon" onClick={goToNextMonth}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {loading ? (
          <div className="col-span-7 text-center py-8 text-muted-foreground">
            A carregar...
          </div>
        ) : (
          days
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100" />
          <span>Disponível</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-100" />
          <span>Alguma procura</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100" />
          <span>Alta procura</span>
        </div>
      </div>
    </div>
  );
}
