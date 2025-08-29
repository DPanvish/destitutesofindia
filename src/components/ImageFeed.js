import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import ImageCard from './ImageCard';
import { Loader2 } from 'lucide-react';

/**
 * Image Feed Component
 * 
 * Displays a feed of photo posts from the Firestore database.
 * Fetches posts in real-time using Firestore listeners and
 * renders them in a responsive grid layout.
 * 
 * Features:
 * - Real-time data synchronization with Firestore
 * - Loading states with skeleton UI
 * - Error handling with retry functionality
 * - Empty state with call-to-action
 * - Responsive grid layout
 * - Automatic cleanup of listeners
 * 
 * Data Flow:
 * 1. Sets up Firestore listener on component mount
 * 2. Listens for changes in the 'posts' collection
 * 3. Orders posts by timestamp (newest first)
 * 4. Limits to 50 posts for performance
 * 5. Updates state when data changes
 * 6. Cleans up listener on unmount
 */
const ImageFeed = () => {
  // ===== STATE MANAGEMENT =====
  const [photos, setPhotos] = useState([]);      // Array of photo objects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

  // ===== FIRESTORE DATA FETCHING =====
  
  /**
   * Sets up real-time listener for posts from Firestore
   * Fetches posts ordered by timestamp (newest first)
   * Automatically updates when new posts are added
   */
  useEffect(() => {
    // Create Firestore query for photos - start with a simple query
    const q = query(
      collection(db, 'photos'),       // Collection name
      limit(50)                       // Limit to 50 photos for performance
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      q,
      // Success callback - data received
      (querySnapshot) => {
        const photosData = [];
        querySnapshot.forEach((doc) => {
          photosData.push({
            id: doc.id,        // Document ID
            ...doc.data(),     // Document data
          });
        });
        
        // Sort by createdAt if available, otherwise by document ID
        photosData.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return b.createdAt.toDate ? b.createdAt.toDate() - a.createdAt.toDate() : b.createdAt - a.createdAt;
          }
          return b.id.localeCompare(a.id); // Fallback to document ID
        });
        
        setPhotos(photosData);
        setLoading(false);
      },
      // Error callback - handle fetch errors
      (error) => {
        console.error('Error fetching photos:', error);
        // For any error, just show empty state instead of error
        setPhotos([]);
        setLoading(false);
      }
    );

    // Cleanup function - unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  // ===== RENDER STATES =====
  
  // Loading state - show spinner while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
          <span className="text-gray-600">Loading photos...</span>
        </div>
      </div>
    );
  }

  // Error state - show error message with retry button
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Unable to load photos
          </h3>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              // The useEffect will re-run and try to fetch again
            }}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state - show when no photos are available
  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          {/* Empty state icon */}
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No photos uploaded yet
          </h3>
          <p className="text-gray-600 mb-6">
            This is where photos shared by our community will appear. Be the first to upload a photo and help raise awareness about destitute individuals in your area. Your contribution can make a real difference.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>How to get started:</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1 text-left">
              <li>• Click the camera button to upload a photo</li>
              <li>• Add location details and description</li>
              <li>• Help raise awareness in your community</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ===== MAIN RENDER =====
  
  // Success state - render photos grid
  return (
    <div className="space-y-6">
      {/* Section header */}
      <h2 className="text-2xl font-bold text-gray-900">
        Recent Photos
      </h2>
      {/* Responsive grid layout for photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <ImageCard key={photo.id} post={photo} />
        ))}
      </div>
    </div>
  );
};

export default ImageFeed;
