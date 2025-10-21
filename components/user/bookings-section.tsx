export default function BookingsSection() {
  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-xl font-bold mb-6">Bookings & Collaboration</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My Requests */}
        <div>
          <h4 className="font-semibold mb-4">My Requests</h4>
          <div className="flex gap-2 mb-4">
            {["Pending", "Accepted", "Completed"].map((status) => (
              <button key={status} className="px-4 py-2 text-sm rounded-lg bg-muted hover:bg-muted/80 transition">
                {status}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">No requests to display</p>
          </div>
        </div>

        {/* New Opportunities */}
        <div>
          <h4 className="font-semibold mb-4">New Opportunities</h4>
          <p className="text-sm text-muted-foreground">Latest events, auditions, collaborations</p>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm">Check back soon for new opportunities</p>
          </div>
        </div>
      </div>
    </div>
  )
}
