import React from 'react';
import type { Slide } from '../types';
import { SidebarItem } from './SidebarItem';
import { PresentationIcon } from './icons';

interface SidebarProps {
  slides: Slide[];
  activeSlide: Slide;
  onSelectSlide: (slide: Slide) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ slides, activeSlide, onSelectSlide }) => {
  return (
    <aside className="w-full md:w-64 lg:w-72 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/50 flex flex-col shrink-0">
      <header className="p-4 border-b border-gray-700/50 sticky top-0 bg-gray-800/80 z-10">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <PresentationIcon className="w-8 h-8 text-indigo-400"/>
          Presentation Deck
        </h1>
        <p className="text-sm text-gray-400 mt-1">A showcase of project visuals.</p>
      </header>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {slides.map((slide) => (
            <li key={slide.id}>
              <SidebarItem
                slide={slide}
                isActive={slide.id === activeSlide.id}
                onClick={() => onSelectSlide(slide)}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
