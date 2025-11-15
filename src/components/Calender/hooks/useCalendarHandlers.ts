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

/**
 * 캘린더의 이벤트 핸들러를 관리하는 커스텀 훅
 */
export const useCalendarHandlers = ({
  calendarState,
  dateRange,
  onSelectDate,
  onClose,
}: UseCalendarHandlersParams) => {
  const { currentMonth, setCurrentMonth, tempSelectedDate, setTempSelectedDate } =
    calendarState;
  const { minDate, maxDate } = dateRange;
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

  return {
    handleDateClick,
    handleConfirm,
    handlePrevMonth,
    handleNextMonth,
  };
};

