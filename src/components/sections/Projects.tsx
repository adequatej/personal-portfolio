"use client";

import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/ui/Icons';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog';

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
    title: 'Huddle Chat',
    description: 'A real-time chat application built with Next.js, React, TypeScript, and MongoDB. Features modern UI with TailwindCSS/ShadCN and seamless user interactions.',
    tags: ['Next.js', 'TypeScript', 'React', 'TailwindCSS', 'Git', 'ShadCN', 'MongoDB', 'Node.js', 'Vercel'],
    image: 'https://cdn.midjourney.com/414d8fdb-56c4-4c3d-9cd0-2ae948d26f4b/0_3.png',
    github: 'https://github.com/adequatej/huddle-chat',
    demo: 'https://huddle-chat-pi.vercel.app/'
  },
  {
    title: 'NakamaRecs',
    description: 'An anime recommendation system built with Python and modern ML frameworks. Utilizes TensorFlow, Scikit-learn, and FastAPI to deliver personalized movie suggestions.',
    tags: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'FastAPI', 'Streamlit'],
    image: 'https://cdn.midjourney.com/c47ff73d-bbda-409c-ab7e-af2994951121/0_3.png',
    github: 'https://github.com/adequatej/NakamaRecs',
  },
  {
    title: 'Animal Fusion',
    description: 'A text-to-image ML application for creating unique animal fusions. Leverages PyTorch, Transformers, and StableDiffusion to combine features of different animals.',
    tags: ['Python', 'PyTorch', 'Transformers', 'OpenCV'],
    image: 'https://cdn.midjourney.com/f3c16b82-a8be-48f8-89db-a5ea41e133c6/0_1.png',
    github: 'https://github.com/adequatej/AnimalFusion',
  },
  {
    title: 'Portfolio Website Iteration 2',
    description: 'Second iteration of my portfolio website built with Next.js and modern web technologies. Features Firebase integration and responsive design with Tailwind CSS.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Node.js'],
    image: 'https://cdn.midjourney.com/59255c18-1c26-4f24-a77b-66e8f0d8cebb/0_3.png',
    github: 'https://github.com/adequatej/personal-portfolio',
    demo: 'https://jedgeoghegan.com/'
  },
  {
    title: 'Portfolio Website Iteration 1',
    description: 'First iteration of my portfolio website built with vanilla web technologies. Focused on mastering core HTML, CSS, and JavaScript fundamentals.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://cdn.midjourney.com/e6b231d1-feb4-4c94-ae33-0b8c589e44e7/0_3.png',
    github: 'https://github.com/adequatej/adequatej.github.io',
    demo: 'https://adequatej.github.io/'
  },  
  {
    title: 'SA Connect',
    description: 'A full-stack platform for WPIs student assistant recruitment with Azure Auth0 authentication. Features role-based access control and robust AWS infrastructure with Docker deployment.',
    tags: ['Python', 'Flask', 'Git', 'PostgreSQL', 'Docker', 'AWS', 'HTML', 'CSS', 'JavaScript', 'Azure', 'Bootstrap', 'SQLAlchemy', 'SQL', 'SQLite'],
    image: 'https://cdn.midjourney.com/1f7515f6-aa3e-40e8-ac4c-fb10e7eedfe6/0_2.png',
    github: 'https://github.com/adequatej/sa_connect',
  },
  {
    title: 'ML LifeCycle Case Study',
    description: 'A cloud-deployed song recommendation chatbot utilizing Spotifys API. Features comprehensive monitoring and automated CI/CD with cross-platform deployment on AWS, Azure, and GCP.',
    tags: ['Python', 'Docker', 'AWS', 'Google Cloud Platform', 'Azure', 'Prometheus', 'Linux', 'Gradio', 'Transformers', 'Bash', 'Git'],
    image: 'https://cdn.midjourney.com/c7a6d624-d199-4472-a89a-0a60353cbff7/0_2.png',
    github: 'https://github.com/adequatej/ML-LifeCycle-Case-Study',
  },
  {
    title: 'Virtual Valentines Card',
    description: 'An interactive Valentines Day card with animated opening sequence and personalized message reveal. Built for my girlfriend with Next.js and enhanced with Framer Motion for smooth transitions.',
    tags: ['Next.js', 'TypeScript', 'React', 'TailwindCSS', 'Framer Motion'],
    image: 'https://cdn.midjourney.com/b562b159-dca2-4c4d-a1d5-4aaddffddb26/0_0.png',
    github: 'https://github.com/adequatej/valentines-card',
    demo: 'https://valentines-card-buj50vjva-jed-geoghegans-projects.vercel.app/'
  }
];

const allTags = Array.from(new Set(projects.flatMap(project => project.tags))).sort();

// Add tech icons mapping
const techIcons: Record<string, string> = {
  'Next.js': '/icons/tech/nextjs.svg',
  'React': '/icons/tech/react.svg',
  'TypeScript': '/icons/tech/typescript.svg',
  'Node.js': '/icons/tech/nodejs.svg',
  'Python': '/icons/tech/python.svg',
  'MongoDB': '/icons/tech/mongodb.svg',
  'PostgreSQL': '/icons/tech/postgresql.svg',
  'AWS': '/icons/tech/aws.svg',
  'Docker': '/icons/tech/docker.svg',
  'TensorFlow': '/icons/tech/tensorflow.svg',
  'Flask': '/icons/tech/flask.svg',
  'TailwindCSS': '/icons/tech/tailwindcss.svg',
  'HTML': '/icons/tech/html.svg',
  'CSS': '/icons/tech/css.svg',
  'JavaScript': '/icons/tech/javascript.svg',
  'Framer Motion': '/icons/tech/framer.svg',
  'Bootstrap': '/icons/tech/bootstrap.svg',
  'FastAPI': '/icons/tech/fastapi.svg',
  'SQLAlchemy': '/icons/tech/sqlalchemy.svg',
  'SQLite': '/icons/tech/sqlite.svg',
  'SQL': '/icons/tech/sql.svg',
  'PyTorch': '/icons/tech/pytorch.svg',
  'Scikit-learn': '/icons/tech/scikit.svg',
  'Pandas': '/icons/tech/pandas.svg',
  'OpenCV': '/icons/tech/opencv.svg',
  'Azure': '/icons/tech/azure.svg',
  'Google Cloud Platform': '/icons/tech/gcp.svg',
  'Linux': '/icons/tech/linux.svg',
  'Git': '/icons/tech/git.svg',
  'Bash': '/icons/tech/bash.svg',
  'Prometheus': '/icons/tech/prometheus.svg',
  'ShadCN': '/icons/tech/shadcn.svg',
  'Streamlit': '/icons/tech/streamlit.svg',
  'Transformers': '/icons/tech/transformers.svg',
  'StableDiffusion': '/icons/tech/stablediffusion.svg',
  'Firebase': '/icons/tech/firebase.svg',
  'Gradio': '/icons/tech/gradio.svg'
};

export function Projects() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredProjects = selectedTag
    ? projects.filter(project => project.tags.includes(selectedTag))
    : projects;

  // Show only first 6 projects (2 rows) if not expanded
  const visibleProjects = showAllProjects 
    ? filteredProjects 
    : filteredProjects.slice(0, 6);

  // Show fewer tags on mobile
  const visibleTags = showAllTags 
    ? allTags 
    : allTags.slice(0, isMobile ? 6 : 22);

  return (
    <section id="projects" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <Container size="2xl">
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
              A collection of applications I&apos;ve built, showcasing my technical skills and problem-solving approach.
            </p>
          </div>

          {/* Tags Filter */}
          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-2 max-w-6xl mx-auto px-4">
              <button
                onClick={() => setSelectedTag(null)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedTag === null 
                    ? 'bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 dark:from-purple-500 dark:via-indigo-500 dark:to-indigo-600 text-white shadow-lg shadow-orange-500/20 dark:shadow-purple-500/20' 
                    : 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                All Projects
              </button>
              {visibleTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    selectedTag === tag 
                      ? 'bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 dark:from-purple-500 dark:via-indigo-500 dark:to-indigo-600 text-white shadow-lg shadow-orange-500/20 dark:shadow-purple-500/20' 
                      : 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            {/* View More Tags Button */}
            {allTags.length > 14 && (
              <div className="flex justify-center mt-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowAllTags(!showAllTags)}
                  className="text-sm"
                >
                  {showAllTags ? 'Show Less Tags' : 'View More Tags'}
                  <Icons.chevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${showAllTags ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            )}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 
            px-0.5
            max-w-[99.5%] sm:max-w-[99%] lg:max-w-[98.5%] mx-auto">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isExpanded={expandedId === project.title}
                onExpand={() => setExpandedId(expandedId === project.title ? null : project.title)}
                isMobile={isMobile}
              />
            ))}
          </div>
          
          {/* View More Projects Button */}
          {filteredProjects.length > 6 && (
            <div className="flex justify-center mt-8">
              <Button 
                variant="outline"
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="min-w-[200px] bg-white dark:bg-gray-800 border-orange-200/50 dark:border-purple-500/30
                  hover:border-orange-300 dark:hover:border-purple-500/50
                  hover:shadow-lg hover:shadow-orange-500/10 dark:hover:shadow-purple-500/10"
              >
                {showAllProjects ? 'Show Less Projects' : 'View More Projects'}
                <Icons.chevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${showAllProjects ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

type ProjectCardProps = {
  project: Project;
  index: number;
  isExpanded: boolean;
  onExpand: () => void;
  isMobile: boolean;
};

function ProjectCard({ project, index, isExpanded, onExpand, isMobile }: ProjectCardProps) {
  const [showAllTech, setShowAllTech] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { 
    stiffness: 120,
    damping: 12,
    mass: 0.1
  });
  const mouseY = useSpring(y, { 
    stiffness: 120,
    damping: 12,
    mass: 0.1
  });
  // How far the card tilts 
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;

    const rect = cardRef.current.getBoundingClientRect();
    
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const normalizedX = (mouseX / rect.width) * 3 - 1.5;
    const normalizedY = (mouseY / rect.height) * 3 - 1.5;
    
    x.set(normalizedX * 100);
    y.set(normalizedY * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        style={{ perspective: 900 }}
        className="h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{
            rotateX: !isMobile ? rotateX : 0,
            rotateY: !isMobile ? rotateY : 0,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.05s ease-out'
          }}
          className="h-full"
        >
          <Card 
            className={`
              relative flex flex-col h-full overflow-hidden group cursor-pointer
              transition-all duration-500
              border border-transparent
              bg-gradient-to-br from-orange-400/5 to-red-500/5 
              dark:from-purple-500/5 dark:to-indigo-600/5
              before:absolute before:inset-0 before:rounded-lg before:p-[1px]
              before:bg-gradient-to-r before:from-orange-400/40 before:via-red-500/40 before:to-orange-400/40
              dark:before:from-purple-500/40 dark:before:via-indigo-600/40 dark:before:to-purple-500/40
              before:z-[1] before:opacity-100 before:transition-all before:duration-500
              shadow-[0_0_30px_rgba(251,146,60,0.2)] dark:shadow-[0_0_30px_rgba(168,85,247,0.2)]
              group-hover:shadow-none dark:group-hover:shadow-none
              group-hover:border-orange-500/20 dark:group-hover:border-purple-500/20
              group-hover:bg-white dark:group-hover:bg-gray-800
              group-hover:before:opacity-100 group-hover:before:from-orange-400/60 group-hover:before:via-red-500/60 group-hover:before:to-orange-400/60
              dark:group-hover:before:from-purple-500/60 dark:group-hover:before:via-indigo-600/60 dark:group-hover:before:to-purple-500/60
              ${isExpanded ? 'bg-white dark:bg-gray-800 shadow-none' : 'bg-white/50 dark:bg-gray-800/50'}
            `}
            onClick={() => isMobile && onExpand()}
          >
            {/* Project Image with gradient overlay */}
            <div className="relative z-[2] h-48 xs:h-52 sm:h-48 md:h-56 overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-t-lg">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full transition-all duration-500 
                  group-hover:scale-105 group-hover:blur-[2px]"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 xs:p-4 sm:p-4 md:p-6 
                bg-gradient-to-t from-black/90 via-black/70 to-black/30 
                opacity-0 group-hover:opacity-100 transition-all duration-200
                backdrop-blur-[2px]">
                {/* Description */}
                <p className="text-white text-[13px] xs:text-[13px] sm:text-[13px] md:text-[15px] font-medium 
                  transform translate-y-2 group-hover:translate-y-0 
                  transition-transform duration-200 mb-2 xs:mb-2 sm:mb-3
                  line-clamp-6 xs:line-clamp-6 sm:line-clamp-none
                  leading-relaxed">
                  {project.description}
                </p>
                {/* Tech Stack Icons */}
                <div className="flex flex-wrap items-center gap-2 xs:gap-2 sm:gap-2 transform translate-y-2 
                  group-hover:translate-y-0 transition-transform duration-200 mt-auto">
                  {project.tags.slice(0, isMobile ? 3 : 5).map((tag) => (
                    techIcons[tag] && (
                      <div
                        key={tag}
                        className="w-8 h-8 xs:w-8 xs:h-8 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-full bg-white/80 dark:bg-gray-800/80 p-1.5 
                          backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-700/90
                          transition-all duration-200 hover:scale-110
                          border border-gray-200/50 dark:border-gray-700/50"
                        title={tag}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={techIcons[tag]}
                            alt={tag}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    )
                  ))}
                  {project.tags.length > (isMobile ? 3 : 5) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAllTech(true);
                      }}
                      className="w-8 h-8 xs:w-8 xs:h-8 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-full bg-white/80 dark:bg-gray-800/80
                        backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-700/90
                        transition-all duration-200 hover:scale-110
                        flex items-center justify-center
                        text-xs xs:text-xs sm:text-xs md:text-sm font-medium text-gray-900 dark:text-white
                        border border-gray-200/50 dark:border-gray-700/50"
                      title="Show more technologies"
                    >
                      +{project.tags.length - (isMobile ? 3 : 5)}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="relative z-20 flex flex-col flex-grow p-4 xs:p-4 sm:p-4 md:p-5 
              min-h-[90px] xs:min-h-[90px] sm:min-h-[90px] md:min-h-[100px]
              bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <h3 className="text-lg xs:text-lg sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white 
                [word-break:break-word] mb-3 xs:mb-3 sm:mb-3 min-h-[32px] xs:min-h-[32px] sm:min-h-[36px]">
                {project.title}
              </h3>

              {/* Links */}
              <div className="flex items-center gap-4 xs:gap-4 sm:gap-4 md:gap-5 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm xs:text-sm sm:text-sm md:text-base text-gray-600 hover:text-primary 
                             dark:text-gray-300 dark:hover:text-primary transition-colors
                             px-2.5 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icons.github className="w-4 h-4 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <span>Code</span>
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm xs:text-sm sm:text-sm md:text-base text-gray-600 hover:text-primary 
                             dark:text-gray-300 dark:hover:text-primary transition-colors
                             px-2.5 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icons.external className="w-4 h-4 xs:w-4 xs:h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <Dialog 
        open={showAllTech} 
        onOpenChange={setShowAllTech}
      >
        <DialogContent className="sm:max-w-[300px] max-h-[400px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base">Technologies Used</DialogTitle>
            <DialogDescription className="text-sm">
              All technologies used in {project.title}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 p-3">
            {project.tags.map((tag) => (
              techIcons[tag] && (
                <div
                  key={tag}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-md
                    bg-white/80 dark:bg-gray-800/80
                    backdrop-blur-sm
                    border border-gray-200/50 dark:border-gray-700/50
                    hover:bg-white/90 dark:hover:bg-gray-700/90
                    transition-all duration-200"
                >
                  <div className="relative w-5 h-5">
                    <Image
                      src={techIcons[tag]}
                      alt={tag}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {tag}
                  </span>
                </div>
              )
            ))}
          </div>
          <DialogFooter>
            <button
              onClick={() => setShowAllTech(false)}
              className="inline-flex items-center justify-center px-3 py-1.5 
                border border-transparent text-xs font-medium rounded-md
                text-white bg-orange-600 hover:bg-orange-700 
                dark:bg-purple-600 dark:hover:bg-purple-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-orange-500 dark:focus:ring-purple-500
                transition-colors duration-200"
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
