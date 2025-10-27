export default function Footer() {
  return (
    <footer className="bg-muted/50 py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">Information</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <a href="#" className="hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Explore Profiles
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <a href="#" className="hover:text-foreground">
                  Terms & Condition
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Advertise With Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Top Influencers In India
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Follow Us On</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-foreground/20"
              >
                f
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-foreground/20"
              >
                𝕏
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-foreground/20"
              >
                📷
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-foreground/20"
              >
                ▶
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-sm text-foreground/60">
          <p>© 2025 The Talent Square. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
