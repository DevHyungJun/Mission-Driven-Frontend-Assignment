"use client";

import { Button, Icon, Modal } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";
import { SESSION_FIELDS } from "./constants/SESSION_FIELDS";
import SessionFieldButton from "./internal/SessionFieldButton";
import { cn } from "@/app/_utils/cn";
import { useSessionStore } from "@/stores";
import DetailTextarea from "./internal/DetailTextarea/DetailTextarea";
import { useState } from "react";

const DetailInfo = () => {
  const { sessions, addSession, removeSession } = useSessionStore();
  const [openModal, setOpenModal] = useState(false);
  // 삭제할 세션 ID 상태
  const [sessionIdToDelete, setSessionIdToDelete] = useState<string>("");

  // 세션 삭제 핸들러
  const handleRemoveSession = () => {
    if (!sessionIdToDelete) return;
    setOpenModal(false);
    removeSession(sessionIdToDelete);
    setSessionIdToDelete("");
  };

  return (
    <SectionProvider title="상세 정보" mode="simple">
      {sessions.map((sessionDate, sessionIndex) => (
        <div
          key={sessionDate.id}
          className="w-full flex flex-col gap-[32px] bg-[#F7F7F8] border border-[#E5E5E5] rounded-[8px] px-[16px] py-[24px] mb-4 relative"
        >
          {sessions.length > 1 && (
            <button
              onClick={() => {
                setOpenModal(true);
                setSessionIdToDelete(sessionDate.id);
              }}
              className="absolute p-2.5 top-1 cursor-pointer right-1 flex items-center justify-center text-[#8F8F8F] hover:text-[#121212] transition-colors focus:outline-none"
              aria-label={`${sessionIndex + 1}회차 삭제`}
            >
              <Icon name="X" size={28} />
            </button>
          )}
          <div className="space-y-[12px]">
            <h3 className="text-[20px] leading-[130%] font-bold text-[#121212] tracking-[-0.02em]">
              {sessionIndex + 1}회차 정보
            </h3>
            {SESSION_FIELDS.map((field) => (
              <div key={field.label} className="flex items-center gap-4">
                <label className="text-nowrap leading-[130%] tracking-[-0.02em] text-[#565656] font-semibold">
                  {field.label}
                </label>
                <SessionFieldButton field={field} sessionId={sessionDate.id} />
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
            <DetailTextarea sessionId={sessionDate.id} />
          </div>
        </div>
      ))}
      <Button
        variant="default"
        color="dark-gray"
        className={cn(
          "w-full mt-[24px] h-[48px] flex items-center justify-center",
          "md:h-[58px] md:mt-0"
        )}
        ariaLabel="회차 추가하기 버튼"
        onClick={addSession}
      >
        회차 추가하기
      </Button>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleRemoveSession}
        title={
          <>
            작성된 내용을 <br className="hidden md:block" />
            삭제하시겠어요?
          </>
        }
        subtitle="삭제한 내용은 복구할 수 없습니다."
        cancelText="취소"
        confirmText="삭제하기"
      />
    </SectionProvider>
  );
};

export default DetailInfo;
