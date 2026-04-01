"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const words = ["Design", "Create", "Inspire"];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [counter, setCounter] = useState(0);
  const [word, setWord] = useState(words[0]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const elementsToFadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Text cycler
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % words.length;

      // Animate out current word
      gsap.to(wordRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setWord(words[idx]);
          // Animate in new word
          gsap.fromTo(
            wordRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
          );
        },
      });
    }, 1100);

    // 2. Main timeline for loading & exit
    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(interval);
        onComplete();
      },
    });

    const obj = { val: 0 };
    tl.to(obj, {
      val: 100,
      duration: 3.2,
      ease: "power1.inOut",
      onUpdate: () => {
        setCounter(Math.round(obj.val));
      },
    });

    // Fade out text elements first
    tl.to(
      elementsToFadeRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "+=0.2" // Slight pause at 100 before fading
    );

    // Finally slide the whole black wrapper up
    tl.to(wrapperRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
    });

    return () => {
      clearInterval(interval);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] text-white pointer-events-none"
    >
      <div ref={elementsToFadeRef} className="absolute inset-0">
        
        {/* ── Top Left Portfolio ── */}
        <div className="absolute top-8 left-8 sm:top-10 sm:left-10">
          <span className="font-dm text-[10px] tracking-[0.4em] text-neutral-500 uppercase">
            Portfolio
          </span>
        </div>

        {/* ── Center Word ── */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            ref={wordRef}
            className="font-serif italic tracking-wide font-light text-neutral-200"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            {word}
          </h1>
        </div>

        {/* ── Bottom Right Percentage ── */}
        <div className="absolute bottom-4 right-6 sm:bottom-8 sm:right-10 overflow-hidden">
          <span
            className="font-serif font-light text-neutral-200 tracking-tighter block"
            style={{ fontSize: "clamp(4.5rem, 12vw, 9rem)", lineHeight: 0.85 }}
          >
            {counter.toString().padStart(3, "0")}
          </span>
        </div>
        
      </div>
    </div>
  );
}
