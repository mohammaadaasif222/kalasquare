export default function Awards() {
  const awards = [{ title: "Award 1" }, { title: "Award 2" }, { title: "Award 3" }, { title: "Award 4" }]

  return (
    <section className="bg-muted/30 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Award</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {awards.map((award, i) => (
            <div
              key={i}
              className="bg-white rounded-lg aspect-square flex items-center justify-center border border-border hover:shadow-lg transition"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <p className="text-xs font-medium">{award.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
