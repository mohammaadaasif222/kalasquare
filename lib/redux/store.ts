// lib/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';
import profileReducer from './features/profile/profileSlice';
import talentReducer from './features/talent/talentSlice';
import talentSocialReducer from './features/social/socialSlice'
import worksReducer from './features/works/worksSlice'
import bannerReducer from './features/banners/bannerSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      users: userReducer,
      profile: profileReducer,
      talent: talentReducer,
      socials: talentSocialReducer,
      workSample: worksReducer,
      banners: bannerReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];