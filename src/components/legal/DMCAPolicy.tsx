import React from 'react';

export const DMCAPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">DMCA Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Overview</h2>
              <p className="text-gray-700 mb-4">
                Merchant Fee Advocate respects the intellectual property rights of others and expects 
                our users to do the same. In accordance with the Digital Millennium Copyright Act 
                ("DMCA"), we have adopted the following policy regarding copyright infringement on 
                our Referral Partner CRM Platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Copyright Infringement Notification</h2>
              <p className="text-gray-700 mb-4">
                If you believe that your copyrighted work has been copied and is accessible on our 
                Platform in a way that constitutes copyright infringement, please provide our 
                designated copyright agent with the following information:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>A physical or electronic signature of the copyright owner or authorized agent</li>
                <li>Identification of the copyrighted work claimed to have been infringed</li>
                <li>Identification of the material that is claimed to be infringing and information 
                    reasonably sufficient to permit us to locate the material</li>
                <li>Your contact information, including address, telephone number, and email address</li>
                <li>A statement that you have a good faith belief that use of the material is not 
                    authorized by the copyright owner, its agent, or the law</li>
                <li>A statement that the information in the notification is accurate, and under 
                    penalty of perjury, that you are authorized to act on behalf of the copyright owner</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Designated Copyright Agent</h2>
              <p className="text-gray-700 mb-4">
                Please send DMCA notices to our designated copyright agent:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700">
                  <strong>DMCA Agent</strong><br />
                  Merchant Fee Advocate<br />
                  Email: compliance@merchantfeeadvocate.com<br />
                  Attention: DMCA Notice
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Counter-Notification Process</h2>
              <p className="text-gray-700 mb-4">
                If you believe that your content was removed or disabled by mistake or 
                misidentification, you may file a counter-notification with our copyright agent. 
                Your counter-notification must include:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Your physical or electronic signature</li>
                <li>Identification of the material that was removed or disabled and the location 
                    where it appeared before removal</li>
                <li>A statement under penalty of perjury that you have a good faith belief that 
                    the material was removed by mistake or misidentification</li>
                <li>Your name, address, telephone number, and email address</li>
                <li>A statement that you consent to the jurisdiction of the federal district court 
                    for your address, or if outside the United States, any judicial district in 
                    which we may be found</li>
                <li>A statement that you will accept service of process from the person who provided 
                    the original DMCA notice</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Response to Notices</h2>
              <p className="text-gray-700 mb-4">
                Upon receipt of a valid DMCA notice, we will:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Remove or disable access to the allegedly infringing material</li>
                <li>Notify the user who posted the material of the removal</li>
                <li>Provide the user with a copy of the DMCA notice</li>
                <li>Inform the user of their right to file a counter-notification</li>
              </ul>
              <p className="text-gray-700 mb-4">
                If we receive a valid counter-notification, we may restore the removed material 
                unless the copyright owner files a court action seeking a restraining order.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Repeat Infringer Policy</h2>
              <p className="text-gray-700 mb-4">
                We have a policy of terminating the accounts of users who are repeat copyright 
                infringers. We may also terminate accounts of users who are subject to repeated 
                DMCA notices, whether or not there is a final determination of copyright infringement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. False Claims</h2>
              <p className="text-gray-700 mb-4">
                Please note that under Section 512(f) of the DMCA, any person who knowingly 
                materially misrepresents that material is infringing or was removed by mistake 
                may be subject to liability. We reserve the right to seek damages from any party 
                that submits a false or fraudulent DMCA notice or counter-notification.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Platform Content</h2>
              <p className="text-gray-700 mb-4">
                This DMCA policy applies to all content on our Platform, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>User-uploaded documents and files</li>
                <li>Profile images and business logos</li>
                <li>Marketing materials and presentations</li>
                <li>Training content and resources</li>
                <li>Any other user-generated content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitations</h2>
              <p className="text-gray-700 mb-4">
                This DMCA policy does not apply to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Trademark disputes (which should be reported separately)</li>
                <li>Privacy concerns or personal information</li>
                <li>Defamation or other non-copyright legal issues</li>
                <li>Content that violates our Terms of Service for other reasons</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Processing Time</h2>
              <p className="text-gray-700 mb-4">
                We typically process valid DMCA notices within 24-48 hours of receipt. 
                Counter-notifications are processed within 10-14 business days as required by law. 
                We will notify all relevant parties of any actions taken.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Good Faith Requirement</h2>
              <p className="text-gray-700 mb-4">
                We expect all parties to act in good faith when submitting DMCA notices and 
                counter-notifications. Abuse of the DMCA process may result in account termination 
                and potential legal action.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this DMCA policy from time to time. Any changes will be posted on 
                this page with an updated revision date. Continued use of the Platform constitutes 
                acceptance of any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about this DMCA policy or to report copyright infringement:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Copyright Agent</strong><br />
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