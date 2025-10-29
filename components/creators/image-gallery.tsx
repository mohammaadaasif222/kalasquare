// import { useTalent } from "@/hooks/use-talent";
// import { useWorkSample } from "@/hooks/use-work";
// import React, { useEffect } from "react";

// interface Props {
//   talentProfileId: string;
// }

// export default function ImageGallery({ talentProfileId }: Props) {
//   const { talent, fetchTalentByUserId } = useTalent();
//   const { fetchByTalentProfile, workSamples } = useWorkSample();

//   // Fetch talent
//   useEffect(() => {
//     if (talentProfileId) {
//       fetchTalentByUserId(talentProfileId);
//     }
//   }, [talentProfileId]);

//   // Fetch work samples (only type=image)
//   useEffect(() => {
//     if (talent?.id) {
//       fetchByTalentProfile(talent.id);
//     }
//   }, [talent]);

//   const filtered = workSamples?.filter((item )=>item.type==='image')
//   return (
//     <div className="lg:col-span-2">
//       <div className="grid grid-cols-4 gap-3 mb-6">
//         {filtered && filtered.length > 0 ? (
//           <>
//             {/* Large featured image - spans 2 columns and 2 rows */}
//             <div className="col-span-2 row-span-2 bg-gray-200 rounded-xs overflow-hidden shadow">
//               <img
//                 src={filtered[0]?.url}
//                 alt={filtered[0]?.title || "Featured"}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Top right image */}
//             <div className="col-span-2 h-48 bg-gray-200 rounded-xs overflow-hidden shadow">
//               <img
//                 src={filtered[1]?.url || filtered[0]?.url}
//                 alt={filtered[1]?.title || "Gallery 1"}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Bottom right - 2 equal images */}
//             <div className="h-48 bg-gray-200 rounded-xs overflow-hidden shadow">
//               <img
//                 src={filtered[2]?.url || filtered[0]?.url}
//                 alt={filtered[2]?.title || "Gallery 2"}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="h-48 bg-gray-200 rounded-xs overflow-hidden shadow relative group cursor-pointer">
//               <img
//                 src={filtered[3]?.url || filtered[0]?.url}
//                 alt={filtered[3]?.title || "Gallery 3"}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
//                 <span className="text-white text-sm font-semibold">
//                   View More
//                 </span>
//               </div>
//             </div>
//           </>
//         ) : (
//           <p className="col-span-4 text-center text-gray-500 py-6">
//             No work samples available.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }




"use client"

import { useTalent } from "@/hooks/use-talent"
import { useWorkSample } from "@/hooks/use-work"
import { useEffect } from "react"
import { ImageGallerySkeleton } from "./skeleton-loader"

interface Props {
    talentProfileId: string
}

export default function ImageGallery({ talentProfileId }: Props) {
    const { talent, fetchTalentByUserId, loading} = useTalent()
    const { fetchByTalentProfile, workSamples } = useWorkSample()

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

    const filtered = workSamples?.filter((item) => item.type === "image")

    if (!filtered || loading) {
        return <ImageGallerySkeleton />
    }

    return (
        <div className="lg:col-span-2">
            <div className="grid grid-cols-4 gap-3 mb-6">

                <>
                    {/* Large featured image - spans 2 columns and 2 rows */}
                    <div className="col-span-2 row-span-2 bg-gray-200 rounded-xs overflow-hidden shadow">
                        <img
                            src={filtered[0]?.url || "/placeholder.svg"}
                            alt={filtered[0]?.title || "Featured"}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Top right image */}
                    <div className="col-span-2 h-48 bg-gray-200 rounded-xs overflow-hidden shadow">
                        <img
                            src={filtered[1]?.url || filtered[0]?.url}
                            alt={filtered[1]?.title || "Gallery 1"}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Bottom right - 2 equal images */}
                    <div className="h-48 bg-gray-200 rounded-xs overflow-hidden shadow">
                        <img
                            src={filtered[2]?.url || filtered[0]?.url}
                            alt={filtered[2]?.title || "Gallery 2"}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="h-48 bg-gray-200 rounded-xs overflow-hidden shadow relative group cursor-pointer">
                        <img
                            src={filtered[3]?.url || filtered[0]?.url}
                            alt={filtered[3]?.title || "Gallery 3"}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">View More</span>
                        </div>
                    </div>
                </>

            </div>
        </div>
    )
}
