
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
export const dynamic = 'force-dynamic';
export const revalidate = 0;