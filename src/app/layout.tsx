import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Familjen_Grotesk, Instrument_Serif } from "next/font/google";
import Navbar from "./homepage/layout/Navbar";
import AnimationOrchestrator from "@/components/AnimationOrchestrator";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const familjen = Familjen_Grotesk({
  variable: "--font-familjen",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Markition Media",
  description: "Markition Media — Digital Creative Agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${familjen.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#010c28] text-white" suppressHydrationWarning>
        <AnimationOrchestrator />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
