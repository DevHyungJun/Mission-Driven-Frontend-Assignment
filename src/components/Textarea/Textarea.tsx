"use client";

import { cn } from "@/utils/cn";
import { TextareaHTMLAttributes, forwardRef } from "react";
import useTextareaIds from "./hooks/useTextareaIds";
import useTextareaHandlers from "./hooks/useTextareaHandlers";
import getAriaDescribedBy from "./utils/getAriaDescribedBy";

/**
 * 텍스트 입력 필드 컴포넌트
 * @param placeholder - 텍스트 입력 필드 플레이스홀더(필수)
 * @param errorMessage - 에러 메시지(선택)
 * @param isError - 에러 여부(선택)
 * @param ariaLabel - 접근성 라벨(선택)
 * @param value - 텍스트 입력 필드 값(선택)
 * @param onChange - 텍스트 입력 필드 값 변경 시 콜백(선택)
 * @param onBlur - 텍스트 입력 필드 포커스 이탈 시 콜백(선택)
 * @param maxLength - 최대 자리수(선택)
 *
 * @example
 * <form onSubmit={(e) => e.preventDefault()}>
 *   <Controller
 *     name="contentTitle"
 *     control={control}
 *     rules={TEXTAREA_VALIDATION}
 *     render={({ field, fieldState }) => (
 *       <Textarea {...field} placeholder="제목을 입력해주세요" ariaLabel="콘텐츠 제목 입력 필드" isError={!!fieldState.error} errorMessage={fieldState.error?.message} />
 *     )}
 *   />
 * </form>
 *
 * @description
 * Textarea는 React Hook Form을 기반으로 관리됩니다.
 * Controller 컴포넌트 내부에서 사용되어야 하며, name, control, render 속성은 필수입니다.
 */

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
  maxLength?: number;
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
      maxLength = 80,
      ...props
    },
    ref
  ) => {
    // 텍스트 입력 필드 ID 생성
    const { descriptionId, errorId } = useTextareaIds();
    // 텍스트 입력 필드 이벤트 핸들러 생성
    const { handleChange, handleKeyDownEvent } = useTextareaHandlers({
      onChange,
    });
    // 현재 메시지 길이 계산
    const currentMessageLength = value.length;
    // 텍스트 입력 필드 설명 접근성 처리
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
            maxLength={maxLength}
            className="resize-none w-full min-h-[80px] max-h-[320px] leading-[130%] placeholder:text-[#8F8F8F] focus:outline-none py-[12px] text-[#121212] overflow-y-hidden"
            placeholder={placeholder}
          />
          <div
            id={descriptionId}
            className="flex justify-end items-center min-h-[38px] text-[#8F8F8F] text-sm"
          >
            {currentMessageLength}/{maxLength}자 (최소 8자)
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
