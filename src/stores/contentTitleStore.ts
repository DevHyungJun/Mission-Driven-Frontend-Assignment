import { create } from "zustand";

interface ContentTitleStore {
  contentTitle: string;
  setContentTitle: (contentTitle: string) => void;
}

const useContentTitleStore = create<ContentTitleStore>((set) => ({
  contentTitle: "",
  setContentTitle: (contentTitle) => set({ contentTitle }),
}));

export default useContentTitleStore;
