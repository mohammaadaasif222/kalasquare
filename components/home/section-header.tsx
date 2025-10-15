import { ChevronRight } from "lucide-react"
import Link from "next/link"

export function SectionHeader({
  title,
  href,
  id,
}: {
  title: string
  href?: string
  id?: string
}) {
  return (
    <div id={id} className="flex items-center justify-between">
      <h2 className="text-balance text-lg font-semibold tracking-tight">{title}</h2>
      {href ? (
        <Link href={href} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          View all <ChevronRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  )
}