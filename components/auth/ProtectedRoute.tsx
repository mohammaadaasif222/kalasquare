// components/auth/ProtectedRoute.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { fetchCurrentUser } from '@/lib/redux/features/auth/authSlice';
import { UserType } from '@/types/user.types';
import { DASHBOARD_ROUTES } from '@/lib/utils/constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: UserType[];
}

export default function ProtectedRoute({
  children,
  allowedUserTypes,
}: ProtectedRouteProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Only fetch if not authenticated and not already loading
    if (!isAuthenticated && !isLoading && !isInitialized) {
      dispatch(fetchCurrentUser()).then(() => {
        setIsInitialized(true);
      });
    } else if (isAuthenticated) {
      setIsInitialized(true);
    }
  }, [isAuthenticated, isLoading, isInitialized, dispatch]);

  useEffect(() => {
    // Only redirect after initialization is complete
    if (isInitialized && !isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      // If authenticated and user type is restricted
      if (
        user &&
        allowedUserTypes &&
        !allowedUserTypes.includes(user.user_type)
      ) {
        // Redirect to their correct dashboard
        router.push(DASHBOARD_ROUTES[user.user_type]);
      }
    }
  }, [isInitialized, isAuthenticated, isLoading, user, allowedUserTypes, router]);

  // Show loading state only during initial load
  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!isAuthenticated || (allowedUserTypes && user && !allowedUserTypes.includes(user.user_type))) {
    return null;
  }

  return <>{children}</>;
}