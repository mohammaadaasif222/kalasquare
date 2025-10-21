// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { useGoogleAuth } from '@/hooks/useGoogleAuth';

// const GOOGLE_CLIENT_ID = '122905052571-b8tk36ne8dq8khbr248u19286gls6lsr.apps.googleusercontent.com';

// type UserRole = 'artist' | 'influencer' | 'brand' | 'agency' | 'venue';

// const GoogleAuth: React.FC = () => {
//   const searchParams = useSearchParams();
//   const redirect = searchParams.get('redirect');

//   const {
//     user,
//     loading,
//     message,
//     googleLoaded,
//     showProfileModal,
//     handleProfileSubmit,
//     renderGoogleButton,
//     clearMessage,
//     setShowProfileModal,
//   } = useGoogleAuth({
//     redirect,
//     clientId: GOOGLE_CLIENT_ID,
//   });

//   // Profile form state
//   const [phone, setPhone] = useState('');
//   const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
//   const [profileLoading, setProfileLoading] = useState(false);
//   const [profileError, setProfileError] = useState('');

//   // Render Google button when loaded
//   useEffect(() => {
//     if (googleLoaded && !user) {
//       renderGoogleButton('google-signin-button');
//     }
//   }, [googleLoaded, user, renderGoogleButton]);

//   // Handle profile form submission
//   const onProfileSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation
//     if (!phone.trim()) {
//       setProfileError('Phone number is required');
//       return;
//     }

//     if (!selectedRole) {
//       setProfileError('Please select your role');
//       return;
//     }

//     setProfileLoading(true);
//     setProfileError('');

//     // Call the hook's submit handler
//     const result = await handleProfileSubmit({
//       phone: phone.trim(),
//       user_type: selectedRole,
//     });

//     setProfileLoading(false);

//     if (!result.success) {
//       setProfileError(result.error || 'Failed to update profile');
//     }
//     // If success, the hook will handle navigation and modal closing
//   };

//   // Clear profile error when inputs change
//   useEffect(() => {
//     if (profileError) {
//       setProfileError('');
//     }
//   }, [phone, selectedRole]);

//   return (
//     <div className="w-full max-w-md mx-auto">
//       {!user && (
//         <div className="text-center">
//           {!googleLoaded ? (
//             <div className="flex justify-center items-center mb-4">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
//               <span className="ml-2 text-gray-600">Loading Google Sign-In...</span>
//             </div>
//           ) : (
//             <div id="google-signin-button" className="mb-4 flex justify-center"></div>
//           )}

//           {loading && (
//             <div className="flex justify-center items-center mb-4">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
//               <span className="ml-2 text-gray-600">Processing...</span>
//             </div>
//           )}

//           {message && (
//             <div
//               className={`p-3 rounded text-sm mb-4 ${
//                 message.toLowerCase().includes('success')
//                   ? 'bg-green-100 text-green-700'
//                   : 'bg-red-100 text-red-700'
//               }`}
//             >
//               <div className="flex items-center justify-between">
//                 <span>{message}</span>
//                 <button
//                   onClick={clearMessage}
//                   className="ml-2 text-sm underline hover:no-underline"
//                   type="button"
//                 >
//                   Dismiss
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Profile Completion Modal */}
//       {showProfileModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
//             <h2 className="text-2xl font-bold mb-2 text-gray-800">
//               Complete Your Profile
//             </h2>
//             <p className="text-sm text-gray-600 mb-6">
//               Please provide additional information to get started
//             </p>

//             <form onSubmit={onProfileSubmit}>
//               <div className="mb-4">
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Phone Number <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Enter your phone number"
//                   required
//                   disabled={profileLoading}
//                 />
//               </div>

//               <div className="mb-6">
//                 <label
//                   htmlFor="role"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Who are you? <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   id="role"
//                   value={selectedRole}
//                   onChange={(e) => setSelectedRole(e.target.value as UserRole)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                   disabled={profileLoading}
//                 >
//                   <option value="">Select your role</option>
//                   <option value="artist">Artist</option>
//                   <option value="influencer">Influencer</option>
//                   <option value="brand">Brand</option>
//                   <option value="agency">Agency</option>
//                   <option value="venue">Venue</option>
//                 </select>
//               </div>

//               {profileError && (
//                 <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm border border-red-200">
//                   {profileError}
//                 </div>
//               )}

//               <div className="flex gap-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowProfileModal(false)}
//                   disabled={profileLoading}
//                   className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={profileLoading}
//                   className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
//                 >
//                   {profileLoading ? (
//                     <span className="flex items-center justify-center">
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                       Updating...
//                     </span>
//                   ) : (
//                     'Complete Profile'
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GoogleAuth;



'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

const GOOGLE_CLIENT_ID = '122905052571-b8tk36ne8dq8khbr248u19286gls6lsr.apps.googleusercontent.com';

const GoogleAuth: React.FC = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const {
    user,
    loading,
    message,
    googleLoaded,
    renderGoogleButton,
    clearMessage,
  } = useGoogleAuth({
    redirect,
    clientId: GOOGLE_CLIENT_ID,
  });

  // Render Google button when loaded
  useEffect(() => {
    if (googleLoaded && !user) {
      renderGoogleButton('google-signin-button');
    }
  }, [googleLoaded, user, renderGoogleButton]);

  return (
    <div className="w-full max-w-md mx-auto">
      {!user && (
        <div className="text-center">
          {!googleLoaded ? (
            <div className="flex justify-center items-center mb-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Loading Google Sign-In...</span>
            </div>
          ) : (
            <div id="google-signin-button" className="mb-4 flex justify-center"></div>
          )}

          {loading && (
            <div className="flex justify-center items-center mb-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Processing...</span>
            </div>
          )}

          {message && (
            <div
              className={`p-3 rounded text-sm mb-4 ${message.toLowerCase().includes('success')
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
                }`}
            >
              <div className="flex items-center justify-between">
                <span>{message}</span>
                <button
                  onClick={clearMessage}
                  className="ml-2 text-sm underline hover:no-underline"
                  type="button"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoogleAuth;