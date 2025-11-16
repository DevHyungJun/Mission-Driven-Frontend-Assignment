import { toast } from "@/provider/ToastProvider/ToastProvider";

// 허용된 이미지 타입 설정
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];
const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

// 여러 이미지 업로드 핸들러
const handleMultiImageUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setAdditionalImages: (images: React.SetStateAction<string[]>) => void,
  maxAdditionalImages: number
) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  // 유효하지 않은 이미지 필터링
  const invalidFiles = Array.from(files).filter((file) => {
    const fileExtension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf("."));

    return (
      !ALLOWED_IMAGE_TYPES.includes(file.type) &&
      !ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension)
    );
  });

  // 유효하지 않은 이미지가 있는 경우 토스트 메시지 표시
  if (invalidFiles.length > 0) {
    toast.show("jpg, png 형식의 이미지만 업로드 가능합니다.");
    return;
  }

  // 추가 이미지 업데이트
  setAdditionalImages((prev) => {
    const remainingSlots = maxAdditionalImages - prev.length;
    if (remainingSlots <= 0) {
      toast.show(`최대 ${maxAdditionalImages}장까지 등록할 수 있습니다.`);
      return prev;
    }
    // 추가 이미지 파일 설정
    const filesToAdd = Array.from(files).slice(0, remainingSlots);
    // 추가 이미지 URL 생성
    const additionalImages = filesToAdd.map((file) => {
      return URL.createObjectURL(file);
    });
    // 추가 이미지 업데이트
    return [...prev, ...additionalImages];
  });
};

export default handleMultiImageUpload;
