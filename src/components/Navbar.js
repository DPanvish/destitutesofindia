import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Camera, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Navigation Bar Component
 * 
 * This component provides the main navigation interface for the application.
 * It includes the logo, navigation links, user authentication status,
 * and responsive mobile menu functionality.
 * 
 * Features:
 * - Responsive design with mobile hamburger menu
 * - Dynamic background based on scroll position
 * - User authentication status display
 * - Active page highlighting
 * - Smooth animations and transitions
 * - Glass morphism effects
 */
const Navbar = () => {
  // ===== HOOKS AND STATE =====
  const { currentUser, userProfile, logout } = useAuth();  // Authentication context
  const [isOpen, setIsOpen] = useState(false);        // Mobile menu open state
  const [isScrolled, setIsScrolled] = useState(false); // Scroll position state
  const location = useLocation();                      // Current route location

  // ===== SCROLL EFFECT =====
  
  /**
   * Monitors scroll position to change navbar background
   * Adds glass effect when user scrolls down
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);  // Enable glass effect after 10px scroll
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ===== EVENT HANDLERS =====
  
  /**
   * Handles user logout and closes mobile menu
   */
  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);  // Close mobile menu after logout
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  /**
   * Checks if a navigation link is active (current page)
   * 
   * @param {string} path - Route path to check
   * @returns {boolean} True if path matches current location
   */
  const isActive = (path) => location.pathname === path;

  // ===== RENDER =====
  
  return (
    // Main navigation container with dynamic background
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass backdrop-blur-md border-b border-white/20'  // Glass effect when scrolled
        : 'bg-transparent'                                   // Transparent when at top
    }`}>
      {/* Navigation content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation bar layout */}
        <div className="flex justify-between items-center h-16">
          {/* Brand logo and name */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-primary-200 transition-colors duration-300">
              Destitutes of India
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`nav-link text-white hover:text-primary-200 transition-all duration-300 ${
                isActive('/') ? 'text-primary-200' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`nav-link text-white hover:text-primary-200 transition-all duration-300 ${
                isActive('/about') ? 'text-primary-200' : ''
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`nav-link text-white hover:text-primary-200 transition-all duration-300 ${
                isActive('/contact') ? 'text-primary-200' : ''
              }`}
            >
              Contact
            </Link>
            <Link
              to="/donate"
              className={`nav-link text-white hover:text-primary-200 transition-all duration-300 ${
                isActive('/donate') ? 'text-primary-200' : ''
              }`}
            >
              Donate
            </Link>

            {/* User Menu */}
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">
                      Welcome, {userProfile?.username || currentUser.displayName || 'User'}!
                    </span>
                    <span className="text-white/70 text-xs">
                      {currentUser.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-white hover:text-primary-200 transition-colors duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="btn-primary flex items-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary-200 transition-colors duration-300"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="glass-card mt-4 p-6 space-y-4">
              <Link
                to="/"
                className={`block text-white hover:text-primary-200 transition-colors duration-300 ${
                  isActive('/') ? 'text-primary-200' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`block text-white hover:text-primary-200 transition-colors duration-300 ${
                  isActive('/about') ? 'text-primary-200' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`block text-white hover:text-primary-200 transition-colors duration-300 ${
                  isActive('/contact') ? 'text-primary-200' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/donate"
                className={`block text-white hover:text-primary-200 transition-colors duration-300 ${
                  isActive('/donate') ? 'text-primary-200' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                Donate
              </Link>

              {/* Mobile User Menu */}
              {currentUser ? (
                <div className="pt-4 border-t border-white/20 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-medium">
                        Welcome, {userProfile?.username || currentUser.displayName || 'User'}!
                      </span>
                      <span className="text-white/70 text-xs">
                        {currentUser.email}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-white hover:text-primary-200 transition-colors duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="btn-primary flex items-center justify-center space-x-2 w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Camera className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
