export default function Reels() {
  const reels = [{ title: "Reel 1" }, { title: "Reel 2" }, { title: "Reel 3" }]

  return (
    <section className="bg-muted/30 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Reels Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reels.map((reel, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:opacity-80 transition"
            >
              <div className="text-center text-white">
                <div className="text-4xl mb-2">▶</div>
                <p className="text-sm font-medium">Watch video on YouTube</p>
                <p className="text-xs text-gray-400">Video compilation</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
