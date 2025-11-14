import { KeyboardEvent } from "react";

const clearHeight = (textarea: HTMLTextAreaElement | null) => {
  if (!textarea) return;
  textarea.style.height = "auto";
};

const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    e.currentTarget.form?.requestSubmit();
    clearHeight(e.currentTarget);
  }
};

export default handleKeyDown;
