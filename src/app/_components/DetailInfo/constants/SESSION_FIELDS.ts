export const SESSION_FIELDS = [
  {
    label: "날짜 선택",
    ariaLabel: "날짜 선택 버튼",
    type: "simple" as const,
  },
  {
    label: "시작 시간",
    ariaLabel: "시작 시간 선택 버튼",
    type: "timePicker" as const,
  },
  {
    label: "종료 시간",
    ariaLabel: "종료 시간 선택 버튼",
    type: "timePicker" as const,
  },
] as const;
