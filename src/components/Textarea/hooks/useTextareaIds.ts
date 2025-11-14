import { useId } from "react";

const useTextareaIds = () => {
  const descriptionId = useId();
  const errorId = useId();

  return { descriptionId, errorId };
};

export default useTextareaIds;
