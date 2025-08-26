import React from 'react';
import { AlertTriangle, Info, Phone, Mail } from 'lucide-react';

/**
 * Disclaimer Page Component
 * 
 * Displays important legal disclaimers and limitations about the platform.
 * Provides clear information about the platform's scope, limitations,
 * and user responsibilities.
 * 
 * Features:
 * - Hero section with disclaimer importance statement
 * - Comprehensive disclaimer content
 * - Platform limitations and scope clarification
 * - Emergency contact information
 * - User responsibility guidelines
 * - Privacy and dignity considerations
 * - Responsive design with warning indicators
 * 
 * Disclaimer Sections:
 * 1. Platform Purpose and Limitations - Scope clarification
 * 2. No Direct Aid Provision - Service limitations
 * 3. Content Authenticity and Verification - Content responsibility
 * 4. Emergency and Crisis Situations - Emergency protocols
 * 5. Privacy and Dignity Considerations - Ethical guidelines
 * 6. Legal and Liability Limitations - Legal protections
 * 7. User Responsibilities - User obligations
 * 8. Contact Information - Support contact details
 * 
 * Legal Protections:
 * - Platform liability limitations
 * - User-generated content disclaimers
 * - Emergency response disclaimers
 * - Privacy protection guidelines
 * - Content verification disclaimers
 */
const DisclaimerPage = () => {
  // ===== RENDER =====
  
  return (
    <div className="min-h-screen">
      {/* Hero section with disclaimer importance statement */}
      <section className="hero-gradient relative overflow-hidden py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-10 animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Important <span className="text-gradient">Disclaimer</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Please read this disclaimer carefully to understand the scope and limitations 
              of our platform and services.
            </p>
          </div>
        </div>
      </section>

      {/* Main content section with disclaimer details */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <div className="prose prose-lg max-w-none">
              <p className="text-sm text-gray-600 mb-8">
                <strong>Last updated:</strong> December 2024
              </p>

              <div className="mb-8 p-6 bg-accent-50 border border-accent-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-8 h-8 text-accent-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Platform Purpose and Limitations
                    </h2>
                    <p className="text-gray-700">
                      <strong>Destitutes of India is an awareness platform only.</strong> We are not a direct 
                      aid provider, emergency service, or government agency. Our role is to facilitate 
                      awareness and connect compassionate citizens with information about areas where 
                      help may be needed.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Direct Aid Provision
              </h2>
              <p className="text-gray-700 mb-6">
                <strong>Important:</strong> We do not provide direct assistance, emergency services, 
                or immediate aid to destitute individuals. Our platform serves as a bridge for 
                information sharing and awareness raising only. For immediate assistance or 
                emergency situations, please contact appropriate authorities or emergency services.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Content Authenticity and Verification
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>User-Generated Content:</strong> All photos and information on our platform 
                are submitted by users. We cannot verify the authenticity, accuracy, or current 
                status of every post. Users are responsible for the content they upload.
              </p>
              <p className="text-gray-700 mb-6">
                <strong>No Endorsement:</strong> The presence of content on our platform does not 
                constitute endorsement, verification, or guarantee of the information provided. 
                Users should exercise their own judgment and discretion.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Emergency and Crisis Situations
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>For Emergencies:</strong> If you encounter someone in immediate danger, 
                medical distress, or crisis situation:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li><strong>Call Emergency Services:</strong> Dial 100 for police, 108 for ambulance, or 101 for fire</li>
                <li><strong>Contact Local Authorities:</strong> Reach out to your nearest police station or government office</li>
                <li><strong>Seek Professional Help:</strong> Contact verified NGOs or social service organizations</li>
                <li><strong>Do Not Rely Solely on Our Platform:</strong> Our platform is not designed for emergency response</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Privacy and Dignity Considerations
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>Respect for Individuals:</strong> When using our platform:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Always respect the dignity and privacy of individuals in photos</li>
                <li>Obtain consent when possible before taking photos</li>
                <li>Do not exploit or sensationalize vulnerable situations</li>
                <li>Consider the potential impact on individuals and their families</li>
                <li>Report inappropriate or harmful content immediately</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Legal and Regulatory Compliance
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>Applicable Laws:</strong> Users must comply with all applicable laws and 
                regulations, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Privacy laws and data protection regulations</li>
                <li>Photography and consent laws</li>
                <li>Anti-harassment and anti-discrimination laws</li>
                <li>Local and national regulations regarding public photography</li>
                <li>Intellectual property and copyright laws</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Limitation of Liability
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>No Liability for Outcomes:</strong> Destitutes of India shall not be liable for:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Any actions taken by users based on information from our platform</li>
                <li>Outcomes or results of assistance provided by third parties</li>
                <li>Accuracy or completeness of user-generated content</li>
                <li>Decisions made by authorities or organizations based on platform information</li>
                <li>Any harm, damage, or loss resulting from platform use</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Third-Party Services and Organizations
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>External Organizations:</strong> We may provide information about or links 
                to third-party organizations, but we:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Do not endorse or guarantee the services of any third-party organization</li>
                <li>Are not responsible for the actions, policies, or practices of external organizations</li>
                <li>Do not verify the credentials or effectiveness of listed organizations</li>
                <li>Recommend users conduct their own research before engaging with any organization</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Platform Availability and Technical Issues
              </h2>
              <p className="text-gray-700 mb-6">
                <strong>Service Availability:</strong> We strive to maintain platform availability 
                but cannot guarantee uninterrupted access. Technical issues, maintenance, or 
                external factors may affect service. We are not liable for any consequences 
                of platform unavailability.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                User Responsibility and Due Diligence
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>User Obligations:</strong> By using our platform, you acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>You will exercise reasonable care and judgment when using platform information</li>
                <li>You will verify information independently before taking action</li>
                <li>You will respect the rights and dignity of all individuals</li>
                <li>You will comply with all applicable laws and regulations</li>
                <li>You will report inappropriate content or behavior</li>
                <li>You understand the platform's limitations and scope</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Changes to Disclaimer
              </h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to modify this disclaimer at any time. Changes will be 
                posted on this page with an updated "Last updated" date. Continued use of 
                the platform after changes constitutes acceptance of the updated disclaimer.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Information for Concerns
              </h2>
              <p className="text-gray-700 mb-6">
                If you have concerns about content, platform use, or need clarification on 
                this disclaimer, please contact us:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Mail className="w-6 h-6 text-primary-600" />
                    <h3 className="font-semibold text-gray-900">General Inquiries</h3>
                  </div>
                  <p className="text-gray-700 mb-2">
                    <a href="mailto:contact@destitutesofindia.com" className="text-primary-600 hover:underline">
                      contact@destitutesofindia.com
                    </a>
                  </p>
                  <p className="text-sm text-gray-600">
                    For general questions and platform support
                  </p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Phone className="w-6 h-6 text-primary-600" />
                    <h3 className="font-semibold text-gray-900">Urgent Matters</h3>
                  </div>
                  <p className="text-gray-700 mb-2">
                    <a href="tel:+91-XXXXXXXXXX" className="text-primary-600 hover:underline">
                      +91-XXXXXXXXXX
                    </a>
                  </p>
                  <p className="text-sm text-gray-600">
                    For urgent concerns requiring immediate attention
                  </p>
                </div>
              </div>

              <div className="mt-8 glass-card p-6">
                <div className="flex items-start space-x-3">
                  <Info className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Acknowledgment
                    </h3>
                    <p className="text-gray-700">
                      By using our platform, you acknowledge that you have read, understood, 
                      and agree to this disclaimer. You understand the platform's purpose, 
                      limitations, and your responsibilities as a user.
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

export default DisclaimerPage;
