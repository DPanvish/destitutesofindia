import React from 'react';

/**
 * Privacy Policy Page Component
 * 
 * Displays the platform's privacy policy and data protection practices.
 * Provides comprehensive information about how user data is collected,
 * used, stored, and protected.
 * 
 * Features:
 * - Hero section with privacy commitment statement
 * - Comprehensive privacy policy content
 * - Information about data collection and usage
 * - Data storage and security practices
 * - User rights and contact information
 * - Responsive design with readable typography
 * 
 * Policy Sections:
 * 1. Introduction - Overview of privacy commitment
 * 2. Information We Collect - Types of data collected
 * 3. How We Use Your Information - Purpose of data usage
 * 4. Data Storage and Security - Protection measures
 * 5. Data Sharing and Disclosure - Third-party sharing policies
 * 6. User Rights - User control over their data
 * 7. Cookies and Tracking - Cookie usage information
 * 8. Children's Privacy - Protection for minors
 * 9. Changes to Policy - Policy update procedures
 * 10. Contact Information - How to reach privacy team
 * 
 * Legal Compliance:
 * - GDPR compliance considerations
 * - Indian data protection laws
 * - Google OAuth privacy requirements
 * - Location data protection
 */
const PrivacyPolicyPage = () => {
  // ===== RENDER =====
  
  return (
    <div className="min-h-screen">
      {/* Hero section with privacy commitment statement */}
      <section className="relative py-20 overflow-hidden hero-gradient">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute w-20 h-20 bg-white rounded-full top-10 left-10 opacity-10 animate-float"></div>
        <div className="absolute w-16 h-16 bg-white rounded-full top-20 right-20 opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-12 h-12 bg-white rounded-full bottom-10 left-1/4 opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/90">
              We are committed to protecting your privacy and ensuring the security 
              of your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Main content section with privacy policy details */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="card">
            <div className="prose prose-lg max-w-none">
              <p className="mb-8 text-sm text-gray-600">
                <strong>Last updated:</strong> December 2024
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Introduction
              </h2>
              <p className="mb-6 text-gray-700">
                Destitutes of India ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our website and services. By using our platform, you 
                consent to the data practices described in this policy.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Information We Collect
              </h2>
              
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                Personal Information
              </h3>
              <p className="mb-4 text-gray-700">
                When you use our platform, we may collect the following personal information:
              </p>
              <ul className="pl-6 mb-6 space-y-2 text-gray-700 list-disc">
                <li><strong>Google Account Information:</strong> When you sign in with Google, we collect your display name, email address, and profile picture.</li>
                <li><strong>Location Data:</strong> GPS coordinates when you upload photos, with your explicit permission.</li>
                <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers.</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on the platform, and interaction patterns.</li>
              </ul>

              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                User-Generated Content
              </h3>
              <p className="mb-6 text-gray-700">
                When you upload photos, we collect:
              </p>
              <ul className="pl-6 mb-6 space-y-2 text-gray-700 list-disc">
                <li>The uploaded image files</li>
                <li>Associated metadata (timestamp, location coordinates)</li>
                <li>Any descriptions or captions you provide</li>
                <li>Whether you choose to post anonymously</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                How We Use Your Information
              </h2>
              <p className="mb-4 text-gray-700">
                We use the collected information for the following purposes:
              </p>
              <ul className="pl-6 mb-6 space-y-2 text-gray-700 list-disc">
                <li><strong>Platform Operation:</strong> To provide and maintain our services</li>
                <li><strong>Content Display:</strong> To show uploaded photos in our feed and map</li>
                <li><strong>User Authentication:</strong> To verify your identity and manage your account</li>
                <li><strong>Communication:</strong> To respond to your inquiries and provide support</li>
                <li><strong>Analytics:</strong> To improve our platform and user experience</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Data Storage and Security
              </h2>
              <p className="mb-4 text-gray-700">
                Your data is stored securely using industry-standard practices:
              </p>
              <ul className="pl-6 mb-6 space-y-2 text-gray-700 list-disc">
                <li><strong>Google Cloud Platform:</strong> All data is stored on Google's secure cloud infrastructure</li>
                <li><strong>Encryption:</strong> Data is encrypted both in transit and at rest</li>
                <li><strong>Access Controls:</strong> Strict access controls limit who can view your data</li>
                <li><strong>Regular Backups:</strong> Data is regularly backed up to prevent loss</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Data Sharing and Disclosure
              </h2>
              <p className="mb-4 text-gray-700">
                We do not sell, trade, or rent your personal information to third parties. 
                We may share your information in the following circumstances:
              </p>
              <ul className="pl-6 mb-6 space-y-2 text-gray-700 list-disc">
                <li><strong>Public Content:</strong> Photos you upload (excluding personal information) are publicly visible</li>
                <li><strong>Service Providers:</strong> With trusted third-party services that help us operate our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Emergency Situations:</strong> In emergency situations where immediate action is required</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Your Rights and Choices
              </h2>
              <p className="mb-4 text-gray-700">
                You have the following rights regarding your personal information:
              </p>
              <ul className="pl-6 mb-6 space-y-2 text-gray-700 list-disc">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to certain processing of your data</li>
                <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
              </ul>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Cookies and Tracking
              </h2>
              <p className="mb-4 text-gray-700">
                We use cookies and similar technologies to:
              </p>
              <ul className="pl-6 mb-6 space-y-2 text-gray-700 list-disc">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and features</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
              <p className="mb-6 text-gray-700">
                You can control cookie settings through your browser preferences. 
                However, disabling certain cookies may affect platform functionality.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Data Retention
              </h2>
              <p className="mb-6 text-gray-700">
                We retain your personal information for as long as necessary to provide our services 
                and fulfill the purposes outlined in this policy. When you delete your account, 
                we will delete your personal information within 30 days, except where retention 
                is required by law or for legitimate business purposes.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Children's Privacy
              </h2>
              <p className="mb-6 text-gray-700">
                Our platform is not intended for children under 13 years of age. We do not 
                knowingly collect personal information from children under 13. If you are a 
                parent or guardian and believe your child has provided us with personal information, 
                please contact us immediately.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                International Data Transfers
              </h2>
              <p className="mb-6 text-gray-700">
                Your information may be transferred to and processed in countries other than 
                your own. We ensure that such transfers comply with applicable data protection 
                laws and implement appropriate safeguards to protect your information.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Changes to This Policy
              </h2>
              <p className="mb-6 text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any 
                material changes by posting the new policy on this page and updating the 
                "Last updated" date. Your continued use of our platform after such changes 
                constitutes acceptance of the updated policy.
              </p>

              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Contact Us
              </h2>
              <p className="mb-6 text-gray-700">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <div className="p-6 glass-card">
                <p className="mb-2 text-gray-700">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:privacy@destitutesofindia.com" className="text-primary-600 hover:underline">
                    privacy@destitutesofindia.com
                  </a>
                </p>
                <p className="mb-2 text-gray-700">
                  <strong>Address:</strong> Mumbai, Maharashtra, India
                </p>
                <p className="text-gray-700">
                  <strong>Response Time:</strong> We will respond to your inquiry within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
