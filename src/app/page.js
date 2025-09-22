'use client'
import { Calendar, ChevronDown, ChevronRight, Coffee, Eye, Heart, MapPin, Mountain, Play, Share2, Sparkles, Star, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

const DEMO_ROOMS = [
  { _id:'r1', title:'Deluxe Mountain Views', slug:'deluxe-room', short:'Breathtaking Himalayan views with private balcony', images:['/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250915-WA0006.jpg'], pricePerNight:2500, capacity:2, rating: 4.8, amenities: ['Mountain View', 'Balcony', 'WiFi'] },
  { _id:'r2', title:'Family Heritage Suite', slug:'family-suite', short:'Spacious traditional suite perfect for families', images:['/images/room2.jpg'], pricePerNight:4200, capacity:4, rating: 4.9, amenities: ['Family Room', 'Tea Corner', 'Garden View'] },
  { _id:'r3', title:'Cozy Tea Garden Room', slug:'standard-room', short:'Intimate room overlooking tea gardens', images:['/images/Norbu homestay -20250922T165834Z-1-001/Norbu homestay/IMG-20250914-WA0008.jpg'], pricePerNight:1800, capacity:2, rating: 4.7, amenities: ['Tea Garden View', 'Reading Nook', 'WiFi'] }
]

// Hero background images - stunning Darjeeling visuals
const HERO_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    title: 'Misty Mountain Dawn',
    description: 'Golden sunrise over the majestic Himalayas'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    title: 'Tea Garden Serenity',
    description: 'Lush green tea gardens stretching to the horizon'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    title: 'Traditional Homestay',
    description: 'Authentic Himalayan architecture and warm hospitality'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    title: 'Valley Views',
    description: 'Breathtaking panoramic views of the Darjeeling valley'
  },
 
]

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const scrollToRooms = () => {
    document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              index === currentImageIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
            style={{
              backgroundImage: `url(${image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-teal-900/20"></div>
          </div>
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-emerald-400/30 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-teal-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-yellow-400/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* Brand Badge */}
          <div className={`flex items-center justify-center gap-3 mb-8 transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="relative">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Star className="w-3 h-3 text-yellow-800 fill-current" />
              </div>
            </div>
            <div className="text-left">
              <div className="text-3xl font-bold text-white drop-shadow-lg">
                Norbu Homestay
              </div>
              <div className="text-emerald-300 text-sm font-medium">
                Authentic Darjeeling Experience
              </div>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className={`text-5xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight transform transition-all duration-1000 delay-300 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <span className="text-white drop-shadow-2xl block">
              Experience the
            </span>
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg block">
              Magic of Darjeeling
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className={`text-xl sm:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg transform transition-all duration-1000 delay-500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {HERO_IMAGES[currentImageIndex].description} • Wake up to misty mountain views, 
            sip the worlds finest tea, and create unforgettable memories in our authentic Himalayan homestay
          </p>
          
          {/* Features Pills */}
          <div className={`flex flex-wrap items-center justify-center gap-4 mb-12 transform transition-all duration-1000 delay-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-lg hover:bg-white/25 transition-all group">
              <MapPin className="w-5 h-5 text-emerald-300" />
              <span className="text-white font-medium">Darjeeling, West Bengal</span>
            </div>
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-lg hover:bg-white/25 transition-all group">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-white font-medium">4.8 Rating (127 reviews)</span>
            </div>
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-lg hover:bg-white/25 transition-all group">
              <Coffee className="w-5 h-5 text-emerald-300" />
              <span className="text-white font-medium">Authentic Tea Experience</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 transform transition-all duration-1000 delay-900 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all transform hover:scale-105 flex items-center gap-3 group">
              <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Book Your Stay Now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/15 backdrop-blur-md hover:bg-white/25 text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/20 shadow-lg transition-all transform hover:scale-105 flex items-center gap-3 group">
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Watch Virtual Tour
            </button>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center gap-3">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={scrollToRooms}
        className="absolute bottom-8 right-8 w-12 h-12 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/25 transition-all transform hover:scale-110 animate-bounce z-30"
      >
        <ChevronDown className="w-6 h-6" />
      </button>

      {/* Current Image Title */}
      {/* <div className="absolute bottom-20 left-8 z-30 max-w-md">
        <div className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/10">
          <h3 className="text-white font-bold text-lg mb-1">
            {HERO_IMAGES[currentImageIndex].title}
          </h3>
          <p className="text-gray-300 text-sm">
            {HERO_IMAGES[currentImageIndex].description}
          </p>
        </div>
      </div> */}
    </div>
  )
}

const BookingModal = ({ room, onClose, onBooked }) => {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates')
      return
    }
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    onBooked({ room, checkIn, checkOut, guests })
    setIsSubmitting(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-8 duration-300">
        <div className="relative h-48 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-t-2xl">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-6 text-white">
            <h3 className="text-2xl font-bold">{room.title}</h3>
            <p className="text-white/90">{room.short}</p>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {[...Array(room.capacity)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total per night:</span>
              <span className="text-emerald-600">₹{room.pricePerNight}</span>
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5" />
                Book Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

const RoomCard = ({ room, onView, onBook }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 bg-gradient-to-br from-emerald-100 to-teal-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20"><img src={room.images}/></div>
        <div className="absolute top-3 right-3 flex gap-2">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button className="w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-medium text-gray-700">{room.rating}</span>
        </div>
        
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-4 left-4 right-4">
            <button 
              onClick={() => onView(room.slug)}
              className="w-full bg-white/90 backdrop-blur-sm text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">{room.title}</h3>
          <div className="flex items-center text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">{room.capacity}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.short}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities?.map((amenity, index) => (
            <span key={index} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full font-medium">
              {amenity}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600">₹{room.pricePerNight}</div>
            <div className="text-xs text-gray-500">per night</div>
          </div>
          <button 
            onClick={() => onBook(room)}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 flex items-center gap-2"
          >
            Book Now
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [rooms, setRooms] = useState([])
  const [modalRoom, setModalRoom] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Simulate API call with fallback
        await new Promise(resolve => setTimeout(resolve, 500))
        const data = DEMO_ROOMS
        setRooms(data)
      } catch (error) {
        setRooms(DEMO_ROOMS)
      }
      setIsLoaded(true)
    }
    
    fetchRooms()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Hero Section with Auto-sliding Background */}
      <HeroSection />

      {/* Rooms Section */}
      <div id="rooms-section" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            <span className="text-emerald-600 font-semibold uppercase tracking-wider text-sm">Our Rooms</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Retreat
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each room offers a unique perspective of the Himalayas, blending traditional charm with modern comfort
          </p>
        </div>

        {!isLoaded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="h-56 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <div 
                key={room._id || room.slug}
                className="animate-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <RoomCard 
                  room={room} 
                  onView={(slug) => window.location.href = `/rooms/${slug}`} 
                  onBook={(r) => setModalRoom(r)} 
                />
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready for an Unforgettable Experience?</h3>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Book your stay at Norbu Homestay and immerse yourself in the tranquil beauty of the Himalayas
            </p>
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Check Availability
            </button>
          </div>
        </div>
      </div>

      {modalRoom && (
        <BookingModal 
          room={modalRoom} 
          onClose={() => setModalRoom(null)} 
          onBooked={(b) => { 
            alert('🎉 Booking Confirmed! Welcome to Norbu Homestay. Our team will contact you shortly with confirmation details.')
            setModalRoom(null) 
          }} 
        />
      )}
    </div>
  )
}