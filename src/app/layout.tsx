import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import { CustomCursor } from "@/components/layout/CustomCursor";
import ClickSpark from "@/components/effects/ClickSpark";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Jed Geoghegan",
  description: "Software Engineer — full-stack development, AI/ML, and building things that matter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}>
        <ThemeProvider>
          <ClickSpark sparkColor="#6366f1" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-14">
                {children}
              </main>
              <Footer />
              <CustomCursor />
              <Analytics />
            </div>
          </ClickSpark>
        </ThemeProvider>
      </body>
    </html>
  );
}
