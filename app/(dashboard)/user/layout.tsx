"use client"
import { Settings, Bell, MessageSquare } from "lucide-react"
import Sidebar from "@/components/user/sidebar"
import MobileNav from "@/components/user/mobile-nav"
import { UserNavProvider, useUserNav } from "@/context/UseNavContaxt"
import { useSelectedUser } from "@/hooks/use-user"
import { RootState } from "@/lib/redux/store"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useEffect } from "react"



export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/")
        }
    }, [isAuthenticated, isLoading, router])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-medium">Loading...</p>
            </div>
        )
    }

    if (!isAuthenticated) {
        return null // prevent flicker before redirect
    }
    return (
        <UserNavProvider>
            <LayoutContent>{children}</LayoutContent>
        </UserNavProvider>
    )
}

function LayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const { activeNav, setActiveNav } = useUserNav()

    return (
        <div className="flex h-screen bg-background">
            {/* Desktop Sidebar */}
            <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

            {/* Main Content */}
            <main className="flex-1 overflow-auto pb-20 md:pb-0">
                <div className="min-h-screen">
                    {/* Top Header for Mobile */}
                    <div className="md:hidden sticky top-0 z-40 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
                        <h1 className="text-xl font-bold">KalaSquare</h1>
                        <div className="flex items-center gap-3">
                            <button className="p-2 hover:bg-muted rounded-lg transition">
                                <Bell size={20} />
                            </button>
                            <button className="p-2 hover:bg-muted rounded-lg transition">
                                <MessageSquare size={20} />
                            </button>
                            <button className="p-2 hover:bg-muted rounded-lg transition">
                                <Settings size={20} />
                            </button>
                        </div>
                    </div>
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <MobileNav activeNav={activeNav} setActiveNav={setActiveNav} />
        </div>
    )
}
