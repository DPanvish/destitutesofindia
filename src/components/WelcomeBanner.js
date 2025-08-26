import React from 'react';
import { Users, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Welcome Banner Component
 * 
 * A reusable component that displays a welcome message for logged-in users.
 * Can be customized with different variants and call-to-action buttons.
 * 
 * Features:
 * - Displays user's display name
 * - Customizable welcome message
 * - Optional call-to-action button
 * - Responsive design
 * - Different size variants
 * 
 * Props:
 * - variant: 'large' | 'medium' | 'small' - Controls banner size
 * - showCTA: boolean - Whether to show call-to-action button
 * - ctaText: string - Custom CTA button text
 * - ctaIcon: React component - Custom CTA button icon
 * - onCTAClick: function - CTA button click handler
 * - message: string - Custom welcome message
 */
const WelcomeBanner = ({ 
  variant = 'medium', 
  showCTA = false, 
  ctaText = 'Share a Photo',
  ctaIcon = Camera,
  onCTAClick,
  message = null
}) => {
  const { currentUser } = useAuth();

  // Don't render if no user is logged in
  if (!currentUser) return null;

  // Variant configurations
  const variants = {
    large: {
      container: 'py-8',
      iconSize: 'w-10 h-10',
      iconInner: 'w-5 h-5',
      title: 'text-2xl md:text-3xl',
      message: 'text-lg',
      spacing: 'mb-2'
    },
    medium: {
      container: 'py-6',
      iconSize: 'w-8 h-8',
      iconInner: 'w-4 h-4',
      title: 'text-xl md:text-2xl',
      message: 'text-base',
      spacing: 'mb-2'
    },
    small: {
      container: 'py-4',
      iconSize: 'w-6 h-6',
      iconInner: 'w-3 h-3',
      title: 'text-lg md:text-xl',
      message: 'text-sm',
      spacing: 'mb-1'
    }
  };

  const config = variants[variant];

  // Default messages based on variant
  const defaultMessages = {
    large: 'Ready to make a difference? Share a photo to help raise awareness about destitute individuals in your area.',
    medium: 'Thank you for being part of our mission to make the invisible visible.',
    small: 'Welcome back!'
  };

  const displayMessage = message || defaultMessages[variant];

  return (
    <section className={`bg-gradient-to-r from-primary-600 to-primary-700 ${config.container}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className={`flex items-center justify-center space-x-3 ${config.spacing}`}>
            <div className={`${config.iconSize} bg-white/20 rounded-full flex items-center justify-center`}>
              <Users className={`${config.iconInner} text-white`} />
            </div>
            <h3 className={`${config.title} font-bold text-white`}>
              Welcome, {currentUser.displayName || 'User'}! 👋
            </h3>
          </div>
          <p className={`text-white/90 ${config.message} max-w-2xl mx-auto`}>
            {displayMessage}
          </p>
          {showCTA && onCTAClick && (
            <div className="mt-4">
              <button
                onClick={onCTAClick}
                className="inline-flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                {React.createElement(ctaIcon, { className: 'w-5 h-5' })}
                <span>{ctaText}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
