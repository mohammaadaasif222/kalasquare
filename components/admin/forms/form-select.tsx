"use client"

import type React from "react"
import { Label } from "@/components/ui/label"

interface FormSelectProps {
  label: string
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
  error?: string
  required?: boolean
}

export function FormSelect({ label, id, name, value, onChange, options, error, required }: FormSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? "border-red-500 bg-red-50" : "border-slate-200 hover:border-slate-300"
        }`}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
