import { Eye, Star, Calendar, Users } from "lucide-react"

export default function StatsSection() {
  const stats = [
    { label: "Profile Views", value: "152", icon: Eye },
    { label: "Shortlists", value: "8", icon: Star },
    { label: "Bookings / Collaboration", value: "23", icon: Calendar },
    { label: "Followers", value: "437", icon: Users },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon size={20} className="text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
