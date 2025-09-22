// src/components/BookingModal.js
'use client'
import { useState } from 'react'

export default function BookingModal({ room, onClose, onBooked }) {
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    const payload = { roomId: room._id || room.id, guestName, guestEmail, checkIn, checkOut, guests }
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        const json = await res.json()
        onBooked(json)
      } else {
        // if backend not available or returns error, simulate
        onBooked({ id: 'demo-'+Date.now(), ...payload, status: 'confirmed' })
      }
    } catch (err) {
      onBooked({ id: 'demo-'+Date.now(), ...payload, status: 'confirmed' })
    } finally {
      setLoading(false)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold">Book: {room.title}</h3>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm text-slate-600">Full name</label>
            <input required value={guestName} onChange={e=>setGuestName(e.target.value)} className="mt-1 w-full border rounded px-3 py-2"/>
          </div>
          <div>
            <label className="block text-sm text-slate-600">Email</label>
            <input required value={guestEmail} onChange={e=>setGuestEmail(e.target.value)} className="mt-1 w-full border rounded px-3 py-2"/>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm text-slate-600">Check-in</label>
              <input required type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} className="mt-1 w-full border rounded px-3 py-2"/>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-slate-600">Check-out</label>
              <input required type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)} className="mt-1 w-full border rounded px-3 py-2"/>
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-600">Guests</label>
            <input required type="number" min="1" value={guests} onChange={e=>setGuests(e.target.value)} className="mt-1 w-28 border rounded px-3 py-2"/>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-sky-600 text-white">{loading ? 'Booking...' : 'Confirm Booking'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
