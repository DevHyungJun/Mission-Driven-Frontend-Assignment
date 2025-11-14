"use client";

import { Textarea } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";
import { useForm, Controller } from "react-hook-form";
import { CONTENT_TITLE_VALIDATION } from "./constant/CONTENT_TITLE_VALIDATION";

interface ContentTitleFormValues {
  contentTitle: string;
}

const ContentTitle = () => {
  const { control, handleSubmit } = useForm<ContentTitleFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      contentTitle: "",
    },
  });

  const onSubmit = (data: ContentTitleFormValues) => {
    console.log(data);
  };

  return (
    <SectionProvider title="콘텐츠 제목" mode="simple">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="contentTitle"
          control={control}
          rules={CONTENT_TITLE_VALIDATION}
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              placeholder="제목을 입력해주세요"
              ariaLabel="콘텐츠 제목 입력 필드"
              isError={!!fieldState.error}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      </form>
    </SectionProvider>
  );
};

export default ContentTitle;
