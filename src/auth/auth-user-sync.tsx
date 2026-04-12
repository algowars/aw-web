"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useRef } from "react";

import { useUserStore } from "@/stores/user-store";
import { api } from "@/trpc/react";

export function AuthUserSync() {
  const lastSyncedSub = useRef<string | null>(null);
  const { user, isLoading } = useUser();
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const syncMutation = api.user.syncFromLogin.useMutation();

  useEffect(() => {
    if (isLoading) return;

    if (!user?.sub) {
      lastSyncedSub.current = null;
      clearUser();
      return;
    }

    if (lastSyncedSub.current === user.sub) return;

    lastSyncedSub.current = user.sub;

    void syncMutation
      .mutateAsync()
      .then((syncedUser) => {
        setUser(syncedUser);
      })
      .catch((error: unknown) => {
        console.error("[user-sync] failed", error);
      });
  }, [clearUser, isLoading, setUser, syncMutation, user]);

  return null;
}
