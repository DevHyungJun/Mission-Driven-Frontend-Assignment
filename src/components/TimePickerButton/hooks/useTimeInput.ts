import { KeyboardEvent } from "react";
import {
  sanitizeNumericInput,
  limitInputLength,
  padTimeValue,
  isValidHour,
  isValidMinute,
} from "../utils/inputValidationUtils";
import {
  shouldPreventDefault,
  getNextHour,
  getPrevHour,
  getNextMinute,
  getPrevMinute,
} from "../utils/keyboardUtils";

interface UseTimeInputParams {
  localHour: string;
  localMinute: string;
  localIsAM: boolean;
  setLocalHour: (value: string) => void;
  setLocalMinute: (value: string) => void;
  onTimeUpdate: (hour: number, minute: number, isAM: boolean) => void;
  onRestore: () => void;
}

export const useTimeInput = ({
  localHour,
  localMinute,
  localIsAM,
  setLocalHour,
  setLocalMinute,
  onTimeUpdate,
  onRestore,
}: UseTimeInputParams) => {

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = sanitizeNumericInput(e.target.value);
    value = limitInputLength(value, 2);

    if (value === "") {
      setLocalHour("");
      return;
    }

    if (value.length === 1) {
      setLocalHour(value);
      return;
    }

    const numValue = parseInt(value, 10);
    if (isValidHour(numValue)) {
      const paddedValue = padTimeValue(value);
      setLocalHour(paddedValue);
      onTimeUpdate(numValue, parseInt(localMinute, 10), localIsAM);
    } else {
      onRestore();
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = sanitizeNumericInput(e.target.value);
    value = limitInputLength(value, 2);

    if (value === "") {
      setLocalMinute("");
      return;
    }

    if (value.length === 1) {
      setLocalMinute(value);
      return;
    }

    const numValue = parseInt(value, 10);
    if (isValidMinute(numValue)) {
      const paddedValue = padTimeValue(value);
      setLocalMinute(paddedValue);
      onTimeUpdate(parseInt(localHour, 10), numValue, localIsAM);
    } else {
      onRestore();
    }
  };

  const handleHourKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (shouldPreventDefault(e)) {
      e.preventDefault();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const current = parseInt(localHour || "1", 10);
      const next = getNextHour(current);
      const nextValue = padTimeValue(next.toString());
      setLocalHour(nextValue);
      onTimeUpdate(next, parseInt(localMinute, 10), localIsAM);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const current = parseInt(localHour || "1", 10);
      const prev = getPrevHour(current);
      const prevValue = padTimeValue(prev.toString());
      setLocalHour(prevValue);
      onTimeUpdate(prev, parseInt(localMinute, 10), localIsAM);
    }
  };

  const handleMinuteKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (shouldPreventDefault(e)) {
      e.preventDefault();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const current = parseInt(localMinute || "0", 10);
      const next = getNextMinute(current);
      const nextValue = padTimeValue(next.toString());
      setLocalMinute(nextValue);
      onTimeUpdate(parseInt(localHour, 10), next, localIsAM);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const current = parseInt(localMinute || "0", 10);
      const prev = getPrevMinute(current);
      const prevValue = padTimeValue(prev.toString());
      setLocalMinute(prevValue);
      onTimeUpdate(parseInt(localHour, 10), prev, localIsAM);
    }
  };

  const handleHourBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value, 10);

    if (!value || !isValidHour(numValue)) {
      onRestore();
      return;
    }

    if (value.length === 1) {
      const paddedValue = padTimeValue(value);
      setLocalHour(paddedValue);
      onTimeUpdate(
        parseInt(paddedValue, 10),
        parseInt(localMinute, 10),
        localIsAM
      );
    }
  };

  const handleMinuteBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value, 10);

    if (!value || !isValidMinute(numValue)) {
      onRestore();
      return;
    }

    if (value.length === 1) {
      const paddedValue = padTimeValue(value);
      setLocalMinute(paddedValue);
      onTimeUpdate(
        parseInt(localHour, 10),
        parseInt(paddedValue, 10),
        localIsAM
      );
    }
  };

  return {
    handleHourChange,
    handleMinuteChange,
    handleHourKeyDown,
    handleMinuteKeyDown,
    handleHourBlur,
    handleMinuteBlur,
  };
};
