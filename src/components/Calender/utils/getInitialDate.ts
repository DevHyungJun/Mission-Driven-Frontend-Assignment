import { isDateSelectable } from "./getDateRange";

export const getInitialDate = (
  selectedDate: Date | null,
  minDate: Date | null,
  maxDate: Date | null
): Date => {
  if (selectedDate) {
    return selectedDate;
  }

  const today = new Date();
  if (isDateSelectable(today, minDate, maxDate)) {
    return today;
  }

  return minDate || today;
};
