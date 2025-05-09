'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth";

interface LayoutGuardProps {
  requireAuth?: boolean;
  redirectTo: string;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export default function LayoutGuard({
  requireAuth = true,
  redirectTo,
  children,
  loadingComponent = <div className="flex items-center justify-center h-screen">Loading...</div>
}: LayoutGuardProps) {
  const { token, loggedIn, hydrated } = useAuthStore();
  const router = useRouter();

  const isAuthenticated = token && loggedIn;

  useEffect(() => {
    if (!hydrated) return;

    if (requireAuth && !isAuthenticated) {
      router.replace(redirectTo);
    }

    if (!requireAuth && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [hydrated, isAuthenticated, requireAuth, redirectTo, router]);

  if (!hydrated) return loadingComponent;

  if ((requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated)) {
    return null; // Prevent flash
  }

  return <>{children}</>;
}
