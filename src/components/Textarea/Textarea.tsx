"use client";

import { cn } from "@/app/_utils/cn";
import { TextareaHTMLAttributes, useId, useRef } from "react";
import adjustHeight from "./utils/adjustHeight";
import handleKeyDown from "./utils/handleKeyDown";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  errorMessage?: string;
  currentMessageLength?: number;
  isError?: boolean;
  ariaLabel?: string;
}

const Textarea = ({
  placeholder,
  isError = false,
  errorMessage,
  currentMessageLength = 0,
  ariaLabel = "텍스트 입력 필드",
  ...props
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const descriptionId = useId();
  const errorId = useId();

  return (
    <>
      <div
        className={cn(
          "px-[16px] w-full rounded-lg border border-[#E5E5E5] focus-within:border-[#03C124] bg-white",
          isError && "border-[#E82929] focus-within:border-[#E82929]"
        )}
      >
        <textarea
          {...props}
          aria-label={ariaLabel}
          aria-describedby={`${descriptionId} ${isError ? errorId : ""}`.trim()}
          ref={textareaRef}
          onChange={(e) => adjustHeight(e.target)}
          onKeyDown={(e) => handleKeyDown(e, textareaRef)}
          rows={1}
          className="resize-none w-full min-h-[80px] max-h-[320px] leading-[130%] placeholder:text-[#8F8F8F] focus:outline-none py-[12px] text-[#121212] overflow-y-hidden"
          placeholder={placeholder}
        />
        <div
          id={descriptionId}
          className="flex justify-end items-center min-h-[38px] text-[#8F8F8F] text-sm"
        >
          {currentMessageLength}/80자 (최소 8자)
        </div>
      </div>
      {isError && errorMessage && (
        <span id={errorId} className="mt-1 block text-[#E82929]" role="alert">
          {errorMessage}
        </span>
      )}
    </>
  );
};

export default Textarea;
