"use client";

import { Button } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";
import {
  ACTIVITY_TYPE_SELECTOR_OPTIONS,
  ActivityType,
} from "./constant/ACTIVITY_TYPE_SELECTOR_OPTIONS";
import { cn } from "@/app/_utils/cn";
import { useActivityTypeStore } from "@/stores";

const ActivityTypeSelector = () => {
  const { activityType, setActivityType } = useActivityTypeStore();

  // 활동 방식 변경 핸들러
  const handleActivityTypeChange = (value: ActivityType) => {
    // 활동 방식이 이미 선택된 경우 처리하지 않음
    if (activityType === value) return;
    setActivityType(value);
  };

  return (
    <SectionProvider
      title="활동 방식 선택"
      mode="with-description"
      description="만남을 어떤 방식으로 진행하시겠어요?"
    >
      <div
        className="w-full flex gap-2"
        role="radiogroup"
        aria-label="활동 방식 선택"
      >
        {ACTIVITY_TYPE_SELECTOR_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant="outline"
            color={activityType === option.value ? "green" : "black"}
            size="small"
            role="radio"
            aria-checked={activityType === option.value}
            className={cn(
              "w-full h-[47px] flex items-center justify-center text-[18px]",
              "md:h-[58px] md:text-[20px]"
            )}
            ariaLabel={option.label}
            onClick={() => handleActivityTypeChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </SectionProvider>
  );
};

export default ActivityTypeSelector;
