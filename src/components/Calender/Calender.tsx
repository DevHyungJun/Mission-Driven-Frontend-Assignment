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
} from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/app/_utils/cn";
import { getDateRange, isDateSelectable } from "./utils/getDateRange";
import { SessionDate } from "@/utils/store/store";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";

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
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(
    selectedDate
  );
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
    setTempSelectedDate(day);
  };

  const handleConfirm = () => {
    if (tempSelectedDate) {
      onSelectDate(tempSelectedDate);
    }
    onClose();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div
      className={cn(
        "absolute min-w-[250px] top-full left-0 right-0 mt-2 bg-white border border-[#E5E5E5] rounded-lg shadow-lg p-4 z-50",
        "md:min-w-[330px]"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className={cn(
            "text-[16px] font-semibold text-[#121212]",
            "md:text-[18px]"
          )}
        >
          {format(currentMonth, "yyyy년 MM월", { locale: ko })}
        </h3>
        <div className="flex gap-[2px]">
          <Button
            variant="outline"
            color="black"
            size="small"
            onClick={handlePrevMonth}
            className="p-1 bg-white rounded hover:bg-[#F7F7F8]"
            aria-label="이전 달"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button
            variant="outline"
            color="black"
            size="small"
            onClick={handleNextMonth}
            className="p-1 bg-white rounded hover:bg-[#F7F7F8]"
            aria-label="다음 달"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
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
          const isSelected =
            tempSelectedDate && isSameDay(day, tempSelectedDate);
          const isSelectable = isDateSelectable(day, minDate, maxDate);
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={!isSelectable}
              className={cn(
                "aspect-square flex items-center justify-center text-[14px] rounded-[6px]",
                !isCurrentMonth && "text-[#8F8F8F] hover:bg-[#F7F7F8]",
                isCurrentMonth &&
                  isSelectable &&
                  "text-[#121212] hover:bg-[#F7F7F8]",
                !isSelectable && "text-[#D7D7D7] cursor-not-allowed",
                isSelected
                  ? "bg-[#03C124] text-white font-bold hover:bg-[#03C124]"
                  : "",
                isToday && !isSelected && "font-bold"
              )}
              aria-label={format(day, "yyyy년 MM월 dd일", { locale: ko })}
              aria-disabled={!isSelectable}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
        <Button
          variant="default"
          color="black"
          className="w-full h-[48px] flex items-center justify-center text-white bg-[#03C124] font-semibold"
          onClick={handleConfirm}
          ariaLabel="선택 완료"
        >
          선택 완료
        </Button>
      </div>
    </div>
  );
};

export default Calendar;
