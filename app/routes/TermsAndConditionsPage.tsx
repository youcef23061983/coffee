import React, { useState } from "react";
import { motion } from "framer-motion";
interface TermsSection {
  id: string;
  title: string;
  content: React.ReactNode;
  important?: boolean;
}

const TermsAndConditionsPage: React.FC = () => {
  const [lastUpdated] = useState<string>("October 26, 2024");
  const [activeSection, setActiveSection] = useState<string>("agreement");

  const sections: TermsSection[] = [
    {
      id: "agreement",
      title: "1. Agreement to Terms",
      important: true,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            By accessing or using the BrewTopia website, mobile application, or
            services (collectively, the "Services"), you agree to be bound by
            these Terms and Conditions ("Terms"). If you do not agree to these
            Terms, you may not access or use our Services.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-600 p-4">
            <p className="text-amber-800 font-medium mb-2">Important Note:</p>
            <p className="text-amber-700 text-sm">
              These Terms constitute a legally binding agreement between you and
              BrewTopia Coffee Company. We recommend you read them carefully and
              print a copy for your records.
            </p>
          </div>
          <p className="text-gray-700">
            We may modify these Terms at any time. When we make changes, we will
            update the "Last Updated" date at the top of this page. Your
            continued use of our Services after any modification constitutes
            your acceptance of the modified Terms.
          </p>
        </div>
      ),
    },
    {
      id: "eligibility",
      title: "2. Eligibility",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">To use our Services, you must:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Be at least 18 years of age</li>
            <li>Have the legal capacity to enter into a binding contract</li>
            <li>
              Reside in a country or region where our Services are available
            </li>
            <li>Provide accurate and complete registration information</li>
          </ul>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">
              <strong>Age Restriction:</strong> We do not knowingly collect
              information from or direct our Services to individuals under 18
              years of age. If you are under 18, you may not use our Services.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "account",
      title: "3. Account Registration & Security",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            To access certain features, you may need to create an account. You
            agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>
              Maintain the security of your password and accept all risks of
              unauthorized access
            </li>
            <li>
              Notify us immediately of any unauthorized use of your account
            </li>
            <li>
              Be responsible for all activities that occur under your account
            </li>
          </ul>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 text-sm">
              We reserve the right to suspend or terminate your account if any
              information provided is inaccurate, incomplete, or misleading, or
              if we suspect fraudulent activity.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "subscriptions",
      title: "4. Coffee Subscriptions & Purchases",
      important: true,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              A. Subscription Plans
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>The Explorer:</strong> One curated single-origin coffee
                (250g) monthly
              </li>
              <li>
                <strong>The Connoisseur:</strong> Two different coffees (250g
                each) monthly
              </li>
              <li>
                <strong>The Household:</strong> One coffee selection (1kg) on
                your schedule
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              B. Billing & Payments
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Subscriptions are billed on a recurring basis at the frequency
                you select
              </li>
              <li>
                Payment is processed through secure third-party providers
                (Stripe, PayPal)
              </li>
              <li>
                Prices are in USD and exclude applicable taxes and shipping
              </li>
              <li>
                We reserve the right to modify subscription prices with 30 days'
                notice
              </li>
              <li>
                Your subscription will automatically renew unless canceled
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              C. Modifications & Cancellations
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                You may modify, pause, or cancel your subscription at any time
                through your account
              </li>
              <li>
                Cancellations must be made at least 48 hours before your next
                billing date
              </li>
              <li>No refunds for partial subscription periods</li>
              <li>
                Changes to your subscription plan will take effect in the next
                billing cycle
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-700 text-sm">
              <strong>Flexibility Promise:</strong> We understand taste
              preferences change. You can skip a delivery, change your coffee
              selection, or adjust your delivery frequency at any time from your
              account dashboard.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "shipping",
      title: "5. Shipping & Delivery",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">
                Domestic (US)
              </h4>
              <ul className="space-y-1 text-sm">
                <li>• Free shipping on subscriptions and orders over $35</li>
                <li>• Standard: 3-7 business days</li>
                <li>• Expedited: 2-3 business days ($9.95)</li>
                <li>• Delivery times are estimates, not guarantees</li>
              </ul>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">
                International
              </h4>
              <ul className="space-y-1 text-sm">
                <li>• Available to select countries</li>
                <li>• Shipping costs calculated at checkout</li>
                <li>
                  • Customs duties and taxes are customer's responsibility
                </li>
                <li>• Delivery: 10-21 business days</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              Delivery Issues
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>You must provide accurate shipping information</li>
              <li>
                We are not liable for delays caused by shipping carriers or
                customs
              </li>
              <li>Report damaged or missing items within 7 days of delivery</li>
              <li>
                Unclaimed packages may be returned to us, with restocking fees
                applied
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "returns",
      title: "6. Returns, Refunds & Coffee Freshness",
      important: true,
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <h4 className="font-semibold text-green-800 mb-2">
              Our Freshness Guarantee
            </h4>
            <p className="text-green-700 mb-3">
              Every coffee is roasted-to-order and shipped within 48 hours. If
              you're not satisfied with your coffee's freshness or quality,
              contact us within 14 days of delivery for a replacement or refund.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-green-800">Roast Date</div>
                <div className="text-green-700">Clearly marked on each bag</div>
              </div>
              <div>
                <div className="font-medium text-green-800">Peak Freshness</div>
                <div className="text-green-700">
                  3-30 days post-roast (varies by coffee)
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Return Policy</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left font-semibold">
                      Product Type
                    </th>
                    <th className="border border-gray-300 p-3 text-left font-semibold">
                      Return Window
                    </th>
                    <th className="border border-gray-300 p-3 text-left font-semibold">
                      Condition
                    </th>
                    <th className="border border-gray-300 p-3 text-left font-semibold">
                      Refund Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3">
                      Whole Bean Coffee
                    </td>
                    <td className="border border-gray-300 p-3">
                      14 days from delivery
                    </td>
                    <td className="border border-gray-300 p-3">
                      Unopened or ≤ 25% consumed
                    </td>
                    <td className="border border-gray-300 p-3">
                      Full refund or replacement
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">
                      Coffee Equipment
                    </td>
                    <td className="border border-gray-300 p-3">
                      30 days from delivery
                    </td>
                    <td className="border border-gray-300 p-3">
                      New, unused, original packaging
                    </td>
                    <td className="border border-gray-300 p-3">
                      Full refund (minus shipping)
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3">
                      Subscription Coffee
                    </td>
                    <td className="border border-gray-300 p-3">
                      14 days from delivery
                    </td>
                    <td className="border border-gray-300 p-3">
                      Quality/freshness issue only
                    </td>
                    <td className="border border-gray-300 p-3">
                      Replacement or account credit
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">
              <strong>Non-Returnable Items:</strong> Gift cards, digital
              products, coffee that has been consumed more than 25%, and
              personalized/custom orders. Opened coffee cannot be returned for
              hygienic reasons but will be replaced if quality issues exist.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "intellectual",
      title: "7. Intellectual Property",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            All content on our Services, including but not limited to:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">
                Our Protected Content
              </h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Brand names, logos, and trademarks</li>
                <li>Coffee tasting notes and descriptions</li>
                <li>Educational content and brewing guides</li>
                <li>Website design and user interface</li>
                <li>Photography and visual assets</li>
                <li>Software and proprietary technology</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">
                Permitted Use
              </h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Personal, non-commercial use only</li>
                <li>Sharing with attribution</li>
                <li>Referencing in reviews or articles</li>
                <li>Educational purposes with permission</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-700 text-sm">
              <strong>Prohibited:</strong> You may not copy, modify, distribute,
              sell, or lease any part of our Services or included content
              without our explicit written permission. The BrewTopia name and
              logo are registered trademarks.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "user-content",
      title: "8. User Content & Reviews",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            By submitting reviews, photos, comments, or other content ("User
            Content"), you grant BrewTopia a worldwide, non-exclusive,
            royalty-free license to use, reproduce, modify, and display your
            User Content in connection with our Services.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">
              Community Guidelines
            </h4>
            <ul className="list-disc pl-6 space-y-1 text-blue-700">
              <li>Be respectful and constructive in reviews</li>
              <li>Do not post false or misleading information</li>
              <li>Do not infringe on others' intellectual property</li>
              <li>Do not post spam or promotional content</li>
              <li>Maintain the coffee-focused nature of discussions</li>
            </ul>
          </div>

          <p className="text-gray-700">
            We reserve the right to remove any User Content that violates these
            guidelines or is otherwise objectionable. You retain ownership of
            your User Content but understand it may be publicly displayed.
          </p>
        </div>
      ),
    },
    {
      id: "limitation",
      title: "9. Limitation of Liability",
      important: true,
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h4 className="font-semibold text-red-800 mb-3">
              Important Legal Disclaimer
            </h4>
            <p className="text-red-700 mb-3">
              To the fullest extent permitted by law, BrewTopia shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your use of or inability to use
              our Services.
            </p>
            <div className="text-center text-red-800 font-bold py-2 border-t border-red-200 mt-3">
              IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT PAID BY
              YOU TO BREWTOPIÁ IN THE SIX MONTHS PRECEDING THE CLAIM.
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">
                We Are Not Liable For:
              </h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Personal injury or property damage from coffee consumption
                </li>
                <li>Errors in brewing instructions or recommendations</li>
                <li>Shipping delays or carrier issues</li>
                <li>Individual taste preferences not being met</li>
                <li>Third-party service interruptions</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">
                Coffee-Specific Disclaimers
              </h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Caffeine content varies by coffee and roast</li>
                <li>Flavor notes are subjective descriptors</li>
                <li>Freshness depends on storage conditions</li>
                <li>Allergen warnings are provided per batch</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "indemnification",
      title: "10. Indemnification",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            You agree to defend, indemnify, and hold harmless BrewTopia, its
            affiliates, officers, employees, and agents from any claims,
            damages, losses, liabilities, and expenses (including attorneys'
            fees) arising out of or relating to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Your use of the Services</li>
            <li>Your violation of these Terms</li>
            <li>Your User Content</li>
            <li>Your violation of any law or third-party rights</li>
            <li>Your interactions with other users</li>
          </ul>
        </div>
      ),
    },
    {
      id: "termination",
      title: "11. Termination",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            We may terminate or suspend your account and access to our Services
            immediately, without prior notice or liability, for any reason,
            including but not limited to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Violation of these Terms</li>
            <li>Fraudulent or illegal activity</li>
            <li>Non-payment of subscription fees</li>
            <li>Abusive behavior toward our team or community</li>
            <li>Attempts to disrupt our Services</li>
          </ul>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 text-sm">
              Upon termination, your right to use the Services will immediately
              cease. You may terminate your account at any time by contacting us
              or through your account settings.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "governing-law",
      title: "12. Governing Law & Dispute Resolution",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">
                Governing Law
              </h4>
              <p className="text-amber-700">
                These Terms shall be governed by and construed in accordance
                with the laws of the State of Oregon, United States, without
                regard to its conflict of law provisions.
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">
                Jurisdiction
              </h4>
              <p className="text-amber-700">
                Any legal action shall be brought in the federal or state courts
                located in Multnomah County, Oregon, and you consent to the
                jurisdiction of such courts.
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              Dispute Resolution
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Informal Resolution:</strong> We encourage you to
                contact us first to resolve any issues
              </li>
              <li>
                <strong>Arbitration:</strong> Any disputes not resolved
                informally shall be resolved through binding arbitration in
                Portland, Oregon
              </li>
              <li>
                <strong>Class Action Waiver:</strong> You waive any right to
                participate in class actions or class arbitrations
              </li>
              <li>
                <strong>Small Claims:</strong> Either party may bring claims in
                small claims court
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "miscellaneous",
      title: "13. Miscellaneous Provisions",
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-medium">
                    Severability
                  </td>
                  <td className="border border-gray-300 p-3">
                    If any provision is found invalid, the remaining provisions
                    remain in effect
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium">
                    Force Majeure
                  </td>
                  <td className="border border-gray-300 p-3">
                    Not liable for delays due to events beyond our control
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-medium">
                    Assignment
                  </td>
                  <td className="border border-gray-300 p-3">
                    You may not assign your rights; we may assign ours
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium">
                    Entire Agreement
                  </td>
                  <td className="border border-gray-300 p-3">
                    These Terms constitute the entire agreement
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 p-3 font-medium">
                    Waiver
                  </td>
                  <td className="border border-gray-300 p-3">
                    Our failure to enforce a right is not a waiver
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-3 font-medium">
                    Notices
                  </td>
                  <td className="border border-gray-300 p-3">
                    Electronic notices satisfy legal requirements
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: "contact",
      title: "14. Contact Information",
      content: (
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-4">
              For Legal Notices & Inquiries:
            </h4>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">
                  BrewTopia Coffee Company
                </h5>
                <p className="text-gray-700">
                  123 Coffee Lane
                  <br />
                  Portland, OR 97205
                  <br />
                  United States
                </p>
              </div>

              <div>
                <h5 className="font-medium text-gray-800 mb-2">
                  Contact Methods
                </h5>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:legal@brewtopia.com"
                      className="text-amber-700 hover:text-amber-800 font-medium"
                    >
                      legal@brewtopia.com
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    <span className="text-gray-700">+1 (503) 555-0199</span>
                  </p>
                  <p>
                    <strong>Hours:</strong>{" "}
                    <span className="text-gray-700">Mon-Fri, 9AM-5PM PST</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-semibold text-gray-800 mb-3">
              Related Documents
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href="/privacy-policy"
                className="px-4 py-2 bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-lg transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/cookie-policy"
                className="px-4 py-2 bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-lg transition-colors"
              >
                Cookie Policy
              </a>
              <a
                href="/shipping-policy"
                className="px-4 py-2 bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-lg transition-colors"
              >
                Shipping Policy
              </a>
              <a
                href="/return-policy"
                className="px-4 py-2 bg-amber-100 text-amber-800 hover:bg-amber-200 rounded-lg transition-colors"
              >
                Return Policy
              </a>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r bg-black">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: "url('/terms.jpg')" }}
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
            Terms & Conditions for BrewTopia Coffee Company
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl opacity-90"
          >
            Welcome to BrewTopia—where exceptional coffee meets clear
            communication. These Terms & Conditions outline the agreement
            between you and our company regarding your use of our services,
            subscriptions, and website. By accessing our platform, you agree to
            these terms that ensure a fair, transparent, and delightful coffee
            experience for everyone involved.
          </motion.p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-7 mb-7 ">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>

          <div className="flex items-center justify-center mb-8">
            <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full border">
              Last Updated: {lastUpdated}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Welcome to BrewTopia. These Terms & Conditions govern your use of
              our coffee subscription service, website, and all related
              features. By accessing our Services, you're agreeing to these
              terms—please read them carefully as they affect your legal rights.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border border-amber-200 rounded-lg bg-amber-50">
                <div className="text-xl font-bold text-amber-700 mb-1">
                  {sections.length}
                </div>
                <div className="text-xs text-amber-800">Sections</div>
              </div>
              <div className="text-center p-3 border border-gray-200 rounded-lg bg-white">
                <div className="text-xl font-bold text-gray-700 mb-1">24/7</div>
                <div className="text-xs text-gray-700">Account Access</div>
              </div>
              <div className="text-center p-3 border border-gray-200 rounded-lg bg-white">
                <div className="text-xl font-bold text-gray-700 mb-1">
                  14-Day
                </div>
                <div className="text-xs text-gray-700">Freshness Guarantee</div>
              </div>
              <div className="text-center p-3 border border-gray-200 rounded-lg bg-white">
                <div className="text-xl font-bold text-gray-700 mb-1">
                  Flexible
                </div>
                <div className="text-xs text-gray-700">Subscription</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">
                Quick Navigation
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      document
                        .getElementById(section.id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      activeSection === section.id
                        ? "bg-amber-100 text-amber-800 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="truncate">{section.title}</span>
                    {section.important && (
                      <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full ml-2"></span>
                    )}
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-2">
                    Need Help?
                  </h4>
                  <p className="text-amber-700 text-sm mb-3">
                    Questions about these terms? Contact our legal team.
                  </p>
                  <a
                    href="mailto:legal@brewtopia.com"
                    className="inline-block w-full text-center px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Email Legal Team
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="space-y-8">
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
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                      {section.important && (
                        <div className="flex items-center mt-2">
                          <svg
                            className="w-4 h-4 text-red-500 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-red-600 font-medium">
                            Important Section
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pl-14">{section.content}</div>
                </div>
              ))}
            </div>

            {/* Acceptance Footer */}
            <div className="mt-12 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Agreement Acceptance
                </h3>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  By using BrewTopia's Services, you acknowledge that you have
                  read, understood, and agree to be bound by these Terms &
                  Conditions. If you do not agree, you may not use our Services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/signup"
                    className="px-8 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    I Agree & Continue
                  </a>
                  <a
                    href="/contact"
                    className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-white transition-colors"
                  >
                    Have Questions? Contact Us
                  </a>
                </div>
              </div>
            </div>

            {/* Last Updated Footer */}
            <div className="mt-8 text-center text-gray-600 text-sm">
              <p>
                These Terms & Conditions are effective as of {lastUpdated}.
                BrewTopia reserves the right to modify these terms at any time.
                Continued use of our Services constitutes acceptance of any
                modifications.
              </p>
              <p className="mt-2">
                BrewTopia® is a registered trademark. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
