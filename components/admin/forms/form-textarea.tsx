"use client"

import type React from "react"
import { Label } from "@/components/ui/label"

interface FormTextareaProps {
  label: string
  id: string
  name: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
  required?: boolean
  rows?: number
  maxLength?: number
}

export function FormTextarea({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  error,
  required,
  rows = 4,
  maxLength,
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {maxLength && (
          <span className="text-xs text-slate-500">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={`w-full px-3 py-2 border rounded-md resize-none transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? "border-red-500 bg-red-50" : "border-slate-200 hover:border-slate-300"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
