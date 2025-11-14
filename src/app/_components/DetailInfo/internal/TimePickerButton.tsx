"use client";

const TIME_BUTTON_BASE_STYLE =
  "py-[14.5px] text-[18px] leading-[130%] tracking-[-0.02em] text-[#121212] text-center";

interface TimePickerButtonProps {
  label: string;
}

const TimePickerButton = ({ label }: TimePickerButtonProps) => {
  return (
    <div className="flex-1 w-full bg-white rounded-lg border border-[#E5E5E5] h-[52px] flex items-center">
      <button
        aria-label={`${label} 오전/오후 선택`}
        className="mx-[10px] my-[7px] p-[8px] font-semibold leading-[130%] tracking-[-0.02em] text-[#323232] bg-[#F7F7F8] rounded-[4px] border border-[#E5E5E5] cursor-pointer"
      >
        오후
      </button>
      <button
        aria-label={`${label} 시간 선택`}
        className={`flex-1 ${TIME_BUTTON_BASE_STYLE} cursor-pointer`}
      >
        11
      </button>
      <span className={TIME_BUTTON_BASE_STYLE} aria-hidden="true">
        :
      </span>
      <button
        aria-label={`${label} 분 선택`}
        className={`flex-1 ${TIME_BUTTON_BASE_STYLE} cursor-pointer`}
      >
        00
      </button>
    </div>
  );
};

export default TimePickerButton;

