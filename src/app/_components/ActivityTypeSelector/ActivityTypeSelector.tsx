import { Button } from "@/components";
import SectionProvider from "@/provider/SectionProvider/SectionProvider";

const ActivityTypeSelector = () => {
  return (
    <SectionProvider
      title="활동 방식 선택"
      mode="with-description"
      description="만남을 어떤 방식으로 진행하시겠어요?"
    >
      <div className="w-full flex gap-2">
        <Button
          variant="outline"
          color="black"
          className="w-full"
          ariaLabel="온라인 버튼"
        >
          온라인
        </Button>
        <Button
          variant="outline"
          color="black"
          className="w-full"
          ariaLabel="직접 만나기 버튼"
        >
          직접 만나기
        </Button>
      </div>
    </SectionProvider>
  );
};

export default ActivityTypeSelector;
