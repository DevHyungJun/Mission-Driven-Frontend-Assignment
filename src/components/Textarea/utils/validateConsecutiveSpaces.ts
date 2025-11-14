const validateConsecutiveSpaces = (value: string): boolean => {
  return /\s{2,}/.test(value);
};

export default validateConsecutiveSpaces;
