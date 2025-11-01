"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Star, Trash2, Edit, Plus, AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { useSocials } from "@/hooks/use-social"
import { type CreateSocialAccountDto, Platform, type UpdateSocialAccountDto } from "@/types/social.types"
import { SocialMediaIcon } from "./social-media-icon"
import { getPlatformColor } from "@/lib/platform-colors"

interface Props {
  talentProfileId?: string
}


const SocialAccountsManager: React.FC<Props> = ({ talentProfileId }: Props) => {

  const {
    accounts,
    loading,
    error,
    success,
    loadAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    setPrimary,
    clearAllMessages,
  } = useSocials(talentProfileId)

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<CreateSocialAccountDto | UpdateSocialAccountDto>({
    talent_profile_id: "",
    platform: Platform.INSTAGRAM,
    handle: "",
    profile_url: "",
    followers_count: 0,
    engagement_rate: 0,
    is_verified: false,
    is_primary: false,
  })

  useEffect(() => {
    if (talentProfileId) {
      setFormData((prev) => ({
        ...prev,
        talent_profile_id: talentProfileId,
      }))
    }
  }, [talentProfileId])

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        clearAllMessages()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success, error, clearAllMessages])

  const handleSubmit = async () => {
    if (!talentProfileId) {
      console.error("Talent ID is not available")
      return
    }

    const dataToSubmit = {
      ...formData,
      talent_profile_id: talentProfileId,
    }

    if (editingId) {
      const { talent_profile_id, platform, ...updateData } = dataToSubmit as any
      await updateAccount(editingId, updateData)
    } else {
      await createAccount(dataToSubmit as CreateSocialAccountDto)
    }

    resetForm()
    loadAccounts(talentProfileId)
  }

  const handleEdit = (account: any) => {
    setEditingId(account.id)
    setFormData({
      talent_profile_id: talentProfileId ?? "",
      handle: account.handle,
      profile_url: account.profile_url,
      followers_count: account.followers_count,
      engagement_rate: account.engagement_rate,
      is_verified: account.is_verified,
      is_primary: account.is_primary,
    })
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this social account?")) {
      await deleteAccount(id)
      if (talentProfileId) {
        loadAccounts(talentProfileId)
      }
    }
  }

  const handleSetPrimary = async (id: string) => {
    await setPrimary(id)
    if (talentProfileId) {
      loadAccounts(talentProfileId)
    }
  }

  const resetForm = () => {
    setIsFormOpen(false)
    setEditingId(null)
    setFormData({
      talent_profile_id: talentProfileId ?? "",
      platform: Platform.INSTAGRAM,
      handle: "",
      profile_url: "",
      followers_count: 0,
      engagement_rate: 0,
      is_verified: false,
      is_primary: false,
    })
  }

  if (!talentProfileId) {
    return (
      <div className="max-w-7xl mx-auto p-6 flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-800 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-800 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">{success}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Social Accounts</h1>
          <p className="text-gray-600 text-sm">Manage and showcase your social media presence</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--brand)] text-white rounded-lg hover:shadow-lg hover:bg-[var(--brand)]/70 transition-all duration-200 font-medium text-sm"
        >
          <Plus className="w-5 h-5" />
          Add Account
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Accounts Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {accounts.map((account: any) => {
            const { bgColor, textColor, borderColor } = getPlatformColor(account.platform)
            return (
              <div
                key={account.id}
                className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-gray-300"
              >
                {/* Platform Header Bar */}
                <div className={`h-1 ${bgColor}`}></div>

                <div className="p-5">
                  {/* Platform Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-lg ${bgColor} bg-opacity-10`}>
                        <SocialMediaIcon platform={account.platform} className={`w-6 h-6 ${textColor}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 capitalize text-sm">{account.platform}</h3>
                        <p className="text-xs text-gray-500">@{account.handle}</p>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {account.is_verified && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full border border-blue-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          <span className="text-xs font-medium text-blue-600">Verified</span>
                        </div>
                      )}
                      {!account.is_verified && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-full border border-gray-200">
                          <XCircle className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs font-medium text-gray-500">Unverified</span>
                        </div>
                      )}
                      {account.is_primary && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-full border border-yellow-200">
                          <Star className="w-3.5 h-3.5 text-yellow-600 fill-yellow-600" />
                          <span className="text-xs font-medium text-yellow-600">Primary</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2.5 mb-5 pb-5 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-600">Followers</span>
                      <span className="text-sm font-bold text-gray-900">
                        {account.followers_count.toLocaleString()}
                      </span>
                    </div>
                    {account.engagement_rate !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-600">Engagement</span>
                        <span className="text-sm font-bold text-gray-900">{account.engagement_rate}%</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {!account.is_primary && (
                      <button
                        onClick={() => handleSetPrimary(account.id)}
                        className="flex-1 px-3 py-2 text-xs font-medium border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                      >
                        Set Primary
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(account)}
                      className="flex-1 px-3 py-2 text-xs font-medium border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4 inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(account.id)}
                      className="px-3 py-2 text-xs font-medium border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && accounts.length === 0 && (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <p className="text-gray-600 mb-4 font-medium">No social accounts yet</p>
          <p className="text-gray-500 text-sm mb-6">Add your first social media account to get started</p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-sm inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Your First Account
          </button>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-900">
                {editingId ? "Edit Social Account" : "Add Social Account"}
              </h3>
              <button onClick={resetForm} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {!editingId && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
                  <select
                    value={(formData as CreateSocialAccountDto).platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  >
                    {Object.values(Platform).map((platform) => (
                      <option key={platform} value={platform}>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={formData.handle || ""}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Profile URL</label>
                <input
                  type="url"
                  value={formData.profile_url || ""}
                  onChange={(e) => setFormData({ ...formData, profile_url: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Followers</label>
                  <input
                    type="number"
                    value={formData.followers_count || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, followers_count: Number.parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Engagement %</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.engagement_rate || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, engagement_rate: Number.parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={resetForm}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !formData.handle || !formData.profile_url}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[var(--brand)] to-[var(--brand)]/80 text-white rounded-lg hover:shadow-lg hover:from-from-[var(--brand)] hover:to-from-[var(--brand)]/70 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
                >
                  {loading ? "Saving..." : editingId ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SocialAccountsManager
