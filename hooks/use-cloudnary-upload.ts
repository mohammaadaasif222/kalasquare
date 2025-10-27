"use client"

import { useState } from "react"

interface UploadProgress {
  loading: boolean
  error: string | null
  url: string | null
}

export function useCloudinaryUpload() {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    loading: false,
    error: null,
    url: null,
  })

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploadProgress({ loading: true, error: null, url: null })

    try {
      if (!file.type.startsWith("image/")) {
        throw new Error("File must be an image")
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error("File size must be less than 10MB")
      }

      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      if (!response.ok) throw new Error("Upload failed")

      const data = await response.json()
      setUploadProgress({ loading: false, error: null, url: data.secure_url })
      return data.secure_url
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Upload failed"
      setUploadProgress({ loading: false, error: errorMessage, url: null })
      return null
    }
  }

  return {
    uploadImage,
    ...uploadProgress,
  }
}