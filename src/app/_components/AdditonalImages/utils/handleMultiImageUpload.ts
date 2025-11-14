const handleMultiImageUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setAdditionalImages: (images: React.SetStateAction<string[]>) => void
) => {
  const files = e.target.files;
  if (!files) return;
  const additionalImages = Array.from(files).map((file) => {
    return URL.createObjectURL(file);
  });
  setAdditionalImages((prev) => [...prev, ...additionalImages]);
};

export default handleMultiImageUpload;
