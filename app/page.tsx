import SmoothScroll from "./components/SmoothScroll";
import ScrollVelocity from "./components/ScrollVelocity";
import CursorGlow from "./components/CursorGlow";
import ParticleField from "./components/ParticleField";
import VoidObjects from "./components/VoidObjects";
import FilmGrain from "./components/FilmGrain";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CurtainRise from "./components/CurtainRise";
import Marquee from "./components/Marquee";
import BentoFeatures from "./components/BentoFeatures";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Portal from "./components/Portal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollVelocity />
      <CursorGlow />
      <VoidObjects />
      <ParticleField />
      <FilmGrain />
      <Navbar />
      {/* <ThemeToggle /> */}

      {/* Hero - normal scroll flow */}
      <Hero />

      {/* Main content with subtle curtain rise */}
      <CurtainRise>
        <main className="relative z-[2] bg-canvas">
          <Marquee />
          <BentoFeatures />
          <HowItWorks />
          <Testimonials />
          <Portal />
          <Contact />
        </main>
        <Footer />
      </CurtainRise>
    </>
  );
}
