"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components";
import Calendar from "@/components/Calender/Calender";
import { useSessionStore } from "@/utils/store/store";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/app/_utils/cn";

interface DateSelectButtonProps {
  sessionIndex: number;
  ariaLabel: string;
}

const DateSelectButton = ({ sessionIndex, ariaLabel }: DateSelectButtonProps) => {
  const { sessions, setSessionDate } = useSessionStore();
  const currentSession = sessions[sessionIndex];
  const selectedDate = currentSession?.date;
  const [isDateCalendarOpen, setIsDateCalendarOpen] = useState(false);
  const dateContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dateContainerRef.current &&
        !dateContainerRef.current.contains(event.target as Node)
      ) {
        setIsDateCalendarOpen(false);
      }
    };

    if (isDateCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDateCalendarOpen]);

  return (
    <div ref={dateContainerRef} className="w-full relative">
      <Button
        variant="outline"
        color="black"
        size="small"
        className={cn(
          "text-[#8F8F8F] bg-white w-full h-[52px] rounded-lg text-[16px] font-medium",
          "md:text-[20px]"
        )}
        ariaLabel={ariaLabel}
        onClick={() => setIsDateCalendarOpen(!isDateCalendarOpen)}
      >
        {selectedDate
          ? format(selectedDate, "yyyy년 MM월 dd일", { locale: ko })
          : "날짜를 선택해주세요"}
      </Button>
      {isDateCalendarOpen && (
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={(date) => {
            setSessionDate(sessionIndex, date);
            setIsDateCalendarOpen(false);
          }}
          sessions={sessions}
          currentSessionIndex={sessionIndex}
          onClose={() => setIsDateCalendarOpen(false)}
        />
      )}
    </div>
  );
};

export default DateSelectButton;

