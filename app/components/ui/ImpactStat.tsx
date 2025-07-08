// ~/components/ui/ImpactStat.tsx
import GlassContainer from "~/components/ui/GlassContainer";
import type { LucideIcon } from "lucide-react";

interface ImpactStatProps {
  number: string;
  label: string;
  icon: LucideIcon;
  delay?: number;
  className?: string;
}

export const ImpactStat: React.FC<ImpactStatProps> = ({
  number,
  label,
  icon: Icon,
  delay = 0,
  className = "",
}) => {
  return (
    <div
      className={`transition-all duration-700 hover:scale-105 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <GlassContainer>
        <div className="p-6 text-center">
          <Icon className="mx-auto mb-3 h-8 w-8 text-white/70" />
          <div className="mb-2 text-3xl font-bold text-white">{number}</div>
          <div className="text-sm text-white/80">{label}</div>
        </div>
      </GlassContainer>
    </div>
  );
};

export default ImpactStat;
