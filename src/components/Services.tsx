"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        number: "01",
        title: "3D Art & Animation",
        description:
            "I bring ideas to life through detailed 3D modeling, texturing, lighting, and animation using Blender and other industry tools. From product visualizations to immersive environments, I craft visuals that captivate and tell a story.",
        highlights: [
            "3D Modeling & Sculpting",
            "Texturing & Materials",
            "Lighting & Rendering",
            "Motion & Animation",
            "Product Visualization",
            "Environment Design",
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
        ),
    },
    {
        number: "02",
        title: "Web Development",
        description:
            "I design and build modern, responsive websites and web applications with clean code and smooth interactions. From landing pages to full-stack platforms, I deliver fast, scalable, and user-friendly digital experiences.",
        highlights: [
            "React & Next.js",
            "Responsive Design",
            "GSAP & Framer Motion",
            "Full-Stack Development",
            "Performance Optimization",
            "UI/UX Implementation",
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
        ),
    },
];

export default function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const header = headerRef.current;
        const cards = cardsRef.current;
        const line = lineRef.current;
        if (!section || !header || !cards || !line) return;

        const ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            // ── Background header fades in independently ──
            gsap.fromTo(
                [".srv-label", ".srv-title-word", ".srv-subtitle"],
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                    },
                }
            );

            gsap.fromTo(
                line,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 0.8,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                    },
                }
            );

            /* ── Desktop: Minimal Unique Fanning Cards ── */
            mm.add("(min-width: 768px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=150%",
                        pin: true,
                        scrub: 1,
                    },
                });

                const cardElements = cards.querySelectorAll(".service-card");
                const cardLeft = cardElements[0];
                const cardRight = cardElements[1];
                const innersLeft = cardLeft.querySelectorAll(".srv-inner, .highlight-tag, .srv-icon");
                const innersRight = cardRight.querySelectorAll(".srv-inner, .highlight-tag, .srv-icon");

                // Initialize text to instantly be hidden
                tl.set([...innersLeft, ...innersRight], { opacity: 0, y: 15 });

                // Step 1: Rise up into the center overlapping
                tl.fromTo(
                    cardLeft,
                    { y: "100vh", xPercent: 54, rotationZ: -5 },
                    { y: 0, xPercent: 54, rotationZ: -5, duration: 1, ease: "power2.out" },
                    0
                );
                tl.fromTo(
                    cardRight,
                    { y: "100vh", xPercent: -54, rotationZ: 5 },
                    { y: 0, xPercent: -54, rotationZ: 5, duration: 1, ease: "power2.out" },
                    0.15 // Slight follower lag
                );

                // Step 2: Fan outward gracefully
                tl.to(
                    [cardLeft, cardRight],
                    { xPercent: 0, rotationZ: 0, duration: 1.2, ease: "power3.inOut" },
                    1.4
                );

                // Step 3: Minimal ink-fade for text contents
                tl.to(
                    [...innersLeft, ...innersRight],
                    { opacity: 1, y: 0, duration: 1, stagger: 0.03, ease: "power2.out" },
                    1.8
                );
            });

            /* ── Mobile: Crisp normal stagger ── */
            mm.add("(max-width: 767px)", () => {
                gsap.fromTo(
                    cards.querySelectorAll(".service-card"),
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.2,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cards,
                            start: "top 80%",
                        },
                    }
                );
            });

            return () => mm.revert();
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative w-full h-screen flex items-center overflow-hidden"
        >
            {/* Background elements */}
            <div className="noise-overlay absolute inset-0 pointer-events-none" />
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(0,200,83,0.04) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,200,83,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,83,0.03) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 mx-auto max-w-6xl">
                {/* Header */}
                <div ref={headerRef}>
                    <p
                        className="srv-label mb-2 text-sm font-semibold uppercase tracking-[0.3em]"
                        style={{ color: "var(--accent-cyan)" }}
                    >
                        What I Do
                    </p>
                    <h2 className="font-syne mb-3 text-2xl font-bold md:text-4xl leading-tight">
                        <span className="srv-title-word inline-block mr-2">My</span>
                        <span className="srv-title-word inline-block gradient-text">Services</span>
                    </h2>
                    <p
                        className="srv-subtitle mb-6 max-w-xl text-[14px] leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        I specialize in two creative disciplines — bringing ideas to life through
                        immersive 3D visuals and building modern web experiences with cutting-edge technologies.
                    </p>

                    {/* Animated divider */}
                    <div
                        ref={lineRef}
                        className="mb-8 h-px w-full origin-left"
                        style={{
                            background: "linear-gradient(90deg, #00c853, rgba(0,200,83,0.2), transparent)",
                            transform: "scaleX(0)",
                        }}
                    />
                </div>

                {/* Cards */}
                <div ref={cardsRef} className="grid gap-5 md:grid-cols-2">
                    {services.map((service) => (
                        <div
                            key={service.number}
                            className="service-card group relative rounded-2xl border p-6 md:p-7 transition-all duration-500 hover:border-green-500/30"
                            style={{
                                background: "var(--bg-card)",
                                borderColor: "var(--border-subtle)",
                                willChange: "transform",
                            }}
                        >
                            {/* Corner glow on hover */}
                            <div
                                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{
                                    background: "radial-gradient(circle, rgba(0,200,83,0.08) 0%, transparent 70%)",
                                    filter: "blur(40px)",
                                    transform: "translate(30%, -30%)",
                                }}
                            />

                            {/* Number + Icon row */}
                            <div className="srv-inner flex items-center justify-between mb-4">
                                <span
                                    className="font-syne text-5xl font-black leading-none"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(0,200,83,0.15) 0%, rgba(0,200,83,0.05) 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    {service.number}
                                </span>
                                <div
                                    className="srv-icon p-3 rounded-2xl transition-colors duration-300 group-hover:bg-green-500/10"
                                    style={{
                                        background: "rgba(0,200,83,0.05)",
                                        color: "#00e676",
                                    }}
                                >
                                    {service.icon}
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="srv-inner font-syne text-lg md:text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p
                                className="srv-inner text-[13px] leading-relaxed mb-4"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                {service.description}
                            </p>

                            {/* Divider */}
                            <div
                                className="srv-inner mb-4 h-px w-full"
                                style={{
                                    background: "linear-gradient(90deg, var(--border-subtle), transparent)",
                                }}
                            />

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {service.highlights.map((tag) => (
                                    <span
                                        key={tag}
                                        className="highlight-tag text-[11px] font-medium px-3 py-1 rounded-full border transition-colors duration-300 hover:border-green-500/40 hover:text-green-400"
                                        style={{
                                            borderColor: "var(--border-subtle)",
                                            color: "var(--text-secondary)",
                                            background: "rgba(0,200,83,0.03)",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
