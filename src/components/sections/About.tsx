"use client";

import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/useMediaQuery';

const skills = [
  { name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { name: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
  { name: 'Tools', items: ['Git', 'Docker', 'AWS', 'CI/CD'] },
  { name: 'Design', items: ['Figma', 'Adobe XD', 'UI/UX', 'Responsive Design'] },
];

export function About() {
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Container>
      <section className="py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              About Me
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              I'm a passionate developer with a love for creating beautiful,
              functional, and user-friendly applications.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {skills.map((skill) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <Card
                  className="h-full p-6 hover:border hover:border-blue-500/20 
                           transition-colors duration-300"
                  animate={false}
                >
                  <h3 className="text-xl font-semibold mb-4">{skill.name}</h3>
                  <ul className="space-y-2">
                    {skill.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center text-gray-600 dark:text-gray-300"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Bio Content */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">My Journey</h3>
              <p className="text-gray-600 dark:text-gray-300">
                With several years of experience in web development, I've worked on
                projects ranging from small business websites to large-scale
                enterprise applications. I'm constantly learning and adapting to new
                technologies to deliver the best possible solutions. YUHHHH
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 animate-pulse" />
                {/* Add your image here */}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </Container>
  );
}
