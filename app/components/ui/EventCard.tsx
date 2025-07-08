// components/ui/EventCard.tsx (Updated)
import { Calendar, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router";

interface EventCardProps {
  eventId: string;
  eventName: string;
  eventDescription: string;
  eventStatus: "upcoming" | "ongoing" | "past";
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  imageUrl?: string;
  rsvpCount?: number;
  maxCapacity?: number;
}

export default function EventCard({
  eventId,
  eventName,
  eventDescription,
  eventStatus,
  eventDate,
  eventTime,
  eventLocation,
  imageUrl,
  rsvpCount = 0,
}: EventCardProps) {
  const navigate = useNavigate();

  // Define status colors
  const getStatusColor = (status: "upcoming" | "ongoing" | "past") => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-blue-500 text-white";
      case "ongoing":
        return "bg-green-500 text-white";
      case "past":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleCardClick = () => {
    navigate(`/workshop/${eventId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      className="group relative w-full max-w-sm cursor-pointer overflow-hidden rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:ring-2 focus:ring-white/50 focus:outline-none"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${eventName}`}
    >
      {/* Liquid Glass Base */}
      <div
        className="absolute inset-0 rounded-3xl border border-white/10 backdrop-blur-md"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          boxShadow:
            "0 8px 32px rgba(31, 38, 135, 0.15), inset 0 4px 20px rgba(255, 255, 255, 0.15)",
        }}
      />

      {/* GDSC Gradient Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(59, 130, 246, 0.1) 33%, rgba(34, 197, 94, 0.1) 66%, rgba(234, 179, 8, 0.1) 100%)",
        }}
      />

      {/* Liquid Glass Shine Effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-40 transition-opacity duration-300 group-hover:opacity-60"
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(1px)",
          boxShadow:
            "inset -10px -8px 0px -11px rgba(255, 255, 255, 0.4), inset 0px -9px 0px -8px rgba(255, 255, 255, 0.3)",
          filter: "blur(0.5px) brightness(105%)",
        }}
      />

      {/* Specular Highlight */}
      <div
        className="pointer-events-none absolute top-2 left-2 h-20 w-20 rounded-full opacity-15 transition-all duration-300 group-hover:opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Banner Image */}
        <div className="relative -m-6 mb-4 h-32 overflow-hidden rounded-t-3xl">
          <img
            src={
              imageUrl ||
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop&crop=entropy&auto=format"
            }
            alt={`${eventName} banner`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* Glass overlay on image */}
          <div
            className="absolute inset-0 backdrop-blur-[1px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(59, 130, 246, 0.05) 33%, rgba(34, 197, 94, 0.05) 66%, rgba(234, 179, 8, 0.05) 100%)",
            }}
          />
        </div>

        <div className="px-6 pb-6">
          {/* Event Name */}
          <h3 className="mb-3 line-clamp-2 text-xl font-bold text-white drop-shadow-lg">
            {eventName}
          </h3>

          {/* Event Description */}
          <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-white/50">
            {eventDescription}
          </p>

          {/* Bottom section */}
          <div className="flex items-start justify-between">
            {/* Left column - Status and Location */}
            <div className="flex flex-col gap-3">
              {/* Event Status */}
              <div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase ${getStatusColor(eventStatus)} shadow-lg`}
                >
                  {eventStatus}
                </span>
              </div>

              {/* Event Location */}
              <div
                className="flex items-center gap-1 rounded-lg border border-white/20 px-2 py-1 shadow-sm backdrop-blur-sm"
                style={{ background: "rgba(255, 255, 255, 0.12)" }}
              >
                <MapPin size={14} className="flex-shrink-0 text-white/80" />
                <span className="truncate text-xs font-medium text-white/80">
                  {eventLocation}
                </span>
              </div>
            </div>

            {/* Right column - Date and Time */}
            <div className="flex flex-col gap-2">
              <div
                className="flex items-center gap-1 rounded-lg border border-white/20 px-2 py-1 shadow-sm backdrop-blur-sm"
                style={{ background: "rgba(255, 255, 255, 0.12)" }}
              >
                <Calendar size={14} className="flex-shrink-0 text-white/80" />
                <span className="text-xs font-medium text-white/80">
                  {eventDate}
                </span>
              </div>
              <div
                className="flex items-center gap-1 rounded-lg border border-white/20 px-2 py-1 shadow-sm backdrop-blur-sm"
                style={{ background: "rgba(255, 255, 255, 0.12)" }}
              >
                <Clock size={14} className="flex-shrink-0 text-white/80" />
                <span className="text-xs font-medium text-white/80">
                  {eventTime}
                </span>
              </div>
            </div>
          </div>

          {/* RSVP Count for upcoming events */}
          {eventStatus === "upcoming" && (
            <div className="mt-4 border-t border-white/10 pt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">RSVPs</span>
                <span className="font-medium text-white/80">{rsvpCount}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
