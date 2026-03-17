import { Container } from '@/components/layout/Container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience — Jed Geoghegan',
  description: 'Professional experience and roles.',
};

const experiences = [
  {
    title: 'Applied AI SWE Intern',
    company: 'Genmab',
    period: 'Summer 2025',
    description: 'Applied AI and software engineering for biopharmaceutical research.',
    highlights: [
      'Placeholder — describe key contributions here',
      'Placeholder — quantify impact when possible',
    ],
  },
  {
    title: 'MQP (Major Qualifying Project)',
    company: 'Microsoft',
    period: '2024 – 2025',
    description: 'Capstone project in collaboration with Microsoft, applying software engineering to a real-world product challenge.',
    highlights: [
      'Placeholder — describe project scope and deliverables',
      'Placeholder — mention technologies and outcomes',
    ],
  },
  {
    title: 'SWE Co-op',
    company: 'Vertex',
    period: '2024',
    description: 'Full-time software engineering co-op contributing to production systems and internal tooling.',
    highlights: [
      'Placeholder — describe team and responsibilities',
      'Placeholder — quantify impact when possible',
    ],
  },
  {
    title: 'Research Assistant',
    company: 'Worcester Polytechnic Institute',
    period: '2024 – 2025',
    description: 'ML/AI research focused on practical applications. Data analysis, model development, and experiment design.',
    highlights: [
      'Placeholder — describe research focus',
      'Placeholder — mention tools, frameworks, or publications',
    ],
  },
  {
    title: 'SWE Intern',
    company: 'Open Culture Foundation',
    period: '2023',
    description: 'Software engineering internship contributing to open-source projects and digital infrastructure initiatives.',
    highlights: [
      'Placeholder — describe projects and contributions',
      'Placeholder — mention technologies used',
    ],
  },
  {
    title: 'Teaching Assistant',
    company: 'Worcester Polytechnic Institute',
    period: '2023 – 2024',
    description: 'Supported CS coursework, held office hours, and helped students with programming assignments and concepts.',
    highlights: [
      'Placeholder — describe courses and responsibilities',
    ],
  },
  {
    title: 'Cybersecurity Engineering Intern',
    company: 'Pfizer',
    period: '2022',
    description: 'Cybersecurity engineering internship focused on security tooling, vulnerability analysis, and infrastructure protection.',
    highlights: [
      'Placeholder — describe security projects and tools',
      'Placeholder — quantify impact when possible',
    ],
  },
];

export default function ExperiencePage() {
  return (
    <Container className="py-16 md:py-24 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
        Experience
      </h1>
      <p className="text-muted-foreground mb-10">
        Professional roles and positions.
      </p>

      <div className="space-y-10">
        {experiences.map((exp) => (
          <div key={`${exp.company}-${exp.title}`}>
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <h2 className="text-lg font-medium">{exp.title}</h2>
              <span className="text-sm font-mono text-muted-foreground shrink-0">{exp.period}</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-2">{exp.company}</p>
            <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>
            <ul className="space-y-1">
              {exp.highlights.map((highlight, i) => (
                <li key={i} className="text-sm text-muted-foreground/80 pl-4 relative before:content-['–'] before:absolute before:left-0">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}
