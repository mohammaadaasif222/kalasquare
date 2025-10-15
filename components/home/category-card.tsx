"use client"

type CategoryCardProps = {
  label: string
  img: string
}

export function CategoryCard({ label, img }: CategoryCardProps) {
  return (
    <div className="group inline-flex w-full flex-col items-center">
      <div className="relative w-full overflow-hidden rounded-tr-2xl rounded-bl-2xl border bg-card transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-lg hover:border-brand">
        {/* Image container */}
        <div className="aspect-square w-full overflow-hidden relative">
          <img
            src={img || "/placeholder.svg"}
            alt={label}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            crossOrigin="anonymous"
          />

          {/* Overlay layer */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

          {/* View More button */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-3 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button className="bg-white/90 text-black text-xs font-medium px-3 py-1.5 rounded-full shadow-md hover:bg-white">
              View More
            </button>
          </div>
        </div>
      </div>

      <span className="mt-2 line-clamp-1 text-center text-xs text-muted-foreground">
        {label}
      </span>
    </div>
  )
}
