import LayoutGuard from "@/components/auth/layout-guard";
import { Suspense } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <LayoutGuard requireAuth={false} redirectTo="/dashboard/home">
        <div className="h-screen flex justify-center items-center">
          {children}
        </div>
      </LayoutGuard>
    </Suspense>
  );
}
