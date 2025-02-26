"use client";

import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="py-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <p className="text-foreground/80">
                Your bio text here...
              </p>
            </div>
            <div className="space-y-8">
              <h3 className="text-xl font-semibold">Skills</h3>
              {/* My Specific Skills will be added later */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
