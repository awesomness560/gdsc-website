import { useState, useEffect } from "react";
import {
  Plus,
  Calendar,
  Users,
  Settings,
  LogOut,
  Loader2,
  Shield,
  BarChart3,
  Clock,
  MapPin,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import Navbar from "~/components/ui/NavBar";
import GlassContainer from "~/components/ui/GlassContainer";
import AnimatedSection from "~/components/ui/AnimatedSection";
import SignInModal from "~/components/auth/SignInModal";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/hooks/useAuth";
import { useEventsByStatus } from "~/hooks/useEvents";
import { useNavigate } from "react-router";

export default function AdminDashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const { user, isAuthenticated, isLoading, signOut, isSigningOut } = useAuth();

  const navigate = useNavigate();

  // Fetch events for dashboard stats
  const { data: groupedEvents, isLoading: eventsLoading } = useEventsByStatus({
    enabled: isAuthenticated,
  });

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Show sign in modal if not authenticated and not loading
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowSignInModal(true);
    } else {
      setShowSignInModal(false);
    }
  }, [isLoading, isAuthenticated]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  // Calculate dashboard stats
  const stats = {
    totalEvents:
      (groupedEvents?.upcoming?.length || 0) +
      (groupedEvents?.ongoing?.length || 0) +
      (groupedEvents?.past?.length || 0),
    upcomingEvents: groupedEvents?.upcoming?.length || 0,
    ongoingEvents: groupedEvents?.ongoing?.length || 0,
    totalRSVPs: groupedEvents
      ? [
          ...(groupedEvents.upcoming || []),
          ...(groupedEvents.ongoing || []),
          ...(groupedEvents.past || []),
        ].reduce((sum, event) => sum + (event.rsvp_count || 0), 0)
      : 0,
  };

  // Loading state
  if (isLoading) {
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
        </div>

        <Navbar />

        <main className="px-4 pt-24 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <GlassContainer padding="xl" className="text-center">
              <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-white/60" />
              <h2 className="mb-2 text-2xl font-bold text-white">
                Loading Dashboard
              </h2>
              <p className="text-white/70">Checking authentication...</p>
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
            animation: "gradientShift 25s ease infinite",
          }}
        />
      </div>

      <Navbar />

      <main className="px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {isAuthenticated ? (
            <>
              {/* Header Section */}
              <AnimatedSection
                delay={300}
                className={`mb-12 transition-all duration-1000 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <GlassContainer padding="lg">
                  <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
                    <div>
                      <div className="mb-2 flex items-center gap-3">
                        <div
                          className="rounded-lg border border-white/20 p-2 backdrop-blur-sm"
                          style={{
                            background: "rgba(59, 130, 246, 0.2)",
                            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                          }}
                        >
                          <Shield className="h-6 w-6 text-blue-300" />
                        </div>
                        <h1
                          className="text-3xl font-bold text-white md:text-4xl"
                          style={{
                            background:
                              "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          Admin Dashboard
                        </h1>
                      </div>
                      <p className="text-white/70">
                        Welcome back,{" "}
                        <span className="font-medium text-white">
                          {user?.email}
                        </span>
                      </p>
                      <p className="text-sm text-white/50">
                        Manage events, track RSVPs, and oversee club activities
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="group relative"
                      >
                        <div
                          className="absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-red-400/50"
                          style={{
                            background: "rgba(239, 68, 68, 0.2)",
                            boxShadow: "0 4px 16px rgba(239, 68, 68, 0.1)",
                          }}
                        />
                        <span className="relative z-10 flex items-center px-4 py-2 text-white/80 transition-colors hover:text-white">
                          {isSigningOut ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <LogOut className="mr-2 h-4 w-4" />
                          )}
                          {isSigningOut ? "Signing Out..." : "Sign Out"}
                        </span>
                      </button>
                    </div>
                  </div>
                </GlassContainer>
              </AnimatedSection>

              {/* Stats Cards */}
              <AnimatedSection
                delay={500}
                className={`mb-12 transition-all duration-1000 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      title: "Total Events",
                      value: stats.totalEvents,
                      icon: Calendar,
                      color: "from-blue-500/20 to-blue-600/20",
                      iconColor: "text-blue-400",
                    },
                    {
                      title: "Upcoming Events",
                      value: stats.upcomingEvents,
                      icon: Clock,
                      color: "from-green-500/20 to-green-600/20",
                      iconColor: "text-green-400",
                    },
                    {
                      title: "Active Events",
                      value: stats.ongoingEvents,
                      icon: Users,
                      color: "from-yellow-500/20 to-yellow-600/20",
                      iconColor: "text-yellow-400",
                    },
                    {
                      title: "Total RSVPs",
                      value: stats.totalRSVPs,
                      icon: BarChart3,
                      color: "from-purple-500/20 to-purple-600/20",
                      iconColor: "text-purple-400",
                    },
                  ].map((stat, index) => (
                    <AnimatedSection
                      key={stat.title}
                      delay={700 + index * 100}
                      className="transition-all duration-700 hover:scale-105"
                    >
                      <GlassContainer>
                        <div
                          className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-60 ${stat.color}`}
                        />
                        <div className="relative z-10 p-6">
                          <div className="mb-4 flex items-center justify-between">
                            <stat.icon
                              className={`h-8 w-8 ${stat.iconColor}`}
                            />
                            <div className="text-right">
                              <div className="text-2xl font-bold text-white">
                                {eventsLoading ? "..." : stat.value}
                              </div>
                              <div className="text-sm text-white/70">
                                {stat.title}
                              </div>
                            </div>
                          </div>
                        </div>
                      </GlassContainer>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>

              {/* Quick Actions */}
              <AnimatedSection
                delay={900}
                className={`mb-12 transition-all duration-1000 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <GlassContainer padding="lg">
                  <h2 className="mb-6 text-2xl font-bold text-white">
                    Quick Actions
                  </h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[
                      {
                        title: "Create New Event",
                        description: "Add a new workshop or event",
                        icon: Plus,
                        color: "from-blue-500/30 to-blue-600/30",
                        action: () => navigate("/dashboard/create-event"), // TODO: Implement
                      },
                      {
                        title: "Manage Events",
                        description: "Edit existing events and RSVPs",
                        icon: Settings,
                        color: "from-green-500/30 to-green-600/30",
                        action: () => console.log("Manage events"), // TODO: Implement
                      },
                      {
                        title: "View Analytics",
                        description: "Check event performance and stats",
                        icon: BarChart3,
                        color: "from-purple-500/30 to-purple-600/30",
                        action: () => console.log("View analytics"), // TODO: Implement
                      },
                    ].map((action, index) => (
                      <button
                        key={action.title}
                        onClick={action.action}
                        className="group relative text-left transition-all duration-300 hover:scale-105"
                      >
                        <GlassContainer>
                          <div
                            className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-60 transition-opacity duration-300 group-hover:opacity-80 ${action.color}`}
                          />
                          <div className="relative z-10 p-6">
                            <div className="flex items-start gap-4">
                              <div
                                className="rounded-xl border border-white/20 p-3 backdrop-blur-sm"
                                style={{
                                  background: "rgba(255, 255, 255, 0.1)",
                                  boxShadow:
                                    "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                                }}
                              >
                                <action.icon className="h-6 w-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="mb-2 text-lg font-semibold text-white">
                                  {action.title}
                                </h3>
                                <p className="text-sm text-white/70">
                                  {action.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </GlassContainer>
                      </button>
                    ))}
                  </div>
                </GlassContainer>
              </AnimatedSection>

              {/* Recent Events */}
              <AnimatedSection
                delay={1100}
                className={`transition-all duration-1000 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <GlassContainer padding="lg">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">
                      Recent Events
                    </h2>
                    <button className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">
                      View All Events →
                    </button>
                  </div>

                  {eventsLoading ? (
                    <div className="py-12 text-center">
                      <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-white/60" />
                      <p className="text-white/70">Loading events...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Show recent events from all categories */}
                      {[
                        ...(groupedEvents?.upcoming || []),
                        ...(groupedEvents?.ongoing || []),
                        ...(groupedEvents?.past || []),
                      ]
                        .sort(
                          (a, b) =>
                            new Date(b.created_at).getTime() -
                            new Date(a.created_at).getTime(),
                        )
                        .slice(0, 5)
                        .map((event, index) => (
                          <div
                            key={event.id}
                            className="transition-all duration-300 hover:scale-[1.02]"
                          >
                            <GlassContainer gradientOverlay={false}>
                              <div className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="mb-2 flex items-center gap-3">
                                      <h3 className="font-semibold text-white">
                                        {event.name}
                                      </h3>
                                      <span
                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                          event.status === "upcoming"
                                            ? "bg-blue-500 text-white"
                                            : event.status === "ongoing"
                                              ? "bg-green-500 text-white"
                                              : "bg-gray-500 text-white"
                                        }`}
                                      >
                                        {event.status}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-white/70">
                                      <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                          {new Date(
                                            event.date,
                                          ).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>{event.location}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Users className="h-4 w-4" />
                                        <span>
                                          {event.rsvp_count || 0} RSVPs
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <button className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
                                      <Eye className="h-4 w-4" />
                                    </button>
                                    <button
                                      className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                                      onClick={() =>
                                        navigate(`/dashboard/create-event/${event.id}`)
                                      }
                                    >
                                      <Edit className="h-4 w-4" />
                                    </button>
                                    <button className="rounded-lg p-2 text-white/60 transition-colors hover:bg-red-500/10 hover:text-red-400">
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </GlassContainer>
                          </div>
                        ))}

                      {/* Empty state */}
                      {(!groupedEvents ||
                        (groupedEvents.upcoming?.length || 0) +
                          (groupedEvents.ongoing?.length || 0) +
                          (groupedEvents.past?.length || 0) ===
                          0) && (
                        <div className="py-12 text-center">
                          <Calendar className="mx-auto mb-4 h-12 w-12 text-white/30" />
                          <h3 className="mb-2 text-lg font-semibold text-white/80">
                            No Events Yet
                          </h3>
                          <p className="mb-4 text-white/60">
                            Create your first event to get started
                          </p>
                          <div className="group relative inline-block">
                            <div
                              className="absolute inset-0 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/50"
                              style={{
                                background: "rgba(59, 130, 246, 0.3)",
                                boxShadow: "0 4px 16px rgba(59, 130, 246, 0.2)",
                              }}
                            />
                            <Button
                              onClick={() => console.log("Create first event")} // TODO: Implement
                              className="relative z-10 bg-transparent font-medium text-white transition-all duration-300 group-hover:scale-105 hover:bg-transparent"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Create Your First Event
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </GlassContainer>
              </AnimatedSection>
            </>
          ) : (
            /* Not authenticated - show placeholder */
            <AnimatedSection
              delay={300}
              className={`transition-all duration-1000 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <GlassContainer padding="xl" className="text-center">
                <Shield className="mx-auto mb-6 h-16 w-16 text-white/30" />
                <h2 className="mb-4 text-3xl font-bold text-white">
                  Admin Dashboard
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-white/70">
                  This is a secure area for GDSC UTD officers. Please sign in
                  with your admin credentials to access the dashboard and manage
                  events.
                </p>
                <div className="group relative inline-block">
                  <div
                    className="absolute inset-0 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/50"
                    style={{
                      background: "rgba(59, 130, 246, 0.3)",
                      boxShadow: "0 4px 16px rgba(59, 130, 246, 0.2)",
                    }}
                  />
                  <Button
                    onClick={() => setShowSignInModal(true)}
                    className="relative z-10 bg-transparent px-8 py-3 font-semibold text-white transition-all duration-300 group-hover:scale-105 hover:bg-transparent"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Sign In to Dashboard
                  </Button>
                </div>
              </GlassContainer>
            </AnimatedSection>
          )}
        </div>
      </main>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
      />
    </div>
  );
}
