"use client";

import { motion } from 'framer-motion';

export function Contact() {
  return (
    <section id="contact" className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <div className="max-w-2xl mx-auto">
            {/* Filler for Contact form will be added later */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
