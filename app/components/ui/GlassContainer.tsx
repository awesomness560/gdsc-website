import React from "react";

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  gradientOverlay?: boolean;
  hoverEffect?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className = "",
  gradientOverlay = true,
  hoverEffect = true,
  rounded = "2xl",
  padding = "none",
}) => {
  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  };

  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-12",
  };

  return (
    <div className={`relative ${hoverEffect ? "group" : ""} ${className}`}>
      {/* Glass background */}
      <div
        className={`absolute inset-0 border border-white/10 backdrop-blur-md ${roundedClasses[rounded]} ${
          hoverEffect
            ? "transition-all duration-300 group-hover:border-white/20"
            : ""
        }`}
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      />

      {/* Optional GDSC gradient overlay */}
      {gradientOverlay && (
        <div
          className={`pointer-events-none absolute inset-0 ${roundedClasses[rounded]}`}
          style={{
            background:
              "linear-gradient(135deg, rgba(239, 68, 68, 0.06) 0%, rgba(59, 130, 246, 0.06) 33%, rgba(34, 197, 94, 0.06) 66%, rgba(234, 179, 8, 0.06) 100%)",
          }}
        />
      )}

      {/* Content */}
      <div className={`relative z-10 ${paddingClasses[padding]}`}>
        {children}
      </div>
    </div>
  );
};

export default GlassContainer;
