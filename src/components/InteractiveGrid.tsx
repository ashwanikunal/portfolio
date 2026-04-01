"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTheme } from "@/context/ThemeContext";

const CELL_SIZE = 70;
const GLOW_RADIUS = 200; // px radius around cursor that lights up cells

interface Cell {
    x: number;
    y: number;
    opacity: number;
    targetOpacity: number;
}

export default function InteractiveGrid() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cellsRef = useRef<Cell[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const rafRef = useRef<number>(0);
    const colsRef = useRef(0);
    const rowsRef = useRef(0);

    // Theme-based colors
    const primaryGreen = isDark ? "0, 200, 83" : "0, 168, 67";
    const secondaryGreen = isDark ? "0, 230, 118" : "0, 200, 83";
    const gridLineColor = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)";

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        /* ── Setup grid dimensions ── */
        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const w = window.innerWidth;
            const h = window.innerHeight;

            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.scale(dpr, dpr);

            colsRef.current = Math.ceil(w / CELL_SIZE) + 1;
            rowsRef.current = Math.ceil(h / CELL_SIZE) + 1;

            // Rebuild cell array
            const cells: Cell[] = [];
            for (let row = 0; row < rowsRef.current; row++) {
                for (let col = 0; col < colsRef.current; col++) {
                    cells.push({
                        x: col * CELL_SIZE,
                        y: row * CELL_SIZE,
                        opacity: 0,
                        targetOpacity: 0,
                    });
                }
            }
            cellsRef.current = cells;
        };

        resize();
        window.addEventListener("resize", resize);

        /* ── Mouse tracking ── */
        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY,
            };
        };

        const onMouseLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 };
        };

        // Listen on the window for mouse events
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseleave", onMouseLeave);

        /* ── Render loop ── */
        const draw = () => {
            const w = canvas.width / (window.devicePixelRatio || 1);
            const h = canvas.height / (window.devicePixelRatio || 1);
            ctx.clearRect(0, 0, w, h);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            const cells = cellsRef.current;

            for (let i = 0; i < cells.length; i++) {
                const cell = cells[i];
                const centerX = cell.x + CELL_SIZE / 2;
                const centerY = cell.y + CELL_SIZE / 2;

                // Distance from mouse to cell center
                const dx = mx - centerX;
                const dy = my - centerY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Calculate target opacity based on distance
                if (dist < GLOW_RADIUS) {
                    cell.targetOpacity = (1 - dist / GLOW_RADIUS) * 0.6;
                } else {
                    cell.targetOpacity = 0;
                }

                // Smooth interpolation using GSAP-like easing (manual for perf)
                cell.opacity += (cell.targetOpacity - cell.opacity) * 0.12;

                // Only draw if visible
                if (cell.opacity > 0.005) {
                    // Draw cell fill (green glow)
                    ctx.fillStyle = `rgba(${primaryGreen}, ${cell.opacity * (isDark ? 0.35 : 0.25)})`;
                    ctx.fillRect(cell.x + 1, cell.y + 1, CELL_SIZE - 2, CELL_SIZE - 2);

                    // Draw cell border (brighter green)
                    ctx.strokeStyle = `rgba(${secondaryGreen}, ${cell.opacity * (isDark ? 0.5 : 0.4)})`;
                    ctx.lineWidth = 0.8;
                    ctx.strokeRect(cell.x + 0.5, cell.y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
                }
            }

            // Draw the static grid lines (very subtle)
            ctx.strokeStyle = gridLineColor;
            ctx.lineWidth = 0.5;

            for (let col = 0; col <= colsRef.current; col++) {
                ctx.beginPath();
                ctx.moveTo(col * CELL_SIZE, 0);
                ctx.lineTo(col * CELL_SIZE, h);
                ctx.stroke();
            }

            for (let row = 0; row <= rowsRef.current; row++) {
                ctx.beginPath();
                ctx.moveTo(0, row * CELL_SIZE);
                ctx.lineTo(w, row * CELL_SIZE);
                ctx.stroke();
            }

            rafRef.current = requestAnimationFrame(draw);
        };

        rafRef.current = requestAnimationFrame(draw);

        /* ── Initial entrance animation via GSAP ── */
        gsap.fromTo(
            canvas,
            { opacity: 0 },
            { opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.3 }
        );

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0 }}
        />
    );
}
