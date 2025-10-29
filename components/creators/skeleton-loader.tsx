export function ImageSkeleton() {
    return (
        <div className="bg-gray-200 rounded-xs overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-300" />
        </div>
    )
}

export function VideoSkeleton() {
    return (
        <div className="bg-gray-200 rounded-lg overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-300" />
        </div>
    )
}

export function ImageGallerySkeleton() {
    return (
        <div className="lg:col-span-2">
            <div className="grid grid-cols-4 gap-3 mb-6">
                {/* Large featured image skeleton */}
                <div className="col-span-2 row-span-2 bg-gray-200 rounded-xs overflow-hidden animate-pulse">
                    <div className="w-full h-full bg-gray-300" style={{ minHeight: "384px" }} />
                </div>

                {/* Top right skeleton */}
                <div className="col-span-2 h-48 bg-gray-200 rounded-xs overflow-hidden animate-pulse">
                    <div className="w-full h-full bg-gray-300" />
                </div>

                {/* Bottom right skeletons */}
                <div className="h-48 bg-gray-200 rounded-xs overflow-hidden animate-pulse">
                    <div className="w-full h-full bg-gray-300" />
                </div>

                <div className="h-48 bg-gray-200 rounded-xs overflow-hidden animate-pulse">
                    <div className="w-full h-full bg-gray-300" />
                </div>
            </div>
        </div>
    )
}

export function VideoSectionSkeleton() {
    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-sm border-0">
                        <div className="w-full h-48 bg-gray-200 animate-pulse" />
                    </div>
                ))}
            </div>
        </section>
    )
}
