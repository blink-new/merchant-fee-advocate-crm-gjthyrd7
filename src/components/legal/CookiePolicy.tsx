import React from 'react';

export const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are placed on your device when you visit our 
                Referral Partner CRM Platform. They help us provide you with a better experience 
                by remembering your preferences and understanding how you use our Platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies are necessary for the Platform to function properly and cannot be 
                disabled. They include:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Authentication cookies to keep you logged in</li>
                <li>Security cookies to protect against fraud</li>
                <li>Session cookies to maintain your Platform state</li>
                <li>Load balancing cookies for Platform performance</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Functional Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies enhance your experience by remembering your preferences:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Language and region preferences</li>
                <li>Dashboard layout and customization settings</li>
                <li>Form data to prevent loss during navigation</li>
                <li>Notification preferences and settings</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies help us understand how you use the Platform:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Page views and navigation patterns</li>
                <li>Feature usage and interaction data</li>
                <li>Performance metrics and error tracking</li>
                <li>User journey and conversion analysis</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies help us optimize Platform performance:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Load time measurement and optimization</li>
                <li>Server response time monitoring</li>
                <li>Resource usage tracking</li>
                <li>Error detection and reporting</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Third-Party Cookies</h2>
              <p className="text-gray-700 mb-4">
                We may use third-party services that set their own cookies:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics Services</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Google Analytics for usage statistics</li>
                <li>Hotjar for user behavior analysis</li>
                <li>Mixpanel for event tracking</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Support Services</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Intercom for customer support chat</li>
                <li>Zendesk for help desk functionality</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Services</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Stripe for payment processing</li>
                <li>PayPal for alternative payment methods</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookie Duration</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Session Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies are temporary and are deleted when you close your browser. 
                They are used for essential Platform functionality.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Persistent Cookies</h3>
              <p className="text-gray-700 mb-4">
                These cookies remain on your device for a specified period:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Authentication cookies: 30 days</li>
                <li>Preference cookies: 1 year</li>
                <li>Analytics cookies: 2 years</li>
                <li>Performance cookies: 1 year</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Your Cookie Preferences</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Platform Settings</h3>
              <p className="text-gray-700 mb-4">
                You can manage your cookie preferences through your account settings. 
                Navigate to Settings &gt; Privacy &gt; Cookie Preferences to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Enable or disable non-essential cookies</li>
                <li>View detailed information about each cookie type</li>
                <li>Set preferences for third-party cookies</li>
                <li>Clear existing cookies from your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Browser Settings</h3>
              <p className="text-gray-700 mb-4">
                You can also control cookies through your browser settings:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Block all cookies (may affect Platform functionality)</li>
                <li>Block third-party cookies only</li>
                <li>Delete existing cookies</li>
                <li>Set notifications for new cookies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Impact of Disabling Cookies</h2>
              <p className="text-gray-700 mb-4">
                Disabling certain cookies may affect your Platform experience:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Essential Cookies</h3>
              <p className="text-gray-700 mb-4">
                Disabling essential cookies will prevent you from using the Platform properly. 
                You may experience issues with:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Logging in and maintaining your session</li>
                <li>Accessing secure areas of the Platform</li>
                <li>Submitting forms and saving data</li>
                <li>Using interactive features</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Non-Essential Cookies</h3>
              <p className="text-gray-700 mb-4">
                Disabling non-essential cookies may result in:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Loss of personalized settings and preferences</li>
                <li>Reduced Platform performance optimization</li>
                <li>Limited analytics and improvement capabilities</li>
                <li>Less relevant support and assistance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookie Consent</h2>
              <p className="text-gray-700 mb-4">
                By continuing to use the Platform, you consent to our use of cookies as described 
                in this policy. You can withdraw your consent at any time by adjusting your 
                cookie preferences or browser settings.
              </p>
              <p className="text-gray-700 mb-4">
                For users in the European Union, we comply with the EU Cookie Law and GDPR 
                requirements for cookie consent and data protection.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Updates to This Cookie Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our 
                practices or applicable laws. We will notify you of any material changes by 
                posting the updated policy on the Platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Data Protection Officer</strong><br />
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