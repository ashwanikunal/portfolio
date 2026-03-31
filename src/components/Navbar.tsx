"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const links = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT ME", href: "#about" },
    { label: "SERVICES", href: "#services" },
    { label: "PROJECTS", href: "#projects" },
    { label: "WORK PROCESS", href: "#work-process" },
    { label: "3D", href: "/3d" },
];

/* ── Sun Icon ── */
const SunIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

/* ── Moon Icon ── */
const MoonIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState("#home");
    const [hoverTalk, setHoverTalk] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === "dark";

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
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
                className="fixed top-5 left-1/2 z-50 hidden lg:block"
            >
                <div
                    className="flex items-center justify-center gap-7 px-7 py-3.5"
                    style={{
                        background: "var(--nav-bg)",
                        borderRadius: "999px",
                        border: `1px solid var(--nav-border)`,
                        boxShadow: `0 8px 40px var(--shadow-card), 0 0 0 0.5px var(--nav-border) inset`,
                        backdropFilter: isDark ? "none" : "blur(20px)",
                        WebkitBackdropFilter: isDark ? "none" : "blur(20px)",
                        transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                    }}
                >

                    {/* ── Nav Links ── */}
                    {links.map((l) => (
                        <motion.a
                            key={l.href}
                            href={l.href}
                            onClick={() => setActive(l.href)}
                            className="relative text-xs font-semibold tracking-widest whitespace-nowrap"
                            style={{
                                color: active === l.href ? "var(--text-primary)" : "var(--text-secondary)",
                                letterSpacing: "0.12em",
                            }}
                            whileHover={{
                                color: "var(--text-primary)",
                                textShadow: isDark ? "0 0 8px rgba(0,200,83,0.6), 0 0 20px rgba(0,230,118,0.3)" : "none",
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            {l.label}
                            {/* Active dot */}
                            {active === l.href && (
                                <motion.span
                                    layoutId="nav-dot"
                                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                                    style={{ background: "#00e676", boxShadow: "0 0 6px rgba(0,230,118,0.8)" }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </motion.a>
                    ))}

                    {/* ── Theme Toggle ── */}
                    <motion.button
                        onClick={toggleTheme}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Toggle theme"
                        className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300"
                        style={{
                            background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                            color: isDark ? "#00e676" : "#00a843",
                        }}
                    >
                        <motion.div
                            key={theme}
                            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                            animate={{ rotate: 0, opacity: 1, scale: 1 }}
                            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {isDark ? <SunIcon /> : <MoonIcon />}
                        </motion.div>
                    </motion.button>

                    {/* ── LET'S TALK Button ── */}
                    <motion.a
                        href="#contact"
                        onHoverStart={() => setHoverTalk(true)}
                        onHoverEnd={() => setHoverTalk(false)}
                        whileTap={{ scale: 0.96 }}
                        className="flex-shrink-0 relative overflow-hidden text-xs font-bold tracking-widest px-5 py-2.5 rounded-full transition-colors duration-300"
                        style={{
                            border: "1.5px solid rgba(0,230,118,0.8)",
                            color: hoverTalk ? (isDark ? "#000000" : "#ffffff") : "#00e676",
                            letterSpacing: "0.1em",
                        }}
                    >
                        {/* Fill layer on hover */}
                        <motion.span
                            className="absolute inset-0 rounded-full"
                            style={{ background: "#00e676" }}
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
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
                className="fixed top-0 left-0 w-full z-50 lg:hidden"
                style={{
                    background: isDark ? "rgba(0,0,0,0.95)" : "rgba(255,255,255,0.95)",
                    borderBottom: `1px solid var(--nav-border)`,
                    backdropFilter: "blur(20px)",
                    transition: "background 0.4s ease",
                }}
            >
                <div className="flex items-center justify-between px-5 py-4">
                    {/* Logo / Home */}
                    <a href="#home" onClick={() => setActive("#home")}>
                        <span className="text-xs font-semibold tracking-widest uppercase"
                            style={{ color: "var(--text-primary)", letterSpacing: "0.12em" }}
                        >
                            HOME
                        </span>
                    </a>

                    <div className="flex items-center gap-3">
                        {/* Theme toggle (mobile) */}
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300"
                            style={{
                                background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                                color: isDark ? "#00e676" : "#00a843",
                            }}
                        >
                            {isDark ? <SunIcon /> : <MoonIcon />}
                        </button>

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
                                    className={`block h-0.5 rounded-full transition-all duration-300 ${i === 0
                                        ? menuOpen ? "w-6 translate-y-2 rotate-45" : "w-6"
                                        : i === 1
                                            ? menuOpen ? "w-0 opacity-0" : "w-4"
                                            : menuOpen ? "w-6 -translate-y-2 -rotate-45" : "w-6"
                                        }`}
                                    style={{ background: "var(--text-primary)" }}
                                />
                            ))}
                        </button>
                    </div>
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
                            style={{ borderColor: "var(--nav-border)" }}
                        >
                            <ul className="flex flex-col px-5 py-4 gap-1">
                                {links.map((l) => (
                                    <li key={l.href}>
                                        <a
                                            href={l.href}
                                            onClick={() => { setActive(l.href); setMenuOpen(false); }}
                                            className="block w-full rounded-lg px-4 py-3 text-xs font-semibold tracking-widest transition-colors"
                                            style={{
                                                color: active === l.href ? "var(--text-primary)" : "var(--text-secondary)",
                                                background: active === l.href ? "rgba(0,200,83,0.08)" : "transparent",
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
                                        className="block w-full rounded-full px-5 py-3 text-center text-xs font-bold tracking-widest border"
                                        style={{ borderColor: "rgba(0,230,118,0.5)", color: "#00e676" }}
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
