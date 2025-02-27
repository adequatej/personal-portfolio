"use client";

import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <Container>
      <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block">Hi, I'm</span>
              <span className="block dark:text-purple-500 text-orange-500 transition-colors duration-300">
                Jed Geoghegan
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300">
              Full-Stack Developer specializing in modern web applications
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="dark:bg-purple-500 dark:hover:bg-purple-600 bg-orange-500 hover:bg-orange-600 transition-colors duration-300"
              >
                View My Work
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="dark:border-purple-500 dark:text-purple-500 dark:hover:bg-purple-950 
                         border-orange-500 text-orange-500 hover:bg-orange-50
                         transition-colors duration-300"
              >
                Contact Me
              </Button>
            </div>
          </motion.div>

          {/* Image or illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-square max-w-md mx-auto lg:ml-auto"
          >
            <div className="w-full h-full rounded-full dark:bg-gradient-to-tr dark:from-purple-500 dark:to-blue-500 
                          bg-gradient-to-tr from-orange-500 to-yellow-500 
                          opacity-20 animate-pulse transition-colors duration-300" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            y: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-gray-400 dark:bg-gray-600" />
          </div>
        </motion.div>
      </div>
    </Container>
  );
}
