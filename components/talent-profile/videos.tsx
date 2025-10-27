export default function Videos() {
  const videos = [
    { title: "Watch video on YouTube", desc: "Video compilation" },
    { title: "Watch video on YouTube", desc: "Video compilation" },
    { title: "Watch video on YouTube", desc: "Video compilation" },
  ]

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {videos.map((video, i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center cursor-pointer hover:opacity-80 transition"
            >
              <div className="text-center text-white">
                <div className="text-4xl mb-2">▶</div>
                <p className="text-sm font-medium">{video.title}</p>
                <p className="text-xs text-gray-400">{video.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-right">
          <button className="text-accent font-medium hover:underline">View all</button>
        </div>
      </div>
    </section>
  )
}
