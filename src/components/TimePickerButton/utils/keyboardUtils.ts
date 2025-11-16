import { KeyboardEvent } from "react";
import { ALLOWED_KEYS } from "../constants/ALLOWED_KEYS";

// 허용된 키 검사
export const isAllowedKey = (key: string): boolean => {
  return (
    /[0-9]/.test(key) ||
    ALLOWED_KEYS.includes(key as (typeof ALLOWED_KEYS)[number])
  );
};

// 키 이벤트 방지 여부 확인
export const shouldPreventDefault = (
  e: KeyboardEvent<HTMLInputElement>
): boolean => {
  return !isAllowedKey(e.key);
};

// 다음 시간 가져오기
export const getNextHour = (current: number): number => {
  return current >= 12 ? 1 : current + 1;
};

// 이전 시간 가져오기
export const getPrevHour = (current: number): number => {
  return current <= 1 ? 12 : current - 1;
};

// 다음 분 가져오기
export const getNextMinute = (current: number): number => {
  return current >= 59 ? 0 : current + 1;
};

// 이전 분 가져오기
export const getPrevMinute = (current: number): number => {
  return current <= 0 ? 59 : current - 1;
};
