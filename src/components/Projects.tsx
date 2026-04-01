"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        name: "Heart disease Diagnosis",
        github: "https://github.com/ashwanikunal/Heart-Disease-Analysis.git",
        website: "https://heart-disease-analysis-m423.onrender.com/",
    },
    {
        name: "CredIn",
        github: "https://github.com/ashwanikunal/credIn.git",
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
function ProjectCard({ project, index }: { project: (typeof projects)[0], index: number }) {
    const num = (index + 1).toString().padStart(2, '0');
    return (
        <div className="project-card-wrapper px-4 md:px-6 will-change-transform perspective-1000">
            <div
                className="group relative flex flex-col justify-between rounded-[2rem] border p-8 md:p-10 w-[320px] sm:w-[450px] h-[300px] select-none transition-all duration-500 hover:border-green-500/50 hover:bg-green-500/[0.02]"
                style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border-subtle)",
                }}
            >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,200,83,0.1) 0%, transparent 70%)", filter: "blur(30px)" }} />
                
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <span
                            className="w-12 h-1 rounded-full block transition-all duration-500 group-hover:w-24"
                            style={{ background: "linear-gradient(90deg, #00c853, transparent)" }}
                        />
                        <span className="font-dm text-sm font-bold tracking-widest" style={{ color: "var(--text-faint)" }}>
                            {num}
                        </span>
                    </div>
                    <h3 className="font-syne text-3xl font-bold tracking-tight mb-4 transition-colors duration-300 group-hover:text-[#00e676]" style={{ color: "var(--text-primary)" }}>
                        {project.name}
                    </h3>
                </div>
                
                <div className="flex items-center gap-8 mt-6 pt-6 border-t relative z-10" style={{ borderColor: 'var(--border-subtle)' }}>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold transition-colors hover:text-[#00e676]"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        <GithubIcon />
                        Code
                    </a>
                    <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold transition-colors hover:text-[#00e676]"
                        style={{ color: "var(--text-secondary)" }}
                    >
                        <ExternalLinkIcon />
                        Live
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const row = rowRef.current;
        if (!section || !row) return;

        const ctx = gsap.context(() => {
            const getScrollAmount = () => -(row.scrollWidth - window.innerWidth + window.innerWidth * 0.2);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${row.scrollWidth}`, // scroll distance naturally matches content width
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });

            tl.to(row, {
                x: getScrollAmount,
                ease: "none",
            });

            // Physics velocity skew
            const proxy = { skew: 0 };
            const skewSetter = gsap.quickSetter(".project-card-wrapper", "skewX", "deg");
            const clamp = gsap.utils.clamp(-12, 12);

            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: () => `+=${row.scrollWidth}`,
                onUpdate: (self) => {
                    const velocity = self.getVelocity();
                    const skewAmount = clamp(velocity / -150);
                    if (Math.abs(skewAmount) > Math.abs(proxy.skew)) {
                        proxy.skew = skewAmount;
                        gsap.to(proxy, {
                            skew: 0,
                            duration: 0.8,
                            ease: "power3",
                            overwrite: true,
                            onUpdate: () => skewSetter(proxy.skew)
                        });
                    }
                }
            });

            // Independent header reveal
            gsap.fromTo(
                ".projects-header-text",
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%",
                    }
                }
            );

        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="relative w-full h-screen overflow-hidden flex flex-col justify-center">
            
            {/* Ambient Background Glows */}
            <div className="noise-overlay absolute inset-0 pointer-events-none" />
            <div
                className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(0,200,83,0.03) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />

            {/* Awwwards Style Minimalist Header */}
            <div className="relative z-20 pointer-events-none select-none px-6 md:px-12 lg:px-24 mb-12 md:mb-20">
                <p 
                    className="projects-header-text font-dm text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold mb-6" 
                    style={{ color: "var(--accent-cyan)" }}
                >
                    Selected Works
                </p>
                <h2 
                    className="projects-header-text font-syne text-5xl md:text-7xl lg:text-[8.5rem] font-black leading-[0.9] tracking-tighter" 
                    style={{ color: "var(--text-primary)" }}
                >
                    Featured
                </h2>
                <h2 
                    className="projects-header-text font-syne text-5xl md:text-7xl lg:text-[8.5rem] font-black leading-[0.9] tracking-tighter text-transparent" 
                    style={{ WebkitTextStroke: "2px var(--text-primary)" }}
                >
                    Projects
                </h2>
            </div>
            
            {/* Horizontal Continuous Cards Row */}
            <div className="relative z-10">
                <div ref={rowRef} className="projects-row flex items-center px-[6vw] md:px-[10vw] w-max">
                    {projects.map((p, i) => (
                        <ProjectCard key={p.name + i} project={p} index={i} />
                    ))}
                    {/* Exiting Padding */}
                    <div className="w-[40vw] flex-shrink-0" />
                </div>
            </div>
        </section>
    );
}
