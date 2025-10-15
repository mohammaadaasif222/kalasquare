export function HScroll({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto [-webkit-overflow-scrolling:touch]">
      <div className="flex gap-4 snap-x snap-mandatory pr-4">{children}</div>
    </div>
  )
}
