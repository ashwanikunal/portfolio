"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import InteractiveGrid from "./InteractiveGrid";
import { useTheme } from "@/context/ThemeContext";

const roles = ["3D Artist", "Web Developer"];

/* ── Animation variants ── */
const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.9, ease: [0, 0, 0.58, 1] as const } },
};

export default function Hero() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    /* ── Parallax mouse tracking ── */
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const move = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth);
            mouseY.set(e.clientY / window.innerHeight);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, [mouseX, mouseY]);

    return (
        <section
            id="home"
            className="relative w-full min-h-screen overflow-hidden"
            style={{
                background: "var(--bg-primary)",
                transition: "background 0.4s ease",
            }}
        >
            {/* ── Interactive grid — lights up on hover (dark mode only) ── */}
            {isDark && <InteractiveGrid />}

            {/* ── Ambient radial glow — center top ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: isDark
                        ? "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,200,83,0.06) 0%, transparent 70%)"
                        : "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,200,83,0.08) 0%, transparent 70%)",
                }}
            />

            {/* ── Top floating glow blob ── */}
            <motion.div
                className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
                style={{
                    background: isDark ? "rgba(0, 200, 83, 0.06)" : "rgba(0, 200, 83, 0.08)",
                    filter: "blur(120px)",
                }}
                animate={{ y: [0, -20, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* ── Bottom right subtle glow ── */}
            <motion.div
                className="absolute bottom-[15%] right-[15%] w-64 h-64 rounded-full pointer-events-none"
                style={{
                    background: isDark ? "rgba(105, 240, 174, 0.04)" : "rgba(0, 200, 83, 0.06)",
                    filter: "blur(80px)",
                }}
                animate={{ y: [0, 22, 0], scale: [1, 0.94, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />

            {/* ── Bottom left subtle glow ── */}
            <motion.div
                className="absolute bottom-[20%] left-[10%] w-56 h-56 rounded-full pointer-events-none"
                style={{
                    background: isDark ? "rgba(0, 200, 83, 0.05)" : "rgba(0, 200, 83, 0.07)",
                    filter: "blur(90px)",
                }}
                animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* ════════════════════════════
          MAIN CONTENT — CENTERED LAYOUT
         ════════════════════════════ */}
            <div className="relative z-10 flex items-center justify-center h-screen px-6 sm:px-10 lg:px-16 xl:px-24 pt-28 pb-10">
                <motion.div
                    className="flex flex-col items-center text-center max-w-3xl"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {/* ── "HEY! I AM" label ── */}
                    <motion.p
                        variants={fadeUp}
                        className="font-dm text-[11px] md:text-xs tracking-[0.5em] uppercase mb-5 font-medium"
                        style={{ color: "var(--text-muted)" }}
                    >
                        HEY! I AM
                    </motion.p>

                    {/* ── Name — tech display centered heading ── */}
                    <motion.div variants={fadeUp} className="mb-3">
                        <h1
                            className="font-tech uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-bold tracking-wide leading-[1.1]"
                            style={{ color: "var(--text-primary)", letterSpacing: "0.05em" }}
                        >
                            Ashwani{" "}
                            <span className="italic gradient-text">
                                Kumar
                            </span>
                        </h1>
                    </motion.div>

                    {/* ── Role line ── */}
                    <motion.p
                        variants={fadeUp}
                        className="font-dm text-base sm:text-lg md:text-xl font-light mb-4 tracking-wide"
                    >
                        <span className="mr-2" style={{ color: "var(--text-muted)" }}>
                            I&apos;m a
                        </span>
                        <span className="font-medium gradient-text">
                            {roles.join(" · ")}
                        </span>
                        <span className="cursor-blink ml-1 gradient-text">
                            |
                        </span>
                    </motion.p>

                    {/* ── Gradient divider ── */}
                    <motion.div
                        variants={fadeIn}
                        className="mb-5 h-px w-32 rounded-full mx-auto"
                        style={{ background: "linear-gradient(to right, transparent, var(--accent-start), var(--accent-end), transparent)" }}
                    />

                    {/* ── Description ── */}
                    <motion.p
                        variants={fadeUp}
                        className="font-dm text-sm md:text-[15px] lg:text-base leading-[1.7] mb-8 max-w-lg font-light"
                        style={{ color: "var(--text-muted)", letterSpacing: "0.01em" }}
                    >
                        I craft visually stunning 3D worlds, build robust full‑stack web applications,
                        and design engaging digital experiences that leave a lasting impression.
                    </motion.p>

                    {/* ── CTA Buttons — outlined / bordered style ── */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap items-center justify-center gap-5 mb-8"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{
                                scale: 1.02,
                            }}
                            whileTap={{ scale: 0.97 }}
                            className="font-dm px-9 py-3.5 rounded-full text-[13px] tracking-[0.15em] uppercase font-normal transition-all"
                            style={{
                                border: `1px solid var(--border-light)`,
                                color: "var(--text-primary)",
                                background: "transparent",
                            }}
                        >
                            View My Projects
                        </motion.a>
                        <motion.a
                            href="#contact"
                            whileHover={{
                                scale: 1.02,
                            }}
                            whileTap={{ scale: 0.97 }}
                            className="font-dm px-9 py-3.5 rounded-full text-[13px] tracking-[0.15em] uppercase font-normal transition-all"
                            style={{
                                border: `1px solid var(--border-light)`,
                                color: "var(--text-primary)",
                                background: "transparent",
                            }}
                        >
                            Contact Me
                        </motion.a>
                    </motion.div>

                    {/* ── Social links ── */}
                    <motion.div
                        variants={fadeIn}
                        className="flex items-center gap-10"
                    >
                        {["GitHub", "LinkedIn"].map((name) => (
                            <motion.a
                                key={name}
                                href="#"
                                whileHover={{ y: -3, color: "#00e676" }}
                                className="font-dm text-xs tracking-widest uppercase transition-colors"
                                style={{ color: "var(--text-secondary)" }}
                            >
                                {name}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

        </section>
    );
}
