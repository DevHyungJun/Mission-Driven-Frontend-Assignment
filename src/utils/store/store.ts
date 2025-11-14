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
  id: string;
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  detailText: string;
}

const generateSessionId = (): string => {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

interface SessionStore {
  sessions: SessionDate[];
  setSessionDate: (sessionId: string, date: Date | null) => void;
  setSessionStartTime: (sessionId: string, time: Date | null) => void;
  setSessionEndTime: (sessionId: string, time: Date | null) => void;
  setSessionDetailText: (sessionId: string, detailText: string) => void;
  addSession: () => void;
  removeSession: (sessionId: string) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  sessions: [
    {
      id: generateSessionId(),
      date: null,
      startTime: null,
      endTime: null,
      detailText: "",
    },
  ],
  setSessionDate: (sessionId, date) =>
    set((state) => {
      const newSessions = state.sessions.map((session) =>
        session.id === sessionId ? { ...session, date } : session
      );
      return { sessions: newSessions };
    }),
  setSessionStartTime: (sessionId, time) =>
    set((state) => {
      const newSessions = state.sessions.map((session) =>
        session.id === sessionId ? { ...session, startTime: time } : session
      );
      return { sessions: newSessions };
    }),
  setSessionEndTime: (sessionId, time) =>
    set((state) => {
      const newSessions = state.sessions.map((session) =>
        session.id === sessionId ? { ...session, endTime: time } : session
      );
      return { sessions: newSessions };
    }),
  setSessionDetailText: (sessionId, detailText) =>
    set((state) => {
      const newSessions = state.sessions.map((session) =>
        session.id === sessionId ? { ...session, detailText } : session
      );
      return { sessions: newSessions };
    }),
  addSession: () =>
    set((state) => ({
      sessions: [
        ...state.sessions,
        {
          id: generateSessionId(),
          date: null,
          startTime: null,
          endTime: null,
          detailText: "",
        },
      ],
    })),
  removeSession: (sessionId) =>
    set((state) => {
      if (state.sessions.length <= 1) {
        return state;
      }
      const newSessions = state.sessions.filter(
        (session) => session.id !== sessionId
      );
      return { sessions: newSessions };
    }),
}));
