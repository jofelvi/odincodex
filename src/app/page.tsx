import Hero from "@/components/sections/Hero/Hero";
import Services from "@/components/sections/Services/Services";
import Work from "@/components/sections/Work/Work";
import About from "@/components/sections/About/About";
import AIAutomations from "@/components/sections/AIAutomations/AIAutomations";
import TechStack from "@/components/sections/TechStack/TechStack";
import Contact from "@/components/sections/Contact/Contact";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ClientProviders from "@/components/layout/ClientProviders";
import ParallaxBlobs from "@/components/layout/ParallaxBlobs";

export default function Home() {
  return (
    <ClientProviders>
      <ParallaxBlobs />
      <Navbar />
      <main style={{ width: "100%", position: "relative", zIndex: 1 }}>
        <Hero />
        <Services />
        <Work />
        <About />
        <AIAutomations />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </ClientProviders>
  );
}
