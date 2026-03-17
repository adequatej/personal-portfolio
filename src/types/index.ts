export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string;
  github?: string;
  demo?: string;
}