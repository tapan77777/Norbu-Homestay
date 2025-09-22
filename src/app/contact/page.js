'use client'

import {
    Camera,
    Car,
    Check,
    Clock,
    Coffee,
    Mail,
    MapPin,
    MessageCircle,
    Mountain,
    Phone,
    Send,
    Star,
    Utensils,
    Wifi
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      subtitle: 'Mon-Sun 8:00 AM - 9:00 PM',
      value: '+91 98765 43210',
      action: 'tel:+919876543210',
      color: 'emerald',
      description: 'Speak directly with our team'
    },
    {
      icon: Mail,
      title: 'Email Us',
      subtitle: 'We reply within 24 hours',
      value: 'hello@norbuhomestay.com',
      action: 'mailto:hello@norbuhomestay.com',
      color: 'blue',
      description: 'Send us detailed inquiries'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      subtitle: 'Quick responses & booking',
      value: '+91 98765 43210',
      action: 'https://wa.me/919876543210',
      color: 'green',
      description: 'Chat with us instantly'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      subtitle: 'Norbu Homestay Location',
      value: 'Hill Station, Darjeeling',
      action: '#map',
      color: 'red',
      description: 'Find us in the mountains'
    }
  ]

  const amenities = [
    { icon: Mountain, text: 'Mountain Views' },
    { icon: Coffee, text: 'Tea Gardens' },
    { icon: Wifi, text: 'Free WiFi' },
    { icon: Car, text: 'Airport Pickup' },
    { icon: Utensils, text: 'Local Cuisine' },
    { icon: Camera, text: 'Photo Tours' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-white animate-pulse delay-300"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-white animate-pulse delay-700"></div>
        </div>

        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center text-white">
            {/* Brand Badge */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-xl">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">Contact Norbu Homestay</div>
                <div className="text-emerald-100">Your Gateway to the Himalayas</div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Let's Plan Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Perfect Mountain Getaway
              </span>
            </h1>
            
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Whether you're planning a romantic retreat, family vacation, or solo adventure, 
              our team is here to create unforgettable memories in the heart of Darjeeling.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-emerald-200 text-sm flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  Guest Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-emerald-200 text-sm">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-emerald-200 text-sm">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-in slide-in-from-bottom-8`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br from-${method.color}-500 to-${method.color}-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{method.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{method.subtitle}</p>
                <p className="text-gray-600 mb-3">{method.description}</p>
                <a
                  href={method.action}
                  className={`inline-flex items-center gap-2 text-${method.color}-600 font-semibold hover:text-${method.color}-700 transition-colors group`}
                >
                  <span>{method.value}</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 border border-gray-100">
              {submitted ? (
                <div className="text-center py-12 animate-in fade-in duration-500">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully! 🎉</h2>
                  <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    Thank you for reaching out! Our team will get back to you within 24 hours with all the details for your perfect Darjeeling experience.
                  </p>
                  <button 
                    onClick={() => {
                      setSubmitted(false)
                      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                    <p className="text-gray-600 text-lg">
                      Fill out the form below and we'll get back to you with personalized recommendations and booking details.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField('')}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            focusedField === 'name' || form.name
                              ? 'border-emerald-500 ring-4 ring-emerald-100' 
                              : 'border-gray-200 hover:border-gray-300'
                          } focus:outline-none`}
                          placeholder="Enter your full name"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField('')}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            focusedField === 'email' || form.email
                              ? 'border-emerald-500 ring-4 ring-emerald-100' 
                              : 'border-gray-200 hover:border-gray-300'
                          } focus:outline-none`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Phone Field */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField('')}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            focusedField === 'phone' || form.phone
                              ? 'border-emerald-500 ring-4 ring-emerald-100' 
                              : 'border-gray-200 hover:border-gray-300'
                          } focus:outline-none`}
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      {/* Subject Field */}
                      <div className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => setFocusedField('')}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            focusedField === 'subject' || form.subject
                              ? 'border-emerald-500 ring-4 ring-emerald-100' 
                              : 'border-gray-200 hover:border-gray-300'
                          } focus:outline-none`}
                        >
                          <option value="">Select inquiry type</option>
                          <option value="booking">Room Booking</option>
                          <option value="pricing">Pricing Information</option>
                          <option value="activities">Local Activities</option>
                          <option value="transport">Transportation</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        rows="5"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField('')}
                        required
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-none ${
                          focusedField === 'message' || form.message
                            ? 'border-emerald-500 ring-4 ring-emerald-100' 
                            : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                        placeholder="Tell us about your travel dates, preferences, and any special requirements..."
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                        {form.message.length}/500
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Quick Info Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Norbu Homestay?</h3>
              
              <div className="space-y-4">
                {amenities.map((amenity, index) => {
                  const Icon = amenity.icon
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{amenity.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Response Time Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-8 h-8" />
                <h3 className="text-xl font-bold">Quick Response</h3>
              </div>
              <p className="text-emerald-100 leading-relaxed">
                We typically respond to all inquiries within 2-4 hours during business hours. 
                For urgent bookings, call us directly for immediate assistance.
              </p>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-6 pb-0">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Our Location</h3>
                <p className="text-gray-600 mb-4">
                  Nestled in the heart of Darjeeling with panoramic mountain views
                </p>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span>Norbu Homestay, Hill Station, Darjeeling</span>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div id="map" className="h-48 bg-gray-100 mt-4 relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28263.34421126049!2d88.24799835!3d27.036006699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e6a56a5805eafb%3A0x71be2aaa958010db!2sDarjeeling%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1635780000000!5m2!1sen!2sin"
                  allowFullScreen=""
                  loading="lazy"
                  style={{ border: 0 }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}