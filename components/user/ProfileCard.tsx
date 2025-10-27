'use client'
import { useProfile } from '@/hooks/use-profile';
import { useTalent } from '@/hooks/use-talent';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ProfileCard: React.FC = () => {
  const { profile } = useProfile()
  const { user } = useSelector((state:any) => state.auth)
  const { talent } = useTalent()
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
 
  return (
    <div className="mb-3">
      {/* Profile Image with Progress */}
      <div className="flex flex-col items-center">
        <div className="relative">
          {/* Progress Circle */}
          <svg className="w-20 h-20 transform -rotate-260">
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="#E5E7EB"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="#EF4444"
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 36}`}
              strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.41)}`}
              strokeLinecap="round"
            />
          </svg>

          {/* Profile Avatar */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center">
              <Image src={profile?.profile_image_url ||"/creators/creator-profile-1.jpg"} alt='' width={100} height={100} className='rounded-full' />
            </div>
          </div>
        </div>

        {/* Percentage */}
        <span className="text-red-500 font-semibold text-sm mt-1">41%</span>
      </div>

      {/* Name */}

      <div className='flex flex-col pb-4'>
        <div className="flex items-center justify-center gap-2 ">
          <h2 className="text-md font-bold text-center capitalize text-gray-900">
            {profile?.display_name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <Image
              src="/verifybadge.png"
              alt="Verified Badge"
              width={20}
              height={20}
              className="object-contain"
            />

          </div>
        </div>
        <span className="text-[var(--brand)] m-auto text-xs leading-tight px-3 bg-gray-2  00 rounded-full mb-2">
          {talent?.talent_type || 'Artist'}
        </span>
        <hr></hr>
      </div>




      {/* Missing Items Section */}
      <div className="bg-red-50 rounded-lg p-3 mb-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          What are you missing?
        </h3>

        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <Mail className='w-3 h-3' />
            <span className="text-gray-700 text-xs leading-tight">
              {user?.email}
            </span>
          </li>

          <li className="flex items-start gap-2">
            <Phone className='w-4 h-4' />
            <span className="text-gray-700 text-xs leading-tight">
              Job application updates
            </span>
          </li>

          {/* <li className="flex items-start gap-2">
            <div className="flex-shrink-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <span className="text-gray-700 text-xs leading-tight">
              Direct jobs from recruiters
            </span>
          </li> */}
        </ul>
      </div>

      {/* Complete Profile Button */}
      {/* <button className="w-full  text-gray-700 font-semibold py-2.5 px-4 rounded-full transition-colors duration-200 text-sm">
        Complete profile
      </button> */}
    </div >
  );
};

export default ProfileCard;