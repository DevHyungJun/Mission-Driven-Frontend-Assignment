const handleImageUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setMainImage: (imageUrl: string | null) => void,
  currentMainImage?: string | null
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png"];
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const fileExtension = file.name
    .toLowerCase()
    .substring(file.name.lastIndexOf("."));

  if (
    !allowedTypes.includes(file.type) &&
    !allowedExtensions.includes(fileExtension)
  ) {
    alert("jpg, png 형식의 이미지만 업로드 가능합니다.");
    return;
  }

  if (currentMainImage && currentMainImage.startsWith("blob:")) {
    URL.revokeObjectURL(currentMainImage);
  }

  const imageUrl = URL.createObjectURL(file);
  setMainImage(imageUrl);
};

export default handleImageUpload;
