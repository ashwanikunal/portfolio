"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
    {
        category: "3D & Design",
        color: "from-purple-500 to-pink-500",
        glow: "rgba(168,85,247,0.2)",
        skills: [
            { name: "Blender", level: 90 },
            { name: "Maya", level: 75 },
            { name: "Figma", level: 85 },
            { name: "Substance Painter", level: 70 },
        ],
    },
    {
        category: "Full Stack",
        color: "from-blue-500 to-indigo-600",
        glow: "rgba(99,102,241,0.2)",
        skills: [
            { name: "React / Next.js", level: 95 },
            { name: "Node.js / Express", level: 85 },
            { name: "TypeScript", level: 88 },
            { name: "PostgreSQL / MongoDB", level: 80 },
        ],
    },
    {
        category: "Game Dev",
        color: "from-cyan-500 to-teal-500",
        glow: "rgba(34,211,238,0.2)",
        skills: [
            { name: "Unity (C#)", level: 85 },
            { name: "Unreal Engine", level: 65 },
            { name: "GLSL / Shaders", level: 72 },
            { name: "Godot", level: 60 },
        ],
    },
];

const tagSkills = [
    "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS",
    "Blender", "Figma", "Unity", "C#", "Three.js",
    "PostgreSQL", "MongoDB", "Docker", "Git", "AWS",
];

export default function Skills() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            id="skills"
            ref={ref}
            className="relative px-6 py-28 overflow-hidden"
            style={{ background: "var(--bg-primary)" }}
        >
            {/* Ambient glows */}
            <div
                className="absolute -left-32 top-1/3 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-20"
                style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
            />
            <div
                className="absolute -right-32 bottom-1/3 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-15"
                style={{ background: "radial-gradient(circle, #22d3ee, transparent)" }}
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
                    My Skills
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.1 }}
                    className="font-syne mb-14 text-3xl font-bold md:text-4xl"
                >
                    Tools & <span className="gradient-text">technologies</span>
                </motion.h2>

                {/* Skill bar cards */}
                <div className="grid gap-6 md:grid-cols-3 mb-16">
                    {skillGroups.map((group, gi) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.65, delay: 0.15 + gi * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-2xl border p-6 transition-shadow hover:shadow-xl"
                            style={{
                                background: "var(--bg-card)",
                                borderColor: "var(--border-subtle)",
                                boxShadow: inView ? `0 0 40px ${group.glow}` : "none",
                            }}
                        >
                            {/* Card header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${group.color}`} />
                                <h3 className="font-syne text-base font-bold text-white">{group.category}</h3>
                            </div>

                            {/* Skill bars */}
                            <div className="space-y-4">
                                {group.skills.map((skill, si) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-xs font-medium text-[var(--text-secondary)]">
                                                {skill.name}
                                            </span>
                                            <span className="text-xs font-semibold text-white">{skill.level}%</span>
                                        </div>
                                        <div
                                            className="w-full h-1.5 rounded-full overflow-hidden"
                                            style={{ background: "rgba(255,255,255,0.06)" }}
                                        >
                                            <motion.div
                                                className={`h-full rounded-full bg-gradient-to-r ${group.color}`}
                                                initial={{ width: 0 }}
                                                animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                                                transition={{
                                                    duration: 1.1,
                                                    delay: 0.4 + gi * 0.1 + si * 0.08,
                                                    ease: "easeOut",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tech tag cloud */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-wrap justify-center gap-3"
                >
                    {tagSkills.map((tag, i) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.55 + i * 0.04 }}
                            whileHover={{ scale: 1.08, y: -2 }}
                            className="cursor-default rounded-full border px-4 py-1.5 text-sm font-medium transition-colors hover:border-indigo-500/50 hover:text-white"
                            style={{
                                borderColor: "var(--border-subtle)",
                                color: "var(--text-secondary)",
                                background: "var(--bg-card)",
                            }}
                        >
                            {tag}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
