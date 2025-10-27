export default function Services() {
  const services = [
    { title: "Makeup", price: "₹79", type: "per_live" },
    { title: "Hair Styling", price: "₹79", type: "per_video" },
    { title: "Bridal Package", price: "₹79", type: "per_post" },
  ]

  return (
    <section className="bg-muted/30 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Services & Rates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-border">
              <h3 className="font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-accent font-bold text-2xl mb-4">{service.price}</p>
              <p className="text-sm text-muted-foreground mb-4">{service.type}</p>
              <button className="w-full bg-accent text-accent-foreground py-2 rounded font-medium hover:opacity-90">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
