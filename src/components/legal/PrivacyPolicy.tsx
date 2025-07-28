import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Merchant Fee Advocate ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our Referral Partner CRM Platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Business information and tax identification numbers</li>
                <li>Banking information for commission payments</li>
                <li>Profile information and preferences</li>
                <li>Communication records and support requests</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lead Information</h3>
              <p className="text-gray-700 mb-4">
                Information about businesses you refer, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Business name, address, and contact details</li>
                <li>Industry type and business size</li>
                <li>Processing volume and requirements</li>
                <li>Decision maker contact information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Information</h3>
              <p className="text-gray-700 mb-4">
                We automatically collect information about your use of the Platform:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Log data, including IP address and browser type</li>
                <li>Platform usage patterns and feature interactions</li>
                <li>Device information and operating system</li>
                <li>Session duration and page views</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Provide and maintain the Platform services</li>
                <li>Process lead submissions and track deal progress</li>
                <li>Calculate and process commission payments</li>
                <li>Communicate with you about your account and services</li>
                <li>Provide customer support and technical assistance</li>
                <li>Improve Platform functionality and user experience</li>
                <li>Comply with legal obligations and prevent fraud</li>
                <li>Send important updates and notifications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">
                We may share your information in the following circumstances:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Operations</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>With payment processors to facilitate commission payments</li>
                <li>With merchant service providers to process referred leads</li>
                <li>With service providers who assist in Platform operations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Requirements</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>To comply with applicable laws and regulations</li>
                <li>To respond to legal process or government requests</li>
                <li>To protect our rights, property, or safety</li>
                <li>To prevent fraud or illegal activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication requirements</li>
                <li>Employee training on data protection practices</li>
                <li>Incident response and breach notification procedures</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Provide Platform services and support</li>
                <li>Process commission payments and maintain records</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Resolve disputes and enforce agreements</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Typically, we retain partner data for 7 years after account closure for tax and 
                legal compliance purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Receive your data in a portable format</li>
                <li><strong>Restriction:</strong> Limit how we process your information</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your Platform experience. 
                For detailed information about our cookie practices, please see our Cookie Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Links</h2>
              <p className="text-gray-700 mb-4">
                The Platform may contain links to third-party websites or services. We are not 
                responsible for the privacy practices of these third parties. We encourage you 
                to review their privacy policies before providing any information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Your information may be transferred to and processed in countries other than your 
                country of residence. We ensure appropriate safeguards are in place to protect 
                your information in accordance with applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                The Platform is not intended for use by individuals under 18 years of age. 
                We do not knowingly collect personal information from children under 18.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any 
                material changes by posting the new Privacy Policy on the Platform and updating 
                the "Last Updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Privacy Officer</strong><br />
                  Merchant Fee Advocate<br />
                  Email: compliance@merchantfeeadvocate.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};