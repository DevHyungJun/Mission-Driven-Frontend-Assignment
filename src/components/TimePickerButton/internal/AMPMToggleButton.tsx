interface AMPMToggleButtonProps {
  isAM: boolean;
  label: string;
  onClick: () => void;
}

export const AMPMToggleButton = ({
  isAM,
  label,
  onClick,
}: AMPMToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={`${label} 오전/오후 선택`}
      className="shrink-0 mx-[10px] my-[7px] px-[8px] py-[8px] font-semibold leading-[130%] tracking-[-0.02em] text-[#323232] bg-[#F7F7F8] rounded-[4px] border border-[#E5E5E5] cursor-pointer whitespace-nowrap"
    >
      {isAM ? "오전" : "오후"}
    </button>
  );
};
