const adjustHeight = (textarea: HTMLTextAreaElement) => {
  textarea.style.height = "auto";
  const newHeight = Math.min(textarea.scrollHeight, 320);
  textarea.style.height = `${newHeight}px`;
};

export default adjustHeight;
