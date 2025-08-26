import React, { useState, useRef } from 'react';
import { X, Camera, Upload, MapPin, User, EyeOff, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
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
  // ===== STATE MANAGEMENT =====
  
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
  
  // ===== REFS FOR DOM ELEMENTS =====
  const fileInputRef = useRef();                                 // Hidden file input element
  const videoRef = useRef();                                     // Video element for camera preview
  const canvasRef = useRef();                                    // Canvas for capturing camera frames

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
      // Request camera access with rear camera preference
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }  // Use rear camera if available
      });
      
      // Store the stream and show camera interface
      setStream(mediaStream);
      setShowCamera(true);
      
      // Connect stream to video element for live preview
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
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
   * Simulates the upload and resets the form on completion
   */
  const confirmUpload = async () => {
    setIsUploading(true);
    setShowWarning(false);

    try {
      // TODO: Replace with actual upload logic to backend/Firebase
      // Simulate upload process for demonstration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message and close modal
      toast.success('Photo uploaded successfully!');
      onClose();
      
      // Reset all form fields to initial state
      setSelectedFile(null);
      setPreview(null);
      setLocation(null);
      setDescription('');
      setIsAnonymous(false);
    } catch (error) {
      toast.error('Failed to upload photo. Please try again.');
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
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-2xl flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">Share a Photo</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Capture or Upload Photo</h3>
                <p className="text-gray-600 text-sm">Take a new photo or select from your gallery</p>
              </div>

              {/* Camera and upload buttons in a grid layout */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={startCamera}
                  className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 group"
                >
                  <Camera className="w-8 h-8 text-primary-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-medium text-primary-600">Take Photo</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 group"
                >
                  <Upload className="w-8 h-8 text-gray-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-medium text-gray-600">Upload Photo</span>
                </button>
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
                  className="w-full aspect-video bg-black rounded-xl"
                />
                {/* Hidden canvas for capturing video frames */}
                <canvas ref={canvasRef} className="hidden" />
                
                {/* Camera controls positioned at bottom center */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                  <button
                    onClick={capturePhoto}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
                  >
                    <div className="w-12 h-12 bg-primary-600 rounded-full"></div>
                  </button>
                </div>
                
                {/* Close camera button in top-right corner */}
                <button
                  onClick={stopCamera}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-300"
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
                    className="w-full aspect-video object-cover rounded-xl"
                  />
                  {/* Remove image button */}
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-300"
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
              className="input-field resize-none h-24"
              maxLength={500}
            />
            {/* Character counter showing current/maximum length */}
            <div className="text-xs text-gray-500 text-right">
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
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed mb-4"
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
              <div className="modal-content max-w-md">
                <div className="p-6 text-center">
                  {/* Warning icon */}
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                  </div>
                  
                  {/* Warning title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Post with Responsibility
                  </h3>
                  
                  {/* Warning message about platform purpose */}
                  <p className="text-gray-600 mb-6">
                    By sharing this photo, you acknowledge that this platform is for awareness purposes only. 
                    Please ensure you have the individual's consent when possible and respect their dignity.
                  </p>
                
                 {/* Guidelines for responsible posting */}
                 <div className="space-y-3 text-sm text-gray-600 text-left glass-card p-4 rounded-lg">
                  <p>• This platform is for raising awareness, not direct aid</p>
                  <p>• Respect the dignity and privacy of individuals</p>
                  <p>• Do not share photos that could cause harm or distress</p>
                  <p>• Consider the impact of your post on the community</p>
                </div>
                
                {/* Action buttons for the warning modal */}
                <div className="flex space-x-4 mt-6">
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
