import { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  Grid,
  List,
  Loader2,
  AlertCircle,
  RefreshCw,
  Clock,
  Users,
  MapPin,
} from "lucide-react";
import Navbar from "~/components/ui/NavBar";
import EventCard from "~/components/ui/EventCard";
import GlassContainer from "~/components/ui/GlassContainer";
import AnimatedSection from "~/components/ui/AnimatedSection";
import { useEventsByStatus } from "~/hooks/useEvents";
import type { EventStatus, EventWithRSVPCount } from "~/types/events";

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilter, setSelectedFilter] = useState<"all" | EventStatus>(
    "all",
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch events grouped by status
  const {
    data: groupedEvents,
    isLoading,
    error,
    refetch,
    isFetching,
    isRefetching,
  } = useEventsByStatus({
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Memoized filtered events to prevent unnecessary re-renders
  const filteredEventsByStatus = useMemo(() => {
    if (!groupedEvents) return { upcoming: [], ongoing: [], past: [] };

    const filterEvents = (events: EventWithRSVPCount[]) => {
      return events.filter((event) => {
        // Search filter
        const searchMatch =
          !searchTerm ||
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (event.description &&
            event.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase());

        return searchMatch;
      });
    };

    return {
      upcoming: filterEvents(groupedEvents.upcoming || []),
      ongoing: filterEvents(groupedEvents.ongoing || []),
      past: filterEvents(groupedEvents.past || []),
    };
  }, [groupedEvents, searchTerm]);

  // Get events for selected filter
  const getEventsForDisplay = () => {
    if (selectedFilter === "all") {
      return [
        ...filteredEventsByStatus.upcoming,
        ...filteredEventsByStatus.ongoing,
        ...filteredEventsByStatus.past,
      ];
    }
    return filteredEventsByStatus[selectedFilter] || [];
  };

  const displayEvents = getEventsForDisplay();

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get stats for display
  const stats = useMemo(() => {
    if (!groupedEvents) return { total: 0, upcoming: 0, ongoing: 0, past: 0 };

    return {
      total:
        (groupedEvents.upcoming?.length || 0) +
        (groupedEvents.ongoing?.length || 0) +
        (groupedEvents.past?.length || 0),
      upcoming: groupedEvents.upcoming?.length || 0,
      ongoing: groupedEvents.ongoing?.length || 0,
      past: groupedEvents.past?.length || 0,
    };
  }, [groupedEvents]);

  // Loading state
  if (isLoading) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Background layers */}
        <div className="fixed inset-0 -z-20">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(45deg, rgba(239, 68, 68, 0.15) 0%, rgba(59, 130, 246, 0.15) 25%, rgba(34, 197, 94, 0.15) 50%, rgba(234, 179, 8, 0.15) 75%, rgba(239, 68, 68, 0.15) 100%)",
              backgroundSize: "400% 400%",
              animation: "gradientShift 20s ease infinite",
            }}
          />
        </div>

        <Navbar />

        <main className="px-4 pt-24 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <GlassContainer padding="xl" className="text-center">
              <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-white/60" />
              <h2 className="mb-2 text-2xl font-bold text-white">
                Loading Events
              </h2>
              <p className="text-white/70">
                Please wait while we fetch the latest events...
              </p>
            </GlassContainer>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Background layers */}
        <div className="fixed inset-0 -z-20">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(45deg, rgba(239, 68, 68, 0.15) 0%, rgba(59, 130, 246, 0.15) 25%, rgba(34, 197, 94, 0.15) 50%, rgba(234, 179, 8, 0.15) 75%, rgba(239, 68, 68, 0.15) 100%)",
              backgroundSize: "400% 400%",
              animation: "gradientShift 20s ease infinite",
            }}
          />
        </div>

        <Navbar />

        <main className="px-4 pt-24 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <GlassContainer padding="xl" className="text-center">
              <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
              <h2 className="mb-2 text-2xl font-bold text-white">
                Error Loading Events
              </h2>
              <p className="mb-6 text-white/70">
                {error instanceof Error
                  ? error.message
                  : "Something went wrong while loading events."}
              </p>
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="group relative disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div
                  className="absolute inset-0 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/50 group-disabled:hover:scale-100"
                  style={{
                    background: "rgba(59, 130, 246, 0.3)",
                    boxShadow: "0 4px 16px rgba(59, 130, 246, 0.2)",
                  }}
                />
                <span className="relative z-10 flex items-center px-6 py-3 font-medium text-white">
                  {isFetching ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  {isFetching ? "Loading..." : "Try Again"}
                </span>
              </button>
            </GlassContainer>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 -z-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "linear-gradient(45deg, rgba(239, 68, 68, 0.15) 0%, rgba(59, 130, 246, 0.15) 25%, rgba(34, 197, 94, 0.15) 50%, rgba(234, 179, 8, 0.15) 75%, rgba(239, 68, 68, 0.15) 100%)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 20s ease infinite",
          }}
        />
      </div>

      <Navbar />

      <main className="px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <AnimatedSection
            delay={300}
            className={`mb-12 transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <GlassContainer padding="lg">
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
                <p className="mx-auto mb-6 max-w-2xl text-lg text-white/70">
                  Discover, learn, and connect at our exciting events and
                  workshops
                </p>

                {/* Stats */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{stats.total} Total Events</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-300">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{stats.upcoming} Upcoming</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-300">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{stats.ongoing} Ongoing</span>
                  </div>
                </div>

                {/* Refresh indicator */}
                {isRefetching && (
                  <div className="mt-4 flex items-center justify-center text-sm text-white/60">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating events...
                  </div>
                )}
              </div>
            </GlassContainer>
          </AnimatedSection>

          {/* Controls Section */}
          <AnimatedSection
            delay={500}
            className={`mb-8 transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <GlassContainer padding="md">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                {/* Search Input */}
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
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-4 text-white/60 transition-colors hover:text-white"
                        aria-label="Clear search"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter and View Controls */}
                <div className="flex items-center gap-3">
                  {/* Filter Buttons */}
                  <div className="flex items-center gap-2">
                    {[
                      { key: "all", label: "All", count: stats.total },
                      {
                        key: "upcoming",
                        label: "Upcoming",
                        count: stats.upcoming,
                      },
                      {
                        key: "ongoing",
                        label: "Ongoing",
                        count: stats.ongoing,
                      },
                      { key: "past", label: "Past", count: stats.past },
                    ].map((filter) => (
                      <button
                        key={filter.key}
                        onClick={() => setSelectedFilter(filter.key as any)}
                        className="group relative px-4 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:text-white"
                      >
                        <div
                          className={`absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-200 ${
                            selectedFilter === filter.key
                              ? "scale-100 opacity-100"
                              : "scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                          }`}
                          style={{
                            background:
                              selectedFilter === filter.key
                                ? "rgba(255, 255, 255, 0.15)"
                                : "rgba(255, 255, 255, 0.08)",
                            boxShadow:
                              selectedFilter === filter.key
                                ? "inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                                : "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                          }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                          {filter.label}
                          <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
                            {filter.count}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* View Mode Toggle */}
                  <div className="ml-4 flex items-center gap-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className="group relative p-2 text-white/80 transition-all duration-200 hover:text-white"
                      aria-label="Grid view"
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
                      aria-label="List view"
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
            </GlassContainer>
          </AnimatedSection>

          {/* Events Section */}
          {selectedFilter === "all" ? (
            // Show events grouped by status
            <div className="space-y-12">
              {(["upcoming", "ongoing", "past"] as const).map(
                (status, categoryIndex) => {
                  const categoryEvents = filteredEventsByStatus[status];
                  if (!categoryEvents || categoryEvents.length === 0)
                    return null;

                  return (
                    <AnimatedSection
                      key={status}
                      delay={700 + categoryIndex * 200}
                      className={`transition-all duration-1000 ${
                        isLoaded
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      }`}
                    >
                      {/* Category Header */}
                      <div className="relative mb-6">
                        <GlassContainer
                          gradientOverlay={false}
                          hoverEffect={false}
                          padding="md"
                        >
                          <div className="flex items-center justify-between">
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-white capitalize">
                              <Calendar className="h-6 w-6 text-white/70" />
                              {status} Events
                              <span className="rounded-full bg-white/10 px-2 py-1 text-sm font-normal text-white/60">
                                {categoryEvents.length}
                              </span>
                            </h2>
                          </div>
                        </GlassContainer>
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
                            key={event.id}
                            className="transition-all duration-500"
                            style={{
                              animationDelay: `${eventIndex * 100}ms`,
                              animation: isLoaded
                                ? "slideInUp 0.6s ease-out forwards"
                                : "none",
                            }}
                          >
                            <EventCard
                              eventId={event.id}
                              eventName={event.name}
                              eventDescription={
                                event.description || "No description available"
                              }
                              eventStatus={event.status}
                              eventDate={formatDate(event.date)}
                              eventTime={formatTime(event.start_time)}
                              eventLocation={event.location}
                              imageUrl={event.image_url || undefined}
                              rsvpCount={event.rsvp_count || 0}
                            />
                          </div>
                        ))}
                      </div>
                    </AnimatedSection>
                  );
                },
              )}
            </div>
          ) : (
            // Show filtered events in a single section
            <AnimatedSection
              delay={700}
              className={`transition-all duration-1000 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div
                className={` ${
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col gap-4"
                } `}
              >
                {displayEvents.map((event, eventIndex) => (
                  <div
                    key={event.id}
                    className="transition-all duration-500"
                    style={{
                      animationDelay: `${eventIndex * 100}ms`,
                      animation: isLoaded
                        ? "slideInUp 0.6s ease-out forwards"
                        : "none",
                    }}
                  >
                    <EventCard
                      eventId={event.id}
                      eventName={event.name}
                      eventDescription={
                        event.description || "No description available"
                      }
                      eventStatus={event.status}
                      eventDate={formatDate(event.date)}
                      eventTime={formatTime(event.start_time)}
                      eventLocation={event.location}
                      imageUrl={event.image_url || undefined}
                      rsvpCount={event.rsvp_count || 0}
                      maxCapacity={event.max_capacity}
                    />
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Empty State */}
          {displayEvents.length === 0 && (
            <AnimatedSection
              delay={900}
              className={`relative py-16 text-center transition-all duration-1000 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <GlassContainer padding="xl">
                <Calendar className="mx-auto mb-4 h-16 w-16 text-white/30" />
                <h3 className="mb-2 text-xl font-semibold text-white/80">
                  No events found
                </h3>
                <p className="mb-6 text-white/60">
                  {searchTerm
                    ? `No events match "${searchTerm}"`
                    : selectedFilter !== "all"
                      ? `No ${selectedFilter} events available`
                      : "Check back soon for upcoming events!"}
                </p>
                {(searchTerm || selectedFilter !== "all") && (
                  <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedFilter("all");
                      }}
                      className="group relative"
                    >
                      <div
                        className="absolute inset-0 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/50"
                        style={{
                          background: "rgba(59, 130, 246, 0.3)",
                          boxShadow: "0 4px 16px rgba(59, 130, 246, 0.2)",
                        }}
                      />
                      <span className="relative z-10 px-6 py-3 font-medium text-white">
                        Show All Events
                      </span>
                    </button>

                    <button
                      onClick={() => refetch()}
                      disabled={isFetching}
                      className="group relative disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <div
                        className="absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/40 group-disabled:hover:scale-100"
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <span className="relative z-10 flex items-center px-6 py-3 font-medium text-white">
                        {isFetching ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="mr-2 h-4 w-4" />
                        )}
                        {isFetching ? "Refreshing..." : "Refresh Events"}
                      </span>
                    </button>
                  </div>
                )}
              </GlassContainer>
            </AnimatedSection>
          )}
        </div>
      </main>
    </div>
  );
}
