import { useState, useEffect } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  animation?: "slideUp" | "slideLeft" | "slideRight" | "fadeIn" | "scaleIn";
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  className = "",
  id,
  animation = "slideUp",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const animationClasses = {
    slideUp: isVisible
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-8",
    slideLeft: isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-8",
    slideRight: isVisible
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-8",
    fadeIn: isVisible ? "opacity-100" : "opacity-0",
    scaleIn: isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
  };

  return (
    <section
      id={id}
      className={`transition-all duration-1000 ${animationClasses[animation]} ${className}`}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;
