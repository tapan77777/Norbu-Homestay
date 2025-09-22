'use client'
import { Camera, ChevronLeft, ChevronRight, Eye, Grid, Grid3X3, Heart, Home, MapPin, Mountain, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const ALL_IMAGES = [
  // Homestay interiors / rooms
  { id: 'h1', src: '/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250915-WA0006.jpg', alt: 'Deluxe room with mountain view', type: 'homestay', featured: true, category: 'Rooms' },
  { id: 'h2', src: '/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250915-WA0009.jpg', alt: 'Cozy balcony with sunrise view', type: 'homestay', featured: false, category: 'Rooms' },
  { id: 'h3', src: '/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250914-WA0000.jpg', alt: 'Spacious family suite living area', type: 'homestay', featured: true, category: 'Rooms' },
  { id: 'h4', src: '/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250915-WA0006.jpg', alt: 'Comfortable standard room', type: 'homestay', featured: false, category: 'Rooms' },
  { id: 'h5', src: '/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250922-WA0006.jpg', alt: 'Modern homestay kitchen', type: 'homestay', featured: false, category: 'Amenities' },
  { id: 'h6', src: '/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250922-WA0008.jpg', alt: 'Elegant bathroom with bathtub', type: 'homestay', featured: false, category: 'Amenities' },

  // Property exteriors & surroundings
  { id: 'x1', src: '/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250914-WA0002.jpg', alt: 'Homestay exterior at golden hour', type: 'place', featured: true, category: 'Property' },
  { id: 'x2', src: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=800&h=600&fit=crop', alt: 'Beautiful garden and outdoor seating', type: 'place', featured: true, category: 'Property' },
  { id: 'x3', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', alt: 'Breathtaking mountain view from terrace', type: 'place', featured: true, category: 'Views' },
  { id: 'x4', src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', alt: 'Forest pathway near homestay', type: 'place', featured: false, category: 'Surroundings' },

  // Nearby attractions
  { id: 'a1', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', alt: 'Stunning local waterfall', type: 'attraction', featured: true, category: 'Attractions' },
  { id: 'a2', src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop', alt: 'Vibrant traditional market', type: 'attraction', featured: false, category: 'Attractions' },
  { id: 'a3', src: 'https://images.unsplash.com/photo-1464822759844-d150b9df1e8f?w=800&h=600&fit=crop', alt: 'Panoramic scenic viewpoint', type: 'attraction', featured: true, category: 'Attractions' },
  { id: 'a4', src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop', alt: 'Ancient temple nearby', type: 'attraction', featured: false, category: 'Attractions' },
  { id: 'a5', src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop', alt: 'Local hiking trail', type: 'attraction', featured: false, category: 'Activities' }
];

const CATEGORIES = [
  { id: 'all', label: 'All Photos', icon: Grid, count: ALL_IMAGES.length },
  { id: 'featured', label: 'Featured', icon: Heart, count: ALL_IMAGES.filter(img => img.featured).length },
  { id: 'homestay', label: 'Homestay', icon: Home, count: ALL_IMAGES.filter(img => img.type === 'homestay').length },
  { id: 'place', label: 'Property', icon: Mountain, count: ALL_IMAGES.filter(img => img.type === 'place').length },
  { id: 'attraction', label: 'Attractions', icon: MapPin, count: ALL_IMAGES.filter(img => img.type === 'attraction').length }
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'masonry'
  const [searchQuery, setSearchQuery] = useState('');
  const [likedImages, setLikedImages] = useState(new Set());

  // Filter images based on active filter and search
  const filteredImages = ALL_IMAGES.filter(img => {
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'featured' && img.featured) ||
                         img.type === activeFilter;
    const matchesSearch = img.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         img.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredImages = ALL_IMAGES.filter(img => img.featured);

  function openLightbox(index) {
    const imageIndex = ALL_IMAGES.findIndex(img => img.id === filteredImages[index].id);
    setLightboxIndex(imageIndex);
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }

  function prev() {
    setLightboxIndex(i => (i === 0 ? ALL_IMAGES.length - 1 : i - 1));
  }

  function next() {
    setLightboxIndex(i => (i === ALL_IMAGES.length - 1 ? 0 : i + 1));
  }

  function toggleLike(imageId) {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  }

  // Keyboard navigation
  useEffect(() => {
    function handleKeyPress(e) {
      if (lightboxIndex !== null) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      }
    }

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Camera className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Our Gallery
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Discover the beauty of our homestay through stunning visuals of rooms, surroundings, and nearby attractions
          </p>
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>{ALL_IMAGES.filter(img => img.type === 'homestay').length} Interior Photos</span>
            </div>
            <div className="flex items-center gap-2">
              <Mountain className="w-4 h-4" />
              <span>{ALL_IMAGES.filter(img => img.type === 'place').length} Property Views</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{ALL_IMAGES.filter(img => img.type === 'attraction').length} Local Attractions</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Gallery */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">✨ Featured Highlights</h2>
            <p className="text-lg text-gray-600">Our most captivating views and spaces</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredImages.slice(0, 6).map((image, idx) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                }}
                onClick={() => {
                  const globalIndex = ALL_IMAGES.findIndex(img => img.id === image.id);
                  setLightboxIndex(globalIndex);
                  document.body.style.overflow = 'hidden';
                }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                      <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                        {image.category}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold">{image.alt}</h3>
                  </div>
                </div>

                {/* Like button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(image.id);
                  }}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                >
                  <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? 'text-red-500 fill-current' : 'text-white'}`} />
                </button>

                {/* View icon */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filters and Search */}
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'masonry' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    activeFilter === category.id
                      ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeFilter === category.id ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Gallery */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredImages.length} {filteredImages.length === 1 ? 'Photo' : 'Photos'}
              {activeFilter !== 'all' && (
                <span className="text-blue-600 ml-2">
                  in {CATEGORIES.find(c => c.id === activeFilter)?.label}
                </span>
              )}
            </h2>
          </div>

          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500">No photos found matching your criteria</p>
            </div>
          ) : (
            <div className={`grid gap-4 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {filteredImages.map((image, idx) => (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                    viewMode === 'masonry' && idx % 3 === 1 ? 'sm:row-span-2' : ''
                  }`}
                  style={{
                    animation: `fadeIn 0.4s ease-out ${idx * 0.05}s both`
                  }}
                  onClick={() => openLightbox(idx)}
                >
                  <div className={`overflow-hidden ${viewMode === 'masonry' && idx % 3 === 1 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-white text-sm font-medium">{image.alt}</div>
                      <div className="text-white/70 text-xs">{image.category}</div>
                    </div>
                  </div>

                  {/* Like button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(image.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/30 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <Heart className={`w-4 h-4 ${likedImages.has(image.id) ? 'text-red-500 fill-current' : 'text-white'}`} />
                  </button>

                  {/* Featured badge */}
                  {image.featured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      ★ Featured
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Enhanced Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={ALL_IMAGES}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
          likedImages={likedImages}
          onToggleLike={toggleLike}
        />
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* Enhanced Lightbox Component */
function Lightbox({ images, index, onClose, onPrev, onNext, likedImages, onToggleLike }) {
  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative">
          <img 
            src={img.src} 
            alt={img.alt} 
            className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            style={{
              animation: 'lightboxFadeIn 0.3s ease-out'
            }}
          />
          
          {/* Navigation buttons */}
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors duration-200"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors duration-200"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors duration-200"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Like button */}
          <button
            onClick={() => onToggleLike(img.id)}
            className="absolute top-4 left-4 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <Heart className={`w-5 h-5 ${likedImages.has(img.id) ? 'text-red-500 fill-current' : 'text-white'}`} />
          </button>
        </div>

        {/* Caption and info */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-white text-lg font-semibold mb-1">{img.alt}</h3>
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <span className="bg-white/20 px-2 py-1 rounded">{img.category}</span>
                {img.featured && <span className="bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded">★ Featured</span>}
              </div>
            </div>
            <div className="text-white/70 text-sm">
              {index + 1} of {images.length}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes lightboxFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}