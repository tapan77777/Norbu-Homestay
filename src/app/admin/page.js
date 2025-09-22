'use client'
import { Calendar, Edit, Eye, Filter, Mail, Plus, RefreshCw, Search, Trash2, User } from 'lucide-react'
import { useEffect, useState } from 'react'

const DEMO_BOOKINGS = [
  { 
    id: 'bk-demo-1', 
    roomId: 'r1', 
    guestName: 'Demo Guest', 
    guestEmail: 'demo@example.com', 
    checkIn: '2025-09-29', 
    checkOut: '2025-10-02', 
    status: 'confirmed',
    totalAmount: 450,
    phone: '+1-555-0123'
  },
  { 
    id: 'bk-demo-2', 
    roomId: 'r2', 
    guestName: 'Jane Smith', 
    guestEmail: 'jane@example.com', 
    checkIn: '2025-10-05', 
    checkOut: '2025-10-08', 
    status: 'pending',
    totalAmount: 320,
    phone: '+1-555-0456'
  },
  { 
    id: 'bk-demo-3', 
    roomId: 'r1', 
    guestName: 'Mike Johnson', 
    guestEmail: 'mike@example.com', 
    checkIn: '2025-10-12', 
    checkOut: '2025-10-15', 
    status: 'cancelled',
    totalAmount: 380,
    phone: '+1-555-0789'
  }
]

// Mock fetchWithFallback function
const fetchWithFallback = async (url, fallback) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))
  // Return fallback data for demo
  return fallback
}

export default function AdminPage() {
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)

  const loadBookings = async () => {
    setLoading(true)
    try {
      const data = await fetchWithFallback('/api/bookings', DEMO_BOOKINGS)
      setBookings(data || DEMO_BOOKINGS)
      setFilteredBookings(data || DEMO_BOOKINGS)
    } catch (error) {
      console.error('Failed to load bookings:', error)
      setBookings(DEMO_BOOKINGS)
      setFilteredBookings(DEMO_BOOKINGS)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  useEffect(() => {
    let filtered = bookings

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (booking.roomId && booking.roomId.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter)
    }

    // Date filter
    const today = new Date()
    if (dateFilter === 'upcoming') {
      filtered = filtered.filter(booking => new Date(booking.checkIn) >= today)
    } else if (dateFilter === 'current') {
      filtered = filtered.filter(booking => {
        const checkIn = new Date(booking.checkIn)
        const checkOut = new Date(booking.checkOut)
        return checkIn <= today && checkOut >= today
      })
    } else if (dateFilter === 'past') {
      filtered = filtered.filter(booking => new Date(booking.checkOut) < today)
    }

    setFilteredBookings(filtered)
  }, [bookings, searchTerm, statusFilter, dateFilter])

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const calculateNights = (checkIn, checkOut) => {
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    return nights
  }

  const BookingModal = ({ booking, onClose }) => {
    if (!booking) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Booking Details</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Guest Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{booking.guestName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{booking.guestEmail}</span>
                  </div>
                  {booking.phone && (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 text-gray-400">📞</span>
                      <span className="text-sm">{booking.phone}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Booking Details</h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Booking ID:</span>
                    <span className="ml-2 font-mono text-sm">{booking._id || booking.id}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Room:</span>
                    <span className="ml-2">{booking.room?.title || booking.roomId}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs border ${getStatusColor(booking.status)}`}>
                      {booking.status || 'confirmed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Stay Information</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Check-in</span>
                    <div className="font-medium">{formatDate(booking.checkIn)}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Check-out</span>
                    <div className="font-medium">{formatDate(booking.checkOut)}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Duration</span>
                    <div className="font-medium">{calculateNights(booking.checkIn, booking.checkOut)} nights</div>
                  </div>
                </div>
                {booking.totalAmount && (
                  <div className="mt-4 pt-4 border-t">
                    <span className="text-sm text-gray-500">Total Amount</span>
                    <div className="text-2xl font-bold text-emerald-600">${booking.totalAmount}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="p-6 border-t bg-gray-50 flex gap-3">
            <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Booking
            </button>
            <button className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Bookings Management</h2>
          <p className="text-gray-600 mt-1">
            Manage and view all hotel bookings ({filteredBookings.length} of {bookings.length} shown)
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadBookings}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            New Booking
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="all">All Dates</option>
            <option value="upcoming">Upcoming</option>
            <option value="current">Current</option>
            <option value="past">Past</option>
          </select>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>{filteredBookings.length} results</span>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Guest</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Room</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Dates</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Amount</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking._id || booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{booking.guestName}</div>
                          <div className="text-sm text-gray-500">{booking.guestEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{booking.room?.title || booking.roomId}</div>
                      <div className="text-sm text-gray-500">ID: {booking._id || booking.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium">{formatDate(booking.checkIn)}</div>
                          <div className="text-sm text-gray-500">to {formatDate(booking.checkOut)}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {calculateNights(booking.checkIn, booking.checkOut)} nights
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {booking.status || 'confirmed'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {booking.totalAmount ? (
                        <div className="font-semibold text-emerald-600">${booking.totalAmount}</div>
                      ) : (
                        <div className="text-gray-400">-</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit Booking"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Cancel Booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-emerald-600">
                {bookings.filter(b => b.status === 'confirmed').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-600">✓</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === 'pending').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600">⏳</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-blue-600">
                ${bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0).toLocaleString()}
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">$</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      <BookingModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  )
}