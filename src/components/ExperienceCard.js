// src/components/ExperienceCard.js
export default function ExperienceCard({ exp }) {
  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden border">
      <img
        src={exp.image || '/images/placeholder.jpg'}
        alt={exp.title}
        className="w-full h-44 object-cover"
      />
      <div className="p-4">
        <h4 className="font-semibold text-lg">{exp.title}</h4>
        <div className="text-sm text-slate-500 mt-1">{exp.location}</div>
        <p className="text-sm text-slate-600 mt-3 line-clamp-3">{exp.short}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">Duration</div>
            <div className="text-sm font-medium">{exp.duration}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">From</div>
            <div className="text-lg font-semibold">₹{exp.price}</div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="flex-1 rounded-md bg-sky-600 text-white py-2 text-sm">Book Experience</button>
          <button className="rounded-md border px-3 py-2 text-sm">Details</button>
        </div>
      </div>
    </article>
  )
}
