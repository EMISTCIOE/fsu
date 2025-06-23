import type React from "react"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

const ContactPage: React.FC = () => {
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions, suggestions, or need assistance? We're here to help! Reach out to us using any of the
            contact methods below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Office Address</h3>
                    <p className="text-gray-600">
                      FSU Office, Thapathali Campus
                      <br />
                      Thapathali, Kathmandu
                      <br />
                      Nepal
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-600">+977 9849132787</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-600">fsu@tcioe.edu.np</p>
                    <p className="text-gray-600">info.fsu@tcioe.edu.np</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Clock className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Office Hours</h3>
                    <p className="text-gray-600">
                      Sunday - Friday: 10:00 AM - 4:00 PM
                      <br />
                      Saturday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-medium mb-3">Connect with us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-200 hover:bg-primary hover:text-white p-2 rounded-full transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-200 hover:bg-primary hover:text-white p-2 rounded-full transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-200 hover:bg-primary hover:text-white p-2 rounded-full transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section - Now takes up 2/3 of the space */}
          <div className="lg:col-span-2">
            <div className="card overflow-hidden h-full">
              {/* Embedded Map - Now taller */}
              <div className="h-96 lg:h-[500px]">
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4448.140225565396!2d85.3162511761874!3d27.69403942607703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19ae08c068d9%3A0x475bed1f66d060c!2sIOE%2C%20Thapathali%20Campus!5e0!3m2!1sen!2snp!4v1750094268273!5m2!1sen!2snp'                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Campus Map"
                ></iframe>
              </div>

              {/* Location Details */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Find Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Campus Location</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Thapathali Campus is located in the heart of Kathmandu, easily accessible by public
                      transportation. The FSU office is located within the campus premises.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-2 text-primary" />
                        <span>Near Thapathali Bridge</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin size={14} className="mr-2 text-primary" />
                        <span>5 minutes walk from Thapathali Bus Stop</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Transportation</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <strong>By Bus:</strong> Take any bus going to Thapathali and get off at Thapathali Bus Stop
                      </p>
                      <p>
                        <strong>By Taxi:</strong> Ask the driver to take you to "IOE Thapathali Campus"
                      </p>
                      <p>
                        <strong>By Private Vehicle:</strong> Parking is available within the campus premises
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="section-title text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-2">What are the office hours of FSU?</h3>
              <p className="text-gray-600">
                The FSU office is open Sunday through Friday from 10:00 AM to 4:00 PM. We are closed on Saturdays and
                public holidays.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-2">How can I join the FSU committee?</h3>
              <p className="text-gray-600">
                FSU committee members are elected through campus-wide elections held every two years. To contest in the
                elections, you must be a registered student of Thapathali Campus.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-2">How long does it take to get a response to my suggestion?</h3>
              <p className="text-gray-600">
                We typically review suggestions within 5-7 working days. For urgent matters, we recommend visiting the
                FSU office in person or contacting us by phone.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-2">Can FSU help with academic issues?</h3>
              <p className="text-gray-600">
                Yes, FSU can provide guidance and support for various academic issues, including course registration
                problems, exam-related concerns, and student-teacher disputes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
