import { ChangeEvent, KeyboardEvent } from "react";
import adjustHeight from "../utils/adjustHeight";
import handleKeyDown from "../utils/handleKeyDown";
import validateConsecutiveSpaces from "../utils/validateConsecutiveSpaces";

interface UseTextareaHandlersProps {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const useTextareaHandlers = ({ onChange }: UseTextareaHandlersProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const hasConsecutiveSpaces = validateConsecutiveSpaces(newValue);

    if (hasConsecutiveSpaces) {
      return;
    }

    adjustHeight(e.target);
    onChange?.(e);
  };

  const handleKeyDownEvent = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDown(e);
  };

  return { handleChange, handleKeyDownEvent };
};

export default useTextareaHandlers;
