"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Star, Trash2, Edit, Plus, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react"
import { useSocials } from "@/hooks/use-social"
import { type CreateSocialAccountDto, Platform, type UpdateSocialAccountDto } from "@/types/social.types"

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
  const storedUser = JSON.parse(localStorage.getItem("newUser") ?? "{}")
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-center gap-3 text-red-800 shadow-sm animate-in slide-in-from-top-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-xl flex items-center gap-3 text-green-800 shadow-sm animate-in slide-in-from-top-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm font-medium">{success}</span>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Social Accounts
              </h1>
              <p className="text-gray-600">Manage your social media presence</p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add Account
            </button>
          </div>
          {accounts.length > 0 && (
            <div className="text-sm text-gray-500">
              {accounts.length} {accounts.length === 1 ? "account" : "accounts"} connected
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
          </div>
        )}

        {/* Accounts Table */}
        {!loading && accounts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Account
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Followers
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Engagement
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {accounts.map((account: any) => {
                    const { bgColor, textColor } = getPlatformColor(account.platform)
                    return (
                      <tr
                        key={account.id}
                        className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-blue-50/50 transition-all duration-150"
                      >
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl ${bgColor} bg-opacity-15 shadow-sm`}>
                              {/* <SocialMediaIcon platform={account.platform} className={`w-6 h-6 ${textColor}`} /> */}
                            </div>
                            <span className="font-semibold text-gray-900 capitalize">{account.platform}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <a
                            href={account.profile_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium group"
                          >
                            @{account.handle}
                            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="text-sm font-bold text-gray-900">
                            {account.followers_count.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                                style={{ width: `${Math.min(account.engagement_rate * 10, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold text-gray-900">{account.engagement_rate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex flex-wrap gap-2">
                            {account.is_verified && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 rounded-full">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                                <span className="text-xs font-semibold text-blue-700">Verified</span>
                              </span>
                            )}
                            {account.is_primary && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 rounded-full">
                                <Star className="w-3.5 h-3.5 text-amber-700 fill-amber-700" />
                                <span className="text-xs font-semibold text-amber-700">Primary</span>
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-2">
                            {!account.is_primary && (
                              <button
                                onClick={() => handleSetPrimary(account.id)}
                                className="p-2.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-200 hover:scale-110"
                                title="Set as Primary"
                              >
                                <Star className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleEdit(account)}
                              className="p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(account.id)}
                              className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && accounts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Plus className="w-12 h-12 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No social accounts yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Connect your social media accounts to showcase your online presence and track your engagement
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Your First Account
            </button>
          </div>
        )}

        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl animate-in fade-in zoom-in-95">
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {editingId ? "Edit Social Account" : "Add Social Account"}
                  </h3>
                  <button onClick={resetForm} className="p-2 hover:bg-white/80 rounded-lg transition-all duration-200">
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="px-8 py-6 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
                {!editingId && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Platform <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={(formData as CreateSocialAccountDto).platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 font-medium"
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
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Handle <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.handle || ""}
                    onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Profile URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={formData.profile_url || ""}
                    onChange={(e) => setFormData({ ...formData, profile_url: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="https://..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Followers</label>
                    <input
                      type="number"
                      value={formData.followers_count || 0}
                      onChange={(e) =>
                        setFormData({ ...formData, followers_count: Number.parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Engagement %</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.engagement_rate || 0}
                      onChange={(e) =>
                        setFormData({ ...formData, engagement_rate: Number.parseFloat(e.target.value) || 0 })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_verified || false}
                      onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
                      className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Verified Account</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_primary || false}
                      onChange={(e) => setFormData({ ...formData, is_primary: e.target.checked })}
                      className="w-5 h-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Primary Account</span>
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex gap-3 rounded-b-2xl">
                <button
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || !formData.handle || !formData.profile_url}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-semibold"
                >
                  {loading ? "Saving..." : editingId ? "Update Account" : "Create Account"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SocialAccountsManager
