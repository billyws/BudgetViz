
export interface BudgetCode {
  id: string;
  name: string;
  parentId?: string; // Links District -> Province, Agency -> Sector, Sub-Revenue -> Revenue
  category: 'Sector' | 'Province' | 'Agency' | 'District' | 'Revenue';
  allocation2024: number; // Actual
  allocation2025: number; // Estimate
  allocation2026: number; // Projection
  population?: number; // NSO Population Estimate
  description?: string;
}

export interface SectorSummary {
  name: string;
  value: number;
  color: string;
  id?: string;
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
  COMPARE = 'COMPARE',
  MAP = 'MAP'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
