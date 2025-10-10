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
   * Validates form data before submission
   * 
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return false;
    }
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.subject.trim()) {
      toast.error('Please enter a subject');
      return false;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return false;
    }
    if (formData.message.length < 10) {
      toast.error('Message must be at least 10 characters long');
      return false;
    }
    return true;
  };

  /**
   * Handles contact form submission
   * Sends form data to Web3Forms service
   * 
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);  // Show loading state

    try {
      // Prepare form data for Web3Forms
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', '4d4f42a6-12b9-4131-a3f9-5e24b198c5d4');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('from_name', formData.name);
      formDataToSend.append('replyto', formData.email);

      // Send form data to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);  // Mark as successfully submitted
        toast.success('Message sent successfully! We\'ll get back to you soon.');  // Show success message
        setFormData({ name: '', email: '', subject: '', message: '' });  // Reset form
        console.log('Form submitted successfully:', result);
      } else {
        throw new Error('Form submission failed');
      }
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
      <section className="relative py-20 overflow-hidden hero-gradient">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute w-20 h-20 bg-white rounded-full top-10 left-10 opacity-10 animate-float"></div>
        <div className="absolute w-16 h-16 bg-white rounded-full top-20 right-20 opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-12 h-12 bg-white rounded-full bottom-10 left-1/4 opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/90">
              Have questions, suggestions, or want to collaborate? 
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Main content section with contact form and information */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact information and methods */}
            <div>
              <h2 className="mb-8 text-3xl font-bold text-gray-900">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="card group">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform duration-300 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl group-hover:scale-110">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-gray-900">
                        Email
                      </h3>
                      <p className="mb-2 text-gray-600">
                        For general inquiries and support
                      </p>
                      <a
                        href="mailto:contact@destitutesofindia.com"
                        className="font-medium transition-colors duration-300 text-primary-600 hover:text-primary-700"
                      >
                        contact@destitutesofindia.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card group">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform duration-300 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl group-hover:scale-110">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-gray-900">
                        Phone
                      </h3>
                      <p className="mb-2 text-gray-600">
                        For urgent matters and partnerships
                      </p>
                      <a
                        href="tel:+91-9876543210"
                        className="font-medium transition-colors duration-300 text-primary-600 hover:text-primary-700"
                      >
                        +91-9876543210
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card group">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform duration-300 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl group-hover:scale-110">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold text-gray-900">
                        Address
                      </h3>
                      <p className="mb-2 text-gray-600">
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
              <h2 className="mb-8 text-3xl font-bold text-gray-900">
                Send us a Message
              </h2>
              
              {isSubmitted ? (
                <div className="text-center card">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Message Sent Successfully!
                  </h3>
                  <p className="mb-4 text-gray-600">
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
                      className="resize-none input-field"
                      placeholder="Tell us more about your inquiry..."
                      maxLength={1000}
                    />
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        Minimum 10 characters required
                      </span>
                      <span className="text-xs text-gray-500">
                        {formData.message.length}/1000
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center w-full space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
