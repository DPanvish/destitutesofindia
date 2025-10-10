import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Camera, Shield, Users, Heart, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

/**
 * Authentication Page Component
 * 
 * Provides a comprehensive authentication interface with both Google OAuth
 * and email/password authentication options. Supports both sign-in and
 * sign-up functionality with form validation and error handling.
 * 
 * Features:
 * - Google OAuth authentication
 * - Email/password authentication
 * - Toggle between sign-in and sign-up modes
 * - Form validation with user-friendly error messages
 * - Password visibility toggle
 * - Loading states and toast notifications
 * - Responsive design with modern UI
 * - Automatic navigation after successful authentication
 * 
 * Authentication Methods:
 * 1. Google OAuth - One-click sign-in with Google account
 * 2. Email/Password - Traditional authentication with validation
 * 
 * Form Validation:
 * - Password confirmation matching (sign-up only)
 * - Minimum password length (6 characters)
 * - Email format validation
 * - Firebase error code handling
 */
const AuthPage = () => {
  // ===== HOOKS AND STATE =====
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, isProfileComplete } = useAuth();  // Authentication methods
  const [isSignUp, setIsSignUp] = useState(false);                          // Toggle between sign-in/sign-up
  const [showPassword, setShowPassword] = useState(false);                  // Password visibility toggle
  const [formData, setFormData] = useState({
    email: '',           // User email input
    password: '',        // User password input
    confirmPassword: ''  // Password confirmation (sign-up only)
  });
  const [isLoading, setIsLoading] = useState(false);  // Loading state for authentication
  const navigate = useNavigate();                     // Navigation hook

  // ===== EVENT HANDLERS =====
  
  /**
   * Handles form input changes and updates form state
   * 
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value  // Update specific field by name
    });
  };

  /**
   * Handles Google OAuth sign-in process
   * Shows loading state and navigates to home page on success
   */
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);  // Show loading state
      await signInWithGoogle();  // Trigger Google OAuth
      toast.success('Successfully signed in with Google!');  // Show success message
      
      // Check if profile is complete, if not redirect to profile completion
      if (!isProfileComplete()) {
        navigate('/complete-profile');
      } else {
        navigate('/');  // Navigate to home page
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      toast.error('Failed to sign in with Google. Please try again.');  // Show error message
    } finally {
      setIsLoading(false);  // Hide loading state
    }
  };

  /**
   * Handles email/password authentication (sign-in and sign-up)
   * Includes form validation and Firebase error handling
   * 
   * @param {Event} e - Form submit event
   */
  const handleEmailAuth = async (e) => {
    e.preventDefault();  // Prevent form submission
    

    
    // Password confirmation validation (sign-up only)
    if (isSignUp && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Password length validation
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      setIsLoading(true);  // Show loading state
      
      // Handle sign-up or sign-in based on current mode
      if (isSignUp) {
        await signUpWithEmail(formData.email, formData.password);
        toast.success('Account created successfully!');
        // For new registrations, always redirect to profile completion
        navigate('/complete-profile');
      } else {
        await signInWithEmail(formData.email, formData.password);
        toast.success('Successfully signed in!');
        // Check if profile is complete for existing users
        if (!isProfileComplete()) {
          navigate('/complete-profile');
        } else {
          navigate('/');  // Navigate to home page
        }
      }
    } catch (error) {
      console.error('Email auth error:', error);
      
      // Handle specific Firebase error codes with user-friendly messages
      const errorMessage = error.code === 'auth/email-already-in-use' 
        ? 'An account with this email already exists'
        : error.code === 'auth/user-not-found'
        ? 'No account found with this email'
        : error.code === 'auth/wrong-password'
        ? 'Incorrect password'
        : 'Authentication failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);  // Hide loading state
    }
  };

  // ===== RENDER =====
  
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-primary-50 to-secondary-50 sm:px-6 lg:px-8">
      {/* Authentication form container */}
      <div className="w-full max-w-md space-y-8">
        {/* Page header with logo and title */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100">
              <Camera className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600">
            {isSignUp 
              ? 'Join our mission to make the invisible visible'
              : 'Sign in to continue your journey'
            }
          </p>
        </div>

        {/* Google OAuth sign-in button */}
        <div>
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="inline-flex items-center justify-center w-full px-6 py-3 space-x-2 text-lg btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
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
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-gradient-to-br from-primary-50 to-secondary-50">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full py-3 pl-10 pr-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your email"
              />
            </div>
          </div>



          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full py-3 pl-10 pr-10 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full py-3 pl-10 pr-10 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-lg btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        {/* Toggle Sign In/Sign Up */}
        <div className="text-center">
          <p className="text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-4 mt-8">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-primary-600" />
            <span className="text-sm text-gray-600">Secure & Private</span>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-primary-600" />
            <span className="text-sm text-gray-600">Join our community</span>
          </div>
          <div className="flex items-center space-x-3">
            <Heart className="w-5 h-5 text-primary-600" />
            <span className="text-sm text-gray-600">Make a real impact</span>
          </div>
        </div>

        {/* Terms */}
        <p className="text-xs text-center text-gray-500">
          By continuing, you agree to our{' '}
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

export default AuthPage;
