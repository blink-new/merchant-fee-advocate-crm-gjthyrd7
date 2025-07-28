import React from 'react';

export const DataProcessingAgreement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Data Processing Agreement</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                This Data Processing Agreement ("DPA") forms part of the Terms & Conditions between 
                Merchant Fee Advocate ("Company," "we," "us") and you ("Partner," "you") regarding 
                the processing of personal data through our Referral Partner CRM Platform ("Platform").
              </p>
              <p className="text-gray-700 mb-4">
                This DPA addresses the requirements of the General Data Protection Regulation (GDPR), 
                California Consumer Privacy Act (CCPA), and other applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Definitions</h2>
              <p className="text-gray-700 mb-4">
                For the purposes of this DPA:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Personal Data:</strong> Any information relating to an identified or 
                    identifiable natural person</li>
                <li><strong>Data Controller:</strong> The entity that determines the purposes and 
                    means of processing personal data</li>
                <li><strong>Data Processor:</strong> The entity that processes personal data on 
                    behalf of the Data Controller</li>
                <li><strong>Data Subject:</strong> The individual to whom personal data relates</li>
                <li><strong>Processing:</strong> Any operation performed on personal data</li>
                <li><strong>Supervisory Authority:</strong> An independent public authority 
                    responsible for monitoring GDPR compliance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Roles and Responsibilities</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Company as Data Controller</h3>
              <p className="text-gray-700 mb-4">
                For personal data of Partners and Platform users, the Company acts as Data Controller and:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Determines the purposes and means of processing</li>
                <li>Ensures lawful basis for processing</li>
                <li>Implements appropriate technical and organizational measures</li>
                <li>Responds to data subject requests</li>
                <li>Maintains records of processing activities</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Partner as Data Controller</h3>
              <p className="text-gray-700 mb-4">
                For personal data of referred businesses and contacts, Partners act as Data Controllers and must:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Obtain proper consent before submitting personal data</li>
                <li>Ensure lawful basis for data collection and sharing</li>
                <li>Provide appropriate privacy notices to data subjects</li>
                <li>Handle data subject requests related to their submitted data</li>
                <li>Notify the Company of any data protection issues</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Company as Data Processor</h3>
              <p className="text-gray-700 mb-4">
                When processing personal data submitted by Partners, the Company acts as Data Processor and:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Processes data only on documented instructions from Partners</li>
                <li>Implements appropriate security measures</li>
                <li>Assists with data subject requests when required</li>
                <li>Notifies Partners of any data breaches</li>
                <li>Deletes or returns data upon termination</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Categories of Personal Data</h2>
              <p className="text-gray-700 mb-4">
                The Platform processes the following categories of personal data:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Partner Data</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Contact information (name, email, phone, address)</li>
                <li>Business information and tax identification</li>
                <li>Banking and payment information</li>
                <li>Platform usage and performance data</li>
                <li>Communication records</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Referred Business Data</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Business owner and contact information</li>
                <li>Business details and financial information</li>
                <li>Processing requirements and preferences</li>
                <li>Communication and interaction records</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Purposes of Processing</h2>
              <p className="text-gray-700 mb-4">
                Personal data is processed for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Providing and maintaining Platform services</li>
                <li>Managing partner relationships and accounts</li>
                <li>Processing referrals and tracking deal progress</li>
                <li>Calculating and paying commissions</li>
                <li>Providing customer support and assistance</li>
                <li>Complying with legal and regulatory requirements</li>
                <li>Improving Platform functionality and services</li>
                <li>Preventing fraud and ensuring security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Legal Basis for Processing</h2>
              <p className="text-gray-700 mb-4">
                We process personal data based on the following legal grounds:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Contract Performance:</strong> Processing necessary for partner agreements</li>
                <li><strong>Legitimate Interest:</strong> Business operations and fraud prevention</li>
                <li><strong>Consent:</strong> Where explicitly provided by data subjects</li>
                <li><strong>Legal Obligation:</strong> Compliance with applicable laws</li>
                <li><strong>Vital Interest:</strong> Protection of health and safety when necessary</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Security Measures</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures including:
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Measures</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Access controls and authentication systems</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Secure backup and disaster recovery procedures</li>
                <li>Network security and intrusion detection</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Organizational Measures</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Staff training on data protection principles</li>
                <li>Data protection impact assessments</li>
                <li>Incident response and breach notification procedures</li>
                <li>Regular review and update of security policies</li>
                <li>Vendor management and due diligence</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Transfers</h2>
              <p className="text-gray-700 mb-4">
                Personal data may be transferred to and processed in countries outside your jurisdiction. 
                We ensure appropriate safeguards are in place:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Standard Contractual Clauses approved by supervisory authorities</li>
                <li>Adequacy decisions by relevant data protection authorities</li>
                <li>Binding Corporate Rules where applicable</li>
                <li>Certification schemes and codes of conduct</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Data Subject Rights</h2>
              <p className="text-gray-700 mb-4">
                Data subjects have the following rights regarding their personal data:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Right of Access:</strong> Obtain confirmation and copies of personal data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of personal data</li>
                <li><strong>Right to Restrict Processing:</strong> Limit how data is processed</li>
                <li><strong>Right to Data Portability:</strong> Receive data in a portable format</li>
                <li><strong>Right to Object:</strong> Object to certain processing activities</li>
                <li><strong>Rights Related to Automated Decision-Making:</strong> Challenge automated decisions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Data Breach Notification</h2>
              <p className="text-gray-700 mb-4">
                In the event of a personal data breach:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>We will notify relevant supervisory authorities within 72 hours</li>
                <li>Affected data subjects will be notified without undue delay if high risk</li>
                <li>Partners will be notified if their submitted data is affected</li>
                <li>We will document all breaches and remedial actions taken</li>
                <li>We will cooperate with investigations and provide necessary information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain personal data only as long as necessary for the purposes outlined in this DPA:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Partner account data: Duration of partnership plus 7 years</li>
                <li>Referral data: Until deal completion plus 7 years</li>
                <li>Communication records: 3 years from last interaction</li>
                <li>Financial records: 7 years for tax and audit purposes</li>
                <li>Marketing data: Until consent is withdrawn</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Subprocessors</h2>
              <p className="text-gray-700 mb-4">
                We may engage subprocessors to assist with data processing. Current subprocessors include:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Cloud hosting providers for Platform infrastructure</li>
                <li>Payment processors for commission payments</li>
                <li>Email service providers for communications</li>
                <li>Analytics providers for Platform improvement</li>
                <li>Customer support platforms</li>
              </ul>
              <p className="text-gray-700 mb-4">
                All subprocessors are bound by appropriate data protection agreements and are 
                regularly audited for compliance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Partner Obligations</h2>
              <p className="text-gray-700 mb-4">
                As a Partner, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Obtain proper consent before submitting personal data</li>
                <li>Provide clear privacy notices to data subjects</li>
                <li>Ensure accuracy of submitted data</li>
                <li>Respond to data subject requests related to your submissions</li>
                <li>Notify us immediately of any data protection concerns</li>
                <li>Comply with all applicable data protection laws</li>
                <li>Maintain appropriate records of your data processing activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Termination</h2>
              <p className="text-gray-700 mb-4">
                Upon termination of the partnership agreement:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>We will cease processing personal data submitted by you</li>
                <li>Data will be returned or securely deleted as requested</li>
                <li>Retention periods for legal compliance will be respected</li>
                <li>Certificates of deletion will be provided upon request</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about this Data Processing Agreement or data protection matters:
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