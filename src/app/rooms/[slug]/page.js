'use client'
// src/app/rooms/[slug]/page.js
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import BookingModal from '../../../components/BookingModal'
import { fetchWithFallback } from '../../../lib/fetchWithFallback'

const DEMO_ROOMS = [
  { 
    _id:'r1', 
    title:'Deluxe Room', 
    slug:'deluxe-room', 
    short:'Cozy room with balcony', 
    images:['/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250910-WA0003.jpg',
        '/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250913-WA0002.jpg',
         '/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250914-WA0005.jpg',
          '/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250913-WA0003.jpg'], 
    pricePerNight:2500, 
    capacity:2, 
    description:'Luxurious deluxe room featuring a comfortable king-size bed, private balcony overlooking the scenic hills, modern amenities, and elegant décor. Perfect for couples seeking a romantic getaway.',
    amenities: ['King Size Bed', 'Private Balcony', 'Mountain View', 'Free WiFi', 'Air Conditioning', 'Mini Bar']
  },
  { 
    _id:'r2', 
    title:'Family Suite', 
    slug:'family-suite', 
    short:'Spacious suite for families', 
    images:['/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250914-WA0010.jpg', 
        '/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250915-WA0007.jpg', 
        '/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250914-WA0001.jpg'], 
    pricePerNight:4200, 
    capacity:4, 
    description:'Generous family suite with two separate bedrooms, a fully equipped kitchenette, living area, and modern amenities. Ideal for families or groups traveling together.',
    amenities: ['Two Bedrooms', 'Kitchenette', 'Living Area', 'Free WiFi', 'Air Conditioning', 'Refrigerator']
  },
  { 
    _id:'r3', 
    title:'Standard Room', 
    slug:'standard-room', 
    short:'Comfortable and affordable', 
    images:['/images/room3.jpg', '/images/room3-2.jpg'], 
    pricePerNight:1800, 
    capacity:2, 
    description:'Clean and comfortable standard room offering essential amenities at an excellent value. Perfect for budget-conscious travelers who don\'t want to compromise on comfort.',
    amenities: ['Queen Size Bed', 'Free WiFi', 'Air Conditioning', 'Work Desk', 'Private Bathroom']
  }
]

export default function RoomDetail() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug
  const [room, setRoom] = useState(null)
  const [open, setOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!slug) return
    ;(async () => {
      const all = await fetchWithFallback('/api/rooms', DEMO_ROOMS)
      const found = (all || DEMO_ROOMS).find(r => r.slug === slug)
      setRoom(found)
    })()
  }, [slug])

  // Auto-slide functionality
  useEffect(() => {
    if (!room?.images || room.images.length <= 1 || !isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => 
        prev === room.images.length - 1 ? 0 : prev + 1
      )
    }, 4000) // Change image every 4 seconds
    
    return () => clearInterval(interval)
  }, [room?.images, isAutoPlaying])

  const goToSlide = (index) => {
    setCurrentImageIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevSlide = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? room.images.length - 1 : prev - 1
    )
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNextSlide = () => {
    setCurrentImageIndex(prev => 
      prev === room.images.length - 1 ? 0 : prev + 1
    )
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  if (!room) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-80 rounded-2xl mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-gray-200 rounded-lg w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="bg-gray-200 h-64 rounded-2xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <button onClick={() => router.push('/')} className="hover:text-sky-600 transition-colors">
              Home
            </button>
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <button onClick={() => router.push('/rooms')} className="hover:text-sky-600 transition-colors">
              Rooms
            </button>
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-900 font-medium">{room.title}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Carousel */}
          <div className="relative group">
            <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Main Image */}
              <div 
                className="flex transition-transform duration-500 ease-out h-full"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {room.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img || '/images/placeholder.jpg'}
                    alt={`${room.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover flex-shrink-0"
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              {room.images?.length > 1 && (
                <>
                  <button
                    onClick={goToPrevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={goToNextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Auto-play indicator */}
              {isAutoPlaying && room.images?.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                  Auto-playing
                </div>
              )}

              {/* Image counter */}
              {room.images?.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {currentImageIndex + 1} / {room.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {room.images?.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
                {room.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === index 
                        ? 'border-sky-500 ring-2 ring-sky-200 shadow-lg transform scale-105' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Dots Indicator */}
            {room.images?.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {room.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentImageIndex === index 
                        ? 'bg-sky-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Room Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{room.title}</h1>
              <p className="text-xl text-gray-600">{room.short}</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">{room.description}</p>
            </div>

            {/* Amenities */}
            {room.amenities && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
              {/* Pricing Header */}
              <div className="border-b border-gray-100 pb-6 mb-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      ₹{room.pricePerNight.toLocaleString()}
                      <span className="text-lg font-normal text-gray-500 ml-1">/night</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Capacity</div>
                    <div className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      {room.capacity} {room.capacity === 1 ? 'Guest' : 'Guests'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Form Preview */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <label className="block text-xs font-medium text-gray-500 mb-1">CHECK-IN</label>
                    <input 
                      type="date" 
                      className="w-full text-sm text-gray-900 bg-transparent border-none p-0 focus:ring-0" 
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <label className="block text-xs font-medium text-gray-500 mb-1">CHECK-OUT</label>
                    <input 
                      type="date" 
                      className="w-full text-sm text-gray-900 bg-transparent border-none p-0 focus:ring-0" 
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <label className="block text-xs font-medium text-gray-500 mb-1">GUESTS</label>
                  <select className="w-full text-sm text-gray-900 bg-transparent border-none p-0 focus:ring-0">
                    {Array.from({ length: room.capacity }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Book Button */}
              <button 
                onClick={() => setOpen(true)} 
                className="w-full bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Reserve Now
              </button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                You wont be charged yet
              </p>

              {/* Quick Info */}
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Free cancellation for 48 hours
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Instant booking confirmation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {open && (
        <BookingModal 
          room={room} 
          onClose={() => setOpen(false)} 
          onBooked={(booking) => { 
            alert('Booking confirmed! (Demo mode)'); 
            setOpen(false); 
          }} 
        />
      )}
    </div>
  )
}