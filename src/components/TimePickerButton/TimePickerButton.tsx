"use client";

import { useState, useRef } from "react";
import { useSessionStore } from "@/stores";
import { Toast } from "@/components";
import { useTimeDisplay } from "./hooks/useTimeDisplay";
import { useTimeUpdate } from "./hooks/useTimeUpdate";
import { useTimeInput } from "./hooks/useTimeInput";
import { getTimeDisplay, formatTimeDisplay } from "./utils/timeDisplayUtils";
import { AMPMToggleButton } from "./internal/AMPMToggleButton";
import { TimeInput } from "./internal/TimeInput";
import { TimeSeparator } from "./internal/TimeSeparator";

interface TimePickerButtonProps {
  label: string;
  sessionId: string;
}

const TimePickerButton = ({ label, sessionId }: TimePickerButtonProps) => {
  const { sessions } = useSessionStore();
  const currentSession = sessions.find((session) => session.id === sessionId);
  const isStartTime = label === "시작 시간";

  const startTime = currentSession?.startTime;
  const endTime = currentSession?.endTime;
  const currentTime = isStartTime ? startTime : endTime;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const hourInputRef = useRef<HTMLInputElement | null>(null);
  const minuteInputRef = useRef<HTMLInputElement | null>(null);

  const {
    localHour,
    localMinute,
    localIsAM,
    setLocalHour,
    setLocalMinute,
    setLocalIsAM,
  } = useTimeDisplay({ time: currentTime ?? null });

  const { updateTime, handleAMPMToggle: updateAMPM } = useTimeUpdate({
    sessionId,
    isStartTime,
    onValidationError: setToastMessage,
  });

  const restoreTimeDisplay = () => {
    const display = getTimeDisplay(currentTime ?? null);
    const formatted = formatTimeDisplay(display);
    setLocalHour(formatted.hour);
    setLocalMinute(formatted.minute);
  };

  const {
    handleHourChange,
    handleMinuteChange,
    handleHourKeyDown,
    handleMinuteKeyDown,
    handleHourBlur,
    handleMinuteBlur,
  } = useTimeInput({
    localHour,
    localMinute,
    localIsAM,
    setLocalHour,
    setLocalMinute,
    onTimeUpdate: updateTime,
    onRestore: restoreTimeDisplay,
  });

  const handleAMPMToggle = () => {
    const newIsAM = !localIsAM;
    setLocalIsAM(newIsAM);
    const hour = parseInt(localHour, 10);
    const minute = parseInt(localMinute, 10);
    updateAMPM(hour, minute, newIsAM);
  };

  return (
    <>
      <div className="flex-1 w-full bg-white rounded-lg border border-[#E5E5E5] h-[52px] flex items-center relative overflow-hidden">
        <AMPMToggleButton
          isAM={localIsAM}
          label={label}
          onClick={handleAMPMToggle}
        />
        <TimeInput
          inputRef={hourInputRef}
          value={localHour}
          label={label}
          type="hour"
          onChange={handleHourChange}
          onKeyDown={handleHourKeyDown}
          onBlur={handleHourBlur}
        />
        <TimeSeparator />
        <TimeInput
          inputRef={minuteInputRef}
          value={localMinute}
          label={label}
          type="minute"
          onChange={handleMinuteChange}
          onKeyDown={handleMinuteKeyDown}
          onBlur={handleMinuteBlur}
        />
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </>
  );
};

export default TimePickerButton;
