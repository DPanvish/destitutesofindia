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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mx-auto mb-4 loading-spinner"></div>
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
      <section className="relative py-20 overflow-hidden hero-gradient">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute w-20 h-20 bg-white rounded-full top-10 left-10 opacity-10 animate-float"></div>
        <div className="absolute w-16 h-16 bg-white rounded-full top-20 right-20 opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-12 h-12 bg-white rounded-full bottom-10 left-1/4 opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Content container with relative positioning */}
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Centered content layout */}
          <div className="text-center">
            {/* Main headline with gradient text effect */}
            <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl">
              <span className="text-gradient">Making the Invisible</span>
              <br />
              <span className="text-white">Visible</span>
            </h1>
            
            {/* Enhanced Subtitle */}
            <p className="max-w-3xl mx-auto mb-8 text-xl leading-relaxed md:text-2xl text-white/90">
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
                <Camera className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-white/20 group-hover:opacity-100"></div>
              </button>
            </div>

            {/* Statistics grid showing platform impact */}
            <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
              <div className="p-6 text-center transition-all duration-300 transform glass-card hover:scale-105">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-white/20">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div className="mb-2 text-3xl font-bold text-white">1,247+</div>
                <div className="text-white/80">Photos Shared</div>
              </div>
              
              <div className="p-6 text-center transition-all duration-300 transform glass-card hover:scale-105">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-white/20">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="mb-2 text-3xl font-bold text-white">89</div>
                <div className="text-white/80">Cities Covered</div>
              </div>
              
              <div className="p-6 text-center transition-all duration-300 transform glass-card hover:scale-105">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-white/20">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="mb-2 text-3xl font-bold text-white">5,432+</div>
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
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Our platform makes it easy to share and discover areas that need attention
            </p>
          </div>

          <div className="feature-grid">
            <div className="text-center card group">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-transform duration-300 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl group-hover:scale-110">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Capture & Share</h3>
              <p className="leading-relaxed text-gray-600">
                Take photos of destitute individuals you encounter and share them with precise location data through our secure platform.
              </p>
            </div>

            <div className="text-center card group">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-transform duration-300 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl group-hover:scale-110">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Map & Connect</h3>
              <p className="leading-relaxed text-gray-600">
                Photos are automatically geotagged and displayed on our interactive map, creating a visual network of areas needing attention.
              </p>
            </div>

            <div className="text-center card group">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-transform duration-300 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl group-hover:scale-110">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Act & Help</h3>
              <p className="leading-relaxed text-gray-600">
                NGOs, volunteers, and concerned citizens can use this information to provide targeted assistance and support where it's needed most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-action section for photo sharing */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-32 h-32 rounded-full top-10 left-10 bg-white/5 blur-xl animate-pulse"></div>
          <div className="absolute w-24 h-24 rounded-full top-20 right-20 bg-white/5 blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute w-20 h-20 rounded-full bottom-10 left-1/3 bg-white/5 blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute w-16 h-16 rounded-full bottom-20 right-1/4 bg-white/5 blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div className="space-y-8 text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 space-x-2 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm text-white/90">
                  <Sparkles className="w-4 h-4" />
                  <span>Join the Movement</span>
                </div>
                <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                  Your <span className="text-transparent text-gradient bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">Photos</span> Can Change Lives
                </h2>
                <p className="max-w-lg text-xl leading-relaxed text-white/90">
                  Every image you capture and share brings us closer to a more compassionate society. 
                  Your contribution matters more than you know.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="mb-1 text-3xl font-bold text-white">1,247+</div>
                  <div className="text-sm text-white/70">Photos Shared</div>
                </div>
                <div className="text-center">
                  <div className="mb-1 text-3xl font-bold text-white">89</div>
                  <div className="text-sm text-white/70">Cities Covered</div>
                </div>
                <div className="text-center">
                  <div className="mb-1 text-3xl font-bold text-white">5,432+</div>
                  <div className="text-sm text-white/70">Active Users</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={handleCameraClick}
                  disabled={!currentUser}
                  className="relative px-8 py-4 text-lg font-semibold transition-all duration-300 transform border shadow-lg group bg-gradient-to-r from-white to-gray-50 text-primary-600 rounded-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-white/20 hover:border-primary-300/30"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Camera className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    Start Sharing Photos
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl group-hover:opacity-100"></div>
                  <div className="absolute inset-0 transition-opacity duration-300 scale-105 opacity-0 bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl group-hover:opacity-100 blur-sm"></div>
                </button>
                <Link
                  to="/about"
                  className="relative px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border-2 group border-white/30 rounded-xl backdrop-blur-sm hover:bg-white/20 hover:border-white/50 hover:shadow-lg"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Content - Visual Element */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Card */}
                <div className="p-8 border shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl border-white/20">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Capture & Share</h3>
                        <p className="text-sm text-white/70">Help make the invisible visible</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Geotag & Connect</h3>
                        <p className="text-sm text-white/70">Precise location tracking</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-xl">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Act & Help</h3>
                        <p className="text-sm text-white/70">Enable targeted assistance</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute w-20 h-20 rounded-full -top-4 -right-4 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-20 animate-bounce"></div>
                <div className="absolute w-16 h-16 rounded-full -bottom-4 -left-4 bg-gradient-to-r from-blue-300 to-purple-300 opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute w-12 h-12 rounded-full top-1/2 -right-8 bg-gradient-to-r from-green-300 to-teal-300 opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>

          {/* Additional CTA for non-authenticated users */}
          {!currentUser && (
            <div className="mt-16 text-center">
              <div className="max-w-2xl p-8 mx-auto border bg-white/10 backdrop-blur-md rounded-2xl border-white/20">
                <h3 className="mb-4 text-2xl font-bold text-white">
                  Ready to Join Our Mission?
                </h3>
                <p className="mb-6 text-white/90">
                  Create an account and start making a difference today
                </p>
                <Link
                  to="/auth"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold transition-all duration-300 transform border shadow-lg group bg-gradient-to-r from-white to-gray-50 text-primary-600 rounded-xl hover:shadow-2xl hover:scale-105 border-white/20 hover:border-primary-300/30"
                >
                  <span className="flex items-center">
                    <Camera className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    Get Started Now
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

       {/* Main content section with conditional rendering */}
       <section className="py-20 bg-gradient-to-b from-white to-gray-50">
         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {!currentUser ? (
            <div className="text-center">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center px-6 py-2 mb-6 space-x-2 text-sm font-medium rounded-full bg-primary-100 text-primary-700">
                  <Users className="w-4 h-4" />
                  <span>Join Thousands of Users</span>
                </div>
                <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                  Be Part of the <span className="text-gradient">Solution</span>
                </h2>
                <p className="mb-8 text-xl leading-relaxed text-gray-600">
                  Every photo you share creates a ripple effect of compassion and awareness. 
                  Join our growing community of changemakers.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    to="/auth"
                    className="inline-flex items-center px-8 py-4 text-lg btn-primary"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center px-8 py-4 text-lg btn-secondary"
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
                <div className="inline-flex items-center px-6 py-2 mb-6 space-x-2 text-sm font-medium rounded-full bg-primary-100 text-primary-700">
                  <Camera className="w-4 h-4" />
                  <span>Community Gallery</span>
                </div>
                <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                  Recent <span className="text-gradient">Photos</span>
                </h2>
                <p className="max-w-2xl mx-auto text-xl text-gray-600">
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
