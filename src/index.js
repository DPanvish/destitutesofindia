import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App';

/**
 * Application Entry Point
 * 
 * This file is the main entry point for the React application.
 * It sets up the root DOM element, configures routing, and
 * initializes global components like toast notifications.
 * 
 * Features:
 * - React 18 createRoot API
 * - BrowserRouter for client-side routing
 * - Global toast notification system
 * - Strict mode for development debugging
 */

// Create root element for React 18 concurrent features
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Strict mode for development debugging and warnings
  <React.StrictMode>
    {/* Browser router for client-side navigation */}
    <BrowserRouter>
      {/* Main application component */}
      <App />
      
      {/* Global toast notification system */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,  // Default toast duration
          style: {
            background: '#363636',  // Dark background
            color: '#fff',          // White text
          },
          // Success toast styling
          success: {
            duration: 3000,  // Shorter duration for success
            iconTheme: {
              primary: '#10b981',  // Green color
              secondary: '#fff',
            },
          },
          // Error toast styling
          error: {
            duration: 5000,  // Longer duration for errors
            iconTheme: {
              primary: '#ef4444',  // Red color
              secondary: '#fff',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
