import SiteFooter from "@/components/home/site-footer";
import SiteHeader from "@/components/home/site-header";

export default function AuthLayout({
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