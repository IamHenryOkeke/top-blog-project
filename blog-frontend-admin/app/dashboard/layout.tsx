'use client'

import useAuthStore from "@/store/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/dashboard/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { token, loggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!token && !loggedIn) {
      router.replace("/auth/login"); 
    }
  }, [token, loggedIn, router]);

  if (!token && !loggedIn) return null;

  return (
    <main className="w-full">
      <Navbar />
      {children}
    </main>
  );
}
