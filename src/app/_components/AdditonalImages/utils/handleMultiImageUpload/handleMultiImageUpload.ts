import { toast } from "@/provider/ToastProvider/ToastProvider";

// 여러 이미지 업로드 핸들러
const handleMultiImageUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setAdditionalImages: (images: React.SetStateAction<string[]>) => void
) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  // 허용된 이미지 타입 설정
  const allowedTypes = ["image/jpeg", "image/png"];
  const allowedExtensions = [".jpg", ".jpeg", ".png"];

  // 유효하지 않은 이미지 필터링
  const invalidFiles = Array.from(files).filter((file) => {
    const fileExtension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf("."));

    return (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(fileExtension)
    );
  });

  // 유효하지 않은 이미지가 있는 경우 토스트 메시지 표시
  if (invalidFiles.length > 0) {
    toast.show("jpg, png 형식의 이미지만 업로드 가능합니다.");
    return;
  }

  // 최대 추가 이미지 개수 설정
  const MAX_ADDITIONAL_IMAGES = 4;
  // 추가 이미지 업데이트
  setAdditionalImages((prev) => {
    const remainingSlots = MAX_ADDITIONAL_IMAGES - prev.length;
    if (remainingSlots <= 0) {
      toast.show("최대 4장까지 등록할 수 있습니다.");
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
