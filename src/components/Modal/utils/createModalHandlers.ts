const createModalHandlers = (
  isLoading: boolean,
  onClose: () => void,
  onConfirm: () => void
) => {
  const handleClose = isLoading ? () => {} : onClose;
  const handleConfirm = isLoading ? () => {} : onConfirm;

  return { handleClose, handleConfirm };
};

export default createModalHandlers;

