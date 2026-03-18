"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
    { label: "SERVICES", href: "#services" },
    { label: "PROJECTS", href: "#projects" },
    { label: "3D", href: "#return3d" },
    { label: "ABOUT ME", href: "#about" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState("#home");
    const [hoverTalk, setHoverTalk] = useState(false);

    /* ── Active section detection ── */
    useEffect(() => {
        const ids = links.map((l) => l.href.replace("#", ""));
        const observers: IntersectionObserver[] = [];

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
                { threshold: 0.35 }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    return (
        <>
            {/* ── Desktop Floating Pill Navbar ── */}
            <motion.nav
                initial={{ y: -60, opacity: 0, x: "-50%" }}
                animate={{ y: 0, opacity: 1, x: "-50%" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-5 left-1/2 z-50 hidden lg:block"
            >
                <div
                    className="flex items-center justify-between gap-10 px-7 py-3.5"
                    style={{
                        background: "#0a0a0a",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
                        minWidth: "720px",
                    }}
                >
                    {/* ── Logo ── */}
                    <a
                        href="#home"
                        className="flex-shrink-0"
                        onClick={() => setActive("#home")}
                    >
                        <span
                            className="font-syne text-lg font-extrabold tracking-widest text-white uppercase select-none"
                            style={{ letterSpacing: "0.08em" }}
                        >
                            Ashwani
                        </span>
                    </a>

                    {/* ── Nav Links ── */}
                    <ul className="flex items-center gap-8">
                        {links.map((l) => (
                            <li key={l.href}>
                                <a
                                    href={l.href}
                                    onClick={() => setActive(l.href)}
                                    className="relative text-xs font-semibold tracking-widest transition-colors duration-200"
                                    style={{
                                        color: active === l.href ? "#ffffff" : "rgba(255,255,255,0.55)",
                                        letterSpacing: "0.12em",
                                    }}
                                >
                                    {l.label}
                                    {/* Active dot */}
                                    {active === l.href && (
                                        <motion.span
                                            layoutId="nav-dot"
                                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* ── LET'S TALK Button ── */}
                    <motion.a
                        href="#contact"
                        onHoverStart={() => setHoverTalk(true)}
                        onHoverEnd={() => setHoverTalk(false)}
                        whileTap={{ scale: 0.96 }}
                        className="flex-shrink-0 relative overflow-hidden text-xs font-bold tracking-widest px-5 py-2.5 rounded-full transition-colors duration-300"
                        style={{
                            border: "1.5px solid rgba(255,255,255,0.8)",
                            color: hoverTalk ? "#0a0a0a" : "#ffffff",
                            letterSpacing: "0.1em",
                        }}
                    >
                        {/* Fill layer on hover */}
                        <motion.span
                            className="absolute inset-0 rounded-full"
                            style={{ background: "#ffffff" }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={hoverTalk
                                ? { scale: 1, opacity: 1 }
                                : { scale: 0, opacity: 0 }
                            }
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        />
                        <span className="relative z-10">LET&apos;S TALK</span>
                    </motion.a>
                </div>
            </motion.nav>

            {/* ── Mobile Navbar ── */}
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 w-full z-50 lg:hidden"
                style={{
                    background: "rgba(10,10,10,0.95)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(20px)",
                }}
            >
                <div className="flex items-center justify-between px-5 py-4">
                    {/* Logo */}
                    <a href="#home" onClick={() => setActive("#home")}>
                        <span className="font-syne text-base font-extrabold tracking-widest text-white uppercase">
                            Ashwani
                        </span>
                    </a>

                    {/* Hamburger */}
                    <button
                        id="mobile-menu-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation menu"
                        className="flex flex-col items-center justify-center gap-1.5 p-2"
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                className={`block h-0.5 rounded-full bg-white transition-all duration-300 ${i === 0
                                    ? menuOpen ? "w-6 translate-y-2 rotate-45" : "w-6"
                                    : i === 1
                                        ? menuOpen ? "w-0 opacity-0" : "w-4"
                                        : menuOpen ? "w-6 -translate-y-2 -rotate-45" : "w-6"
                                    }`}
                            />
                        ))}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            key="mobile-menu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: "easeInOut" }}
                            className="overflow-hidden border-t"
                            style={{ borderColor: "rgba(255,255,255,0.06)" }}
                        >
                            <ul className="flex flex-col px-5 py-4 gap-1">
                                {links.map((l) => (
                                    <li key={l.href}>
                                        <a
                                            href={l.href}
                                            onClick={() => { setActive(l.href); setMenuOpen(false); }}
                                            className="block w-full rounded-lg px-4 py-3 text-xs font-semibold tracking-widest transition-colors"
                                            style={{
                                                color: active === l.href ? "#fff" : "rgba(255,255,255,0.5)",
                                                background: active === l.href ? "rgba(255,255,255,0.05)" : "transparent",
                                            }}
                                        >
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                                <li className="mt-3">
                                    <a
                                        href="#contact"
                                        onClick={() => setMenuOpen(false)}
                                        className="block w-full rounded-full px-5 py-3 text-center text-xs font-bold tracking-widest text-white border"
                                        style={{ borderColor: "rgba(255,255,255,0.5)" }}
                                    >
                                        LET&apos;S TALK
                                    </a>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
}
