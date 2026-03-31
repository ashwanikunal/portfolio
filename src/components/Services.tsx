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
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=250%",
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            /* ── Phase 1: Header reveal ── */
            // Label slides in from left
            tl.fromTo(
                ".srv-label",
                { x: -120, opacity: 0 },
                { x: 0, opacity: 1, ease: "power3.out", duration: 0.3 },
                0
            );

            // Title words scale up from 0
            tl.fromTo(
                ".srv-title-word",
                { scale: 0, opacity: 0, rotationZ: -8 },
                {
                    scale: 1,
                    opacity: 1,
                    rotationZ: 0,
                    stagger: 0.08,
                    ease: "back.out(1.7)",
                    duration: 0.3,
                },
                0.05
            );

            // Subtitle fades up
            tl.fromTo(
                ".srv-subtitle",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, ease: "power3.out", duration: 0.25 },
                0.2
            );

            // Horizontal divider line draws across
            tl.fromTo(
                line,
                { scaleX: 0 },
                { scaleX: 1, ease: "power2.inOut", duration: 0.3 },
                0.25
            );

            /* ── Phase 2: Cards reveal from sides ── */
            const cardElements = cards.querySelectorAll(".service-card");

            // Card 1 — slides in from left with rotation
            tl.fromTo(
                cardElements[0],
                {
                    x: "-100vw",
                    rotationY: 25,
                    opacity: 0,
                    transformPerspective: 1000,
                    transformOrigin: "right center",
                },
                {
                    x: 0,
                    rotationY: 0,
                    opacity: 1,
                    ease: "power3.out",
                    duration: 0.6,
                },
                0.3
            );

            // Card 2 — slides in from right with rotation
            tl.fromTo(
                cardElements[1],
                {
                    x: "100vw",
                    rotationY: -25,
                    opacity: 0,
                    transformPerspective: 1000,
                    transformOrigin: "left center",
                },
                {
                    x: 0,
                    rotationY: 0,
                    opacity: 1,
                    ease: "power3.out",
                    duration: 0.6,
                },
                0.35
            );

            /* ── Phase 3: Card contents stagger in ── */
            // Numbers count-reveal
            cardElements.forEach((card, i) => {
                const inner = card.querySelectorAll(".srv-inner");
                tl.fromTo(
                    inner,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.04,
                        ease: "power3.out",
                        duration: 0.25,
                    },
                    0.6 + i * 0.08
                );
            });

            // Tags cascade in with stagger
            const allTags = cards.querySelectorAll(".highlight-tag");
            tl.fromTo(
                allTags,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    stagger: 0.025,
                    ease: "back.out(2)",
                    duration: 0.2,
                },
                0.75
            );

            // Icon spin-in
            const icons = cards.querySelectorAll(".srv-icon");
            tl.fromTo(
                icons,
                { rotation: -180, scale: 0, opacity: 0 },
                {
                    rotation: 0,
                    scale: 1,
                    opacity: 1,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                    duration: 0.3,
                },
                0.55
            );

            // Card border glow pulse at the end
            tl.to(
                cardElements,
                {
                    boxShadow: "0 0 40px rgba(0,200,83,0.08), inset 0 1px 0 rgba(0,200,83,0.1)",
                    duration: 0.3,
                    stagger: 0.1,
                },
                0.85
            );

        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative w-full h-screen flex items-center overflow-hidden"
            style={{ background: "var(--bg-primary)" }}
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
