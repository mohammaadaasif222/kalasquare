export default function Campaigns() {
  const campaigns = [
    {
      title: "Lorem Ipsum",
      desc: "Gain up by Priya is a professional freelance makeup and hair artist based in the city of Delhi and has been catering to many brides across the country and not just within the city.",
    },
    {
      title: "Lorem Ipsum",
      desc: "Gain up by Priya is a professional freelance makeup and hair artist based in the city of Delhi and has been catering to many brides across the country and not just within the city.",
    },
    {
      title: "Lorem Ipsum",
      desc: "Gain up by Priya is a professional freelance makeup and hair artist based in the city of Delhi and has been catering to many brides across the country and not just within the city.",
    },
  ]

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Previous Campaign</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((campaign, i) => (
            <div key={i} className="bg-muted rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-300 mb-4"></div>
              <div className="p-4">
                <h3 className="font-bold mb-2">{campaign.title}</h3>
                <p className="text-sm text-foreground/80 mb-4 line-clamp-3">{campaign.desc}</p>
                <button className="w-full bg-accent text-accent-foreground py-2 rounded font-medium text-sm hover:opacity-90">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
