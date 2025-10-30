// // import { useTalent } from "@/hooks/use-talent";
// // import { useWorkSample } from "@/hooks/use-work";
// // import React, { useEffect } from "react";

// // interface Props {
// //   talentProfileId: string;
// // }

// // export default function ImageGallery({ talentProfileId }: Props) {
// //   const { talent, fetchTalentByUserId } = useTalent();
// //   const { fetchByTalentProfile, workSamples } = useWorkSample();

// //   // Fetch talent
// //   useEffect(() => {
// //     if (talentProfileId) {
// //       fetchTalentByUserId(talentProfileId);
// //     }
// //   }, [talentProfileId]);

// //   // Fetch work samples (only type=image)
// //   useEffect(() => {
// //     if (talent?.id) {
// //       fetchByTalentProfile(talent.id);
// //     }
// //   }, [talent]);

// //   const filtered = workSamples?.filter((item )=>item.type==='image')
// //   return (
// //     <div className="lg:col-span-2">
// //       <div className="grid grid-cols-4 gap-3 mb-6">
// //         {filtered && filtered.length > 0 ? (
// //           <>
// //             {/* Large featured image - spans 2 columns and 2 rows */}
// //             <div className="col-span-2 row-span-2 bg-gray-200 rounded-xs overflow-hidden shadow">
// //               <img
// //                 src={filtered[0]?.url}
// //                 alt={filtered[0]?.title || "Featured"}
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>

// //             {/* Top right image */}
// //             <div className="col-span-2 h-48 bg-gray-200 rounded-xs overflow-hidden shadow">
// //               <img
// //                 src={filtered[1]?.url || filtered[0]?.url}
// //                 alt={filtered[1]?.title || "Gallery 1"}
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>

// //             {/* Bottom right - 2 equal images */}
// //             <div className="h-48 bg-gray-200 rounded-xs overflow-hidden shadow">
// //               <img
// //                 src={filtered[2]?.url || filtered[0]?.url}
// //                 alt={filtered[2]?.title || "Gallery 2"}
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>

// //             <div className="h-48 bg-gray-200 rounded-xs overflow-hidden shadow relative group cursor-pointer">
// //               <img
// //                 src={filtered[3]?.url || filtered[0]?.url}
// //                 alt={filtered[3]?.title || "Gallery 3"}
// //                 className="w-full h-full object-cover"
// //               />
// //               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
// //                 <span className="text-white text-sm font-semibold">
// //                   View More
// //                 </span>
// //               </div>
// //             </div>
// //           </>
// //         ) : (
// //           <p className="col-span-4 text-center text-gray-500 py-6">
// //             No work samples available.
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }




// "use client"

// import { useTalent } from "@/hooks/use-talent"
// import { useWorkSample } from "@/hooks/use-work"
// import { useEffect } from "react"
// import { ImageGallerySkeleton } from "./skeleton-loader"

// interface Props {
//     talentProfileId: string
// }

// export default function ImageGallery({ talentProfileId }: Props) {
//     const { talent, fetchTalentByUserId, loading } = useTalent()
//     const { fetchByTalentProfile, workSamples } = useWorkSample()

//     // Fetch talent
//     useEffect(() => {
//         if (talentProfileId) {
//             fetchTalentByUserId(talentProfileId)
//         }
//     }, [talentProfileId])

//     // Fetch work samples (only type=image)
//     useEffect(() => {
//         if (talent?.id) {
//             fetchByTalentProfile(talent.id)
//         }
//     }, [talent])

//     const filtered = workSamples?.filter((item) => item.type === "image")

//     if (!filtered || loading) {
//         return <ImageGallerySkeleton />
//     }

//     return (
//         <div className="lg:col-span-2">
//             <div className="grid grid-cols-4 gap-3 mb-6">

//                 <>

//                     <div className="col-span-2 row-span-2 bg-gray-200 rounded-xs overflow-hidden shadow">
//                         <img
//                             src={filtered[0]?.url || "/placeholder.svg"}
//                             alt={filtered[0]?.title || "Featured"}
//                             className="w-full h-full object-cover"
//                         />
//                     </div>


//                     <div className="col-span-2 h-48 bg-gray-200 rounded-xs overflow-hidden shadow">
//                         <img
//                             src={filtered[1]?.url || filtered[0]?.url}
//                             alt={filtered[1]?.title || "Gallery 1"}
//                             className="w-full h-full object-cover"
//                         />
//                     </div>
//                     <div className="h-48 bg-gray-200 rounded-xs overflow-hidden shadow">
//                         <img
//                             src={filtered[2]?.url || filtered[0]?.url}
//                             alt={filtered[2]?.title || "Gallery 2"}
//                             className="w-full h-full object-cover"
//                         />
//                     </div>

//                     <div className="h-48 bg-gray-200 rounded-xs overflow-hidden shadow relative group cursor-pointer">
//                         <img
//                             src={filtered[3]?.url || filtered[0]?.url}
//                             alt={filtered[3]?.title || "Gallery 3"}
//                             className="w-full h-full object-cover"
//                         />
//                         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
//                             <span className="text-white text-sm font-semibold">View More</span>
//                         </div>
//                     </div>
//                 </>

//             </div>
//         </div>
//     )
// }

"use client"

import { useTalent } from "@/hooks/use-talent"
import { useWorkSample } from "@/hooks/use-work"
import { useEffect, useState } from "react"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { ImageGallerySkeleton } from "./skeleton-loader"

interface Props {
    talentProfileId: string
}

export default function ImageGallery({ talentProfileId }: Props) {
    const { talent, fetchTalentByUserId, loading } = useTalent()
    const { fetchByTalentProfile, workSamples } = useWorkSample()
    const [currentSlide, setCurrentSlide] = useState(0)

    // Fetch talent
    useEffect(() => {
        if (talentProfileId) {
            fetchTalentByUserId(talentProfileId)
        }
    }, [talentProfileId])

    // Fetch work samples (only type=image)
    useEffect(() => {
        if (talent?.id) {
            fetchByTalentProfile(talent.id)
        }
    }, [talent])

    const filtered = workSamples?.filter((item) => item.type === "image").slice(0, 4)
    const hasImages = filtered && filtered.length > 0

    if (loading) {
        return <ImageGallerySkeleton />
    }

    const MobileSlider = () => {
        // Create array of 4 items for slider (use actual images or placeholders)
        const sliderItems = [
            filtered?.[0]?.url || "/gallery-image-1.jpg",
            filtered?.[1]?.url || "/gallery-image-2.jpg",
            filtered?.[2]?.url || "/gallery-image-3.jpg",
            filtered?.[3]?.url || "/gallery-image-4.jpg",
        ]

        const nextSlide = () => {
            setCurrentSlide((prev) => (prev + 1) % sliderItems.length)
        }

        const prevSlide = () => {
            setCurrentSlide((prev) => (prev - 1 + sliderItems.length) % sliderItems.length)
        }

        return (
            <div className="lg:hidden mb-6">
                <div className="relative bg-gray-200 rounded-xs overflow-hidden shadow">
                    <img
                        src={sliderItems[currentSlide] || "/placeholder.svg"}
                        alt={`Gallery slide ${currentSlide + 1}`}
                        className="w-full h-64 object-cover"
                    />

                    {/* Navigation buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* Slide indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {sliderItems.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const DesktopGrid = () => {
        return (
            <div className="hidden lg:block lg:col-span-2">
                <div className="grid grid-cols-4 gap-3 mb-6">
                    {/* Large featured image - spans 2 columns and 2 rows */}
                    <div className="col-span-2 row-span-2 bg-gray-200 rounded-xs overflow-hidden shadow">
                        <img
                            src={filtered?.[0]?.url || "/placeholder.svg?height=384&width=384&query=featured-gallery-image"}
                            alt={filtered?.[0]?.title || "Featured"}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Top right image */}
                    <div className="col-span-2 h-48 bg-gray-200 rounded-xs overflow-hidden shadow">
                        <img
                            src={filtered?.[1]?.url || "/placeholder.svg?height=192&width=384&query=gallery-image-top"}
                            alt={filtered?.[1]?.title || "Gallery 1"}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Bottom right - 2 equal images */}
                    <div className="h-48 bg-gray-200 rounded-xs overflow-hidden shadow">
                        <img
                            src={filtered?.[2]?.url || "/placeholder.svg?height=192&width=192&query=gallery-image-bottom-left"}
                            alt={filtered?.[2]?.title || "Gallery 2"}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="h-48 bg-gray-200 rounded-xs overflow-hidden shadow relative group cursor-pointer">
                        <img
                            src={filtered?.[3]?.url || "/placeholder.svg?height=192&width=192&query=gallery-image-bottom-right"}
                            alt={filtered?.[3]?.title || "Gallery 3"}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">View More</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <MobileSlider />
            <DesktopGrid />
        </>
    )
}
