import { Platform } from "@/types/social.types"

export const getPlatformColor = (platform: Platform) => {
  const colors: Record<Platform, { bgColor: string; textColor: string; borderColor: string }> = {
    [Platform.INSTAGRAM]: {
      bgColor: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
      textColor: "text-pink-600",
      borderColor: "border-pink-200",
    },
    [Platform.FACEBOOK]: {
      bgColor: "bg-blue-600",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    [Platform.TWITTER]: {
      bgColor: "bg-sky-500",
      textColor: "text-sky-600",
      borderColor: "border-sky-200",
    },
    [Platform.YOUTUBE]: {
      bgColor: "bg-red-600",
      textColor: "text-red-600",
      borderColor: "border-red-200",
    },
    [Platform.TIKTOK]: {
      bgColor: "bg-black",
      textColor: "text-black",
      borderColor: "border-gray-800",
    },
    [Platform.LINKEDIN]: {
      bgColor: "bg-blue-700",
      textColor: "text-blue-700",
      borderColor: "border-blue-300",
    },
    [Platform.SPOTIFY]: {
      bgColor: "bg-green-500",
      textColor: "text-green-600",
      borderColor: "border-green-200",
    },
  }

  return colors[platform] || colors[Platform.INSTAGRAM]
}
