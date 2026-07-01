import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ScrollProgressBar from "@/components/motion/ScrollProgressBar";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <ScrollProgressBar />
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
