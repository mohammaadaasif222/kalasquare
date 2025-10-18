// app/providers.tsx
'use client';

import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/lib/redux/store';
import { rehydrateAuth } from '@/lib/redux/features/auth/authSlice';

export default function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();

    // Rehydrate auth state from localStorage on initial load
    if (typeof window !== 'undefined') {
      storeRef.current.dispatch(rehydrateAuth());
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}