"use client";

import { cn } from "@/app/utils/cn";
import { TextareaHTMLAttributes, useRef } from "react";
import adjustHeight from "./utils/adjustHeight";
import handleKeyDown from "./utils/handleKeyDown";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  errorMessage?: string;
  currentMessageLength?: number;
  isError?: boolean;
}

const Textarea = ({
  placeholder,
  isError = false,
  errorMessage,
  currentMessageLength = 0,
  ...props
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <div
        className={cn(
          "px-[16px] w-full rounded-lg border border-[#E5E5E5] focus-within:border-[#03C124]",
          isError && "border-[#E82929] focus-within:border-[#E82929]"
        )}
      >
        <textarea
          {...props}
          ref={textareaRef}
          onChange={(e) => adjustHeight(e.target)}
          onKeyDown={(e) => handleKeyDown(e, textareaRef)}
          rows={1}
          className="resize-none w-full min-h-[80px] max-h-[320px] leading-[130%] placeholder:text-[#8F8F8F] focus:outline-none py-[12px] text-[#121212] overflow-y-hidden"
          placeholder={placeholder}
        />
        <label className="flex justify-end items-center min-h-[38px] text-[#8F8F8F] text-sm">
          {currentMessageLength}/80자 (최소 8자)
        </label>
      </div>
      {isError && errorMessage && (
        <span className="mt-1 block text-[#E82929]">{errorMessage}</span>
      )}
    </>
  );
};

export default Textarea;
