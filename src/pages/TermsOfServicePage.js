import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Terms of Service Page Component
 * 
 * Displays the platform's terms of service and user agreement.
 * Provides comprehensive information about user rights, responsibilities,
 * and platform usage guidelines.
 * 
 * Features:
 * - Hero section with terms agreement statement
 * - Comprehensive terms of service content
 * - User responsibilities and guidelines
 * - Content ownership and licensing information
 * - Prohibited activities and content policies
 * - Liability limitations and dispute resolution
 * - Responsive design with readable typography
 * 
 * Terms Sections:
 * 1. Agreement to Terms - Acceptance of terms
 * 2. Description of Service - Platform overview
 * 3. User Accounts and Registration - Account requirements
 * 4. User Responsibilities - User obligations
 * 5. Content Ownership and License - Content rights
 * 6. Prohibited Content and Activities - Usage restrictions
 * 7. Privacy and Data Protection - Data handling
 * 8. Intellectual Property - Platform rights
 * 9. Limitation of Liability - Legal protections
 * 10. Termination - Account termination policies
 * 11. Governing Law - Legal jurisdiction
 * 12. Contact Information - How to reach support
 * 
 * Legal Considerations:
 * - Indian contract law compliance
 * - Digital content licensing
 * - User-generated content protection
 * - Platform liability limitations
 */
const TermsOfServicePage = () => {
  // ===== RENDER =====
  
  return (
    <div className="min-h-screen">
      {/* Hero section with terms agreement statement */}
      <section className="hero-gradient relative overflow-hidden py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-10 animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Terms of <span className="text-gradient">Service</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Please read these terms carefully before using our platform. 
              By using our services, you agree to these terms.
            </p>
          </div>
        </div>
      </section>

      {/* Main content section with terms of service details */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <div className="prose prose-lg max-w-none">
              <p className="text-sm text-gray-600 mb-8">
                <strong>Last updated:</strong> December 2024
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Agreement to Terms
              </h2>
              <p className="text-gray-700 mb-6">
                By accessing and using Destitutes of India ("the Platform"), you accept and agree 
                to be bound by the terms and provision of this agreement. If you do not agree to 
                abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Description of Service
              </h2>
              <p className="text-gray-700 mb-6">
                Destitutes of India is a platform designed to raise awareness about destitute 
                individuals in India through geotagged photos. Users can upload photos with 
                location data to help connect compassion with need and foster community awareness.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                User Accounts and Registration
              </h2>
              <p className="text-gray-700 mb-4">
                To use certain features of our platform, you must:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Be at least 13 years of age</li>
                <li>Register using a valid Google account</li>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                User Responsibilities
              </h2>
              <p className="text-gray-700 mb-4">
                As a user of our platform, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Use the platform only for its intended purpose</li>
                <li>Respect the dignity and privacy of individuals in photos</li>
                <li>Obtain necessary permissions before taking photos</li>
                <li>Provide accurate location information</li>
                <li>Not use the platform for commercial purposes without permission</li>
                <li>Report inappropriate content or behavior</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Content Ownership and License
              </h2>
              <p className="text-gray-700 mb-4">
                Regarding content you upload to our platform:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>Ownership:</strong> You retain ownership of your uploaded photos</li>
                <li><strong>License:</strong> You grant us a non-exclusive, worldwide, royalty-free license to display, distribute, and use your content on our platform</li>
                <li><strong>Duration:</strong> This license continues until you delete your content or account</li>
                <li><strong>Revocation:</strong> You can revoke this license by removing your content</li>
                <li><strong>Attribution:</strong> We will credit you as the content creator unless you post anonymously</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Prohibited Content and Activities
              </h2>
              <p className="text-gray-700 mb-4">
                You are strictly prohibited from uploading content or engaging in activities that:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>Violate Privacy:</strong> Infringe on individuals' privacy rights or dignity</li>
                <li><strong>Are Harmful:</strong> Promote violence, discrimination, or hate speech</li>
                <li><strong>Are Misleading:</strong> Contain false or misleading information</li>
                <li><strong>Are Commercial:</strong> Promote commercial products or services</li>
                <li><strong>Are Illegal:</strong> Violate any applicable laws or regulations</li>
                <li><strong>Are Spam:</strong> Constitute spam or unsolicited content</li>
                <li><strong>Are Inappropriate:</strong> Contain sexually explicit or offensive material</li>
                <li><strong>Are Duplicate:</strong> Upload the same content multiple times</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Location Data and Privacy
              </h2>
              <p className="text-gray-700 mb-4">
                When using our platform:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>You must provide explicit consent for location access</li>
                <li>Location data is used only for geotagging uploaded photos</li>
                <li>We do not track your location continuously</li>
                <li>You can disable location services at any time</li>
                <li>Location data is stored securely and not shared with third parties</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Intellectual Property Rights
              </h2>
              <p className="text-gray-700 mb-6">
                The platform and its original content, features, and functionality are owned by 
                Destitutes of India and are protected by international copyright, trademark, 
                patent, trade secret, and other intellectual property laws.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Termination and Account Suspension
              </h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account immediately, without prior notice, for:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Violation of these Terms of Service</li>
                <li>Uploading prohibited content</li>
                <li>Engaging in fraudulent or illegal activities</li>
                <li>Harassment or abuse of other users</li>
                <li>Repeated violations of community guidelines</li>
                <li>Any other reason we deem appropriate</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Disclaimers and Limitations
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>Disclaimer of Warranties:</strong> The platform is provided "as is" without 
                any warranties, express or implied. We do not guarantee the accuracy, completeness, 
                or usefulness of any information on the platform.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Limitation of Liability:</strong> We shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages resulting from your use 
                of the platform.
              </p>
              <p className="text-gray-700 mb-6">
                <strong>No Guarantee of Outcomes:</strong> We do not guarantee that posting photos 
                will result in assistance for destitute individuals. The platform is for awareness 
                purposes only.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Indemnification
              </h2>
              <p className="text-gray-700 mb-6">
                You agree to indemnify and hold harmless Destitutes of India, its officers, 
                directors, employees, and agents from any claims, damages, losses, or expenses 
                arising from your use of the platform or violation of these terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Governing Law and Jurisdiction
              </h2>
              <p className="text-gray-700 mb-6">
                These terms shall be governed by and construed in accordance with the laws of India. 
                Any disputes arising from these terms or your use of the platform shall be subject 
                to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Changes to Terms
              </h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to modify these terms at any time. We will notify users of 
                significant changes by posting the updated terms on this page. Your continued use 
                of the platform after such changes constitutes acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Severability
              </h2>
              <p className="text-gray-700 mb-6">
                If any provision of these terms is found to be unenforceable or invalid, that 
                provision will be limited or eliminated to the minimum extent necessary so that 
                these terms will otherwise remain in full force and effect.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="glass-card p-6">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:legal@destitutesofindia.com" className="text-primary-600 hover:underline">
                    legal@destitutesofindia.com
                  </a>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Address:</strong> Mumbai, Maharashtra, India
                </p>
                <p className="text-gray-700">
                  <strong>Response Time:</strong> We will respond to legal inquiries within 5 business days.
                </p>
              </div>

              <div className="mt-8 p-6 bg-accent-50 border border-accent-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Important Notice
                    </h3>
                    <p className="text-gray-700">
                      By using our platform, you acknowledge that you have read, understood, 
                      and agree to be bound by these Terms of Service. If you do not agree 
                      with any part of these terms, please do not use our platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
