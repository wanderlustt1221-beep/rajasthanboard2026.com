// app/layout.tsx

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Board Exam Papers 2026 | Rajasthan Board Class 9 & 11 Exam Papers",
  description:
    "Free Exam Papers for Class 9 & 11 Students. View most expected questions before board exams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} bg-[#f8f6f2] text-[#1e3a5f]`}
      >
        {children}
      </body>
    </html>
  );
}