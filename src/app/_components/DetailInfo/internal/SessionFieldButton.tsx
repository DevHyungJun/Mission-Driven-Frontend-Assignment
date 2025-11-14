"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components";
import Calendar from "@/components/Calender/Calender";
import { SESSION_FIELDS } from "../constants/SESSION_FIELDS";
import { useSessionStore } from "@/utils/store/store";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const TIME_BUTTON_BASE_STYLE =
  "py-[14.5px] text-[18px] leading-[130%] tracking-[-0.02em] text-[#121212] text-center";

interface SessionFieldButtonProps {
  field: (typeof SESSION_FIELDS)[number];
  sessionIndex: number;
}

const SessionFieldButton = ({ field, sessionIndex }: SessionFieldButtonProps) => {
  const { sessions, setSessionDate } = useSessionStore();
  const currentSession = sessions[sessionIndex];

  if (field.type === "simple") {
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
          className="text-[#8F8F8F] bg-white w-full h-[52px] rounded-lg"
          ariaLabel={field.ariaLabel}
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
  }

  return (
    <div className="flex-1 w-full bg-white rounded-lg border border-[#E5E5E5] h-[52px] flex items-center">
      <button
        aria-label={`${field.label} 오전/오후 선택`}
        className="mx-[10px] my-[7px] p-[8px] font-semibold leading-[130%] tracking-[-0.02em] text-[#323232] bg-[#F7F7F8] rounded-[4px] border border-[#E5E5E5] cursor-pointer"
      >
        오후
      </button>
      <button
        aria-label={`${field.label} 시간 선택`}
        className={`flex-1 ${TIME_BUTTON_BASE_STYLE} cursor-pointer`}
      >
        11
      </button>
      <span className={TIME_BUTTON_BASE_STYLE} aria-hidden="true">
        :
      </span>
      <button
        aria-label={`${field.label} 분 선택`}
        className={`flex-1 ${TIME_BUTTON_BASE_STYLE} cursor-pointer`}
      >
        00
      </button>
    </div>
  );
};

export default SessionFieldButton;
