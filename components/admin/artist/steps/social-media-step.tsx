"use client"
import { useState, useEffect } from "react"
import { X, Plus, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react"
import { useSocials } from "@/hooks/use-social"
import { type CreateSocialAccountDto, Platform, type UpdateSocialAccountDto } from "@/types/social.types"
import { Button } from "@/components/ui/button"

interface Props {
  talentProfileId: string
  onComplete: () => void
  onBack: () => void
}

export default function SocialMediaStep({ talentProfileId, onComplete, onBack }: Props) {
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
    talent_profile_id: talentProfileId,
    platform: Platform.INSTAGRAM,
    handle: "",
    profile_url: "",
    followers_count: 0,
    engagement_rate: 0,
    is_verified: false,
    is_primary: false,
  })

  useEffect(() => {
    loadAccounts(talentProfileId)
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
      talent_profile_id: talentProfileId,
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
      loadAccounts(talentProfileId)
    }
  }

  const handleSetPrimary = async (id: string) => {
    await setPrimary(id)
    loadAccounts(talentProfileId)
  }

  const resetForm = () => {
    setIsFormOpen(false)
    setEditingId(null)
    setFormData({
      talent_profile_id: talentProfileId,
      platform: Platform.INSTAGRAM,
      handle: "",
      profile_url: "",
      followers_count: 0,
      engagement_rate: 0,
      is_verified: false,
      is_primary: false,
    })
  }

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Link Your Social Media</h2>
          <p className="text-slate-600">Connect your social accounts to showcase your online presence</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{success}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
          </div>
        ) : accounts.length > 0 ? (
          <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Platform</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Account</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Followers</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">Engagement</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {accounts.map((account: any) => (
                    <tr key={account.id} className="hover:bg-slate-100 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-900 capitalize">{account.platform}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={account.profile_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          @{account.handle}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-slate-900">
                          {account.followers_count.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-slate-900">{account.engagement_rate}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(account)}
                            className="px-3 py-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(account.id)}
                            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-slate-600 mb-4">No social accounts added yet</p>
            <p className="text-sm text-slate-500">Add your first social media account to get started</p>
          </div>
        )}

        {/* Add Account Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Social Account
          </Button>
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-lg w-full shadow-xl">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">
                  {editingId ? "Edit Social Account" : "Add Social Account"}
                </h3>
                <button onClick={resetForm} className="p-1 hover:bg-slate-100 rounded transition-colors">
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              <div className="px-6 py-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                {!editingId && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Platform <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={(formData as CreateSocialAccountDto).platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Handle <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.handle || ""}
                    onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Profile URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={formData.profile_url || ""}
                    onChange={(e) => setFormData({ ...formData, profile_url: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="https://..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Followers</label>
                    <input
                      type="number"
                      value={formData.followers_count || 0}
                      onChange={(e) =>
                        setFormData({ ...formData, followers_count: Number.parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Engagement %</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.engagement_rate || 0}
                      onChange={(e) =>
                        setFormData({ ...formData, engagement_rate: Number.parseFloat(e.target.value) || 0 })
                      }
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_verified || false}
                      onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Verified Account</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_primary || false}
                      onChange={(e) => setFormData({ ...formData, is_primary: e.target.checked })}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Primary Account</span>
                  </label>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex gap-3 rounded-b-xl">
                <Button onClick={resetForm} variant="outline" className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !formData.handle || !formData.profile_url}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {loading ? "Saving..." : editingId ? "Update" : "Add Account"}
                </Button>
              </div>
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
            Continue to Work Samples
          </Button>
        </div>
      </div>
    </div>
  )
}
