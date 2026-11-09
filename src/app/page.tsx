import Hero from "@/components/sections/Hero/Hero";
import Systems from "@/components/sections/Systems/Systems";
import WhiteLabel from "@/components/sections/WhiteLabel/WhiteLabel";
import Studio from "@/components/sections/Studio/Studio";
import Stack from "@/components/sections/Stack/Stack";
import Services from "@/components/sections/Services/Services";
import Contact from "@/components/sections/Contact/Contact";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ClientProviders from "@/components/layout/ClientProviders";
import JsonLd from "@/components/seo/JsonLd";
import {
  organizationLd,
  serviceLd,
  systemsItemListLd,
  websiteLd,
} from "@/lib/seo";

export default function Home() {
  return (
    <ClientProviders>
      <JsonLd
        data={[organizationLd(), websiteLd(), systemsItemListLd(), serviceLd()]}
      />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Systems />
        <WhiteLabel />
        <Studio />
        <Stack />
        <Services />
        <Contact />
      </main>
      <Footer />
    </ClientProviders>
  );
}
