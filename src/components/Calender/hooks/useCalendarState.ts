import { useState } from "react";
import { getInitialDate } from "../utils/getInitialDate";

interface UseCalendarStateParams {
  selectedDate: Date | null;
  minDate: Date | null;
  maxDate: Date | null;
}

export const useCalendarState = ({
  selectedDate,
  minDate,
  maxDate,
}: UseCalendarStateParams) => {
  const initialDate = getInitialDate(selectedDate, minDate, maxDate);
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(
    initialDate
  );

  return {
    currentMonth,
    setCurrentMonth,
    tempSelectedDate,
    setTempSelectedDate,
  };
};
