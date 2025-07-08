import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import NavBar from "~/components/ui/NavBar";
import GlassContainer from "~/components/ui/GlassContainer";
import AnimatedSection from "~/components/ui/AnimatedSection";
import { Button } from "~/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  ExternalLink,
  Download,
  FileText,
  Code,
  Play,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Loader2,
  RefreshCw,
} from "lucide-react";
import {
  useEventDetails,
  useEventLinks,
  useEventRSVPStatus,
  useToggleEventRSVP,
  useEventRSVPCount,
} from "~/hooks/useEvents";
import {
  getBrowserFingerprint,
  getUserIPAddress,
  isFingerprintingSupported,
  getFallbackIdentifier,
} from "~/lib/utils/fingerprint";
import type { EventStatus } from "~/types/events";

export default function EventDetails() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [browserFingerprint, setBrowserFingerprint] = useState<string>("");

  const { workshopId: eventId } = useParams<{ workshopId: string }>();
  const navigate = useNavigate();

  // Fetch event details
  const {
    data: event,
    isLoading: eventLoading,
    error: eventError,
    refetch: refetchEvent,
  } = useEventDetails(eventId || "", {
    enabled: !!eventId,
  });

  // Fetch event links based on status
  const { data: eventLinks, isLoading: linksLoading } = useEventLinks(
    eventId || "",
    event?.status || "upcoming",
    {
      enabled:
        !!eventId &&
        !!event?.status &&
        (event.status === "ongoing" || event.status === "past"),
    },
  );

  // Check RSVP status
  const { data: isRSVPed, isLoading: rsvpStatusLoading } = useEventRSVPStatus(
    eventId || "",
    browserFingerprint,
    {
      enabled:
        !!eventId && !!browserFingerprint && event?.status === "upcoming",
    },
  );

  // Get real-time RSVP count
  const { data: currentRSVPCount, refetch: refetchRSVPCount } =
    useEventRSVPCount(eventId || "", {
      enabled: !!eventId,
      refetchInterval: event?.status === "upcoming" ? 30000 : undefined, // Refresh every 30s for upcoming events
    });

  // RSVP mutation
  const toggleRSVPMutation = useToggleEventRSVP();

  // Generate browser fingerprint on mount (persistent across sessions)
  useEffect(() => {
    const initializeFingerprint = async () => {
      try {
        if (isFingerprintingSupported()) {
          const fingerprint = await getBrowserFingerprint();
          setBrowserFingerprint(fingerprint);
        } else {
          // Fallback for browsers that don't support fingerprinting
          const fallback = getFallbackIdentifier();
          setBrowserFingerprint(fallback);
          console.warn(
            "Browser fingerprinting not fully supported, using fallback identifier",
          );
        }
      } catch (error) {
        console.error("Failed to generate browser fingerprint:", error);
        // Use a basic fallback
        setBrowserFingerprint(getFallbackIdentifier());
      }
    };

    initializeFingerprint();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle RSVP toggle
  const handleRSVP = async () => {
    if (!eventId || !browserFingerprint) return;

    try {
      const ipAddress = await getUserIPAddress();
      const userAgent = navigator.userAgent;

      await toggleRSVPMutation.mutateAsync({
        eventId,
        fingerprint: browserFingerprint,
        ipAddress: ipAddress || undefined,
        userAgent,
      });

      // Refresh RSVP count after successful toggle
      refetchRSVPCount();
    } catch (error) {
      console.error("RSVP failed:", error);
      // You could show a toast notification here
    }
  };

  // Helper functions
  const getStatusColor = (status: EventStatus) => {
    switch (status) {
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

  const getStatusIcon = (status: EventStatus) => {
    switch (status) {
      case "upcoming":
        return Calendar;
      case "ongoing":
        return Play;
      case "past":
        return CheckCircle;
      default:
        return AlertCircle;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (startTime: string, endTime?: string) => {
    const start = new Date(`1970-01-01T${startTime}`);
    const formattedStart = start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    if (endTime) {
      const end = new Date(`1970-01-01T${endTime}`);
      const formattedEnd = end.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      return `${formattedStart} - ${formattedEnd}`;
    }

    return formattedStart;
  };

  // Loading state
  if (eventLoading) {
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
              animation: "gradientShift 25s ease infinite",
            }}
          />
        </div>

        <NavBar />

        <div className="relative z-10 px-4 pt-24 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <GlassContainer padding="xl" className="text-center">
              <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-white/60" />
              <h2 className="mb-2 text-2xl font-bold text-white">
                Loading Event Details
              </h2>
              <p className="text-white/70">
                Please wait while we fetch the event information...
              </p>
            </GlassContainer>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (eventError || !event) {
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
              animation: "gradientShift 25s ease infinite",
            }}
          />
        </div>

        <NavBar />

        <div className="relative z-10 px-4 pt-24 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <GlassContainer padding="xl" className="text-center">
              <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-400" />
              <h2 className="mb-2 text-2xl font-bold text-white">
                Event Not Found
              </h2>
              <p className="mb-6 text-white/70">
                {eventError instanceof Error
                  ? eventError.message
                  : "The event you're looking for doesn't exist or has been removed."}
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  onClick={() => navigate("/events")}
                  className="group relative"
                >
                  <div
                    className="absolute inset-0 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/50"
                    style={{
                      background: "rgba(59, 130, 246, 0.3)",
                      boxShadow: "0 4px 16px rgba(59, 130, 246, 0.2)",
                    }}
                  />
                  <span className="relative z-10 flex items-center px-6 py-3 font-medium text-white">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Events
                  </span>
                </button>

                {eventError && (
                  <button
                    onClick={() => refetchEvent()}
                    className="group relative"
                  >
                    <div
                      className="absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/40"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <span className="relative z-10 flex items-center px-6 py-3 font-medium text-white">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Again
                    </span>
                  </button>
                )}
              </div>
            </GlassContainer>
          </div>
        </div>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(event.status);
  const showAdditionalContent =
    event.status === "ongoing" || event.status === "past";
  const showPastContent = event.status === "past";
  const rsvpCount = currentRSVPCount ?? event.rsvp_count;

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
            animation: "gradientShift 25s ease infinite",
          }}
        />
      </div>

      <NavBar />

      <div className="relative z-10 pt-24 pb-12">
        {/* Back Button */}
        <AnimatedSection delay={200} className="mb-6 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <button
              onClick={() => navigate("/events")}
              className="group relative"
            >
              <div
                className="absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/40"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  boxShadow:
                    "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              />
              <div className="relative z-10 flex items-center px-4 py-2 text-white/90 transition-all duration-300 hover:text-white">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Events
              </div>
            </button>
          </div>
        </AnimatedSection>

        {/* Event Header */}
        <AnimatedSection delay={400} className="mb-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <GlassContainer padding="lg">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Event Image */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <img
                      src={
                        event.image_url ||
                        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&auto=format"
                      }
                      alt={event.name}
                      className="h-64 w-full rounded-2xl object-cover sm:h-80"
                      loading="lazy"
                    />
                    {/* Status badge overlay */}
                    <div className="absolute top-4 left-4">
                      <div
                        className={`flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(event.status)}`}
                      >
                        <StatusIcon className="mr-2 h-4 w-4" />
                        {event.status}
                      </div>
                    </div>

                    {/* Glass overlay on image */}
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(59, 130, 246, 0.05) 33%, rgba(34, 197, 94, 0.05) 66%, rgba(234, 179, 8, 0.05) 100%)",
                      }}
                    />
                  </div>
                </div>

                {/* Event Info */}
                <div className="space-y-6">
                  <div>
                    <h1 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                      {event.name}
                    </h1>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-4">
                    <div className="flex items-center text-white/80">
                      <Calendar className="mr-3 h-5 w-5 flex-shrink-0 text-blue-400" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <Clock className="mr-3 h-5 w-5 flex-shrink-0 text-green-400" />
                      <span>
                        {formatTime(
                          event.start_time,
                          event.end_time || undefined,
                        )}
                      </span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <MapPin className="mr-3 h-5 w-5 flex-shrink-0 text-red-400" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <Users className="mr-3 h-5 w-5 flex-shrink-0 text-yellow-400" />
                      <span>
                        {rsvpCount} {rsvpCount === 1 ? "person" : "people"}{" "}
                        RSVPed
                      </span>
                    </div>
                  </div>

                  {/* RSVP Section for upcoming events */}
                  {event.status === "upcoming" &&
                    event.allow_anonymous_rsvp && (
                      <div className="pt-4">
                        {/* RSVP Button */}
                        <div className="group relative">
                          <div
                            className={`absolute inset-0 rounded-xl border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/50 ${
                              isRSVPed ? "border-green-400/50" : ""
                            }`}
                            style={{
                              background: isRSVPed
                                ? "linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)"
                                : "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(34, 197, 94, 0.3) 100%)",
                              boxShadow:
                                "0 8px 24px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                            }}
                          />
                          <Button
                            onClick={handleRSVP}
                            disabled={
                              toggleRSVPMutation.isPending ||
                              rsvpStatusLoading ||
                              !browserFingerprint
                            }
                            className="relative z-10 w-full bg-transparent py-3 font-semibold text-white transition-all duration-300 group-hover:scale-105 hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {toggleRSVPMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                {isRSVPed ? "Cancelling..." : "RSVPing..."}
                              </>
                            ) : isRSVPed ? (
                              <>
                                <CheckCircle className="mr-2 h-5 w-5" />
                                RSVP'd - Click to Cancel
                              </>
                            ) : (
                              <>
                                <Users className="mr-2 h-5 w-5" />
                                RSVP for Event
                              </>
                            )}
                          </Button>
                        </div>

                        {toggleRSVPMutation.error && (
                          <p className="mt-2 text-sm text-red-400">
                            {toggleRSVPMutation.error instanceof Error
                              ? toggleRSVPMutation.error.message
                              : "Failed to update RSVP. Please try again."}
                          </p>
                        )}
                      </div>
                    )}
                </div>
              </div>
            </GlassContainer>
          </div>
        </AnimatedSection>

        {/* About the Event */}
        <AnimatedSection delay={600} className="mb-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <GlassContainer padding="lg">
              <h2 className="mb-6 text-2xl font-bold text-white">
                About the {event.event_type || "Event"}
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="leading-relaxed whitespace-pre-line text-white/80">
                  {event.description ||
                    "No description available for this event."}
                </p>
              </div>
            </GlassContainer>
          </div>
        </AnimatedSection>

        {/* Event Hosts */}
        {event.hosts && event.hosts.length > 0 && (
          <AnimatedSection delay={800} className="mb-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <GlassContainer padding="lg">
                <h2 className="mb-6 text-2xl font-bold text-white">
                  <User className="mr-3 inline-block h-6 w-6 text-blue-400" />
                  Event Hosts
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {event.hosts.map((host, index) => (
                    <AnimatedSection
                      key={host.id}
                      delay={1000 + index * 200}
                      className="transition-all duration-700 hover:scale-105"
                    >
                      <GlassContainer>
                        <div className="p-6">
                          <div className="flex items-start space-x-4">
                            <img
                              src={
                                host.image_url ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(host.name)}&background=4f46e5&color=fff`
                              }
                              alt={host.name}
                              className="h-16 w-16 flex-shrink-0 rounded-full border-2 border-white/20 object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="mb-1 text-lg font-bold text-white">
                                {host.name}
                              </h3>
                              <p className="mb-3 text-sm font-medium text-blue-300">
                                {host.role}
                              </p>
                              {host.specialties &&
                                host.specialties.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {host.specialties.map((specialty, i) => (
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
                          </div>
                        </div>
                      </GlassContainer>
                    </AnimatedSection>
                  ))}
                </div>
              </GlassContainer>
            </div>
          </AnimatedSection>
        )}

        {/* Important Links - Only show for ongoing/past events */}
        {showAdditionalContent && eventLinks && eventLinks.length > 0 && (
          <AnimatedSection delay={1200} className="mb-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <GlassContainer padding="lg">
                <h2 className="mb-6 text-2xl font-bold text-white">
                  <Download className="mr-3 inline-block h-6 w-6 text-green-400" />
                  Important Links & Resources
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {eventLinks
                    .filter(
                      (link) =>
                        link.link_type !== "slide" && link.link_type !== "code",
                    )
                    .map((link, index) => (
                      <AnimatedSection
                        key={link.id}
                        delay={1400 + index * 100}
                        className="transition-all duration-700 hover:scale-105"
                      >
                        <GlassContainer>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block p-4"
                          >
                            <div className="flex items-start space-x-3">
                              <Download className="mt-1 h-5 w-5 flex-shrink-0 text-white/70" />
                              <div className="flex-1">
                                <h3 className="mb-1 font-medium text-white transition-colors group-hover:text-blue-300">
                                  {link.title}
                                </h3>
                                <p className="text-sm text-white/60">
                                  {link.description}
                                </p>
                              </div>
                              <ExternalLink className="h-4 w-4 text-white/50 transition-colors group-hover:text-white/80" />
                            </div>
                          </a>
                        </GlassContainer>
                      </AnimatedSection>
                    ))}
                </div>
              </GlassContainer>
            </div>
          </AnimatedSection>
        )}

        {/* Workshop Materials - Only show for past events */}
        {showPastContent &&
          eventLinks &&
          eventLinks.some(
            (link) => link.link_type === "slide" || link.link_type === "code",
          ) && (
            <AnimatedSection delay={1600} className="mb-8 px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-6xl">
                <GlassContainer padding="lg">
                  <h2 className="mb-6 text-2xl font-bold text-white">
                    <FileText className="mr-3 inline-block h-6 w-6 text-purple-400" />
                    Event Materials
                  </h2>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Slides */}
                    {eventLinks
                      .filter((link) => link.link_type === "slide")
                      .map((link, index) => (
                        <AnimatedSection
                          key={link.id}
                          delay={1800 + index * 200}
                          className="transition-all duration-700 hover:scale-105"
                        >
                          <GlassContainer>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group block p-6"
                            >
                              <div className="flex items-center space-x-4">
                                <div
                                  className="rounded-xl border border-white/20 p-3 backdrop-blur-sm"
                                  style={{
                                    background: "rgba(147, 51, 234, 0.2)",
                                    boxShadow:
                                      "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                                  }}
                                >
                                  <FileText className="h-8 w-8 text-purple-300" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-purple-300">
                                    {link.title}
                                  </h3>
                                  <p className="text-sm text-white/60">
                                    {link.description}
                                  </p>
                                </div>
                                <ExternalLink className="h-5 w-5 text-white/50 transition-colors group-hover:text-white/80" />
                              </div>
                            </a>
                          </GlassContainer>
                        </AnimatedSection>
                      ))}

                    {/* Solution Code */}
                    {eventLinks
                      .filter((link) => link.link_type === "code")
                      .map((link, index) => (
                        <AnimatedSection
                          key={link.id}
                          delay={2000 + index * 200}
                          className="transition-all duration-700 hover:scale-105"
                        >
                          <GlassContainer>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group block p-6"
                            >
                              <div className="flex items-center space-x-4">
                                <div
                                  className="rounded-xl border border-white/20 p-3 backdrop-blur-sm"
                                  style={{
                                    background: "rgba(34, 197, 94, 0.2)",
                                    boxShadow:
                                      "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                                  }}
                                >
                                  <Code className="h-8 w-8 text-green-300" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-green-300">
                                    {link.title}
                                  </h3>
                                  <p className="text-sm text-white/60">
                                    {link.description}
                                  </p>
                                </div>
                                <ExternalLink className="h-5 w-5 text-white/50 transition-colors group-hover:text-white/80" />
                              </div>
                            </a>
                          </GlassContainer>
                        </AnimatedSection>
                      ))}
                  </div>
                </GlassContainer>
              </div>
            </AnimatedSection>
          )}

        {/* Empty state for materials if no links available */}
        {showAdditionalContent && (!eventLinks || eventLinks.length === 0) && (
          <AnimatedSection delay={1200} className="mb-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <GlassContainer padding="lg" className="text-center">
                <FileText className="mx-auto mb-4 h-12 w-12 text-white/30" />
                <h3 className="mb-2 text-lg font-semibold text-white/80">
                  No Additional Resources
                </h3>
                <p className="text-white/60">
                  Additional resources and materials will be posted here after
                  the event.
                </p>
              </GlassContainer>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
