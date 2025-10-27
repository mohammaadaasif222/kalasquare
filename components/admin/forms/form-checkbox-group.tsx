"use client"
import { Label } from "@/components/ui/label"

interface FormCheckboxGroupProps {
  label: string
  options: string[]
  selected: string[]
  onChange: (value: string) => void
  error?: string
  required?: boolean
  columns?: number
}

export function FormCheckboxGroup({
  label,
  options,
  selected,
  onChange,
  error,
  required,
  columns = 3,
}: FormCheckboxGroupProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <div className={`grid grid-cols-${columns} gap-3`}>
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onChange(option)}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 transition-all duration-200 group-hover:border-blue-400"
            />
            <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
