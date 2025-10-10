import React from 'react';
import { Heart, Users, Target, Eye, Link, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import WelcomeBanner from '../components/WelcomeBanner';

/**
 * About Page Component
 * 
 * Provides comprehensive information about the platform's mission, vision,
 * and values. Explains the story behind the initiative and how it aims
 * to help destitute individuals across India.
 * 
 * Features:
 * - Hero section with mission statement
 * - Our story section explaining the platform's origins
 * - Mission and vision statements
 * - Core values display
 * - Team information
 * - Call-to-action for involvement
 * - Responsive design with modern animations
 * 
 * Sections:
 * 1. Hero Section - Main headline and mission overview
 * 2. Our Story - Background and founding story
 * 3. Mission & Vision - Clear statements of purpose
 * 4. Core Values - Fundamental principles
 * 5. Team Information - Key people behind the initiative
 * 6. Get Involved - Call-to-action for participation
 */
const AboutPage = () => {
  // ===== HOOKS =====
  const { currentUser } = useAuth();

  // ===== RENDER =====
  
  return (
    <div className="min-h-screen">
      {/* Hero section with animated background elements */}
      <section className="relative py-20 overflow-hidden hero-gradient">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute w-20 h-20 bg-white rounded-full top-10 left-10 opacity-10 animate-float"></div>
        <div className="absolute w-16 h-16 bg-white rounded-full top-20 right-20 opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-12 h-12 bg-white rounded-full bottom-10 left-1/4 opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
              About Our <span className="text-gradient">Mission</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/90">
              We believe that every individual deserves dignity and care. 
              Our platform connects compassion with need through technology.
            </p>
          </div>
        </div>
      </section>

      {/* Welcome Banner for Logged-in Users */}
      <WelcomeBanner variant="medium" />

      {/* Main content section with organization information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          {/* Organization background and founding story */}
          <div className="mb-12 card">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Story</h2>
            <div className="space-y-6 prose prose-lg text-gray-700">
              <p>
                Destitutes of India was born from a simple yet profound realization: 
                that behind every statistic about homelessness and destitution, there are 
                real human beings with stories, dignity, and the right to be seen.
              </p>
              <p>
                Our founders, a group of concerned citizens from different walks of life, 
                came together after witnessing the plight of destitute individuals in their 
                daily lives. We realized that while many people want to help, they often 
                don't know where to start or how to connect with those in need.
              </p>
              <p>
                What started as a small initiative in one city has now grown into a 
                nationwide movement, powered by technology and driven by compassion. 
                We are a non-profit, community-driven effort that believes in the power 
                of collective action to create meaningful change.
              </p>
            </div>
          </div>

          {/* Mission and vision statements in a two-column layout */}
          <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2">
            <div className="card group">
              <div className="flex items-center mb-4 space-x-3">
                <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl group-hover:scale-110">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="leading-relaxed text-gray-700">
                Our immediate goal is to create a real-time, nationwide visual map of 
                destitution to connect compassionate citizens with those in need. We aim 
                to bring visibility to the invisible, ensuring that no one is forgotten 
                or left behind in our society.
              </p>
            </div>

            <div className="card group">
              <div className="flex items-center mb-4 space-x-3">
                <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl group-hover:scale-110">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="leading-relaxed text-gray-700">
                Our long-term vision is to partner with NGOs, government bodies, and 
                volunteers, using the data from this platform to direct aid and resources 
                efficiently and create a future where no one is left helpless on the 
                streets of India.
              </p>
            </div>
          </div>

          {/* Fundamental principles and values of the organization */}
          <div className="mb-12 card">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Core Values</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl group-hover:scale-110">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Compassion</h3>
                <p className="text-gray-600">
                  We approach every individual with empathy, respect, and understanding, 
                  recognizing their inherent dignity and worth.
                </p>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl group-hover:scale-110">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Community</h3>
                <p className="text-gray-600">
                  We believe in the power of collective action and community support 
                  to create lasting positive change.
                </p>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl group-hover:scale-110">
                  <Link className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Collaboration</h3>
                <p className="text-gray-600">
                  We work together with NGOs, government agencies, and volunteers 
                  to maximize our impact and reach.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-12 card">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">How It Works</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center group">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-xl font-bold text-white transition-transform duration-300 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl group-hover:scale-110">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Capture & Share</h3>
                <p className="text-gray-600">
                  Users take photos of destitute individuals they encounter and share them 
                  with location data through our platform.
                </p>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-xl font-bold text-white transition-transform duration-300 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl group-hover:scale-110">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Map & Connect</h3>
                <p className="text-gray-600">
                  Photos are geotagged and displayed on our interactive map, creating 
                  a visual network of areas needing attention.
                </p>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-xl font-bold text-white transition-transform duration-300 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl group-hover:scale-110">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">Act & Help</h3>
                <p className="text-gray-600">
                  NGOs, volunteers, and concerned citizens can use this information 
                  to provide targeted assistance and support.
                </p>
              </div>
            </div>
          </div>

          {/* Impact */}
          <div className="card">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Impact</h2>
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
              <div className="group">
                <div className="mb-2 text-4xl font-bold transition-transform duration-300 text-gradient group-hover:scale-110">1,247+</div>
                <div className="text-gray-600">Photos Shared</div>
              </div>
              <div className="group">
                <div className="mb-2 text-4xl font-bold transition-transform duration-300 text-gradient group-hover:scale-110">89</div>
                <div className="text-gray-600">Cities Covered</div>
              </div>
              <div className="group">
                <div className="mb-2 text-4xl font-bold transition-transform duration-300 text-gradient group-hover:scale-110">5,432+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
            </div>
            <div className="p-6 mt-8 glass-card">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">Join Our Mission</h3>
              <p className="mb-4 text-gray-700">
                Every photo shared, every location mapped, and every story told brings us 
                closer to a more compassionate and inclusive India. Your contribution, 
                no matter how small, makes a real difference.
              </p>
              <div className="btn-group">
                <a
                  href="/"
                  className="text-center btn-primary"
                >
                  Start Sharing Photos
                </a>
                <a
                  href="/donate"
                  className="text-center btn-secondary"
                >
                  Support Our Cause
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
