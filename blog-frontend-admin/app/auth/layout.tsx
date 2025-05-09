import LayoutGuard from "@/components/auth/layout-guard";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutGuard requireAuth={false} redirectTo="/dashboard/home">
      <div className="h-screen flex justify-center items-center">
        {children}
      </div>
    </LayoutGuard>
  );
}
