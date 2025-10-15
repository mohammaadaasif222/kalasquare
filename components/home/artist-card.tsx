"use client"

type ArtistCardProps = {
  name: string
  role: string
  img: string
}

export function ArtistCard({ name, role, img }: ArtistCardProps) {
  return (
    <article
      className="group relative w-[220px] shrink-0 overflow-hidden rounded-xl border bg-card text-card-foreground transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-lg hover:border-brand"
      role="listitem"
    >
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={img || "/placeholder.svg"}
          alt={`${name} - ${role}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          crossOrigin="anonymous"
        />
      </div>
      <div className="p-3 text-center">
        <h3 className="text-sm font-medium leading-tight">{name}</h3>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl ring-0 transition-[box-shadow,ring] duration-300 group-hover:ring-1 group-hover:ring-brand"
      />
    </article>
  )
}
