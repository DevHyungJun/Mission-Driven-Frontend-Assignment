// 숫자 입력 정규식 적용
export const sanitizeNumericInput = (value: string): string => {
  // 숫자 이외의 문자 제거
  return value.replace(/[^0-9]/g, "");
};

// 입력 길이 제한
export const limitInputLength = (value: string, maxLength: number): string => {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
};

// 시간 값 채우기
export const padTimeValue = (value: string): string => {
  return value.padStart(2, "0");
};

// 시간 값 유효성 검사
export const isValidHour = (value: number): boolean => {
  return !isNaN(value) && value >= 1 && value <= 12;
};

// 분 값 유효성 검사
export const isValidMinute = (value: number): boolean => {
  return !isNaN(value) && value >= 0 && value <= 59;
};
