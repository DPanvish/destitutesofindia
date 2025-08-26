import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DonatePage from './pages/DonatePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import DisclaimerPage from './pages/DisclaimerPage';
import Footer from './components/Footer';

/**
 * Main App Component
 * 
 * This is the root component that sets up the application structure.
 * It provides authentication context to all child components and
 * defines the routing structure for the entire application.
 * 
 * Features:
 * - Authentication context provider
 * - React Router setup with all page routes
 * - Consistent layout with navbar and footer
 * - Responsive design structure
 */
function App() {
  return (
    // Authentication context provider - wraps entire app
    <AuthProvider>
      {/* Main app container with flexbox layout */}
      <div className="min-h-screen flex flex-col">
        {/* Navigation bar - fixed at top */}
        <Navbar />
        
        {/* Main content area - grows to fill available space */}
        <main className="flex-grow">
          {/* React Router routes configuration */}
          <Routes>
            {/* Home page - landing page with photo feed */}
            <Route path="/" element={<HomePage />} />
            
            {/* Authentication page - login/signup */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Information pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/donate" element={<DonatePage />} />
            
            {/* Legal pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
          </Routes>
        </main>
        
        {/* Footer - fixed at bottom */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
