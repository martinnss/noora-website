import SmoothScroll from "./components/SmoothScroll";
import CursorGlow from "./components/CursorGlow";
import ParticleField from "./components/ParticleField";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import BentoFeatures from "./components/BentoFeatures";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Portal from "./components/Portal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <CursorGlow />
      <ParticleField />
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <Marquee />
        <BentoFeatures />
        <HowItWorks />
        <Testimonials />
        <Portal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
