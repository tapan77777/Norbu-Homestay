'use client'
import { ChevronLeft, ChevronRight, Clock, MapPin, Star, Users } from 'lucide-react';
import { useState } from 'react';

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const rooms = [
    {
      id: 1,
      title: "Presidential Suite",
      subtitle: "Ultimate Luxury Experience",
      description: "Indulge in unparalleled luxury with our Presidential Suite featuring panoramic mountain views, private balcony, marble bathroom, and personalized butler service.",
      images: [
        "/images/room1.jpg",
        "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop"
      ],
      capacity: 4,
      price: "₹8,500",
      originalPrice: "₹12,000",
      rating: 4.9,
      reviews: 127,
      amenities: ["Free WiFi", "Parking", "Room Service", "Mini Bar", "Smart TV", "Jacuzzi"],
      featured: true,
      discount: "29% OFF"
    },
    {
      id: 2,
      title: "Deluxe Mountain View",
      subtitle: "Breathtaking Scenery",
      description: "Wake up to stunning mountain vistas in this elegantly appointed room with modern amenities, cozy sitting area, and premium linens.",
      images: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop"
      ],
      capacity: 2,
      price: "₹4,200",
      originalPrice: "₹5,500",
      rating: 4.7,
      reviews: 89,
      amenities: ["Free WiFi", "Parking", "Room Service", "Coffee Maker", "Smart TV"],
      featured: false,
      discount: "24% OFF"
    },
    {
      id: 3,
      title: "Family Paradise Suite",
      subtitle: "Perfect for Families",
      description: "Spacious two-bedroom suite with separate living area, kitchenette, and connecting rooms. Entertainment system and child-friendly amenities included.",
      images: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop"
      ],
      capacity: 6,
      price: "₹6,800",
      originalPrice: "₹8,200",
      rating: 4.8,
      reviews: 156,
      amenities: ["Free WiFi", "Parking", "Kitchenette", "Gaming Console", "Smart TV", "Cribs Available"],
      featured: true,
      discount: "17% OFF"
    },
    {
      id: 4,
      title: "Garden View Classic",
      subtitle: "Peaceful & Serene",
      description: "Relax in this tranquil room overlooking our beautiful gardens. Features premium bedding, work desk, and garden access.",
      images: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=800&h=600&fit=crop"
      ],
      capacity: 2,
      price: "₹3,200",
      originalPrice: "₹4,000",
      rating: 4.6,
      reviews: 203,
      amenities: ["Free WiFi", "Garden Access", "Work Desk", "Coffee Maker", "Smart TV"],
      featured: false,
      discount: "20% OFF"
    },
    {
      id: 5,
      title: "Executive Business",
      subtitle: "Work in Comfort",
      description: "Designed for business travelers with executive lounge access, high-speed internet, ergonomic workspace, and 24/7 business center access.",
      images: [
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop"
      ],
      capacity: 2,
      price: "₹5,500",
      originalPrice: "₹7,000",
      rating: 4.7,
      reviews: 92,
      amenities: ["Free WiFi", "Executive Lounge", "Business Center", "Meeting Room Access", "Smart TV"],
      featured: false,
      discount: "21% OFF"
    },
    {
      id: 6,
      title: "Cozy Standard",
      subtitle: "Great Value",
      description: "Perfect for budget-conscious travelers without compromising on comfort. Clean, modern, and well-appointed with all essential amenities.",
      images: [
        "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop"
      ],
      capacity: 2,
      price: "₹2,400",
      originalPrice: "₹3,200",
      rating: 4.4,
      reviews: 267,
      amenities: ["Free WiFi", "Coffee Maker", "Smart TV", "Daily Housekeeping"],
      featured: false,
      discount: "25% OFF"
    }
  ];

  const nextImage = (roomId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) + 1) % rooms.find(r => r.id === roomId).images.length
    }));
  };

  const prevImage = (roomId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomId]: ((prev[roomId] || 0) - 1 + rooms.find(r => r.id === roomId).images.length) % rooms.find(r => r.id === roomId).images.length
    }));
  };

  const featuredRooms = rooms.filter(room => room.featured);
  const regularRooms = rooms.filter(room => !room.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Luxury Awaits
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover our handpicked collection of premium rooms, each designed to create unforgettable memories
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Shimla Hills</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>4.8 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>24/7 Service</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Rooms */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">✨ Featured Suites</h2>
            <p className="text-lg text-gray-600">Our most popular and luxurious accommodations</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredRooms.map((room, idx) => (
              <div
                key={room.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.2}s both`
                }}
              >
                {/* Image Carousel */}
                <div className="relative h-64 overflow-hidden">
                  {room.discount && (
                    <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {room.discount}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{room.rating}</span>
                  </div>
                  
                  <img
                    src={room.images[currentImageIndex[room.id] || 0]}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {room.images.length > 1 && (
                    <>
                      <button
                        onClick={() => prevImage(room.id)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => nextImage(room.id)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {room.images.map((_, imgIdx) => (
                          <button
                            key={imgIdx}
                            onClick={() => setCurrentImageIndex(prev => ({ ...prev, [room.id]: imgIdx }))}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              imgIdx === (currentImageIndex[room.id] || 0) 
                                ? 'bg-white scale-125' 
                                : 'bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{room.title}</h3>
                      <p className="text-sm text-blue-600 font-medium">{room.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>
                  
                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{room.capacity} guests</span>
                      <span className="text-gray-300">•</span>
                      <span>{room.reviews} reviews</span>
                    </div>
                    <div className="text-right">
                      {room.originalPrice && (
                        <span className="text-sm text-gray-400 line-through block">{room.originalPrice}</span>
                      )}
                      <span className="text-lg font-bold text-gray-800">{room.price}</span>
                      <span className="text-sm text-gray-500">/night</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Rooms */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">All Accommodations</h2>
            <p className="text-lg text-gray-600">Find the perfect room for your stay</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularRooms.map((room, idx) => (
              <div
                key={room.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
                style={{
                  animation: `fadeInUp 0.4s ease-out ${idx * 0.1 + 0.5}s both`
                }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  {room.discount && (
                    <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                      {room.discount}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-semibold">{room.rating}</span>
                  </div>
                  
                  <img
                    src={room.images[0]}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{room.title}</h3>
                  <p className="text-xs text-blue-600 font-medium mb-2">{room.subtitle}</p>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{room.description}</p>
                  
                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {room.amenities.slice(0, 2).map((amenity, idx) => (
                      <span key={idx} className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs">
                        {amenity}
                      </span>
                    ))}
                    <span className="bg-gray-50 text-gray-500 px-2 py-1 rounded text-xs">
                      +{room.amenities.length - 2}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{room.capacity}</span>
                    </div>
                    <div className="text-right">
                      {room.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">{room.originalPrice}</span>
                      )}
                      <div>
                        <span className="text-lg font-bold text-gray-800">{room.price}</span>
                        <span className="text-xs text-gray-500">/night</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}