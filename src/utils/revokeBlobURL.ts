// 메모리 누수 방지를 위해 blob URL 삭제
export const revokeBlobURL = (imageUrl: string | null): void => {
  if (imageUrl && imageUrl.startsWith("blob:")) {
    URL.revokeObjectURL(imageUrl);
  }
};
