import useImageContext from "@/provider/ImageProvider/hooks/useImageContext";
import { useMemo } from "react";
import {
  useCategoryStore,
  useContentTitleStore,
  useActivityTypeStore,
  useSessionStore,
} from "@/stores";

const useCompletedAll = () => {
  const { mainImage } = useImageContext();
  const { selectedCategories } = useCategoryStore();
  const { contentTitle } = useContentTitleStore();
  const { activityType } = useActivityTypeStore();
  const { sessions } = useSessionStore();

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
