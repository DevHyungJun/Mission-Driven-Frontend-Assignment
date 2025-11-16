"use client";

import { Icon } from "@/components";
import { cn } from "@/app/_utils/cn";

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
      <Icon name="X" size={iconSize} />
    </button>
  );
};

export default ImageDeleteButton;

