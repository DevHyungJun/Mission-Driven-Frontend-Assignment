import { ChangeEvent, KeyboardEvent } from "react";
import adjustHeight from "../utils/adjustHeight";
import handleKeyDown from "../utils/handleKeyDown";
import validateConsecutiveSpaces from "../utils/validateConsecutiveSpaces";

interface UseTextareaHandlersProps {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

// 텍스트 입력 필드 이벤트 핸들러 생성
const useTextareaHandlers = ({ onChange }: UseTextareaHandlersProps) => {
  // 텍스트 입력 필드 값 변경 시 이벤트 처리
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const hasConsecutiveSpaces = validateConsecutiveSpaces(newValue);

    if (hasConsecutiveSpaces) {
      return;
    }

    adjustHeight(e.target);
    onChange?.(e);
  };

  // 텍스트 입력 필드 이벤트 처리
  const handleKeyDownEvent = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDown(e);
  };

  // 텍스트 입력 필드 이벤트 핸들러 반환
  return { handleChange, handleKeyDownEvent };
};

export default useTextareaHandlers;
