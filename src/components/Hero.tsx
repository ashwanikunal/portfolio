"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import InteractiveGrid from "./InteractiveGrid";

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
    visible: { opacity: 1, transition: { duration: 0.9, ease: [0, 0, 0.58, 1] as const } },
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
            style={{ background: "#000000" }}
        >
            {/* ── Interactive grid — lights up on hover ── */}
            <InteractiveGrid />

            {/* ── Green radial glow — left side ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 60% 70% at 25% 50%, rgba(0,200,83,0.08) 0%, transparent 70%)",
                }}
            />

            {/* ── Left floating glow blob ── */}
            <motion.div
                className="absolute top-[15%] left-[5%] w-72 h-72 rounded-full pointer-events-none"
                style={{ background: "rgba(0, 200, 83, 0.10)", filter: "blur(90px)" }}
                animate={{ y: [0, -28, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* ── Right side subtle glow ── */}
            <motion.div
                className="absolute bottom-[20%] right-[10%] w-64 h-64 rounded-full pointer-events-none"
                style={{ background: "rgba(105, 240, 174, 0.05)", filter: "blur(80px)" }}
                animate={{ y: [0, 22, 0], scale: [1, 0.94, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />

            {/* ── Vertical divider line at ~55% ── */}
            <motion.div
                className="absolute top-0 h-full w-px pointer-events-none hidden lg:block"
                style={{
                    left: "55%",
                    background: "linear-gradient(to bottom, transparent 5%, rgba(0,200,83,0.15) 40%, rgba(0,200,83,0.06) 70%, transparent 100%)",
                }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* ════════════════════════════
          MAIN CONTENT — SPLIT LAYOUT
         ════════════════════════════ */}
            <div className="relative z-10 flex items-center min-h-screen px-6 sm:px-10 lg:px-16 xl:px-24 pt-24 pb-16">
                <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* ── LEFT COLUMN — Text content ── */}
                    <motion.div
                        className="flex flex-col items-start"
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* ── "HEY! I AM" label ── */}
                        <motion.p
                            variants={fadeUp}
                            className="font-dm text-xs md:text-sm tracking-[0.45em] uppercase mb-5 font-semibold"
                            style={{ color: "#00e676" }}
                        >
                            HEY! I AM
                        </motion.p>

                        {/* ── Name ── */}
                        <motion.div variants={fadeUp} className="mb-5">
                            <h1
                                className="font-syne text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.05]"
                                style={{ color: "#ffffff" }}
                            >
                                Ashwani
                            </h1>
                            <h1
                                className="font-syne text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.05]"
                                style={{ color: "#00e676" }}
                            >
                                Kumar
                            </h1>
                        </motion.div>

                        {/* ── Gradient divider ── */}
                        <motion.div
                            variants={fadeIn}
                            className="mb-6 h-px w-24 rounded-full"
                            style={{ background: "linear-gradient(to right, #00c853, #00e676, transparent)" }}
                        />

                        {/* ── Role line ── */}
                        <motion.p
                            variants={fadeUp}
                            className="font-syne text-lg sm:text-xl md:text-2xl font-bold mb-8"
                        >
                            <span className="font-dm font-light mr-2" style={{ color: "#9e9e9e" }}>
                                I&apos;m a
                            </span>
                            <span
                                style={{
                                    background: "linear-gradient(90deg, #00c853 0%, #00e676 55%, #b9f6ca 100%)",
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
                                    background: "linear-gradient(90deg, #00c853, #00e676)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                |
                            </span>
                        </motion.p>

                        {/* ── Description ── */}
                        <motion.p
                            variants={fadeUp}
                            className="font-dm text-sm md:text-base leading-relaxed mb-10 max-w-lg"
                            style={{ color: "#9e9e9e" }}
                        >
                            I craft visually stunning 3D worlds, build robust full‑stack web applications,
                            and design engaging digital experiences that leave a lasting impression.
                        </motion.p>

                        {/* ── CTA Buttons ── */}
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-wrap items-center gap-4 mb-10"
                        >
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="font-syne px-8 py-3.5 rounded-full text-sm tracking-widest uppercase font-bold text-black shadow-lg transition-shadow"
                                style={{
                                    background: "linear-gradient(135deg, #00c853, #00e676)",
                                    boxShadow: "0 0 24px rgba(0,200,83,0.35)",
                                }}
                            >
                                View My Projects
                            </motion.a>
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="font-syne px-8 py-3.5 rounded-full text-sm tracking-widest uppercase font-bold transition-all"
                                style={{
                                    border: "1.5px solid rgba(0,200,83,0.5)",
                                    color: "#00e676",
                                    background: "rgba(0,200,83,0.06)",
                                }}
                            >
                                Contact Me
                            </motion.a>
                        </motion.div>

                        {/* ── Social links ── */}
                        <motion.div
                            variants={fadeIn}
                            className="flex items-center gap-8"
                        >
                            {["GitHub", "LinkedIn"].map((name) => (
                                <motion.a
                                    key={name}
                                    href="#"
                                    whileHover={{ y: -3, color: "#00e676" }}
                                    className="font-dm text-xs tracking-widest uppercase transition-colors"
                                    style={{ color: "#9e9e9e" }}
                                >
                                    {name}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* ── RIGHT COLUMN — Photo placeholder (blank for now) ── */}
                    <motion.div
                        className="hidden lg:flex items-center justify-center relative"
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative w-full aspect-square max-w-md">
                            {/* Decorative circle outline */}
                            <div
                                className="absolute inset-4 rounded-full"
                                style={{
                                    border: "1px solid rgba(0,200,83,0.12)",
                                }}
                            />
                            {/* Inner subtle glow circle */}
                            <div
                                className="absolute inset-12 rounded-full"
                                style={{
                                    background: "radial-gradient(circle, rgba(0,200,83,0.04) 0%, transparent 70%)",
                                    border: "1px solid rgba(0,200,83,0.06)",
                                }}
                            />
                            {/* Small floating accent dots */}
                            <motion.div
                                className="absolute top-8 right-8 w-2 h-2 rounded-full"
                                style={{ background: "#00e676", boxShadow: "0 0 10px rgba(0,230,118,0.6)" }}
                                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute bottom-12 left-6 w-1.5 h-1.5 rounded-full"
                                style={{ background: "#69f0ae", boxShadow: "0 0 8px rgba(105,240,174,0.5)" }}
                                animate={{ y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            />
                            <motion.div
                                className="absolute top-1/2 right-2 w-1 h-1 rounded-full"
                                style={{ background: "#ffffff", opacity: 0.3 }}
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── Scroll indicator ── */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
            >
                <span className="font-dm text-[10px] tracking-[0.35em] uppercase" style={{ color: "#9e9e9e" }}>
                    Scroll
                </span>
                <motion.div
                    className="w-px h-10 rounded-full"
                    style={{ background: "linear-gradient(to bottom, #00c853, transparent)" }}
                    animate={{ scaleY: [0, 1, 0], originY: "top" }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </section>
    );
}
