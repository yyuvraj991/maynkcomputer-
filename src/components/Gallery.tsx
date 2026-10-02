import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GalleryItem } from '../types';
import { Maximize2, Image as ImageIcon, Plus } from 'lucide-react';

interface GalleryProps {
  onOpenAdminTab?: (tab: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onOpenAdminTab }) => {
  const { gallery, setLightboxIndex, isAdminLoggedIn } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredItems = activeCategory === 'all'
    ? gallery
    : gallery.filter((item) => item.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'lab', label: 'Computer Lab' },
    { id: 'students', label: 'Students' },
    { id: 'training', label: 'Training Sessions' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'events', label: 'Events' },
    { id: 'office', label: 'Office' },
  ];

  return (
    <section id="gallery" className="py-10 sm:py-14 bg-white border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Campus Life & Infrastructure
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Institute Photo Gallery
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Take a visual tour of our modern lab workstations, student batches, certificate award functions, and everyday digital services.
            </p>
          </div>

          {isAdminLoggedIn && onOpenAdminTab && (
            <button
              onClick={() => onOpenAdminTab('gallery')}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Upload Photos
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => {
            // Find global index in original gallery array for lightbox
            const globalIndex = gallery.findIndex((g) => g.id === item.id);

            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(globalIndex !== -1 ? globalIndex : index)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-lg bg-black/40 backdrop-blur-xs text-white">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-white font-bold text-sm leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-slate-300 text-xs line-clamp-1 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="mt-8 text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
            No gallery images found in this category.
          </div>
        )}
      </div>
    </section>
  );
};
