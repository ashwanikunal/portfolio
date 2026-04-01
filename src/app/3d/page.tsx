"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ThreeDPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const dotsRef = useRef<HTMLSpanElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // 1. Loader bar fills up
            tl.to(
                { val: 0 },
                {
                    val: 100,
                    duration: 3,
                    ease: "power2.inOut",
                    onUpdate: function () {
                        const v = Math.round(this.targets()[0].val);
                        setProgress(v);
                        if (barRef.current) {
                            barRef.current.style.width = `${v}%`;
                        }
                    },
                },
                0
            );

            // 2. After loading, reveal "Coming Soon"
            tl.to(
                progressRef.current,
                {
                    opacity: 0,
                    y: -30,
                    duration: 0.6,
                    ease: "power3.inOut",
                },
                3.2
            );

            tl.fromTo(
                textRef.current,
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                },
                3.5
            );

            tl.fromTo(
                subRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                },
                4.0
            );

            // 3. Animate dots
            tl.add(() => {
                if (dotsRef.current) {
                    let count = 0;
                    const interval = setInterval(() => {
                        count = (count + 1) % 4;
                        if (dotsRef.current) {
                            dotsRef.current.textContent = ".".repeat(count);
                        }
                    }, 500);
                    // Store for cleanup
                    (dotsRef as unknown as { _interval: NodeJS.Timeout })._interval = interval;
                }
            }, 4.0);

        }, containerRef);

        return () => {
            ctx.revert();
            const interval = (dotsRef as unknown as { _interval?: NodeJS.Timeout })?._interval;
            if (interval) clearInterval(interval);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Loading progress */}
            <div ref={progressRef} className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Spinner */}
                <div
                    className="mb-10"
                    style={{
                        width: 48,
                        height: 48,
                        border: "3px solid #e0e0e0",
                        borderTopColor: "#000",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                    }}
                />

                {/* Progress bar */}
                <div
                    className="relative overflow-hidden rounded-full"
                    style={{
                        width: 280,
                        height: 4,
                        background: "#e8e8e8",
                    }}
                >
                    <div
                        ref={barRef}
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                            width: "0%",
                            background: "var(--text-primary)",
                            transition: "width 0.05s linear",
                        }}
                    />
                </div>

                {/* Percentage */}
                <p
                    className="mt-4 font-mono text-sm tracking-widest"
                    style={{ color: "#999" }}
                >
                    {progress}%
                </p>
            </div>

            {/* Coming Soon text */}
            <div className="relative z-10 text-center px-6">
                <h1
                    ref={textRef}
                    className="font-syne font-black uppercase"
                    style={{
                        fontSize: "clamp(3rem, 10vw, 10rem)",
                        color: "var(--text-primary)",
                        letterSpacing: "-0.03em",
                        lineHeight: 0.95,
                        opacity: 0,
                    }}
                >
                    Coming
                    <br />
                    Soon<span ref={dotsRef} className="inline-block w-[3ch] text-left"></span>
                </h1>

                <p
                    ref={subRef}
                    className="mt-6 text-sm uppercase tracking-[0.3em] font-medium"
                    style={{ color: "#999", opacity: 0 }}
                >
                    3D Experience is under construction
                </p>

                {/* Back link */}
                <a
                    href="/"
                    className="inline-flex items-center gap-2 mt-10 text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full border transition-all duration-300 hover:opacity-70"
                    style={{ borderColor: "var(--text-primary)", color: "var(--text-primary)" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back 
                </a>
            </div>

            <style jsx>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
