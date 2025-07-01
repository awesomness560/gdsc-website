import { Button } from "~/components/ui/button";
import NavBar from "~/components/ui/NavBar";
import SectionConnector from "~/components/SectionConnector";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "GDSC UTD" },
    { name: "description", content: "Welcome to GDSC at UTD" },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="overflow-y-scroll w-full relative bg-black py-28">
      <NavBar />
      {/* Fixed bright letters */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <div className="text-[15rem] sm:text-[20rem] md:text-[25rem] font-extrabold select-none opacity-20">
          <span className="text-gdscred">G</span>
          <span className="text-gdscgreen">D</span>
          <span className="text-gdscblue">S</span>
          <span className="text-gdscyellow">C</span>
        </div>
        {/* Slight blur for depth */}
        <div className="absolute inset-0 backdrop-blur-md"></div>
      </div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 [word-spacing:1vw]">
            Connect. Learn. Network.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-sm sm:max-w-lg md:max-w-2xl mb-6 sm:mb-8">
            Explore tech through guided workshops and industry backed events
          </p>
          <Button arrow={true}>Explore Our Workshops</Button>
          
          {/* Logo */}
          <div className="relative mt-22 w-16 sm:w-18 md:w-20 lg:w-22">
            <img src="images/GDSC_logo.png" alt="GDSC Logo" className="absolute z-10" />
            <img src="images/GDSC_logo.png" alt="GDSC Logo" className="absolute blur-sm" />
          </div>
        </div>

        {/* Connector from Hero to Why Us */}
        <SectionConnector connectorColor="gdscred" />

        {/* Why Us Section - reduced top padding to close gap with hero */}
        <section id="why-us" className="pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-20 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
              Why Choose Us
            </h2>
            <p className="text-center text-gray-300">
              We are the greatest or something
            </p>
          </div>
        </section>

        {/* Connector from Why Us to Contact */}
        <SectionConnector connectorColor="gdscblue" />

        {/* Contact Section - standard padding */}
        <section id="contact" className="py-16 sm:py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
              Get In Touch
            </h2>
            <p className="text-center text-gray-300">
              Ready to join our community?
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}