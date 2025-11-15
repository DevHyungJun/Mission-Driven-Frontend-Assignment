import { create } from "zustand";
import { ActivityType } from "@/app/_components/ActivityTypeSelector/constant/ACTIVITY_TYPE_SELECTOR_OPTIONS";

interface ActivityTypeStore {
  activityType: ActivityType | null;
  setActivityType: (activityType: ActivityType) => void;
}

const useActivityTypeStore = create<ActivityTypeStore>((set) => ({
  activityType: null,
  setActivityType: (activityType) => set({ activityType }),
}));

export default useActivityTypeStore;
