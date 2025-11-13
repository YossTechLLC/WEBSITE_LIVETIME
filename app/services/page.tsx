import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Real Estate Services - Emily Buckalew',
  description: 'Comprehensive real estate services in Georgia including buying, selling, property management, and market analysis.',
}

export default function Services() {
  const mainServices = [
    {
      icon: '🏡',
      title: 'Home Buying Services',
      description: 'Finding your dream home shouldn\'t be stressful. I\'ll guide you through every step.',
      features: [
        'Personalized property search based on your needs',
        'Neighborhood and school district research',
        'Market analysis and property valuations',
        'Negotiation and offer preparation',
        'Inspection coordination and guidance',
        'Closing support and documentation review',
      ],
    },
    {
      icon: '💰',
      title: 'Home Selling Services',
      description: 'Get top dollar for your property with proven marketing strategies.',
      features: [
        'Comprehensive market analysis and pricing strategy',
        'Professional photography and virtual tours',
        'Strategic online and offline marketing',
        'Open house coordination',
        'Qualified buyer screening',
        'Expert negotiation to maximize your return',
      ],
    },
    {
      icon: '💼',
      title: 'Investment Property Consulting',
      description: 'Build wealth through smart real estate investments.',
      features: [
        'Investment property identification',
        'ROI analysis and financial projections',
        'Rental market analysis',
        'Portfolio diversification strategies',
        'Property management connections',
        'Tax advantage consultation',
      ],
    },
    {
      icon: '🔑',
      title: 'First-Time Homebuyer Program',
      description: 'Special support for those buying their first home.',
      features: [
        'Step-by-step guidance through the buying process',
        'First-time buyer program and grant information',
        'Mortgage lender recommendations',
        'Home inspection education',
        'Budget and affordability counseling',
        'Post-purchase support and resources',
      ],
    },
  ]

  const additionalServices = [
    {
      icon: '🚚',
      title: 'Relocation Services',
      description: 'Moving to Georgia? I\'ll help you find the perfect community and home.',
    },
    {
      icon: '📊',
      title: 'Market Analysis',
      description: 'Detailed market reports to help you make informed decisions.',
    },
    {
      icon: '🏘️',
      title: 'New Construction',
      description: 'Expert guidance through the new home building process.',
    },
    {
      icon: '⭐',
      title: 'Luxury Properties',
      description: 'Specialized service for high-end and luxury home transactions.',
    },
    {
      icon: '👥',
      title: 'Estate Sales',
      description: 'Compassionate support for estate and probate property sales.',
    },
    {
      icon: '🏗️',
      title: 'Commercial Real Estate',
      description: 'Commercial property buying, selling, and leasing assistance.',
    },
  ]

  const process = [
    {
      step: '01',
      title: 'Initial Consultation',
      description: 'We\'ll discuss your goals, needs, and timeline in a no-pressure meeting.',
    },
    {
      step: '02',
      title: 'Strategy Development',
      description: 'I\'ll create a customized plan tailored to your specific situation.',
    },
    {
      step: '03',
      title: 'Action & Execution',
      description: 'Whether buying or selling, I\'ll guide you through every detail.',
    },
    {
      step: '04',
      title: 'Successful Closing',
      description: 'Celebrate as we close the deal and achieve your real estate goals.',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="heading-xl text-white mb-6">Real Estate Services</h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Comprehensive solutions for all your real estate needs in Georgia
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">What I Offer</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Full-service real estate solutions tailored to your unique needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mainServices.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-200">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gray-50 section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Additional Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Specialized services to meet diverse real estate needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalServices.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">My Process</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A proven approach to successful real estate transactions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((item, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600 text-white font-bold text-2xl mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
              {index < process.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300" style={{ transform: 'translateX(-50%)' }}></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Me */}
      <section className="bg-gray-50 section-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Why Choose Emily Buckalew?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl mr-4">
                  📈
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Proven Track Record</h3>
                  <p className="text-gray-600">
                    Over 500 successful transactions and $200M+ in sales volume across Georgia.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl mr-4">
                  🎯
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Market Expertise</h3>
                  <p className="text-gray-600">
                    Deep knowledge of Georgia markets, neighborhoods, and property values.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl mr-4">
                  💬
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Clear Communication</h3>
                  <p className="text-gray-600">
                    Always available and responsive. You'll never wonder what's happening.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl mr-4">
                  ⚡
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Powerful Network</h3>
                  <p className="text-gray-600">
                    Connections with top lenders, inspectors, contractors, and other professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700 text-white section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Let's discuss how I can help you achieve your real estate goals. Schedule a free,
            no-obligation consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-secondary text-center">
              Schedule Consultation
            </Link>
            <Link href="/properties" className="btn-outline border-white text-white hover:bg-white hover:text-primary-700 text-center">
              View Properties
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
