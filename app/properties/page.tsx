import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Properties for Sale in Georgia - Emily Buckalew Realty',
  description: 'Browse our current listings of homes for sale throughout Georgia. Find your dream home with Emily Buckalew.',
}

export default function Properties() {
  const properties = [
    {
      id: 1,
      title: 'Modern Family Home in Atlanta',
      price: '$485,000',
      beds: 4,
      baths: 3,
      sqft: '2,850',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      location: 'Atlanta, GA',
      status: 'For Sale',
      description: 'Beautiful modern home with open floor plan, updated kitchen, and spacious backyard.',
    },
    {
      id: 2,
      title: 'Charming Cottage in Savannah',
      price: '$325,000',
      beds: 3,
      baths: 2,
      sqft: '1,950',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      location: 'Savannah, GA',
      status: 'For Sale',
      description: 'Charming cottage in historic district with original hardwood floors and updated amenities.',
    },
    {
      id: 3,
      title: 'Luxury Estate in Buckhead',
      price: '$1,250,000',
      beds: 5,
      baths: 4.5,
      sqft: '4,200',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      location: 'Buckhead, GA',
      status: 'For Sale',
      description: 'Stunning luxury estate with gourmet kitchen, home theater, and resort-style pool.',
    },
    {
      id: 4,
      title: 'Cozy Bungalow in Marietta',
      price: '$275,000',
      beds: 3,
      baths: 2,
      sqft: '1,650',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      location: 'Marietta, GA',
      status: 'For Sale',
      description: 'Adorable bungalow with renovated kitchen, large deck, and mature landscaping.',
    },
    {
      id: 5,
      title: 'Contemporary Townhome in Midtown',
      price: '$425,000',
      beds: 3,
      baths: 2.5,
      sqft: '2,100',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
      location: 'Midtown Atlanta, GA',
      status: 'For Sale',
      description: 'Modern townhome in walkable neighborhood with rooftop terrace and garage.',
    },
    {
      id: 6,
      title: 'Ranch Style Home in Roswell',
      price: '$395,000',
      beds: 4,
      baths: 2,
      sqft: '2,400',
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      location: 'Roswell, GA',
      status: 'For Sale',
      description: 'Spacious ranch on large lot with finished basement and two-car garage.',
    },
    {
      id: 7,
      title: 'Waterfront Property in Lake Lanier',
      price: '$875,000',
      beds: 4,
      baths: 3,
      sqft: '3,200',
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
      location: 'Lake Lanier, GA',
      status: 'For Sale',
      description: 'Stunning waterfront home with private dock, outdoor kitchen, and panoramic views.',
    },
    {
      id: 8,
      title: 'Victorian Home in Decatur',
      price: '$550,000',
      beds: 4,
      baths: 3,
      sqft: '2,650',
      image: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&q=80',
      location: 'Decatur, GA',
      status: 'For Sale',
      description: 'Restored Victorian with original details, modern updates, and large corner lot.',
    },
    {
      id: 9,
      title: 'Golf Course Community Home',
      price: '$625,000',
      beds: 4,
      baths: 3.5,
      sqft: '3,100',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80',
      location: 'Johns Creek, GA',
      status: 'For Sale',
      description: 'Elegant home overlooking golf course with master on main and finished terrace level.',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="heading-xl text-white mb-6">Available Properties</h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Explore our curated selection of homes for sale across Georgia
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>All Locations</option>
                  <option>Atlanta</option>
                  <option>Savannah</option>
                  <option>Buckhead</option>
                  <option>Marietta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>Any Price</option>
                  <option>Under $300K</option>
                  <option>$300K - $500K</option>
                  <option>$500K - $750K</option>
                  <option>$750K+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>Any</option>
                  <option>2+</option>
                  <option>3+</option>
                  <option>4+</option>
                  <option>5+</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full btn-primary">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="section-container">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {properties.length} Properties Available
          </h2>
          <p className="text-gray-600">
            Find your perfect home from our current listings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="card">
              <div className="relative h-64">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-gold-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  {property.price}
                </div>
                <div className="absolute top-4 left-4 bg-white text-gray-900 px-3 py-1 rounded-lg text-sm font-semibold shadow-lg">
                  {property.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-3 flex items-center">
                  <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {property.location}
                </p>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{property.description}</p>
                <div className="flex justify-between text-gray-700 border-t pt-4 mb-4">
                  <span className="flex items-center text-sm">
                    <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {property.beds} beds
                  </span>
                  <span className="flex items-center text-sm">
                    <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                    {property.baths} baths
                  </span>
                  <span className="text-sm">{property.sqft} sqft</span>
                </div>
                <Link
                  href="/contact"
                  className="block w-full text-center btn-outline"
                >
                  Schedule Viewing
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 section-container">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-lg shadow-lg p-12">
          <h2 className="heading-md mb-6">Don't See What You're Looking For?</h2>
          <p className="text-lg text-gray-600 mb-8">
            I have access to exclusive listings and off-market properties. Let me know what you're
            looking for, and I'll find the perfect home for you.
          </p>
          <Link href="/contact" className="btn-primary">
            Tell Me What You Need
          </Link>
        </div>
      </section>
    </>
  )
}
