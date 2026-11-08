import { About } from "@/components/sections/About";
import { Activities } from "@/components/sections/Activities";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Activities />
      <Contact />
    </main>
  );
}
