import { useState, useEffect } from "react";
import NavBar from "~/components/ui/NavBar";
import GlassContainer from "~/components/ui/GlassContainer";
import AnimatedSection from "~/components/ui/AnimatedSection";
import {
  Users,
  Code,
  Calendar,
  Globe,
  Heart,
  Target,
  Eye,
  Star,
  TrendingUp,
  UserPlus,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Megaphone,
  Briefcase,
  Laptop,
} from "lucide-react";

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Leadership data structure
  const leadership = {
    president: {
      name: "Sannidhya Tiwari Tiwari",
      role: "President",
      image:
        "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sannidhya_tiwari_tiwari_fZAX1aG.jpg",
      major: "Computer Science",
      year: "Sophomore",
    },
    directors: [
      {
        name: "Sunay Shehaan",
        role: "Technical Co-Director",
        committee: "Technical",
        image:
          "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/sunay_shehaan_vUH6hbC.jpeg",
        major: "Computer Science",
        year: "Sophomore",
      },
      {
        name: "Sharad Rangaraju",
        role: "Technical Co-Director",
        committee: "Technical",
        image: "/images/sharad.png",
        major: "Computer Science",
        year: "Sophomore",
      },
      {
        name: "Frabina Edwin",
        role: "Marketing Director",
        committee: "Marketing",
        image:
          "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/frabina_edwin.jpg",
        major: "Marketing Director",
        year: "Sophomore",
      },
      {
        name: "Ankiita Murali",
        role: "Business Director",
        committee: "Business",
        image:
          "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/ankiita_murali.jpg",
        major: "Business Administration",
        year: "Junior",
      },
    ],
  };

  const officers = {
    technical: [
      {
        name: "Jessica Liu",
        role: "Workshop Coordinator",
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face&auto=format",
        specialties: ["React", "Python", "AI/ML"],
      },
      {
        name: "Ryan Thompson",
        role: "Content Developer",
        image:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=300&h=300&fit=crop&crop=face&auto=format",
        specialties: ["Node.js", "Cloud", "DevOps"],
      },
    ],
    marketing: [
      {
        name: "Priya Patel",
        role: "Social Media Officer",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face&auto=format",
        specialties: ["Content Creation", "Instagram", "Design"],
      },
      {
        name: "Marcus Williams",
        role: "Communications Officer",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face&auto=format",
        specialties: ["Email Marketing", "Events", "Outreach"],
      },
    ],
    business: [
      {
        name: "Amanda Foster",
        role: "Finance Officer",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face&auto=format",
        specialties: ["Budget Management", "Funding", "Analytics"],
      },
      {
        name: "Carlos Mendez",
        role: "Industry Officer",
        image:
          "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face&auto=format",
        specialties: ["Partnerships", "Recruiting", "Networking"],
      },
    ],
  };

  const impactStats = [
    { number: "500+", label: "Students Reached", icon: Users },
    { number: "24", label: "Workshops Hosted", icon: Code },
    { number: "12", label: "Industry Partners", icon: Briefcase },
    { number: "8", label: "Technologies Taught", icon: Laptop },
  ];

  const faqData = [
    {
      question: "What is GDSC UTD?",
      answer:
        "Google Developer Student Clubs (GDSC) UTD is a student-led community that aims to bridge the gap between theory and practice through hands-on workshops, tech talks, and collaborative projects.",
    },
    {
      question: "How can I attend your events?",
      answer:
        "All our workshops and events are open to UTD students! Follow our social media channels and check our events page for upcoming sessions. No prior experience is required for most workshops.",
    },
    {
      question: "Are you currently recruiting officers?",
      answer:
        "We are not actively recruiting new officers at this time. However, we encourage interested students to attend our events and engage with our community. Recruitment typically happens at the beginning of each academic year.",
    },
    {
      question: "What technologies do you teach?",
      answer:
        "We cover a wide range of technologies including web development (React, Node.js), mobile development (Android, Flutter), AI/ML, cloud computing (Google Cloud), and data science.",
    },
  ];

  const committeeIcons = {
    Technical: Laptop,
    Marketing: Megaphone,
    Business: Briefcase,
  };

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
        {/* HERO SECTION */}
        <AnimatedSection delay={300} className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <GlassContainer padding="xl">
              <h1
                className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #ffffff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                About GDSC UTD
              </h1>
              <p className="mx-auto max-w-3xl text-xl text-white/80 sm:text-2xl">
                A passionate team of student leaders driving tech education and
                innovation at UT Dallas
              </p>
            </GlassContainer>
          </div>
        </AnimatedSection>

        {/* WHO WE ARE SECTION */}
        <AnimatedSection delay={600} id="who-we-are" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GlassContainer
              gradientOverlay={false}
              hoverEffect={false}
              padding="lg"
              className="mb-12"
            >
              <div className="text-center">
                <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
                  <Heart className="mr-3 inline-block h-8 w-8 text-red-400" />
                  Who We Are
                </h2>
              </div>
            </GlassContainer>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
              <GlassContainer className="transition-all duration-700 hover:scale-105">
                <div className="p-8 text-center">
                  <Target className="mx-auto mb-4 h-12 w-12 text-blue-400" />
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    Our Mission
                  </h3>
                  <p className="leading-relaxed text-white/80">
                    To empower UTD students with hands-on technology education,
                    foster innovation, and build a strong community of future
                    tech leaders through engaging workshops and events.
                  </p>
                </div>
              </GlassContainer>

              <GlassContainer className="transition-all duration-700 hover:scale-105">
                <div className="p-8 text-center">
                  <Eye className="mx-auto mb-4 h-12 w-12 text-green-400" />
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    Our Vision
                  </h3>
                  <p className="leading-relaxed text-white/80">
                    To be the premier student organization at UTD that bridges
                    the gap between academic learning and real-world technology
                    applications, creating confident developers.
                  </p>
                </div>
              </GlassContainer>
            </div>
          </div>
        </AnimatedSection>

        {/* WHAT WE DO SECTION */}
        <AnimatedSection delay={800} id="what-we-do" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GlassContainer
              gradientOverlay={false}
              hoverEffect={false}
              padding="lg"
              className="mb-12"
            >
              <div className="text-center">
                <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                  <Code className="mr-3 inline-block h-8 w-8 text-blue-400" />
                  What We Do
                </h2>
                <p className="text-xl text-white/70">
                  Hands-on learning experiences for the UTD community
                </p>
              </div>
            </GlassContainer>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: "Technical Workshops",
                  description:
                    "Interactive coding sessions covering web development, AI/ML, mobile apps, and cloud computing",
                  icon: Laptop,
                  color: "from-blue-500/20 to-blue-600/20",
                },
                {
                  title: "Industry Events",
                  description:
                    "Tech talks, networking sessions, and career panels with industry professionals",
                  icon: Calendar,
                  color: "from-green-500/20 to-green-600/20",
                },
                {
                  title: "Community Building",
                  description:
                    "Creating connections between students, fostering collaboration and knowledge sharing",
                  icon: Users,
                  color: "from-yellow-500/20 to-yellow-600/20",
                },
              ].map((item, index) => (
                <AnimatedSection
                  key={item.title}
                  delay={1000 + index * 200}
                  className="transition-all duration-700 hover:scale-105"
                >
                  <GlassContainer>
                    <div
                      className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-60 transition-opacity duration-300 group-hover:opacity-80 ${item.color}`}
                    />
                    <div className="relative z-10 p-6 text-center">
                      <item.icon className="mx-auto mb-4 h-12 w-12 text-white" />
                      <h3 className="mb-3 text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-white/80">{item.description}</p>
                    </div>
                  </GlassContainer>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* OUR IMPACT SECTION */}
        <AnimatedSection delay={1400} id="our-impact" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GlassContainer
              gradientOverlay={false}
              hoverEffect={false}
              padding="lg"
              className="mb-12"
            >
              <div className="text-center">
                <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                  <TrendingUp className="mr-3 inline-block h-8 w-8 text-green-400" />
                  Our Impact
                </h2>
                <p className="text-xl text-white/70">
                  Making a difference in the UTD tech community
                </p>
              </div>
            </GlassContainer>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {impactStats.map((stat, index) => (
                <AnimatedSection
                  key={stat.label}
                  delay={1600 + index * 100}
                  className="transition-all duration-700 hover:scale-105"
                >
                  <GlassContainer>
                    <div className="p-6 text-center">
                      <stat.icon className="mx-auto mb-3 h-8 w-8 text-white/70" />
                      <div className="mb-2 text-3xl font-bold text-white">
                        {stat.number}
                      </div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  </GlassContainer>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* LEADERSHIP TEAM - PRESIDENT & DIRECTORS */}
        <AnimatedSection delay={1800} id="leadership" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GlassContainer
              gradientOverlay={false}
              hoverEffect={false}
              padding="lg"
              className="mb-12"
            >
              <div className="text-center">
                <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                  <Star className="mr-3 inline-block h-8 w-8 text-yellow-400" />
                  Leadership Team
                </h2>
                <p className="text-xl text-white/70">
                  Meet the directors driving our mission forward
                </p>
              </div>
            </GlassContainer>

            {/* President */}
            <div className="mb-12">
              <GlassContainer className="mx-auto max-w-md transition-all duration-700 hover:scale-105">
                <div className="p-8 text-center">
                  <div className="relative mb-6">
                    <img
                      src={leadership.president.image}
                      alt={leadership.president.name}
                      className="mx-auto h-32 w-32 rounded-full border-4 border-white/20 object-cover"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform">
                      <div className="rounded-full bg-yellow-500 px-3 py-1 text-sm font-bold text-black">
                        President
                      </div>
                    </div>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {leadership.president.name}
                  </h3>
                  <p className="mb-1 text-white/70">
                    {leadership.president.major}
                  </p>
                  <p className="text-sm text-white/60">
                    {leadership.president.year}
                  </p>
                </div>
              </GlassContainer>
            </div>

            {/* Group Photo */}
            <div className="mb-16">
              <AnimatedSection
                delay={2000}
                className="transition-all duration-700 hover:scale-105"
              >
                <GlassContainer className="mx-auto max-w-5xl">
                  <div className="p-8">
                    <h3 className="mb-6 text-center text-2xl font-bold text-white">
                      Our Leadership Team
                    </h3>
                    <div className="relative">
                      <img
                        src="/images/Directors.png"
                        alt="GDSC UTD Leadership Team"
                        className="h-64 w-full rounded-2xl object-cover sm:h-80 md:h-96"
                      />
                      {/* Glass overlay on the image for consistency */}
                      <div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(59, 130, 246, 0.05) 33%, rgba(34, 197, 94, 0.05) 66%, rgba(234, 179, 8, 0.05) 100%)",
                        }}
                      />
                    </div>
                    <p className="mt-4 text-center text-white/70 italic">
                      "Together, we're building the future of tech at UTD"
                    </p>
                  </div>
                </GlassContainer>
              </AnimatedSection>
            </div>

            {/* Directors */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {leadership.directors.map((director, index) => {
                const CommitteeIcon =
                  committeeIcons[
                    director.committee as keyof typeof committeeIcons
                  ];
                return (
                  <AnimatedSection
                    key={director.name}
                    delay={2200 + index * 200}
                    className="transition-all duration-700 hover:scale-105"
                  >
                    <GlassContainer>
                      <div className="p-6 text-center">
                        <div className="relative mb-4">
                          <img
                            src={director.image}
                            alt={director.name}
                            className="mx-auto h-24 w-24 rounded-full border-2 border-white/20 object-cover"
                          />
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 transform">
                            <CommitteeIcon className="h-6 w-6 rounded-full bg-blue-500 p-1 text-white" />
                          </div>
                        </div>
                        <h3 className="mb-1 text-lg font-bold text-white">
                          {director.name}
                        </h3>
                        <p className="mb-2 text-sm font-medium text-blue-300">
                          {director.role}
                        </p>
                        <p className="mb-1 text-sm text-white/70">
                          {director.major}
                        </p>
                        <p className="text-xs text-white/60">{director.year}</p>
                      </div>
                    </GlassContainer>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* OFFICERS SECTION */}
        <AnimatedSection delay={2400} id="officers" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GlassContainer
              gradientOverlay={false}
              hoverEffect={false}
              padding="lg"
              className="mb-12"
            >
              <div className="text-center">
                <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                  <Users className="mr-3 inline-block h-8 w-8 text-blue-400" />
                  Our Officers
                </h2>
                <p className="text-xl text-white/70">
                  The dedicated team members making it all happen
                </p>
              </div>
            </GlassContainer>

            {Object.entries(officers).map(
              ([committee, members], committeeIndex) => (
                <div key={committee} className="mb-16">
                  <div className="mb-8">
                    <GlassContainer
                      gradientOverlay={false}
                      padding="md"
                      className="mx-auto max-w-md"
                    >
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-white capitalize">
                          {committee === "technical"
                            ? "Technical Committee"
                            : committee === "marketing"
                              ? "Marketing Committee"
                              : "Business Committee"}
                        </h3>
                      </div>
                    </GlassContainer>
                  </div>

                  <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
                    {members.map((officer, index) => (
                      <AnimatedSection
                        key={officer.name}
                        delay={2600 + committeeIndex * 400 + index * 200}
                        className="transition-all duration-700 hover:scale-105"
                      >
                        <GlassContainer>
                          <div className="p-6">
                            <div className="flex items-start space-x-4">
                              <img
                                src={officer.image}
                                alt={officer.name}
                                className="h-16 w-16 flex-shrink-0 rounded-full border-2 border-white/20 object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="mb-1 text-lg font-bold text-white">
                                  {officer.name}
                                </h4>
                                <p className="mb-3 text-sm font-medium text-green-300">
                                  {officer.role}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {officer.specialties.map((specialty, i) => (
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
                </div>
              ),
            )}
          </div>
        </AnimatedSection>

        {/* JOIN OUR TEAM SECTION */}
        <AnimatedSection delay={3000} id="join-team" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GlassContainer
              className="mx-auto max-w-4xl text-center"
              padding="xl"
            >
              <UserPlus className="mx-auto mb-6 h-16 w-16 text-white/60" />
              <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
                Interested in Joining Our Team?
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-xl text-white/80">
                We're not currently recruiting new officers, but we encourage
                you to attend our events and connect with our community. Follow
                us for future opportunities!
              </p>
              <p className="text-white/70">
                Officer recruitment typically opens at the beginning of each
                academic year.
              </p>
            </GlassContainer>
          </div>
        </AnimatedSection>

        {/* FAQ SECTION */}
        <AnimatedSection delay={3200} id="faq" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <GlassContainer
              gradientOverlay={false}
              hoverEffect={false}
              padding="lg"
              className="mb-12"
            >
              <div className="text-center">
                <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                  <HelpCircle className="mr-3 inline-block h-8 w-8 text-purple-400" />
                  Frequently Asked Questions
                </h2>
              </div>
            </GlassContainer>

            <div className="mx-auto max-w-4xl space-y-4">
              {faqData.map((faq, index) => (
                <GlassContainer
                  key={index}
                  className="transition-all duration-300 hover:scale-[1.02]"
                  hoverEffect={false}
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <h3 className="pr-4 text-lg font-semibold text-white">
                      {faq.question}
                    </h3>
                    {openFAQ === index ? (
                      <ChevronUp className="h-5 w-5 flex-shrink-0 text-white/70" />
                    ) : (
                      <ChevronDown className="h-5 w-5 flex-shrink-0 text-white/70" />
                    )}
                  </button>

                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="leading-relaxed text-white/80">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </GlassContainer>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
}
