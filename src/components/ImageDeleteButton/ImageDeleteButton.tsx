"use client";

import { Icon } from "@/components";
import { cn } from "@/utils/cn";

/**
 * 이미지 삭제 버튼 컴포넌트
 * @param onDelete - 이미지 삭제 함수
 * @param ariaLabel - 접근성 라벨
 * @param className - 추가 스타일 클래스
 * @param iconSize - 아이콘 크기
 *
 * @example
 * <ImageDeleteButton onDelete={() => {}} ariaLabel="이미지 삭제" className="custom-class" iconSize={20} />
 *
 * @description
 * - 이미지 삭제 버튼을 클릭하면 이미지 삭제 함수를 호출합니다.
 */

interface ImageDeleteButtonProps {
  onDelete: () => void;
  ariaLabel: string;
  className?: string;
  iconSize?: number;
}

const ImageDeleteButton = ({
  onDelete,
  ariaLabel,
  className,
  iconSize = 20,
}: ImageDeleteButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      className={cn(
        "absolute p-1.5 top-1 right-1 flex items-center justify-center text-[#8F8F8F] hover:text-[#121212] transition-colors focus:outline-none bg-white/80 hover:bg-white rounded-full cursor-pointer",
        className
      )}
      aria-label={ariaLabel}
    >
      <Icon name="X" size={iconSize} ariaLabel={`${ariaLabel} 삭제`} />
    </button>
  );
};

export default ImageDeleteButton;
