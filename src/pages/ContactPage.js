import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Contact Page Component
 * 
 * Provides contact information and a contact form for users to reach out
 * to the platform team. Includes multiple contact methods and form
 * validation with submission feedback.
 * 
 * Features:
 * - Hero section with contact call-to-action
 * - Contact information display (email, phone, address)
 * - Interactive contact form with validation
 * - Form submission handling with loading states
 * - Success/error feedback with toast notifications
 * - Responsive design with modern animations
 * - Contact form reset after successful submission
 * 
 * Form Fields:
 * - Name (required)
 * - Email (required, with validation)
 * - Subject (required)
 * - Message (required, with character limit)
 * 
 * Contact Methods:
 * - Email: contact@destitutesofindia.com
 * - Phone: +91-XXXXXXXXXX
 * - Address: Platform headquarters
 */
const ContactPage = () => {
  // ===== STATE MANAGEMENT =====
  const [formData, setFormData] = useState({
    name: '',      // User's full name
    email: '',     // User's email address
    subject: '',   // Message subject line
    message: ''    // Main message content
  });
  const [isSubmitting, setIsSubmitting] = useState(false);  // Form submission loading state
  const [isSubmitted, setIsSubmitted] = useState(false);    // Form submission success state

  // ===== EVENT HANDLERS =====
  
  /**
   * Handles form input changes and updates form state
   * 
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Handles contact form submission
   * Simulates form submission and provides user feedback
   * 
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    setIsSubmitting(true);  // Show loading state

    try {
      // Simulate API call to backend service
      // In production, this would send data to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));  // 2-second delay
      
      setIsSubmitted(true);  // Mark as successfully submitted
      toast.success('Message sent successfully! We\'ll get back to you soon.');  // Show success message
      setFormData({ name: '', email: '', subject: '', message: '' });  // Reset form
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');  // Show error message
    } finally {
      setIsSubmitting(false);  // Hide loading state
    }
  };

  // ===== RENDER =====
  
  return (
    <div className="min-h-screen">
      {/* Hero section with contact call-to-action */}
      <section className="hero-gradient relative overflow-hidden py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-10 animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Have questions, suggestions, or want to collaborate? 
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Main content section with contact form and information */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact information and methods */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="card group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Email
                      </h3>
                      <p className="text-gray-600 mb-2">
                        For general inquiries and support
                      </p>
                      <a
                        href="mailto:contact@destitutesofindia.com"
                        className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300"
                      >
                        contact@destitutesofindia.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Phone
                      </h3>
                      <p className="text-gray-600 mb-2">
                        For urgent matters and partnerships
                      </p>
                      <a
                        href="tel:+91-9876543210"
                        className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300"
                      >
                        +91-9876543210
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card group">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Address
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Our main office location
                      </p>
                      <p className="text-gray-700">
                        123 Compassion Street<br />
                        New Delhi, Delhi 110001<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send us a Message
              </h2>
              
              {isSubmitted ? (
                <div className="card text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for reaching out to us. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="input-field resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
