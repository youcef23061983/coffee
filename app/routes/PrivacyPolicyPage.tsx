import React, { useState } from "react";
import { motion } from "framer-motion";

interface PrivacySection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const PrivacyPolicyPage: React.FC = () => {
  const [lastUpdated] = useState<string>("October 26, 2024");

  const sections: PrivacySection[] = [
    {
      id: "introduction",
      title: "1. Introduction & Scope",
      content: (
        <>
          <p className="mb-4">
            Welcome to BrewTopia Coffee Company ("BrewTopia," "we," "us," or
            "our"). We are committed to protecting your privacy and being
            transparent about how we collect, use, and share your personal
            information. This Privacy Policy explains our practices regarding
            the information we collect when you visit our website
            (brewtopia.com), use our mobile application, purchase our products,
            subscribe to our services, or interact with us in any other way.
          </p>
          <p className="mb-4">
            This policy applies to all information collected through our
            Website, any related sales, marketing, or events, and when you
            interact with us on social media or through other third-party
            platforms (collectively, the "Services").
          </p>
          <p>
            <strong>Please read this Privacy Policy carefully.</strong> By using
            our Services, you consent to the collection, use, and sharing of
            your information as described herein. If you do not agree with our
            policies and practices, please do not use our Services.
          </p>
        </>
      ),
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">
              A. Information You Provide to Us
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                <strong>Account Information:</strong> Name, email address,
                password, phone number, shipping/billing address
              </li>
              <li>
                <strong>Payment Information:</strong> Credit card details,
                billing address (processed securely through our payment
                processors)
              </li>
              <li>
                <strong>Profile Information:</strong> Coffee preferences,
                brewing methods, taste profiles from our quiz, subscription
                preferences
              </li>
              <li>
                <strong>Communications:</strong> Emails, chat messages, customer
                service inquiries, feedback
              </li>
              <li>
                <strong>Event Participation:</strong> Information provided when
                attending our virtual cupping sessions or workshops
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">
              B. Information Collected Automatically
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                <strong>Device Information:</strong> IP address, browser type,
                operating system, device identifiers
              </li>
              <li>
                <strong>Usage Data:</strong> Pages visited, time spent, clicks,
                search queries, referring URLs
              </li>
              <li>
                <strong>Cookies & Similar Technologies:</strong> We use cookies,
                web beacons, and similar tracking technologies to enhance your
                experience and analyze usage
              </li>
              <li>
                <strong>Location Data:</strong> General location information
                based on IP address or precise location (if you grant
                permission)
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">
              C. Information from Third Parties
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                <strong>Social Media:</strong> Information from social media
                platforms when you connect your account or interact with our
                content
              </li>
              <li>
                <strong>Partners:</strong> Information from our coffee farm
                partners or roasters for order fulfillment
              </li>
              <li>
                <strong>Service Providers:</strong> Analytics providers,
                marketing partners, payment processors
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "how-we-use",
      title: "3. How We Use Your Information",
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">
                Service Fulfillment
              </h4>
              <ul className="space-y-1 text-sm">
                <li>• Process and ship your orders</li>
                <li>• Manage your subscription</li>
                <li>• Provide customer support</li>
                <li>• Send order confirmations</li>
              </ul>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">
                Personalization
              </h4>
              <ul className="space-y-1 text-sm">
                <li>• Recommend coffees based on your taste profile</li>
                <li>• Customize your browsing experience</li>
                <li>• Create personalized content</li>
                <li>• Remember your preferences</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">
                Communication
              </h4>
              <ul className="space-y-1 text-sm">
                <li>• Send transactional emails</li>
                <li>• Share coffee education content</li>
                <li>• Provide brewing tips and recipes</li>
                <li>• Notify about subscription updates</li>
              </ul>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">
                Business Operations
              </h4>
              <ul className="space-y-1 text-sm">
                <li>• Analyze usage patterns</li>
                <li>• Improve our products and services</li>
                <li>• Ensure security and prevent fraud</li>
                <li>• Comply with legal obligations</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 mt-4">
            We only process your personal information when we have a valid legal
            basis to do so, including: (a) your consent; (b) to fulfill our
            contractual obligations to you; (c) to comply with legal
            obligations; or (d) for our legitimate business interests, such as
            improving our Services.
          </p>
        </div>
      ),
    },
    {
      id: "sharing",
      title: "4. How We Share Your Information",
      content: (
        <>
          <p className="mb-4 text-gray-700">
            We do not sell your personal information to third parties. We may
            share your information in the following circumstances:
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-amber-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-1">
                With Service Providers
              </h4>
              <p className="text-gray-700 text-sm">
                Trusted third parties who assist in operating our business, such
                as payment processors (Stripe, PayPal), shipping carriers (UPS,
                USPS, DHL), email service providers, and analytics providers.
                These parties are contractually obligated to protect your
                information.
              </p>
            </div>

            <div className="border-l-4 border-amber-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-1">
                With Coffee Partners
              </h4>
              <p className="text-gray-700 text-sm">
                Necessary shipping information (name, address) with our artisan
                roasters and farm partners to fulfill your specific coffee
                orders. We do not share payment information with these partners.
              </p>
            </div>

            <div className="border-l-4 border-amber-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-1">
                For Legal Compliance
              </h4>
              <p className="text-gray-700 text-sm">
                When required by law, regulation, legal process, or governmental
                request, or to protect the rights, property, or safety of
                BrewTopia, our customers, or others.
              </p>
            </div>

            <div className="border-l-4 border-amber-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-1">
                Business Transfers
              </h4>
              <p className="text-gray-700 text-sm">
                In connection with a merger, acquisition, financing, or sale of
                assets, where your information may be transferred as a business
                asset.
              </p>
            </div>

            <div className="border-l-4 border-amber-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-1">
                With Your Consent
              </h4>
              <p className="text-gray-700 text-sm">
                When you explicitly authorize us to share your information with
                third parties, such as when participating in collaborative
                tasting events.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "cookies",
      title: "5. Cookies & Tracking Technologies",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            We use cookies and similar tracking technologies to collect and use
            personal information about you, including to serve interest-based
            advertising. Cookies are small data files placed on your device that
            help us:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-amber-600 font-bold mb-2">Essential</div>
              <p className="text-sm">
                Required for site functionality, security, and account access
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-amber-600 font-bold mb-2">Performance</div>
              <p className="text-sm">
                Help us understand how visitors interact with our site
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-amber-600 font-bold mb-2">Functional</div>
              <p className="text-sm">
                Remember your preferences and personalize content
              </p>
            </div>
          </div>

          <p className="text-gray-700">
            You can control cookies through your browser settings. However,
            disabling certain cookies may limit your ability to use some
            features of our Services. For detailed information about the cookies
            we use and your choices, please see our{" "}
            <a
              href="/cookie-policy"
              className="text-amber-700 hover:text-amber-800 font-medium"
            >
              Cookie Policy
            </a>
            .
          </p>
        </div>
      ),
    },
    {
      id: "data-security",
      title: "6. Data Security & Retention",
      content: (
        <>
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">
              Our Security Measures
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-green-700">
              <li>SSL/TLS encryption for all data transmissions</li>
              <li>PCI-DSS compliant payment processing</li>
              <li>Regular security assessments and monitoring</li>
              <li>Access controls and authentication protocols</li>
              <li>Secure data storage with industry-standard safeguards</li>
            </ul>
          </div>

          <p className="mb-4 text-gray-700">
            We implement appropriate technical and organizational measures
            designed to protect the security of your personal information.
            However, no method of transmission over the Internet or electronic
            storage is 100% secure. We cannot guarantee absolute security.
          </p>

          <p className="text-gray-700">
            <strong>Data Retention:</strong> We retain your personal information
            only for as long as necessary to fulfill the purposes outlined in
            this Privacy Policy, unless a longer retention period is required or
            permitted by law. Typically, we retain:
          </p>

          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
            <li>
              <strong>Account information:</strong> While your account is active
              and for 3 years after closure for legal compliance
            </li>
            <li>
              <strong>Transaction records:</strong> 7 years for tax and
              accounting purposes
            </li>
            <li>
              <strong>Marketing preferences:</strong> Until you opt-out or
              request deletion
            </li>
            <li>
              <strong>Analytics data:</strong> Aggregated and anonymized after 2
              years
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "your-rights",
      title: "7. Your Privacy Rights",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700">
            Depending on your location, you may have certain rights regarding
            your personal information. These may include:
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-amber-50">
                <tr>
                  <th className="border border-gray-300 p-3 text-left font-semibold">
                    Right
                  </th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium">
                    Access
                  </td>
                  <td className="border border-gray-300 p-3">
                    Request a copy of your personal information
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium">
                    Correction
                  </td>
                  <td className="border border-gray-300 p-3">
                    Update or correct inaccurate information
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium">
                    Deletion
                  </td>
                  <td className="border border-gray-300 p-3">
                    Request deletion of your personal information
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium">
                    Opt-Out
                  </td>
                  <td className="border border-gray-300 p-3">
                    Opt out of marketing communications
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-medium">
                    Portability
                  </td>
                  <td className="border border-gray-300 p-3">
                    Request transfer of your data to another service
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium">
                    Objection
                  </td>
                  <td className="border border-gray-300 p-3">
                    Object to certain processing activities
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">
              How to Exercise Your Rights
            </h4>
            <p className="text-blue-700 mb-2">
              To exercise any of these rights, please contact us at:
            </p>
            <div className="space-y-1">
              <p>
                <strong>Email:</strong> privacy@brewtopia.com
              </p>
              <p>
                <strong>Mail:</strong> BrewTopia Privacy Officer, 123 Coffee
                Lane, Portland, OR 97205
              </p>
              <p>
                <strong>Online:</strong> Through your account settings page
              </p>
            </div>
            <p className="text-blue-700 text-sm mt-2">
              We will respond to your request within 30 days and may need to
              verify your identity before processing.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "children",
      title: "8. Children's Privacy",
      content: (
        <div className="bg-amber-50 p-4 rounded-lg">
          <p className="text-gray-700">
            Our Services are not directed to individuals under the age of 18. We
            do not knowingly collect personal information from children under
            18. If we become aware that a child under 18 has provided us with
            personal information, we will take steps to delete such information.
            If you become aware that a child has provided us with personal
            information, please contact us immediately.
          </p>
        </div>
      ),
    },
    {
      id: "international",
      title: "9. International Data Transfers",
      content: (
        <p className="text-gray-700">
          BrewTopia is based in the United States. If you are accessing our
          Services from outside the U.S., please be aware that your information
          may be transferred to, stored, and processed in the U.S. where our
          servers are located and our central database is operated. The data
          protection laws in the U.S. may differ from those in your country. By
          using our Services, you consent to the transfer of your information to
          the U.S. We use appropriate safeguards, such as standard contractual
          clauses, for transfers of personal information outside their country
          of origin.
        </p>
      ),
    },
    {
      id: "changes",
      title: "10. Changes to This Policy",
      content: (
        <div className="space-y-3">
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, technology, legal requirements, or other
            factors. We will notify you of any material changes by:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              Posting the updated policy on this page with a new "Last Updated"
              date
            </li>
            <li>Sending an email notification to registered users</li>
            <li>
              Displaying a prominent notice on our website before changes take
              effect
            </li>
          </ul>
          <p className="text-gray-700 font-medium">
            Your continued use of our Services after any modification to this
            Privacy Policy will constitute your acceptance of such modification.
          </p>
        </div>
      ),
    },
    {
      id: "contact",
      title: "11. Contact Us",
      content: (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-4">
            Questions or Concerns?
          </h4>
          <p className="mb-4 text-gray-700">
            If you have any questions about this Privacy Policy or our privacy
            practices, please contact our Data Protection Officer:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-gray-800 mb-2">By Email</h5>
              <a
                href="mailto:privacy@brewtopia.com"
                className="text-amber-700 hover:text-amber-800 font-medium"
              >
                privacy@brewtopia.com
              </a>
              <p className="text-sm text-gray-600 mt-1">
                Typically responds within 48 hours
              </p>
            </div>

            <div>
              <h5 className="font-medium text-gray-800 mb-2">By Mail</h5>
              <p className="text-gray-700">
                BrewTopia Coffee Company
                <br />
                Attn: Privacy Officer
                <br />
                123 Coffee Lane
                <br />
                Portland, OR 97205
                <br />
                United States
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              For California residents: Please see our{" "}
              <a href="/ccpa" className="text-amber-700 hover:text-amber-800">
                California Privacy Notice
              </a>{" "}
              for additional disclosures required under the CCPA/CPRA.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              For EU/UK residents: BrewTopia's representative in the EU can be
              contacted at{" "}
              <a
                href="mailto:eu-representative@brewtopia.com"
                className="text-amber-700 hover:text-amber-800"
              >
                eu-representative@brewtopia.com
              </a>
              .
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat "
          style={{ backgroundImage: "url('/policy.png')" }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mrs-saint-delafield-regular text-4xl md:text-6xl font-bold mb-4"
          >
            Privacy Policy for BrewTopia Coffee Company
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl opacity-90"
          >
            At BrewTopia, we believe great coffee should be brewed with
            transparency and trust, just as it's grown. This Privacy Policy
            outlines how we collect, use, and protect your personal
            information—ensuring your journey through the world of specialty
            coffee is both exceptional and secure.{" "}
          </motion.p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto mt-7 mb-7">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-serif font-bold text-gray-900">
              Privacy Policy
            </h1>
            <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
              Last Updated: {lastUpdated}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
            <p className="text-gray-700 mb-4">
              At BrewTopia, we believe that trust is the foundation of every
              great relationship—just like the relationship between a coffee
              farmer and their craft. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website, use our services, or interact with us.
            </p>
            <p className="text-gray-700">
              We're committed to being transparent about our data practices and
              giving you control over your personal information. Please take a
              moment to familiarize yourself with our privacy practices.
            </p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="sticky top-4 z-10 mb-10">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">
              Quick Navigation
            </h3>
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="inline-block px-3 py-1.5 text-sm bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-full transition-colors"
                >
                  {section.title.split(" ")[0]}{" "}
                  {/* Shows just the section number */}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-10">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className="scroll-mt-24 bg-white rounded-xl shadow-sm p-8 border border-gray-200"
            >
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold mr-4">
                  {index + 1}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 pt-1">
                  {section.title}
                </h2>
              </div>

              <div className="pl-14">{section.content}</div>

              <div className="flex justify-end mt-6 pt-6 border-t border-gray-100">
                <a
                  href="#top"
                  className="text-sm text-amber-700 hover:text-amber-800 font-medium flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  Back to top
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>
            This Privacy Policy is effective as of {lastUpdated}. For previous
            versions, please contact us.
          </p>
          <p className="mt-2">
            BrewTopia Coffee Company is a registered trademark. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
