import { Button } from "@/components";
import { MODAL_BUTTON_CONFIG } from "../constants/MODAL_BUTTON_CONFIG";
import { cn } from "@/utils/cn";

interface ModalButtonsProps {
  cancelText: string;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => void;
}

// 모달 버튼 컴포넌트
const ModalButtons = ({
  cancelText,
  confirmText,
  onClose,
  onConfirm,
}: ModalButtonsProps) => {
  return (
    <div className="w-full flex gap-2">
      {MODAL_BUTTON_CONFIG.map((buttonConfig, index) => {
        const isCancel = buttonConfig.id === "cancel";
        return (
          <Button
            key={index}
            variant={buttonConfig.variant}
            color={buttonConfig.color}
            onClick={isCancel ? onClose : onConfirm}
            className={cn(
              "w-full h-[48px] flex justify-center items-center",
              "md:h-[58px]"
            )}
            ariaLabel={isCancel ? cancelText : confirmText}
          >
            {isCancel ? cancelText : confirmText}
          </Button>
        );
      })}
    </div>
  );
};

export default ModalButtons;
