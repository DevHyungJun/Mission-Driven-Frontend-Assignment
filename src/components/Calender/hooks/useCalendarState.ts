import { useState } from "react";
import { getInitialDate } from "../utils/getInitialDate";

interface UseCalendarStateParams {
  selectedDate: Date | null;
  minDate: Date | null;
  maxDate: Date | null;
}

/**
 * 캘린더의 상태를 관리하는 커스텀 훅
 * @param selectedDate 이미 선택된 날짜
 * @param minDate 선택 가능한 최소 날짜
 * @param maxDate 선택 가능한 최대 날짜
 * @returns 캘린더 상태와 상태 업데이트 함수
 */
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

