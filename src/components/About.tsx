"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "20+", label: "Projects Completed" },
    { value: "10+", label: "Happy Clients" },
    { value: "5+", label: "Awards" },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
    }),
};

export default function About() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            id="about"
            ref={ref}
            className="relative px-6 py-28 overflow-hidden"
            style={{ background: "var(--bg-secondary)" }}
        >
            {/* ── Background glow ── */}
            <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
            />

            <div className="mx-auto max-w-6xl">
                {/* ── Section label ── */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-2 text-sm font-semibold uppercase tracking-widest"
                    style={{ color: "var(--accent-cyan)" }}
                >
                    About Me
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-syne mb-14 text-3xl font-bold md:text-4xl"
                >
                    Creative developer <span className="gradient-text">building worlds</span>
                </motion.h2>

                {/* ── Two-column layout ── */}
                <div className="grid gap-14 lg:grid-cols-2 items-start">

                    {/* Bio column */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-5 text-[var(--text-secondary)] leading-relaxed text-[15px]"
                    >
                        <p>
                            Hi! I&apos;m <strong className="text-white font-semibold">Ashwani Kumar</strong> — a
                            multidisciplinary creator who lives at the intersection of art, technology, and
                            interactive experiences. I craft visually stunning 3D worlds, build robust full‑stack
                            web applications, and design engaging games that leave a lasting impression.
                        </p>
                        <p>
                            With a passion for pixel-perfect detail and performance-driven code, I love turning
                            bold ideas into polished digital realities — whether that&apos;s a Blender animation, a
                            sleek Next.js app, or an immersive Unity game.
                        </p>
                        <p>
                            When I&apos;m not at the keyboard, you&apos;ll find me exploring the latest real-time
                            rendering techniques, contributing to open-source projects, or gaming competitively.
                        </p>

                        {/* Download CV */}
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.04, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 mt-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg"
                            style={{ background: "linear-gradient(135deg, #1d6aff, #4fa3ff)" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 3v12" />
                            </svg>
                            Download CV
                        </motion.a>
                    </motion.div>

                    {/* Stats grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                className="rounded-2xl border p-6 flex flex-col justify-center hover:border-indigo-500/30 transition-colors"
                                style={{
                                    background: "var(--bg-card)",
                                    borderColor: "var(--border-subtle)",
                                }}
                            >
                                <span
                                    className="font-syne text-4xl font-extrabold mb-1 gradient-text"
                                >
                                    {s.value}
                                </span>
                                <span className="text-xs text-[var(--text-secondary)] uppercase tracking-widest font-medium">
                                    {s.label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
