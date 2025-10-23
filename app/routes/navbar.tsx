import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { FaAlignJustify, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const Navbar = () => {
  const location = useLocation();
  const supabase = useSupabaseClient();
  const user = useUser();

  const [showLinks, setShowLinks] = useState(false);

  const linksContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const navCenter = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let isMounted = true;

    const handleScroll = () => {
      if (!isMounted || !navCenter.current) return;

      const scrollHeight = window.scrollY;
      const navCenterHeight = navCenter.current.getBoundingClientRect().height;

      if (scrollHeight > navCenterHeight) {
        navCenter.current.style.position = "fixed";
        navCenter.current.style.background = "white";
        navCenter.current.style.transition = "all 0.3s ease-in-out";
        navCenter.current.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
      } else {
        navCenter.current.style.background = "transparent";
        navCenter.current.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
      }
    };

    if (navCenter.current) {
      navCenter.current.style.background = "white";
      navCenter.current.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      isMounted = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowLinks(false);
  }, [location.pathname]);

  const links = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
    { name: "All Products", href: "/products" },
    { name: "Coffee Quiz", href: "/quiz" },
    { name: "About", href: "/about" },
  ];

  const isActiveLink = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300"
      ref={navCenter}
    >
      <div className="  mx-auto px-3 sm:px-6 lg:px-8">
        {/* NAVBAR ROW */}
        <div className="flex justify-between items-center py-3">
          {/* LEFT - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="BrewTopia Logo"
                className="h-10 w-10 object-cover"
                loading="lazy"
              />
              <span className="logospan text-gray-900 text-2xl font-bold">
                BrewTopia
              </span>
            </Link>
          </div>

          {/* CENTER - Links (desktop only) */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block transition-colors font-medium px-4 py-1.5 rounded-lg text-base text-responsive ${
                  isActiveLink(link.href)
                    ? "bg-black text-[#b07d52] font-semibold"
                    : "bg-black text-white hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => setShowLinks(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT - User Icon + Auth */}
          <div className="hidden md:flex items-center space-x-3">
            <FaUserCircle className="text-2xl text-gray-700" />

            {user ? (
              <>
                <span className="text-gray-800 text-sm font-medium">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="px-3 py-1 bg-[#b07d52] text-white text-sm rounded-lg hover:bg-[#946743] transition"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* MOBILE - Menu Button */}
          <button
            className="md:hidden text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setShowLinks(!showLinks)}
          >
            <FaAlignJustify className="text-xl" />
          </button>
        </div>

        {/* MOBILE - Dropdown Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            showLinks ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          ref={linksContainerRef}
        >
          <div className="p-4 bg-white rounded-lg mt-2 shadow-lg border border-gray-200 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block transition-colors font-medium px-3 py-2 rounded-lg mx-2 ${
                  isActiveLink(link.href)
                    ? "bg-black text-[#b07d52] font-semibold"
                    : "bg-black text-white hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => setShowLinks(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col items-start space-y-2 pt-3 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <FaUserCircle className="text-2xl text-gray-700" />
                {user ? (
                  <span className="text-gray-800 text-sm">
                    {user.email}youyou
                  </span>
                ) : (
                  <span className="text-gray-600 text-sm">Guest</span>
                )}
              </div>

              {user ? (
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/signin"
                  className="px-3 py-1 bg-[#b07d52] text-white text-sm rounded-lg hover:bg-[#946743] transition"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
