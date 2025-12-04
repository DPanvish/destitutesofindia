import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Upload, MapPin, User, EyeOff, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { storage, db } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

/**
 * UploadModal Component
 * 
 * This component provides a comprehensive interface for users to upload photos
 * with location data and descriptions. It includes camera capture, file upload,
 * location services, and privacy controls.
 * 
 * Features:
 * - Camera capture with live preview
 * - File upload from device gallery
 * - GPS location capture
 * - Optional description and anonymous posting
 * - Form validation and user feedback
 * - Responsive design with scroll support
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback to close the modal
 */
const UploadModal = ({ isOpen, onClose }) => {
  // ===== HOOKS AND STATE =====
  const { currentUser, userProfile } = useAuth();  // Authentication context
  
  // File handling states
  const [selectedFile, setSelectedFile] = useState(null);        // Stores the selected image file
  const [preview, setPreview] = useState(null);                  // URL for image preview display
  
  // User preferences and privacy
  const [isAnonymous, setIsAnonymous] = useState(false);         // Toggle for anonymous posting
  const [description, setDescription] = useState('');            // User's description text
  
  // Modal and UI states
  const [showWarning, setShowWarning] = useState(false);         // Controls warning modal visibility
  const [isUploading, setIsUploading] = useState(false);         // Loading state during upload
  
  // Location services
  const [location, setLocation] = useState(null);                // GPS coordinates {latitude, longitude}
  
  // Camera functionality
  const [showCamera, setShowCamera] = useState(false);           // Toggle camera view
  const [stream, setStream] = useState(null);                    // Camera media stream
  const [cameraError, setCameraError] = useState(null);          // Camera error state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);   // Track if video is actually playing

  // ===== REFS FOR DOM ELEMENTS =====
  const fileInputRef = useRef();                                 // Hidden file input element
  const videoRef = useRef();                                     // Video element for camera preview
  const canvasRef = useRef();                                    // Canvas for capturing camera frames

  // ===== EFFECTS =====
  
  /**
   * Effect to connect video stream when camera is shown
   * This ensures the video element is properly connected to the stream
   */
  useEffect(() => {
    if (showCamera && stream && videoRef.current) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Force video to load and play
          videoRef.current.load();
          videoRef.current.play().catch(error => {
            console.error('Error playing video:', error);
            setCameraError('Failed to start video playback');
          });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [showCamera, stream]);

  /**
   * Effect to check camera availability on component mount
   */
  useEffect(() => {
    // Check if camera is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera not supported in this browser');
    }
  }, []);

  /**
   * Captures the user's current GPS location using the browser's geolocation API
   * This is required for all photo uploads to ensure proper location tagging
   */
  const getCurrentLocation = () => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    // Show loading notification to user
    toast('Getting your location...', {
      icon: '📍',
      duration: 3000,
    });
    
    // Request current position with high accuracy
    navigator.geolocation.getCurrentPosition(
      // Success callback - location captured
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        toast.success('Location captured successfully!');
      },
      // Error callback - location capture failed
      (error) => {
        console.error('Error getting location:', error);
        toast.error('Failed to get location. Please enable location access.');
      },
      // Geolocation options for better accuracy
      {
        enableHighAccuracy: true,  // Use GPS for highest accuracy
        timeout: 10000,           // Wait up to 10 seconds
        maximumAge: 60000         // Accept cached location up to 1 minute old
      }
    );
  };

  /**
   * Initializes the device camera for live photo capture
   * Requests camera permissions and sets up video stream
   */
  const startCamera = async () => {
    try {
      // Clear any previous errors and reset states
      setCameraError(null);
      setIsVideoPlaying(false);
      
      // Request camera access with rear camera preference
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',  // Use rear camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      // Store the stream and show camera interface
      setStream(mediaStream);
      setShowCamera(true);
      
      // Note: Video connection is handled by useEffect
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError('Unable to access camera. Please check permissions and try again.');
      toast.error('Unable to access camera. Please select a file instead.');
    }
  };

  /**
   * Captures a still image from the live camera stream
   * Converts the video frame to a file and creates a preview
   */
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      // Get canvas context for drawing
      const context = canvasRef.current.getContext('2d');
      
      // Set canvas dimensions to match video
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      
      // Draw current video frame to canvas
      context.drawImage(videoRef.current, 0, 0);
      
      // Convert canvas to blob (JPEG format, 80% quality)
      canvasRef.current.toBlob((blob) => {
        // Create a file from the blob
        const file = new File([blob], 'captured-photo.jpg', { type: 'image/jpeg' });
        
        // Update state with captured image
        setSelectedFile(file);
        setPreview(URL.createObjectURL(blob));
        
        // Stop camera after capture
        stopCamera();
      }, 'image/jpeg', 0.8);  // JPEG format with 80% quality
    }
  };

  /**
   * Stops the camera stream and hides the camera interface
   * Properly cleans up media resources to prevent memory leaks
   */
  const stopCamera = () => {
    if (stream) {
      // Stop all tracks in the media stream
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
    setIsVideoPlaying(false);
    setCameraError(null);
  };

  /**
   * Handles file selection from the device gallery
   * Validates that the selected file is an image and creates a preview
   */
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the file is an image
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
      } else {
        toast.error('Please select an image file');
      }
    }
  };

  /**
   * Validates the form and shows the responsibility warning modal
   * Ensures all required fields are completed before proceeding
   */
  const handleSubmit = async () => {
    // Validate that an image has been selected
    if (!selectedFile) {
      toast.error('Please select an image');
      return;
    }

    // Validate that location has been captured
    if (!location) {
      toast.error('Please capture your location');
      return;
    }

    // Show responsibility warning modal
    setShowWarning(true);
  };

  /**
   * Handles the final upload process after user confirms responsibility
   * Uploads image to Firebase Storage and stores metadata in Firestore
   */
  const confirmUpload = async () => {
    setIsUploading(true);
    setShowWarning(false);

    try {
      if (!currentUser) {
        toast.error('Please sign in to upload photos');
        return;
      }
      // Generate unique filename for the image
      const timestamp = Date.now();
      const filename = `photos/${currentUser.uid}/${timestamp}_${selectedFile.name}`;
      
      // Create storage reference
      const storageRef = ref(storage, filename);
      
      // Upload image to Firebase Storage
      const metadata = { contentType: selectedFile.type || 'image/jpeg' };
      const uploadResult = await uploadBytes(storageRef, selectedFile, metadata);
      
      // Get download URL for the uploaded image
      const downloadURL = await getDownloadURL(uploadResult.ref);
      
      // Prepare photo data for Firestore
      const photoData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        username: userProfile?.username || currentUser.displayName || 'Anonymous',
        imageURL: downloadURL,
        imagePath: filename,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          // Add geohash for efficient geospatial queries (optional)
          geohash: `${location.latitude.toFixed(6)},${location.longitude.toFixed(6)}`
        },
        description: description.trim() || null,
        isAnonymous: isAnonymous,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active', // Can be used for moderation
        likes: 0,
        views: 0
      };
      
      // Store photo metadata in Firestore
      const docRef = await addDoc(collection(db, 'photos'), photoData);
      
      // Show success message and close modal
      toast.success('Photo uploaded successfully!');
      onClose();
      
      // Reset all form fields to initial state
      setSelectedFile(null);
      setPreview(null);
      setLocation(null);
      setDescription('');
      setIsAnonymous(false);
      
      console.log('Photo uploaded with ID:', docRef.id);
      
    } catch (error) {
      console.error('Error uploading photo:', error);
      const message = error && error.code ? `Upload failed: ${error.code}` : 'Failed to upload photo. Please try again.';
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Handles modal closure with proper cleanup
   * Ensures camera is stopped and resources are freed
   */
  const handleClose = () => {
    stopCamera();  // Clean up camera resources
    onClose();     // Close the modal
  };

  // Don't render anything if modal is not open
  if (!isOpen) return null;

  return (
    // Modal overlay - clicking outside closes the modal
    <div className="modal-overlay" onClick={handleClose}>
      {/* Modal container with scroll support and flex layout */}
      <div className="modal-content max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Fixed header with title and close button */}
        <div className="flex items-center justify-between flex-shrink-0 p-6 bg-white border-b border-gray-200 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Share a Photo</h2>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-8 h-8 transition-colors duration-200 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

                {/* Scrollable content area with custom scrollbar */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="p-6 space-y-6">
            {/* Photo capture/upload interface */}
            {!showCamera ? (
            <div className="space-y-4">
              {/* Section header with instructions */}
              <div className="text-center">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Capture or Upload Photo</h3>
                <p className="text-sm text-gray-600">Take a new photo or select from your gallery</p>
              </div>

              {/* Camera and upload buttons in a grid layout */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={startCamera}
                  className="flex flex-col items-center justify-center p-6 transition-all duration-300 border-2 border-dashed border-primary-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 group"
                >
                  <Camera className="w-8 h-8 mb-2 transition-transform duration-300 text-primary-600 group-hover:scale-110" />
                  <span className="text-sm font-medium text-primary-600">Take Photo</span>
                  <span className="mt-1 text-xs text-gray-500">Camera access required</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-6 transition-all duration-300 border-2 border-gray-300 border-dashed rounded-xl hover:border-primary-500 hover:bg-primary-50 group"
                >
                  <Upload className="w-8 h-8 mb-2 text-gray-600 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-medium text-gray-600">Upload Photo</span>
                  <span className="mt-1 text-xs text-gray-500">From your gallery</span>
                </button>
              </div>

              {/* Camera availability info */}
              <div className="text-sm text-center text-gray-600">
                <p>Camera access requires HTTPS and user permission</p>
                <p>If camera doesn't work, use the upload option above</p>
              </div>

              {/* Hidden file input for gallery selection */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
                      ) : (
            /* Live camera interface for photo capture */
            <div className="space-y-4">
              <div className="relative">
                {/* Live video feed from camera */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full bg-gray-900 aspect-video rounded-xl"
                  onLoadedMetadata={() => console.log('Video metadata loaded')}
                  onCanPlay={() => {
                    console.log('Video can play');
                    setIsVideoPlaying(true);
                  }}
                  onPlaying={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  onError={(e) => {
                    console.error('Video error:', e);
                    setCameraError('Video playback error');
                    setIsVideoPlaying(false);
                  }}
                />
                
                {/* Camera loading indicator */}
                {!cameraError && stream && !isVideoPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-xl">
                    <div className="text-center text-white">
                      <div className="mx-auto mb-2 loading-spinner"></div>
                      <p className="text-sm">Starting camera...</p>
                    </div>
                  </div>
                )}
                
                {/* Camera error display */}
                {cameraError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 rounded-xl">
                    <div className="p-4 text-center text-white">
                      <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-400" />
                      <p className="text-sm font-medium">{cameraError}</p>
                      <button
                        onClick={startCamera}
                        className="px-4 py-2 mt-2 text-sm text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                      >
                        Retry Camera
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Hidden canvas for capturing video frames */}
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Camera controls positioned at bottom center */}
                <div className="absolute flex space-x-4 transform -translate-x-1/2 bottom-4 left-1/2">
                  <button
                    onClick={capturePhoto}
                    disabled={!!cameraError || !stream}
                    className="flex items-center justify-center w-16 h-16 transition-transform duration-300 bg-white rounded-full shadow-lg hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-600"></div>
                  </button>
                </div>
                
                {/* Close camera button in top-right corner */}
                <button
                  onClick={stopCamera}
                  className="absolute flex items-center justify-center w-10 h-10 text-white transition-colors duration-300 rounded-full top-4 right-4 bg-black/50 hover:bg-black/70"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Image preview section - shown when image is selected/captured */}
          {preview && (
                          <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
                <div className="relative">
                  {/* Display the selected/captured image */}
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover w-full aspect-video rounded-xl"
                  />
                  {/* Remove image button */}
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                    }}
                    className="absolute flex items-center justify-center w-8 h-8 text-white transition-colors duration-300 rounded-full top-2 right-2 bg-black/50 hover:bg-black/70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          {/* Location capture section - required for all uploads */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Location</h3>
              {/* Success indicator when location is captured */}
              {location && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Captured</span>
                </div>
              )}
            </div>
            
            {/* Location capture button - changes appearance based on state */}
            <button
              onClick={getCurrentLocation}
              disabled={!!location}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                location
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-primary-300 bg-primary-50 text-primary-700 hover:border-primary-500 hover:bg-primary-100'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span className="font-medium">
                {location ? 'Location Captured' : 'Capture Current Location'}
              </span>
            </button>
            
            {/* Display captured coordinates when available */}
            {location && (
              <div className="text-sm text-gray-600">
                Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </div>
            )}
          </div>

          {/* Optional description field with character counter */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Description (Optional)</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any additional details about this location..."
              className="h-24 resize-none input-field"
              maxLength={500}
            />
            {/* Character counter showing current/maximum length */}
            <div className="text-xs text-right text-gray-500">
              {description.length}/500
            </div>
          </div>

           {/* Privacy toggle - allows users to post anonymously */}
           <div className="flex items-center justify-between p-4 glass-card rounded-xl">
             <div className="flex items-center space-x-3">
              {/* Icon changes based on anonymous state */}
              {isAnonymous ? (
                <EyeOff className="w-5 h-5 text-gray-600" />
              ) : (
                <User className="w-5 h-5 text-gray-600" />
              )}
              <div>
                <p className="font-medium text-gray-900">
                  {isAnonymous ? 'Post Anonymously' : 'Post as Yourself'}
                </p>
                <p className="text-sm text-gray-600">
                  {isAnonymous ? 'Your identity will be hidden' : 'Your name will be visible'}
                </p>
              </div>
            </div>
            {/* Toggle switch for anonymous posting */}
            <button
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                isAnonymous ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            >
              {/* Toggle slider that moves based on state */}
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  isAnonymous ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Submit button - disabled until all required fields are completed */}
          <button
            onClick={handleSubmit}
            disabled={!selectedFile || !location || isUploading}
            className="w-full mb-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="loading-spinner"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              'Share Photo'
            )}
          </button>
        </div>
        </div>

        {/* Responsibility warning modal - shown before final upload */}
        {showWarning && (
                      <div className="modal-overlay">
              <div className="max-w-md modal-content">
                <div className="p-6 text-center">
                  {/* Warning icon */}
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full">
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                  </div>
                  
                  {/* Warning title */}
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    Post with Responsibility
                  </h3>
                  
                  {/* Warning message about platform purpose */}
                  <p className="mb-6 text-gray-600">
                    By sharing this photo, you acknowledge that this platform is for awareness purposes only. 
                    Please ensure you have the individual's consent when possible and respect their dignity.
                  </p>
                
                 {/* Guidelines for responsible posting */}
                 <div className="p-4 space-y-3 text-sm text-left text-gray-600 rounded-lg glass-card">
                  <p>• This platform is for raising awareness, not direct aid</p>
                  <p>• Respect the dignity and privacy of individuals</p>
                  <p>• Do not share photos that could cause harm or distress</p>
                  <p>• Consider the impact of your post on the community</p>
                </div>
                
                {/* Action buttons for the warning modal */}
                <div className="flex mt-6 space-x-4">
                  <button
                    onClick={() => setShowWarning(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmUpload}
                    className="flex-1 btn-primary"
                  >
                    Confirm & Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadModal;
