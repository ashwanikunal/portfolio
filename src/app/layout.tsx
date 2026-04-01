import type { Metadata } from "next";
import "./globals.css";
import AppWrapper from "@/components/AppWrapper";

export const metadata: Metadata = {
  title: "Ashwani Kumar — 3D Artist · Web Developer",
  description:
    "Portfolio of Ashwani Kumar — a creative 3D Artist and Web Developer crafting immersive digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
