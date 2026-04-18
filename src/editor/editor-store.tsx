import { create } from "zustand";

import type { Tab } from "./editor";

type EditorStoreState = {
  tabs: Tab | null;
  createTabs: (tabs: Tab) => void;
  setTabs: (tabs: Tab) => void;
  clearTabs: () => void;
};

export const useEditorStore = create<EditorStoreState>((set) => ({
  tabs: null,
  createTabs: (tabs) => set({ tabs }),
  setTabs: (tabs) => set({ tabs }),
  clearTabs: () => set({ tabs: null }),
}));
