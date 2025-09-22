'use client'

export default function ExperiencePage() {
  const experiences = [
    {
      id: 1,
      title: "Sunrise Mountain Trek",
      description: "Start your day with a guided trek to the nearby hills and enjoy a breathtaking sunrise.",
      image: "/images/room1.jpg",
      duration: "4 hours",
      price: "₹800 per person"
    },
    {
      id: 2,
      title: "Traditional Cooking Class",
      description: "Learn to cook authentic local dishes with our host family in the homestay kitchen.",
      image: "/images/room2.jpg",
      duration: "2.5 hours",
      price: "₹600 per person"
    },
    {
      id: 3,
      title: "Village Walk & Cultural Tour",
      description: "Take a guided walk through the village, meet local artisans, and experience the culture first-hand.",
      image: "/images/room3.jpg",
      duration: "5 hours",
      price: "₹1200 per person"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold">Experiences at Norbu Homestay</h1>
        <p className="mt-2 text-slate-600">
          More than just a stay — explore activities that bring you closer to nature and local life.
        </p>
      </div>

      {/* Experiences grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-white rounded-lg shadow border overflow-hidden">
            <img
              src={exp.image}
              alt={exp.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold">{exp.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{exp.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <span>{exp.duration}</span>
                <span>{exp.price}</span>
              </div>
              <button className="mt-5 w-full py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
