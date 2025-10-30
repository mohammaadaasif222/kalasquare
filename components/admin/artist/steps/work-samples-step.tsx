"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useWorkSample } from "@/hooks/use-work"
import { ImageUpload } from "@/components/user/image-upload"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit } from "lucide-react"

interface Props {
  talentProfileId: string
  onComplete: () => void
  onBack: () => void
}

type WorkSampleType = "video" | "image" | "others"

export default function WorkSamplesStep({ talentProfileId, onComplete, onBack }: Props) {
  const { fetchByTalentProfile, workSamples, create, update } = useWorkSample()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    type: "video" as WorkSampleType,
    url: "",
  })

  useEffect(() => {
    if (talentProfileId) {
      fetchByTalentProfile(talentProfileId)
    }
  }, [talentProfileId])

  const resetForm = () => {
    setFormData({
      title: "",
      type: "video",
      url: "",
    })
    setEditingId(null)
    setIsFormOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (!formData.url) {
        alert("Please provide a URL or upload a file")
        setSubmitting(false)
        return
      }

      const submitData = {
        title: formData.title,
        type: formData.type,
        url: formData.url,
        talentProfileId,
      }

      if (editingId) {
        await update(editingId, submitData)
      } else {
        await create(submitData)
      }
      resetForm()
      fetchByTalentProfile(talentProfileId)
    } catch (err) {
      console.error("Failed to submit work sample:", err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (sample: any) => {
    setFormData({
      title: sample.title || "",
      type: sample.type,
      url: sample.url || "",
    })
    setEditingId(sample.id)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this work sample?")) {
      try {
        console.log("Deleting:", id)
      } catch (err) {
        console.error("Failed to delete work sample:", err)
      }
    }
  }

  const handleImageUpload = (url: string) => {
    setFormData({ ...formData, url })
  }

  const handleImageRemove = () => {
    setFormData({ ...formData, url: "" })
  }

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Upload Your Work Samples</h2>
          <p className="text-slate-600">Showcase your best work to attract opportunities</p>
        </div>

        {workSamples.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workSamples.map((sample: any) => (
              <div
                key={sample.id}
                className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-2">{sample.title || "Untitled"}</h3>
                  <p className="text-sm text-slate-600 mb-4 capitalize">{sample.type}</p>
                  {sample.url && (
                    <div className="mb-4">
                      {sample.url.match(/\.(jpeg|jpg|gif|png|webp)$/i) && (
                        <img
                          src={sample.url || "/placeholder.svg"}
                          alt={sample.title}
                          className="w-full h-32 object-cover rounded"
                        />
                      )}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(sample)}
                      className="flex-1 px-3 py-2 bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sample.id)}
                      className="flex-1 px-3 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-slate-600 mb-4">No work samples added yet</p>
            <p className="text-sm text-slate-500">Add your first work sample to showcase your talent</p>
          </div>
        )}

        {/* Add Work Sample Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Work Sample
          </Button>
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-lg w-full shadow-xl">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-900">
                  {editingId ? "Edit Work Sample" : "Add New Work Sample"}
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="Enter work sample title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Type *</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as WorkSampleType,
                        url: "",
                      })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  >
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                {formData.type === "video" && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">YouTube URL *</label>
                    <input
                      type="url"
                      required
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                )}

                {formData.type === "image" && (
                  <ImageUpload
                    label="Upload Image *"
                    preview={formData.url}
                    onUpload={handleImageUpload}
                    onRemove={handleImageRemove}
                    loading={false}
                  />
                )}

                {formData.type === "others" && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">URL (Optional)</label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                      placeholder="https://example.com/project"
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {submitting ? "Saving..." : editingId ? "Update" : "Add"}
                  </Button>
                  <Button
                    type="button"
                    onClick={resetForm}
                    disabled={submitting}
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t border-slate-200">
          <Button onClick={onBack} variant="outline" className="px-8 py-3 bg-transparent">
            Back
          </Button>
          <Button
            onClick={onComplete}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
          >
            Complete Setup
          </Button>
        </div>
      </div>
    </div>
  )
}
