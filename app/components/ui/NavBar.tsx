import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Link } from 'react-router';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Events', href: '/events' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navBaseClasses = "w-full transition-colors duration-300 ease-in-out";
  const navLayoutClasses = "fixed top-0 left-0 right-0 z-50";
  const navColorClasses = !isScrolled ? "bg-transparent text-white" : "bg-background text-foreground shadow-md";

  return (
    <nav className={`${navBaseClasses} ${navLayoutClasses} ${navColorClasses}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img src="images/GDSC_logo.png" alt="GDSC Logo" className="w-12" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex items-center space-x-6 md:space-x-10 lg:space-x-14 xl:space-x-18">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Connect Button */}
          <div className="hidden md:flex flex-shrink-0">
            <a href="https://linktr.ee/dscutd" target="_blank" rel="noopener noreferrer">
              <Button variant="blue" size="sm">Connect</Button>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
              aria-expanded="false"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${!isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-background'} border-t border-gray-200 dark:border-gray-700`}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors"
                onClick={handleMobileMenuClick}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <a
                href="https://linktr.ee/dscutd"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMobileMenuClick}
              >
                <Button variant="blue" size="sm" className="w-full">
                  Connect
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;