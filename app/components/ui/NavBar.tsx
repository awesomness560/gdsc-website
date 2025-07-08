import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Events", href: "/events" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if current path matches nav item
  const isCurrentPage = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 transition-all duration-300 ease-in-out">
      {/* Liquid Glass Base */}
      <div
        className={`absolute inset-0 border-b border-white/10 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "opacity-100" : "opacity-90"
        }`}
        style={{
          background: isScrolled ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.2)",
          boxShadow: isScrolled
            ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            : "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      />

      {/* GDSC Gradient Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(90deg, rgba(239, 68, 68, 0.1) 0%, rgba(59, 130, 246, 0.1) 33%, rgba(34, 197, 94, 0.1) 66%, rgba(234, 179, 8, 0.1) 100%)",
          opacity: isScrolled ? 0.7 : 0.5,
        }}
      />

      {/* Shine Effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          opacity: isScrolled ? 0.8 : 0.6,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="group flex items-center">
              <div className="relative">
                <img
                  src="images/GDSC_logo.png"
                  alt="GDSC Logo"
                  className="w-12 transition-transform duration-200 group-hover:scale-105"
                />
                {/* Logo glass effect */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-30"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
                    filter: "blur(8px)",
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden flex-1 items-center justify-center md:flex">
            <ul className="flex items-center space-x-2 lg:space-x-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="group relative px-4 py-2 text-white/90 transition-all duration-200 hover:text-white"
                  >
                    {/* Glass background for nav items */}
                    <div
                      className={`absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-200 ${
                        isCurrentPage(item.href)
                          ? "scale-100 opacity-100"
                          : "scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                      }`}
                      style={{
                        background: isCurrentPage(item.href)
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(255, 255, 255, 0.1)",
                        boxShadow: isCurrentPage(item.href)
                          ? "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)"
                          : "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                      }}
                    />

                    <span className="relative z-10 font-medium">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Connect Button */}
          <div className="hidden flex-shrink-0 md:flex">
            <a
              href="https://linktr.ee/dscutd"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="group relative">
                {/* Glass button background */}
                <div
                  className="absolute inset-0 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-200 group-hover:border-white/50"
                  style={{
                    background: "rgba(59, 130, 246, 0.3)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 12px rgba(59, 130, 246, 0.2)",
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative z-10 px-6 font-medium text-white hover:bg-transparent hover:text-white"
                >
                  Connect
                </Button>
              </div>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="group relative rounded-lg p-2 text-white/90 transition-all duration-200 hover:text-white"
              aria-expanded="false"
            >
              {/* Glass background for mobile button */}
              <div
                className="absolute inset-0 rounded-lg border border-white/20 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              />
              <div className="relative z-10">
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`transition-all duration-300 md:hidden ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
        >
          <div
            className="mt-2 space-y-1 rounded-lg border border-white/20 px-2 pt-2 pb-3 backdrop-blur-md sm:px-3"
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group relative block rounded-lg px-3 py-2 text-white/90 transition-all duration-200 hover:text-white"
                onClick={handleMobileMenuClick}
              >
                {/* Mobile nav item glass background */}
                <div
                  className={`absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-200 ${
                    isCurrentPage(item.href)
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{
                    background: isCurrentPage(item.href)
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(255, 255, 255, 0.1)",
                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                />

                <span className="relative z-10 font-medium">{item.name}</span>
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <a
                href="https://linktr.ee/dscutd"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMobileMenuClick}
              >
                <div className="group relative">
                  <div
                    className="absolute inset-0 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-200"
                    style={{
                      background: "rgba(59, 130, 246, 0.3)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 12px rgba(59, 130, 246, 0.2)",
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative z-10 w-full font-medium text-white hover:bg-transparent hover:text-white"
                  >
                    Connect
                  </Button>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
