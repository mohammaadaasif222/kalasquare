export default function Portfolio() {
  const items = [
    { title: "Animal", rating: 4.5 },
    { title: "Animal", rating: 4.5 },
    { title: "Animal", rating: 4.5 },
    { title: "Animal", rating: 4.5 },
  ]

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">IMDB</h2>
          <button className="text-accent font-medium hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div key={i} className="bg-muted rounded-lg overflow-hidden">
              <div className="aspect-square bg-gray-300 mb-3"></div>
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-xs font-medium">{item.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">Mahesh Jha (News Reporter)</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
