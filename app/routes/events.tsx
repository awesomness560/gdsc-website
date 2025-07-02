import EventCard from "~/components/ui/EventCard";
import Navbar from "~/components/ui/NavBar";

export default function Events() {
  return (
    <div className="relative flex h-screen w-full flex-1 overflow-y-scroll bg-black">
      <Navbar />
      {/* Fixed bright letters */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="text-[15rem] font-extrabold opacity-20 select-none sm:text-[20rem] md:text-[25rem]">
          <span className="text-gdscred">G</span>
          <span className="text-gdscgreen">D</span>
          <span className="text-gdscblue">S</span>
          <span className="text-gdscyellow">C</span>
        </div>
        {/* Slight blur for depth */}
        <div className="absolute inset-0 backdrop-blur-md"></div>
      </div>
      <div className="z-10 mt-26 flex flex-1 flex-col p-8">
        <h1 className="mb-12 text-6xl font-bold text-white">Events</h1>

        <div className="w-fullspace-y-8 flex flex-col gap-y-7">
          {/* Upcoming Events */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-white">Upcoming</h2>
            <div className="h-px w-full bg-gray-600"></div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <EventCard
                eventName="Web Workshop: Starry Adventure"
                eventDescription="For our final workshop of this semester, you’ll create an interactive night sky using HTML, CSS, and JavaScript — with twinkling stars, clickable constellations, and fun animations!"
                eventStatus="upcoming"
                eventTime="10:00 AM"
                eventDate="2025-06-15"
                eventLocation="ECSS 2.415"
              />
              <EventCard
                eventName="Web Workshop: Starry Adventure"
                eventDescription="For our final workshop of this semester, you’ll create an interactive night sky using HTML, CSS, and JavaScript — with twinkling stars, clickable constellations, and fun animations!"
                eventStatus="upcoming"
                eventTime="10:00 AM"
                eventDate="2025-06-15"
                eventLocation="ECSS 2.415"
              />
              <EventCard
                eventName="Web Workshop: Starry Adventure"
                eventDescription="For our final workshop of this semester, you’ll create an interactive night sky using HTML, CSS, and JavaScript — with twinkling stars, clickable constellations, and fun animations!"
                eventStatus="upcoming"
                eventTime="10:00 AM"
                eventDate="2025-06-15"
                eventLocation="ECSS 2.415"
              />
              <EventCard
                eventName="Web Workshop: Starry Adventure"
                eventDescription="For our final workshop of this semester, you’ll create an interactive night sky using HTML, CSS, and JavaScript — with twinkling stars, clickable constellations, and fun animations!"
                eventStatus="upcoming"
                eventTime="10:00 AM"
                eventDate="2025-06-15"
                eventLocation="ECSS 2.415"
              />
              <EventCard
                eventName="Web Workshop: Starry Adventure"
                eventDescription="For our final workshop of this semester, you’ll create an interactive night sky using HTML, CSS, and JavaScript — with twinkling stars, clickable constellations, and fun animations!"
                eventStatus="upcoming"
                eventTime="10:00 AM"
                eventDate="2025-06-15"
                eventLocation="ECSS 2.415"
              />
              <EventCard
                eventName="Web Workshop: Starry Adventure"
                eventDescription="For our final workshop of this semester, you’ll create an interactive night sky using HTML, CSS, and JavaScript — with twinkling stars, clickable constellations, and fun animations!"
                eventStatus="upcoming"
                eventTime="10:00 AM"
                eventDate="2025-06-15"
                eventLocation="ECSS 2.415"
              />
              <EventCard
                eventName="Web Workshop: Starry Adventure"
                eventDescription="For our final workshop of this semester, you’ll create an interactive night sky using HTML, CSS, and JavaScript — with twinkling stars, clickable constellations, and fun animations!"
                eventStatus="upcoming"
                eventTime="10:00 AM"
                eventDate="2025-06-15"
                eventLocation="ECSS 2.415"
              />
              <EventCard
                eventName="Web Workshop: Starry Adventure"
                eventDescription="For our final workshop of this semester, you’ll create an interactive night sky using HTML, CSS, and JavaScript — with twinkling stars, clickable constellations, and fun animations!"
                eventStatus="upcoming"
                eventTime="10:00 AM"
                eventDate="2025-06-15"
                eventLocation="ECSS 2.415"
              />
            </div>
          </div>

          {/* Ongoing Events */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-white">Ongoing</h2>
            <div className="h-px w-full bg-gray-600"></div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <EventCard
                eventName="Tech Conference 2025"
                eventDescription="Annual technology conference featuring the latest innovations in AI and web development."
                eventStatus="ongoing"
                eventTime="10:00 AM"
                eventDate="2025-06-15"
                eventLocation="Convention Center, Austin TX"
              />
            </div>
          </div>

          {/* Past Events */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-white">Past</h2>
            <div className="h-px w-full bg-gray-600"></div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <EventCard
                eventName="Tech Conference 2025"
                eventDescription="Annual technology conference featuring the latest innovations in AI and web development."
                eventStatus="past"
                eventTime="10:00 AM"
                eventDate="2025-06-15"
                eventLocation="Convention Center, Austin TX"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
