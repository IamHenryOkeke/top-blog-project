import LayoutGuard from "@/components/auth/layout-guard";
import Navbar from "@/components/dashboard/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutGuard requireAuth redirectTo="/auth/login">
      <main className="w-full">
        <Navbar />
        {children}
      </main>
    </LayoutGuard>
  );
}
