import React from 'react';
import type { Slide } from '../types';
import { SlideType } from '../types';
import { ImageIcon, VideoIcon } from './icons';

interface SidebarItemProps {
  slide: Slide;
  isActive: boolean;
  onClick: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ slide, isActive, onClick }) => {
  const baseClasses = "group flex items-center w-full p-2 rounded-lg text-left transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500";
  const activeClasses = "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg border-l-4 border-indigo-400 pl-1";
  const inactiveClasses = "bg-gray-700/50 hover:bg-gray-700/80 hover:text-white";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      aria-current={isActive ? "true" : "false"}
    >
      <div className="w-14 h-9 bg-gray-600 rounded-md overflow-hidden shrink-0 mr-3 border-2 border-transparent group-hover:border-indigo-400 transition-all">
        {slide.type === SlideType.IMAGE ? (
           <img src={slide.src} alt={slide.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
             <VideoIcon className="w-6 h-6 text-gray-400 transition-colors duration-300 group-hover:text-indigo-300" />
          </div>
        )}
      </div>
      <span className="flex-1 text-sm font-medium truncate capitalize">{slide.name}</span>
      <div className="ml-4 shrink-0">
        {slide.type === SlideType.IMAGE ? (
          <ImageIcon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-indigo-200' : 'text-gray-400 group-hover:text-indigo-300'}`} />
        ) : (
          <VideoIcon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-indigo-200' : 'text-gray-400 group-hover:text-indigo-300'}`} />
        )}
      </div>
    </button>
  );
};