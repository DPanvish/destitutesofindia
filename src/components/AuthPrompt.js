import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight } from 'lucide-react';

/**
 * Authentication Prompt Component
 * 
 * A reusable component that prompts users to authenticate before
 * accessing certain features. Displays a call-to-action with
 * customizable title and description.
 * 
 * Features:
 * - Customizable title and description
 * - Call-to-action button linking to auth page
 * - Legal links (Terms of Service, Privacy Policy)
 * - Responsive design with centered layout
 * - Consistent styling with the app theme
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title text (default: "Join Our Mission")
 * @param {string} props.description - Description text (default: mission statement)
 */
const AuthPrompt = ({ title = "Join Our Mission", description = "Sign in to start sharing photos and helping raise awareness about destitute individuals in your community." }) => {
  // ===== RENDER =====
  
  return (
    {/* Main container with max width */}
    <div className="max-w-4xl mx-auto">
      {/* Card container with centered content */}
      <div className="card text-center">
        {/* Content section */}
        <div className="mb-8">
          {/* Icon container */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          {/* Title - customizable via props */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {/* Description - customizable via props */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Call-to-action button */}
        <Link
          to="/auth"
          className="btn-primary inline-flex items-center space-x-2 px-8 py-3 text-lg"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Legal disclaimer */}
        <p className="text-sm text-gray-500 mt-4">
          By signing in, you agree to our{' '}
          <Link to="/terms-of-service" className="text-primary-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy-policy" className="text-primary-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPrompt;
