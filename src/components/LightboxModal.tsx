import React, { useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from 'lucide-react';

export const LightboxModal: React.FC = () => {
  const { lightboxIndex, setLightboxIndex, gallery } = useApp();

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, [setLightboxIndex]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? gallery.length - 1 : lightboxIndex - 1);
  }, [lightboxIndex, gallery.length, setLightboxIndex]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === gallery.length - 1 ? 0 : lightboxIndex + 1);
  }, [lightboxIndex, gallery.length, setLightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  if (lightboxIndex === null || !gallery[lightboxIndex]) return null;

  const currentItem = gallery[lightboxIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in"
      onClick={handleClose}
    >
      {/* Top action controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
        <div className="text-xs font-semibold text-slate-400">
          Photo {lightboxIndex + 1} of {gallery.length}
        </div>

        <button
          onClick={handleClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Centered Image Container & Caption */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentItem.image}
          alt={currentItem.title}
          className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl"
        />

        <div className="mt-4 text-center max-w-2xl px-4">
          <div className="flex items-center justify-center gap-2 text-xs text-sky-400 font-semibold uppercase tracking-wider mb-1">
            <span>{currentItem.category}</span>
            {currentItem.date && (
              <>
                <span aria-hidden="true">·</span>
                <span>{currentItem.date}</span>
              </>
            )}
          </div>
          <h3 className="text-white font-bold text-base sm:text-lg">
            {currentItem.title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {currentItem.description}
          </p>
        </div>
      </div>
    </div>
  );
};
