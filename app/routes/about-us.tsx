import { useState, useEffect } from "react";
import NavBar from "~/components/ui/NavBar";
import GlassContainer from "~/components/ui/GlassContainer";
import AnimatedSection from "~/components/ui/AnimatedSection";
import PersonCard from "~/components/ui/PersonCard";
import ImpactStat from "~/components/ui/ImpactStat";
import SectionHeader from "~/components/ui/SectionHeader";
import {
  Users,
  Code,
  Calendar,
  Globe,
  Heart,
  Target,
  Star,
  TrendingUp,
  UserPlus,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Megaphone,
  Briefcase,
  Laptop,
  Settings,
  Award,
  BookOpen,
  Coffee,
} from "lucide-react";

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Leadership data structure with Administrative Director added
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
      {
        name: "Meet Shah",
        role: "Administrative Director",
        committee: "Administrative",
        image:
          "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/meet_shah.jpeg",
        major: "Information Systems",
        year: "Junior",
      },
    ],
  };

  const officers = {
    technical: [
      {
        name: "Put name here",
        role: "Workshop Coordinator",
        image: "",
        specialties: ["React", "Python", "AI/ML"],
      },
      {
        name: "Put name here",
        role: "Workshop Coordinator",
        image: "",
        specialties: ["Node.js", "Cloud", "DevOps"],
      },
    ],
    marketing: [
      {
        name: "Put name here",
        role: "Marketing Officer",
        image: "",
        specialties: ["Content Creation", "Instagram", "Design"],
      },
      {
        name: "Put name here",
        role: "Marketing Officer",
        image: "",
        specialties: ["Email Marketing", "Events", "Outreach"],
      },
    ],
    business: [
      {
        name: "Put name here",
        role: "Finance Officer",
        image: "",
        specialties: ["Budget Management", "Funding", "Analytics"],
      },
      {
        name: "Put name here",
        role: "Industry Officer",
        image: "",
        specialties: ["Partnerships", "Recruiting", "Networking"],
      },
    ],
  };

  // Flexible impact stats - easy to add/remove
  const impactStats = [
    { number: "500+", label: "Students Reached", icon: Users },
    { number: "24", label: "Workshops Hosted", icon: Code },
    { number: "12", label: "Industry Partners", icon: Briefcase },
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
    Administrative: Settings,
  };

  const whatWeDoItems = [
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
  ];

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
            <SectionHeader
              title="Who We Are"
              subtitle="Empowering the next generation of tech leaders"
              icon={Heart}
              iconColor="text-red-400"
            />

            <div className="mx-auto max-w-4xl">
              <GlassContainer className="transition-all duration-700 hover:scale-105">
                <div className="p-8 text-center">
                  <Target className="mx-auto mb-6 h-16 w-16 text-blue-400" />
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    Our Mission
                  </h3>
                  <p className="text-lg leading-relaxed text-white/80">
                    {/* This paragraph is AI generated. Someone please make it better */}
                    To empower UTD students with hands-on technology education,
                    foster innovation, and build a strong community of future
                    tech leaders. We bridge the gap between academic learning
                    and real-world technology applications through engaging
                    workshops, industry events, and collaborative projects that
                    create confident developers ready to shape the future.
                  </p>
                </div>
              </GlassContainer>
            </div>
          </div>
        </AnimatedSection>

        {/* WHAT WE DO SECTION */}
        <AnimatedSection delay={800} id="what-we-do" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="What We Do"
              subtitle="Hands-on learning experiences for the UTD community"
              icon={Code}
              iconColor="text-blue-400"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {whatWeDoItems.map((item, index) => (
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

        {/* OUR IMPACT SECTION - Responsive Grid */}
        <AnimatedSection delay={1400} id="our-impact" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Our Impact"
              subtitle="Making a difference in the UTD tech community"
              icon={TrendingUp}
              iconColor="text-green-400"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {impactStats.map((stat, index) => (
                <ImpactStat
                  key={stat.label}
                  number={stat.number}
                  label={stat.label}
                  icon={stat.icon}
                  delay={1600 + index * 100}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* LEADERSHIP TEAM */}
        <AnimatedSection delay={1800} id="leadership" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Leadership Team"
              subtitle="Meet the directors driving our mission forward"
              icon={Star}
              iconColor="text-yellow-400"
            />

            {/* President */}
            <div className="mb-12">
              <AnimatedSection delay={1900} className="mx-auto max-w-md">
                <PersonCard {...leadership.president} isPresident={true} />
              </AnimatedSection>
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
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop&auto=format"
                        alt="GDSC UTD Leadership Team"
                        className="h-64 w-full rounded-2xl object-cover sm:h-80 md:h-96"
                      />
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

            {/* Directors - Updated to accommodate 5 directors */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {leadership.directors.map((director, index) => {
                const CommitteeIcon =
                  committeeIcons[
                    director.committee as keyof typeof committeeIcons
                  ];
                return (
                  <AnimatedSection
                    key={director.name}
                    delay={2200 + index * 200}
                  >
                    <PersonCard {...director} CommitteeIcon={CommitteeIcon} />
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* OFFICERS SECTION */}
        <AnimatedSection delay={2400} id="officers" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Our Officers"
              subtitle="The dedicated team members making it all happen"
              icon={Users}
              iconColor="text-blue-400"
            />

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
            <SectionHeader
              title="Frequently Asked Questions"
              icon={HelpCircle}
              iconColor="text-purple-400"
            />

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
