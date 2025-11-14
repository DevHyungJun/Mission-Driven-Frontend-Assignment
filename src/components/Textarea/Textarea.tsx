"use client";

import { cn } from "@/app/_utils/cn";
import { TextareaHTMLAttributes, forwardRef } from "react";
import useTextareaIds from "./hooks/useTextareaIds";
import useTextareaHandlers from "./hooks/useTextareaHandlers";
import getAriaDescribedBy from "./utils/getAriaDescribedBy";

interface TextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange" | "onBlur"
  > {
  placeholder: string;
  errorMessage?: string;
  isError?: boolean;
  ariaLabel?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      placeholder,
      isError = false,
      errorMessage,
      ariaLabel = "텍스트 입력 필드",
      value = "",
      onChange,
      onBlur,
      ...props
    },
    ref
  ) => {
    const { descriptionId, errorId } = useTextareaIds();
    const { handleChange, handleKeyDownEvent } = useTextareaHandlers({
      onChange,
    });
    const currentMessageLength = value.length;
    const ariaDescribedBy = getAriaDescribedBy(descriptionId, errorId, isError);

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
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            ref={ref}
            onKeyDown={handleKeyDownEvent}
            rows={1}
            maxLength={80}
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
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
