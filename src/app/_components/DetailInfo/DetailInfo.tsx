import { Button, Textarea } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";
import { SESSION_FIELDS } from "./constants/SESSION_FIELDS";
import SessionFieldButton from "./internal/SessionFieldButton";
import { cn } from "@/app/_utils/cn";

const DetailInfo = () => {
  return (
    <SectionProvider title="상세 정보" mode="simple">
      <div className="w-full flex flex-col gap-[32px] bg-[#F7F7F8] border border-[#E5E5E5] rounded-[8px] px-[16px] py-[24px]">
        <div className="space-y-[12px]">
          <h3 className="text-[20px] leading-[130%] font-bold text-[#121212] tracking-[-0.02em]">
            회차 정보
          </h3>
          {SESSION_FIELDS.map((field) => (
            <div key={field.label} className="flex items-center gap-4">
              <label
                htmlFor={`session-field-${field.label}`}
                className="text-nowrap leading-[130%] tracking-[-0.02em] text-[#565656] font-semibold"
              >
                {field.label}
              </label>
              <SessionFieldButton field={field} />
            </div>
          ))}
        </div>

        <div className="space-y-[12px]">
          <div className="flex flex-col gap-2">
            <h3 className="text-[20px] leading-[130%] font-bold text-[#121212] tracking-[-0.02em]">
              활동 내용
            </h3>
            <p className="leading-[130%] tracking-[-0.02em] text-[#767676]">
              날짜별 활동 내용을 간단히 적어주세요
            </p>
          </div>
          <Textarea
            placeholder="활동 내용을 간단히 입력해주세요"
            ariaLabel="활동 내용 입력 필드"
          />
        </div>
      </div>
      <Button
        variant="default"
        color="dark-gray"
        className={cn(
          "w-full mt-[24px] h-[48px] flex items-center justify-center",
          "md:h-[58px] md:mt-0"
        )}
        ariaLabel="회차 추가하기 버튼"
      >
        회차 추가하기
      </Button>
    </SectionProvider>
  );
};

export default DetailInfo;
