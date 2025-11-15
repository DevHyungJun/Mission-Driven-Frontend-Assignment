export const sanitizeNumericInput = (value: string): string => {
  return value.replace(/[^0-9]/g, "");
};

export const limitInputLength = (value: string, maxLength: number): string => {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
};

export const padTimeValue = (value: string): string => {
  return value.padStart(2, "0");
};

export const isValidHour = (value: number): boolean => {
  return !isNaN(value) && value >= 1 && value <= 12;
};

export const isValidMinute = (value: number): boolean => {
  return !isNaN(value) && value >= 0 && value <= 59;
};
