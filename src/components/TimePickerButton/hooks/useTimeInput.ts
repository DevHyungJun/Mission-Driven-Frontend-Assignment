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

type TimeUnit = "hour" | "minute";

type TimeUnitConfig = {
  current: string;
  defaultValue: string;
  isValid: (value: number) => boolean;
  getNext: (current: number) => number;
  getPrev: (current: number) => number;
  setValue: (value: string) => void;
};

const ARROW_KEY_HANDLERS = {
  ArrowUp: "increment",
  ArrowDown: "decrement",
} as const;

export const useTimeInput = ({
  localHour,
  localMinute,
  localIsAM,
  setLocalHour,
  setLocalMinute,
  onTimeUpdate,
  onRestore,
}: UseTimeInputParams) => {
  const getTimeUnitConfig = (unit: TimeUnit): TimeUnitConfig => {
    const configs: Record<TimeUnit, TimeUnitConfig> = {
      hour: {
        current: localHour,
        defaultValue: "1",
        isValid: isValidHour,
        getNext: getNextHour,
        getPrev: getPrevHour,
        setValue: setLocalHour,
      },
      minute: {
        current: localMinute,
        defaultValue: "0",
        isValid: isValidMinute,
        getNext: getNextMinute,
        getPrev: getPrevMinute,
        setValue: setLocalMinute,
      },
    };
    return configs[unit];
  };

  const createChangeHandler = (unit: TimeUnit) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const config = getTimeUnitConfig(unit);
      let value = sanitizeNumericInput(e.target.value);
      value = limitInputLength(value, 2);

      if (value === "") {
        config.setValue("");
        return;
      }

      if (value.length === 1) {
        config.setValue(value);
        return;
      }

      const numValue = parseInt(value, 10);
      if (!config.isValid(numValue)) {
        onRestore();
        return;
      }

      const paddedValue = padTimeValue(value);
      config.setValue(paddedValue);

      const hour = unit === "hour" ? numValue : parseInt(localHour, 10);
      const minute = unit === "minute" ? numValue : parseInt(localMinute, 10);
      onTimeUpdate(hour, minute, localIsAM);
    };
  };

  const createKeyDownHandler = (unit: TimeUnit) => {
    return (e: KeyboardEvent<HTMLInputElement>) => {
      if (shouldPreventDefault(e)) {
        e.preventDefault();
        return;
      }

      const action =
        ARROW_KEY_HANDLERS[e.key as keyof typeof ARROW_KEY_HANDLERS];
      if (!action) return;

      e.preventDefault();
      const config = getTimeUnitConfig(unit);
      const current = parseInt(config.current || config.defaultValue, 10);
      const nextValue =
        action === "increment"
          ? config.getNext(current)
          : config.getPrev(current);
      const formattedValue = padTimeValue(nextValue.toString());

      config.setValue(formattedValue);

      const hour = unit === "hour" ? nextValue : parseInt(localHour, 10);
      const minute = unit === "minute" ? nextValue : parseInt(localMinute, 10);
      onTimeUpdate(hour, minute, localIsAM);
    };
  };

  const createBlurHandler = (unit: TimeUnit) => {
    return (e: React.FocusEvent<HTMLInputElement>) => {
      const config = getTimeUnitConfig(unit);
      const value = e.target.value;
      const numValue = parseInt(value, 10);

      if (!value || !config.isValid(numValue)) {
        onRestore();
        return;
      }

      if (value.length !== 1) return;

      const paddedValue = padTimeValue(value);
      config.setValue(paddedValue);

      const hour =
        unit === "hour" ? parseInt(paddedValue, 10) : parseInt(localHour, 10);
      const minute =
        unit === "minute"
          ? parseInt(paddedValue, 10)
          : parseInt(localMinute, 10);
      onTimeUpdate(hour, minute, localIsAM);
    };
  };

  return {
    handleHourChange: createChangeHandler("hour"),
    handleMinuteChange: createChangeHandler("minute"),
    handleHourKeyDown: createKeyDownHandler("hour"),
    handleMinuteKeyDown: createKeyDownHandler("minute"),
    handleHourBlur: createBlurHandler("hour"),
    handleMinuteBlur: createBlurHandler("minute"),
  };
};
