export default function Reviews() {
  const reviews = [
    {
      name: "Arjun Pandey",
      rating: 5,
      title: "Unforgettable wedding look",
      text: "Gain up by Priya is a professional freelance makeup and hair artist based in the city of Delhi and has been catering to many brides across the country and not just within the city.",
    },
    {
      name: "Arjun Pandey",
      rating: 5,
      title: "Unforgettable wedding look",
      text: "Gain up by Priya is a professional freelance makeup and hair artist based in the city of Delhi and has been catering to many brides across the country and not just within the city.",
    },
  ]

  return (
    <section className="bg-muted/30 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div>
                  <p className="font-semibold text-sm">{review.name}</p>
                  <p className="text-xs text-muted-foreground">Verified Buyer</p>
                </div>
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <h3 className="font-bold text-sm mb-2">{review.title}</h3>
              <p className="text-sm text-foreground/80">{review.text}</p>
            </div>
          ))}
        </div>

        {/* Rating Summary */}
        <div className="bg-accent text-accent-foreground p-6 rounded-lg text-center">
          <p className="text-4xl font-bold mb-2">5.0</p>
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-xl">
                ★
              </span>
            ))}
          </div>
          <p className="text-sm mb-4">87% recommended it</p>
          <button className="bg-white text-accent px-6 py-2 rounded font-medium hover:opacity-90">
            Write a review
          </button>
        </div>
      </div>
    </section>
  )
}
