"use client";

import { useEffect } from "react";
import { Textarea } from "@/components";
import { useSessionStore } from "@/stores";
import { Controller, useForm } from "react-hook-form";
import { TEXTAREA_VALIDATION } from "@/constant/TEXTAREA_VALIDATION";

interface DetailTextareaFormValues {
  detailTextarea: string;
}

interface DetailTextareaProps {
  sessionId: string;
}

// 세션 상세 텍스트 입력 필드
const DetailTextarea = ({ sessionId }: DetailTextareaProps) => {
  const { sessions, setSessionDetailText } = useSessionStore();
  const currentSession = sessions.find((session) => session.id === sessionId);
  const { control, watch } = useForm<DetailTextareaFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      detailTextarea: currentSession?.detailText || "",
    },
  });

  const detailTextareaValue = watch("detailTextarea");

  useEffect(() => {
    setSessionDetailText(sessionId, detailTextareaValue);
  }, [detailTextareaValue, sessionId, setSessionDetailText]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Controller
        name="detailTextarea"
        control={control}
        rules={TEXTAREA_VALIDATION}
        render={({ field, fieldState }) => (
          <Textarea
            {...field}
            placeholder="활동 내용을 간단히 입력해주세요"
            ariaLabel="활동 내용 입력 필드"
            maxLength={800}
            isError={!!fieldState.error}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
    </form>
  );
};

export default DetailTextarea;
