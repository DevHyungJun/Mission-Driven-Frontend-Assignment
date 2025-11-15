import { isSameMonth, isSameDay } from "date-fns";
import { isDateSelectable } from "./getDateRange";

interface DateState {
  isCurrentMonth: boolean;
  isSelected: boolean;
  isSelectable: boolean;
  isToday: boolean;
}

export const getDateState = (
  day: Date,
  currentMonth: Date,
  tempSelectedDate: Date | null,
  minDate: Date | null,
  maxDate: Date | null
): DateState => {
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isSelected =
    tempSelectedDate !== null && isSameDay(day, tempSelectedDate);
  const isSelectable = isDateSelectable(day, minDate, maxDate);
  const isToday = isSameDay(day, new Date());

  return {
    isCurrentMonth,
    isSelected,
    isSelectable,
    isToday,
  };
};
