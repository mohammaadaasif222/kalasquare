// app/(public)/layout.tsx
// import PublicNavbar from '@/components/layouts/PublicNavbar';
import SiteHeader from "@/components/home/site-header"
import SiteFooter from "@/components/home/site-footer"
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}