"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useSessionStore } from "@/utils/store/store";
import {
  convertTo24Hour,
  convertTo12Hour,
  isEndTimeAfterStart,
  calculateEndTime,
} from "./utils/timeUtils";
import { Toast } from "@/components";
import { cn } from "@/app/_utils/cn";

const TIME_BUTTON_BASE_STYLE =
  "py-[14.5px] text-[18px] leading-[130%] tracking-[-0.02em] text-[#121212] text-center";

interface TimePickerButtonProps {
  label: string;
  sessionId: string;
}

const TimePickerButton = ({ label, sessionId }: TimePickerButtonProps) => {
  const { sessions, setSessionStartTime, setSessionEndTime } =
    useSessionStore();
  const currentSession = sessions.find((session) => session.id === sessionId);
  const isStartTime = label === "시작 시간";

  const startTime = currentSession?.startTime;
  const endTime = currentSession?.endTime;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const hourInputRef = useRef<HTMLInputElement>(null);
  const minuteInputRef = useRef<HTMLInputElement>(null);

  const getTimeDisplay = (time: Date | null) => {
    if (!time) {
      return { hour: 10, minute: 0, isAM: true };
    }
    const hour24 = time.getHours();
    return { ...convertTo12Hour(hour24), minute: time.getMinutes() };
  };

  const timeDisplay = isStartTime
    ? getTimeDisplay(startTime ?? null)
    : getTimeDisplay(endTime ?? null);

  const [localHour, setLocalHour] = useState(
    timeDisplay.hour.toString().padStart(2, "0")
  );
  const [localMinute, setLocalMinute] = useState(
    timeDisplay.minute.toString().padStart(2, "0")
  );
  const [localIsAM, setLocalIsAM] = useState(timeDisplay.isAM);

  useEffect(() => {
    const display = isStartTime
      ? getTimeDisplay(startTime ?? null)
      : getTimeDisplay(endTime ?? null);
    const hourStr = display.hour.toString().padStart(2, "0");
    const minuteStr = display.minute.toString().padStart(2, "0");
    setLocalHour(hourStr);
    setLocalMinute(minuteStr);
    setLocalIsAM(display.isAM);
  }, [startTime, endTime, isStartTime]);

  const updateTime = (
    hour: number,
    minute: number,
    isAM: boolean,
    isStart: boolean
  ) => {
    const hour24 = convertTo24Hour(hour, isAM);
    const newTime = new Date();
    newTime.setHours(hour24, minute, 0, 0);

    if (isStart) {
      setSessionStartTime(sessionId, newTime);

      const endTime24 = convertTo24Hour(
        getTimeDisplay(endTime ?? null).hour,
        getTimeDisplay(endTime ?? null).isAM
      );
      const endMinute = getTimeDisplay(endTime ?? null).minute;

      if (!isEndTimeAfterStart(hour24, minute, endTime24, endMinute)) {
        const calculatedEnd = calculateEndTime(hour24, minute);
        const endTime12 = convertTo12Hour(calculatedEnd.hour);
        const newEndTime = new Date();
        newEndTime.setHours(calculatedEnd.hour, calculatedEnd.minute, 0, 0);
        setSessionEndTime(sessionId, newEndTime);
        setToastMessage("시작 시간보다 종료시간은 빠를 수 없습니다.");
      } else {
        const calculatedEnd = calculateEndTime(hour24, minute);
        const newEndTime = new Date();
        newEndTime.setHours(calculatedEnd.hour, calculatedEnd.minute, 0, 0);
        setSessionEndTime(sessionId, newEndTime);
      }
    } else {
      const startTime24 = convertTo24Hour(
        getTimeDisplay(startTime ?? null).hour,
        getTimeDisplay(startTime ?? null).isAM
      );
      const startMinute = getTimeDisplay(startTime ?? null).minute;

      if (!isEndTimeAfterStart(startTime24, startMinute, hour24, minute)) {
        setToastMessage("시작 시간보다 종료시간은 빠를 수 없습니다.");
        const calculatedEnd = calculateEndTime(startTime24, startMinute);
        const newEndTime = new Date();
        newEndTime.setHours(calculatedEnd.hour, calculatedEnd.minute, 0, 0);
        setSessionEndTime(sessionId, newEndTime);
      } else {
        setSessionEndTime(sessionId, newTime);
      }
    }
  };

  const handleAMPMToggle = () => {
    const newIsAM = !localIsAM;
    setLocalIsAM(newIsAM);
    const hour = parseInt(localHour, 10);
    const minute = parseInt(localMinute, 10);

    if (isStartTime) {
      updateTime(hour, minute, newIsAM, true);
      // 시작 시간의 오전/오후 변경 시 종료 시간도 동일하게 변경
      if (endTime) {
        const endDisplay = getTimeDisplay(endTime);
        const newEndHour24 = convertTo24Hour(endDisplay.hour, newIsAM);
        const newEndTime = new Date();
        newEndTime.setHours(newEndHour24, endDisplay.minute, 0, 0);
        setSessionEndTime(sessionId, newEndTime);
      }
    } else {
      updateTime(hour, minute, newIsAM, false);
    }
  };

  const handleHourChangeByArrow = (value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 1 || numValue > 12) {
      return;
    }
    setLocalHour(value.padStart(2, "0"));
    updateTime(numValue, parseInt(localMinute, 10), localIsAM, isStartTime);
  };

  const handleMinuteChangeByArrow = (value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0 || numValue > 59) {
      return;
    }
    setLocalMinute(value.padStart(2, "0"));
    updateTime(parseInt(localHour, 10), numValue, localIsAM, isStartTime);
  };

  const handleHourKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 숫자가 아닌 문자만 차단 (화살표, Tab, Enter, Backspace, Delete는 허용)
    if (
      !/[0-9]/.test(e.key) &&
      ![
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Enter",
        "Backspace",
        "Delete",
      ].includes(e.key)
    ) {
      e.preventDefault();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const current = parseInt(localHour || "1", 10);
      const next = current >= 12 ? 1 : current + 1;
      handleHourChangeByArrow(next.toString());
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const current = parseInt(localHour || "1", 10);
      const prev = current <= 1 ? 12 : current - 1;
      handleHourChangeByArrow(prev.toString());
    }
  };

  const handleMinuteKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 숫자가 아닌 문자만 차단 (화살표, Tab, Enter, Backspace, Delete는 허용)
    if (
      !/[0-9]/.test(e.key) &&
      ![
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Enter",
        "Backspace",
        "Delete",
      ].includes(e.key)
    ) {
      e.preventDefault();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const current = parseInt(localMinute || "0", 10);
      const next = current >= 59 ? 0 : current + 1;
      handleMinuteChangeByArrow(next.toString());
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const current = parseInt(localMinute || "0", 10);
      const prev = current <= 0 ? 59 : current - 1;
      handleMinuteChangeByArrow(prev.toString());
    }
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // 숫자가 아닌 문자 제거
    value = value.replace(/[^0-9]/g, "");

    // 최대 2자리까지만 허용
    if (value.length > 2) {
      value = value.slice(0, 2);
    }

    // 빈 값이면 허용 (사용자가 삭제 중일 수 있음)
    if (value === "") {
      setLocalHour("");
      return;
    }

    // 한 자리 입력 중일 때는 그냥 표시만
    if (value.length === 1) {
      setLocalHour(value);
      return;
    }

    // 두 자리가 됐을 때 검증
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 12) {
      const paddedValue = value.padStart(2, "0");
      setLocalHour(paddedValue);
      updateTime(numValue, parseInt(localMinute, 10), localIsAM, isStartTime);
    } else {
      // 유효하지 않은 값이면 이전 값으로 복원
      const display = isStartTime
        ? getTimeDisplay(startTime ?? null)
        : getTimeDisplay(endTime ?? null);
      const hourStr = display.hour.toString().padStart(2, "0");
      setLocalHour(hourStr);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // 숫자가 아닌 문자 제거
    value = value.replace(/[^0-9]/g, "");

    // 최대 2자리까지만 허용
    if (value.length > 2) {
      value = value.slice(0, 2);
    }

    // 빈 값이면 허용 (사용자가 삭제 중일 수 있음)
    if (value === "") {
      setLocalMinute("");
      return;
    }

    // 한 자리 입력 중일 때는 그냥 표시만
    if (value.length === 1) {
      setLocalMinute(value);
      return;
    }

    // 두 자리가 됐을 때 검증
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 59) {
      const paddedValue = value.padStart(2, "0");
      setLocalMinute(paddedValue);
      updateTime(parseInt(localHour, 10), numValue, localIsAM, isStartTime);
    } else {
      // 유효하지 않은 값이면 이전 값으로 복원
      const display = isStartTime
        ? getTimeDisplay(startTime ?? null)
        : getTimeDisplay(endTime ?? null);
      const minuteStr = display.minute.toString().padStart(2, "0");
      setLocalMinute(minuteStr);
    }
  };

  const handleHourBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value, 10);

    // 빈 값이거나 유효하지 않은 값이면 이전 값으로 복원
    if (!value || isNaN(numValue) || numValue < 1 || numValue > 12) {
      const display = isStartTime
        ? getTimeDisplay(startTime ?? null)
        : getTimeDisplay(endTime ?? null);
      const hourStr = display.hour.toString().padStart(2, "0");
      setLocalHour(hourStr);
      return;
    }

    // 한 자리 수면 자동으로 0을 앞에 붙여서 두 자리로 변환
    if (value.length === 1) {
      const paddedValue = value.padStart(2, "0");
      setLocalHour(paddedValue);
      updateTime(
        parseInt(paddedValue, 10),
        parseInt(localMinute, 10),
        localIsAM,
        isStartTime
      );
    }
  };

  const handleMinuteBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseInt(value, 10);

    // 빈 값이거나 유효하지 않은 값이면 이전 값으로 복원
    if (!value || isNaN(numValue) || numValue < 0 || numValue > 59) {
      const display = isStartTime
        ? getTimeDisplay(startTime ?? null)
        : getTimeDisplay(endTime ?? null);
      const minuteStr = display.minute.toString().padStart(2, "0");
      setLocalMinute(minuteStr);
      return;
    }

    // 한 자리 수면 자동으로 0을 앞에 붙여서 두 자리로 변환
    if (value.length === 1) {
      const paddedValue = value.padStart(2, "0");
      setLocalMinute(paddedValue);
      updateTime(
        parseInt(localHour, 10),
        parseInt(paddedValue, 10),
        localIsAM,
        isStartTime
      );
    }
  };

  return (
    <>
      <div className="flex-1 w-full bg-white rounded-lg border border-[#E5E5E5] h-[52px] flex items-center relative overflow-hidden">
        <button
          onClick={handleAMPMToggle}
          aria-label={`${label} 오전/오후 선택`}
          className="shrink-0 mx-[10px] my-[7px] px-[8px] py-[8px] font-semibold leading-[130%] tracking-[-0.02em] text-[#323232] bg-[#F7F7F8] rounded-[4px] border border-[#E5E5E5] cursor-pointer whitespace-nowrap"
        >
          {localIsAM ? "오전" : "오후"}
        </button>
        <input
          ref={hourInputRef}
          type="text"
          inputMode="numeric"
          maxLength={2}
          value={localHour}
          onChange={handleHourChange}
          onKeyDown={handleHourKeyDown}
          onBlur={handleHourBlur}
          className={cn(
            "flex-1 min-w-0",
            TIME_BUTTON_BASE_STYLE,
            "cursor-text focus:outline-none border-0 bg-transparent text-center"
          )}
          aria-label={`${label} 시간 선택`}
          aria-valuemin={1}
          aria-valuemax={12}
          aria-valuenow={parseInt(localHour, 10)}
        />
        <span
          className={cn(TIME_BUTTON_BASE_STYLE, "shrink-0")}
          aria-hidden="true"
        >
          :
        </span>
        <input
          ref={minuteInputRef}
          type="text"
          inputMode="numeric"
          maxLength={2}
          value={localMinute}
          onChange={handleMinuteChange}
          onKeyDown={handleMinuteKeyDown}
          onBlur={handleMinuteBlur}
          className={cn(
            "flex-1 min-w-0",
            TIME_BUTTON_BASE_STYLE,
            "cursor-text focus:outline-none border-0 bg-transparent text-center"
          )}
          aria-label={`${label} 분 선택`}
          aria-valuemin={0}
          aria-valuemax={59}
          aria-valuenow={parseInt(localMinute, 10)}
        />
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </>
  );
};

export default TimePickerButton;
