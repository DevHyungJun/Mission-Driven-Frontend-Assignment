"use client";

import { Textarea } from "@/components";
import { useSessionStore } from "@/utils/store/store";
import { Controller, useForm } from "react-hook-form";
import { TEXTAREA_VALIDATION } from "@/constant/TEXTAREA_VALIDATION";
interface DetailTextareaFormValues {
  detailTextarea: string;
}
const DetailTextarea = () => {
  const { sessions, setSessionStartTime } = useSessionStore();
  const { control, handleSubmit, watch } = useForm<DetailTextareaFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      detailTextarea: "",
    },
  });

  const onSubmit = (data: DetailTextareaFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="detailTextarea"
        control={control}
        rules={TEXTAREA_VALIDATION}
        render={({ field, fieldState }) => (
          <Textarea
            {...field}
            placeholder="활동 내용을 간단히 입력해주세요"
            ariaLabel="활동 내용 입력 필드"
            maxLength={80}
            isError={!!fieldState.error}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
    </form>
  );
};

export default DetailTextarea;
