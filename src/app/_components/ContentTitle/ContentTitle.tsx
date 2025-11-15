"use client";

import { Textarea } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";
import { useForm, Controller } from "react-hook-form";
import { useContentTitleStore } from "@/stores";
import { useEffect } from "react";
import { TEXTAREA_VALIDATION } from "@/constant/TEXTAREA_VALIDATION";

interface ContentTitleFormValues {
  contentTitle: string;
}

const ContentTitle = () => {
  const { contentTitle, setContentTitle } = useContentTitleStore();
  const { control, watch } = useForm<ContentTitleFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      contentTitle: contentTitle || "",
    },
  });
  const watchContentTitle = watch("contentTitle");

  useEffect(() => {
    setContentTitle(watchContentTitle);
  }, [watchContentTitle]);

  return (
    <SectionProvider title="콘텐츠 제목" mode="simple">
      <form onSubmit={(e) => e.preventDefault()}>
        <Controller
          name="contentTitle"
          control={control}
          rules={TEXTAREA_VALIDATION}
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
