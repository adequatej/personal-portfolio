import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

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
      <body className={`${geist.variable} antialiased`}>
        <div className="relative">
          <ThemeToggle />
          {children}
        </div>
      </body>
    </html>
  );
}
