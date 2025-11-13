import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Emily Buckalew - Georgia Real Estate Expert',
  description: 'Your trusted real estate professional in Georgia. Helping you find your dream home or sell your property with expertise and dedication.',
  keywords: 'Georgia real estate, realtor, homes for sale, Emily Buckalew, property listings, buy home Georgia, sell home Georgia',
  authors: [{ name: 'Emily Buckalew' }],
  openGraph: {
    title: 'Emily Buckalew - Georgia Real Estate Expert',
    description: 'Your trusted real estate professional in Georgia',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
