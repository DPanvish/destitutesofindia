import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { User, Phone, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

/**
 * User Profile Completion Component
 * 
 * This component is displayed after successful user registration to collect
 * additional user information like username and phone number. It ensures
 * we have complete user profile data for better user experience.
 * 
 * Features:
 * - Username input with validation
 * - Phone number input with validation
 * - Stores data in Firestore
 * - Automatic navigation after completion
 * - Form validation and error handling
 * - Loading states and user feedback
 */

const UserProfileCompletion = () => {
  // ===== HOOKS AND STATE =====
  const { currentUser, userProfile, isProfileComplete } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: userProfile?.username || '',
    phoneNumber: userProfile?.phoneNumber || ''
  });

  // Update form data when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setFormData({
        username: userProfile.username || '',
        phoneNumber: userProfile.phoneNumber || ''
      });
    }
  }, [userProfile]);

  // Redirect if user already has complete profile
  useEffect(() => {
    if (isProfileComplete()) {
      navigate('/');
    }
  }, [isProfileComplete, navigate]);

  // ===== EVENT HANDLERS =====

  /**
   * Handles form input changes and updates form state
   * 
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'username') {
      // Remove spaces and special characters for username
      const cleanUsername = value.replace(/[^a-zA-Z0-9_]/g, '');
      setFormData({
        ...formData,
        [name]: cleanUsername
      });
    } else if (name === 'phoneNumber') {
      // Only allow digits for phone number
      const cleanPhone = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [name]: cleanPhone
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  /**
   * Checks if a username is already taken
   * 
   * @param {string} username - Username to check
   * @returns {Promise<boolean>} True if username is taken, false otherwise
   */
  const isUsernameTaken = async (username) => {
    try {
      const q = query(
        collection(db, 'users'),
        where('username', '==', username.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  };

  /**
   * Validates the form data before submission
   * 
   * @returns {Promise<boolean>} True if validation passes, false otherwise
   */
  const validateForm = async () => {
    // Username validation
    if (!formData.username.trim()) {
      toast.error('Username is required');
      return false;
    }

    if (formData.username.length < 3) {
      toast.error('Username must be at least 3 characters long');
      return false;
    }

    if (formData.username.length > 20) {
      toast.error('Username must be less than 20 characters');
      return false;
    }

    // Check if username is already taken (only if it's different from current)
    if (formData.username.toLowerCase() !== userProfile?.username?.toLowerCase()) {
      const isTaken = await isUsernameTaken(formData.username);
      if (isTaken) {
        toast.error('Username is already taken. Please choose another one.');
        return false;
      }
    }

    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      toast.error('Phone number is required');
      return false;
    }

    // Phone number length validation (10 digits)
    if (formData.phoneNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }

    return true;
  };

  /**
   * Handles form submission to save user profile data
   * 
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(await validateForm())) {
      return;
    }

    try {
      setIsLoading(true);

      // Create user profile document in Firestore
      const userProfileData = {
        uid: currentUser.uid,
        email: currentUser.email,
        username: formData.username.trim().toLowerCase(), // Store as lowercase for consistency
        phoneNumber: formData.phoneNumber, // Already cleaned during input
        displayName: currentUser.displayName || formData.username.trim(),
        photoURL: currentUser.photoURL || null,
        createdAt: userProfile?.createdAt || new Date(),
        updatedAt: new Date(),
        isProfileComplete: true
      };

      // Save to Firestore
      await setDoc(doc(db, 'users', currentUser.uid), userProfileData);

      toast.success('Profile completed successfully!');
      navigate('/'); // Navigate to home page
    } catch (error) {
      console.error('Error saving user profile:', error);
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ===== RENDER =====

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Complete Your Profile
          </h2>
          <p className="text-gray-600">
            Help us personalize your experience by providing a few more details
          </p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Choose a username"
                maxLength={20}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This will be your display name on the platform
            </p>
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="10-digit phone number"
                maxLength={10}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              We'll use this for important updates and verification
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary inline-flex items-center justify-center space-x-2 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isLoading ? 'Saving...' : 'Complete Profile'}</span>
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        {/* Skip Option */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Skip for now
          </button>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Why we need this information:</strong>
          </p>
          <ul className="text-sm text-blue-700 mt-2 space-y-1">
            <li>• Username helps personalize your experience</li>
            <li>• Phone number enables important updates and verification</li>
            <li>• Your data is secure and will never be shared</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCompletion;
