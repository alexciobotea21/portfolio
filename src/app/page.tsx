import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CustomCursor from "@/components/CustomCursor";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <>
      <CustomCursor />
      <BackgroundOrbs />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
    </>
  );
}
