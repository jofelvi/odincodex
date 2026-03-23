export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  video?: string;
  link?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface TechItem {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "design" | "devops" | "database";
}

export interface NavLink {
  label: string;
  href: string;
}
