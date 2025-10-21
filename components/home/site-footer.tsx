import Link from "next/link"
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold">Information</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#">About us</Link>
              </li>
              <li>
                <Link href="#">Contact us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Useful Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Refunds</Link>
              </li>
              <li>
                <Link href="#">Venues & Clubs</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-sm font-semibold">Follow Us On</h4>
            <div className="mt-3 flex items-center gap-3 text-muted-foreground">
              <Link aria-label="Facebook" href="#" className="rounded-md border p-2 hover:text-foreground">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link aria-label="Instagram" href="#" className="rounded-md border p-2 hover:text-foreground">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link aria-label="YouTube" href="#" className="rounded-md border p-2 hover:text-foreground">
                <Youtube className="h-4 w-4" />
              </Link>
              <Link aria-label="Twitter" href="#" className="rounded-md border p-2 hover:text-foreground">
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} KalaSquare · A Delhi Info Media Private Limited initiative.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
