import { Clock4 } from "lucide-react";

interface EventCardProps {
  eventName: string;
  eventDescription: string;
  eventStatus: "upcoming" | "ongoing" | "past";
  eventTime: string;
  eventLocation: string;
}

export default function EventCard({
  eventName,
  eventDescription,
  eventStatus,
  eventTime,
  eventLocation,
}: EventCardProps) {
  // Define status colors
  const getStatusColor = (status: EventCardProps["eventStatus"]) => {
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

  return (
    <div className="w-[360px] rounded-lg border border-gray-700 bg-black p-6 transition-colors hover:bg-gray-900">
      {/* Event Name */}
      <h3 className="mb-3 text-xl font-bold text-white">{eventName}</h3>

      {/* Event Description */}
      <p className="mb-6 text-sm leading-relaxed text-gray-300">
        {eventDescription}
      </p>

      {/* Bottom section */}
      <div className="flex items-end justify-between">
        {/* Event Status */}
        <div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase ${getStatusColor(eventStatus)}`}
          >
            {eventStatus}
          </span>
        </div>

        {/* Event Time and Location */}
        <div className="text-left">
          <div className="flex rounded-full bg-gray-700">
            <Clock4 className="mr-2 h-4 w-4" />
            <p className="text-sm text-gray-400">{eventTime}</p>
          </div>
          <p className="text-sm text-gray-400">{eventLocation}</p>
        </div>
      </div>
    </div>
  );
}
