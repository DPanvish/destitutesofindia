import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

/**
 * Protected Route Component
 * 
 * This component ensures that users have completed their profile
 * before accessing certain pages or features. If the user's profile
 * is not complete, they are redirected to the profile completion page.
 * 
 * Features:
 * - Checks if user is authenticated
 * - Checks if user profile is complete
 * - Redirects to appropriate page based on user state
 * - Handles loading states gracefully
 */

const ProtectedRoute = ({ children, requireProfile = true }) => {
  const { currentUser, userProfile, loading, isProfileComplete } = useAuth();

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to auth page
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  // If profile completion is required and profile is not complete, redirect to profile completion
  if (requireProfile && !isProfileComplete()) {
    return <Navigate to="/complete-profile" replace />;
  }

  // If all checks pass, render the protected content
  return children;
};

export default ProtectedRoute;
