// ~/components/ui/PersonCard.tsx
import GlassContainer from "~/components/ui/GlassContainer";
import type { LucideIcon } from "lucide-react";

interface PersonCardProps {
  name: string;
  role: string;
  image: string;
  major?: string;
  year?: string;
  specialties?: string[];
  committee?: string;
  CommitteeIcon?: LucideIcon;
  isPresident?: boolean;
  className?: string;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  name,
  role,
  image,
  major,
  year,
  specialties,
  committee,
  CommitteeIcon,
  isPresident = false,
  className = "",
}) => {
  return (
    <GlassContainer
      className={`transition-all duration-700 hover:scale-105 ${className}`}
    >
      <div className={`text-center ${isPresident ? "p-8" : "p-6"}`}>
        <div className="relative mb-4">
          <img
            src={image}
            alt={name}
            className={`${
              isPresident ? "h-32 w-32" : "h-24 w-24"
            } mx-auto rounded-full border-2 border-white/20 object-cover`}
          />

          {/* President badge or committee icon */}
          {isPresident && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform">
              <div className="rounded-full bg-yellow-500 px-3 py-1 text-sm font-bold text-black">
                President
              </div>
            </div>
          )}

          {CommitteeIcon && !isPresident && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 transform">
              <CommitteeIcon className="h-6 w-6 rounded-full bg-blue-500 p-1 text-white" />
            </div>
          )}
        </div>

        <h3
          className={`mb-1 font-bold text-white ${isPresident ? "mb-2 text-2xl" : "text-lg"}`}
        >
          {name}
        </h3>

        <p
          className={`mb-2 font-medium ${
            isPresident ? "text-yellow-300" : "text-blue-300"
          } text-sm`}
        >
          {role}
        </p>

        {major && <p className="mb-1 text-sm text-white/70">{major}</p>}

        {year && <p className="text-xs text-white/60">{year}</p>}

        {/* Specialties for officers */}
        {specialties && specialties.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {specialties.map((specialty, i) => (
              <span
                key={i}
                className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/80"
              >
                {specialty}
              </span>
            ))}
          </div>
        )}
      </div>
    </GlassContainer>
  );
};

export default PersonCard;
