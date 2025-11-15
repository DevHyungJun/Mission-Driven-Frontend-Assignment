import { toast } from "@/provider/ToastProvider/ToastProvider";

const handleMultiImageUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setAdditionalImages: (images: React.SetStateAction<string[]>) => void
) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

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
    toast.show("jpg, png 형식의 이미지만 업로드 가능합니다.");
    return;
  }

  const MAX_ADDITIONAL_IMAGES = 4;
  setAdditionalImages((prev) => {
    const remainingSlots = MAX_ADDITIONAL_IMAGES - prev.length;
    if (remainingSlots <= 0) {
      toast.show("최대 4장까지 등록할 수 있습니다.");
      return prev;
    }

    const filesToAdd = Array.from(files).slice(0, remainingSlots);
    const additionalImages = filesToAdd.map((file) => {
      return URL.createObjectURL(file);
    });
    return [...prev, ...additionalImages];
  });
};

export default handleMultiImageUpload;
