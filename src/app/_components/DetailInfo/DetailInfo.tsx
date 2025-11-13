import { Button, Textarea } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";

const DetailInfo = () => {
  return (
    <SectionProvider title="상세 정보" mode="simple">
      <div className="w-full flex flex-col gap-[32px] bg-[#F7F7F8] border border-[#E5E5E5] rounded-[8px] px-[16px] py-[24px]">
        <div className="space-y-[16px]">
          <div className="space-y-[12px]">
            <div className="flex items-center gap-4">
              <span className="text-nowrap leading-[130%] tracking-[-0.02em] text-[#565656] font-semibold">
                날짜 선택
              </span>
              <Button
                variant="outline"
                color="black"
                size="small"
                className="text-[#8F8F8F] bg-white w-full font-medium"
                ariaLabel="날짜 선택 버튼"
              >
                날짜를 선택해주세요
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-nowrap leading-[130%] tracking-[-0.02em] text-[#565656] font-semibold">
                시작 시간
              </span>
              <Button
                variant="outline"
                color="black"
                size="small"
                className="text-[#8F8F8F] bg-white w-full font-medium"
                ariaLabel="날짜 선택 버튼"
              >
                날짜를 선택해주세요
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-nowrap leading-[130%] tracking-[-0.02em] text-[#565656] font-semibold">
                종료 시간
              </span>
              <Button
                variant="outline"
                color="black"
                size="small"
                className="text-[#8F8F8F] bg-white w-full font-medium"
                ariaLabel="날짜 선택 버튼"
              >
                날짜를 선택해주세요
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-[12px]">
          <div className="flex flex-col gap-2">
            <h3 className="text-[20px] leading-[130%] font-bold text-[#121212] tracking-[-0.02em]">
              활동 내용
            </h3>
            <p className="leading-[130%] tracking-[-0.02em] text-[#767676] font-medium">
              날짜별 활동 내용을 간단히 적어주세요
            </p>
          </div>
          <Textarea
            placeholder="활동 내용을 간단히 입력해주세요"
            ariaLabel="활동 내용 입력 필드"
          />
        </div>
      </div>
    </SectionProvider>
  );
};

export default DetailInfo;
