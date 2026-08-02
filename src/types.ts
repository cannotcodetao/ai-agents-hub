export interface Agent {
  name: string;
  fullName: string;
  url: string;
  descriptionEn: string;
  descriptionZh: string;
  stars: number;
  prevStars?: number;
  weekGrowth?: number;
  category: string;
  subcategory: string;
  subcategoryEn: string;
  tags: string[];
  fullApp?: boolean;
  detailZh?: string;
  usageGuide?: string;
  oneClickPrompt?: string;
  giteeMirror?: string;
  demoUrl?: string;
  coreCapabilities?: string[];
}

export interface Category {
  id: string;
  nameZh: string;
  nameEn: string;
  icon: string;
  descZh: string;
  descEn: string;
}

export interface Curation {
  featured: string[];
  editorNote: string;
  updatedAt: string;
}

export interface AgentsData {
  curation: Curation;
  categories: Category[];
  agents: Agent[];
}

export interface TrendingItem {
  rank: number;
  name: string;
  fullName: string;
  url: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  starsToday: number;
}

export interface TrendingData {
  updatedAt: string;
  source: string;
  total: number;
  items: TrendingItem[];
}
