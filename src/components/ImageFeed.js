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
  const [posts, setPosts] = useState([]);      // Array of post objects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

  // ===== FIRESTORE DATA FETCHING =====
  
  /**
   * Sets up real-time listener for posts from Firestore
   * Fetches posts ordered by timestamp (newest first)
   * Automatically updates when new posts are added
   */
  useEffect(() => {
    // Create Firestore query for posts
    const q = query(
      collection(db, 'posts'),        // Collection name
      orderBy('timestamp', 'desc'),   // Order by newest first
      limit(50)                       // Limit to 50 posts for performance
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(
      q,
      // Success callback - data received
      (querySnapshot) => {
        const postsData = [];
        querySnapshot.forEach((doc) => {
          postsData.push({
            id: doc.id,        // Document ID
            ...doc.data(),     // Document data
          });
        });
        setPosts(postsData);
        setLoading(false);
      },
      // Error callback - handle fetch errors
      (error) => {
        console.error('Error fetching posts:', error);
        setError('Failed to load posts');
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
          <span className="text-gray-600">Loading posts...</span>
        </div>
      </div>
    );
  }

  // Error state - show error message with retry button
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state - show when no posts are available
  if (posts.length === 0) {
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
            No posts yet
          </h3>
          <p className="text-gray-600 mb-6">
            Be the first to share a photo and help raise awareness about destitute individuals in your area.
          </p>
        </div>
      </div>
    );
  }

  // ===== MAIN RENDER =====
  
  // Success state - render posts grid
  return (
    <div className="space-y-6">
      {/* Section header */}
      <h2 className="text-2xl font-bold text-gray-900">
        Recent Posts
      </h2>
      {/* Responsive grid layout for posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <ImageCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ImageFeed;
