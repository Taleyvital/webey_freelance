import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@supabase/supabase-js";

type Role = "client" | "freelancer" | null;

interface UserState {
  userId: string | null;
  name: string | null;
  avatarUrl: string | null;
  role: Role;
  isAuthenticated: boolean;

  setFromSupabaseUser: (user: User) => void;
  setRole: (role: Role) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      name: null,
      avatarUrl: null,
      role: null,
      isAuthenticated: false,

      setFromSupabaseUser: (user: User) =>
        set({
          userId: user.id,
          name:
            user.user_metadata?.full_name ??
            user.user_metadata?.name ??
            user.phone ??
            null,
          avatarUrl: user.user_metadata?.avatar_url ?? null,
          role: (user.user_metadata?.role as Role) ?? null,
          isAuthenticated: true,
        }),

      setRole: (role) => set({ role }),

      logout: () =>
        set({
          userId: null,
          name: null,
          avatarUrl: null,
          role: null,
          isAuthenticated: false,
        }),
    }),
    { name: "webey-user" }
  )
);
