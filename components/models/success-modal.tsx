"use client"

import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
}

export function SuccessModal({
  isOpen,
  onClose,
  title = "Success!",
  message = "Your profile has been updated successfully.",
}: SuccessModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-md w-full animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-b border-green-200/20 px-6 py-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-green-500/20 p-2 rounded-full mt-0.5">
              <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
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
          <Button onClick={onClose} className="bg-green-600 hover:bg-green-700 text-white">
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}
