import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

/**
 * Firebase Configuration
 * 
 * This file configures and initializes all Firebase services used in the application.
 * It sets up authentication, database, storage, and analytics services.
 * 
 * Services:
 * - Authentication (Google OAuth, Email/Password)
 * - Firestore Database (for storing photo data)
 * - Firebase Storage (for storing uploaded images)
 * - Analytics (for usage tracking)
 * 
 * Note: Firebase config keys are safe to expose in client-side code
 * as they are public and require server-side rules for security.
 */

// Firebase project configuration object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDWZbIy-XAMHCGpxWOTkZDvsK6dRVyZkb4",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "destitutesofindia.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "destitutesofindia",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "destitutesofindia.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "319836772741",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:319836772741:web:0e62203ff64e2f76470cec",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-736D8K1EMP"
};

// ===== FIREBASE INITIALIZATION =====

// Initialize the main Firebase app instance
const app = initializeApp(firebaseConfig);

// ===== FIREBASE SERVICES =====

// Authentication service - handles user sign-in/sign-up
export const auth = getAuth(app);

// Firestore database - for storing structured data
export const db = getFirestore(app);

// Firebase Storage - for storing uploaded images and files
export const storage = getStorage(app);

// Google Analytics - for tracking user behavior and app usage
export const analytics = getAnalytics(app);

// ===== AUTHENTICATION PROVIDERS =====

// Google OAuth provider for social login
export const googleProvider = new GoogleAuthProvider();

// ===== EXPORTS =====

// Export the main Firebase app instance
export default app;
