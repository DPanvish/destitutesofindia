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
    <footer className="text-white bg-gray-900">
      {/* Footer content container */}
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Footer grid layout - responsive columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand section - spans 2 columns on desktop */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4 space-x-2">
              <Camera className="w-8 h-8 text-primary-400" />
              <span className="text-xl font-bold">Destitutes of India</span>
            </div>
            <p className="max-w-md mb-4 text-gray-300">
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
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and policy links section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-300 transition-colors duration-200 hover:text-white">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright and contact info */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Destitutes of India. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <a
                href="mailto:contact@destitutesofindia.com"
                className="flex items-center space-x-1 transition-colors duration-200 hover:text-white"
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
