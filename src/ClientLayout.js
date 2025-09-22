// src/app/ClientLayout.js
'use client'
import { Car, Coffee, Facebook, Heart, Instagram, Mail, MapPin, Menu, Mountain, Phone, Shield, Star, Twitter, Utensils, Wifi, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">Norbu Homestay</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-6 space-y-1">
          <Link href="/" className="flex items-center gap-3 p-3 text-emerald-600 bg-emerald-50 rounded-lg font-medium">
            <Mountain className="w-5 h-5" />
            Home
          </Link>
          <Link href="/room" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            Room
          </Link>
          <Link href="/experiences" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            Experiences
          </Link>
          <Link href="/gallery" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            Gallery
          </Link>
          <Link href="/about" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            Contact
          </Link>
        </nav>
        
        <div className="p-6 border-t mt-auto">
          <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all">
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ClientLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Mountain className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Star className="w-2 h-2 text-yellow-800 fill-current" />
                </div>
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Norbu Homestay
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Authentic Darjeeling Experience
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors relative">
                Home
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"></div>
              </Link>
              <Link href="/room" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                Rooms
              </Link>
              <Link href="/experiences" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                Experiences
              </Link>
              <Link href="/gallery" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                Gallery
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
                Contact
              </Link>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-800 transition-colors text-sm">
                Admin
              </Link>
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">Norbu Homestay</div>
                  <div className="text-emerald-300 text-sm">Where Mountains Meet Memories</div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Experience the authentic charm of Darjeeling with breathtaking Himalayan views, 
                world-renowned tea gardens, and warm local hospitality at our traditional homestay.
              </p>
              
              <div className="flex items-center gap-4">
                <Link href="#" className="w-10 h-10 bg-white/10 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors group">
                  <Facebook className="w-5 h-5 group-hover:text-white" />
                </Link>
                <Link href="#" className="w-10 h-10 bg-white/10 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors group">
                  <Instagram className="w-5 h-5 group-hover:text-white" />
                </Link>
                <Link href="#" className="w-10 h-10 bg-white/10 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors group">
                  <Twitter className="w-5 h-5 group-hover:text-white" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <div className="space-y-3">
                <Link href="/room" className="block text-gray-300 hover:text-emerald-300 transition-colors">Our Rooms</Link>
                <Link href="/experiences" className="block text-gray-300 hover:text-emerald-300 transition-colors">Experiences</Link>
                <Link href="/gallery" className="block text-gray-300 hover:text-emerald-300 transition-colors">Gallery</Link>
                <Link href="/about" className="block text-gray-300 hover:text-emerald-300 transition-colors">About Us</Link>
                <Link href="/contact" className="block text-gray-300 hover:text-emerald-300 transition-colors">Contact</Link>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 mt-0.5" />
                  <div className="text-gray-300 text-sm leading-relaxed">
                    Tea Garden Road, Darjeeling<br />
                    West Bengal 734101, India
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <Link href="tel:+919876543210" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">
                    +91 98765 43210
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <Link href="mailto:stay@norbuhomestay.com" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">
                    stay@norbuhomestay.com
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <h3 className="text-lg font-semibold mb-6 text-center">What We Offer</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-sm text-gray-300">Free WiFi</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-sm text-gray-300">Tea Experience</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-sm text-gray-300">Pickup Service</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-sm text-gray-300">Local Cuisine</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-sm text-gray-300">Safe & Secure</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-sm text-gray-300">Warm Hospitality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Norbu Homestay. All rights reserved. Made with ❤️ in Darjeeling.
              </div>
              <div className="flex items-center gap-6 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-emerald-300 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-emerald-300 transition-colors">Terms of Service</Link>
                <div className="flex items-center gap-1 text-gray-400">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.8/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}