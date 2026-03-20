"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
    {
        title: "Neon City — 3D Environment",
        description:
            "A fully interactive cyberpunk cityscape built in Blender with procedural textures, volumetric lighting, and real-time WebGL preview via Three.js.",
        tags: ["Blender", "Three.js", "GLSL"],
        color: "from-green-500 to-emerald-600",
        emoji: "🌆",
    },
    {
        title: "DevSpace — SaaS Dashboard",
        description:
            "A real-time project management platform with live collaboration, Kanban boards, Stripe billing, and role-based auth built on Next.js 14.",
        tags: ["Next.js", "TypeScript", "Stripe", "Supabase"],
        color: "from-emerald-500 to-green-600",
        emoji: "🚀",
    },
    {
        title: "Quantum Drift — Game",
        description:
            "A physics-based racing game with procedurally generated tracks, custom shader effects, and online leaderboards built in Unity.",
        tags: ["Unity", "C#", "Photon", "HLSL"],
        color: "from-teal-500 to-green-600",
        emoji: "🎮",
    },
    {
        title: "AI Image Studio",
        description:
            "A browser-based image generation tool powered by Stable Diffusion with real-time preview, style presets, and a drag-and-drop editor.",
        tags: ["React", "Python", "FastAPI", "Docker"],
        color: "from-lime-500 to-green-600",
        emoji: "🎨",
    },
    {
        title: "EchoNotes — React App",
        description:
            "A voice-to-text note taking app with AI summaries, rich-text editing, and end-to-end encryption deployed on Vercel.",
        tags: ["React", "OpenAI", "Node.js", "PostgreSQL"],
        color: "from-green-400 to-emerald-600",
        emoji: "🎙️",
    },
    {
        title: "Ancient ruins — VR Scene",
        description:
            "An immersive archaeological VR experience created with Unreal Engine 5 featuring Nanite geometry and Lumen global illumination.",
        tags: ["Unreal Engine 5", "Nanite", "Lumen"],
        color: "from-emerald-400 to-teal-600",
        emoji: "🏛️",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
    }),
};

export default function Projects() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section
            id="projects"
            ref={ref}
            className="relative px-6 py-28 overflow-hidden"
            style={{ background: "var(--bg-primary)" }}
        >
            {/* Background accent */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, #00c853, transparent)" }}
            />

            <div className="mx-auto max-w-6xl">
                {/* Heading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55 }}
                    className="mb-2 text-sm font-semibold uppercase tracking-widest"
                    style={{ color: "var(--accent-cyan)" }}
                >
                    Portfolio
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.1 }}
                    className="font-syne mb-14 text-3xl font-bold md:text-4xl"
                >
                    Featured <span className="gradient-text">projects</span>
                </motion.h2>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((p, i) => (
                        <motion.div
                            key={p.title}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="group relative overflow-hidden rounded-2xl border cursor-pointer"
                            style={{
                                background: "var(--bg-card)",
                                borderColor: "var(--border-subtle)",
                            }}
                        >
                            {/* Gradient top bar */}
                            <div className={`h-1.5 w-full bg-gradient-to-r ${p.color}`} />

                            {/* Hover overlay glow */}
                            <div
                                className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${p.color}`}
                            />

                            <div className="p-6 relative z-10">
                                {/* Emoji icon */}
                                <div className="text-3xl mb-4">{p.emoji}</div>

                                <h3 className="font-syne mb-2 text-base font-bold text-white leading-snug">
                                    {p.title}
                                </h3>
                                <p className="mb-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                                    {p.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {p.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="rounded-md px-2.5 py-1 text-xs font-medium"
                                            style={{
                                                background: "rgba(0,200,83,0.08)",
                                                color: "var(--text-secondary)",
                                            }}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Arrow link — appears on hover */}
                                <div className="flex items-center gap-1.5 text-sm font-semibold opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" style={{ color: "#00e676" }}>
                                    View Project
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View all button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.7 }}
                    className="flex justify-center mt-12"
                >
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 rounded-full border px-8 py-3 text-sm font-semibold transition-colors hover:border-green-500/40 hover:text-white"
                        style={{
                            borderColor: "var(--border-subtle)",
                            color: "var(--text-secondary)",
                        }}
                    >
                        View All Projects
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
