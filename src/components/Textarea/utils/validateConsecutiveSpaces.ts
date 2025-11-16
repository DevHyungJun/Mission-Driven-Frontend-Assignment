// 연속된 공백 검증
const validateConsecutiveSpaces = (value: string): boolean => {
  return /\s{2,}/.test(value);
};

export default validateConsecutiveSpaces;
