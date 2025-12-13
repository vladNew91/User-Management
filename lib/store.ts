import { create } from "zustand"
import { devtools } from "zustand/middleware";

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    city: string
  }
  phone: string
  company: {
    name: string
  }
}

export interface UserState {
  activeUsers: User[]
  archivedUsers: User[]
  setUsers: (users: User[]) => void
  archiveUser: (user: User) => void
  unarchiveUser: (user: User) => void
  hideUser: (userId: number) => void
}

export const useUserStore = create<UserState, [["zustand/devtools", never]]>(devtools((set) => ({
  activeUsers: [],
  archivedUsers: [],
  setUsers: (users) => set({ activeUsers: users }),
  archiveUser: (user) =>
    set((state) => {
      return {
        activeUsers: state.activeUsers.filter((u) => u.id !== user.id),
        archivedUsers: [...state.archivedUsers, user],
      }
    }),
  unarchiveUser: (user) =>
    set((state) => {
      return {
        activeUsers: [...state.activeUsers, user],
        archivedUsers: state.archivedUsers.filter((u) => u.id !== user.id),
      }
    }),
  hideUser: (userId) =>
    set((state) => ({
      activeUsers: state.activeUsers.filter((u) => u.id !== userId),
    })),
})))
