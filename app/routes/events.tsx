import { useState, useEffect } from "react";
import { Search, Filter, Calendar, Grid, List } from "lucide-react";
import Navbar from "~/components/ui/NavBar";
import EventCard from "~/components/ui/EventCard";

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "upcoming" | "ongoing" | "past"
  >("all");
  const [isLoaded, setIsLoaded] = useState(false);

  // Mock event data - replace with your actual data
  const mockEvents = [
    {
      eventName: "AI Workshop 2025",
      eventDescription:
        "Learn the fundamentals of machine learning and AI development with hands-on projects.",
      eventStatus: "upcoming" as const,
      eventDate: "March 15, 2025",
      eventTime: "2:00 PM",
      eventLocation: "ECSS 1.215",
    },
    {
      eventName: "Web Dev Bootcamp",
      eventDescription:
        "Full-stack web development workshop covering React, Node.js, and modern practices.",
      eventStatus: "ongoing" as const,
      eventDate: "March 10, 2025",
      eventTime: "10:00 AM",
      eventLocation: "ECSW 1.315",
    },
    {
      eventName: "Tech Talk: Future of Cloud",
      eventDescription:
        "Industry experts discuss the latest trends in cloud computing.",
      eventStatus: "past" as const,
      eventDate: "February 28, 2025",
      eventTime: "6:00 PM",
      eventLocation: "TI Auditorium",
    },
  ];

  useEffect(() => {
    // Trigger page load animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.eventDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || event.eventStatus === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getEventsByStatus = (status: "upcoming" | "ongoing" | "past") => {
    return filteredEvents.filter((event) => event.eventStatus === status);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic background with glass layers */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)",
          }}
        />

        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(45deg, rgba(239, 68, 68, 0.1) 0%, rgba(59, 130, 246, 0.1) 25%, rgba(34, 197, 94, 0.1) 50%, rgba(234, 179, 8, 0.1) 75%, rgba(239, 68, 68, 0.1) 100%)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 20s ease infinite",
          }}
        />
      </div>

      {/* GDSC Letters */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div
          className={`text-[12rem] font-extrabold transition-all duration-2000 select-none sm:text-[16rem] md:text-[20rem] lg:text-[25rem] ${
            isLoaded ? "scale-100 opacity-30" : "scale-95 opacity-0"
          }`}
          style={{
            textShadow: "0 0 50px rgba(255, 255, 255, 0.1)",
            filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.1))",
          }}
        >
          {["G", "D", "S", "C"].map((letter, index) => {
            const colors = [
              "text-gdscred",
              "text-gdscgreen",
              "text-gdscblue",
              "text-gdscyellow",
            ];
            return (
              <span
                key={letter}
                className={`${colors[index]} animate-pulse`}
                style={{
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: "3s",
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>
        <div className="absolute inset-0 opacity-60 backdrop-blur-lg"></div>
      </div>

      <Navbar />

      <main className="px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Glass Header Section */}
          <div
            className={`relative mb-12 transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Header glass background */}
            <div
              className="absolute inset-0 rounded-3xl border border-white/10 backdrop-blur-md"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                boxShadow:
                  "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            />

            {/* Header gradient overlay */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(59, 130, 246, 0.08) 33%, rgba(34, 197, 94, 0.08) 66%, rgba(234, 179, 8, 0.08) 100%)",
              }}
            />

            <div className="relative z-10 p-8">
              <div className="text-center">
                <h1
                  className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl"
                  style={{
                    textShadow: "0 0 30px rgba(255, 255, 255, 0.3)",
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Events
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-white/70">
                  Discover, learn, and connect at our exciting events and
                  workshops
                </p>
              </div>
            </div>
          </div>

          {/* Glass Controls Section */}
          <div
            className={`relative mb-8 transition-all delay-200 duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Controls glass background */}
            <div
              className="absolute inset-0 rounded-2xl border border-white/10 backdrop-blur-md"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                boxShadow:
                  "0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
              }}
            />

            <div className="relative z-10 p-6">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                {/* Search Glass Input */}
                <div className="relative max-w-md flex-1">
                  <div
                    className="absolute inset-0 rounded-xl border border-white/20 backdrop-blur-sm"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <div className="relative z-10 flex items-center">
                    <Search className="absolute left-4 h-5 w-5 text-white/60" />
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-xl bg-transparent py-3 pr-4 pl-12 text-white placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Filter and View Controls */}
                <div className="flex items-center gap-3">
                  {/* Filter Buttons */}
                  <div className="flex items-center gap-2">
                    {["all", "upcoming", "ongoing", "past"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter as any)}
                        className="group relative px-4 py-2 text-sm font-medium text-white/80 capitalize transition-all duration-200 hover:text-white"
                      >
                        <div
                          className={`absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-200 ${
                            selectedFilter === filter
                              ? "scale-100 opacity-100"
                              : "scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                          }`}
                          style={{
                            background:
                              selectedFilter === filter
                                ? "rgba(255, 255, 255, 0.15)"
                                : "rgba(255, 255, 255, 0.08)",
                            boxShadow:
                              selectedFilter === filter
                                ? "inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                                : "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                          }}
                        />
                        <span className="relative z-10">{filter}</span>
                      </button>
                    ))}
                  </div>

                  {/* View Mode Toggle */}
                  <div className="ml-4 flex items-center gap-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className="group relative p-2 text-white/80 transition-all duration-200 hover:text-white"
                    >
                      <div
                        className={`absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-200 ${
                          viewMode === "grid"
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                        }}
                      />
                      <Grid className="relative z-10 h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className="group relative p-2 text-white/80 transition-all duration-200 hover:text-white"
                    >
                      <div
                        className={`absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-200 ${
                          viewMode === "list"
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                        }}
                      />
                      <List className="relative z-10 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Events Categories */}
          <div className="space-y-12">
            {["upcoming", "ongoing", "past"].map((status, categoryIndex) => {
              const categoryEvents = getEventsByStatus(status as any);
              if (categoryEvents.length === 0) return null;

              return (
                <section
                  key={status}
                  className={`transition-all duration-1000 ${
                    isLoaded
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${400 + categoryIndex * 200}ms` }}
                >
                  {/* Category Header */}
                  <div className="relative mb-6">
                    <div
                      className="absolute inset-0 rounded-xl border border-white/10 backdrop-blur-sm"
                      style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        boxShadow: "0 2px 16px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <div className="relative z-10 p-4">
                      <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-white capitalize">
                          <Calendar className="h-6 w-6 text-white/70" />
                          {status} Events
                          <span className="rounded-full bg-white/10 px-2 py-1 text-sm font-normal text-white/60">
                            {categoryEvents.length}
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Events Grid */}
                  <div
                    className={` ${
                      viewMode === "grid"
                        ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                        : "flex flex-col gap-4"
                    } `}
                  >
                    {categoryEvents.map((event, eventIndex) => (
                      <div
                        key={`${event.eventName}-${eventIndex}`}
                        className="transition-all duration-500 hover:scale-105"
                        style={{
                          animationDelay: `${eventIndex * 100}ms`,
                          animation: isLoaded
                            ? "slideInUp 0.6s ease-out forwards"
                            : "none",
                        }}
                      >
                        <EventCard {...event} />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <div
              className={`relative py-16 text-center transition-all delay-600 duration-1000 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div
                className="absolute inset-0 rounded-3xl border border-white/10 backdrop-blur-md"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              />
              <div className="relative z-10 p-8">
                <Calendar className="mx-auto mb-4 h-16 w-16 text-white/30" />
                <h3 className="mb-2 text-xl font-semibold text-white/80">
                  No events found
                </h3>
                <p className="text-white/60">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
