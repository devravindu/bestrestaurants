import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import "./globals.css";

// Configure the Fraunces display font
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

// Configure the Public Sans body font
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BestRestaurant.lk — Discover Sri Lanka's Ultimate Dining Experiences",
  description: "From street food legends to fine dining. Read reviews, explore menus, and find your next meal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* 
        Here is where the magic happens! 
        We inject the font variables and apply your custom bg-paper and text-ink colors globally.
      */}
      <body
        className={`${fraunces.variable} ${publicSans.variable} font-body bg-paper text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}