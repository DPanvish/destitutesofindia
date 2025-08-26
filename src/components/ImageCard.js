import React, { useState } from 'react';
import { MapPin, Clock, User, ExternalLink, Heart, Share2 } from 'lucide-react';

/**
 * Image Card Component
 * 
 * Displays individual photo posts with location data, user information,
 * and interactive features like liking and sharing. Each card shows
 * a photo with metadata and provides actions for user engagement.
 * 
 * Features:
 * - Image loading states with skeleton and error handling
 * - Location data with Google Maps integration
 * - User interaction (like, share)
 * - Responsive design with hover effects
 * - Timestamp formatting
 * - Accessibility features
 * 
 * @param {Object} props - Component props
 * @param {Object} props.post - Post data containing image, location, user info
 */
const ImageCard = ({ post }) => {
  // ===== STATE MANAGEMENT =====
  const [imageLoaded, setImageLoaded] = useState(false);  // Image loading state
  const [imageError, setImageError] = useState(false);    // Image error state
  const [isLiked, setIsLiked] = useState(false);          // Like button state

  // ===== UTILITY FUNCTIONS =====
  
  /**
   * Formats timestamp into human-readable relative time
   * Converts Firestore timestamp to "X hours/days ago" format
   * 
   * @param {Object} timestamp - Firestore timestamp object
   * @returns {string} Formatted time string
   */
  const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();  // Convert Firestore timestamp to Date
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));  // Calculate hours difference
    
    // Return appropriate time format based on duration
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  // ===== EVENT HANDLERS =====
  
  /**
   * Opens Google Maps with the post's location coordinates
   * Uses the Web Share API if available, falls back to clipboard copy
   */
  const handleLocationClick = () => {
    if (post.location) {
      const { latitude, longitude } = post.location;
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(url, '_blank');  // Open in new tab
    }
  };

  /**
   * Toggles the like state for the post
   * TODO: Integrate with backend to persist likes
   */
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  /**
   * Handles sharing the post
   * Uses native Web Share API if available, otherwise copies URL to clipboard
   */
  const handleShare = () => {
    if (navigator.share) {
      // Use native sharing on mobile devices
      navigator.share({
        title: 'Destitutes of India',
        text: 'Check out this location that needs attention',
        url: window.location.href
      });
    } else {
      // Fallback to clipboard copy
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // ===== RENDER =====
  
  return (
    <div className="image-card group">
      {/* Image container with loading states and overlays */}
      <div className="relative overflow-hidden rounded-t-2xl">
        {/* Loading skeleton - shown while image is loading */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        {/* Error state - shown when image fails to load */}
        {imageError ? (
          <div className="aspect-video bg-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm">Image unavailable</p>
            </div>
          </div>
        ) : (
          <img
            src={post.imageUrl}
            alt="Location"
            className={`w-full aspect-video object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            } group-hover:scale-105`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Action buttons overlay */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleLike}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Location badge */}
        {post.location && (
          <div className="absolute bottom-4 left-4">
            <button
              onClick={handleLocationClick}
              className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 text-sm font-medium text-gray-800 hover:bg-white transition-all duration-300 transform hover:scale-105"
            >
              <MapPin className="w-4 h-4 text-primary-600" />
              <span>View on Map</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location and timestamp */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-gray-700">
              {post.locationName || 'Unknown Location'}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{formatTimestamp(post.timestamp)}</span>
          </div>
        </div>

        {/* Poster info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {post.isAnonymous ? 'Anonymous User' : (post.userName || 'Unknown User')}
            </p>
            <p className="text-xs text-gray-500">
              {post.isAnonymous ? 'Shared anonymously' : 'Shared publicly'}
            </p>
          </div>
        </div>

        {/* Description */}
        {post.description && (
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {post.description}
          </p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
