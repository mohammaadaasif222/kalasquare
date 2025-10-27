"use client"

import { useState } from "react"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from "@/lib/firebase"

interface UploadProgress {
  loading: boolean
  error: string | null
  url: string | null
}

export function useFirebaseUpload() {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    loading: false,
    error: null,
    url: null,
  })

  const uploadImage = async (file: File, path: string): Promise<string | null> => {
    setUploadProgress({ loading: true, error: null, url: null })

    try {
      // Validate file
      if (!file.type.startsWith("image/")) {
        throw new Error("File must be an image")
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error("File size must be less than 10MB")
      }

      // Create storage reference with timestamp to ensure unique filenames
      const timestamp = Date.now()
      const filename = `${timestamp}-${file.name}`
      const storageRef = ref(storage, `${path}/${filename}`)

      // Upload file
      await uploadBytes(storageRef, file)

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef)

      setUploadProgress({ loading: false, error: null, url: downloadURL })
      return downloadURL
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Upload failed"
      setUploadProgress({ loading: false, error: errorMessage, url: null })
      return null
    }
  }

  const resetProgress = () => {
    setUploadProgress({ loading: false, error: null, url: null })
  }

  return {
    uploadImage,
    resetProgress,
    ...uploadProgress,
  }
}
