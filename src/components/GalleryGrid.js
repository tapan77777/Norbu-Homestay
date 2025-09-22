'use client'
import { motion } from 'framer-motion'

export default function GalleryGrid({ images = [], onOpen = () => {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((img, i) => (
        <motion.button
          key={img.id || i}
          onClick={() => onOpen(i)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.03 }}
          className="group relative block overflow-hidden rounded-lg shadow-sm cursor-pointer bg-gray-100"
        >
          <img src={img.src} alt={img.alt} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute left-3 bottom-3 bg-black/50 text-white px-3 py-1 rounded text-sm">{img.type === 'attraction' ? 'Attraction' : img.type === 'place' ? 'Outside' : 'Homestay'}</div>
        </motion.button>
      ))}
    </div>
  )
}
