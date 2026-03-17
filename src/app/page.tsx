"use client";

import { useState, useEffect, useCallback } from 'react';
import { Container } from '@/components/layout/Container';
import { incrementVisitorCount, subscribeToVisitorCount, subscribeToWritingPosts, WritingPost } from '@/lib/firebase';
import { GitHubActivity } from '@/components/github/GitHubActivity';
import { samplePosts } from '@/lib/sample-posts';
import Link from 'next/link';

const featuredProjects = [
  {
    title: 'Huddle Chat',
    impact: 'Real-time messaging with WebSocket architecture and optimistic UI updates.',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'TailwindCSS'],
    github: 'https://github.com/adequatej/huddle-chat',
    demo: 'https://huddle-chat-pi.vercel.app/',
  },
  {
    title: 'Mapping Flavor',
    impact: 'Cultural research platform mapping 300+ food vendors across Taiwan\'s night markets.',
    tech: ['Next.js', 'TypeScript', 'MapBox', 'PostgreSQL'],
    github: 'https://github.com/adequatej/mapping-flavor',
    demo: 'https://mapping-flavor.vercel.app/',
  },
  {
    title: 'SA Connect',
    impact: 'Student recruitment platform serving 500+ users with Azure Auth and AWS infra.',
    tech: ['Python', 'Flask', 'PostgreSQL', 'Docker', 'AWS'],
    github: 'https://github.com/adequatej/sa_connect',
  },
  {
    title: 'NakamaRecs',
    impact: 'ML-powered recommendation engine achieving 85% precision on anime preferences.',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'Streamlit'],
    github: 'https://github.com/adequatej/NakamaRecs',
  },
];

const experiences = [
  {
    title: 'Applied AI SWE Intern',
    company: 'Genmab',
    period: 'Summer 2025',
    description: 'Building AI-powered internal tools and pipelines',
  },
  {
    title: 'MQP — Microsoft',
    company: 'Microsoft',
    period: '2024 – 2025',
    description: 'Capstone project in collaboration with Microsoft',
  },
  {
    title: 'SWE Co-op',
    company: 'Vertex',
    period: '2024',
    description: 'Full-time software engineering',
  },
  {
    title: 'Cybersecurity Engineering Intern',
    company: 'Pfizer',
    period: '2022',
    description: 'Security tooling and infrastructure',
  },
];

const interests = [
  { label: 'Applied AI & Agents', detail: 'Claude, Cursor, autonomous systems' },
  { label: 'Agentic Workflows', detail: 'Multi-step AI pipelines, self-healing CI' },
  { label: 'Full-Stack Engineering', detail: 'Next.js, TypeScript, cloud infra' },
  { label: 'ML Systems', detail: 'Training pipelines, recommendation engines' },
];

export default function Home() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [firebasePosts, setFirebasePosts] = useState<WritingPost[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    incrementVisitorCount();
    const unsubVisitors = subscribeToVisitorCount((count) => {
      setVisitorCount(count);
    });
    const unsubWriting = subscribeToWritingPosts((posts) => {
      setFirebasePosts(posts);
    });
    return () => {
      unsubVisitors();
      unsubWriting();
    };
  }, []);

  // Close sidebar on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSidebarOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZoneName: 'short',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch last commit date for portfolio repo
  useEffect(() => {
    async function fetchLastCommit() {
      try {
        const res = await fetch(
          'https://api.github.com/repos/adequatej/personal-portfolio/commits?per_page=1',
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        );
        if (!res.ok) return;
        const commits = await res.json();
        if (commits.length > 0) {
          const date = new Date(commits[0].commit.committer.date);
          setLastUpdated(
            date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          );
        }
      } catch {
        // silently fail on rate limit or network error
      }
    }
    fetchLastCommit();
  }, []);

  const toggleSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);

  const writingPosts = firebasePosts.length > 0 ? firebasePosts : samplePosts;

  return (
    <>
      {/* Sidebar toggle — CTA style */}
      <button
        onClick={toggleSidebar}
        aria-label="Open sidebar menu"
        className={`fixed left-5 top-20 z-50 hidden lg:flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 border-accent/30 bg-accent/5 backdrop-blur-sm hover:bg-accent/10 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group ${
          sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent/70 group-hover:text-accent transition-colors">
          <line x1="3" x2="21" y1="6" y2="6" />
          <line x1="3" x2="15" y1="12" y2="12" />
          <line x1="3" x2="18" y1="18" y2="18" />
        </svg>
        <span className="text-sm font-medium text-accent/70 group-hover:text-accent transition-colors">
          Menu
        </span>
      </button>

      {/* Sidebar panel */}
      <aside
        className={`fixed left-0 top-0 h-full z-40 w-72 bg-background border-r border-border/40 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar header with close button */}
        <div className="flex items-center justify-between pt-20 px-6 pb-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">Menu</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="h-full overflow-y-auto pb-8 px-6">
          {/* Writing */}
          <div className="mb-10">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Writing</h2>
              <Link href="/writing" className="text-xs text-muted-foreground/50 hover:text-accent transition-colors">
                All →
              </Link>
            </div>
            <ul className="space-y-0.5">
              {writingPosts.slice(0, 5).map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/writing/${post.slug}`}
                    className="group flex items-baseline gap-2 py-1.5"
                  >
                    <span className="text-xs font-mono text-muted-foreground/50 shrink-0 tabular-nums w-12">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: '2-digit',
                      })}
                    </span>
                    <span className="text-sm text-foreground group-hover:text-accent transition-colors leading-tight">
                      {post.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* GitHub Activity */}
          <div className="mb-10">
            <GitHubActivity />
          </div>

          {/* Site meta */}
          <div className="text-xs text-muted-foreground/40 space-y-1">
            <p className="font-mono tabular-nums">{visitorCount.toLocaleString()} visitors</p>
          </div>
        </div>
      </aside>

      {/* Backdrop — click to close */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px] lg:block hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content — always centered */}
      <Container className="py-16 md:py-24 max-w-3xl">
        {/* Intro */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1">
            Jed Geoghegan
          </h1>
          <p className="text-sm md:text-base font-mono text-muted-foreground mb-3">
            Incoming Applied AI SWE Intern @ Genmab
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-muted-foreground/60 tabular-nums mb-4">
            {currentTime && <span>{currentTime}</span>}
            {lastUpdated && (
              <>
                <span className="text-muted-foreground/30">·</span>
                <span>Last updated {lastUpdated}</span>
              </>
            )}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4 max-w-xl">
            Software engineer interested in applied AI, agentic systems, and building tools
            that automate complex workflows.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <a href="https://github.com/adequatej" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/jed-geoghegan" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              LinkedIn
            </a>
            <a href="mailto:jedgeoghegan@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
              Email
            </a>
            <span className="text-muted-foreground/30">·</span>
            <span className="text-xs font-mono text-muted-foreground/50 tabular-nums">{visitorCount.toLocaleString()} visitors</span>
          </div>
        </section>

        {/* Experience — Timeline style */}
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-lg font-semibold">Experience</h2>
            <Link href="/experience" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Full history →
            </Link>
          </div>
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-8 group">
                  <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-muted-foreground/30 bg-background group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300" />
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-medium group-hover:text-accent transition-colors">{exp.title}</h3>
                    <span className="text-xs font-mono text-muted-foreground/60 shrink-0 tabular-nums">{exp.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.company} · {exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-lg font-semibold">Projects</h2>
            <Link href="/projects" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              All projects →
            </Link>
          </div>
          <div className="space-y-5">
            {featuredProjects.map((project) => (
              <div key={project.title} className="group">
                <div className="flex items-baseline justify-between gap-4 mb-0.5">
                  <h3 className="font-medium">{project.title}</h3>
                  <div className="flex items-center gap-2 text-xs font-mono shrink-0">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground/60 hover:text-accent transition-colors">
                      src
                    </a>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-muted-foreground/60 hover:text-accent transition-colors">
                        demo
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{project.impact}</p>
                <p className="text-xs font-mono text-muted-foreground/50">{project.tech.join(' · ')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interests */}
        <section>
          <h2 className="text-lg font-semibold mb-5">Currently Exploring</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {interests.map((item) => (
              <div key={item.label} className="border border-border/50 rounded-md px-3 py-2.5">
                <p className="text-sm font-medium mb-0.5">{item.label}</p>
                <p className="text-xs text-muted-foreground/60">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile-only: writing preview (sidebar is desktop-only) */}
        <section className="mt-14 lg:hidden">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-lg font-semibold">Writing</h2>
            <Link href="/writing" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              All →
            </Link>
          </div>
          <ul className="space-y-0.5">
            {writingPosts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group flex items-baseline gap-2 py-1.5"
                >
                  <span className="text-xs font-mono text-muted-foreground/50 shrink-0 tabular-nums w-12">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                    })}
                  </span>
                  <span className="text-sm text-foreground group-hover:text-accent transition-colors leading-tight">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </>
  );
}
