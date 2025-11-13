import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const featuredProperties = [
    {
      id: 1,
      title: 'Modern Family Home in Atlanta',
      price: '$485,000',
      beds: 4,
      baths: 3,
      sqft: '2,850',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      location: 'Atlanta, GA',
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
    },
  ]

  const services = [
    {
      icon: '🏡',
      title: 'Home Buying',
      description: 'Find your perfect home with expert guidance through every step of the buying process.',
    },
    {
      icon: '💰',
      title: 'Home Selling',
      description: 'Get top dollar for your property with strategic marketing and proven sales techniques.',
    },
    {
      icon: '📊',
      title: 'Market Analysis',
      description: 'Comprehensive market insights to help you make informed real estate decisions.',
    },
    {
      icon: '🔑',
      title: 'Property Management',
      description: 'Full-service property management solutions for investment properties.',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="heading-xl text-white mb-6">
              Find Your Dream Home in Georgia
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8">
              With expertise, dedication, and a personal touch, I'll help you navigate the Georgia real estate market with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/properties" className="btn-secondary text-center">
                View Properties
              </Link>
              <Link href="/contact" className="btn-outline bg-white/10 border-white text-white hover:bg-white hover:text-primary-700 text-center">
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Homes Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">$200M+</div>
              <div className="text-gray-600">In Sales Volume</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Featured Properties</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore some of the finest homes currently available in Georgia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <div key={property.id} className="card">
              <div className="relative h-64">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-gold-500 text-white px-4 py-2 rounded-lg font-bold">
                  {property.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-4 flex items-center">
                  <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {property.location}
                </p>
                <div className="flex justify-between text-gray-700 border-t pt-4">
                  <span className="flex items-center">
                    <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {property.beds} beds
                  </span>
                  <span className="flex items-center">
                    <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                    {property.baths} baths
                  </span>
                  <span>{property.sqft} sqft</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/properties" className="btn-primary">
            View All Properties
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">How I Can Help</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive real estate services tailored to your unique needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-200">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">What Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take my word for it - hear from satisfied clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Sarah Johnson',
              text: 'Emily made buying our first home a breeze! Her knowledge of the Georgia market and dedication to finding the perfect property was outstanding.',
              rating: 5,
            },
            {
              name: 'Michael Davis',
              text: 'Sold our home in just 2 weeks thanks to Emily\'s expert marketing strategy. Couldn\'t be happier with the results!',
              rating: 5,
            },
            {
              name: 'Jennifer Martinez',
              text: 'Professional, responsive, and truly cares about her clients. Emily went above and beyond to help us find our dream home.',
              rating: 5,
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <p className="font-semibold text-gray-900">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700 text-white section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Whether you're buying, selling, or investing, I'm here to help you achieve your real estate goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-secondary text-center">
              Contact Me Today
            </Link>
            <Link href="/properties" className="btn-outline border-white text-white hover:bg-white hover:text-primary-700 text-center">
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
