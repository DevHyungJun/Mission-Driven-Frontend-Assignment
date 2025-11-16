// 모달 핸들러 생성
const createModalHandlers = (
  isLoading: boolean,
  onClose: () => void,
  onConfirm: () => void
) => {
  // 로딩 중인 경우 빈 함수 반환
  const handleClose = isLoading ? () => {} : onClose;
  const handleConfirm = isLoading ? () => {} : onConfirm;

  return { handleClose, handleConfirm };
};

export default createModalHandlers;
