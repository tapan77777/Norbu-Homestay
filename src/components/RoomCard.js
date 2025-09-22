// src/components/RoomCard.js
export default function RoomCard({ room, onView, onBook }) {
  return (
    <div className="bg-white rounded-lg shadow border overflow-hidden">
      <img src={room.images?.[0] || '/images/placeholder.jpg'} alt={room.title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <h4 className="font-semibold">{room.title}</h4>
        <p className="text-sm text-slate-500 mt-1">{room.short}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm font-medium">₹{room.pricePerNight}/night</div>
          <div className="flex gap-2">
            <button onClick={()=>onView(room.slug)} className="text-sky-600 text-sm">View</button>
            <button onClick={()=>onBook(room)} className="bg-sky-600 text-white rounded px-3 py-1 text-sm">Book</button>
          </div>
        </div>
      </div>
    </div>
  )
}
