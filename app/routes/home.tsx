import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import NavBar from "~/components/ui/NavBar";
import SectionConnector from "~/components/SectionConnector";
import GlassContainer from "~/components/ui/GlassContainer";
import AnimatedSection from "~/components/ui/AnimatedSection";
import {
  ArrowRight,
  Users,
  Code,
  Calendar,
  Globe,
  Heart,
  Award,
} from "lucide-react";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GDSC UTD" },
    { name: "description", content: "Welcome to GDSC at UTD" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Data for Why Choose Us section - easy to modify
  const whyChooseFeatures = [
    {
      icon: Code,
      title: "Hands-on Workshops",
      description:
        "Learn cutting-edge technologies through practical, guided sessions led by industry experts",
      color: "from-red-500/20 to-red-600/20",
    },
    {
      icon: Users,
      title: "Vibrant Community",
      description:
        "Connect with like-minded developers and build lasting professional relationships",
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      icon: Calendar,
      title: "Industry Events",
      description:
        "Attend exclusive talks, hackathons, and networking events with tech leaders",
      color: "from-green-500/20 to-green-600/20",
    },
    {
      icon: Globe,
      title: "Global Network",
      description:
        "Join a worldwide community of Google Developer Student Clubs across universities",
      color: "from-yellow-500/20 to-yellow-600/20",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 -z-20">
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
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "linear-gradient(45deg, rgba(239, 68, 68, 0.15) 0%, rgba(59, 130, 246, 0.15) 25%, rgba(34, 197, 94, 0.15) 50%, rgba(234, 179, 8, 0.15) 75%, rgba(239, 68, 68, 0.15) 100%)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 25s ease infinite",
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

      <NavBar />

      <div className="relative z-10">
        {/* HERO SECTION */}
        <AnimatedSection
          delay={300}
          className="flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center sm:px-6 lg:px-8"
        >
          <GlassContainer className="mx-auto max-w-4xl" padding="lg">
            <h1
              className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 30px rgba(255, 255, 255, 0.2)",
                wordSpacing: "0.2em",
              }}
            >
              Connect. Learn. Network.
            </h1>

            <p
              className="mx-auto mb-8 max-w-3xl text-lg text-white/80 sm:text-xl md:text-2xl"
              style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)" }}
            >
              Explore tech through guided workshops and industry backed events.
              Join UTD's premier developer community.
            </p>

            {/* Explore Workshops Button */}
            <div className="group relative inline-block">
              <div
                className="absolute inset-0 rounded-xl border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/50"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(34, 197, 94, 0.3) 100%)",
                  boxShadow:
                    "0 8px 24px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                }}
              />
              <Button
                className="relative z-10 bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all duration-300 group-hover:scale-105 hover:bg-transparent hover:text-white"
                arrow={true}
                onClick={() => navigate("/events")}
              >
                Explore Our Workshops
              </Button>
            </div>
          </GlassContainer>

          {/* Logo */}
          <div className="group relative mt-16 w-20 sm:w-24 md:w-28 lg:w-32">
            <GlassContainer rounded="full" hoverEffect={false} padding="md">
              <img
                src="images/GDSC_logo.png"
                alt="GDSC Logo"
                className="w-full transition-transform duration-300 group-hover:scale-105"
              />
            </GlassContainer>
          </div>
        </AnimatedSection>

        <SectionConnector connectorColor="gdscred" />

        {/* WHY CHOOSE US SECTION */}
        <AnimatedSection delay={600} id="why-us" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <GlassContainer
              gradientOverlay={false}
              hoverEffect={false}
              padding="lg"
              className="mb-12"
            >
              <div className="text-center">
                <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                  <Award className="mr-3 inline-block h-8 w-8 text-yellow-400" />
                  Why Choose GDSC UTD
                </h2>
                <p className="text-xl text-white/70">
                  Join a community that empowers you to grow as a developer and
                  leader
                </p>
              </div>
            </GlassContainer>

            {/* Feature Cards */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
              {whyChooseFeatures.map((feature, index) => (
                <AnimatedSection
                  key={feature.title}
                  delay={800 + index * 200}
                  className="transition-all duration-700 hover:scale-105"
                >
                  <GlassContainer>
                    {/* Feature color gradient overlay */}
                    <div
                      className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-60 transition-opacity duration-300 group-hover:opacity-80 ${feature.color}`}
                    />

                    <div className="relative z-10 p-8">
                      <div className="flex items-start space-x-4">
                        <div
                          className="flex-shrink-0 rounded-xl border border-white/20 p-3 backdrop-blur-sm"
                          style={{
                            background: "rgba(255, 255, 255, 0.1)",
                            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                          }}
                        >
                          <feature.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-3 text-xl font-bold text-white">
                            {feature.title}
                          </h3>
                          <p className="leading-relaxed text-white/80">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlassContainer>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <SectionConnector connectorColor="gdscblue" />

        {/* CONTACT SECTION */}
        <AnimatedSection delay={1400} id="contact" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GlassContainer
              className="mx-auto max-w-4xl text-center"
              padding="xl"
            >
              <Heart className="mx-auto mb-6 h-16 w-16 text-white/60" />
              <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
                Ready to Join Our Community?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-white/80">
                Connect with passionate developers, learn cutting-edge
                technologies, and build the future together at GDSC UTD.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="group relative">
                  <div
                    className="absolute inset-0 rounded-xl border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/50"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)",
                      boxShadow:
                        "0 8px 24px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                    }}
                  />
                  <a
                    href="https://linktr.ee/dscutd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 group-hover:scale-105 hover:text-white"
                  >
                    Join Our Community
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>

                <div className="group relative">
                  <div
                    className="absolute inset-0 rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/40"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      boxShadow:
                        "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  />
                  <a
                    href="/events"
                    className="relative z-10 inline-flex items-center px-8 py-4 text-lg font-semibold text-white/90 transition-all duration-300 group-hover:scale-105 hover:text-white"
                  >
                    View Events
                  </a>
                </div>
              </div>
            </GlassContainer>
          </div>
        </AnimatedSection>

        {/* 
        ========================================
        ADD NEW SECTIONS HERE
        ========================================
        
        Template for new sections:
        
        <SectionConnector connectorColor="gdscgreen" />
        
        <AnimatedSection delay={NEXT_DELAY} id="section-id" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GlassContainer gradientOverlay={false} hoverEffect={false} padding="lg" className="mb-12">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                  <Icon className="inline-block mr-3 h-8 w-8 text-color-400" />
                  Section Title
                </h2>
                <p className="text-xl text-white/70">
                  Section description
                </p>
              </div>
            </GlassContainer>
            
            // Section content here
            
          </div>
        </AnimatedSection>
        
        ========================================
        */}
      </div>
    </div>
  );
}
