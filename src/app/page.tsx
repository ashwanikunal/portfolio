"use client";

import { useState, useCallback } from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <ThemeProvider>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.3s ease-out",
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Projects />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

