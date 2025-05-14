import LayoutGuard from "@/components/auth/layout-guard";
import Navbar from "@/components/dashboard/navbar";
import { Suspense } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <LayoutGuard requireAuth redirectTo="/auth/login">
        <main className="w-full">
          <Navbar />
          {children}
        </main>
      </LayoutGuard>
    </Suspense>
  );
}
