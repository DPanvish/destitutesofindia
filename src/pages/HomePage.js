import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Users, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ImageFeed from '../components/ImageFeed';
import UploadModal from '../components/UploadModal';
import WelcomeBanner from '../components/WelcomeBanner';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

/**
 * Home Page Component
 * 
 * The main landing page of the application that showcases the mission,
 * displays photo feed, and provides call-to-action sections. Features
 * a hero section, statistics, and interactive elements for user engagement.
 * 
 * Features:
 * - Hero section with animated background elements
 * - Statistics display with glass morphism effects
 * - Call-to-action sections for authenticated/non-authenticated users
 * - Photo feed integration
 * - Upload modal integration
 * - Responsive design with modern animations
 * - Loading states for better UX
 * 
 * Sections:
 * 1. Hero Section - Main headline and mission statement
 * 2. Statistics Section - Key metrics display
 * 3. CTA Section - Call-to-action for photo sharing
 * 4. Photo Feed - Recent posts from users
 * 5. Upload Modal - Photo upload interface
 */
const HomePage = () => {
  // ===== HOOKS AND STATE =====
  const { currentUser } = useAuth();                    // Authentication context
  const [showUploadModal, setShowUploadModal] = useState(false);  // Upload modal visibility
  const [isLoading, setIsLoading] = useState(true);              // Page loading state

  // ===== EFFECTS =====
  
  /**
   * Simulates loading time for better user experience
   * Provides a smooth transition when the page loads
   */
  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);  // Cleanup timer on unmount
  }, []);

  // ===== EVENT HANDLERS =====
  
  /**
   * Handles camera button click for photo upload
   * Checks authentication status and shows appropriate feedback
   */
  const handleCameraClick = () => {
    if (!currentUser) {
      toast.error('Please sign in to upload photos');  // Show error for non-authenticated users
      return;
    }
    setShowUploadModal(true);  // Open upload modal for authenticated users
  };

  // ===== RENDER STATES =====
  
  // Loading state - show spinner while page initializes
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600 animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  // ===== MAIN RENDER =====
  
  return (
    // Main page container
    <div className="min-h-screen">
      {/* Hero Section with Enhanced Design */}
      <section className="hero-gradient relative overflow-hidden py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-10 animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Content container with relative positioning */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Centered content layout */}
          <div className="text-center">
            {/* Main headline with gradient text effect */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              <span className="text-gradient">Making the Invisible</span>
              <br />
              <span className="text-white">Visible</span>
            </h1>
            
            {/* Enhanced Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Join our mission to raise awareness about destitute individuals across India. 
              Every photo shared brings us closer to a more compassionate society.
            </p>

            {/* Interactive camera button for photo upload */}
            <div className="flex justify-center mb-12">
              <button
                onClick={handleCameraClick}
                className="camera-button group"
                disabled={!currentUser}
              >
                <Camera className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Statistics grid showing platform impact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass-card p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">1,247+</div>
                <div className="text-white/80">Photos Shared</div>
              </div>
              
              <div className="glass-card p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">89</div>
                <div className="text-white/80">Cities Covered</div>
              </div>
              
              <div className="glass-card p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">5,432+</div>
                <div className="text-white/80">Active Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Banner for Logged-in Users */}
      <WelcomeBanner 
        variant="large"
        showCTA={true}
        onCTAClick={handleCameraClick}
      />

      {/* Features section explaining how the platform works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to share and discover areas that need attention
            </p>
          </div>

          <div className="feature-grid">
            <div className="card text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Capture & Share</h3>
              <p className="text-gray-600 leading-relaxed">
                Take photos of destitute individuals you encounter and share them with precise location data through our secure platform.
              </p>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Map & Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Photos are automatically geotagged and displayed on our interactive map, creating a visual network of areas needing attention.
              </p>
            </div>

            <div className="card text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Act & Help</h3>
              <p className="text-gray-600 leading-relaxed">
                NGOs, volunteers, and concerned citizens can use this information to provide targeted assistance and support where it's needed most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-action section for photo sharing */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>Join the Movement</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Your <span className="text-gradient bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Photos</span> Can Change Lives
                </h2>
                <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                  Every image you capture and share brings us closer to a more compassionate society. 
                  Your contribution matters more than you know.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">1,247+</div>
                  <div className="text-white/70 text-sm">Photos Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">89</div>
                  <div className="text-white/70 text-sm">Cities Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">5,432+</div>
                  <div className="text-white/70 text-sm">Active Users</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCameraClick}
                  disabled={!currentUser}
                  className="group relative bg-gradient-to-r from-white to-gray-50 text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 hover:border-primary-300/30"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Start Sharing Photos
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm scale-105"></div>
                </button>
                <Link
                  to="/about"
                  className="group relative border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:shadow-lg"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Content - Visual Element */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Capture & Share</h3>
                        <p className="text-white/70 text-sm">Help make the invisible visible</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Geotag & Connect</h3>
                        <p className="text-white/70 text-sm">Precise location tracking</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-xl flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Act & Help</h3>
                        <p className="text-white/70 text-sm">Enable targeted assistance</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-r from-green-300 to-teal-300 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>

          {/* Additional CTA for non-authenticated users */}
          {!currentUser && (
            <div className="mt-16 text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Join Our Mission?
                </h3>
                <p className="text-white/90 mb-6">
                  Create an account and start making a difference today
                </p>
                <Link
                  to="/auth"
                  className="group inline-flex items-center bg-gradient-to-r from-white to-gray-50 text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-white/20 hover:border-primary-300/30"
                >
                  <span className="flex items-center">
                    <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Get Started Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

       {/* Main content section with conditional rendering */}
       <section className="py-20 bg-gradient-to-b from-white to-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!currentUser ? (
            <div className="text-center">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 rounded-full px-6 py-2 text-sm font-medium mb-6">
                  <Users className="w-4 h-4" />
                  <span>Join Thousands of Users</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Be Part of the <span className="text-gradient">Solution</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Every photo you share creates a ripple effect of compassion and awareness. 
                  Join our growing community of changemakers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/auth"
                    className="btn-primary inline-flex items-center px-8 py-4 text-lg"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    to="/about"
                    className="btn-secondary inline-flex items-center px-8 py-4 text-lg"
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 rounded-full px-6 py-2 text-sm font-medium mb-6">
                  <Camera className="w-4 h-4" />
                  <span>Community Gallery</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Recent <span className="text-gradient">Photos</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  See the latest photos shared by our community and the impact they're making
                </p>
              </div>
              <ImageFeed />
            </div>
          )}
        </div>
      </section>

      {/* Photo upload modal - conditionally rendered */}
      {showUploadModal && (
        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
