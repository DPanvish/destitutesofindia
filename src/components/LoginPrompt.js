import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Camera, Shield, Users, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

/**
 * Login Prompt Component (Legacy)
 * 
 * This component was previously used for Google authentication on the home page.
 * It has been replaced by the dedicated AuthPage component for better UX.
 * 
 * Features:
 * - Google OAuth sign-in
 * - Feature highlights grid
 * - Toast notifications for feedback
 * - Responsive design
 * - Legal links
 * 
 * Note: This component is kept for reference but is no longer actively used
 * in the application. The AuthPage provides a more comprehensive authentication
 * experience with both Google and email/password options.
 */
const LoginPrompt = () => {
  // ===== HOOKS =====
  const { signInWithGoogle } = useAuth();  // Authentication context

  // ===== EVENT HANDLERS =====
  
  /**
   * Handles Google OAuth sign-in process
   * Shows success/error toast notifications
   */
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();  // Trigger Google OAuth flow
      toast.success('Successfully signed in!');  // Show success message
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Failed to sign in. Please try again.');  // Show error message
    }
  };

  // ===== RENDER =====
  
  return (
    {/* Main container with max width */}
    <div className="max-w-4xl mx-auto">
      {/* Card container with centered content */}
      <div className="card text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sign in with your Google account to start sharing photos and helping raise awareness 
            about destitute individuals in your community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-sm text-gray-600">
              Your data is protected with industry-standard security measures
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Community Driven</h3>
            <p className="text-sm text-gray-600">
              Join thousands of compassionate citizens making a difference
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <Heart className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Make an Impact</h3>
            <p className="text-sm text-gray-600">
              Every photo helps connect help with those who need it most
            </p>
          </div>
        </div>

        <button
          onClick={handleSignIn}
          className="btn-primary inline-flex items-center space-x-2 px-8 py-3 text-lg"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>

        <p className="text-sm text-gray-500 mt-4">
          By signing in, you agree to our{' '}
          <a href="/terms-of-service" className="text-primary-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy-policy" className="text-primary-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPrompt;
