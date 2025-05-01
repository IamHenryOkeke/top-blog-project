'use client'

import useAuthStore from "@/store/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { token, loggedIn, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && token && loggedIn) {
      router.replace("/dashboard/home");
    }
  }, [hydrated, token, loggedIn, router]);

  if (!hydrated) return null; // Wait for Zustand to hydrate
  if (token && loggedIn) return null; // Already redirected

  return (
    <div className="h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
