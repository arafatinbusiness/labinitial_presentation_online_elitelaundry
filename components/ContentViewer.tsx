import React, { useRef, useEffect, useState } from 'react';
import type { Slide } from '../types';
import { SlideType } from '../types';

interface ContentViewerProps {
  slide: Slide;
}

const ImageLoader: React.FC<{ slide: Slide }> = ({ slide }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false); // Reset loaded state on slide change
  }, [slide.src]);

  return (
    <div className="relative w-full h-full">
      {/* Placeholder Image */}
      <img
        src={slide.placeholderSrc}
        alt={`${slide.name} placeholder`}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{ filter: 'blur(20px)' }}
      />
      {/* Full Resolution Image */}
      <img
        src={slide.src}
        alt={slide.name}
        onLoad={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};


export const ContentViewer: React.FC<ContentViewerProps> = ({ slide }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Video slides are zoomed by default
  const [isZoomed, setIsZoomed] = useState(slide.type === SlideType.VIDEO);

  useEffect(() => {
    // Reset zoom state when slide changes
    setIsZoomed(slide.type === SlideType.VIDEO);
  }, [slide.id, slide.type]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with video controls
      const activeElement = document.activeElement;
      if (activeElement && activeElement.tagName === 'VIDEO') return;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        if (!videoRef.current) return;
        e.preventDefault();
        const seekTime = 5; // seek 5 seconds
        if (e.key === 'ArrowLeft') {
          videoRef.current.currentTime -= seekTime;
        } else {
          videoRef.current.currentTime += seekTime;
        }
      }

      // Toggle zoom with 'z' key for video slides
      if (e.key === 'z' || e.key === 'Z') {
        if (slide.type === SlideType.VIDEO) {
          e.preventDefault();
          setIsZoomed(prev => !prev);
        }
      }

      // Exit zoom with Escape key
      if (e.key === 'Escape' && isZoomed) {
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [slide.type, slide.id, isZoomed]);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <main className="flex-1 flex items-center justify-center p-2 md:p-4 overflow-hidden">
      <div 
        key={slide.id} 
        className="w-full h-full max-w-7xl max-h-full flex flex-col items-center justify-center content-animate"
      >
        <div className={`w-full h-full flex items-center justify-center rounded-lg shadow-2xl shadow-black/50 overflow-hidden ${isZoomed ? 'fixed inset-0 z-50 bg-black' : ''}`}>
          {slide.type === SlideType.VIDEO ? (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                src={slide.src}
                controls
                autoPlay
                muted
                loop
                className={`w-full h-full ${isZoomed ? 'object-cover scale-125' : 'object-contain'} outline-none focus:ring-4 ring-indigo-500 ring-offset-2 ring-offset-gray-900 transition-all duration-300`}
                style={isZoomed ? { transform: 'scale(1.3)' } : {}}
              >
                Your browser does not support the video tag.
              </video>
              
              {/* Zoom controls - only for video */}
              {slide.type === SlideType.VIDEO && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={toggleZoom}
                    className="bg-gray-800/80 hover:bg-gray-700/90 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm border border-gray-700/50"
                    title={isZoomed ? "Exit zoom (Z or Esc)" : "Normal view (Z)"}
                  >
                    {isZoomed ? 'Normal View' : 'Zoom Video'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <ImageLoader slide={slide} />
          )}
        </div>
        
        {/* Slide name - hide when zoomed */}
        {!isZoomed && (
          <h2 className="mt-4 text-lg font-semibold text-gray-300 capitalize bg-gray-800/50 px-3 py-1.5 rounded-lg">
            {slide.name}
            {slide.type === SlideType.VIDEO && (
              <span className="ml-2 text-sm text-gray-400">• Press Z to toggle zoom</span>
            )}
          </h2>
        )}
      </div>
    </main>
  );
};
