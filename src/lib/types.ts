export type ProjectCategory = string;

export interface EvidenceLink {
  label: string;
  url?: string;
}

export interface CompletionProof {
  src: string;
  title: string;
  category: string;
  description: string;
  alt: string;
  featured?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  completionDate: string;
  dateLabel?: string;
  category: ProjectCategory;
  featured: boolean;
  impact: string;
  collaborators?: string[];
  status?: string;
  keyContributions?: string[];
  tools?: string[];
  evidence?: EvidenceLink[];
  completionProofs?: CompletionProof[];
  imageSrc?: string;
  imageAlt?: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  focus: string;
  summary: string;
}

export interface LogFrontMatter {
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

export interface LogEntry extends LogFrontMatter {
  slug: string;
  content: string;
  readingTime: string;
}
