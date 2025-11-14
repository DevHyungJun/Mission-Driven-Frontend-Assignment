const getAriaDescribedBy = (
  descriptionId: string,
  errorId: string,
  isError: boolean
): string => {
  return `${descriptionId} ${isError ? errorId : ""}`.trim();
};

export default getAriaDescribedBy;
