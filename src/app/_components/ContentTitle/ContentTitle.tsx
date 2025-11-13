import { Textarea } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";

const ContentTitle = () => {
  return (
    <SectionProvider title="콘텐츠 제목" mode="simple">
      <Textarea
        placeholder="제목을 입력해주세요"
        ariaLabel="콘텐츠 제목 입력 필드"
      />
    </SectionProvider>
  );
};

export default ContentTitle;
