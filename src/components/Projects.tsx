"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
function ProjectCard({ project }: { project: typeof projects[0] }) {
    return (
        <div
            className="flex-shrink-0 flex items-center gap-5 rounded-2xl border px-8 py-5 mx-3 select-none"
            style={{
                background: "var(--bg-card)",
                borderColor: "var(--border-subtle)",
            }}
        >
            {/* Project name */}
            <span className="font-syne text-lg font-bold text-white whitespace-nowrap tracking-tight">
                {project.name}
            </span>

            {/* Separator dot */}
            <span
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: "rgba(0,200,83,0.4)" }}
            />

            {/* GitHub link */}
            <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} GitHub`}
                className="text-[var(--text-secondary)] transition-colors hover:text-[#00e676]"
            >
                <GithubIcon />
            </a>

            {/* Website link */}
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
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    /* We duplicate the project list to create a seamless infinite scroll */
    const duplicated = [...projects, ...projects];

    return (
        <section
            id="projects"
            ref={ref}
            className="relative py-24 overflow-hidden"
            style={{ background: "var(--bg-secondary)" }}
        >
            {/* ── Heading area ── */}
            <div className="mx-auto max-w-6xl px-6 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-4"
                >
                    <span className="mt-3 text-[var(--text-secondary)]">
                        <ArrowIcon />
                    </span>
                    <h2 className="font-syne text-4xl md:text-5xl font-bold leading-tight">
                        Featured
                        <br />
                        <span className="gradient-text">Projects</span>
                    </h2>
                </motion.div>

                {/* Divider line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 h-px w-full origin-left"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(0,200,83,0.3) 0%, rgba(0,200,83,0.08) 70%, transparent 100%)",
                    }}
                />
            </div>

            {/* ── Marquee — infinite horizontal scroll ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="relative"
            >
                {/* Left fade mask */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to right, var(--bg-secondary), transparent)",
                    }}
                />
                {/* Right fade mask */}
                <div
                    className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to left, var(--bg-secondary), transparent)",
                    }}
                />

                {/* Scrolling track */}
                <div className="marquee-track flex items-center">
                    {duplicated.map((p, i) => (
                        <ProjectCard key={`${p.name}-${i}`} project={p} />
                    ))}
                </div>
            </motion.div>

            {/* ── CSS keyframes for the marquee ── */}
            <style jsx>{`
                .marquee-track {
                    animation: marquee-scroll 30s linear infinite;
                    width: max-content;
                }

                .marquee-track:hover {
                    animation-play-state: paused;
                }

                @keyframes marquee-scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </section>
    );
}
