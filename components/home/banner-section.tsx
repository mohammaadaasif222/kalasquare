"use client"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Banner } from "@/types/banner.types"


interface BannerSectionProps {
    banners: Banner[] | undefined
    loading: boolean
    title?: string
    showControls?: boolean
}

export function BannerSection({
    banners,
    loading,
    title = "Featured Banners",
    showControls = true,
}: BannerSectionProps) {
    const shouldShowSkeleton = loading || !banners || banners.length === 0

    return (
        <section className="container mx-auto px-0 pt-3 mt-5 group relative" aria-label={title}>
            {title && (
                <div className="px-4 mb-4">
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground">{title}</h2>
                </div>
            )}

            <Carousel
                opts={{ align: "center", loop: true, skipSnaps: false }}
                className="relative"
                aria-label={`${title} carousel`}
            >
                <CarouselContent className="px-0">
                    {shouldShowSkeleton
                        ? // Show 3 skeleton slides when loading or no banners available
                        Array.from({ length: 3 }).map((_, index) => (
                            <CarouselItem key={`skeleton-${index}`} className="basis-[88%] sm:basis-[70%]">
                                <div className="overflow-hidden rounded-xs border bg-card">
                                    <div className="h-44 w-full md:h-64 bg-muted animate-pulse" />
                                </div>
                            </CarouselItem>
                        ))
                        : // Display actual banners sorted by position
                        banners
                            .sort((a, b) => a.position - b.position)
                            .map((banner) => (
                                <CarouselItem key={banner.id} className="basis-[88%] sm:basis-[70%]">
                                    <Link href={banner.link || "#"} className="block group/banner">
                                        <div className="overflow-hidden rounded-xs border bg-card transition-transform duration-300 group-hover/banner:shadow-lg">
                                            <img
                                                src={banner.url || "/placeholder.svg"}
                                                alt={banner.title}
                                                className="h-44 w-full object-cover md:h-64 transition-transform duration-300 group-hover/banner:scale-105"
                                            />
                                            {banner.title && (
                                                <div className="absolute inset-0 bg-black/0 group-hover/banner:bg-black/20 transition-colors duration-300 flex items-end p-4">
                                                    <p className="text-white text-sm md:text-base font-medium opacity-0 group-hover/banner:opacity-100 transition-opacity duration-300">
                                                        {banner.title}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </CarouselItem>
                            ))}
                </CarouselContent>

                {showControls && (
                    <div className="pointer-events-none absolute inset-0 hidden items-center justify-between px-1 sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="pointer-events-auto">
                            <CarouselPrevious className="left-2 bg-background/80" />
                        </div>
                        <div className="pointer-events-auto">
                            <CarouselNext className="right-2 bg-background/80" />
                        </div>
                    </div>
                )}
            </Carousel>
        </section>
    )
}
