"use client";

import { SESSION_FIELDS } from "../constants/SESSION_FIELDS";
import DateSelectButton from "./DateSelectButton";
import { TimePickerButton } from "@/components";

interface SessionFieldButtonProps {
  field: (typeof SESSION_FIELDS)[number];
  sessionId: string;
}

// 세션 필드 버튼
const SessionFieldButton = ({ field, sessionId }: SessionFieldButtonProps) => {
  // 세션 필드 타입이 simple인 경우 날짜 선택 버튼 반환
  if (field.type === "simple") {
    return (
      <DateSelectButton sessionId={sessionId} ariaLabel={field.ariaLabel} />
    );
  }

  // 세션 필드 타입이 time인 경우 시간 선택 버튼 반환
  return <TimePickerButton label={field.label} sessionId={sessionId} />;
};

export default SessionFieldButton;
