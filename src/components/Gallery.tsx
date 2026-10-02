import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Maximize2, Plus, ArrowRight } from 'lucide-react';

interface GalleryProps {
  onOpenAdminTab?: (tab: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onOpenAdminTab }) => {
  const { gallery, setLightboxIndex, isAdminLoggedIn } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAllMobile, setShowAllMobile] = useState<boolean>(false);

  const filteredItems = activeCategory === 'all'
    ? gallery
    : gallery.filter((item) => item.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'lab', label: 'Computer Lab' },
    { id: 'students', label: 'Students' },
    { id: 'training', label: 'Training' },
    { id: 'certificates', label: 'Certificates' },
  ];

  return (
    <section id="gallery" className="py-8 sm:py-14 bg-white border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Campus & Infrastructure
            </p>
            <h2 className="mt-1 sm:mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Institute Photo Gallery
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-600">
              Lab workstations, student training sessions, and certificate award distributions.
            </p>
          </div>

          {isAdminLoggedIn && onOpenAdminTab && (
            <button
              onClick={() => onOpenAdminTab('gallery')}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Upload Photos
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="mt-5 flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setShowAllMobile(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid (2-columns on mobile, 3-4 on larger screens) */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {filteredItems.map((item, index) => {
            const globalIndex = gallery.findIndex((g) => g.id === item.id);
            const isHiddenOnMobile = !showAllMobile && index >= 4;

            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(globalIndex !== -1 ? globalIndex : index)}
                className={`group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  isHiddenOnMobile ? 'hidden sm:block' : 'block'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-70 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2.5 sm:p-4">
                  <div className="flex justify-end">
                    <span className="p-1.5 rounded-lg bg-black/40 backdrop-blur-xs text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div>
                    <h4 className="text-white font-bold text-xs sm:text-sm leading-snug line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-300 text-[10px] sm:text-xs line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View More Toggle */}
        {filteredItems.length > 4 && (
          <div className="mt-4 text-center sm:hidden">
            {!showAllMobile ? (
              <button
                onClick={() => setShowAllMobile(true)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View More Photos ({filteredItems.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setShowAllMobile(false)}
                className="py-1.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Show Less
              </button>
            )}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="mt-6 text-center py-10 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs sm:text-sm">
            No gallery images found in this category.
          </div>
        )}
      </div>
    </section>
  );
};
