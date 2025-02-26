"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            Hi, I'm <span className="text-primary">Your Name</span>
          </h1>
          <p className="text-xl sm:text-2xl text-foreground/80 mb-8">
            Software Engineer & Full-Stack Developer
          </p>
          <motion.a
            href="#projects"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
