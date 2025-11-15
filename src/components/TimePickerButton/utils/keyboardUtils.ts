import { KeyboardEvent } from "react";
import { ALLOWED_KEYS } from "../constants/ALLOWED_KEYS";

export const isAllowedKey = (key: string): boolean => {
  return (
    /[0-9]/.test(key) ||
    ALLOWED_KEYS.includes(key as (typeof ALLOWED_KEYS)[number])
  );
};

export const shouldPreventDefault = (
  e: KeyboardEvent<HTMLInputElement>
): boolean => {
  return !isAllowedKey(e.key);
};

export const getNextHour = (current: number): number => {
  return current >= 12 ? 1 : current + 1;
};

export const getPrevHour = (current: number): number => {
  return current <= 1 ? 12 : current - 1;
};

export const getNextMinute = (current: number): number => {
  return current >= 59 ? 0 : current + 1;
};

export const getPrevMinute = (current: number): number => {
  return current <= 0 ? 59 : current - 1;
};
