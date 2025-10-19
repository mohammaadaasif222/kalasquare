// components/layouts/DashboardSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hooks';
import { UserType } from '@/types/user.types';

const sidebarMenus: Record<UserType, Array<{ name: string; href: string; icon: string }>> = {
  artist: [
    { name: 'Dashboard', href: '/artist', icon: '🎨' },
    { name: 'Profile', href: '/artist/profile', icon: '👤' },
    { name: 'Projects', href: '/artist/projects', icon: '📁' },
    { name: 'Gallery', href: '/artist/gallery', icon: '🖼️' },
  ],
  influencer: [
    { name: 'Dashboard', href: '/influencer', icon: '📊' },
    { name: 'Campaigns', href: '/influencer/campaigns', icon: '📢' },
    { name: 'Analytics', href: '/influencer/analytics', icon: '📈' },
    { name: 'Content', href: '/influencer/content', icon: '📝' },
  ],
  brand: [
    { name: 'Dashboard', href: '/brand', icon: '🏢' },
    { name: 'Campaigns', href: '/brand/campaigns', icon: '🎯' },
    { name: 'Collaborations', href: '/brand/collaborations', icon: '🤝' },
    { name: 'Reports', href: '/brand/reports', icon: '📊' },
  ],
  agency: [
    { name: 'Dashboard', href: '/agency', icon: '🏛️' },
    { name: 'Clients', href: '/agency/clients', icon: '👥' },
    { name: 'Talents', href: '/agency/talents', icon: '⭐' },
    { name: 'Projects', href: '/agency/projects', icon: '💼' },
  ],
  venue: [
    { name: 'Dashboard', href: '/venue', icon: '🏟️' },
    { name: 'Events', href: '/venue/events', icon: '🎉' },
    { name: 'Bookings', href: '/venue/bookings', icon: '📅' },
    { name: 'Calendar', href: '/venue/calendar', icon: '📆' },
  ],
  admin: [
    { name: 'Dashboard', href: '/admin', icon: '⚙️' },
    { name: 'Users', href: '/admin/users', icon: '👥' },
    { name: 'Settings', href: '/admin/settings', icon: '🔧' },
    { name: 'Reports', href: '/admin/reports', icon: '📊' },
  ],
  user: [
    { name: 'Dashboard', href: '/admin', icon: '⚙️' },
    { name: 'profile', href: '/admin/users', icon: '👥' },
    { name: 'Settings', href: '/admin/settings', icon: '🔧' },
    { name: 'Reports', href: '/admin/reports', icon: '📊' },
  ],
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  const menuItems = sidebarMenus[user.user_type] || [];

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="h-full flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)} Portal
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
              {/* {user.name.charAt(0).toUpperCase()} */}
            </div>
            <div>
              {/* <p className="text-sm font-medium text-gray-800">{user.name}</p> */}
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}