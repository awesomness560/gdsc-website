import { useState, useEffect } from "react";
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
} from "lucide-react";

// Mock data - replace with actual data fetching
const mockWorkshopData = {
  id: "1",
  name: "AI Meets GameDev: Escape the Talking Door",
  image:
    "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_8Njufbn",
  location: "ECSS 2.415",
  date: "April 15, 2025",
  time: "7:00 - 8:00 PM",
  rsvpCount: 32,
  status: "past" as "upcoming" | "ongoing" | "past",
  description: `Step into a one-of-a-kind AI-powered escape room, where the only way out is to convince the door to let you leave! 

👀 Build an interactive escape room in Godot Game Engine, where you must convince an AI-powered door to set you free
💬 Use the Gemini API to power real-time conversations, with the door responding via JSON logic
🧠 Perfect for both AI enthusiasts and game dev beginners

 No installations needed — full code template and step-by-step walkthrough provided!`,
  hosts: [
    {
      name: "Sharad Rangaraju",
      role: "Technical Co-Director",
      image: "/images/sharad.png",
      specialties: ["React", "Next.js", "TypeScript"],
    },
  ],
  // These only show for ongoing/past events
  importantLinks: [
    {
      title: "Godot Download",
      description: "Link to download Godot Engine for your platform",
      url: "#",
      icon: Download,
    },
    {
      title: "Project Starter Template",
      description: "Pre-configured Godot project template",
      url: "#",
      icon: FileText,
    },
    {
      title: "Godot Documentation",
      description: "Additional learning materials and documentation",
      url: "#",
      icon: ExternalLink,
    },
  ],
  // These only show for past events
  slides: "https://slides.example.com/react-nextjs-workshop",
  solutionCode: "https://github.com/gdsc-utd/react-workshop-solution",
};

export default function EventDetails() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRSVPed, setIsRSVPed] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
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

  const StatusIcon = getStatusIcon(mockWorkshopData.status);

  const handleRSVP = () => {
    setIsRSVPed(!isRSVPed);
    // Here you would typically make an API call to handle RSVP
  };

  const showAdditionalContent =
    mockWorkshopData.status === "ongoing" || mockWorkshopData.status === "past";
  const showPastContent = mockWorkshopData.status === "past";

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
            <button className="group relative">
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
                      src={mockWorkshopData.image}
                      alt={mockWorkshopData.name}
                      className="h-64 w-full rounded-2xl object-cover sm:h-80"
                    />
                    {/* Status badge overlay */}
                    <div className="absolute top-4 left-4">
                      <div
                        className={`flex items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(mockWorkshopData.status)}`}
                      >
                        <StatusIcon className="mr-2 h-4 w-4" />
                        {mockWorkshopData.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Info */}
                <div className="space-y-6">
                  <div>
                    <h1 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                      {mockWorkshopData.name}
                    </h1>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-4">
                    <div className="flex items-center text-white/80">
                      <Calendar className="mr-3 h-5 w-5 text-blue-400" />
                      <span>{mockWorkshopData.date}</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <Clock className="mr-3 h-5 w-5 text-green-400" />
                      <span>{mockWorkshopData.time}</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <MapPin className="mr-3 h-5 w-5 text-red-400" />
                      <span>{mockWorkshopData.location}</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <Users className="mr-3 h-5 w-5 text-yellow-400" />
                      <span>{mockWorkshopData.rsvpCount} RSVPed</span>
                    </div>
                  </div>

                  {/* RSVP Button - Only show for upcoming events */}
                  {mockWorkshopData.status === "upcoming" && (
                    <div className="pt-4">
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
                          className="relative z-10 w-full bg-transparent py-3 font-semibold text-white transition-all duration-300 group-hover:scale-105 hover:bg-transparent hover:text-white"
                        >
                          {isRSVPed ? (
                            <>
                              <CheckCircle className="mr-2 h-5 w-5" />
                              RSVP'd - Click to Cancel
                            </>
                          ) : (
                            <>
                              <Users className="mr-2 h-5 w-5" />
                              RSVP for Workshop
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </GlassContainer>
          </div>
        </AnimatedSection>

        {/* About the Workshop */}
        <AnimatedSection delay={600} className="mb-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <GlassContainer padding="lg">
              <h2 className="mb-6 text-2xl font-bold text-white">
                About the Workshop
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="leading-relaxed whitespace-pre-line text-white/80">
                  {mockWorkshopData.description}
                </p>
              </div>
            </GlassContainer>
          </div>
        </AnimatedSection>

        {/* Workshop Hosts */}
        <AnimatedSection delay={800} className="mb-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <GlassContainer padding="lg">
              <h2 className="mb-6 text-2xl font-bold text-white">
                <User className="mr-3 inline-block h-6 w-6 text-blue-400" />
                Workshop Hosts
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {mockWorkshopData.hosts.map((host, index) => (
                  <AnimatedSection
                    key={host.name}
                    delay={1000 + index * 200}
                    className="transition-all duration-700 hover:scale-105"
                  >
                    <GlassContainer>
                      <div className="p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={host.image}
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

        {/* Important Links - Only show for ongoing/past events */}
        {showAdditionalContent && (
          <AnimatedSection delay={1200} className="mb-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <GlassContainer padding="lg">
                <h2 className="mb-6 text-2xl font-bold text-white">
                  <Download className="mr-3 inline-block h-6 w-6 text-green-400" />
                  Important Links & Resources
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockWorkshopData.importantLinks.map((link, index) => (
                    <AnimatedSection
                      key={link.title}
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
                            <link.icon className="mt-1 h-5 w-5 flex-shrink-0 text-white/70" />
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
        {showPastContent && (
          <AnimatedSection delay={1600} className="mb-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <GlassContainer padding="lg">
                <h2 className="mb-6 text-2xl font-bold text-white">
                  <FileText className="mr-3 inline-block h-6 w-6 text-purple-400" />
                  Workshop Materials
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Slides */}
                  <AnimatedSection
                    delay={1800}
                    className="transition-all duration-700 hover:scale-105"
                  >
                    <GlassContainer>
                      <a
                        href={mockWorkshopData.slides}
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
                              Workshop Slides
                            </h3>
                            <p className="text-sm text-white/60">
                              Complete presentation with all concepts covered
                            </p>
                          </div>
                          <ExternalLink className="h-5 w-5 text-white/50 transition-colors group-hover:text-white/80" />
                        </div>
                      </a>
                    </GlassContainer>
                  </AnimatedSection>

                  {/* Solution Code */}
                  <AnimatedSection
                    delay={2000}
                    className="transition-all duration-700 hover:scale-105"
                  >
                    <GlassContainer>
                      <a
                        href={mockWorkshopData.solutionCode}
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
                              Solution Code
                            </h3>
                            <p className="text-sm text-white/60">
                              Complete project code and solutions on GitHub
                            </p>
                          </div>
                          <ExternalLink className="h-5 w-5 text-white/50 transition-colors group-hover:text-white/80" />
                        </div>
                      </a>
                    </GlassContainer>
                  </AnimatedSection>
                </div>
              </GlassContainer>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
