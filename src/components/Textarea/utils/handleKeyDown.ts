import { KeyboardEvent } from "react";

// 텍스트 입력 필드 높이 초기화
const clearHeight = (textarea: HTMLTextAreaElement | null) => {
  if (!textarea) return;
  textarea.style.height = "auto";
};

// 텍스트 입력 필드 이벤트 처리
const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    e.currentTarget.form?.requestSubmit();
    clearHeight(e.currentTarget);
  }
};

export default handleKeyDown;
