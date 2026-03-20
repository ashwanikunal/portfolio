"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        name: "Neon City",
        github: "https://github.com",
        website: "https://example.com",
    },
    {
        name: "DevSpace",
        github: "https://github.com",
        website: "https://example.com",
    },
    {
        name: "Quantum Drift",
        github: "https://github.com",
        website: "https://example.com",
    },
    {
        name: "AI Image Studio",
        github: "https://github.com",
        website: "https://example.com",
    },
    {
        name: "EchoNotes",
        github: "https://github.com",
        website: "https://example.com",
    },
    {
        name: "Ancient Ruins VR",
        github: "https://github.com",
        website: "https://example.com",
    },
    {
        name: "Portfolio v2",
        github: "https://github.com",
        website: "https://example.com",
    },
    {
        name: "ChatFlow AI",
        github: "https://github.com",
        website: "https://example.com",
    },
];

/* GitHub icon */
const GithubIcon = () => (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .5C5.37.5 0 5.78 0 12.3c0 5.21 3.43 9.64 8.2 11.21.6.11.82-.26.82-.57v-2.01c-3.34.72-4.04-1.61-4.04-1.61-.55-1.37-1.33-1.74-1.33-1.74-1.09-.74.08-.72.08-.72 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .31.21.69.82.57C20.57 21.94 24 17.51 24 12.3 24 5.78 18.63.5 12 .5z" />
    </svg>
);

/* External link icon */
const ExternalLinkIcon = () => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
);

/* Arrow icon */
const ArrowIcon = () => (
    <svg className="w-12 h-6" viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <line x1="0" y1="12" x2="42" y2="12" />
        <polyline points="36,6 42,12 36,18" />
    </svg>
);

/* A single project card in the marquee */
function ProjectCard({ project }: { project: (typeof projects)[0] }) {
    return (
        <div
            className="flex-shrink-0 flex items-center gap-5 rounded-2xl border px-8 py-5 mx-3 select-none"
            style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-subtle)",
            }}
        >
            <span className="font-syne text-lg font-bold text-white whitespace-nowrap tracking-tight">
                {project.name}
            </span>
            <span
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: "rgba(0,200,83,0.4)" }}
            />
            <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} GitHub`}
                className="text-[var(--text-secondary)] transition-colors hover:text-[#00e676]"
            >
                <GithubIcon />
            </a>
            <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} Website`}
                className="text-[var(--text-secondary)] transition-colors hover:text-[#00e676]"
            >
                <ExternalLinkIcon />
            </a>
        </div>
    );
}

export default function Projects() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const bigTextSectionRef = useRef<HTMLDivElement>(null);
    const bigTextRef = useRef<HTMLHeadingElement>(null);
    const contentPanelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const bigTextSection = bigTextSectionRef.current;
        const bigText = bigTextRef.current;
        const contentPanel = contentPanelRef.current;
        if (!wrapper || !bigTextSection || !bigText || !contentPanel) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top top",
                    end: "+=300%", // 3 full screens of scroll distance (slows it down)
                    pin: true,
                    pinSpacing: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            // 1. Text zooms in (lasts the full duration)
            tl.to(
                bigText,
                {
                    scale: 22,
                    opacity: 0,
                    filter: "blur(12px)",
                    ease: "power2.inOut",
                    duration: 1,
                },
                0
            );

            // 2. Featured Projects panel slides up to cover the empty zooming text
            tl.fromTo(
                contentPanel,
                { y: "110vh" }, // hides it safely below the viewport
                {
                    y: "0%",
                    ease: "power2.out",
                    duration: 0.6,
                },
                0.4 // starts sliding up when the timeline is 40% complete
            );
        }, wrapper);

        return () => ctx.revert();
    }, []);

    /* Duplicate for seamless marquee */
    const duplicated = [...projects, ...projects];

    return (
        // The wrapper dictates the height that will be pinned
        <div id="projects" ref={wrapperRef} className="relative w-full h-screen" style={{ background: "var(--bg-primary)" }}>
            
            {/* ━━━ SECTION 1: Big "PROJECTS" text that zooms in ━━━ */}
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

                    {/* Subtle grid overlay */}
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
                            ref={bigTextRef}
                            className="font-syne font-black uppercase leading-[0.85]"
                            style={{
                                fontSize: "clamp(4rem, 16vw, 16rem)",
                                background:
                                    "linear-gradient(135deg, #00c853 0%, #00e676 40%, #b9f6ca 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                letterSpacing: "-0.04em",
                                willChange: "transform, opacity",
                            }}
                        >
                            Projects
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
                        <p
                            className="mt-6 text-xs uppercase tracking-[0.3em] font-medium"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            Scroll to explore
                        </p>
                    </div>
                </section>
            </div>

            {/* ━━━ SECTION 2: Marquee content slides over ━━━ */}
            <section
                ref={contentPanelRef}
                className="absolute inset-x-0 top-0 overflow-hidden min-h-screen flex flex-col justify-center"
                style={{
                    zIndex: 10,
                    background: "var(--bg-secondary)",
                    borderRadius: "40px 40px 0 0",
                    boxShadow: "0 -40px 80px rgba(0,0,0,0.6)",
                    transform: "translateY(110vh)" // Initial state before GSAP takes over
                }}
            >
                {/* Top edge glow */}
                <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 10%, rgba(0,200,83,0.35) 50%, transparent 90%)",
                    }}
                />

                <div className="noise-overlay absolute inset-0 pointer-events-none rounded-t-[40px]" />

                {/* Background glow blobs */}
                <div
                    className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
                    style={{
                        background: "radial-gradient(circle, rgba(0,200,83,0.04) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
                <div
                    className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] rounded-full pointer-events-none"
                    style={{
                        background: "radial-gradient(circle, rgba(0,200,83,0.03) 0%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />

                {/* ── Heading area ── */}
                <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 mb-16">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <span className="mt-3 text-[var(--text-secondary)]">
                                <ArrowIcon />
                            </span>
                            <div>
                                <h2 className="font-syne text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95]">
                                    Featured
                                    <br />
                                    <span className="gradient-text">Projects</span>
                                </h2>
                                <p
                                    className="mt-4 font-dm text-sm max-w-md leading-relaxed"
                                    style={{ color: "var(--text-secondary)" }}
                                >
                                    A curated selection of my most impactful work — from 3D worlds to full-stack platforms.
                                </p>
                            </div>
                        </div>

                        {/* Project count badge */}
                        <div
                            className="hidden md:flex flex-col items-center justify-center rounded-2xl border px-6 py-4"
                            style={{
                                background: "var(--bg-card)",
                                borderColor: "var(--border-subtle)",
                            }}
                        >
                            <span className="font-syne text-3xl font-extrabold gradient-text">
                                {projects.length}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] font-medium mt-1">
                                Projects
                            </span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div
                        className="mt-10 h-px w-full"
                        style={{
                            background:
                                "linear-gradient(90deg, rgba(0,200,83,0.3) 0%, rgba(0,200,83,0.08) 70%, transparent 100%)",
                        }}
                    />
                </div>

                {/* ── Marquee Row 1 — scrolls LEFT ── */}
                <div className="relative z-10 mb-5">
                    {/* Fade masks */}
                    <div
                        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
                        style={{
                            background: "linear-gradient(to right, var(--bg-secondary), transparent)",
                        }}
                    />
                    <div
                        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
                        style={{
                            background: "linear-gradient(to left, var(--bg-secondary), transparent)",
                        }}
                    />

                    <div className="marquee-track-left flex items-center">
                        {duplicated.map((p, i) => (
                            <ProjectCard key={`row1-${p.name}-${i}`} project={p} />
                        ))}
                    </div>
                </div>

                {/* ── Marquee Row 2 — scrolls RIGHT (reverse) ── */}
                <div className="relative z-10 mb-16">
                    {/* Fade masks */}
                    <div
                        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
                        style={{
                            background: "linear-gradient(to right, var(--bg-secondary), transparent)",
                        }}
                    />
                    <div
                        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
                        style={{
                            background: "linear-gradient(to left, var(--bg-secondary), transparent)",
                        }}
                    />

                    <div className="marquee-track-right flex items-center">
                        {[...duplicated].reverse().map((p, i) => (
                            <ProjectCard key={`row2-${p.name}-${i}`} project={p} />
                        ))}
                    </div>
                </div>

                {/* ── View All Button ── */}
                <div className="relative z-10 flex justify-center pb-20">
                    <a
                        href="#"
                        className="group inline-flex items-center gap-3 rounded-full border px-8 py-3.5 text-sm font-semibold transition-all duration-300 hover:border-[rgba(0,200,83,0.4)] hover:bg-[rgba(0,200,83,0.05)] hover:text-white"
                        style={{
                            borderColor: "var(--border-subtle)",
                            color: "var(--text-secondary)",
                        }}
                    >
                        View All Projects
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>

                {/* ── CSS keyframes ── */}
                <style jsx>{`
                    .marquee-track-left {
                        animation: marquee-left 35s linear infinite;
                        width: max-content;
                    }
                    .marquee-track-left:hover {
                        animation-play-state: paused;
                    }

                    .marquee-track-right {
                        animation: marquee-right 40s linear infinite;
                        width: max-content;
                    }
                    .marquee-track-right:hover {
                        animation-play-state: paused;
                    }

                    @keyframes marquee-left {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }

                    @keyframes marquee-right {
                        0% { transform: translateX(-50%); }
                        100% { transform: translateX(0); }
                    }
                `}</style>
            </section>
        </div>
    );
}
