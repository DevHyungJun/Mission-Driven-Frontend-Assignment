const handleMultiImageUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setAdditionalImages: (images: React.SetStateAction<string[]>) => void
) => {
  const files = e.target.files;
  if (!files) return;

  const allowedTypes = ["image/jpeg", "image/png"];
  const allowedExtensions = [".jpg", ".jpeg", ".png"];

  const invalidFiles = Array.from(files).filter((file) => {
    const fileExtension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf("."));

    return (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(fileExtension)
    );
  });

  if (invalidFiles.length > 0) {
    alert("jpg, png 형식의 이미지만 업로드 가능합니다.");
    return;
  }

  const additionalImages = Array.from(files).map((file) => {
    return URL.createObjectURL(file);
  });
  setAdditionalImages((prev) => [...prev, ...additionalImages]);
};

export default handleMultiImageUpload;
