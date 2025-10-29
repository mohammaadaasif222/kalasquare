'use client';

import { useEffect, useState } from 'react';
import { useCloudinaryUpload } from '@/hooks/use-cloudnary-upload';
import { ImageUpload } from '../user/image-upload';
import { useWorkSample } from '@/hooks/use-work';
import { WorkSample } from '@/lib/redux/features/works/worksSlice';


// Types
export type WorkSampleType = 'video' | 'image' | 'reel' | 'others';
export type WorkStatus = 'pending' | 'approved' | 'rejected';

interface WorkSampleManagerProps {
  talentProfileId: string;
}

export default function WorkSampleManager({ talentProfileId }: WorkSampleManagerProps) {
  const { fetchByTalentProfile, workSamples, create, update } = useWorkSample()
  // Mock data - replace with your actual hooks

  const loading = false;
  const error = null;
  const [type, setType] = useState('video')
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'video' as WorkSampleType,
    url: '',
  });



  const { uploadImage, loading: uploadingFile } = useCloudinaryUpload();

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'video',
      url: '',
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!formData.url) {
        if (formData.type === 'video' || formData.type === 'reel') {
          alert('Please enter a YouTube URL');
        } else if (formData.type === 'image') {
          alert('Please upload an image');
        } else {
          alert('Please provide a URL or upload a file');
        }
        setSubmitting(false);
        return;
      }

      const submitData = {
        title: formData.title,
        type: formData.type,
        url: formData.url,
        talentProfileId,
      };

      if (editingId) {
        console.log('Updating:', submitData);
        await update(editingId, submitData);
      } else {

        await create(submitData);
      }
      resetForm();
    } catch (err) {
      console.error('Failed to submit work sample:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (sample: WorkSample) => {
    setFormData({
      title: sample.title || '',
      type: sample.type,
      url: sample.url || '',
    });
    setEditingId(sample.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this work sample?')) {
      try {
        console.log('Deleting:', id);
        // await remove(id);
      } catch (err) {
        console.error('Failed to delete work sample:', err);
      }
    }
  };

  const handleStatusChange = async (id: string, status: WorkStatus) => {
    try {
      console.log('Updating status:', id, status);
      // await updateStatus(id, status);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleTypeChange = (type: WorkSampleType) => {
    setFormData({
      ...formData,
      type,
      url: '',
    });
  };

  const handleImageUpload = (url: string) => {
    setFormData({ ...formData, url });
  };

  const handleImageRemove = () => {
    setFormData({ ...formData, url: '' });
  };

  const getStatusColor = (status: WorkStatus) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getTypeColor = (type: WorkSampleType) => {
    const colors: Record<WorkSampleType, string> = {
      video: 'bg-blue-100 text-blue-800',
      image: 'bg-purple-100 text-purple-800',
      reel: 'bg-indigo-100 text-indigo-800',
      others: 'bg-pink-100 text-pink-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const workSampleTypeOptions: WorkSampleType[] = ['video', 'image', 'reel', 'others'];


  useEffect(() => {
    if (talentProfileId) {
      fetchByTalentProfile(talentProfileId)
    }
  }, [talentProfileId])



  // Detect if the URL is an image
  const isImageUrl = (url: string) => /\.(jpeg|jpg|gif|png|webp)$/i.test(url);

  // Detect if the URL is a video file
  const isVideoUrl = (url: string) => /\.(mp4|mov|avi|mkv|webm)$/i.test(url);

  // Detect if the URL is a YouTube link
  const isYouTubeUrl = (url: string) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//.test(url);

  // Convert YouTube URL to embeddable format
  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
      return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
    } catch {
      return url;
    }
  };

  const filtred = workSamples.filter((item) => item.type === type)
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Works</h1>
          <p className="text-gray-600 mt-1">Manage your portfolio and achievements</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-6 py-3 bg-[var(--brand)] text-white rounded hover:bg-[var(--brand)]/90 transition-colors shadow-lg hover:shadow-xl font-medium"
        >
          + Add Work Sample
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? 'Edit Work Sample' : 'Add New Work Sample'}
              </h2>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Enter work sample title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => handleTypeChange(e.target.value as WorkSampleType)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  {workSampleTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {(formData.type === 'video' || formData.type === 'reel') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="mt-1 text-xs text-gray-500">Enter a valid YouTube video URL</p>
                </div>
              )}

              {formData.type === 'image' && (
                <ImageUpload
                  label="Upload Image *"
                  preview={formData.url}
                  onUpload={handleImageUpload}
                  onRemove={handleImageRemove}
                  loading={uploadingFile}
                />
              )}

              {formData.type === 'others' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL (Optional)</label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="https://example.com/project"
                    />
                  </div>
                  <div className="text-center text-sm text-gray-500 font-medium">OR</div>
                  <ImageUpload
                    label="Upload File (Optional)"
                    preview={formData.url && isImageUrl(formData.url) ? formData.url : ''}
                    onUpload={handleImageUpload}
                    onRemove={handleImageRemove}
                    loading={uploadingFile}
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={submitting || uploadingFile}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium shadow-lg"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    editingId ? 'Update' : 'Create'
                  )}
                </button>
                <button
                  onClick={resetForm}
                  disabled={submitting || uploadingFile}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && !submitting && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin absolute top-0"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading work samples...</p>
        </div>
      )}

      {!loading && filtred.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No work samples yet</h3>
          <p className="mt-2 text-gray-500">Get started by adding your first work sample.</p>
        </div>
      )}

      <div className="flex gap-5 items-center py-4 mb-3 border-b-2 ">
        <button
          onClick={() => setType('video')}
          className={`px-6 py-3 rounded font-medium transition-all shadow  
      ${type === 'video'
              ? 'bg-[var(--brand)] text-white scale-105' // Active state
              : 'bg-white text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white' // Inactive state
            }`}
        >
          Video
        </button>

        <button
          onClick={() => setType('image')}
          className={`px-6 py-3 rounded font-medium transition-all shadow hover:shadow-xl 
      ${type === 'image'
              ? 'bg-[var(--brand)] text-white scale-105' // Active state
              : 'bg-white text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white'
            }`}
        >
          Image Gallery
        </button>
      </div>



      {!loading && filtred.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtred.map((sample) => (
            <div key={sample.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2 flex-1">{sample.title || 'Untitled'}</h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(sample.type)}`}>{sample.type}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(sample.status)}`}>{sample.status}</span>
                </div>

                {sample.url && (
                  <div className="mb-4">
                    {/* 🖼️ Image */}
                    {isImageUrl(sample.url) && (
                      <img
                        src={sample.url}
                        alt={sample.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}

                    {/* 🎥 YouTube video */}
                    {!isImageUrl(sample.url) && isYouTubeUrl(sample.url) && (
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={getYouTubeEmbedUrl(sample.url)}
                          title={sample.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-48 rounded-lg"
                        ></iframe>
                      </div>
                    )}

                    {/* 🎞️ MP4 or other video file */}
                    {!isImageUrl(sample.url) && !isYouTubeUrl(sample.url) && isVideoUrl(sample.url) && (
                      <video
                        controls
                        className="w-full h-48 rounded-lg object-cover"
                      >
                        <source src={sample.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}

                    {/* 🔗 Fallback link */}
                    {!isImageUrl(sample.url) && !isYouTubeUrl(sample.url) && !isVideoUrl(sample.url) && (
                      <a
                        href={sample.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center group-hover:underline"
                      >
                        View Project
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                )}


                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button onClick={() => handleEdit(sample)} className="flex-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">Edit</button>
                  {/* {sample.status === 'pending' && (
                    <button onClick={() => handleStatusChange(sample.id, 'approved')} className="flex-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">Approve</button>
                  )} */}
                  <button onClick={() => handleDelete(sample.id)} className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}