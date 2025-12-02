import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  essential: boolean;
  cookies: Cookie[];
}

interface Cookie {
  name: string;
  purpose: string;
  duration: string;
  provider: "First-party" | "Third-party";
}

const CookiePolicyPage: React.FC = () => {
  const [lastUpdated] = useState<string>("October 26, 2024");
  const [showCookieSettings, setShowCookieSettings] = useState<boolean>(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always enabled
    performance: true,
    functional: true,
    targeting: false,
  });

  // Load saved preferences on mount
  useEffect(() => {
    const saved = localStorage.getItem("brewtopiaCookiePrefs");
    if (saved) {
      setCookiePreferences(JSON.parse(saved));
    }
  }, []);

  const cookieCategories: CookieCategory[] = [
    {
      id: "essential",
      name: "Essential Cookies",
      description:
        "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.",
      essential: true,
      cookies: [
        {
          name: "brewtopia_session",
          purpose: "Maintains your session state and authentication",
          duration: "Session",
          provider: "First-party",
        },
        {
          name: "XSRF-TOKEN",
          purpose: "Security protection against Cross-Site Request Forgery",
          duration: "Session",
          provider: "First-party",
        },
        {
          name: "cookie_consent",
          purpose: "Stores your cookie preferences",
          duration: "1 year",
          provider: "First-party",
        },
      ],
    },
    {
      id: "performance",
      name: "Performance & Analytics Cookies",
      description:
        "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.",
      essential: false,
      cookies: [
        {
          name: "_ga",
          purpose: "Google Analytics - Distinguishes unique users",
          duration: "2 years",
          provider: "Third-party",
        },
        {
          name: "_gid",
          purpose: "Google Analytics - Distinguishes unique users",
          duration: "24 hours",
          provider: "Third-party",
        },
        {
          name: "_gat",
          purpose: "Google Analytics - Throttles request rate",
          duration: "1 minute",
          provider: "Third-party",
        },
        {
          name: "amplitude_*",
          purpose: "Usage analytics and feature performance tracking",
          duration: "1 year",
          provider: "Third-party",
        },
      ],
    },
    {
      id: "functional",
      name: "Functional Cookies",
      description:
        "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. If you do not allow these cookies, then some or all of these services may not function properly.",
      essential: false,
      cookies: [
        {
          name: "preferences",
          purpose: "Remembers your coffee preferences and tasting profile",
          duration: "1 year",
          provider: "First-party",
        },
        {
          name: "cart_items",
          purpose: "Remembers items in your shopping cart",
          duration: "30 days",
          provider: "First-party",
        },
        {
          name: "subscription_status",
          purpose: "Stores your subscription preferences",
          duration: "1 year",
          provider: "First-party",
        },
        {
          name: "stripe_sid",
          purpose: "Stripe payment processing",
          duration: "30 minutes",
          provider: "Third-party",
        },
      ],
    },
    {
      id: "targeting",
      name: "Targeting & Advertising Cookies",
      description:
        "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant ads on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device.",
      essential: false,
      cookies: [
        {
          name: "_fbp",
          purpose: "Facebook Pixel - Ad delivery and retargeting",
          duration: "3 months",
          provider: "Third-party",
        },
        {
          name: "fr",
          purpose: "Facebook Pixel - Ad optimization",
          duration: "3 months",
          provider: "Third-party",
        },
        {
          name: "personalization_id",
          purpose: "Twitter - Personalization and ad targeting",
          duration: "2 years",
          provider: "Third-party",
        },
        {
          name: "NID",
          purpose: "Google - Ad personalization",
          duration: "6 months",
          provider: "Third-party",
        },
      ],
    },
  ];

  const handlePreferenceChange = (category: string) => {
    if (category === "essential") return; // Can't disable essential cookies

    setCookiePreferences((prev) => ({
      ...prev,
      [category]: !prev[category as keyof typeof cookiePreferences],
    }));
  };

  const savePreferences = () => {
    localStorage.setItem(
      "brewtopiaCookiePrefs",
      JSON.stringify(cookiePreferences)
    );

    // In a real implementation, you would update the actual cookies here
    // This is where you'd integrate with a cookie consent management platform

    setShowCookieSettings(false);

    // Show confirmation
    alert("Your cookie preferences have been saved successfully.");
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      performance: true,
      functional: true,
      targeting: true,
    };
    setCookiePreferences(allAccepted);
    localStorage.setItem("brewtopiaCookiePrefs", JSON.stringify(allAccepted));
    setShowCookieSettings(false);
  };

  const rejectAll = () => {
    const rejected = {
      essential: true, // Essential cookies are always enabled
      performance: false,
      functional: false,
      targeting: false,
    };
    setCookiePreferences(rejected);
    localStorage.setItem("brewtopiaCookiePrefs", JSON.stringify(rejected));
    setShowCookieSettings(false);
  };

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
            Cookie Policy for BrewTopia Coffee Company
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl opacity-90"
          >
            Just as we're transparent about our coffee origins, we believe in
            clarity about how we use cookies. This policy explains what cookies
            are, how they enhance your experience on our site, and how you can
            manage your preferences—ensuring your journey through BrewTopia is
            both personalized and privacy-respecting.
          </motion.p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto mt-7 mb-7">
        {/* Header */}
        <div className="mb-12 text-center">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>

          <div className="flex items-center justify-center mb-8">
            <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full border">
              Last Updated: {lastUpdated}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Just as we're transparent about our coffee sourcing, we believe in
              clarity about how we use cookies. This policy explains what
              cookies are, how we use them, and how you can control your
              preferences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 border border-amber-200 rounded-lg bg-amber-50">
                <div className="text-2xl font-bold text-amber-700 mb-1">
                  {cookieCategories.length}
                </div>
                <div className="text-sm text-amber-800">Cookie Categories</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg bg-white">
                <div className="text-2xl font-bold text-gray-700 mb-1">
                  {cookieCategories.reduce(
                    (acc, cat) => acc + cat.cookies.length,
                    0
                  )}
                </div>
                <div className="text-sm text-gray-700">Individual Cookies</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg bg-white">
                <div className="text-2xl font-bold text-gray-700 mb-1">
                  Full Control
                </div>
                <div className="text-sm text-gray-700">Your Preferences</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowCookieSettings(true)}
                className="px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                Manage Cookie Preferences
              </button>
              <a
                href="/privacy-policy"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
              >
                View Full Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* What Are Cookies */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="flex-shrink-0 w-8 h-8 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold mr-3">
              1
            </span>
            What Are Cookies?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                Cookies Explained
              </h3>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are placed on your computer or
                mobile device when you visit our website. They help us provide
                you with a better experience by remembering your preferences,
                understanding how you use our site, and showing you relevant
                content.
              </p>
              <p className="text-gray-700">
                Think of them like the notes a barista might make about your
                regular order—they help us remember your preferences so we can
                serve you better on your next visit.
              </p>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-amber-800 mb-3">Key Points</h3>
              <ul className="space-y-2 text-amber-700">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Cookies cannot harm your computer or read personal files
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    They don't store personal information like credit card
                    details
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    You can control and delete cookies through your browser
                    settings
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cookie Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            <span className="flex-shrink-0 w-8 h-8 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold mr-3 inline-flex">
              2
            </span>
            Types of Cookies We Use
          </h2>

          <div className="space-y-6">
            {cookieCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div
                  className={`p-6 ${category.essential ? "bg-amber-50" : "bg-white"}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div
                        className={`w-4 h-4 rounded-full mr-3 ${category.essential ? "bg-green-500" : "bg-blue-500"}`}
                      ></div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {category.name}
                      </h3>
                      {category.essential && (
                        <span className="ml-3 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Always Active
                        </span>
                      )}
                    </div>

                    {!category.essential && (
                      <div className="flex items-center">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={
                              cookiePreferences[
                                category.id as keyof typeof cookiePreferences
                              ]
                            }
                            onChange={() => handlePreferenceChange(category.id)}
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                          <span className="ml-3 text-sm font-medium text-gray-700">
                            {cookiePreferences[
                              category.id as keyof typeof cookiePreferences
                            ]
                              ? "Enabled"
                              : "Disabled"}
                          </span>
                        </label>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-700 mb-6">{category.description}</p>

                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 p-3 text-left font-semibold text-gray-800">
                            Cookie Name
                          </th>
                          <th className="border border-gray-300 p-3 text-left font-semibold text-gray-800">
                            Purpose
                          </th>
                          <th className="border border-gray-300 p-3 text-left font-semibold text-gray-800">
                            Duration
                          </th>
                          <th className="border border-gray-300 p-3 text-left font-semibold text-gray-800">
                            Provider
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.cookies.map((cookie, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }
                          >
                            <td className="border border-gray-300 p-3 font-mono text-sm">
                              {cookie.name}
                            </td>
                            <td className="border border-gray-300 p-3 text-gray-700">
                              {cookie.purpose}
                            </td>
                            <td className="border border-gray-300 p-3 text-gray-700">
                              {cookie.duration}
                            </td>
                            <td className="border border-gray-300 p-3">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${cookie.provider === "First-party" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                              >
                                {cookie.provider}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Manage Cookies */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="flex-shrink-0 w-8 h-8 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold mr-3">
                3
              </span>
              Manage Cookies in Browser
            </h2>

            <p className="text-gray-700 mb-6">
              Most web browsers allow you to control cookies through their
              settings. Here's how to manage cookies in popular browsers:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-amber-600 pl-4">
                <h4 className="font-semibold text-gray-800 mb-1">
                  Google Chrome
                </h4>
                <p className="text-gray-700 text-sm">
                  Settings → Privacy and Security → Cookies and other site data
                </p>
              </div>

              <div className="border-l-4 border-amber-600 pl-4">
                <h4 className="font-semibold text-gray-800 mb-1">Safari</h4>
                <p className="text-gray-700 text-sm">
                  Preferences → Privacy → Cookies and website data
                </p>
              </div>

              <div className="border-l-4 border-amber-600 pl-4">
                <h4 className="font-semibold text-gray-800 mb-1">Firefox</h4>
                <p className="text-gray-700 text-sm">
                  Options → Privacy & Security → Cookies and Site Data
                </p>
              </div>

              <div className="border-l-4 border-amber-600 pl-4">
                <h4 className="font-semibold text-gray-800 mb-1">
                  Microsoft Edge
                </h4>
                <p className="text-gray-700 text-sm">
                  Settings → Cookies and site permissions → Cookies and site
                  data
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="flex-shrink-0 w-8 h-8 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold mr-3">
                4
              </span>
              Do Not Track Signals
            </h2>

            <p className="text-gray-700 mb-6">
              Some browsers offer a "Do Not Track" (DNT) feature that lets you
              tell websites you do not want to have your online activities
              tracked. Currently, there is no common industry standard for how
              to interpret DNT signals.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 text-sm">
                <strong>Our Position:</strong> We currently do not respond to
                DNT browser signals because no common standard has been adopted.
                However, we provide you with granular control over your cookie
                preferences through this policy.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-amber-50 rounded-xl p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Questions About Cookies?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                Contact Our Privacy Team
              </h3>
              <p className="text-gray-700 mb-4">
                If you have any questions about our use of cookies or this
                Cookie Policy, please contact us:
              </p>

              <div className="space-y-3">
                <p>
                  <strong className="text-gray-800">Email:</strong>{" "}
                  <a
                    href="mailto:privacy@brewtopia.com"
                    className="text-amber-700 hover:text-amber-800 font-medium"
                  >
                    privacy@brewtopia.com
                  </a>
                </p>
                <p>
                  <strong className="text-gray-800">Mail:</strong>{" "}
                  <span className="text-gray-700">
                    BrewTopia Coffee Company, 123 Coffee Lane, Portland, OR
                    97205
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                Related Documents
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-amber-700 hover:text-amber-800 font-medium flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Full Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-amber-700 hover:text-amber-800 font-medium flex items-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>
            This Cookie Policy is effective as of {lastUpdated}. We may update
            this policy periodically to reflect changes in technology,
            legislation, or our data practices.
          </p>
        </div>

        {/* Cookie Settings Modal */}
        {showCookieSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Cookie Preferences
                  </h3>
                  <button
                    onClick={() => setShowCookieSettings(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <p className="text-gray-700 mb-8">
                  We use cookies to enhance your browsing experience, analyze
                  site traffic, and personalize content. Select your preferences
                  below. Essential cookies cannot be disabled as they are
                  necessary for site functionality.
                </p>

                <div className="space-y-6 mb-8">
                  {cookieCategories
                    .filter((cat) => !cat.essential)
                    .map((category) => (
                      <div
                        key={category.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {category.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {category.cookies.length} cookies
                            </p>
                          </div>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={
                                cookiePreferences[
                                  category.id as keyof typeof cookiePreferences
                                ]
                              }
                              onChange={() =>
                                handlePreferenceChange(category.id)
                              }
                            />
                            <div className="relative w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                          </label>
                        </div>
                        <p className="text-sm text-gray-700">
                          {category.description}
                        </p>
                      </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={savePreferences}
                      className="px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      Save Preferences
                    </button>
                    <button
                      onClick={acceptAll}
                      className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Accept All Cookies
                    </button>
                  </div>
                  <button
                    onClick={rejectAll}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reject All Non-Essential
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookiePolicyPage;
