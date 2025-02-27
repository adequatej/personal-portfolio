import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Particles } from "@/components/effects/Particles";
import { Cursor } from "@/components/effects/Cursor";

export default function Home() {
  return ( 
    <>
      <Cursor />
      <Particles />
      <Navbar />
      <main className="flex flex-col min-h-screen">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
