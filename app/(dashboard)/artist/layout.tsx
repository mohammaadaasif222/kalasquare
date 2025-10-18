// app/(dashboard)/artist/layout.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { logoutUser } from '@/lib/redux/features/auth/authSlice';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function ArtistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push('/login');
  };

  const artistMenuItems = [
    { name: 'Dashboard', href: '/artist', icon: '🎨', gradient: 'from-purple-500 to-pink-500' },
    { name: 'My Portfolio', href: '/artist/portfolio', icon: '🖼️', gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Projects', href: '/artist/projects', icon: '📁', gradient: 'from-green-500 to-emerald-500' },
    { name: 'Gallery', href: '/artist/gallery', icon: '🎭', gradient: 'from-orange-500 to-red-500' },
    { name: 'Collaborations', href: '/artist/collaborations', icon: '🤝', gradient: 'from-indigo-500 to-purple-500' },
    { name: 'Analytics', href: '/artist/analytics', icon: '📊', gradient: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <ProtectedRoute allowedUserTypes={['artist']}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        {/* Top Navigation Bar */}
        <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg hover:bg-purple-100 transition"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Artist Studio
                  </h1>
                  <p className="text-sm text-gray-600">Welcome back, {user?.name}! 🎨</p>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="hidden md:block">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="px-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition w-64"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-full hover:bg-purple-100 transition">
                  <span className="text-2xl">🔔</span>
                  <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    {/* {user?.name.charAt(0).toUpperCase()} */}
                  </div>
                  <span className="hidden md:block font-medium">{user?.email}</span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex">
          {/* Sidebar */}
          <aside
            className={`${
              isSidebarOpen ? 'w-72' : 'w-20'
            } bg-white/90 backdrop-blur-md shadow-2xl transition-all duration-300 min-h-[calc(100vh-80px)] sticky top-20`}
          >
            <div className="p-4 space-y-2">
              {artistMenuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                      isActive
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105`
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    {isSidebarOpen && (
                      <div className="flex-1">
                        <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}>
                          {item.name}
                        </span>
                      </div>
                    )}
                    {isSidebarOpen && isActive && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Sidebar Footer */}
            {isSidebarOpen && (
              <div className="absolute bottom-8 left-0 right-0 px-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 text-white">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                      ⭐
                    </div>
                    <div>
                      <p className="font-bold">Pro Artist</p>
                      <p className="text-xs opacity-80">Premium Member</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Profile Completion</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <Link href="/artist" className="hover:text-purple-600">Home</Link>
                <span>/</span>
                <span className="text-purple-600 font-medium">
                  { 'Dashboard'}
                </span>
              </div>

              {/* Content Card */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8">
                {children}
              </div>
            </div>
          </main>
        </div>

        {/* Quick Actions Floating Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl hover:scale-110 transition-transform flex items-center justify-center text-2xl">
            ➕
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}