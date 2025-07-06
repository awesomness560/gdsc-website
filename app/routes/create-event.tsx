import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Image,
  Settings,
  Plus,
  Trash2,
  Link as LinkIcon,
  ChevronDown,
  ArrowLeft,
  Loader2,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  UserPlus,
} from "lucide-react";
import Navbar from "~/components/ui/NavBar";
import GlassContainer from "~/components/ui/GlassContainer";
import AnimatedSection from "~/components/ui/AnimatedSection";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/hooks/useAuth";
import { useCreateEvent, usePeople } from "~/hooks/useCreateEvent";
import type {
  EventFormData,
  CreateEventData,
  EventHost,
  CreateEventLink,
} from "~/types/events";

const LINK_TYPES = [
  {
    value: "resource",
    label: "Resource",
    description: "General learning materials",
  },
  { value: "slide", label: "Slides", description: "Presentation slides" },
  { value: "code", label: "Code", description: "Source code repository" },
  { value: "download", label: "Download", description: "Downloadable files" },
  {
    value: "general",
    label: "General Link",
    description: "Any other type of link",
  },
];

export default function CreateEvent() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("basic");
  const [showHostDropdown, setShowHostDropdown] = useState(false);

  const { user, isAuthenticated, isLoading } = useAuth();
  const { data: people, isLoading: peopleLoading } = usePeople();
  const createEventMutation = useCreateEvent();

  // Form state
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    description: "",
    image_url: "",
    location: "",
    date: "",
    start_time: "",
    end_time: "",
    max_capacity: "50",
    event_type: "workshop", // Fixed to workshop only
    allow_anonymous_rsvp: true,
    rsvp_limit_per_ip: "1",
    hosts: [],
    links: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin");
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const addHost = (personId: string) => {
    const person = people?.find((p) => p.id === personId);
    if (person && !formData.hosts.find((h) => h.person_id === personId)) {
      setFormData((prev) => ({
        ...prev,
        hosts: [...prev.hosts, { person_id: personId, host_role: "Host" }],
      }));
    }
    setShowHostDropdown(false);
  };

  const removeHost = (personId: string) => {
    setFormData((prev) => ({
      ...prev,
      hosts: prev.hosts.filter((h) => h.person_id !== personId),
    }));
  };

  const updateHostRole = (personId: string, role: string) => {
    setFormData((prev) => ({
      ...prev,
      hosts: prev.hosts.map((h) =>
        h.person_id === personId ? { ...h, host_role: role } : h,
      ),
    }));
  };

  const addLink = () => {
    setFormData((prev) => ({
      ...prev,
      links: [
        ...prev.links,
        {
          title: "",
          description: "",
          url: "",
          link_type: "resource" as const,
          show_for_status: ["upcoming", "ongoing"],
        },
      ],
    }));
  };

  const updateLink = (
    index: number,
    field: keyof CreateEventLink,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link,
      ),
    }));
  };

  const removeLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Event name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.start_time) newErrors.start_time = "Start time is required";

    const capacity = parseInt(formData.max_capacity);
    if (isNaN(capacity) || capacity < 1) {
      newErrors.max_capacity = "Capacity must be a positive number";
    }

    const rsvpLimit = parseInt(formData.rsvp_limit_per_ip);
    if (isNaN(rsvpLimit) || rsvpLimit < 1) {
      newErrors.rsvp_limit_per_ip = "RSVP limit must be a positive number";
    }

    // Validate image URL if provided
    if (formData.image_url && !isValidUrl(formData.image_url)) {
      newErrors.image_url = "Please enter a valid URL";
    }

    // Validate links
    formData.links.forEach((link, index) => {
      if (!link.title.trim()) {
        newErrors[`link_${index}_title`] = "Link title is required";
      }
      if (!link.url.trim()) {
        newErrors[`link_${index}_url`] = "Link URL is required";
      } else if (!isValidUrl(link.url)) {
        newErrors[`link_${index}_url`] = "Please enter a valid URL";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const createEventData: CreateEventData = {
      name: formData.name,
      description: formData.description || undefined,
      image_url: formData.image_url || undefined,
      location: formData.location,
      date: formData.date,
      start_time: formData.start_time,
      end_time: formData.end_time || undefined,
      max_capacity: parseInt(formData.max_capacity),
      event_type: formData.event_type,
      allow_anonymous_rsvp: formData.allow_anonymous_rsvp,
      rsvp_limit_per_ip: parseInt(formData.rsvp_limit_per_ip),
      hosts: formData.hosts.length > 0 ? formData.hosts : undefined,
      links: formData.links.length > 0 ? formData.links : undefined,
    };

    try {
      await createEventMutation.mutateAsync(createEventData);
      setShowSuccessMessage(true);

      // Redirect after showing success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  const sections = [
    { id: "basic", label: "Basic Info", icon: Calendar },
    { id: "details", label: "Details", icon: Settings },
    { id: "hosts", label: "Hosts", icon: Users },
    { id: "links", label: "Links", icon: LinkIcon },
  ];

  const getSelectedHosts = () => {
    return formData.hosts.map((host) => {
      const person = people?.find((p) => p.id === host.person_id);
      return { ...host, person };
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="relative min-h-screen overflow-hidden">
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
              <h2 className="mb-2 text-2xl font-bold text-white">Loading...</h2>
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
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <AnimatedSection delay={200}>
            <div className="mb-8">
              <button
                onClick={() => navigate("/admin")}
                className="group mb-4 flex items-center text-white/70 transition-colors hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Dashboard
              </button>

              <div className="flex items-center gap-4">
                <div
                  className="rounded-xl border border-white/20 p-3 backdrop-blur-sm"
                  style={{
                    background: "rgba(59, 130, 246, 0.2)",
                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Plus className="h-6 w-6 text-blue-300" />
                </div>
                <div>
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
                    Create New Workshop
                  </h1>
                  <p className="text-white/70">
                    Set up a new workshop for GDSC UTD members
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Success Message */}
          {showSuccessMessage && (
            <AnimatedSection delay={0} animation="scaleIn">
              <GlassContainer className="mb-6" gradientOverlay={false}>
                <div className="p-6 text-center">
                  <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-400" />
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Workshop Created Successfully!
                  </h3>
                  <p className="text-white/70">
                    Redirecting you back to the dashboard...
                  </p>
                </div>
              </GlassContainer>
            </AnimatedSection>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <AnimatedSection delay={400}>
              <GlassContainer padding="lg">
                {/* Section Navigation */}
                <div className="mb-8 flex flex-wrap gap-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={`group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                        activeSection === section.id
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white/80"
                      }`}
                    >
                      <section.icon className="h-4 w-4" />
                      {section.label}
                    </button>
                  ))}
                </div>

                {/* Basic Info Section */}
                {activeSection === "basic" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white">
                      Basic Information
                    </h3>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                          Workshop Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          placeholder="e.g., React Fundamentals Workshop"
                          className={`w-full rounded-lg border px-4 py-3 text-white transition-colors ${
                            errors.name
                              ? "border-red-400/50 bg-red-500/10"
                              : "border-white/20 bg-white/5 hover:border-white/30 focus:border-blue-400/50"
                          } placeholder-white/50 backdrop-blur-sm focus:ring-0 focus:outline-none`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                          Location *
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) =>
                            handleInputChange("location", e.target.value)
                          }
                          placeholder="e.g., ECSS 2.102"
                          className={`w-full rounded-lg border px-4 py-3 text-white transition-colors ${
                            errors.location
                              ? "border-red-400/50 bg-red-500/10"
                              : "border-white/20 bg-white/5 hover:border-white/30 focus:border-blue-400/50"
                          } placeholder-white/50 backdrop-blur-sm focus:ring-0 focus:outline-none`}
                        />
                        {errors.location && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.location}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                          Date *
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) =>
                            handleInputChange("date", e.target.value)
                          }
                          className={`w-full rounded-lg border px-4 py-3 text-white transition-colors ${
                            errors.date
                              ? "border-red-400/50 bg-red-500/10"
                              : "border-white/20 bg-white/5 hover:border-white/30 focus:border-blue-400/50"
                          } backdrop-blur-sm focus:ring-0 focus:outline-none`}
                        />
                        {errors.date && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.date}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                          Max Capacity *
                        </label>
                        <input
                          type="number"
                          value={formData.max_capacity}
                          onChange={(e) =>
                            handleInputChange("max_capacity", e.target.value)
                          }
                          min="1"
                          placeholder="50"
                          className={`w-full rounded-lg border px-4 py-3 text-white transition-colors ${
                            errors.max_capacity
                              ? "border-red-400/50 bg-red-500/10"
                              : "border-white/20 bg-white/5 hover:border-white/30 focus:border-blue-400/50"
                          } placeholder-white/50 backdrop-blur-sm focus:ring-0 focus:outline-none`}
                        />
                        {errors.max_capacity && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.max_capacity}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                          Start Time *
                        </label>
                        <input
                          type="time"
                          value={formData.start_time}
                          onChange={(e) =>
                            handleInputChange("start_time", e.target.value)
                          }
                          className={`w-full rounded-lg border px-4 py-3 text-white transition-colors ${
                            errors.start_time
                              ? "border-red-400/50 bg-red-500/10"
                              : "border-white/20 bg-white/5 hover:border-white/30 focus:border-blue-400/50"
                          } backdrop-blur-sm focus:ring-0 focus:outline-none`}
                        />
                        {errors.start_time && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.start_time}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={formData.end_time}
                          onChange={(e) =>
                            handleInputChange("end_time", e.target.value)
                          }
                          className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white backdrop-blur-sm transition-colors hover:border-white/30 focus:border-blue-400/50 focus:ring-0 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Details Section */}
                {activeSection === "details" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-white">
                      Workshop Details
                    </h3>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        placeholder="Describe what participants will learn and what to expect..."
                        rows={4}
                        className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors hover:border-white/30 focus:border-blue-400/50 focus:ring-0 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.image_url}
                        onChange={(e) =>
                          handleInputChange("image_url", e.target.value)
                        }
                        placeholder="https://example.com/workshop-image.jpg"
                        className={`w-full rounded-lg border px-4 py-3 text-white transition-colors ${
                          errors.image_url
                            ? "border-red-400/50 bg-red-500/10"
                            : "border-white/20 bg-white/5 hover:border-white/30 focus:border-blue-400/50"
                        } placeholder-white/50 backdrop-blur-sm focus:ring-0 focus:outline-none`}
                      />
                      {errors.image_url && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.image_url}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="mb-3 flex items-center text-sm font-medium text-white">
                          <input
                            type="checkbox"
                            checked={formData.allow_anonymous_rsvp}
                            onChange={(e) =>
                              handleInputChange(
                                "allow_anonymous_rsvp",
                                e.target.checked,
                              )
                            }
                            className="mr-2 h-4 w-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
                          />
                          Allow Anonymous RSVPs
                        </label>
                        <p className="text-sm text-white/60">
                          Allow people to RSVP without signing up for an account
                        </p>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                          RSVP Limit per IP *
                        </label>
                        <input
                          type="number"
                          value={formData.rsvp_limit_per_ip}
                          onChange={(e) =>
                            handleInputChange(
                              "rsvp_limit_per_ip",
                              e.target.value,
                            )
                          }
                          min="1"
                          placeholder="1"
                          className={`w-full rounded-lg border px-4 py-3 text-white transition-colors ${
                            errors.rsvp_limit_per_ip
                              ? "border-red-400/50 bg-red-500/10"
                              : "border-white/20 bg-white/5 hover:border-white/30 focus:border-blue-400/50"
                          } placeholder-white/50 backdrop-blur-sm focus:ring-0 focus:outline-none`}
                        />
                        {errors.rsvp_limit_per_ip && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.rsvp_limit_per_ip}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Hosts Section */}
                {activeSection === "hosts" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">
                        Workshop Hosts
                      </h3>
                      <div className="flex gap-2">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setShowHostDropdown(!showHostDropdown)
                            }
                            className="group relative"
                            disabled={peopleLoading}
                          >
                            <div
                              className="absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/30"
                              style={{
                                background: "rgba(34, 197, 94, 0.2)",
                                boxShadow: "0 4px 16px rgba(34, 197, 94, 0.1)",
                              }}
                            />
                            <span className="relative z-10 flex items-center px-4 py-2 text-white transition-all duration-300 group-hover:scale-105">
                              {peopleLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Users className="mr-2 h-4 w-4" />
                              )}
                              Add Host
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </span>
                          </button>

                          {showHostDropdown && people && (
                            <div
                              className="absolute top-full right-0 z-20 mt-2 w-64 rounded-lg border border-white/20 backdrop-blur-md"
                              style={{
                                background: "rgba(255, 255, 255, 0.04)",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                              }}
                            >
                              <div className="max-h-64 overflow-y-auto p-2">
                                {people
                                  .filter(
                                    (person) =>
                                      !formData.hosts.find(
                                        (h) => h.person_id === person.id,
                                      ),
                                  )
                                  .map((person) => (
                                    <button
                                      key={person.id}
                                      type="button"
                                      onClick={() => addHost(person.id)}
                                      className="w-full rounded-lg p-3 text-left text-white transition-colors hover:bg-white/10"
                                    >
                                      <div className="font-medium">
                                        {person.name}
                                      </div>
                                      <div className="text-sm text-white/60">
                                        {person.role}{" "}
                                        {person.committee &&
                                          `• ${person.committee}`}
                                      </div>
                                    </button>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => navigate("/admin/people/create")}
                          className="group relative"
                        >
                          <div
                            className="absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-blue-400/50"
                            style={{
                              background: "rgba(59, 130, 246, 0.2)",
                              boxShadow: "0 4px 16px rgba(59, 130, 246, 0.1)",
                            }}
                          />
                          <span className="relative z-10 flex items-center px-4 py-2 text-white transition-all duration-300 group-hover:scale-105">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add Person
                          </span>
                        </button>
                      </div>
                    </div>

                    {getSelectedHosts().length > 0 ? (
                      <div className="space-y-3">
                        {getSelectedHosts().map((host) => (
                          <GlassContainer
                            key={host.person_id}
                            gradientOverlay={false}
                          >
                            <div className="flex items-center justify-between p-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                                  {host.person?.image_url ? (
                                    <img
                                      src={host.person.image_url}
                                      alt={host.person.name}
                                      className="h-10 w-10 rounded-full object-cover"
                                    />
                                  ) : (
                                    <Users className="h-5 w-5 text-white/60" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium text-white">
                                    {host.person?.name || "Unknown Person"}
                                  </div>
                                  <div className="text-sm text-white/60">
                                    {host.person?.role}{" "}
                                    {host.person?.committee &&
                                      `• ${host.person.committee}`}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={host.host_role}
                                  onChange={(e) =>
                                    updateHostRole(
                                      host.person_id,
                                      e.target.value,
                                    )
                                  }
                                  placeholder="Host role"
                                  className="w-24 rounded border border-white/20 bg-white/5 px-2 py-1 text-sm text-white placeholder-white/50 focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeHost(host.person_id)}
                                  className="rounded-lg p-2 text-white/60 transition-colors hover:bg-red-500/10 hover:text-red-400"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </GlassContainer>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg border-2 border-dashed border-white/20 p-8 text-center">
                        <Users className="mx-auto mb-4 h-12 w-12 text-white/30" />
                        <h4 className="mb-2 text-lg font-medium text-white/80">
                          No Hosts Added
                        </h4>
                        <p className="text-white/60">
                          Add hosts who will be presenting or helping with this
                          workshop
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Links Section */}
                {activeSection === "links" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">
                        Workshop Resources
                      </h3>
                      <button
                        type="button"
                        onClick={addLink}
                        className="group relative"
                      >
                        <div
                          className="absolute inset-0 rounded-lg border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-green-400/50"
                          style={{
                            background: "rgba(34, 197, 94, 0.2)",
                            boxShadow: "0 4px 16px rgba(34, 197, 94, 0.1)",
                          }}
                        />
                        <span className="relative z-10 flex items-center px-4 py-2 text-white transition-all duration-300 group-hover:scale-105">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Link
                        </span>
                      </button>
                    </div>

                    {formData.links.length > 0 ? (
                      <div className="space-y-4">
                        {formData.links.map((link, index) => (
                          <GlassContainer key={index} gradientOverlay={false}>
                            <div className="p-4">
                              <div className="mb-4 flex items-center justify-between">
                                <h4 className="font-medium text-white">
                                  Resource #{index + 1}
                                </h4>
                                <button
                                  type="button"
                                  onClick={() => removeLink(index)}
                                  className="rounded-lg p-2 text-white/60 transition-colors hover:bg-red-500/10 hover:text-red-400"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>

                              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                  <label className="mb-2 block text-sm font-medium text-white">
                                    Title *
                                  </label>
                                  <input
                                    type="text"
                                    value={link.title}
                                    onChange={(e) =>
                                      updateLink(index, "title", e.target.value)
                                    }
                                    placeholder="e.g., Slides, Code Repository"
                                    className={`w-full rounded-lg border px-3 py-2 text-white transition-colors ${
                                      errors[`link_${index}_title`]
                                        ? "border-red-400/50 bg-red-500/10"
                                        : "border-white/20 bg-white/5 hover:border-white/30 focus:border-blue-400/50"
                                    } placeholder-white/50 backdrop-blur-sm focus:ring-0 focus:outline-none`}
                                  />
                                  {errors[`link_${index}_title`] && (
                                    <p className="mt-1 text-sm text-red-400">
                                      {errors[`link_${index}_title`]}
                                    </p>
                                  )}
                                </div>

                                <div>
                                  <label className="mb-2 block text-sm font-medium text-white">
                                    Type
                                  </label>
                                  <select
                                    value={link.link_type}
                                    onChange={(e) =>
                                      updateLink(
                                        index,
                                        "link_type",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white backdrop-blur-sm transition-colors hover:border-white/30 focus:border-blue-400/50 focus:ring-0 focus:outline-none"
                                  >
                                    {LINK_TYPES.map((type) => (
                                      <option
                                        key={type.value}
                                        value={type.value}
                                        className="bg-gray-800"
                                      >
                                        {type.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="md:col-span-2">
                                  <label className="mb-2 block text-sm font-medium text-white">
                                    URL *
                                  </label>
                                  <input
                                    type="url"
                                    value={link.url}
                                    onChange={(e) =>
                                      updateLink(index, "url", e.target.value)
                                    }
                                    placeholder="https://example.com"
                                    className={`w-full rounded-lg border px-3 py-2 text-white transition-colors ${
                                      errors[`link_${index}_url`]
                                        ? "border-red-400/50 bg-red-500/10"
                                        : "border-white/20 bg-white/5 hover:border-white/30 focus:border-blue-400/50"
                                    } placeholder-white/50 backdrop-blur-sm focus:ring-0 focus:outline-none`}
                                  />
                                  {errors[`link_${index}_url`] && (
                                    <p className="mt-1 text-sm text-red-400">
                                      {errors[`link_${index}_url`]}
                                    </p>
                                  )}
                                </div>

                                <div className="md:col-span-2">
                                  <label className="mb-2 block text-sm font-medium text-white">
                                    Description
                                  </label>
                                  <input
                                    type="text"
                                    value={link.description || ""}
                                    onChange={(e) =>
                                      updateLink(
                                        index,
                                        "description",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Optional description of this resource"
                                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white placeholder-white/50 backdrop-blur-sm transition-colors hover:border-white/30 focus:border-blue-400/50 focus:ring-0 focus:outline-none"
                                  />
                                </div>

                                <div className="md:col-span-2">
                                  <label className="mb-2 block text-sm font-medium text-white">
                                    Show for Status
                                  </label>
                                  <div className="flex gap-4">
                                    {["upcoming", "ongoing", "past"].map(
                                      (status) => (
                                        <label
                                          key={status}
                                          className="flex items-center text-sm text-white"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={link.show_for_status?.includes(
                                              status,
                                            )}
                                            onChange={(e) => {
                                              const currentStatuses =
                                                link.show_for_status || [];
                                              const newStatuses = e.target
                                                .checked
                                                ? [...currentStatuses, status]
                                                : currentStatuses.filter(
                                                    (s) => s !== status,
                                                  );
                                              updateLink(
                                                index,
                                                "show_for_status",
                                                newStatuses,
                                              );
                                            }}
                                            className="mr-2 h-4 w-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
                                          />
                                          {status.charAt(0).toUpperCase() +
                                            status.slice(1)}
                                        </label>
                                      ),
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </GlassContainer>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg border-2 border-dashed border-white/20 p-8 text-center">
                        <LinkIcon className="mx-auto mb-4 h-12 w-12 text-white/30" />
                        <h4 className="mb-2 text-lg font-medium text-white/80">
                          No Resources Added
                        </h4>
                        <p className="text-white/60">
                          Add links to slides, code repositories, or other
                          workshop materials
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Form Actions */}
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <Button
                    type="button"
                    onClick={() => navigate("/admin")}
                    variant="outline"
                    className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>

                  <div className="flex gap-3">
                    {activeSection !== "basic" && (
                      <Button
                        type="button"
                        onClick={() => {
                          const currentIndex = sections.findIndex(
                            (s) => s.id === activeSection,
                          );
                          if (currentIndex > 0) {
                            setActiveSection(sections[currentIndex - 1].id);
                          }
                        }}
                        variant="outline"
                        className="border-white/20 bg-white/5 text-white hover:bg-white/10"
                      >
                        Previous
                      </Button>
                    )}

                    {activeSection !== "links" ? (
                      <Button
                        type="button"
                        onClick={() => {
                          const currentIndex = sections.findIndex(
                            (s) => s.id === activeSection,
                          );
                          if (currentIndex < sections.length - 1) {
                            setActiveSection(sections[currentIndex + 1].id);
                          }
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
                        <span className="relative z-10 bg-transparent font-medium text-white transition-all duration-300 group-hover:scale-105 hover:bg-transparent">
                          Next
                        </span>
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={createEventMutation.isPending}
                        className="group relative"
                      >
                        <div
                          className="absolute inset-0 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/50"
                          style={{
                            background: "rgba(34, 197, 94, 0.3)",
                            boxShadow: "0 4px 16px rgba(34, 197, 94, 0.2)",
                          }}
                        />
                        <span className="relative z-10 flex items-center bg-transparent font-medium text-white transition-all duration-300 group-hover:scale-105 hover:bg-transparent">
                          {createEventMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating Workshop...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Create Workshop
                            </>
                          )}
                        </span>
                      </Button>
                    )}
                  </div>
                </div>
              </GlassContainer>
            </AnimatedSection>
          </form>
        </div>
      </main>
    </div>
  );
}
