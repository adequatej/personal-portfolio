// Basic types file for my project
export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  github?: string;
  demo?: string;
  tags: string[];
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools';
} 