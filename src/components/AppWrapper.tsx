"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import InteractiveGrid from "@/components/InteractiveGrid";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <InteractiveGrid />
            {children}
        </ThemeProvider>
    );
}
