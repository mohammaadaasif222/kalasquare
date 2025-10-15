// 'use client';

// import React from 'react';
// import Image from 'next/image';

// interface CardProps {
//     title: string;
//     eventCount: string;
//     image: string;
//     color: string;
// }

// export const LiveCard = ({ title, eventCount, image, color }: CardProps) => (
//     <div className="group snap-start shrink-0 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)] lg:w-[calc(20%-0.8rem)] transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
//         <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
            
//             <Image
//                 src={image}
//                 alt={title}
//                 fill
//                 className="object-cover transition-all duration-300 group-hover:scale-110"
//                 sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
//             />
            
//             {/* Color Overlay */}
//             <div
//                 className={`absolute inset-0 ${color} mix-blend-multiply transition-all duration-300 group-hover:brightness-110`}
//                 style={{
//                     backgroundImage: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`
//                 }}
//             />
            
//             {/* Gradient Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//             {/* Content */}
//             <div className="relative h-full p-4 flex flex-col justify-end z-10">
//                 <div className="text-white">
//                     <h3 className="text-xl font-bold mb-1 transform transition-transform duration-300 group-hover:translate-y-[-4px]">
//                         {title}
//                     </h3>
//                     <p className="text-sm opacity-90">{eventCount}</p>
//                 </div>
//             </div>

//             {/* Hover Overlay */}
//             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
//         </div>
//     </div>
// );

"use client"

type LiveCardProps = {
  title: string
  eventCount: string
  color: string
  image?: string
}

export function LiveCard({ title, eventCount, color, image }: LiveCardProps) {
  return (
    <div className="group relative w-full h-44 rounded-3xl overflow-hidden shadow-sm ring-1 ring-black/5">
      {/* Background image or color */}
      <div
        className={`absolute inset-0 ${!image ? color : ""}`}
        style={
          image
            ? {
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/30" />
      {/* Content */}
      <div className="relative h-full flex flex-col items-start justify-end p-4 text-white">
        <h3 className="text-base font-semibold leading-tight line-clamp-2">{title}</h3>
        <p className="text-xs opacity-90 mt-1">{eventCount}</p>
      </div>
    </div>
  )
}
