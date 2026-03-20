"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
    { label: "HOME", href: "#home" },
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
                    className="flex items-center justify-center gap-10 px-7 py-3.5"
                    style={{
                        background: "#0a0a0a",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
                    }}
                >

                    {/* ── Nav Links ── */}
                    {links.map((l) => (
                        <motion.a
                            key={l.href}
                            href={l.href}
                            onClick={() => setActive(l.href)}
                            className="relative text-xs font-semibold tracking-widest"
                            style={{
                                color: active === l.href ? "#ffffff" : "rgba(255,255,255,0.55)",
                                letterSpacing: "0.12em",
                            }}
                            whileHover={{
                                color: "#ffffff",
                                textShadow: "0 0 8px rgba(0,200,83,0.6), 0 0 20px rgba(0,230,118,0.3)",
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

                    {/* ── LET'S TALK Button ── */}
                    <motion.a
                        href="#contact"
                        onHoverStart={() => setHoverTalk(true)}
                        onHoverEnd={() => setHoverTalk(false)}
                        whileTap={{ scale: 0.96 }}
                        className="flex-shrink-0 relative overflow-hidden text-xs font-bold tracking-widest px-5 py-2.5 rounded-full transition-colors duration-300"
                        style={{
                            border: "1.5px solid rgba(0,230,118,0.8)",
                            color: hoverTalk ? "#000000" : "#00e676",
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
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 w-full z-50 lg:hidden"
                style={{
                    background: "rgba(0,0,0,0.95)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(20px)",
                }}
            >
                <div className="flex items-center justify-between px-5 py-4">
                    {/* Logo / Home */}
                    <a href="#home" onClick={() => setActive("#home")}>
                        <span className="text-xs font-semibold tracking-widest text-white uppercase"
                            style={{ letterSpacing: "0.12em" }}
                        >
                            HOME
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
