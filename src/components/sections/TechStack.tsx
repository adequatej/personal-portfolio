"use client";

import { Container } from '@/components/layout/Container';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Icons } from '@/components/ui/Icons';

type TechSkill = {
  name: string;
  icon: string;
  experience: number; // years of experience
  projects: number; // number of projects
  category: 'web-core' | 'frameworks' | 'data-ml' | 'cloud-infra' | 'dev-tools';
};

type CategoryFilter = 'all' | 'web-core' | 'frameworks' | 'data-ml' | 'cloud-infra' | 'dev-tools';

const techSkills: TechSkill[] = [
  // Web Core
  { 
    name: 'TypeScript', 
    icon: '/icons/tech/typescript.svg', 
    experience: 2, 
    projects: 3, 
    category: 'web-core'
  },
  { 
    name: 'JavaScript', 
    icon: '/icons/tech/javascript.svg', 
    experience: 3, 
    projects: 2, 
    category: 'web-core'
  },
  { 
    name: 'HTML', 
    icon: '/icons/tech/html.svg', 
    experience: 3, 
    projects: 2, 
    category: 'web-core'
  },
  { 
    name: 'CSS', 
    icon: '/icons/tech/css.svg', 
    experience: 3, 
    projects: 2, 
    category: 'web-core'
  },
  { 
    name: 'Python', 
    icon: '/icons/tech/python.svg', 
    experience: 3, 
    projects: 4, 
    category: 'web-core'
  },

  // Frameworks & Libraries
  { 
    name: 'React', 
    icon: '/icons/tech/react.svg', 
    experience: 1, 
    projects: 3, 
    category: 'frameworks'
  },
  { 
    name: 'Next.js', 
    icon: '/icons/tech/nextjs.svg', 
    experience: 1.5, 
    projects: 3, 
    category: 'frameworks'
  },
  { 
    name: 'Node.js', 
    icon: '/icons/tech/nodejs.svg', 
    experience: 2, 
    projects: 2, 
    category: 'frameworks'
  },
  { 
    name: 'Flask', 
    icon: '/icons/tech/flask.svg', 
    experience: 2, 
    projects: 1, 
    category: 'frameworks'
  },
  { 
    name: 'FastAPI', 
    icon: '/icons/tech/fastapi.svg', 
    experience: 1, 
    projects: 1, 
    category: 'frameworks'
  },
  { 
    name: 'TailwindCSS', 
    icon: '/icons/tech/tailwindcss.svg', 
    experience: 1.5, 
    projects: 3, 
    category: 'frameworks'
  },
  { 
    name: 'Bootstrap', 
    icon: '/icons/tech/bootstrap.svg', 
    experience: 2, 
    projects: 1, 
    category: 'frameworks'
  },
  { 
    name: 'ShadCN', 
    icon: '/icons/tech/shadcn.svg', 
    experience: 1, 
    projects: 1, 
    category: 'frameworks'
  },
  { 
    name: 'Framer Motion', 
    icon: '/icons/tech/framer.svg', 
    experience: 1, 
    projects: 1, 
    category: 'frameworks'
  },

  // Data & ML
  { 
    name: 'MongoDB', 
    icon: '/icons/tech/mongodb.svg', 
    experience: 1.5, 
    projects: 1, 
    category: 'data-ml'
  },
  { 
    name: 'PostgreSQL', 
    icon: '/icons/tech/postgresql.svg', 
    experience: 2, 
    projects: 1, 
    category: 'data-ml'
  },
  { 
    name: 'SQLite', 
    icon: '/icons/tech/sqlite.svg', 
    experience: 2, 
    projects: 1, 
    category: 'data-ml'
  },
  { 
    name: 'SQL', 
    icon: '/icons/tech/sql.svg', 
    experience: 2, 
    projects: 1, 
    category: 'data-ml'
  },
  { 
    name: 'Firebase', 
    icon: '/icons/tech/firebase.svg', 
    experience: 1, 
    projects: 1, 
    category: 'data-ml'
  },
  { 
    name: 'TensorFlow', 
    icon: '/icons/tech/tensorflow.svg', 
    experience: 1, 
    projects: 1, 
    category: 'data-ml'
  },
  { 
    name: 'PyTorch', 
    icon: '/icons/tech/pytorch.svg', 
    experience: 1, 
    projects: 1, 
    category: 'data-ml'
  },
  { 
    name: 'Scikit-learn', 
    icon: '/icons/tech/scikit.svg', 
    experience: 1, 
    projects: 1, 
    category: 'data-ml'
  },
  { 
    name: 'Pandas', 
    icon: '/icons/tech/pandas.svg', 
    experience: 1.5, 
    projects: 1, 
    category: 'data-ml'
  },
  { 
    name: 'OpenCV', 
    icon: '/icons/tech/opencv.svg', 
    experience: 1, 
    projects: 1, 
    category: 'data-ml'
  },
  { 
    name: 'Transformers', 
    icon: '/icons/tech/transformers.svg', 
    experience: 1, 
    projects: 2, 
    category: 'data-ml'
  },
  { 
    name: 'SQLAlchemy', 
    icon: '/icons/tech/sqlalchemy.svg', 
    experience: 1, 
    projects: 1, 
    category: 'data-ml'
  },

  // Cloud & Infrastructure
  { 
    name: 'Docker', 
    icon: '/icons/tech/docker.svg', 
    experience: 2, 
    projects: 2, 
    category: 'cloud-infra'
  },
  { 
    name: 'AWS', 
    icon: '/icons/tech/aws.svg', 
    experience: 2, 
    projects: 2, 
    category: 'cloud-infra'
  },
  { 
    name: 'Azure', 
    icon: '/icons/tech/azure.svg', 
    experience: 1.5, 
    projects: 2, 
    category: 'cloud-infra'
  },
  { 
    name: 'Google Cloud Platform', 
    icon: '/icons/tech/gcp.svg', 
    experience: 1, 
    projects: 1, 
    category: 'cloud-infra'
  },
  { 
    name: 'Vercel', 
    icon: '/icons/tech/vercel.svg', 
    experience: 1, 
    projects: 2, 
    category: 'cloud-infra'
  },
  { 
    name: 'Linux', 
    icon: '/icons/tech/linux.svg', 
    experience: 2, 
    projects: 1, 
    category: 'cloud-infra'
  },

  // Development Tools
  { 
    name: 'Git', 
    icon: '/icons/tech/git.svg', 
    experience: 3, 
    projects: 3, 
    category: 'dev-tools'
  },
  { 
    name: 'Bash', 
    icon: '/icons/tech/bash.svg', 
    experience: 2, 
    projects: 1, 
    category: 'dev-tools'
  },
  { 
    name: 'Prometheus', 
    icon: '/icons/tech/prometheus.svg', 
    experience: 1, 
    projects: 1, 
    category: 'dev-tools'
  },
  { 
    name: 'Streamlit', 
    icon: '/icons/tech/streamlit.svg', 
    experience: 1, 
    projects: 1, 
    category: 'dev-tools'
  },
  { 
    name: 'Gradio', 
    icon: '/icons/tech/gradio.svg', 
    experience: 1, 
    projects: 1, 
    category: 'dev-tools'
  }
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset showAllSkills and activeSkill when category changes
  useEffect(() => {
    setShowAllSkills(false);
    setActiveSkill(null);
  }, [activeCategory]);
  
  const filteredSkills = activeCategory === 'all' 
    ? techSkills 
    : techSkills.filter(skill => skill.category === activeCategory);

  // Show fewer skills initially
  const initialSkillCount = isMobile ? 8 : 17;
  const visibleSkills = showAllSkills 
    ? filteredSkills 
    : filteredSkills.slice(0, initialSkillCount);

  const remainingSkillsCount = filteredSkills.length - initialSkillCount;

  // Debug logs
  console.log({
    showAllSkills,
    filteredSkillsLength: filteredSkills.length,
    visibleSkillsLength: visibleSkills.length,
    remainingSkillsCount,
    initialSkillCount
  });

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'All Skills' },
    { value: 'web-core', label: 'Core Languages' },
    { value: 'frameworks', label: 'Frameworks & UI' },
    { value: 'data-ml', label: 'Data & ML' },
    { value: 'cloud-infra', label: 'Cloud & Infrastructure' },
    { value: 'dev-tools', label: 'Development Tools' }
  ];

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
    'Gradio': '/icons/tech/gradio.svg',
    'Firebase': '/icons/tech/firebase.svg',
    'Vercel': '/icons/tech/vercel.svg',
    'Transformers': '/icons/tech/transformers.svg'
  };

  return (
    <section id="skills" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid lines */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#8080800A_1px,transparent_1px),linear-gradient(to_bottom,#8080800A_1px,transparent_1px)] bg-[size:64px_64px]" 
        />
        {/* Gradient overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/95 to-gray-50 dark:from-gray-800 dark:via-gray-800/95 dark:to-gray-800" 
        />
      </div>
      
      <Container className="relative z-10">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.7,
              type: "spring",
              bounce: 0.3
            }}
            className="text-center space-y-2"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Skills
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              My toolkit for building exceptional digital experiences
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-6"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.value}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.3,
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  bounce: 0.4
                }}
                onClick={() => {
                  setActiveCategory(category.value);
                  setShowAllSkills(false);
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                  ${activeCategory === category.value 
                    ? 'bg-gradient-to-r from-orange-400 to-red-500 dark:from-purple-500 dark:to-indigo-600 text-white shadow-lg shadow-orange-500/20 dark:shadow-purple-500/20' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700/50 dark:hover:bg-gray-600/50 dark:text-gray-300 dark:backdrop-blur-sm'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {visibleSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout="position"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.5 + index * 0.05,
                  type: "spring",
                  bounce: 0.4
                }}
                whileHover={!isMobile ? { 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                } : undefined}
                className="group relative"
                onClick={() => isMobile && setActiveSkill(activeSkill === skill.name ? null : skill.name)}
              >
                <motion.div 
                  whileHover={!isMobile ? { y: -5 } : undefined}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`
                    inline-flex items-center gap-2.5 px-3 py-2
                    rounded-md
                    bg-white/80 dark:bg-gray-800/80
                    border border-gray-200/50 dark:border-gray-700/50
                    backdrop-blur-sm
                    transition-all duration-300
                    hover:shadow-sm
                    group-hover:border-gray-300 dark:group-hover:border-gray-600
                    min-w-[100px]
                    ${isMobile ? 'cursor-pointer active:scale-95' : ''}
                  `}
                > 
                  {/* Icon */}
                  <motion.div 
                    className="relative w-7 h-7"
                    whileHover={!isMobile ? { rotate: 360 } : undefined}
                    transition={{ duration: 0.4 }}
                  >
                    <Image 
                      src={skill.icon} 
                      alt={skill.name} 
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                  
                  {/* Name */}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {skill.name}
                  </span>

                  {/* Experience Tooltip */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: (isMobile && skill.name === activeSkill) || (!isMobile && skill.name === activeSkill) ? 1 : 0,
                      scale: (isMobile && skill.name === activeSkill) || (!isMobile && skill.name === activeSkill) ? 1 : 0.8
                    }}
                    whileHover={!isMobile ? { opacity: 1, scale: 1 } : undefined}
                    transition={{ duration: 0.2 }}
                    className={`absolute inset-0 flex items-center justify-center
                      bg-gradient-to-r from-gray-900/95 to-gray-800/95 dark:from-gray-800/95 dark:to-gray-900/95
                      backdrop-blur-sm rounded-md z-10
                      ${isMobile ? 'touch-none' : ''}
                    `}
                  >
                    <div className="text-white text-center px-3 py-1.5">
                      <p className="text-sm font-semibold">{skill.experience}+ years</p>
                      <p className="text-xs opacity-75">{skill.projects} projects</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* View More Skills Button */}
          {filteredSkills.length > initialSkillCount && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center mt-8 relative z-20"
            >
              <motion.button
                onClick={() => setShowAllSkills(!showAllSkills)}
                className="px-6 py-2 rounded-full text-sm font-medium
                  bg-white dark:bg-gray-800
                  border border-orange-200/50 dark:border-purple-500/30
                  hover:border-orange-300 dark:hover:border-purple-500/50
                  hover:shadow-lg hover:shadow-orange-500/10 dark:hover:shadow-purple-500/10
                  transition-all duration-300
                  cursor-pointer z-20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showAllSkills 
                  ? 'Show Less Skills' 
                  : `View More Skills (${remainingSkillsCount} more)`}
                <Icons.chevronDown className={`inline-block ml-2 h-4 w-4 transition-transform duration-200 ${showAllSkills ? 'rotate-180' : ''}`} />
              </motion.button>
            </motion.div>
          )}

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto mt-12 relative z-10">
            {[
              { value: '3+', label: 'Years of Coding', icon: '⌨️' },
              { value: '10+', label: 'Projects Completed', icon: '🚀' },
              { value: '600+', label: 'Github Contributions', icon: '🔧' },
              { value: '5+', label: 'Applications Deployed', icon: '💼' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.7 + index * 0.1,
                  type: "spring",
                  bounce: 0.4
                }}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm 
                  border border-orange-200/50 dark:border-purple-500/30 
                  rounded-lg p-4 md:p-6 text-center
                  border-orange-300 dark:border-purple-500/50
                  shadow-lg shadow-orange-500/10 dark:shadow-purple-500/10"
              >
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                  className="text-2xl md:text-3xl mb-2"
                >
                  {stat.icon}
                </motion.div>
                <motion.h3 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                  className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 dark:from-purple-500 dark:to-indigo-600"
                >
                  {stat.value}
                </motion.h3>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
                  className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base"
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
} 