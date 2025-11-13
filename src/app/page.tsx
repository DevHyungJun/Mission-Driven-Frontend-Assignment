"use client";

import { Button, Header, Icon, Textarea } from "@/components";
import { useRef } from "react";
import MainImageUpload from "./_components/MainImageUpload/MainImageUpload";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
    }
  };

  return (
    <>
      <Header />
      <main className="px-[16px] pb-[84px]">
        <MainImageUpload
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
        />

        <section className="pt-[40px] space-y-[12px]">
          <div className="flex flex-col gap-2">
            <h2 className="text-[22px] leading-[130%] font-bold text-[#121212]">
              추가 이미지 (선택)
            </h2>
            <p className="text-[#767676]">최대 4장까지 등록할 수 있어요</p>
          </div>
          <label className="w-[120px] h-[120px] bg-[#F7F7F8] border border-[#E5E5E5] rounded-[8px] flex items-center justify-center cursor-pointer hover:bg-[#E5E5E5]">
            <Icon name="Plus" size={32} />
            <input
              type="file"
              name="additional-image"
              id="additional-image"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              required
            />
          </label>
        </section>

        <section className="pt-[40px] space-y-[12px]">
          <h2 className="text-[22px] leading-[130%] font-bold text-[#121212]">
            카테고리
          </h2>
          <button
            aria-label="카테고리 선택 버튼"
            className="w-full flex justify-between items-center px-[16px] py-[12px] border border-[#E5E5E5] rounded-[8px] text-[#8F8F8F] cursor-pointer leading-[130%] tracking-[-0.02em]"
          >
            주제를 선택하세요 <Icon name="ChevronRight" />
          </button>
        </section>

        <section className="pt-[40px] space-y-[12px]">
          <h2 className="text-[22px] leading-[130%] font-bold text-[#121212]">
            콘텐츠 제목
          </h2>
          <Textarea
            placeholder="제목을 입력해주세요"
            ariaLabel="콘텐츠 제목 입력 필드"
          />
        </section>

        <section className="pt-[40px] space-y-[12px]">
          <div className="flex flex-col gap-2">
            <h2 className="text-[22px] leading-[130%] font-bold text-[#121212]">
              활동 방식 선택
            </h2>
            <p className="text-[#767676] text-[18px] leading-[130%] tracking-[-0.02em]">
              만남을 어떤 방식으로 진행하시겠어요?
            </p>
          </div>
          <div className="w-full flex gap-2">
            <Button
              variant="outline"
              color="black"
              className="w-full"
              ariaLabel="온라인 버튼"
            >
              온라인
            </Button>
            <Button
              variant="outline"
              color="black"
              className="w-full"
              ariaLabel="직접 만나기 버튼"
            >
              직접 만나기
            </Button>
          </div>
        </section>

        <section className="pt-[40px] space-y-[12px]">
          <h2 className="text-[22px] leading-[130%] font-bold text-[#121212]">
            상세 정보
          </h2>
          <div className="w-full flex flex-col gap-[32px] bg-[#F7F7F8] border border-[#E5E5E5] rounded-[8px] px-[16px] py-[24px]">
            <div className="space-y-[16px]">
              <h3 className="text-[20px] leading-[130%] font-bold text-[#121212] tracking-[-0.02em]">
                회차 정보
              </h3>

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
        </section>

        <Button
          variant="default"
          color="dark-gray"
          className="w-full mt-[24px]"
          ariaLabel="회차 추가하기 버튼"
        >
          회차 추가하기
        </Button>

        <div className="fixed bottom-0 left-0 right-0 w-full px-[16px] py-[16px] bg-white">
          <Button
            variant="default"
            color="light-green"
            className="w-full"
            disabled
            ariaLabel="다음으로 버튼"
          >
            다음으로
          </Button>
        </div>
      </main>
    </>
  );
}
