import type React from "react"
import { Card } from "@/components/ui/card"
import { Check, AlertCircle, Loader2 } from "lucide-react"

interface FormSectionProps {
  title: string
  description?: string
  status: "idle" | "loading" | "success" | "error"
  children: React.ReactNode
}

export function FormSection({ title, description, status, children }: FormSectionProps) {
  return (
    <Card className="p-6 border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-white to-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          {status === "loading" && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
          {status === "success" && <Check className="w-5 h-5 text-green-500" />}
          {status === "error" && <AlertCircle className="w-5 h-5 text-red-500" />}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </Card>
  )
}
