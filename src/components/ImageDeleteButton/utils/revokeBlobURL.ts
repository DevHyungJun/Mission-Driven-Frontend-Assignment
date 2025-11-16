export const revokeBlobURL = (imageUrl: string | null): void => {
  if (imageUrl && imageUrl.startsWith("blob:")) {
    URL.revokeObjectURL(imageUrl);
  }
};

