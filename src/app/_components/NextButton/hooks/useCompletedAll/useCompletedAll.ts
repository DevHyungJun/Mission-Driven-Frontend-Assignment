import useImageContext from "@/provider/ImageProvider/hooks/useImageContext";
import { useMemo } from "react";
import {
  useCategoryStore,
  useContentTitleStore,
  useActivityTypeStore,
  useSessionStore,
} from "@/stores";

// 모든 필드가 완료된 여부 확인
const useCompletedAll = () => {
  // 검사 대상인 스토어 데이터들
  const { mainImage } = useImageContext();
  const { selectedCategories } = useCategoryStore();
  const { contentTitle } = useContentTitleStore();
  const { activityType } = useActivityTypeStore();
  const { sessions } = useSessionStore();

  // 모든 필드가 완료된 여부를 useMemo를 사용하여 리렌더링 방지
  const isCompletedAll = useMemo(() => {
    return (
      mainImage &&
      selectedCategories.length > 0 &&
      contentTitle.length >= 8 &&
      activityType &&
      sessions.length > 0 &&
      sessions.every(
        (session) =>
          session.date &&
          session.startTime &&
          session.endTime &&
          session.detailText.length >= 8
      )
    );
  }, [mainImage, selectedCategories, contentTitle, activityType, sessions]);

  return isCompletedAll;
};

export default useCompletedAll;
