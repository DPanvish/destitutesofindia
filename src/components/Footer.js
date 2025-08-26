import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Heart, Mail } from 'lucide-react';

/**
 * Footer Component
 * 
 * Provides the main footer for the application with navigation links,
 * brand information, and legal pages. Includes contact information
 * and copyright notice.
 * 
 * Features:
 * - Brand section with mission statement
 * - Quick navigation links
 * - Legal page links
 * - Contact information
 * - Responsive grid layout
 * - Copyright notice with dynamic year
 * 
 * Structure:
 * - Brand section (2 columns on desktop)
 * - Quick links (1 column)
 * - Legal links (1 column)
 * - Bottom section with copyright and contact
 */
const Footer = () => {
  // ===== UTILITY VARIABLES =====
  const currentYear = new Date().getFullYear();  // Dynamic copyright year

  // ===== RENDER =====
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Footer content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer grid layout - responsive columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section - spans 2 columns on desktop */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Camera className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">Destitutes of India</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Making the invisible visible. Join us in raising awareness about destitute individuals 
              across India through geotagged photos and community action.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Heart className="w-4 h-4 text-red-400" />
              <span>Built with compassion for a better India</span>
            </div>
          </div>

          {/* Quick navigation links section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and policy links section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright and contact info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Destitutes of India. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <a
                href="mailto:contact@destitutesofindia.com"
                className="flex items-center space-x-1 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                <span>contact@destitutesofindia.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
