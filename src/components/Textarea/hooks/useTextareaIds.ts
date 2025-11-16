import { useId } from "react";

// 텍스트 입력 필드 ID 생성
const useTextareaIds = () => {
  const descriptionId = useId();
  // 텍스트 입력 필드 에러 ID 생성
  const errorId = useId();

  return { descriptionId, errorId };
};

export default useTextareaIds;
