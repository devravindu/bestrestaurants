import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ 
  subsets: ["latin"], 
  variable: "--font-fraunces" 
});

const publicSans = Public_Sans({ 
  subsets: ["latin"], 
  variable: "--font-public-sans" 
});

export const metadata: Metadata = {
  title: "BestRestaurants.lk",
  description: "Discover Sri Lanka's ultimate dining experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${publicSans.variable}`}>
      <body className="bg-paper text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}