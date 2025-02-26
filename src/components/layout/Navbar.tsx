"use client";

import { NAV_ITEMS } from "@/lib/constants/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-bold">
              Your Name
            </Link>
          </div>
          <div className="hidden sm:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
