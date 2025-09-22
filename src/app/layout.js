// src/app/layout.js
import ClientLayout from '../ClientLayout'
import './globals.css'

export const metadata = {
  title: 'Norbu Homestay — Authentic Darjeeling Experience',
  description: 'Experience the magic of Darjeeling hills with breathtaking mountain views, authentic tea garden experiences, and warm Himalayan hospitality at Norbu Homestay.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}