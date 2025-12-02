import {
  FaEnvelope,
  FaQuestionCircle,
  FaComments,
  FaRobot,
  FaLock,
  FaUserPlus,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  const footerLinks = [
    {
      name: "Testimonials",
      href: "/testimonials",
      icon: <FaComments className="inline mr-2" />,
    },
    {
      name: "Sign Up",
      href: "/auth/signup",
      icon: <FaUserPlus className="inline mr-2" />,
    },
    {
      name: "Forgot Password",
      href: "/auth/forgot-password",
      icon: <FaLock className="inline mr-2" />,
    },
    {
      name: "Ask AI",
      href: "/ai",
      icon: <FaRobot className="inline mr-2" />,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: <FaEnvelope className="inline mr-2" />,
    },
    {
      name: "FAQ",
      href: "/faq",
      icon: <FaQuestionCircle className="inline mr-2" />,
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16 pb-8 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b07d52] via-[#946743] to-[#b07d52]"></div>

      {/* Coffee bean pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-[#b07d52]"></div>
        <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-[#946743]"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 rounded-full bg-[#b07d52]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT - Big Logo Section */}
          <div className="lg:col-span-1 flex flex-col items-start">
            <Link to="/" className="group">
              <div className="flex items-center space-x-4 mb-6 transform hover:scale-105 transition-transform duration-300">
                <img
                  src="/logo.png"
                  alt="BrewTopia Logo"
                  className="h-24 w-24 object-cover drop-shadow-lg group-hover:rotate-3 transition-transform duration-500"
                  loading="lazy"
                />
                <div>
                  <span className="text-5xl font-bold bg-gradient-to-r from-[#b07d52] via-[#d4a574] to-[#b07d52] bg-clip-text text-transparent">
                    BrewTopia
                  </span>
                  <p className="text-gray-300 text-lg mt-2">
                    Where Coffee Dreams Come True
                  </p>
                </div>
              </div>
            </Link>

            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Discover the perfect brew, explore premium equipment, and join our
              community of coffee enthusiasts. Your journey to coffee perfection
              starts here.
            </p>

            {/* Social Media */}
            <div className="mt-8 flex space-x-4">
              {[
                {
                  name: "Facebook",
                  color: "bg-[#1877F2]",
                  icon: "F",
                  url: "https://www.facebook.com", // Replace with your Facebook page
                },
                {
                  name: "Twitter",
                  color: "bg-[#1DA1F2]",
                  icon: "X",
                  url: "https://twitter.com", // Replace with your Twitter
                },
                {
                  name: "Instagram",
                  color:
                    "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
                  icon: "I",
                  url: "https://www.instagram.com", // Replace with your Instagram
                },
                {
                  name: "YouTube",
                  color: "bg-[#FF0000]",
                  icon: "Y",
                  url: "https://www.youtube.com", // Replace with your YouTube channel
                },
                {
                  name: "LinkedIn",
                  color: "bg-[#0077B5]",
                  icon: "in",
                  url: "https://www.linkedin.com", // Replace with your LinkedIn
                },
                {
                  name: "TikTok",
                  color: "bg-black",
                  icon: "TT",
                  url: "https://www.tiktok.com", // Replace with your TikTok
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center text-white hover:scale-110 transition-all duration-300"
                  aria-label={`Visit our ${social.name} page`}
                >
                  {/* Main icon */}
                  <span
                    className={`font-semibold z-10 transition-colors duration-300 ${social.name === "Twitter" ? "font-bold" : ""}`}
                  >
                    {social.icon}
                  </span>

                  {/* Hover background with platform color */}
                  <div
                    className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${social.color}`}
                  ></div>

                  {/* Tooltip with platform name */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                    <div className="bg-gray-900 text-white text-xs font-medium py-1.5 px-3 rounded-lg shadow-lg">
                      {social.name}
                      <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* MIDDLE - Quick Links */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Navigation Links */}
              <div>
                <h3 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-[#b07d52] inline-block">
                  Quick Navigation
                </h3>
                <div className="space-y-3">
                  {footerLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center text-gray-300 hover:text-[#b07d52] text-lg transition-colors duration-300 group"
                    >
                      {link.icon}
                      <span className="group-hover:translate-x-2 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div>
                <h3 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-[#b07d52] inline-block">
                  Stay Brewed In
                </h3>
                <p className="text-gray-300 mb-4 text-lg">
                  Subscribe to our newsletter for the latest coffee trends,
                  equipment reviews, and exclusive offers.
                </p>

                <form className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-[#b07d52] focus:ring-2 focus:ring-[#b07d52] focus:ring-opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-linear-to-r from-[#b07d52] to-[#946743] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#946743] hover:to-[#b07d52] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Subscribe Now
                  </button>
                </form>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <FaEnvelope className="text-[#b07d52]" />
                    <span>hello@brewtpia.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300 mt-3">
                    <FaQuestionCircle className="text-[#b07d52]" />
                    <span>24/7 Coffee Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Left: Copyright text */}
                <div className="text-center md:text-left">
                  <p className="text-gray-400">
                    © {new Date().getFullYear()} BrewTopia. All rights reserved.
                  </p>
                  <p className="text-gray-400 mt-1">
                    Brewing happiness, one cup at a time.
                  </p>
                </div>

                {/* Right: Policy links with separators */}
                <div className="flex items-center divide-x divide-gray-700">
                  <a
                    href="/privacy-policy"
                    className="text-gray-400 hover:text-[#b07d52] transition-colors px-4 md:px-6"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="terms"
                    className="text-gray-400 hover:text-[#b07d52] transition-colors px-4 md:px-6"
                  >
                    Terms of Service
                  </a>
                  <a
                    href="/cookie-policy"
                    className="text-gray-400 hover:text-[#b07d52] transition-colors px-4 md:px-6"
                  >
                    Cookie Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coffee Quote */}
        <div className="mt-12 text-center">
          <blockquote className="text-xl italic text-gray-300 max-w-3xl mx-auto relative">
            <div className="absolute -left-8 -top-4 text-6xl text-[#b07d52] opacity-30">
              "
            </div>
            "Life begins after coffee. Stay grounded, stay focused, stay
            brewing."
            <div className="absolute -right-8 -bottom-4 text-6xl text-[#b07d52] opacity-30">
              "
            </div>
          </blockquote>
          <p className="text-[#b07d52] font-semibold mt-4">
            - BrewTopia Mantra
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
