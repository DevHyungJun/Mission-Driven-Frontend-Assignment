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

/**
 * 시간 선택 버튼 컴포넌트
 * 모든 props는 필수입니다.
 * @param label - 라벨
 * @param sessionId - 세션 ID
 *
 * @example
 * <TimePickerButton label="시작 시간" sessionId="1" />
 *
 * @description
 * 회차 정보를 입력할 때 시작 시간 또는 종료 시간을 선택할 수 있습니다.
 * 사용자는 키보드 입력(숫자, 방향키)을 통해 시간을 입력할 수 있습니다.
 * 오전/오후 토글 버튼을 통해 시간을 선택할 수 있습니다.
 * 시작 시간이 12시 30분이라면 종료 시간은 자동적으로 1시 30분으로 설정됩니다.
 * 시작 시간의 오전/오후 토글을 변경하면 종료 시간의 오전/오후도 자동으로 변경됩니다.
 * 종료 시간이 시작 시간보다 빠르다면 토스트 메시지가 표시되고, 종료 시간이 자동으로 시작 시간의 1시간 후로 설정됩니다.
 */

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
