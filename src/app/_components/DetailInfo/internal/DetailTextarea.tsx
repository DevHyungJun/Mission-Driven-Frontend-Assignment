import { Textarea } from "@/components";

const DetailTextarea = () => {
  return (
    <Textarea
      placeholder="활동 내용을 간단히 입력해주세요"
      ariaLabel="활동 내용 입력 필드"
      maxLength={80}
    />
  );
};

export default DetailTextarea;
