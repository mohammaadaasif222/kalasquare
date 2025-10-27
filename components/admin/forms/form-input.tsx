"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormInputProps {
  label: string
  id: string
  name: string
  type?: string
  placeholder?: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  disabled?: boolean
}

export function FormInput({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
  disabled,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? "border-red-500 bg-red-50" : "border-slate-200 hover:border-slate-300"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
