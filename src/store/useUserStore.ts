import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "client" | "freelancer" | null;

interface UserState {
  userId: string | null;
  name: string | null;
  avatarUrl: string | null;
  role: Role;
  isAuthenticated: boolean;

  setUser: (user: { userId: string; name: string; avatarUrl?: string; role: Role }) => void;
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

      setUser: ({ userId, name, avatarUrl, role }) =>
        set({ userId, name, avatarUrl: avatarUrl ?? null, role, isAuthenticated: true }),

      setRole: (role) => set({ role }),

      logout: () =>
        set({ userId: null, name: null, avatarUrl: null, role: null, isAuthenticated: false }),
    }),
    { name: "webey-user" }
  )
);
