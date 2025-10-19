// hooks/useGoogleAuth.ts
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { googleLogin } from '@/lib/redux/features/auth/authSlice';
import { updateUser, clearUserError, clearUserSuccess } from '@/lib/redux/features/user/userSlice';
import { DASHBOARD_ROUTES } from '@/lib/utils/constants';

interface GoogleResponse {
  credential: string;
}

type UserRole = 'artist' | 'influencer' | 'brand' | 'agency' | 'venue' |'user';

interface UseGoogleAuthProps {
  redirect?: string | null;
  clientId: string;
}

interface ProfileData {
  phone: string;
  user_type: UserRole;
}

export const useGoogleAuth = ({ redirect, clientId }: UseGoogleAuthProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Redux state
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading, success, error } = useAppSelector((state) => state.users);
  
  // Local state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

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
      script.onload = () => setGoogleLoaded(true);
      script.onerror = () => {
        setMessage('Failed to load Google Sign-In. Please check your internet connection.');
      };
      document.head.appendChild(script);
    };

    loadGoogleScript();

    return () => {
      const script = document.getElementById('google-script');
      if (script) script.remove();
    };
  }, []);

  // Handle Google response
  const handleGoogleResponse = useCallback(async (response: GoogleResponse) => {
    setLoading(true);
    setMessage('');

    try {
      await dispatch(googleLogin({ token: response.credential })).unwrap();
      console.log('Login successful');
    } catch (err: any) {
      const errorMessage = err?.message || err || 'Authentication failed';
      setMessage(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // Initialize Google Sign-In
  useEffect(() => {
    if (googleLoaded && window.google) {
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
      } catch (err) {
        console.error('Google Sign-In initialization error:', err);
        setMessage('Failed to initialize Google Sign-In. Please refresh the page.');
      }
    }
  }, [googleLoaded, clientId, handleGoogleResponse]);

  // Check if profile completion is needed
  useEffect(() => {
    if (user) {
      if (user.user_type === 'user') {
        setShowProfileModal(true);
      } else if (user.user_type && user.user_type !== 'user') {
        const targetRoute = redirect || DASHBOARD_ROUTES[user.user_type as UserRole] || '/dashboard';
        router.push(targetRoute);
      }
    }
  }, [user, redirect, router]);

  // Handle profile submission
  const handleProfileSubmit = useCallback(async (profileData: ProfileData): Promise<{ success: boolean; error?: string }> => {
    if (!user?.id) {
      return { success: false, error: 'User not found' };
    }

    // Clear previous messages
    dispatch(clearUserError());
    dispatch(clearUserSuccess());

    try {
      await dispatch(
        updateUser({
          id: String(user.id),
          data: {
            phone: profileData.phone,
            user_type: profileData.user_type,
          },
        })
      ).unwrap();

      // On success
      setShowProfileModal(false);
      const targetRoute = redirect || DASHBOARD_ROUTES[profileData.user_type] || '/dashboard';
      router.push(targetRoute);

      return { success: true };
    } catch (err: any) {
      const errorMessage = err?.message || err || 'Failed to update profile';
      return { success: false, error: errorMessage };
    }
  }, [user, dispatch, redirect, router]);

  // Render Google button
  const renderGoogleButton = useCallback((elementId: string) => {
    if (googleLoaded && window.google) {
      const buttonElement = document.getElementById(elementId);
      if (buttonElement && !buttonElement.hasChildNodes()) {
        window.google.accounts.id.renderButton(buttonElement, {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          width: 300,
          logo_alignment: 'left',
        });
      }
    }
  }, [googleLoaded]);

  // Logout
  const handleLogout = useCallback(() => {
    setMessage('');
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  }, []);

  // Clear messages
  const clearMessage = useCallback(() => {
    setMessage('');
    dispatch(clearUserError());
    dispatch(clearUserSuccess());
  }, [dispatch]);

  return {
    // State
    user,
    loading: loading || isLoading,
    message: message || error || success || '',
    googleLoaded,
    showProfileModal,
    
    // Actions
    handleProfileSubmit,
    renderGoogleButton,
    handleLogout,
    clearMessage,
    setShowProfileModal,
  };
};