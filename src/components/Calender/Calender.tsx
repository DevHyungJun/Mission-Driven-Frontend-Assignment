"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
  addMonths,
  subMonths,
  isBefore,
  isAfter,
  addDays,
} from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/app/_utils/cn";
import { getDateRange, isDateSelectable } from "./utils/getDateRange";
import { SessionDate } from "@/utils/store/store";

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
  sessions: SessionDate[];
  currentSessionIndex: number;
  onClose: () => void;
}

const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = ({
  selectedDate,
  onSelectDate,
  sessions,
  currentSessionIndex,
  onClose,
}: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const { minDate, maxDate } = getDateRange(sessions, currentSessionIndex);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const handleDateClick = (day: Date) => {
    if (!isDateSelectable(day, minDate, maxDate)) {
      return;
    }
    onSelectDate(day);
    onClose();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="absolute top-full left-0 mt-2 bg-white border border-[#E5E5E5] rounded-lg shadow-lg p-4 z-50 min-w-[320px]">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-[#F7F7F8] rounded"
          aria-label="이전 달"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="#121212"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h3 className="text-[18px] font-semibold text-[#121212]">
          {format(currentMonth, "yyyy년 MM월", { locale: ko })}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-[#F7F7F8] rounded"
          aria-label="다음 달"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 5L12.5 10L7.5 15"
              stroke="#121212"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-[14px] font-semibold text-[#565656] py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isSelectable = isDateSelectable(day, minDate, maxDate);
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={!isSelectable}
              className={cn(
                "aspect-square flex items-center justify-center text-[14px] rounded",
                !isCurrentMonth && "text-[#D7D7D7]",
                isCurrentMonth &&
                  isSelectable &&
                  "text-[#121212] hover:bg-[#F7F7F8]",
                !isSelectable && "text-[#D7D7D7] cursor-not-allowed",
                isSelected ? "bg-[#03C124] text-white font-semibold" : "",
                isToday && !isSelected ? "border-2 border-[#03C124]" : ""
              )}
              aria-label={format(day, "yyyy년 MM월 dd일", { locale: ko })}
              aria-disabled={!isSelectable}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
