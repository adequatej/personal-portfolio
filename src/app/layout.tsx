import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import { BackgroundSelector } from "@/components/effects/BackgroundSelector";
import { Navbar } from "@/components/layout/Navbar";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Jed Geoghegan | Portfolio",
  description: "Front-end Engineer, Software Engineer, and Full-Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} font-sans antialiased min-h-screen`}>
        <ThemeProvider>
          <div className="relative flex flex-col min-h-screen">
            <BackgroundSelector />
            <Navbar />
            <main className="flex-grow pt-16">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
