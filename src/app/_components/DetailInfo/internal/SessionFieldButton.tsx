"use client";

import { SESSION_FIELDS } from "../constants/SESSION_FIELDS";
import DateSelectButton from "./DateSelectButton";
import TimePickerButton from "./TimePickerButton";

interface SessionFieldButtonProps {
  field: (typeof SESSION_FIELDS)[number];
  sessionIndex: number;
}

const SessionFieldButton = ({
  field,
  sessionIndex,
}: SessionFieldButtonProps) => {
  if (field.type === "simple") {
    return (
      <DateSelectButton
        sessionIndex={sessionIndex}
        ariaLabel={field.ariaLabel}
      />
    );
  }

  return <TimePickerButton label={field.label} />;
};

export default SessionFieldButton;
