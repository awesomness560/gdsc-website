// ~/components/ui/SectionHeader.tsx
import GlassContainer from "~/components/ui/GlassContainer";
import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconColor = "text-blue-400",
  className = "",
}) => {
  return (
    <GlassContainer
      gradientOverlay={false}
      hoverEffect={false}
      padding="lg"
      className={`mb-12 ${className}`}
    >
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
          <Icon className={`mr-3 inline-block h-8 w-8 ${iconColor}`} />
          {title}
        </h2>
        {subtitle && <p className="text-xl text-white/70">{subtitle}</p>}
      </div>
    </GlassContainer>
  );
};

export default SectionHeader;
