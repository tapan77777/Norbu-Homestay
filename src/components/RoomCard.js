// src/components/RoomCard.js
import { useEffect, useState } from 'react'

export default function RoomCard({ room, onView, onBook }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  const images = room.images || ['/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250914-WA0001.jpg']
  const hasMultipleImages = images.length > 1

  // Auto-slide functionality
  useEffect(() => {
    if (!hasMultipleImages || isHovered || !isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => 
        prev === images.length - 1 ? 0 : prev + 1
      )
    }, 3000) // Change image every 3 seconds
    
    return () => clearInterval(interval)
  }, [images.length, isHovered, hasMultipleImages, isAutoPlaying])

  const goToSlide = (index, event) => {
    event.stopPropagation() // Prevent card click
    setCurrentImageIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 8 seconds
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const goToPrevSlide = (event) => {
    event.stopPropagation()
    setCurrentImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    )
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const goToNextSlide = (event) => {
    event.stopPropagation()
    setCurrentImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    )
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Carousel Container */}
      <div className="relative h-48 overflow-hidden">
        {/* Image Slider */}
        <div 
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${room.title} - Image ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
              loading="lazy"
            />
          ))}
        </div>

        {/* Navigation Arrows - Only show on hover and if multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={goToPrevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-10"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-10"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter - Top Right */}
        {hasMultipleImages && (
          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {currentImageIndex + 1}/{images.length}
          </div>
        )}

        {/* Auto-play Indicator - Top Left */}
        {hasMultipleImages && isAutoPlaying && !isHovered && (
          <div className="absolute top-3 left-3 bg-green-500/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm flex items-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1"></div>
            Auto
          </div>
        )}

        {/* Dot Indicators - Bottom Center */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToSlide(index, e)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentImageIndex === index 
                    ? 'bg-white w-6' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Gradient Overlay for better text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="mb-3">
            <img>{room.images}</img>
          <h4 className="font-semibold text-gray-900 text-lg mb-1">{room.title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">{room.short}</p>
        </div>

        {/* Room Features - Optional */}
        {room.capacity && (
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Up to {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
          </div>
        )}

        {/* Pricing and Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <div className="text-lg font-bold text-gray-900">
              ₹{room.pricePerNight?.toLocaleString() || room.pricePerNight}
              <span className="text-sm font-normal text-gray-500 ml-1">/night</span>
            </div>
            {room.originalPrice && room.originalPrice > room.pricePerNight && (
              <div className="text-xs text-gray-400 line-through">
                ₹{room.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation()
                onView(room.slug)
              }}
              className="text-sky-600 hover:text-sky-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-sky-50 transition-colors"
            >
              View Details
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                onBook(room)
              }}
              className="bg-sky-600 hover:bg-sky-700 text-white rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100"></div>
    </div>
  )
}