import { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle, User, Mail, Shield, Calendar, Phone } from 'lucide-react';
import { useAuth } from '@/hooks/use-user';

export default function UserSettingsPage() {
    const { updatePasw, loading: isLoading, error, message, user } = useAuth();

    console.log(user)
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [validationError, setValidationError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    // Check if user logged in via Google (has google_id)
    const isGoogleAuth = user?.google_id !== null && user?.google_id !== undefined;

    useEffect(() => {
        if (message) {
            setShowSuccess(true);
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const validatePassword = (password: string): boolean => {
        if (password.length < 8) {
            setValidationError('Password must be at least 8 characters long');
            return false;
        }
        if (!/(?=.*[a-z])/.test(password)) {
            setValidationError('Password must contain at least one lowercase letter');
            return false;
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            setValidationError('Password must contain at least one uppercase letter');
            return false;
        }
        if (!/(?=.*\d)/.test(password)) {
            setValidationError('Password must contain at least one number');
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        setValidationError('');

        // For non-Google auth users, current password is required
        if (!isGoogleAuth && !formData.currentPassword) {
            setValidationError('Current password is required');
            return;
        }

        if (!validatePassword(formData.newPassword)) {
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setValidationError('New passwords do not match');
            return;
        }
        if (!user) {
            return
        }

        // Pass current password only if user is not using Google auth
        if (isGoogleAuth) {
            await updatePasw(user.id, formData.newPassword);
        } else {
            await updatePasw(user.id, formData.newPassword, formData.currentPassword);
        }
    };

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleReset = () => {
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setValidationError('');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-600">Loading user data...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
                    <p className="text-gray-600 mt-2">Manage your account settings and security preferences</p>
                </div>

                <div className="space-y-6">
                    {/* Profile Information Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-gray-500" />
                                    <span>{user.email}</span>
                                    {user.email_verified && (
                                        <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                            Verified
                                        </span>
                                    )}
                                </div>
                            </div>

                            {user.phone && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-500" />
                                        <span>{user.phone}</span>
                                        {user.phone_verified && (
                                            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                                <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 flex items-center gap-2">
                                    <span className="capitalize">{user.user_type}</span>
                                    {user.is_premium && (
                                        <span className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                                            Premium
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Authentication Method</label>
                                <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                                    {isGoogleAuth ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            Google Sign-In
                                        </span>
                                    ) : (
                                        'Email & Password'
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                                <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    {formatDate(user.created_at ?? "")}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Password Update Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Shield className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Update Password</h2>
                                {isGoogleAuth && (
                                    <p className="text-sm text-gray-500 mt-1">Set a password for your Google-authenticated account</p>
                                )}
                            </div>
                        </div>

                        {showSuccess && message && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="text-green-800 text-sm">{message}</p>
                            </div>
                        )}

                        {(error || validationError) && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                <p className="text-red-800 text-sm">{error || validationError}</p>
                            </div>
                        )}

                        <div className="space-y-5">
                            {/* Show current password field only for non-Google auth users */}
                            {!isGoogleAuth && (
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Current Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="currentPassword"
                                            type={showPasswords.current ? 'text' : 'password'}
                                            value={formData.currentPassword}
                                            onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                                            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                                            disabled={isLoading}
                                            placeholder="Enter current password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility('current')}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                            disabled={isLoading}
                                        >
                                            {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                        {isLoading && (
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                                <svg className="animate-spin h-4 w-4 text-blue-600" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="newPassword"
                                        type={showPasswords.new ? 'text' : 'password'}
                                        value={formData.newPassword}
                                        onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                                        disabled={isLoading}
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('new')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                        disabled={isLoading}
                                    >
                                        {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                    {isLoading && (
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                            <svg className="animate-spin h-4 w-4 text-blue-600" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showPasswords.confirm ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:text-gray-500"
                                        disabled={isLoading}
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility('confirm')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                        disabled={isLoading}
                                    >
                                        {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                    {isLoading && (
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                            <svg className="animate-spin h-4 w-4 text-blue-600" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li className="flex items-start gap-2">
                                        <span className="text-gray-400 mt-0.5">•</span>
                                        <span>At least 8 characters long</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-gray-400 mt-0.5">•</span>
                                        <span>Contains uppercase and lowercase letters</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-gray-400 mt-0.5">•</span>
                                        <span>Contains at least one number</span>
                                    </li>
                                    {!isGoogleAuth && (
                                        <li className="flex items-start gap-2">
                                            <span className="text-gray-400 mt-0.5">•</span>
                                            <span>Different from current password</span>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    disabled={isLoading}
                                    className="px-6 py-3 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-medium border border-gray-300 rounded-lg transition duration-200"
                                >
                                    Reset
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={
                                        isLoading ||
                                        !formData.newPassword ||
                                        !formData.confirmPassword ||
                                        (!isGoogleAuth && !formData.currentPassword)
                                    }
                                    className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Updating Password...
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-4 h-4" />
                                            Update Password
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}