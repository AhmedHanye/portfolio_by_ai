import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { ClientOnly } from "./components/ClientOnly";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <Experience />
        <ClientOnly>
          <Projects />
        </ClientOnly>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
