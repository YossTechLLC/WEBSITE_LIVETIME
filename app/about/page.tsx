import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Emily Buckalew - Georgia Real Estate Expert',
  description: 'Learn about Emily Buckalew, your trusted real estate professional in Georgia with over 15 years of experience helping clients find their dream homes.',
}

export default function About() {
  const achievements = [
    { year: '2023', title: 'Top Producer Award', organization: 'Georgia Realtors Association' },
    { year: '2022', title: 'Excellence in Service', organization: 'Atlanta Real Estate Board' },
    { year: '2021', title: 'Million Dollar Club', organization: 'National Association of Realtors' },
    { year: '2020', title: 'Customer Choice Award', organization: 'Georgia Real Estate Commission' },
  ]

  const values = [
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'Honest, transparent communication in every transaction.',
    },
    {
      icon: '💪',
      title: 'Dedication',
      description: 'Committed to achieving the best outcomes for my clients.',
    },
    {
      icon: '📚',
      title: 'Expertise',
      description: 'Deep knowledge of Georgia\'s real estate market.',
    },
    {
      icon: '❤️',
      title: 'Personal Touch',
      description: 'Every client receives personalized, attentive service.',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="heading-xl text-white mb-6">About Emily Buckalew</h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Your Trusted Partner in Georgia Real Estate
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 lg:h-full rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
              alt="Emily Buckalew"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="heading-md mb-6">Passionate About Helping You Find Home</h2>
            <div className="space-y-4 text-gray-700 text-lg">
              <p>
                Hello! I'm Emily Buckalew, and I've been helping families and individuals navigate the
                Georgia real estate market for over 15 years. Real estate isn't just a career for me—it's
                my passion and calling.
              </p>
              <p>
                Growing up in Georgia, I developed a deep appreciation for our state's diverse communities,
                from the bustling streets of Atlanta to the charming historic districts of Savannah. This
                intimate knowledge of the area, combined with my dedication to exceptional service, has
                helped me successfully guide over 500 clients to their dream homes.
              </p>
              <p>
                Whether you're a first-time homebuyer, looking to upgrade, or ready to sell your property,
                I bring expertise, market insight, and a personal touch to every transaction. My goal is
                simple: to make your real estate journey as smooth, successful, and stress-free as possible.
              </p>
              <p>
                When I'm not helping clients, you'll find me volunteering in our local community, exploring
                Georgia's beautiful parks with my family, or staying up-to-date on the latest market trends
                to better serve you.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/contact" className="btn-primary">
                Let's Work Together
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-gray-50 section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">My Core Values</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The principles that guide every interaction and transaction
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Background */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg mb-8 text-center">Professional Background</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-primary-700 mb-2">Education & Certifications</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Bachelor of Business Administration - University of Georgia</li>
                  <li>Licensed Real Estate Broker - Georgia Real Estate Commission</li>
                  <li>Certified Residential Specialist (CRS)</li>
                  <li>Accredited Buyer's Representative (ABR)</li>
                  <li>Seller Representative Specialist (SRS)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-700 mb-2">Professional Affiliations</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>National Association of Realtors (NAR)</li>
                  <li>Georgia Association of Realtors (GAR)</li>
                  <li>Atlanta Board of Realtors</li>
                  <li>Women's Council of Realtors</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-700 mb-2">Areas of Expertise</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Residential home buying and selling</li>
                  <li>First-time homebuyer assistance</li>
                  <li>Luxury property transactions</li>
                  <li>Investment property consultation</li>
                  <li>Relocation services</li>
                  <li>Market analysis and pricing strategies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="bg-gray-50 section-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Awards & Recognition</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Honored to be recognized for excellence in service
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                {achievement.year}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.organization}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700 text-white section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg text-white mb-6">Let's Start Your Real Estate Journey</h2>
          <p className="text-xl mb-8">
            Ready to buy or sell? I'm here to guide you every step of the way with expertise,
            dedication, and a personal touch.
          </p>
          <Link href="/contact" className="btn-secondary">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
