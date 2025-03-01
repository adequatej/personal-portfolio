"use client";

import { Container } from '@/components/layout/Container';
import { motion } from 'framer-motion';

type Skill = {
  name: string;
  level: number;
  icon: string;
};

const skills: Skill[] = [
  { name: 'React', level: 90, icon: '⚛️' },
  { name: 'TypeScript', level: 85, icon: '📘' },
  { name: 'Node.js', level: 80, icon: '🟢' },
  { name: 'Next.js', level: 85, icon: '▲' },
  { name: 'TailwindCSS', level: 90, icon: '🎨' },
  { name: 'Python', level: 75, icon: '🐍' },
  // Will add more skills as needed
];

const experiences = [
  {
    title: 'Frontend Developer',
    company: 'Pfizer',
    period: '2024 - 2024',
    description: 'Splunk Health and Victorian Experience'
  },
  {
    title: 'Full Stack Developer',
    company: 'OCF',
    period: '2025 - 2025',
    description: 'Digital Privacy and Civil Society Rights in Taiwan'
  },
  // Will add more experiences as needed
];

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="space-y-16">
          {/* About Me */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <div className="relative">
              <motion.div
                className="relative aspect-square rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src="/images/profile.jpg"
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </motion.div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  About Me
                </h2>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                  A passionate developer crafting beautiful and meaningful web experiences
                </p>
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  I'm a student at Worcester Polytechnic Institute. I specialize in React, TypeScript, and Node.js,
                  with a strong focus on creating performant and accessible user interfaces.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies,
                  contributing to open-source projects, or writing about web development
                  on my blog.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center">
              Skills & Technologies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative p-6 rounded-xl bg-white dark:bg-gray-800 
                                shadow-sm hover:shadow-md transition-shadow duration-200
                                flex flex-col items-center space-y-2 text-center">
                    <span className="text-3xl">{skill.icon}</span>
                    <h4 className="font-medium">{skill.name}</h4>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                      <motion.div
                        className="bg-primary h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center">
              Work Experience
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm
                                hover:shadow-md transition-shadow duration-200 space-y-2">
                    <h4 className="font-semibold text-lg">{experience.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {experience.company} • {experience.period}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {experience.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
