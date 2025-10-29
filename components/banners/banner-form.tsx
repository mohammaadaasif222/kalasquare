// // components/BannerUploadForm.tsx
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { BannerType } from '@/types/banner.types';
// import { useBanner } from '@/hooks/use-banner';
// import { ImageUpload } from '../user/image-upload';

// export default function BannerUploadForm() {
//     const { loading, error, addBanner, clearBannerError } = useBanner();
//     const [showSuccess, setShowSuccess] = useState(false);
//     const [imageUrl, setImageUrl] = useState('');
//     const [imageLoading, setImageLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         url: '',
//         link: '',
//         position:0,
//         type: BannerType.TOP,
//     });
//     const [validationErrors, setValidationErrors] = useState<{
//         title?: string;
//         url?: string;
//         image?: string;
//     }>({});

//     // Auto-hide success message after 3 seconds
//     useEffect(() => {
//         if (showSuccess) {
//             const timer = setTimeout(() => setShowSuccess(false), 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [showSuccess]);

//     const validateForm = (): boolean => {
//         const errors: { title?: string; url?: string; image?: string } = {};

//         if (!formData.title.trim()) {
//             errors.title = 'Title is required';
//         }


//         if (!imageUrl.trim()) {
//             errors.image = 'Banner image is required';
//         }

//         setValidationErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleInputChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//     ) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));

//         // Clear validation error for this field
//         if (validationErrors[name as keyof typeof validationErrors]) {
//             setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
//         }

//         // Clear API error
//         if (error) {
//             clearBannerError();
//         }
//     };

//     const handleImageUpload = (url: string) => {
//         setImageUrl(url);
//         setImageLoading(false);
//         // Clear image validation error
//         if (validationErrors.image) {
//             setValidationErrors((prev) => ({ ...prev, image: undefined }));
//         }
//     };

//     const handleImageRemove = () => {
//         setImageUrl('');
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!validateForm()) return;

//         try {
//             await addBanner({
//                 title: formData.title,
//                 position:0,
//                 description: formData.description || undefined,
//                 link: formData.link,
//                 type: formData.type,
//                 url: imageUrl
//                 // Add image URL to the payload
//             });

//             setShowSuccess(true);
//             setFormData({
//                 title: '',
//                 position:0,
//                 description: '',
//                 url: '',
//                 link: "",
//                 type: BannerType.TOP,
//             });
//             setImageUrl('');
//             setValidationErrors({});
//         } catch (err: any) {
//             console.error('Failed to create banner:', err);
//         }
//     };

//     const handleReset = () => {
//         setFormData({
//             position:0,
//             title: '',
//             description: '',
//             url: '',
//             link: '',
//             type: BannerType.TOP,
//         });
//         setImageUrl('');
//         setValidationErrors({});
//         clearBannerError();
//     };

//     const isFormDisabled = loading || imageLoading;

//     return (
//         <div className="min-h-screen p-4 flex items-center justify-center">
//             <div className="w-full max-w-4xl bg-white rounded shadow p-8">
//                 {/* Header */}
//                 <div className="flex items-center gap-3 mb-6">
//                     <div className="p-3 bg-[var(--brand)]/10 rounded">
//                         <svg
//                             className="w-6 h-6 text-[var(--brand)]"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                             />
//                         </svg>
//                     </div>
//                     <div>
//                         <h1 className="text-2xl font-bold text-gray-900">Upload Banner</h1>
//                         <p className="text-sm text-gray-600">Create a new banner for your website</p>
//                     </div>
//                 </div>

//                 {/* Success Alert */}
//                 {showSuccess && (
//                     <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
//                         <svg
//                             className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                         </svg>
//                         <div className="flex-1">
//                             <h3 className="text-sm font-semibold text-green-900">Success!</h3>
//                             <p className="text-sm text-green-700">Banner has been created successfully.</p>
//                         </div>
//                         <button
//                             onClick={() => setShowSuccess(false)}
//                             className="text-green-600 hover:text-green-800"
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>
//                 )}

//                 {/* Error Alert */}
//                 {error && (
//                     <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
//                         <svg
//                             className="w-5 h-5 text-[var(--brand)] flex-shrink-0 mt-0.5"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                             />
//                         </svg>
//                         <div className="flex-1">
//                             <h3 className="text-sm font-semibold text-red-900">Error</h3>
//                             <p className="text-sm text-red-700">{error}</p>
//                         </div>
//                         <button
//                             onClick={clearBannerError}
//                             className="text-[var(--brand)] hover:text-red-800"
//                         >
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>
//                 )}

//                 {/* Form */}
//                 <div className="space-y-6">
//                     {/* Image Upload */}
//                     <div>
//                         <ImageUpload
//                             label="Banner Image * (1600 x 333) px"
//                             preview={imageUrl}
//                             onUpload={handleImageUpload}
//                             onRemove={handleImageRemove}
//                             loading={isFormDisabled}
//                         />
//                         {validationErrors.image && (
//                             <p className="mt-2 text-sm text-[var(--brand)]">{validationErrors.image}</p>
//                         )}
//                     </div>

//                     {/* Title */}
//                     <div>
//                         <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
//                             Title <span className="text-[var(--brand)]">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             id="title"
//                             name="title"
//                             value={formData.title}
//                             onChange={handleInputChange}
//                             disabled={isFormDisabled}
//                             className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-all ${validationErrors.title ? 'border-[var(--brand)]' : 'border-gray-300'
//                                 } ${isFormDisabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
//                             placeholder="Enter banner title"
//                         />
//                         {validationErrors.title && (
//                             <p className="mt-1 text-sm text-[var(--brand)]">{validationErrors.title}</p>
//                         )}
//                     </div>


//                     <div>
//                         <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//                             Description
//                         </label>
//                         <textarea
//                             id="description"
//                             name="description"
//                             value={formData.description}
//                             onChange={handleInputChange}
//                             disabled={isFormDisabled}
//                             rows={4}
//                             className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-all resize-none ${isFormDisabled ? 'bg-gray-50 cursor-not-allowed' : ''
//                                 }`}
//                             placeholder="Enter banner description (optional)"
//                         />
//                     </div>

//                     {/* URL */}
//                     <div>
//                         <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
//                             Link URL <span className="text-[var(--brand)]">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             id="link"
//                             name="link"
//                             value={formData.link}
//                             onChange={handleInputChange}
//                             disabled={isFormDisabled}
//                             className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-all ${validationErrors.url ? 'border-[var(--brand)]' : 'border-gray-300'
//                                 } ${isFormDisabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
//                             placeholder="https://example.com"
//                         />
//                         {validationErrors.url && (
//                             <p className="mt-1 text-sm text-[var(--brand)]">{validationErrors.url}</p>
//                         )}
//                     </div>

//                     {/* Banner Type */}
//                     <div>
//                         <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
//                             Banner Position <span className="text-[var(--brand)]">*</span>
//                         </label>
//                         <select
//                             id="type"
//                             name="type"
//                             value={formData.type}
//                             onChange={handleInputChange}
//                             disabled={isFormDisabled}
//                             className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-all ${isFormDisabled ? 'bg-gray-50 cursor-not-allowed' : ''
//                                 }`}
//                         >
//                             <option value={BannerType.TOP}>Top Banner</option>
//                             <option value={BannerType.BOTTOM}>Bottom Banner</option>
//                         </select>
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex gap-4 pt-4">
//                         <button
//                             type="button"
//                             onClick={handleSubmit}
//                             disabled={isFormDisabled}
//                             className="flex-1 bg-[var(--brand)] text-white py-3 px-6 rounded-lg font-medium hover:bg-[var(--brand)]focus:ring-4 focus:ring-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                         >
//                             {loading ? (
//                                 <>
//                                     <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                         <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                         />
//                                     </svg>
//                                     Creating Banner...
//                                 </>
//                             ) : imageLoading ? (
//                                 <>
//                                     <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                         <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                         />
//                                     </svg>
//                                     Uploading Image...
//                                 </>
//                             ) : (
//                                 <>
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth={2}
//                                             d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                                         />
//                                     </svg>
//                                     Create Banner
//                                 </>
//                             )}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={handleReset}
//                             disabled={isFormDisabled}
//                             className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             Reset
//                         </button>
//                     </div>
//                 </div>

//                 {/* Info */}
//                 <div className="mt-6 p-4 bg-[var(--brand)]/10 rounded-lg">
//                     <p className="text-xs text-[var(--brand)]">
//                         <strong>Note:</strong> Upload a banner image (PNG, JPG, GIF up to 10MB) and provide a valid URL including the protocol (https://).
//                         The banner will be displayed on your website based on the selected position.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }






// components/BannerManagement.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { BannerType } from '@/types/banner.types';
import { useBanner } from '@/hooks/use-banner';
import { ImageUpload } from '../user/image-upload';

type Tab = 'upload' | 'list';

export default function BannerManagement() {
    const { banners, loading, error, getBanners, addBanner, editBanner, removeBanner, clearBannerError } = useBanner();
    const [activeTab, setActiveTab] = useState<Tab>('upload');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        link: '',
        position: 0,
        type: BannerType.TOP,
    });

    const [validationErrors, setValidationErrors] = useState<{
        title?: string;
        link?: string;
        image?: string;
        position?: string;
    }>({});

    useEffect(() => {
        getBanners();
    }, []);

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    const validateImageSize = (url: string): Promise<{ width: number; height: number }> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = url;
        });
    };

    const checkPositionConflict = (position: number, type: BannerType, excludeId?: string): boolean => {
        return banners.some(banner =>
            banner.position === position &&
            banner.type === type &&
            banner.id !== excludeId
        );
    };

    const validateForm = async (): Promise<boolean> => {
        const errors: { title?: string; link?: string; image?: string; position?: string } = {};

        if (!formData.title.trim()) {
            errors.title = 'Title is required';
        }

        if (!formData.link.trim()) {
            errors.link = 'Link URL is required';
        } else if (!/^https?:\/\/.+/.test(formData.link)) {
            errors.link = 'Please enter a valid URL starting with http:// or https://';
        }

        if (!imageUrl.trim()) {
            errors.image = 'Banner image is required';
        } else {
            try {
                const dimensions = await validateImageSize(imageUrl);
                setImageDimensions(dimensions);

                // Minimum size validation (at least 800x200)
                if (dimensions.width < 800 || dimensions.height < 200) {
                    errors.image = `Image is too small (${dimensions.width}x${dimensions.height}px). Minimum size: 800x200px. Recommended: 1600x333px`;
                }
            } catch (err) {
                errors.image = 'Failed to validate image dimensions';
            }
        }

        // Check position conflict
        if (checkPositionConflict(formData.position, formData.type, editingBannerId || undefined)) {
            errors.position = `A banner already exists at position ${formData.position} for ${formData.type === BannerType.TOP ? 'Top' : 'Bottom'}`;
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        const processedValue = name === 'position' ? parseInt(value) || 0 : value;
        setFormData((prev) => ({ ...prev, [name]: processedValue }));

        if (validationErrors[name as keyof typeof validationErrors]) {
            setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
        }

        if (error) {
            clearBannerError();
        }
    };

    const handleImageUpload = (url: string) => {
        setImageUrl(url);
        setImageLoading(false);
        if (validationErrors.image) {
            setValidationErrors((prev) => ({ ...prev, image: undefined }));
        }
    };

    const handleImageRemove = () => {
        setImageUrl('');
        setImageDimensions(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!(await validateForm())) return;

        try {
            if (editingBannerId) {
                await editBanner(editingBannerId, {
                    title: formData.title,
                    description: formData.description || undefined,
                    link: formData.link,
                    type: formData.type,
                    position: formData.position,
                    url: imageUrl,
                });
                setSuccessMessage('Banner updated successfully!');
            } else {
                await addBanner({
                    title: formData.title,
                    description: formData.description || undefined,
                    link: formData.link,
                    type: formData.type,
                    position: formData.position,
                    url: imageUrl,
                });
                setSuccessMessage('Banner created successfully!');
            }

            setShowSuccess(true);
            handleReset();
            getBanners();
        } catch (err: any) {
            console.error('Failed to save banner:', err);
        }
    };

    const handleEdit = (banner: any) => {
        setEditingBannerId(banner._id);
        setFormData({
            title: banner.title,
            description: banner.description || '',
            link: banner.link,
            position: banner.position,
            type: banner.type,
        });
        setImageUrl(banner.url);
        setActiveTab('upload');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this banner?')) return;

        try {
            await removeBanner(id);
            setSuccessMessage('Banner deleted successfully!');
            setShowSuccess(true);
            getBanners();
        } catch (err) {
            console.error('Failed to delete banner:', err);
        }
    };

    const handleReset = () => {
        setFormData({
            title: '',
            description: '',
            link: '',
            position: 0,
            type: BannerType.TOP,
        });
        setImageUrl('');
        setImageDimensions(null);
        setValidationErrors({});
        setEditingBannerId(null);
        clearBannerError();
    };

    const isFormDisabled = loading || imageLoading;
  const copies = new Array(...banners)
    return (
        <div className="min-h-screen p-4">
            <div className="w-full max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-[var(--brand)]/10 rounded">
                            <svg className="w-6 h-6 text-[var(--brand)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Banner Management</h1>
                            <p className="text-sm text-gray-600">Create and manage your website banners</p>
                        </div>
                    </div>
                </div>

                {/* Success Alert */}
                {showSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-green-900">Success!</h3>
                            <p className="text-sm text-green-700">{successMessage}</p>
                        </div>
                        <button onClick={() => setShowSuccess(false)} className="text-green-600 hover:text-green-800">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-red-900">Error</h3>
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                        <button onClick={clearBannerError} className="text-red-600 hover:text-red-800">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow">
                    <div className="border-b border-gray-200">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('upload')}
                                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'upload'
                                        ? 'border-b-2 border-[var(--brand)] text-[var(--brand)]'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    {editingBannerId ? 'Edit Banner' : 'Upload Banner'}
                                </div>
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab('list');
                                    handleReset();
                                }}
                                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'list'
                                        ? 'border-b-2 border-[var(--brand)] text-[var(--brand)]'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                    Banner List ({banners.length})
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Upload Tab */}
                    {activeTab === 'upload' && (
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Image Upload */}
                                <div>
                                    <ImageUpload
                                        label="Banner Image * (Recommended: 1600 x 333px, Min: 800 x 200px)"
                                        preview={imageUrl}
                                        onUpload={handleImageUpload}
                                        onRemove={handleImageRemove}
                                        loading={isFormDisabled}
                                    />
                                    {imageDimensions && !validationErrors.image && (
                                        <p className="mt-2 text-sm text-green-600">
                                            ✓ Image size: {imageDimensions.width} x {imageDimensions.height}px
                                        </p>
                                    )}
                                    {validationErrors.image && (
                                        <p className="mt-2 text-sm text-red-600">{validationErrors.image}</p>
                                    )}
                                </div>

                                {/* Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                        Title <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        disabled={isFormDisabled}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition-all ${validationErrors.title ? 'border-red-500' : 'border-gray-300'
                                            } ${isFormDisabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                        placeholder="Enter banner title"
                                    />
                                    {validationErrors.title && (
                                        <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        disabled={isFormDisabled}
                                        rows={4}
                                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition-all resize-none ${isFormDisabled ? 'bg-gray-50 cursor-not-allowed' : ''
                                            }`}
                                        placeholder="Enter banner description (optional)"
                                    />
                                </div>

                                {/* Link URL */}
                                <div>
                                    <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
                                        Link URL <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="link"
                                        name="link"
                                        value={formData.link}
                                        onChange={handleInputChange}
                                        disabled={isFormDisabled}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition-all ${validationErrors.link ? 'border-red-500' : 'border-gray-300'
                                            } ${isFormDisabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                        placeholder="https://example.com"
                                    />
                                    {validationErrors.link && (
                                        <p className="mt-1 text-sm text-red-600">{validationErrors.link}</p>
                                    )}
                                </div>

                                {/* Banner Type and Position */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                                            Banner Type <span className="text-red-600">*</span>
                                        </label>
                                        <select
                                            id="type"
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            disabled={isFormDisabled}
                                            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition-all ${isFormDisabled ? 'bg-gray-50 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            <option value={BannerType.TOP}>Top Banner</option>
                                            <option value={BannerType.BOTTOM}>Bottom Banner</option>
                                            <option value={BannerType.CARD}>Card</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                                            Position <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            id="position"
                                            name="position"
                                            min="0"
                                            value={formData.position}
                                            onChange={handleInputChange}
                                            disabled={isFormDisabled}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition-all ${validationErrors.position ? 'border-red-500' : 'border-gray-300'
                                                } ${isFormDisabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                                            placeholder="0"
                                        />
                                        {validationErrors.position && (
                                            <p className="mt-1 text-sm text-red-600">{validationErrors.position}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">Lower numbers appear first</p>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={isFormDisabled}
                                        className="flex-1 bg-[var(--brand)] text-white py-3 px-6 rounded-lg font-medium hover:bg-[var(--brand)]/90 focus:ring-4 focus:ring-[var(--brand)]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                {editingBannerId ? 'Updating...' : 'Creating...'}
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={editingBannerId ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"} />
                                                </svg>
                                                {editingBannerId ? 'Update Banner' : 'Create Banner'}
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        disabled={isFormDisabled}
                                        className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {editingBannerId ? 'Cancel' : 'Reset'}
                                    </button>
                                </div>
                            </form>

                            {/* Info */}
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <p className="text-xs text-blue-800">
                                    <strong>Note:</strong> Upload a banner image (PNG, JPG, GIF up to 10MB). Recommended size: 1600x333px, Minimum: 800x200px.
                                    Each position can only have one banner per type. The banner will be displayed based on the selected type and position order.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* List Tab */}
                    {activeTab === 'list' && (
                        <div className="p-8">
                            {loading && !banners.length ? (
                                <div className="text-center py-12">
                                    <svg className="w-12 h-12 animate-spin mx-auto text-[var(--brand)]" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <p className="mt-4 text-gray-600">Loading banners...</p>
                                </div>
                            ) : banners.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    <h3 className="mt-4 text-lg font-medium text-gray-900">No banners yet</h3>
                                    <p className="mt-2 text-gray-600">Get started by creating your first banner</p>
                                    <button
                                        onClick={() => setActiveTab('upload')}
                                        className="mt-6 bg-[var(--brand)] text-white py-2 px-6 rounded-lg font-medium hover:bg-[var(--brand)]/90 transition-all"
                                    >
                                        Create Banner
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {copies?.sort((a, b) => a.position - b.position).map((banner) => (
                                        <div key={banner.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Banner Image */}
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={banner.url}
                                                        alt={banner.title}
                                                        className="w-full md:w-64 h-32 object-cover rounded-lg"
                                                    />
                                                </div>

                                                {/* Banner Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-semibold text-gray-900 truncate">{banner.title}</h3>
                                                            {banner.description && (
                                                                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{banner.description}</p>
                                                            )}
                                                            <div className="mt-3 flex flex-wrap gap-2">
                                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                    {banner.type === BannerType.TOP ? 'Top' : 'Bottom'} Banner
                                                                </span>
                                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                                    Position: {banner.position}
                                                                </span>
                                                            </div>
                                                            <a
                                                                href={banner.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="mt-2 inline-flex items-center text-sm text-[var(--brand)] hover:underline"
                                                            >
                                                                {banner.link}
                                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                            </a>
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleEdit(banner)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                title="Edit banner"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(banner.id)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Delete banner"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}