// src/app/ClientLayout.js
'use client'
import {
    Award,
    Car,
    ChevronRight,
    Clock,
    Coffee, Facebook, Heart, Instagram, Mail, MapPin, Menu, Mountain, Phone,
    Shield, Star, Twitter,
    Users,
    Utensils, Wifi, X
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const MobileMenu = ({ isOpen, onClose, currentPath }) => {
  const navItems = [
    { href: '/', label: 'Home', icon: Mountain },
    { href: '/room', label: 'Rooms', icon: null },
    { href: '/experiences', label: 'Experiences', icon: null },
    { href: '/gallery', label: 'Gallery', icon: null },
    { href: '/about', label: 'About Us', icon: null },
    { href: '/contact', label: 'Contact', icon: null },
  ]

  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      ></div>
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-900">Norbu Homestay</span>
              <div className="text-xs text-emerald-600">Himalayan Experience</div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.href
            const Icon = item.icon
            
            return (
              <Link 
                key={item.href}
                href={item.href} 
                onClick={onClose}
                className={`flex items-center justify-between p-4 rounded-xl font-medium transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className="w-5 h-5" />}
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                  isActive ? 'text-white/80' : 'text-gray-400'
                }`} />
              </Link>
            )
          })}
        </nav>
        
        {/* Bottom CTA */}
        <div className="p-6 border-t border-gray-100 mt-auto absolute bottom-0 left-0 right-0">
          <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <span>Book Your Stay</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ClientLayout({ children }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/room', label: 'Rooms' },
    { href: '/experiences', label: 'Experiences' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100' 
          : 'bg-white/90 backdrop-blur-sm shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4">
            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Mountain className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                  <Star className="w-2.5 h-2.5 text-yellow-800 fill-current" />
                </div>
              </div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Norbu Homestay
                </div>
                <div className="text-xs text-gray-500 font-medium group-hover:text-emerald-600 transition-colors">
                  Authentic Darjeeling Experience
                </div>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center bg-gray-50/80 backdrop-blur-sm rounded-full p-2 shadow-inner">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  
                  return (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 relative group ${
                        isActive 
                          ? 'text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg' 
                          : 'text-gray-700 hover:text-emerald-600 hover:bg-white/80'
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full shadow-lg animate-in fade-in duration-300"></div>
                      )}
                      {!isActive && (
                        <div className="absolute inset-0 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"></div>
                      )}
                    </Link>
                  )
                })}
              </div>
            </nav>

            {/* Enhanced Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link 
                href="/admin" 
                className="text-gray-600 hover:text-emerald-600 transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-emerald-50"
              >
                Admin Portal
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 group">
                <span>Book Now</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button 
              className="lg:hidden p-3 hover:bg-emerald-50 rounded-xl transition-colors group"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-700 group-hover:text-emerald-600 transition-colors" />
            </button>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        currentPath={pathname}
      />

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-emerald-400 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-teal-400 blur-3xl"></div>
        </div>

        {/* Main Footer */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Enhanced Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Mountain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                    Norbu Homestay
                  </div>
                  <div className="text-emerald-300 font-medium">Where Mountains Meet Memories</div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed max-w-md text-lg">
                Experience the authentic charm of Darjeeling with breathtaking Himalayan views, 
                world-renowned tea gardens, and warm local hospitality.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                  <div className="text-2xl font-bold text-white">4.9</div>
                  <div className="text-xs text-gray-400">Rating</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-xs text-gray-400">Happy Guests</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">5</div>
                  <div className="text-xs text-gray-400">Years</div>
                </div>
              </div>
              
              {/* Enhanced Social Links */}
              <div className="flex items-center gap-4">
                <Link href="#" className="w-12 h-12 bg-white/10 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition-all duration-300 group hover:scale-110 shadow-lg">
                  <Facebook className="w-5 h-5 group-hover:text-white transition-colors" />
                </Link>
                <Link href="#" className="w-12 h-12 bg-white/10 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-all duration-300 group hover:scale-110 shadow-lg">
                  <Instagram className="w-5 h-5 group-hover:text-white transition-colors" />
                </Link>
                <Link href="#" className="w-12 h-12 bg-white/10 hover:bg-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 group hover:scale-110 shadow-lg">
                  <Twitter className="w-5 h-5 group-hover:text-white transition-colors" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <div className="space-y-3">
                {navItems.slice(1).map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className="block text-gray-300 hover:text-emerald-300 transition-all duration-200 hover:translate-x-2 group flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Enhanced Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <MapPin className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-300 text-sm leading-relaxed">
                    Tea Garden Road, Darjeeling<br />
                    West Bengal 734101, India
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <Link href="tel:+919876543210" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">
                    +91 98765 43210
                  </Link>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <Link href="mailto:stay@norbuhomestay.com" className="text-gray-300 hover:text-emerald-300 transition-colors text-sm">
                    stay@norbuhomestay.com
                  </Link>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">24/7 Support Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Amenities */}
          <div className="border-t border-gray-700/50 mt-16 pt-12">
            <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              What Makes Us Special
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { icon: Wifi, label: 'Free WiFi', color: 'blue' },
                { icon: Coffee, label: 'Tea Experience', color: 'emerald' },
                { icon: Car, label: 'Pickup Service', color: 'teal' },
                { icon: Utensils, label: 'Local Cuisine', color: 'orange' },
                { icon: Shield, label: 'Safe & Secure', color: 'green' },
                { icon: Heart, label: 'Warm Hospitality', color: 'red' }
              ].map((amenity, index) => {
                const Icon = amenity.icon
                return (
                  <div key={index} className="flex flex-col items-center gap-3 text-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
                    <div className={`w-14 h-14 bg-${amenity.color}-600/20 rounded-2xl flex items-center justify-center group-hover:bg-${amenity.color}-600/30 transition-colors`}>
                      <Icon className={`w-6 h-6 text-${amenity.color}-400`} />
                    </div>
                    <span className="text-sm text-gray-300 font-medium">{amenity.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-gray-700/50 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-gray-400 text-sm flex items-center gap-2">
                <span>© {new Date().getFullYear()} Norbu Homestay. All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <span className="text-emerald-400">Made with ❤️ in Darjeeling</span>
              </div>
              <div className="flex items-center gap-8 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-emerald-300 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-emerald-300 transition-colors">
                  Terms of Service
                </Link>
                <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">4.9/5 Rating • 500+ Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}