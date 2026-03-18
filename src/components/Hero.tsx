"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const roles = ["3D Artist", "Web Developer"];

/* ── Animation variants ── */
const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
};

export default function Hero() {
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
            style={{ background: "#050810" }}
        >
            {/* ── Grid overlay ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(29, 106, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(29, 106, 255, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "70px 70px",
                }}
            />

            {/* ── Deep blue radial glow — centre ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(29,106,255,0.14) 0%, transparent 70%)",
                }}
            />

            {/* ── Left floating glow blob ── */}
            <motion.div
                className="absolute top-[8%] left-[3%] w-80 h-80 rounded-full pointer-events-none"
                style={{ background: "rgba(29, 106, 255, 0.15)", filter: "blur(90px)" }}
                animate={{ y: [0, -28, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* ── Right floating glow blob ── */}
            <motion.div
                className="absolute bottom-[10%] right-[4%] w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "rgba(56, 189, 248, 0.1)", filter: "blur(80px)" }}
                animate={{ y: [0, 22, 0], scale: [1, 0.94, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
            {/* ── Top-right subtle white spot ── */}
            <motion.div
                className="absolute top-[15%] right-[12%] w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "rgba(255,255,255,0.04)", filter: "blur(60px)" }}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* ── Vertical divider line ── */}
            <motion.div
                className="absolute top-0 left-1/2 h-full w-px pointer-events-none"
                style={{
                    background: "linear-gradient(to bottom, transparent 5%, rgba(29,106,255,0.25) 40%, rgba(29,106,255,0.12) 70%, transparent 100%)",
                }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* ════════════════════════════
          MAIN CONTENT
         ════════════════════════════ */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-28">
                <motion.div
                    className="text-center max-w-4xl w-full"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {/* ── "HEY! I AM" label ── */}
                    <motion.p
                        variants={fadeUp}
                        className="font-dm text-xs md:text-sm tracking-[0.45em] uppercase mb-5 font-semibold"
                        style={{ color: "#4fa3ff" }}
                    >
                        HEY! I AM
                    </motion.p>

                    {/* ── Name ── */}
                    <motion.div variants={fadeUp} className="relative mb-7" style={{ lineHeight: 1 }}>
                        {/* Left half — electric blue on dark */}
                        <h1
                            aria-hidden="true"
                            className="font-syne text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-none select-none clip-left absolute inset-0 flex items-center justify-center"
                            style={{ color: "#4fa3ff" }}
                        >
                            Ashwani Kumar
                        </h1>
                        {/* Right half — pure white */}
                        <h1
                            aria-hidden="true"
                            className="font-syne text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-none select-none clip-right absolute inset-0 flex items-center justify-center"
                            style={{ color: "#f0f4ff" }}
                        >
                            Ashwani Kumar
                        </h1>
                        {/* Invisible height-setting copy */}
                        <h1
                            className="font-syne text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-none opacity-0 pointer-events-none"
                        >
                            Ashwani Kumar
                        </h1>
                    </motion.div>

                    {/* ── Gradient divider ── */}
                    <motion.div
                        variants={fadeIn}
                        className="mx-auto mb-7 h-px w-28 rounded-full"
                        style={{ background: "linear-gradient(to right, transparent, #1d6aff, #4fa3ff, transparent)" }}
                    />

                    {/* ── Role line ── */}
                    <motion.p
                        variants={fadeUp}
                        className="font-syne text-lg sm:text-2xl md:text-3xl font-bold mb-10"
                    >
                        <span className="font-dm font-light mr-2" style={{ color: "#8899bb" }}>
                            I&apos;m a
                        </span>
                        <span
                            style={{
                                background: "linear-gradient(90deg, #1d6aff 0%, #4fa3ff 55%, #e0f2fe 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            {roles.join(" | ")}
                        </span>
                        <span
                            className="cursor-blink ml-1"
                            style={{
                                background: "linear-gradient(90deg, #1d6aff, #4fa3ff)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            |
                        </span>
                    </motion.p>

                    {/* ── CTA Buttons ── */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="font-syne px-8 py-3.5 rounded-full text-sm tracking-widest uppercase font-bold text-white shadow-lg transition-shadow"
                            style={{
                                background: "linear-gradient(135deg, #1d6aff, #4fa3ff)",
                                boxShadow: "0 0 24px rgba(29,106,255,0.35)",
                            }}
                        >
                            View Work
                        </motion.a>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="font-syne px-8 py-3.5 rounded-full text-sm tracking-widest uppercase font-bold transition-all"
                            style={{
                                border: "1.5px solid rgba(29,106,255,0.5)",
                                color: "#4fa3ff",
                                background: "rgba(29,106,255,0.06)",
                            }}
                        >
                            Contact Me
                        </motion.a>
                    </motion.div>

                    {/* ── Social links ── */}
                    <motion.div
                        variants={fadeIn}
                        className="flex items-center justify-center gap-8 mt-12"
                    >
                        {["GitHub", "LinkedIn"].map((name) => (
                            <motion.a
                                key={name}
                                href="#"
                                whileHover={{ y: -3, color: "#4fa3ff" }}
                                className="font-dm text-xs tracking-widest uppercase transition-colors"
                                style={{ color: "#8899bb" }}
                            >
                                {name}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* ── Scroll indicator ── */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
            >
                <span className="font-dm text-[10px] tracking-[0.35em] uppercase" style={{ color: "#8899bb" }}>
                    Scroll
                </span>
                <motion.div
                    className="w-px h-10 rounded-full"
                    style={{ background: "linear-gradient(to bottom, #1d6aff, transparent)" }}
                    animate={{ scaleY: [0, 1, 0], originY: "top" }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </section>
    );
}
