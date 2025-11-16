import { addMonths, subMonths } from "date-fns";
import { isDateSelectable } from "../utils/getDateRange";

interface CalendarState {
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
  tempSelectedDate: Date | null;
  setTempSelectedDate: (date: Date | null) => void;
}

interface DateRange {
  minDate: Date | null;
  maxDate: Date | null;
}

interface UseCalendarHandlersParams {
  calendarState: CalendarState;
  dateRange: DateRange;
  onSelectDate: (date: Date | null) => void;
  onClose: () => void;
}

// 달력 이벤트 핸들러
export const useCalendarHandlers = ({
  calendarState,
  dateRange,
  onSelectDate,
  onClose,
}: UseCalendarHandlersParams) => {
  // 달력 상태 추출
  const {
    currentMonth,
    setCurrentMonth,
    tempSelectedDate,
    setTempSelectedDate,
  } = calendarState;
  // 날짜 범위 추출
  const { minDate, maxDate } = dateRange;
  // 날짜 클릭 이벤트 핸들러
  const handleDateClick = (day: Date) => {
    // 날짜가 선택 가능한지 확인
    if (!isDateSelectable(day, minDate, maxDate)) {
      return;
    }
    setTempSelectedDate(day);
  };

  // 날짜 확인 이벤트 핸들러
  const handleConfirm = () => {
    if (tempSelectedDate) {
      onSelectDate(tempSelectedDate);
    }
    onClose();
  };

  // 이전 달 이벤트 핸들러
  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // 다음 달 이벤트 핸들러
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // 이벤트 핸들러를 반환
  return {
    handleDateClick,
    handleConfirm,
    handlePrevMonth,
    handleNextMonth,
  };
};
