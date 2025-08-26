import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase/config';

/**
 * Authentication Context
 * 
 * This context provides authentication state and methods throughout the application.
 * It manages user authentication using Firebase Auth and provides a clean API
 * for components to access authentication functionality.
 * 
 * Features:
 * - Google OAuth authentication
 * - Email/password authentication
 * - User registration
 * - Automatic authentication state management
 * - Loading states for better UX
 */

// Create React context for authentication
const AuthContext = createContext();

/**
 * Custom hook to access authentication context
 * Provides easy access to auth methods and current user state
 * 
 * @returns {Object} Authentication context value
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Authentication Provider Component
 * 
 * Provides authentication context to all child components.
 * Manages user authentication state and provides authentication methods.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 */
export function AuthProvider({ children }) {
  // ===== STATE MANAGEMENT =====
  const [currentUser, setCurrentUser] = useState(null);  // Current authenticated user
  const [userProfile, setUserProfile] = useState(null);  // User profile data from Firestore
  const [loading, setLoading] = useState(true);         // Loading state during auth check

  // ===== AUTHENTICATION METHODS =====
  
  /**
   * Signs in user with Google OAuth
   * Opens a popup for Google authentication
   * 
   * @returns {Promise} Firebase auth result
   */
  function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  /**
   * Signs in user with email and password
   * 
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise} Firebase auth result
   */
  function signInWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  /**
   * Creates a new user account with email and password
   * 
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise} Firebase auth result
   */
  function signUpWithEmail(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  /**
   * Signs out the current user
   * 
   * @returns {Promise} Firebase auth result
   */
  function logout() {
    return signOut(auth);
  }

  /**
   * Updates the current user's profile information
   * 
   * @param {Object} profileData - Profile data to update
   * @param {string} profileData.displayName - User's display name
   * @param {string} profileData.photoURL - User's photo URL
   * @returns {Promise} Firebase auth result
   */
  function updateUserProfile(profileData) {
    if (!currentUser) {
      throw new Error('No user is currently signed in');
    }
    return updateProfile(currentUser, profileData);
  }

  /**
   * Fetches user profile data from Firestore
   * 
   * @param {string} uid - User ID
   * @returns {Promise<Object|null>} User profile data or null if not found
   */
  async function fetchUserProfile(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  /**
   * Checks if the current user has a complete profile
   * 
   * @returns {boolean} True if profile is complete, false otherwise
   */
  function isProfileComplete() {
    return userProfile && userProfile.isProfileComplete;
  }

  // ===== AUTHENTICATION STATE MANAGEMENT =====
  
  /**
   * Listen for authentication state changes
   * Updates currentUser state when user signs in/out
   * Only renders children when authentication check is complete
   */
  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);  // Update current user state
      
      if (user) {
        // Fetch user profile data from Firestore
        const profile = await fetchUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);     // Mark loading as complete
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // ===== CONTEXT VALUE =====
  
  // Value object passed to context consumers
  const value = {
    currentUser,      // Current authenticated user or null
    userProfile,      // User profile data from Firestore
    loading,         // Loading state during auth check
    signInWithGoogle, // Google OAuth sign-in method
    signInWithEmail,  // Email/password sign-in method
    signUpWithEmail,  // Email/password registration method
    logout,          // Sign-out method
    updateUserProfile, // Profile update method
    fetchUserProfile, // Fetch user profile method
    isProfileComplete // Check if profile is complete
  };

  // ===== RENDER =====
  
  return (
    <AuthContext.Provider value={value}>
      {/* Only render children when authentication check is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
