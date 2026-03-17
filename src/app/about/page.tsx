import { Container } from '@/components/layout/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Jed Geoghegan',
  description: 'Background, skills, and interests.',
};

const skillGroups = [
  {
    label: 'Languages',
    skills: 'TypeScript, JavaScript, Python, HTML, CSS, SQL',
  },
  {
    label: 'Frameworks & Libraries',
    skills: 'React, Next.js, Node.js, Flask, FastAPI, TailwindCSS, Framer Motion, Bootstrap',
  },
  {
    label: 'Data & ML',
    skills: 'TensorFlow, PyTorch, Scikit-learn, Pandas, OpenCV, Transformers, Hugging Face',
  },
  {
    label: 'Databases',
    skills: 'PostgreSQL, MongoDB, SQLite, Firebase',
  },
  {
    label: 'Cloud & Infrastructure',
    skills: 'AWS, Azure, Google Cloud, Docker, Vercel, Linux',
  },
  {
    label: 'Tools',
    skills: 'Git, Bash, Prometheus, Streamlit, Gradio',
  },
];

export default function AboutPage() {
  return (
    <Container className="py-16 md:py-24 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
        About
      </h1>

      <div className="space-y-5 text-muted-foreground leading-relaxed mb-12">
        <p>
          I&apos;m a Software Engineer studying Computer Science at WPI, 
          pursuing both a BS and MS. I transitioned from cybersecurity into 
          full-stack development and AI/ML — and I haven&apos;t looked back.
        </p>
        <p>
          I care about building software that works well and looks clean. 
          Most of my work spans full-stack web applications, ML systems, 
          and cloud infrastructure. I like understanding problems end-to-end 
          rather than just one layer of the stack.
        </p>
        <p>
          Outside of code: soccer, rock climbing, working out, exploring 
          new places, and spending time with friends.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">Beyond Code</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I&apos;ve played soccer for over 15 years — from rec leagues as a kid to 
            competitive club teams through high school and into college. It taught me 
            how to compete, stay disciplined, and work with a team under pressure. 
            It&apos;s still one of my favorite ways to stay active and clear my head.
          </p>
          <p>
            I picked up rock climbing while living in Taiwan and got hooked 
            immediately. There&apos;s something about problem-solving on a wall that 
            clicks with how my brain works — reading routes, figuring out sequences, 
            committing to moves. I recently sent my first V7, which felt like a 
            huge milestone. Climbing has become one of the things I look forward to 
            most outside of work.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-6">Skills</h2>
        <div className="space-y-4">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <h3 className="text-sm font-medium mb-1">{group.label}</h3>
              <p className="text-sm text-muted-foreground">{group.skills}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Education</h2>
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-medium">Worcester Polytechnic Institute</h3>
            <span className="text-sm text-muted-foreground shrink-0">2021 – Present</span>
          </div>
          <p className="text-sm text-muted-foreground">BS + MS in Computer Science</p>
        </div>
      </section>
    </Container>
  );
}
