import { Container } from '@/components/layout/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — Jed Geoghegan',
  description: 'A collection of software projects spanning full-stack web apps, ML systems, and more.',
};

const projects = [
  {
    title: 'Huddle Chat',
    description: 'Real-time chat application built for seamless group communication. Features live messaging, user presence, and a clean modern interface.',
    tech: 'Next.js, TypeScript, React, MongoDB, TailwindCSS, ShadCN, Node.js',
    github: 'https://github.com/adequatej/huddle-chat',
    demo: 'https://huddle-chat-pi.vercel.app/',
  },
  {
    title: 'Mapping Flavor',
    description: 'Fullstack platform for food discovery and cultural identity research in Taiwan\'s Night Markets. Interactive map-based exploration with data-driven insights.',
    tech: 'Next.js, TypeScript, MapBox, PostgreSQL, TailwindCSS, MongoDB, Node.js',
    github: 'https://github.com/adequatej/mapping-flavor',
    demo: 'https://mapping-flavor.vercel.app/',
  },
  {
    title: 'SA Connect',
    description: 'Full-stack recruitment platform for WPI\'s student assistant program. Role-based access control with Azure Auth0, deployed on AWS with Docker.',
    tech: 'Python, Flask, PostgreSQL, Docker, AWS, Azure, Bootstrap, SQLAlchemy',
    github: 'https://github.com/adequatej/sa_connect',
  },
  {
    title: 'Open Tech Garage',
    description: 'Platform for evaluating and sharing digital security tools for civil society organizations. Python-automated GitHub workflow for continuous testing and updates.',
    tech: 'Python, Git, Bash',
    github: 'https://github.com/adequatej/open-source-tools',
  },
  {
    title: 'NakamaRecs',
    description: 'Anime recommendation system delivering personalized suggestions using collaborative filtering and content-based approaches.',
    tech: 'Python, TensorFlow, Scikit-learn, Pandas, FastAPI, Streamlit',
    github: 'https://github.com/adequatej/NakamaRecs',
  },
  {
    title: 'Animal Fusion',
    description: 'Text-to-image ML application that creates unique animal hybrids by combining visual features using diffusion models.',
    tech: 'Python, PyTorch, Transformers, OpenCV, StableDiffusion',
    github: 'https://github.com/adequatej/AnimalFusion',
  },
  {
    title: 'ML LifeCycle Case Study',
    description: 'Cloud-deployed song recommendation chatbot using Spotify\'s API. Comprehensive monitoring and automated CI/CD across AWS, Azure, and GCP.',
    tech: 'Python, Docker, AWS, GCP, Azure, Prometheus, Gradio, Transformers',
    github: 'https://github.com/adequatej/ML-LifeCycle-Case-Study',
  },
  {
    title: 'Virtual Valentines Card',
    description: 'Interactive animated greeting card with personalized message reveal and smooth transitions.',
    tech: 'Next.js, TypeScript, React, TailwindCSS, Framer Motion',
    github: 'https://github.com/adequatej/valentines-card',
    demo: 'https://valentines-card-buj50vjva-jed-geoghegans-projects.vercel.app/',
  },
];

export default function ProjectsPage() {
  return (
    <Container className="py-16 md:py-24 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
        Projects
      </h1>
      <p className="text-muted-foreground mb-10">
        Applications I&apos;ve built — spanning full-stack web apps, ML systems, and developer tools.
      </p>

      <div className="space-y-8">
        {projects.map((project) => (
          <div key={project.title} className="pb-8 border-b border-border last:border-0 last:pb-0">
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <h2 className="text-lg font-medium">{project.title}</h2>
              <div className="flex items-center gap-3 text-sm text-muted-foreground shrink-0">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Code
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    Demo
                  </a>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
            <p className="text-xs font-mono text-muted-foreground/60">{project.tech}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
