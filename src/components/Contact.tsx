import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  packageType: string;
  travelDate: string;
  comments: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    packageType: '',
    travelDate: '',
    comments: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Use the deployed Vercel API for both development and production
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'https://nathir-travels-site-donz.vercel.app/api/send'  // Your deployed Vercel API
        : '/api/send'; // Vercel API route for production
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Your booking request has been sent successfully! We will contact you soon.');
        setMessageType('success');
        setFormData({ name: '', email: '', packageType: '', travelDate: '', comments: '' });
      } else {
        setMessage(data.message || 'There was an error sending your request.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      setMessage('Unable to connect to server. Please try again later or contact us directly at nathirtravels25@gmail.com');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-500 mb-2">For Inquiries</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Next Adventure
          </h2>
          <p className="text-xl text-gray-600">
            Ready to explore East Africa? Fill out the form below and we'll help you plan the perfect trip.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="packageType" className="block text-sm font-semibold text-gray-700 mb-2">
                Package Type *
              </label>
              <select
                id="packageType"
                name="packageType"
                value={formData.packageType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
              >
                <option value="">Select Package Type</option>
                <option value="Flight">Flight</option>
                <option value="Hotel">Hotel</option>
                <option value="Safari">Safari Tour</option>
                <option value="Flight + Hotel">Flight + Hotel Package</option>
                <option value="Flight + Safari">Flight + Safari Package</option>
                <option value="Hotel + Safari">Hotel + Safari Package</option>
                <option value="Complete Package">Complete Package (Flight + Hotel + Safari)</option>
              </select>
            </div>

            <div>
              <label htmlFor="travelDate" className="block text-sm font-semibold text-gray-700 mb-2">
                Travel Date *
              </label>
              <input
                type="date"
                id="travelDate"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="comments" className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Details
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 resize-none"
                placeholder="Tell us about your travel preferences, special requirements, or any questions you have..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 transform hover:scale-[1.02] disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              {isSubmitting ? 'Sending Request...' : 'Send Request'}
            </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
              messageType === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {messageType === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <p className="font-medium">{message}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;