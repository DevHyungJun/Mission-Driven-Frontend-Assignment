import useImageContext from "@/provider/ImageProvider/hooks/useImageContext";
import {
  useActivityTypeStore,
  useCategoryStore,
  useContentTitleStore,
  useSessionStore,
} from "@/utils/store/store";
import { useMemo } from "react";

const useCompletedAll = () => {
  const { mainImage, additionalImages } = useImageContext();
  const { selectedCategories } = useCategoryStore();
  const { contentTitle } = useContentTitleStore();
  const { activityType } = useActivityTypeStore();
  const { sessions } = useSessionStore();

  // console확인
  console.log(mainImage);
  console.log(additionalImages);
  console.log(selectedCategories);
  console.log(contentTitle);
  console.log(activityType);
  console.log(sessions);

  const isCompletedAll = useMemo(() => {
    return (
      mainImage &&
      selectedCategories.length > 0 &&
      contentTitle &&
      activityType &&
      sessions.length > 0 &&
      sessions.every(
        (session) =>
          session.date &&
          session.startTime &&
          session.endTime &&
          session.detailText
      )
    );
  }, [mainImage, selectedCategories, contentTitle, activityType, sessions]);

  return isCompletedAll;
};

export default useCompletedAll;
