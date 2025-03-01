"use client";

import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icons';
import { motion } from 'framer-motion';
import { useState } from 'react';

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    title: 'NakamaRecs',
    description: 'An AI-powered anime recommendation system using collaborative and content-based filtering, processing 10,000+ anime records to deliver personalized suggestions. Built with TensorFlow Recommenders and FastAPI, featuring a Streamlit frontend for intuitive user interaction',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'Streamlit'],
    image: '/projects/project1.png',
    github: 'https://github.com/yourusername/project1',
    demo: 'https://project1-demo.com'
  },
  {
    title: 'HuddleChat',
    description: 'A real-time chat application built with React, TypeScript, and Tailwind CSS. It allows users to chat with each other in real-time and share files.',
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind', 'MongoDB', 'ShadCN'],
    image: '/projects/project1.png',
    github: 'https://github.com/yourusername/project1',
    demo: 'https://project1-demo.com'
  },
];

const allTags = Array.from(new Set(projects.flatMap(project => project.tags))).sort();

export function Projects() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = selectedTag
    ? projects.filter(project => project.tags.includes(selectedTag))
    : projects;

  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Featured Projects
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience.
            </p>
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedTag === null ? 'default' : 'ghost'}
              onClick={() => setSelectedTag(null)}
            >
              All
            </Button>
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? 'default' : 'ghost'}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden group">
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 
                                   text-gray-600 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 
                                   dark:text-gray-300 dark:hover:text-white transition-colors"
                        >
                          <Icons.github className="w-5 h-5" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 
                                   dark:text-gray-300 dark:hover:text-white transition-colors"
                        >
                          <Icons.external className="w-5 h-5" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
