import { useState } from "react";
import { getInitialDate } from "../utils/getInitialDate";

interface UseCalendarStateParams {
  selectedDate: Date | null;
  minDate: Date | null;
  maxDate: Date | null;
}

// 달력 상태 관리
export const useCalendarState = ({
  selectedDate,
  minDate,
  maxDate,
}: UseCalendarStateParams) => {
  // 초기 날짜 계산
  const initialDate = getInitialDate(selectedDate, minDate, maxDate);
  // 현재 달 상태 관리
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  // 선택된 날짜 상태 관리
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(
    initialDate
  );

  // 달력 상태를 반환
  return {
    currentMonth,
    setCurrentMonth,
    tempSelectedDate,
    setTempSelectedDate,
  };
};
