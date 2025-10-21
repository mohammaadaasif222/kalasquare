import { Plus, Bell, MessageSquare, Settings } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function ProfileHeader() {
  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Profile Info */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/professional-man.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold ">John Doe</h2>
            <div className="flex items-center gap-2 mt-1">
              <Image
                src="/verifybadge.png"
                alt="Verified Badge"
                width={20}
                height={20}
                className="object-contain"
              />

            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
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
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Cedet Work</span>
            <button className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
