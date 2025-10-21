import { TrendingUp, MessageSquare, Star } from "lucide-react"

export default function InsightsSection() {
  const insights = [
    { label: "Profile Visits", icon: TrendingUp },
    { label: "Messages", icon: MessageSquare },
    { label: "Shortlists", icon: Star },
  ]

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-xl font-bold mb-6">Insights</h3>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon
          return (
            <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Icon size={20} className="text-primary" />
              <span className="text-sm font-medium">{insight.label}</span>
            </div>
          )
        })}
      </div>

      {/* Chart Placeholder */}
      <div className="mt-6 h-32 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Analytics Chart</p>
      </div>
    </div>
  )
}
