"use client";

import { Container } from '@/components/layout/Container';
import { motion } from 'framer-motion';
import { Icons } from '../ui/Icons';

const highlights = [
  {
    icon: Icons.code,
    title: "Full Stack Development",
    description: "Building end-to-end applications with modern tech stacks"
  },
  {
    icon: Icons.layout,
    title: "Frontend Development",
    description: "Creating responsive and intuitive user interfaces"
  },
  {
    icon: Icons.terminal,
    title: "Software Engineering",
    description: "Implementing scalable solutions with best practices"
  }
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white dark:bg-gray-900">
      <Container>
        <div className="space-y-16">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.7,
              type: "spring",
              bounce: 0.3
            }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              About Me
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Building innovative solutions with modern technologies
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                bounce: 0.4
              }}
              className="flex items-center"
            >
              <div className="prose prose-lg dark:prose-invert space-y-6 h-full flex flex-col justify-center">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-lg leading-relaxed"
                >
                  Hey! I'm a <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 dark:from-purple-400 dark:to-indigo-500">Full Stack Developer</span> who loves 
                  building cool stuff. Currently studying with a focus on a BS in Computer Science at <span className="font-medium">WPI</span> and a MS 
                  in Computer Science as well.
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-lg leading-relaxed"
                >
                  I've transitioned from cyber security and now I'm all about creating full-stack applications 
                  that look great and work even better. I'm also interested in Software Engineering, Frontend Development, and ML/AI. When I'm not coding, you'll find me hanging out with friends, 
                  playing soccer/working out, or exploring new things.
                </motion.p>
              </div>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                bounce: 0.4
              }}
              className="grid gap-4 content-center"
            >
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    bounce: 0.3
                  }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="col-span-1"
                >
                  <div className="p-3 space-y-2 rounded-xl border border-gray-200 dark:border-gray-800 
                    bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm
                    hover:shadow-xl hover:shadow-orange-500/5 dark:hover:shadow-purple-500/5
                    hover:border-orange-200 dark:hover:border-purple-500/30
                    group transition-all duration-300 h-full"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 w-fit rounded-lg 
                        bg-gradient-to-br from-orange-400 via-orange-300 to-red-400/40 
                        dark:from-purple-500 dark:via-indigo-500/50 dark:to-indigo-600/30
                        group-hover:from-orange-400 group-hover:via-orange-300 group-hover:to-red-400/60 
                        dark:group-hover:from-purple-500 dark:group-hover:via-indigo-500/70 dark:group-hover:to-indigo-600/50
                        transition-all duration-300"
                      >
                        <highlight.icon className="w-5 h-5 text-white dark:text-white" />
                      </div>
                      
                      <h3 className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-900 dark:from-white dark:to-gray-200">
                        {highlight.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 pl-10">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
