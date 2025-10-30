'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AboutSectionProps {
  description: string;
  maxLines?: number;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  description = "Professional services available",
  maxLines = 4
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight);
        const maxHeight = lineHeight * maxLines;
        const actualHeight = textRef.current.scrollHeight;
        setShouldShowButton(actualHeight > maxHeight);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [description, maxLines]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="mb-12" id="About">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">About</h2>
      
      <div className="relative">
        <p
          ref={textRef}
          className={`text-gray-700 leading-relaxed text-sm transition-all duration-300 ease-in-out ${
            !isExpanded ? `line-clamp-${maxLines}` : ''
          }`}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: isExpanded ? 'unset' : maxLines,
            WebkitBoxOrient: 'vertical',
            overflow: isExpanded ? 'visible' : 'hidden',
          }}
        >
          {description}
        </p>
        
        {!isExpanded && shouldShowButton && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {shouldShowButton && (
        <button
          onClick={toggleExpand}
          className="mt-3 text-[var(--brand)] font-semibold hover:opacity-80 transition-opacity flex items-center gap-1 group"
        >
          {isExpanded ? (
            <>
              Show less
              <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </>
          ) : (
            <>
              Read more
              <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </>
          )}
        </button>
      )}
    </section>
  );
};