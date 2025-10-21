import { Plus, ImageIcon, Play } from "lucide-react"

export default function PortfolioSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Portfolio / My Work</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm">
          <Plus size={18} />
          Add Work
        </button>
      </div>

      {/* Work Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition"
          >
            <div className="aspect-video bg-muted flex items-center justify-center">
              <ImageIcon size={40} className="text-muted-foreground" />
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">Work Item {item}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Work */}
      <div className="mt-6">
        <h4 className="font-semibold mb-3">Featured Work</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-muted rounded-lg aspect-square flex items-center justify-center hover:bg-muted/80 transition cursor-pointer"
            >
              <Play size={24} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
