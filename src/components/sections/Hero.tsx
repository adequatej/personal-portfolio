"use client";

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icons';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { incrementVisitorCount, subscribeToVisitorCount } from '@/lib/firebase';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/adequatej',
    icon: Icons.github
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/jed-geoghegan',
    icon: Icons.linkedin
  },
];

export function Hero() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Increment count on page load
    incrementVisitorCount();
    
    // Subscribe to real-time updates
    const unsubscribe = subscribeToVisitorCount((count) => {
      setVisitorCount(count);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center relative overflow-hidden py-12 md:py-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <Container className="relative w-full">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 w-full"
          >
            {/* Greeting */}
            <div className="space-y-2">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 dark:from-purple-400 dark:to-indigo-500"
              >
                Hi there, I'm
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
              >
                Jed Geoghegan
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-2xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-300"
              >
                I'm a{' '}
                <TypeAnimation
                  sequence={[
                    'Frontend Developer',
                    2000,
                    'Full Stack Developer',
                    2000,
                    'Software Engineer',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 dark:from-purple-400 dark:to-indigo-500 font-medium"
                />
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed"
            >
              Building beautiful and user-focused web applications that create meaningful impact through modern technology.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" href="#contact" className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 dark:from-purple-500 dark:via-indigo-500 dark:to-indigo-600 hover:from-orange-500 hover:via-orange-600 hover:to-red-600 dark:hover:from-purple-600 dark:hover:via-indigo-600 dark:hover:to-indigo-700">
                Get in Touch
              </Button>
              <Button size="lg" variant="outline" href="#projects" className="border-orange-400 dark:border-purple-500 text-orange-500 dark:text-purple-400 hover:bg-orange-50 dark:hover:bg-purple-900/20">
                View Projects
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="space-y-3"
            >
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 
                             dark:hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  >
                    <link.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
              
              {/* Visitor Count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
              >
                <Icons.users className="w-4 h-4" />
                <span>{visitorCount.toLocaleString()} visitors</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-square max-w-md mx-auto"
          >
            <div className="relative z-10 group">
              {/* Animated glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-red-500 dark:from-purple-400 dark:to-indigo-500 rounded-full opacity-75 group-hover:opacity-100 blur-md group-hover:blur-xl transition-all duration-300 animate-pulse-slow"></div>
              
              <div className="relative overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-lg bg-white dark:bg-gray-800 transition-transform duration-300 group-hover:scale-[0.98]">
                <img
                  src="/IMG_6600.jpeg"
                  alt="Hero"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
