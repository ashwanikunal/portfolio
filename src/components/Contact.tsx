"use client";

import { FormEvent, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const socials = [
    {
        label: "GitHub",
        href: "https://github.com",
        icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5C5.37.5 0 5.78 0 12.3c0 5.21 3.43 9.64 8.2 11.21.6.11.82-.26.82-.57v-2.01c-3.34.72-4.04-1.61-4.04-1.61-.55-1.37-1.33-1.74-1.33-1.74-1.09-.74.08-.72.08-.72 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .31.21.69.82.57C20.57 21.94 24 17.51 24 12.3 24 5.78 18.63.5 12 .5z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com",
        icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
            </svg>
        ),
    },
    {
        label: "Twitter / X",
        href: "https://twitter.com",
        icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3L17.61 20.65z" />
            </svg>
        ),
    },
];

const inputClass = `
  w-full rounded-xl border px-5 py-3 text-sm text-white
  placeholder-[var(--text-secondary)] outline-none transition-all
  focus:ring-1 focus:ring-indigo-500/40
  bg-white/5 border-[var(--border-subtle)] focus:border-indigo-500/50
`;

export default function Contact() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section
            id="contact"
            ref={ref}
            className="relative px-6 py-28 overflow-hidden"
            style={{ background: "var(--bg-secondary)" }}
        >
            {/* Background glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, #a855f7, transparent)" }}
            />

            <div className="mx-auto max-w-6xl" ref={ref}>
                {/* Heading */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55 }}
                    className="mb-2 text-sm font-semibold uppercase tracking-widest"
                    style={{ color: "var(--accent-cyan)" }}
                >
                    Get In Touch
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.1 }}
                    className="font-syne mb-14 text-3xl font-bold md:text-4xl"
                >
                    Let&apos;s <span className="gradient-text">create together</span>
                </motion.h2>

                <div className="grid gap-14 lg:grid-cols-2 items-start">
                    {/* ── Contact Form ── */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-4"
                    >
                        {submitted ? (
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-green-500/20 bg-green-500/5 p-14 text-center"
                            >
                                <span className="text-4xl">🎉</span>
                                <p className="text-lg font-semibold text-green-400">Message sent!</p>
                                <p className="text-sm text-[var(--text-secondary)]">
                                    Thanks for reaching out — I&apos;ll get back to you within 24 hours.
                                </p>
                            </motion.div>
                        ) : (
                            <>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <input id="contact-name" type="text" placeholder="Your Name" required className={inputClass} />
                                    <input id="contact-email" type="email" placeholder="Your Email" required className={inputClass} />
                                </div>
                                <input id="contact-subject" type="text" placeholder="Subject" className={inputClass} />
                                <textarea
                                    id="contact-message"
                                    placeholder="Tell me about your project…"
                                    rows={5}
                                    required
                                    className={`${inputClass} resize-none`}
                                />
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.03, y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full rounded-full py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-shadow hover:shadow-indigo-500/40"
                                    style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
                                >
                                    Send Message ✦
                                </motion.button>
                            </>
                        )}
                    </motion.form>

                    {/* ── Info + Social links ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-8"
                    >
                        {/* Description */}
                        <div className="space-y-3 text-[var(--text-secondary)] leading-relaxed text-sm">
                            <p>
                                Have a <strong className="text-white">3D project</strong>, a{" "}
                                <strong className="text-white">web product</strong> you want to build, or a{" "}
                                <strong className="text-white">game idea</strong> to bring to life? Let&apos;s
                                collaborate!
                            </p>
                            <p>
                                I&apos;m currently available for freelance projects and internships.
                                Drop me a message and I&apos;ll respond within 24 hours.
                            </p>
                        </div>

                        {/* Info items */}
                        {[
                            { icon: "📧", label: "Email", value: "ashwanik0805@gmail.com" },
                            { icon: "⏰", label: "Availability", value: "Internship, Freelance & Open Source" },
                        ].map((item) => (
                            <div key={item.label} className="flex items-start gap-4">
                                <span className="text-2xl mt-0.5">{item.icon}</span>
                                <div>
                                    <p className="text-xs uppercase tracking-widest font-semibold text-[var(--text-secondary)] mb-0.5">
                                        {item.label}
                                    </p>
                                    <p className="text-sm text-white font-medium">{item.value}</p>
                                </div>
                            </div>
                        ))}

                        {/* Social icons */}
                        <div>
                            <p className="text-xs uppercase tracking-widest font-semibold text-[var(--text-secondary)] mb-3">
                                Follow me
                            </p>
                            <div className="flex gap-3">
                                {socials.map((s) => (
                                    <motion.a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.label}
                                        whileHover={{ scale: 1.12, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex h-11 w-11 items-center justify-center rounded-full border transition-all hover:border-indigo-500/50 hover:text-white hover:bg-indigo-500/10"
                                        style={{
                                            borderColor: "var(--border-subtle)",
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        {s.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <div className="mx-auto mt-20 max-w-6xl border-t pt-8 text-center text-sm text-[var(--text-secondary)]" style={{ borderColor: "var(--border-subtle)" }}>
                <p>
                    Designed & built by{" "}
                    <span className="font-semibold text-white">Ashwani Kumar</span> ·{" "}
                    {new Date().getFullYear()}
                </p>
            </div>
        </section>
    );
}
