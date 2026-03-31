
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: "1.5+", label: "Years Experience" },
    { value: "10+", label: "Projects Completed" },
    { value: "5+", label: "Happy Clients" },
];

export default function About() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const bigTextSectionRef = useRef<HTMLDivElement>(null);
    const contentPanelRef = useRef<HTMLDivElement>(null);
    const contentInnerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const bigTextSection = bigTextSectionRef.current;
        const contentPanel = contentPanelRef.current;
        const contentInner = contentInnerRef.current;
        if (!wrapper || !bigTextSection || !contentPanel || !contentInner) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top top",
                    end: "+=300%", // Slows down the scroll by taking 3 full screens
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            // 1. Smooth scale-in and slide-up for the content panel
            tl.fromTo(
                contentPanel,
                { y: "110vh", scale: 0.95, borderRadius: "60px 60px 0 0" },
                {
                    y: "0%",
                    scale: 1,
                    borderRadius: "40px 40px 0 0",
                    ease: "power2.out",
                    duration: 0.8,
                },
                0.1 // starts shortly after scrolling begins
            );

            // 2. Animate content items staggering in as the panel moves up
            const items = contentInner.querySelectorAll(".about-reveal");
            tl.fromTo(
                items,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    ease: "power3.out",
                    duration: 0.4,
                },
                0.3 // starts as the panel reaches the middle of the screen
            );
        }, wrapper);

        return () => ctx.revert();
    }, []);

    return (
        // The wrapper dictates the height that will be pinned
        <div id="about" ref={wrapperRef} className="relative w-full h-screen" style={{ background: "var(--bg-primary)" }}>

            {/* ━━━ SECTION 1: Big static "ABOUT ME" text ━━━ */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <section
                    ref={bigTextSectionRef}
                    className="relative w-full h-full flex items-center justify-center"
                >
                    {/* Ambient glow */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(0,200,83,0.06) 0%, transparent 70%)",
                            filter: "blur(80px)",
                        }}
                    />

                    {/* Grid overlay for texture */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-30"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(0,200,83,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,83,0.03) 1px, transparent 1px)",
                            backgroundSize: "80px 80px",
                        }}
                    />

                    {/* Big text */}
                    <div className="relative z-10 text-center select-none px-4">
                        <h2
                            className="font-syne font-black uppercase leading-[0.85]"
                            style={{
                                fontSize: "clamp(5rem, 18vw, 18rem)",
                                background:
                                    "linear-gradient(135deg, #00c853 0%, #00e676 40%, #b9f6ca 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                letterSpacing: "-0.04em",
                            }}
                        >
                            About
                            <br />
                            Me
                        </h2>
                        {/* Decorative line */}
                        <div
                            className="mx-auto mt-8"
                            style={{
                                width: "100px",
                                height: "3px",
                                background:
                                    "linear-gradient(90deg, transparent, #00c853, transparent)",
                                borderRadius: "2px",
                            }}
                        />
                        {/* Scroll hint */}
                        <p
                            className="mt-6 text-xs uppercase tracking-[0.3em] font-medium"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Scroll to discover
                        </p>
                    </div>
                </section>
            </div>

            {/* ━━━ SECTION 2: Content panel that slides over the big text ━━━ */}
            <section
                ref={contentPanelRef}
                className="absolute inset-x-0 top-0 overflow-hidden min-h-screen"
                style={{
                    zIndex: 10,
                    background: "var(--bg-secondary)",
                    borderRadius: "40px 40px 0 0",
                    boxShadow: "0 -40px 80px rgba(0,0,0,0.6)",
                    transform: "translateY(110vh) scale(0.95)" // Initial safe state before GSAP hooks in
                }}
            >
                {/* Top edge glow line */}
                <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 10%, rgba(0,200,83,0.35) 50%, transparent 90%)",
                        borderRadius: "40px 40px 0 0",
                    }}
                />

                <div className="noise-overlay absolute inset-0 pointer-events-none rounded-t-[40px]" />

                {/* Background glow */}
                <div
                    className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
                    style={{
                        background: "radial-gradient(circle, #00c853, transparent)",
                    }}
                />

                <div ref={contentInnerRef} className="relative z-10 px-6 py-24 md:py-32">
                    <div className="mx-auto max-w-6xl">
                        {/* Section label */}
                        <p
                            className="about-reveal mb-2 text-sm font-semibold uppercase tracking-widest"
                            style={{ color: "var(--accent-cyan)" }}
                        >
                            About Me
                        </p>

                        <h2 className="about-reveal font-syne mb-14 text-3xl font-bold md:text-4xl">
                            Creative developer{" "}
                            <span className="gradient-text">building worlds</span>
                        </h2>

                        {/* Two-column layout */}
                        <div className="grid gap-14 lg:grid-cols-2 items-start">
                            {/* Bio column */}
                            <div className="space-y-5 text-[var(--text-secondary)] leading-relaxed text-[15px]">
                                <p className="about-reveal">
                                    Hi! I&apos;m{" "}
                                    <strong className="font-semibold" style={{ color: "var(--text-primary)" }}>
                                        Ashwani Kumar
                                    </strong>{" "}
                                    — a 3D Artist and Web Developer.

                                    As a 3D artist, I create detailed models and animations that bring ideas to life. As a developer, I build clean, responsive websites with modern technologies.

                                    I focus on combining creativity and code to deliver engaging digital experiences.
                                </p>
                                <p className="about-reveal">
                                    With a passion for pixel-perfect detail and
                                    performance-driven code, I love turning bold
                                    ideas into polished digital realities — whether
                                    that&apos;s a Blender animation, or a sleek Next.js
                                    app.
                                </p>
                                <p className="about-reveal">
                                    When I&apos;m not at the keyboard, you&apos;ll
                                    find me exploring the latest in reading novels, playing basketball or hiking in the great outdoors.
                                </p>

                                {/* Download CV */}
                                <div className="about-reveal">
                                    <a
                                        href="#"
                                        className="inline-flex items-center gap-2 mt-2 rounded-full px-6 py-3 text-sm font-semibold text-black shadow-lg transition-transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #00c853, #00e676)",
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 3v12"
                                            />
                                        </svg>
                                        Download Resume
                                    </a>
                                </div>
                            </div>

                            {/* Stats grid */}
                            <div className="grid grid-cols-3 gap-4">
                                {stats.map((s) => (
                                    <div
                                        key={s.label}
                                        className="about-reveal rounded-2xl border p-6 flex flex-col justify-center hover:border-green-500/30 transition-colors"
                                        style={{
                                            background: "var(--bg-card)",
                                            borderColor: "var(--border-subtle)",
                                        }}
                                    >
                                        <span className="font-syne text-4xl font-extrabold mb-1 gradient-text">
                                            {s.value}
                                        </span>
                                        <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest font-medium">
                                            {s.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
