"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { useUser } from "@/hooks/use-user"

interface CreateUserFormProps {
  onUserCreated: (userId: string) => void
}

export function CreateUserForm({ onUserCreated }: CreateUserFormProps) {
  const { create, isLoading, success, error } = useUser()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    user_type: "artist",
    is_premium: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      user_type: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await create(formData)
      const mockUserId = `user_${Date.now()}`
      onUserCreated(mockUserId)
      alert("User created successfully!")
      setFormData({
        email: "",
        password: "",
        phone: "",
        user_type: "artist",
        is_premium: false,
      })
    } catch (error) {
      console.error("Error creating user:", error)
      alert("Failed to create user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-card border border-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="artist@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-semibold">
              Password *
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="font-semibold">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="user_type" className="font-semibold">
              User Type *
            </Label>
            <Select value={formData.user_type} onValueChange={handleSelectChange}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="artist">Artist</SelectItem>
                <SelectItem value="creator">Creator</SelectItem>
                <SelectItem value="influencer">Influencer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="is_premium"
            name="is_premium"
            type="checkbox"
            checked={formData.is_premium}
            onChange={handleChange}
            className="w-4 h-4 rounded border-border"
          />
          <Label htmlFor="is_premium" className="font-medium cursor-pointer">
            Premium Account
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          {isLoading ? "Creating User..." : "Create User"}
        </Button>
      </form>
    </Card>
  )
}
