'use client'

import useAuthStore from "@/store/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { token, loggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (token && loggedIn) {
      router.replace("/dashboard/home");
    }
  }, [token, loggedIn, router]);

  if (token && loggedIn) return null;

  return (
    <div className="h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
