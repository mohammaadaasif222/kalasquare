'use client';

import React from 'react';
import {
  Instagram,
  Youtube,
  Music2,
  Facebook,
  Twitter,
  Linkedin,
  Globe,
} from 'lucide-react';

interface SocialAccount {
  id: string;
  talent_profile_id: string;
  platform: string;
  handle: string;
  profile_url: string;
  followers_count: number;
  engagement_rate: string;
  is_verified: boolean;
  is_primary: boolean;
  last_updated: string;
}

const platformIcons = {
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Music2,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  spotify: Music2,
  other: Globe,
};

const platformColors = {
  instagram:
    'hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-500',
  youtube: 'hover:bg-red-600',
  tiktok: 'hover:bg-black',
  facebook: 'hover:bg-blue-600',
  twitter: 'hover:bg-sky-500',
  linkedin: 'hover:bg-blue-700',
  spotify: 'hover:bg-green-600',
  other: 'hover:bg-gray-600',
};

interface Props {
  socialAccounts: SocialAccount[];
}

export default function SocialAccountsDisplay({ socialAccounts }: Props) {
  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toString();
  };

  const getTooltipContent = (account: SocialAccount): string => {
    return `@${account.handle}\nFollowers: ${formatNumber(
      account.followers_count
    )}\nEngagement: ${account.engagement_rate}%${
      account.is_verified ? '\n✓ Verified' : ''
    }`;
  };

  return (
    <div>
      <div className="flex justify-start gap-4">
        {socialAccounts.map((account) => {
          const Icon =
            platformIcons[
              account.platform as keyof typeof platformIcons
            ] || Globe;
          const colorClass =
            platformColors[
              account.platform as keyof typeof platformColors
            ] || platformColors.other;

          return (
            <a
              key={account.id}
              href={account.profile_url}
              target="_blank"
              rel="noopener noreferrer"
              title={getTooltipContent(account)}
              className={`relative group flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 transition-all duration-300 ease-in-out hover:scale-110 hover:text-white ${colorClass} hover:shadow-xl`}
            >
              <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />

              {account.is_verified && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
