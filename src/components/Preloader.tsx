"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const dotGridRef = useRef<HTMLDivElement>(null);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      /* ── Phase 0: Initial state — fade in the decorative elements ── */
      gsap.set(
        [
          nameRef.current,
          roleRef.current,
          lineLeftRef.current,
          lineRightRef.current,
          counterRef.current,
          progressBarRef.current,
        ],
        { opacity: 0 }
      );

      gsap.set(nameRef.current, { y: 60, opacity: 0 });
      gsap.set(roleRef.current, { y: 30, opacity: 0 });
      gsap.set([lineLeftRef.current, lineRightRef.current], {
        scaleX: 0,
        opacity: 0,
      });
      gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left" });

      /* ── Floating orbs ambient animation ── */
      gsap.to(orbRef1.current, {
        y: -30,
        x: 20,
        scale: 1.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orbRef2.current, {
        y: 20,
        x: -15,
        scale: 0.85,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      /* ── Dot grid fade in ── */
      gsap.fromTo(
        dotGridRef.current,
        { opacity: 0 },
        { opacity: 0.3, duration: 1, ease: "power2.out" }
      );

      /* ── Phase 1: Counter animation ── */
      const counterObj = { val: 0 };
      tl.to(counterObj, {
        val: 100,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: () => {
          setCounter(Math.round(counterObj.val));
        },
      });

      /* ── Progress bar grows with the counter ── */
      tl.to(
        progressBarRef.current,
        {
          scaleX: 1,
          opacity: 1,
          duration: 2.2,
          ease: "power2.inOut",
        },
        "<"
      );

      /* ── Counter reveal ── */
      tl.to(
        counterRef.current,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );

      /* ── Phase 2: Lines expand from center ── */
      tl.to(
        [lineLeftRef.current, lineRightRef.current],
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.8"
      );

      /* ── Phase 3: Name slides up into view ── */
      tl.to(
        nameRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.4"
      );

      /* ── Phase 4: Role text fades in ── */
      tl.to(
        roleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.2"
      );

      /* ── Phase 5: Hold for a beat ── */
      tl.to({}, { duration: 0.4 });

      /* ── Phase 6: Fade out content ── */
      tl.to(
        [
          nameRef.current,
          roleRef.current,
          lineLeftRef.current,
          lineRightRef.current,
          counterRef.current,
          progressBarRef.current,
          dotGridRef.current,
          orbRef1.current,
          orbRef2.current,
        ],
        {
          opacity: 0,
          y: -20,
          duration: 0.4,
          stagger: 0.03,
          ease: "power2.in",
        }
      );

      /* ── Phase 7: Curtain split reveal ── */
      tl.to(
        curtainTopRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "-=0.1"
      );

      tl.to(
        curtainBottomRef.current,
        {
          yPercent: 100,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "<"
      );
    }, preloaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ isolation: "isolate" }}
    >
      {/* ── Top curtain ── */}
      <div
        ref={curtainTopRef}
        className="absolute top-0 left-0 w-full h-1/2"
        style={{ background: "#000000" }}
      />
      {/* ── Bottom curtain ── */}
      <div
        ref={curtainBottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2"
        style={{ background: "#000000" }}
      />

      {/* ── Content layer (sits on top of curtains) ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* ── Dot grid background ── */}
        <div
          ref={dotGridRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,200,83,0.25) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0,
          }}
        />

        {/* ── Floating orbs ── */}
        <div
          ref={orbRef1}
          className="absolute top-[20%] left-[15%] w-48 h-48 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,200,83,0.25) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          ref={orbRef2}
          className="absolute bottom-[20%] right-[15%] w-36 h-36 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(105,240,174,0.2) 0%, transparent 70%)",
            filter: "blur(35px)",
          }}
        />

        {/* ── Counter ── */}
        <span
          ref={counterRef}
          className="font-dm text-[11px] tracking-[0.5em] uppercase mb-8"
          style={{ color: "#00e676", opacity: 0 }}
        >
          {counter}%
        </span>

        {/* ── Progress bar ── */}
        <div className="w-48 h-px mb-10 relative overflow-hidden rounded-full"
          style={{ background: "rgba(0,200,83,0.15)" }}
        >
          <div
            ref={progressBarRef}
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, #00c853, #00e676, #69f0ae)",
              transformOrigin: "left",
              boxShadow: "0 0 12px rgba(0,200,83,0.5)",
            }}
          />
        </div>

        {/* ── Lines + Name ── */}
        <div className="flex items-center gap-6 mb-4">
          <div
            ref={lineLeftRef}
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to left, #00c853, transparent)",
              transformOrigin: "right",
            }}
          />

          <div ref={nameRef} className="overflow-hidden">
            <h1
              className="font-syne text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #00e676 50%, #00c853 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ashwani Kumar
            </h1>
          </div>

          <div
            ref={lineRightRef}
            className="w-16 h-px"
            style={{
              background:
                "linear-gradient(to right, #00c853, transparent)",
              transformOrigin: "left",
            }}
          />
        </div>

        {/* ── Role ── */}
        <div ref={roleRef}>
          <p
            className="font-dm text-xs sm:text-sm tracking-[0.4em] uppercase"
            style={{ color: "#9e9e9e" }}
          >
            3D Artist · Web Developer
          </p>
        </div>
      </div>
    </div>
  );
}
