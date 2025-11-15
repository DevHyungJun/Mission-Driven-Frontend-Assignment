"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/app/_utils/cn";
import { getDateRange } from "./utils/getDateRange";
import { getCalendarDays } from "./utils/getCalendarDays";
import { getDateState } from "./utils/getDateState";
import { useCalendarState } from "./hooks/useCalendarState";
import { useCalendarHandlers } from "./hooks/useCalendarHandlers";
import { SessionDate } from "@/stores/sessionStore";
import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import { DAYS_OF_WEEK } from "./constants/DAYS_OF_WEEK";

/**
 * 달력 컴포넌트
 *
 * 모든 props는 필수입니다.
 * @param selectedDate - 선택된 날짜
 * @param onSelectDate - 날짜 선택 시 콜백
 * @param sessions - 세션 데이터
 * @param currentSessionId - 현재 세션 ID
 * @param onClose - 닫기 시 콜백
 *
 * @example
 * <Calendar selectedDate={selectedDate(Date객체)}
 * onSelectDate={onSelectDate(Date객체)}
 * sessions={sessions(SessionDate[])}
 * currentSessionId={currentSessionId(string)}
 * onClose={onClose(함수)} />
 *
 * @description
 * - selectedDate가 null인 경우, 오늘 날짜를 기본값으로 사용합니다. 단, 오늘 날짜가 선택 불가능한 범위에 있으면 minDate를 사용하며, minDate도 null이면 오늘 날짜를 사용합니다.
 * - currentSessionId가 sessions에 존재하지 않으면 minDate와 maxDate가 모두 null이 되어 모든 날짜가 선택 가능해집니다.
 * - 날짜 선택 범위는 다른 세션과 겹치지 않도록 제한됩니다. 이전 세션의 가장 늦은 날짜(date, startTime, endTime 중 최대값)의 다음 날부터, 다음 세션의 가장 이른 날짜의 전날까지만 선택 가능합니다.
 * - minDate보다 이전이거나 maxDate보다 이후인 날짜는 선택 불가능하며, 클릭해도 동작하지 않습니다.
 * - "선택 완료" 버튼 클릭 시 tempSelectedDate가 null이면 onSelectDate는 호출되지 않지만 onClose는 항상 호출됩니다.
 */

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date | null) => void;
  sessions: SessionDate[];
  currentSessionId: string;
  onClose: () => void;
}

const Calendar = ({
  selectedDate,
  onSelectDate,
  sessions,
  currentSessionId,
  onClose,
}: CalendarProps) => {
  const { minDate, maxDate } = getDateRange(sessions, currentSessionId);

  const calendarState = useCalendarState({
    selectedDate,
    minDate,
    maxDate,
  });

  const { currentMonth, tempSelectedDate } = calendarState;
  const days = getCalendarDays(currentMonth);

  const { handleDateClick, handleConfirm, handlePrevMonth, handleNextMonth } =
    useCalendarHandlers({
      calendarState,
      dateRange: { minDate, maxDate },
      onSelectDate,
      onClose,
    });

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
          const { isCurrentMonth, isSelected, isSelectable, isToday } =
            getDateState(day, currentMonth, tempSelectedDate, minDate, maxDate);

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
