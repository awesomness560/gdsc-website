import EventCard from "~/components/ui/EventCard";
import Navbar from "~/components/ui/NavBar";

export default function Events() {
  return (
    <div className="relative flex h-screen w-full flex-1 overflow-y-scroll bg-black">
      <Navbar />
      <div className="mt-26 flex flex-1 flex-col p-8">
        <h1 className="mb-12 text-6xl font-bold text-white">Events</h1>

        <div className="w-fullspace-y-8 flex flex-col gap-y-7">
          {/* Upcoming Events */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-white">Upcoming</h2>
            <div className="h-px w-full bg-gray-600"></div>
            <EventCard
              eventName="Tech Conference 2025"
              eventDescription="Annual technology conference featuring the latest innovations in AI and web development."
              eventStatus="upcoming"
              eventTime="10:00 AM"
              eventLocation="Convention Center, Austin TX"
            />
          </div>

          {/* Ongoing Events */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-white">Ongoing</h2>
            <div className="h-px w-full bg-gray-600"></div>
          </div>

          {/* Past Events */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-white">Past</h2>
            <div className="h-px w-full bg-gray-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
