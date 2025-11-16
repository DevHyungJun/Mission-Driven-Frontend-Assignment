// 텍스트 입력 필드 높이 조정
const adjustHeight = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = "auto";
  // 새로운 높이 계산
  const newHeight = Math.min(textarea.scrollHeight, 320);
  // 텍스트 입력 필드 높이 조정
  textarea.style.height = `${newHeight}px`;
};

export default adjustHeight;
