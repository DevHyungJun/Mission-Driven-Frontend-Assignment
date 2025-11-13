import { Button } from "@/components";
import { SESSION_FIELDS } from "../constants/SESSION_FIELDS";

const TIME_BUTTON_BASE_STYLE =
  "py-[14.5px] text-[18px] leading-[130%] tracking-[-0.02em] text-[#121212] font-medium text-center";

interface SessionFieldButtonProps {
  field: (typeof SESSION_FIELDS)[number];
}

const SessionFieldButton = ({ field }: SessionFieldButtonProps) => {
  if (field.type === "simple") {
    return (
      <Button
        variant="outline"
        color="black"
        size="small"
        className="text-[#8F8F8F] bg-white w-full h-[52px] font-medium rounded-lg"
        ariaLabel={field.ariaLabel}
      >
        {field.placeholder}
      </Button>
    );
  }

  return (
    <div className="flex-1 w-full bg-white rounded-lg border border-[#E5E5E5] h-[52px] flex items-center">
      <button
        aria-label={field.ariaLabel}
        className="mx-[10px] my-[7px] p-[8px] font-semibold leading-[130%] tracking-[-0.02em] text-[#323232] bg-[#F7F7F8] rounded-[4px] border border-[#E5E5E5] cursor-pointer"
      >
        오후
      </button>
      <time className={`flex-1 ${TIME_BUTTON_BASE_STYLE} cursor-pointer`}>
        11
      </time>
      <span className={TIME_BUTTON_BASE_STYLE}>:</span>
      <time className={`flex-1 ${TIME_BUTTON_BASE_STYLE} cursor-pointer`}>
        00
      </time>
    </div>
  );
};

export default SessionFieldButton;

