import React from 'react';

export const AcceptableUsePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Acceptable Use Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Purpose</h2>
              <p className="text-gray-700 mb-4">
                This Acceptable Use Policy ("Policy") governs your use of the Merchant Fee Advocate 
                Referral Partner CRM Platform ("Platform"). This Policy is designed to ensure that 
                all users can enjoy a safe, secure, and productive environment while using our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Scope</h2>
              <p className="text-gray-700 mb-4">
                This Policy applies to all users of the Platform, including referral partners, 
                administrators, and any other authorized users. It covers all activities conducted 
                through or in connection with the Platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Acceptable Uses</h2>
              <p className="text-gray-700 mb-4">
                The Platform is intended for legitimate business purposes related to payment 
                processing referrals. Acceptable uses include:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Submitting genuine business leads for payment processing services</li>
                <li>Tracking and managing your referral pipeline</li>
                <li>Communicating with Merchant Fee Advocate staff about business matters</li>
                <li>Accessing training materials and resources</li>
                <li>Monitoring commission earnings and performance metrics</li>
                <li>Updating your profile and account information</li>
                <li>Participating in partner programs and initiatives</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Prohibited Activities</h2>
              <p className="text-gray-700 mb-4">
                The following activities are strictly prohibited when using the Platform:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fraudulent Activities</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Submitting false, misleading, or fabricated business information</li>
                <li>Creating fake leads or duplicate submissions</li>
                <li>Misrepresenting your relationship with referred businesses</li>
                <li>Attempting to manipulate commission calculations</li>
                <li>Identity theft or impersonation of others</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Security Violations</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Attempting to gain unauthorized access to the Platform or other accounts</li>
                <li>Sharing your login credentials with unauthorized parties</li>
                <li>Attempting to bypass security measures or access controls</li>
                <li>Introducing malware, viruses, or other harmful code</li>
                <li>Conducting security testing without explicit permission</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Abuse and Harassment</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Harassing, threatening, or intimidating other users or staff</li>
                <li>Posting or transmitting offensive, discriminatory, or hateful content</li>
                <li>Engaging in cyberbullying or stalking behavior</li>
                <li>Sending unsolicited commercial communications (spam)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Violations</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Using the Platform for any illegal activities</li>
                <li>Violating applicable laws, regulations, or industry standards</li>
                <li>Infringing on intellectual property rights</li>
                <li>Violating privacy laws or data protection regulations</li>
                <li>Money laundering or other financial crimes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Platform Abuse</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Overloading or attempting to disrupt Platform services</li>
                <li>Using automated tools or bots without permission</li>
                <li>Attempting to reverse engineer or copy Platform functionality</li>
                <li>Interfering with other users' access to the Platform</li>
                <li>Circumventing usage limits or restrictions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Protection Requirements</h2>
              <p className="text-gray-700 mb-4">
                When using the Platform, you must:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Obtain proper consent before submitting business contact information</li>
                <li>Comply with applicable privacy laws (GDPR, CCPA, etc.)</li>
                <li>Protect sensitive information from unauthorized disclosure</li>
                <li>Report any suspected data breaches immediately</li>
                <li>Use data only for legitimate business purposes</li>
                <li>Respect opt-out requests and privacy preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Content Standards</h2>
              <p className="text-gray-700 mb-4">
                All content uploaded to or transmitted through the Platform must:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Be accurate and truthful</li>
                <li>Be relevant to legitimate business purposes</li>
                <li>Comply with applicable laws and regulations</li>
                <li>Respect intellectual property rights</li>
                <li>Be free from malicious code or harmful content</li>
                <li>Maintain professional standards and business etiquette</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Monitoring and Enforcement</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Monitor Platform usage for compliance with this Policy</li>
                <li>Investigate suspected violations</li>
                <li>Remove or disable access to violating content</li>
                <li>Suspend or terminate accounts for policy violations</li>
                <li>Cooperate with law enforcement when required</li>
                <li>Take legal action against violators</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Consequences of Violations</h2>
              <p className="text-gray-700 mb-4">
                Violations of this Policy may result in:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Warning and Education</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Written warning for minor or first-time violations</li>
                <li>Required training on proper Platform usage</li>
                <li>Temporary restrictions on certain features</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Restrictions</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Temporary suspension of Platform access</li>
                <li>Limitation of certain Platform features</li>
                <li>Increased monitoring of account activity</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Termination</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Permanent termination of Platform access</li>
                <li>Forfeiture of pending commissions</li>
                <li>Prohibition from creating new accounts</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Action</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Civil litigation for damages</li>
                <li>Criminal prosecution for illegal activities</li>
                <li>Cooperation with law enforcement investigations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Reporting Violations</h2>
              <p className="text-gray-700 mb-4">
                If you become aware of any violations of this Policy, please report them immediately:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700">
                  <strong>Report Violations:</strong><br />
                  Email: compliance@merchantfeeadvocate.com<br />
                  Subject Line: "Policy Violation Report"
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                Include as much detail as possible, including usernames, dates, times, and 
                descriptions of the violating behavior.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Appeals Process</h2>
              <p className="text-gray-700 mb-4">
                If you believe your account has been restricted or terminated in error, you may 
                appeal the decision by contacting us within 30 days. Include:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Your account information and contact details</li>
                <li>A detailed explanation of why you believe the action was incorrect</li>
                <li>Any supporting evidence or documentation</li>
                <li>A commitment to comply with all policies going forward</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Policy Updates</h2>
              <p className="text-gray-700 mb-4">
                We may update this Policy from time to time to reflect changes in our services, 
                applicable laws, or industry best practices. We will notify users of material 
                changes and provide reasonable notice before implementation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about this Acceptable Use Policy:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Policy Questions:</strong><br />
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