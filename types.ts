export interface BudgetCode {
  id: string;
  name: string;
  category: 'Sector' | 'Province' | 'Agency' | 'District';
  allocation2024: number; // Actual
  allocation2025: number; // Estimate
  allocation2026: number; // Projection
  description?: string;
}

export interface SectorSummary {
  name: string;
  value: number;
  color: string;
}

export interface AnalysisInsight {
  title: string;
  description: string;
  sentiment: 'positive' | 'warning' | 'negative' | 'neutral';
  source: string;
}

export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  EXPLORER = 'EXPLORER',
  COMPARE = 'COMPARE'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}