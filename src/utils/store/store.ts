import { create } from "zustand";
import { CategoryId } from "@/app/(route)/category-select/_constant/CATEGORY_LIST";
import { ActivityType } from "@/app/_components/ActivityTypeSelector/constant/ACTIVITY_TYPE_SELECTOR_OPTIONS";

interface CategoryStore {
  selectedCategories: CategoryId[];
  setSelectedCategories: (categories: CategoryId[]) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategories: [],
  setSelectedCategories: (categories) =>
    set({ selectedCategories: categories }),
}));

interface ContentTitleStore {
  contentTitle: string;
  setContentTitle: (contentTitle: string) => void;
}

export const useContentTitleStore = create<ContentTitleStore>((set) => ({
  contentTitle: "",
  setContentTitle: (contentTitle) => set({ contentTitle }),
}));

interface ActivityTypeStore {
  activityType: ActivityType | null;
  setActivityType: (activityType: ActivityType) => void;
}

export const useActivityTypeStore = create<ActivityTypeStore>((set) => ({
  activityType: null,
  setActivityType: (activityType) => set({ activityType }),
}));

export interface SessionDate {
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
}

interface SessionStore {
  sessions: SessionDate[];
  setSessionDate: (sessionIndex: number, date: Date | null) => void;
  setSessionStartTime: (sessionIndex: number, time: Date | null) => void;
  setSessionEndTime: (sessionIndex: number, time: Date | null) => void;
  addSession: () => void;
  removeSession: (sessionIndex: number) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  sessions: [{ date: null, startTime: null, endTime: null }],
  setSessionDate: (sessionIndex, date) =>
    set((state) => {
      const newSessions = [...state.sessions];
      newSessions[sessionIndex] = {
        ...newSessions[sessionIndex],
        date,
      };
      return { sessions: newSessions };
    }),
  setSessionStartTime: (sessionIndex, time) =>
    set((state) => {
      const newSessions = [...state.sessions];
      newSessions[sessionIndex] = {
        ...newSessions[sessionIndex],
        startTime: time,
      };
      return { sessions: newSessions };
    }),
  setSessionEndTime: (sessionIndex, time) =>
    set((state) => {
      const newSessions = [...state.sessions];
      newSessions[sessionIndex] = {
        ...newSessions[sessionIndex],
        endTime: time,
      };
      return { sessions: newSessions };
    }),
  addSession: () =>
    set((state) => ({
      sessions: [
        ...state.sessions,
        { date: null, startTime: null, endTime: null },
      ],
    })),
  removeSession: (sessionIndex) =>
    set((state) => {
      if (state.sessions.length <= 1) {
        return state;
      }
      const newSessions = state.sessions.filter(
        (_, index) => index !== sessionIndex
      );
      return { sessions: newSessions };
    }),
}));
