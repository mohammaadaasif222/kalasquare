'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { googleLogin, loginUser } from '@/lib/redux/features/auth/authSlice';
import { DASHBOARD_ROUTES } from '@/lib/utils/constants';

interface User {
    id: number;
    google_id: string;
    email: string;
    name: string;
    picture: string;
    created_at: string;
    user_type?: string;
}

interface GoogleResponse {
    credential: string;
}

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: any) => void;
                    renderButton: (element: HTMLElement, config: any) => void;
                    prompt: () => void;
                    disableAutoSelect: () => void;
                };
            };
        };
    }
}

const GOOGLE_CLIENT_ID = '122905052571-b8tk36ne8dq8khbr248u19286gls6lsr.apps.googleusercontent.com';
const BACKEND_URL = 'http://localhost:5000';

type UserRole = 'artist' | 'influencer' | 'brand' | 'agency' | 'venue';

const GoogleAuth: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [googleLoaded, setGoogleLoaded] = useState<boolean>(false);
    const { isAuthenticated, isLoading, error, user } = useAppSelector((state) => state.auth);
    
    // Profile completion modal state
    const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
    const [profileLoading, setProfileLoading] = useState<boolean>(false);
    const [profileError, setProfileError] = useState<string>('');

    // Load Google Sign-In script
    useEffect(() => {
        const loadGoogleScript = () => {
            if (document.getElementById('google-script')) {
                if (window.google) {
                    setGoogleLoaded(true);
                }
                return;
            }

            const script = document.createElement('script');
            script.id = 'google-script';
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = () => {
                setGoogleLoaded(true);
            };
            script.onerror = () => {
                setMessage('Failed to load Google Sign-In. Please check your internet connection.');
            };
            document.head.appendChild(script);
        };

        loadGoogleScript();

        return () => {
            const script = document.getElementById('google-script');
            if (script) {
                script.remove();
            }
        };
    }, []);

    // Initialize Google Sign-In when script is loaded
    useEffect(() => {
        if (googleLoaded && window.google) {
            try {
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: handleGoogleResponse,
                    auto_select: false,
                    cancel_on_tap_outside: true,
                });

                const buttonElement = document.getElementById('google-signin-button');
                if (buttonElement && !buttonElement.hasChildNodes()) {
                    window.google.accounts.id.renderButton(buttonElement, {
                        theme: 'outline',
                        size: 'large',
                        text: 'signin_with',
                        width: 300,
                        logo_alignment: 'left',
                    });
                }
            } catch (error) {
                console.error('Google Sign-In initialization error:', error);
                setMessage('Failed to load Google Sign-In. Please refresh the page.');
            }
        }
    }, [googleLoaded]);

    // Check if profile completion is needed
    useEffect(() => {
        if (user && user.user_type === 'user') {
            setShowProfileModal(true);
        } else if (user && user.user_type && user.user_type !== 'user') {
            // Navigate to dashboard if profile is already complete
            router.push(redirect || DASHBOARD_ROUTES[user.user_type]);
        }
    }, [user, redirect, router]);

    const handleGoogleResponse = async (response: GoogleResponse) => {
        setLoading(true);
        setMessage('');

        try {
            const data = await dispatch(googleLogin({
                token: response.credential,
            }));
            console.log(data);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setMessage('Network error: ' + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!phone.trim()) {
            setProfileError('Phone number is required');
            return;
        }
        
        if (!selectedRole) {
            setProfileError('Please select your role');
            return;
        }

        setProfileLoading(true);
        setProfileError('');

        try {
            // Call your API to update user profile
            const response = await fetch(`${BACKEND_URL}/api/users/complete-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Add authorization header if needed
                    // 'Authorization': `Bearer ${yourAuthToken}`
                },
                body: JSON.stringify({
                    phone,
                    user_type: selectedRole,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setShowProfileModal(false);
                // Navigate to dashboard based on the selected role
                router.push(redirect || DASHBOARD_ROUTES[selectedRole]);
            } else {
                setProfileError(data.error || 'Failed to update profile');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setProfileError('Network error: ' + errorMessage);
        } finally {
            setProfileLoading(false);
        }
    };

    const handleLogout = () => {
        setMessage('');
        if (window.google) {
            window.google.accounts.id.disableAutoSelect();
        }
    };

    return (
        <div>
            {!user && (
                <div className="text-center">
                    {!googleLoaded ? (
                        <div className="flex justify-center items-center mb-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                            <span className="ml-2 text-gray-600">Loading Google Sign-In...</span>
                        </div>
                    ) : (
                        <div id="google-signin-button" className="mb-4"></div>
                    )}

                    {loading && (
                        <div className="flex justify-center items-center mb-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                            <span className="ml-2 text-gray-600">Processing...</span>
                        </div>
                    )}

                    {message && (
                        <div
                            className={`p-3 rounded text-sm mb-4 ${
                                message.includes('Successfully')
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                            }`}
                        >
                            {message}
                        </div>
                    )}
                </div>
            )}

            {/* Profile Completion Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Complete Your Profile</h2>
                        
                        <form onSubmit={handleProfileSubmit}>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                    Who are you?
                                </label>
                                <select
                                    id="role"
                                    value={selectedRole}
                                    onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select your role</option>
                                    <option value="artist">Artist</option>
                                    <option value="influencer">Influencer</option>
                                    <option value="brand">Brand</option>
                                    <option value="agency">Agency</option>
                                    <option value="venue">Venue</option>
                                </select>
                            </div>

                            {profileError && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                                    {profileError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={profileLoading}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                            >
                                {profileLoading ? (
                                    <span className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Updating...
                                    </span>
                                ) : (
                                    'Complete Profile'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoogleAuth;