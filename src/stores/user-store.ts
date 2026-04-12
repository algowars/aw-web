import { create } from "zustand";

import { type RouterOutputs } from "@/trpc/react";

type SyncedUser = RouterOutputs["user"]["syncFromLogin"];

type UserStoreState = {
  user: SyncedUser | null;
  setUser: (user: SyncedUser) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
