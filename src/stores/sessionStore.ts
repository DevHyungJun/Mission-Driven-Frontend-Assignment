import { create } from "zustand";

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

const getDefaultStartTime = (): Date => {
  const date = new Date();
  date.setHours(10, 0, 0, 0);
  return date;
};

const getDefaultEndTime = (): Date => {
  const date = new Date();
  date.setHours(11, 0, 0, 0);
  return date;
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

const useSessionStore = create<SessionStore>((set) => ({
  sessions: [
    {
      id: generateSessionId(),
      date: null,
      startTime: getDefaultStartTime(),
      endTime: getDefaultEndTime(),
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
          startTime: getDefaultStartTime(),
          endTime: getDefaultEndTime(),
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

export default useSessionStore;
