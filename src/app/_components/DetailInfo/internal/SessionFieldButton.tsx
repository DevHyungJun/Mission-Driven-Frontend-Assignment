"use client";

import { SESSION_FIELDS } from "../constants/SESSION_FIELDS";
import DateSelectButton from "./DateSelectButton";
import TimePickerButton from "./TimePickerButton";

interface SessionFieldButtonProps {
  field: (typeof SESSION_FIELDS)[number];
  sessionId: string;
}

const SessionFieldButton = ({
  field,
  sessionId,
}: SessionFieldButtonProps) => {
  if (field.type === "simple") {
    return (
      <DateSelectButton
        sessionId={sessionId}
        ariaLabel={field.ariaLabel}
      />
    );
  }

  return <TimePickerButton label={field.label} />;
};

export default SessionFieldButton;
