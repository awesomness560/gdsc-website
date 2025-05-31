// this is a very basic navbar
// currently does not accommodate for mobile responsiveness
// also items link to pages that currently do not exist
// the connect button takes to the linktree of GDSC UTD bc idk what it's supposed to do

import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button'; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false); // checks if the page is scrolled down and if it has it adds a background

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); 
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBaseClasses = "w-full transition-colors duration-300 ease-in-out";
  const navLayoutClasses = "fixed top-0 left-0 right-0 z-50";
  const navColorClasses = !isScrolled ? "bg-transparent text-white" : "bg-background text-foreground shadow-md";

  return (
    <nav className={`${navBaseClasses} ${navLayoutClasses} ${navColorClasses}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img src="images/GDSC_logo.png" alt="GDSC Logo" className="w-12" />
            </a>
          </div>

          <div className="flex items-center justify-center flex-1"> 
            <ul className="flex items-center space-x-6 md:space-x-10 lg:space-x-14 xl:space-x-18">
              <li>
                <a href="/" className="hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="/events" className="hover:text-primary transition-colors">Events</a>
              </li>
            </ul>
          </div>

          <div className="flex-shrink-0"> 
            <a href="https://linktr.ee/dscutd" target="_blank" rel="noopener noreferrer">
              <Button variant="blue" size="sm"> Connect </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;