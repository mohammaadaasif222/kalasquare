import React, { useEffect } from 'react'
import { Card } from '../ui/card'
import { useWorkSample } from '@/hooks/use-work';
import { useTalent } from '@/hooks/use-talent';
interface Props {
    talentProfileId: string;
}
export default function VideoSection({ talentProfileId }: Props) {
    const { talent, fetchTalentByUserId } = useTalent()
    const { fetchByTalentProfile, workSamples, create, update } = useWorkSample()
    useEffect(() => {
        if (talentProfileId) {
            fetchTalentByUserId(talentProfileId)
        }
    }, [talentProfileId])

    useEffect(() => {
        if (talent) {
            fetchByTalentProfile(talent.id)
        }
    }, [talent])

    const isImageUrl = (url: string) => /\.(jpeg|jpg|gif|png|webp)$/i.test(url);

    // Detect if the URL is a video file
    const isVideoUrl = (url: string) => /\.(mp4|mov|avi|mkv|webm)$/i.test(url);

    // Detect if the URL is a YouTube link
    const isYouTubeUrl = (url: string) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);

    // Convert YouTube URL to embeddable format
    const getYouTubeEmbedUrl = (url: string) => {
        try {
            const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
            return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
        } catch {
            return url;
        }
    };
    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Videos</h2>
                <button className="text-[var(--brand)] font-semibold hover:text-[var(--brand)]/80 transition">View all</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {workSamples.map((sample) => (
                    <Card key={sample.id} className="overflow-hidden hover:shadow-lg py-0 rounded-sm transition border-0">
                        {sample.url && (
                            <div className="">
                                {/* 🖼️ Image */}
                                {isImageUrl(sample.url) && (
                                    <img
                                        src={sample.url}
                                        alt={sample.title}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                )}

                                {/* 🎥 YouTube video */}
                                {!isImageUrl(sample.url) && isYouTubeUrl(sample.url) && (
                                    <div className="aspect-w-16 aspect-h-9">
                                        <iframe
                                            src={getYouTubeEmbedUrl(sample.url)}
                                            title={sample.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-48 rounded-lg"
                                        ></iframe>
                                    </div>
                                )}

                                {/* 🎞️ MP4 or other video file */}
                                {!isImageUrl(sample.url) && !isYouTubeUrl(sample.url) && isVideoUrl(sample.url) && (
                                    <video
                                        controls
                                        className="w-full h-48 rounded-lg object-cover"
                                    >
                                        <source src={sample.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}

                                {/* 🔗 Fallback link */}
                                {!isImageUrl(sample.url) && !isYouTubeUrl(sample.url) && !isVideoUrl(sample.url) && (
                                    <a
                                        href={sample.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center group-hover:underline"
                                    >
                                        View Project
                                        <svg
                                            className="w-4 h-4 ml-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        )}
                    </Card>
                ))}
            </div>
        </section>
    )
}
