"use client"

import { AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
}

export function ErrorModal({
  isOpen,
  onClose,
  title = "Error",
  message = "Something went wrong. Please try again.",
}: ErrorModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-md w-full animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-500/10 border-b border-yellow-200/20 px-6 py-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-red-500/20 p-2 rounded-full mt-0.5">
              <AlertCircle className="text-yellow-600 dark:text-yellow-400" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <p className="text-muted-foreground text-sm leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="bg-muted/30 px-6 py-4 border-t border-border flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
            Ok
          </Button>
        </div>
      </div>
    </div>
  )
}
