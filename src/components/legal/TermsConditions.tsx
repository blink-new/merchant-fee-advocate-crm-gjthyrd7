import React from 'react';

export const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using the Merchant Fee Advocate Referral Partner CRM Platform ("Platform"), 
                you accept and agree to be bound by the terms and provision of this agreement. If you do not 
                agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Platform Description</h2>
              <p className="text-gray-700 mb-4">
                The Platform is a comprehensive CRM system designed for referral partners to manage business 
                leads for payment processing services. The Platform enables partners to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Submit and track business referrals</li>
                <li>Monitor deal pipeline progress</li>
                <li>Calculate potential and estimated monthly revenue</li>
                <li>Access performance dashboards and analytics</li>
                <li>Manage partner profile and commission tracking</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Partner Eligibility</h2>
              <p className="text-gray-700 mb-4">
                To become a referral partner, you must:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not engage in fraudulent or deceptive practices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Commission Structure</h2>
              <p className="text-gray-700 mb-4">
                Commission payments are based on successfully closed deals and are calculated as a percentage 
                of net monthly revenue generated from referred businesses. Commission rates and payment terms 
                will be specified in your individual partner agreement.
              </p>
              <p className="text-gray-700 mb-4">
                Commissions are paid monthly for active accounts. Partners must maintain accurate records 
                and provide necessary documentation for commission calculations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Lead Submission Requirements</h2>
              <p className="text-gray-700 mb-4">
                All lead submissions must:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Contain accurate and complete business information</li>
                <li>Be legitimate business opportunities</li>
                <li>Not be duplicate submissions from other partners</li>
                <li>Include proper contact authorization from the business</li>
                <li>Comply with all applicable privacy and data protection laws</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Prohibited Activities</h2>
              <p className="text-gray-700 mb-4">
                Partners are prohibited from:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Submitting false or misleading information</li>
                <li>Attempting to manipulate commission calculations</li>
                <li>Sharing account credentials with unauthorized parties</li>
                <li>Using the Platform for any illegal activities</li>
                <li>Interfering with the Platform's operation or security</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Protection and Privacy</h2>
              <p className="text-gray-700 mb-4">
                We are committed to protecting your privacy and the privacy of the businesses you refer. 
                All data handling practices are governed by our Privacy Policy, which is incorporated 
                into these Terms by reference.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Platform Availability</h2>
              <p className="text-gray-700 mb-4">
                While we strive to maintain continuous Platform availability, we do not guarantee 
                uninterrupted access. We reserve the right to modify, suspend, or discontinue the 
                Platform at any time with reasonable notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                Merchant Fee Advocate shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-700 mb-4">
                Either party may terminate the partnership agreement at any time with 30 days written notice. 
                Upon termination, access to the Platform will be revoked, and final commission payments 
                will be processed according to the payment schedule.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Modifications to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. Changes will be effective 
                immediately upon posting to the Platform. Continued use of the Platform constitutes 
                acceptance of modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions regarding these Terms & Conditions, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Merchant Fee Advocate</strong><br />
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