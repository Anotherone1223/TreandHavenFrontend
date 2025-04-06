import React, { useState } from 'react'
import { Send, Mail, Phone, MapPin, CheckCircle, Globe, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2';



const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      import.meta.env.VITE_APP_SERVICE_ID,
      import.meta.env.VITE_APP_TEMPLATE_ID,
      formData,
      import.meta.env.VITE_APP_PUBLIC_KEY)

      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);

        // Show SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Mail Sent!',
          text: 'Your message has been sent successfully.',
          timer: 2500,
          showConfirmButton: false,
        });


        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((err) => {
        console.error("FAILED...", err)

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to send message. Please try again later!',
        });
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="min-h-screen  from-blue-50 via-indigo-50 to-purple-50 dark:bg-[#1a202c]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              We're here to help and answer any questions you might have
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 -mt-16 relative z-10 ">
        <div className="grid md:grid-cols-3 gap-8 ">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Mail className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Email Us</h3>
                    <p className="text-blue-600 hover:text-blue-700 transition-colors">
                      TreandHaven@Support.com
                    </p>
                    <p className="text-gray-500 mt-1 text-sm">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <Phone className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Call Us</h3>
                    <p className="text-green-600 hover:text-green-700 transition-colors">
                      +91 90909 89890
                    </p>
                    <p className="text-gray-500 mt-1 text-sm">
                      Mon-Fri from 8am to 6pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <MapPin className="text-purple-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Visit Us</h3>
                    <p className="text-purple-600">123 Business Ave</p>
                    <p className="text-gray-500">Gujrat,India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 rounded-full p-3">
                    <Globe className="text-orange-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Global Support</h3>
                    <p className="text-gray-500 mt-1 text-sm">
                      Available in multiple languages
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 rounded-full p-3">
                    <Clock className="text-red-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Business Hours</h3>
                    <p className="text-gray-500 mt-1 text-sm">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 3:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none group-hover:border-gray-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none group-hover:border-gray-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 group">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none group-hover:border-gray-300"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 outline-none group-hover:border-gray-300 resize-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                  <Send className="ml-3 h-5 w-5" />
                </button>

                {isSubmitted && (
                  <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Message sent successfully!</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact