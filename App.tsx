import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentViewer } from './components/ContentViewer';
import { SLIDES } from './constants';
import type { Slide } from './types';
import { SlideType } from './types';

// Preloader function
const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

const App: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<Slide>(SLIDES[0]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with video controls
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeElement = document.activeElement;
        if(activeElement && activeElement.tagName === 'VIDEO') return;
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIndex = SLIDES.findIndex(s => s.id === activeSlide.id);
        let nextIndex;
        if (e.key === 'ArrowUp') {
          nextIndex = (currentIndex - 1 + SLIDES.length) % SLIDES.length;
        } else { // ArrowDown
          nextIndex = (currentIndex + 1) % SLIDES.length;
        }
        setActiveSlide(SLIDES[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSlide]);

  // Preloading effect
  useEffect(() => {
    const currentIndex = SLIDES.findIndex(s => s.id === activeSlide.id);
    
    // Preload next slide
    const nextIndex = (currentIndex + 1) % SLIDES.length;
    const nextSlide = SLIDES[nextIndex];
    if (nextSlide.type === SlideType.IMAGE) {
      preloadImage(nextSlide.src);
    }
    
    // Preload previous slide
    const prevIndex = (currentIndex - 1 + SLIDES.length) % SLIDES.length;
    const prevSlide = SLIDES[prevIndex];
    if (prevSlide.type === SlideType.IMAGE) {
      preloadImage(prevSlide.src);
    }

  }, [activeSlide]);


  return (
    <div className="flex flex-col md:flex-row h-screen font-sans bg-gray-900/50 text-gray-200">
      <Sidebar 
        slides={SLIDES}
        activeSlide={activeSlide}
        onSelectSlide={setActiveSlide}
      />
      <ContentViewer slide={activeSlide} />
    </div>
  );
};

export default App;