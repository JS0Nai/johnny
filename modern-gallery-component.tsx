import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Note: This component uses Framer Motion for animations
// In your actual implementation, you might need to adapt animations to your setup

const ModernGallerySection = ({ images }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid, masonry, slider, infinite
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Sample categories - replace with your actual categories
  const categories = ['all', 'ai-art', 'photography', 'design', 'creative'];
  
  // Sample images structure
  const sampleImages = [
    {
      id: 1,
      src: 'mouthy',
      category: 'ai-art',
      title: 'Mouthy',
      description: 'AI-generated portrait exploring expression',
      tags: ['portrait', 'ai', 'surreal'],
      gridSize: 'large' // large, medium, small for masonry
    },
    // Add more images with metadata
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images || sampleImages 
    : (images || sampleImages).filter(img => img.category === selectedCategory);

  // View Mode Components
  const GridView = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {filteredImages.map((image, index) => (
        <motion.div
          key={image.id}
          layout
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="relative group cursor-pointer overflow-hidden rounded-lg"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => setSelectedImage(image)}
        >
          <div className="aspect-square relative">
            <img
              src={`/media/${image.src}.png`}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Hover Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
            >
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-medium mb-1">{image.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-2">{image.description}</p>
                <div className="flex gap-2 mt-2">
                  {image.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 bg-white/20 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Interactive Elements */}
            {hoveredIndex === index && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 flex gap-2"
              >
                <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const MasonryView = () => (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
      {filteredImages.map((image, index) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className={`break-inside-avoid mb-4 relative group cursor-pointer overflow-hidden rounded-lg ${
            image.gridSize === 'large' ? 'row-span-2' : ''
          }`}
          onClick={() => setSelectedImage(image)}
        >
          <img
            src={`/media/${image.src}.png`}
            alt={image.title}
            className="w-full h-auto transition-all duration-500 group-hover:brightness-110"
          />
          
          {/* Distortion Effect on Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/20 mix-blend-overlay"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const InfiniteScrollView = () => {
    return (
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          {/* Column 1 - Scrolls Up */}
          <div className="absolute left-0 w-1/3 animate-scroll-up">
            <div className="space-y-4">
              {[...filteredImages, ...filteredImages].map((image, index) => (
                <div key={`col1-${index}`} className="rounded-lg overflow-hidden">
                  <img src={`/media/${image.src}.png`} alt={image.title} className="w-full" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 2 - Scrolls Down */}
          <div className="absolute left-1/3 w-1/3 animate-scroll-down">
            <div className="space-y-4">
              {[...filteredImages, ...filteredImages].map((image, index) => (
                <div key={`col2-${index}`} className="rounded-lg overflow-hidden">
                  <img src={`/media/${image.src}.png`} alt={image.title} className="w-full" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Column 3 - Scrolls Up */}
          <div className="absolute left-2/3 w-1/3 animate-scroll-up">
            <div className="space-y-4">
              {[...filteredImages, ...filteredImages].map((image, index) => (
                <div key={`col3-${index}`} className="rounded-lg overflow-hidden">
                  <img src={`/media/${image.src}.png`} alt={image.title} className="w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with View Toggle */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-5xl lg:text-7xl font-extralight text-white mb-4">
              <span className="text-orange-200">Creative</span> Gallery
            </h2>
            <p className="text-gray-400 text-lg">
              Explore my collection of AI art, photography, and creative designs
            </p>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex gap-2 mt-6 lg:mt-0">
            {['grid', 'masonry', 'infinite'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  viewMode === mode 
                    ? 'bg-orange-200 text-gray-900' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center lg:justify-start">
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-200 to-pink-200 text-gray-900'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm'
              }`}
            >
              {category === 'all' ? 'All Works' : category.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </motion.button>
          ))}
        </div>

        {/* Gallery View */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' && <GridView />}
          {viewMode === 'masonry' && <MasonryView />}
          {viewMode === 'infinite' && <InfiniteScrollView />}
        </AnimatePresence>

        {/* Load More for Grid/Masonry */}
        {(viewMode === 'grid' || viewMode === 'masonry') && (
          <div className="text-center mt-12">
            <button className="group inline-flex items-center gap-2 text-white text-lg border-b-2 border-orange-200 pb-1 hover:border-white transition-colors">
              Load More
              <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={`/media/${selectedImage.src}.png`}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        
        .animate-scroll-up {
          animation: scroll-up 30s linear infinite;
        }
        
        .animate-scroll-down {
          animation: scroll-down 30s linear infinite;
        }
        
        .animate-scroll-up:hover,
        .animate-scroll-down:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ModernGallerySection;