"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const socials = [
    { label: "GITHUB", href: "https://github.com/ashwanikunal" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/ashk3105/" },
    { label: "TWITTER", href: "https://twitter.com" },
    { label: "INSTAGRAM", href: "https://instagram.com" },
];

const ArrowUpRight = () => (
    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M2 10L10 2M10 2H4M10 2v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function Contact() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section
            id="contact"
            ref={ref}
            className="relative px-6 pt-28 pb-10 overflow-hidden"
            style={{ background: "var(--bg-primary)" }}
        >
            <div className="mx-auto max-w-6xl">
                {/* ── Tagline ── */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="font-dm text-xs tracking-[0.35em] uppercase mb-8"
                    style={{ color: "var(--accent-cyan)" }}
                >
                    Let&apos;s make something that means something.
                </motion.p>

                {/* ── Big email — hover shifts text & turns green ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10"
                >
                    <a
                        href="mailto:ashwanik0805@gmail.com"
                        className="email-link inline-block font-syne font-black uppercase leading-none tracking-tight transition-all duration-300"
                        style={{
                            fontSize: "clamp(1.8rem, 5.5vw, 5rem)",
                            color: "var(--text-primary)",
                            textDecoration: "none",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        ashwanik0805@gmail.com
                    </a>
                </motion.div>

                {/* ── Divider ── */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="h-px w-full origin-left mb-14"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(0,200,83,0.25) 0%, rgba(0,200,83,0.06) 80%, transparent 100%)",
                    }}
                />

                {/* ── Social links row ── */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="flex flex-wrap gap-8 mb-24"
                >
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link flex items-center gap-1.5 font-dm text-xs tracking-[0.2em] uppercase transition-colors duration-300"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {s.label}
                            <ArrowUpRight />
                        </a>
                    ))}
                </motion.div>

                {/* ── Footer copyright ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-wrap justify-between items-center pt-6 border-t"
                    style={{ borderColor: "var(--border-light)" }}
                >
                    <p className="font-dm text-[11px] tracking-[0.15em] uppercase" style={{ color: "var(--text-faint)" }}>
                        © {new Date().getFullYear()} Ashwani Kumar
                    </p>
                    <p className="font-dm text-[11px] tracking-[0.15em] uppercase" style={{ color: "var(--text-faint)" }}>
                        Built raw · Shipped with intent
                    </p>
                </motion.div>
            </div>

            {/* ── Hover styles ── */}
            <style jsx>{`
                .email-link:hover {
                    color: #00e676 !important;
                    transform: translateX(8px);
                    text-shadow: 0 0 30px rgba(0, 230, 118, 0.3);
                }

                .social-link:hover {
                    color: #00e676 !important;
                }
            `}</style>
        </section>
    );
}
