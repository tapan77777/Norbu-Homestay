'use client'
// src/app/rooms/[slug]/page.js
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BookingModal from '../../../components/BookingModal'
import { fetchWithFallback } from '../../../lib/fetchWithFallback'

const DEMO_ROOMS = [
  { _id:'r1', title:'Deluxe Room', slug:'deluxe-room', short:'Cozy room with balcony', images:['/images/room1.jpg','/images/room1-2.jpg'], pricePerNight:2500, capacity:2, description:'Large bed, balcony overlooking hills.' },
  { _id:'r2', title:'Family Suite', slug:'family-suite', short:'Large suite', images:['/images/room2.jpg'], pricePerNight:4200, capacity:4, description:'Two rooms + kitchenette.' },
  { _id:'r3', title:'Standard Room', slug:'standard-room', short:'Simple & clean', images:['/images/room3.jpg'], pricePerNight:1800, capacity:2, description:'Essential comfort at a great price.' }
]

export default function RoomDetail() {
  const router = useRouter()
  const { slug } = router.query || {}
  const [room, setRoom] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!slug) return
    ;(async () => {
      const all = await fetchWithFallback('/api/rooms', DEMO_ROOMS)
      const found = (all || DEMO_ROOMS).find(r => r.slug === slug)
      setRoom(found)
    })()
  }, [slug])

  if (!room) return <div className="max-w-6xl mx-auto px-4 py-12">Loading...</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-start gap-8">
        <div className="w-full lg:w-2/3">
          <img src={room.images?.[0] || '/images/placeholder.jpg'} className="w-full h-72 object-cover rounded-lg" alt={room.title} />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {(room.images || []).slice(0,3).map((img,i)=> <img key={i} src={img} className="h-24 w-full object-cover rounded-md" />)}
          </div>

          <h3 className="text-2xl font-semibold mt-4">{room.title}</h3>
          <p className="text-sm text-slate-600 mt-2">{room.description || room.short}</p>
        </div>

        <aside className="w-full lg:w-1/3">
          <div className="bg-white border rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500">Price</div>
                <div className="text-xl font-bold">₹{room.pricePerNight} <span className="text-sm font-medium text-slate-500">/night</span></div>
              </div>
              <div className="text-sm text-slate-500">Capacity: {room.capacity}</div>
            </div>

            <button onClick={() => setOpen(true)} className="mt-4 w-full inline-flex items-center justify-center rounded-md bg-sky-600 text-white py-2">Book this room</button>
          </div>
        </aside>
      </div>

      {open && <BookingModal room={room} onClose={()=>setOpen(false)} onBooked={(b)=>{ alert('Booked (demo)'); setOpen(false) }} />}
    </div>
  )
}
