  "use client"

  import type React from "react"

  import { useRef } from "react"
  import { Upload, X, ImageIcon } from "lucide-react"
  import { Label } from "@/components/ui/label"
  import { useCloudinaryUpload } from "@/hooks/use-cloudnary-upload"

  interface ImageUploadProps {
    label: string
    preview: string
    onUpload: (url: string) => void
    onRemove: () => void
    loading: boolean
  }

  export function ImageUpload({ label, preview, onUpload, onRemove, loading }: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const { uploadImage } = useCloudinaryUpload()

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file && file.type.startsWith("image/")) {
        try {
          const url = await uploadImage(file)
          if (url) {
            onUpload(url)
          }
        } catch (error) {
          console.error("Upload failed:", error)
        }
      }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      const file = e.dataTransfer.files?.[0]
      if (file && file.type.startsWith("image/")) {
        try {
          const url = await uploadImage(file)
          if (url) {
            onUpload(url)
          }
        } catch (error) {
          console.error("Upload failed:", error)
        }
      }
    }

    return (
      <div>
        <Label htmlFor={label} className="mb-3 block">
          {label}
        </Label>
        {preview ? (
          <div className="relative group">
            <img
              src={preview || "/placeholder.svg"}
              alt={label}
              className="w-full h-48 object-cover rounded-lg border-2 border-primary/20"
            />
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={18} />
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <Upload className="text-white" size={24} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <ImageIcon className="text-primary" size={24} />
              </div>
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={loading}
        />
      </div>
    )
  }
