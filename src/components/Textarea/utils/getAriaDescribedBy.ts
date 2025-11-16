// 텍스트 입력 필드 설명 접근성 처리
const getAriaDescribedBy = (
  descriptionId: string,
  errorId: string,
  isError: boolean
): string => {
  return `${descriptionId} ${isError ? errorId : ""}`.trim();
};

export default getAriaDescribedBy;
