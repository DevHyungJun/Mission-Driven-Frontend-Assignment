import { toast } from "@/provider/ToastProvider/ToastProvider";
import { revokeBlobURL } from "@/utils/revokeBlobURL";

// 이미지 업로드 핸들러
const handleImageUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
  setMainImage: (imageUrl: string | null) => void,
  currentMainImage?: string | null
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // 허용된 이미지 타입 설정
  const allowedTypes = ["image/jpeg", "image/png"];
  // 허용된 이미지 확장자 설정
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  // 파일 확장자 가져오기
  const fileExtension = file.name
    .toLowerCase()
    .substring(file.name.lastIndexOf("."));

  // 허용된 이미지 타입이나 확장자가 아닌 경우 토스트 메시지 표시
  if (
    !allowedTypes.includes(file.type) &&
    !allowedExtensions.includes(fileExtension)
  ) {
    toast.show("jpg, png 형식의 이미지만 업로드 가능합니다.");
    return;
  }

  // 현재 대표 이미지 URL 제거
  revokeBlobURL(currentMainImage ?? null);
  // 이미지 URL 생성

  const imageUrl = URL.createObjectURL(file);
  setMainImage(imageUrl);
};

export default handleImageUpload;
