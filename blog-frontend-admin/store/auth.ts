/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosBasicCredentials } from "axios";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    combine(
      {
        loggedIn: false,
        token: null as string | null | AxiosBasicCredentials,
        profile: null as | null | any
      },
      (set) => ({
        setLoggedIn: (value: boolean) => {
          set({ loggedIn: value });
        },
        setToken: (token: string | AxiosBasicCredentials | any) => {
          set({ token });
        },
        setUserProfile: (profile: any) => {
          set({ profile, loggedIn: true });
        },
        logout: () => {
          set({
            loggedIn: false,
            token: null,
            profile: null
          });
          window.location.replace("/auth/login")
        },
      })
    ),
    {
      name: "nmesoma-blog-auth",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useAuthStore;