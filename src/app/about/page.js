// src/app/about/page.js
import { Link } from 'lucide-react'
import Image from 'next/image'

export const metadata = {
  title: 'About — Norbu Homestay',
  description: 'Learn about Norbu Homestay — our story, values, and the people who welcome you.',
}

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="bg-white rounded-xl shadow-sm overflow-hidden mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold">About Norbu Homestay</h1>
            <p className="text-slate-600 mt-3 max-w-lg">
              We are a small, family-run homestay that welcomes guests to experience authentic local life,
              warm hospitality, and the natural beauty around our village. Our goal is simple: make you feel
              at home while helping you discover the area like a local.
            </p>

            <div className="mt-6 flex gap-3 items-center">
              <Link href="/rooms" className="inline-block rounded-md bg-sky-600 text-white px-4 py-2 shadow">View Rooms</Link>
              <Link href="/experience" className="inline-block rounded-md border px-4 py-2 text-slate-700">See Experiences</Link>
            </div>
          </div>

          <div className="relative h-64 lg:h-auto">
            {/* Decorative image: use your own photo in public/images/about-photo.jpg */}
            <Image
              src="/images/about-photo.jpg"
              alt="Norbu Homestay exterior"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="mb-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-slate-600 mt-3">
            Norbu Homestay began when our family opened our doors to travellers who wanted more than a hotel 
            they wanted human connection. Over the years we've hosted hundreds of guests, shared meals and stories,
            and helped travellers discover secret trails, local markets and traditional festivals.
          </p>
          <p className="text-slate-600 mt-3">
            We believe travel should be about people and place. Thats why we keep things small, personal and sustainable.
            Youll find garden-grown vegetables at breakfast, helpful local tips, and a comfortable room to rest each night.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium">What we care about</h3>
          <ul className="mt-3 space-y-2 text-slate-600">
            <li>• Honest hospitality — we treat guests like family.</li>
            <li>• Local experiences — we connect guests to culture, food & nature.</li>
            <li>• Sustainability — low-impact stays and support for local artisans.</li>
          </ul>
        </div>
      </section>

      {/* Meet the Hosts */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Meet the Hosts</h2>
        <p className="text-sm text-slate-500 mb-6">The people behind Norbu Homestay — friendly, local, and happy to help.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <HostCard
            name="Norbu (Owner)"
            role="Host & Guide"
            bio="Born and raised nearby, Norbu loves sharing local trails and stories. He organizes treks and cultural walks for guests."
            img="/images/host1.jpg"
          />
          <HostCard
            name="Sarma (Chef)"
            role="Home Cook"
            bio="Sarma cooks seasonal, homestyle meals using family recipes — breakfast is her speciality."
            img="/images/host2.jpg"
          />
          <HostCard
            name="Anil (Manager)"
            role="Guest Relations"
            bio="Anil helps guests plan trips, arrange transport and make sure every stay is smooth and memorable."
            img="/images/host3.jpg"
          />
        </div>
      </section>

      {/* Values / How we help */}
      <section className="mb-10 bg-white border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3">How we make your stay easy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Feature title="Local Knowledge" desc="We recommend places to eat, routes to explore and the best local vendors." />
          <Feature title="Personal Touch" desc="Small gestures: homemade breakfast, warm blankets, and attention to detail." />
          <Feature title="Flexible Support" desc="Early check-in requests, luggage storage, and transportation help if needed." />
        </div>
      </section>

      {/* CTA & Contact */}
      <section className="mt-8 text-center">
        <h3 className="text-xl font-semibold">Want to stay with us?</h3>
        <p className="text-slate-600 mt-2 mb-4">Check availability or message us — well be happy to welcome you.</p>
        <div className="flex justify-center gap-3">
          <Link href="/rooms" className="rounded-md bg-sky-600 text-white px-4 py-2">Check Rooms</Link>
          <Link href="/contact" className="rounded-md border px-4 py-2 text-slate-700">Contact Us</Link>
        </div>
      </section>
    </div>
  )
}

/* Small subcomponents */

function HostCard({ name, role, bio, img }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
      <div className="relative h-40">
        <Image src={img} alt={name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
      </div>
      <div className="p-4">
        <div className="font-semibold">{name}</div>
        <div className="text-xs text-slate-500 mt-1">{role}</div>
        <p className="text-sm text-slate-600 mt-3">{bio}</p>
      </div>
    </div>
  )
}

function Feature({ title, desc }) {
  return (
    <div className="p-4">
      <div className="font-medium">{title}</div>
      <div className="text-sm text-slate-600 mt-1">{desc}</div>
    </div>
  )
}
