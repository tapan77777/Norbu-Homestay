'use client'
// src/app/admin/page.js
import { useEffect, useState } from 'react'
import { fetchWithFallback } from '../../lib/fetchWithFallback'

const DEMO_BOOKINGS = [
  { id:'bk-demo-1', roomId:'r1', guestName:'Demo Guest', guestEmail:'demo@example.com', checkIn:'2025-09-29', checkOut:'2025-10-02', status:'confirmed' }
]

export default function AdminPage(){
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    (async () => {
      const data = await fetchWithFallback('/api/bookings', DEMO_BOOKINGS)
      setBookings(data || DEMO_BOOKINGS)
    })()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold">Admin — Bookings</h2>
      <p className="text-sm text-slate-500 mt-1">This view shows bookings (real from your `/api/bookings` or demo fallback).</p>

      <div className="mt-6 bg-white border rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm text-slate-600">ID</th>
              <th className="text-left px-4 py-3 text-sm text-slate-600">Room</th>
              <th className="text-left px-4 py-3 text-sm text-slate-600">Guest</th>
              <th className="text-left px-4 py-3 text-sm text-slate-600">Dates</th>
              <th className="text-left px-4 py-3 text-sm text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id || b.id} className="border-t">
                <td className="px-4 py-3 text-sm">{b._id || b.id}</td>
                <td className="px-4 py-3 text-sm">{b.room?.title || b.roomId}</td>
                <td className="px-4 py-3 text-sm">
                  <div className="font-medium">{b.guestName}</div>
                  <div className="text-xs text-slate-500">{b.guestEmail}</div>
                </td>
                <td className="px-4 py-3 text-sm">{b.checkIn} → {b.checkOut}</td>
                <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">{b.status || 'confirmed'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
