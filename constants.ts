import { BudgetCode, AnalysisInsight } from './types';

export const KPMG_REPORT_URL = "https://assets.kpmg.com/content/dam/kpmg/pg/pdf/2025/KPMG_PNG_National_Budget_2026.pdf";

export const KPMG_INSIGHTS: AnalysisInsight[] = [
  {
    title: "Revenue Volatility Risk",
    description: "KPMG warns that the 2026 revenue projection relies heavily on sustained high gold and oil prices. A 10% drop in commodity prices could widen the deficit by approximately K800M.",
    sentiment: 'warning',
    source: 'KPMG 2026 Budget Review'
  },
  {
    title: "Wage Bill Overruns",
    description: "The public sector wage bill has grown by 5.2% YoY, exceeding the 3% target. Strict payroll monitoring is recommended to avoid displacement of essential capital investment funds.",
    sentiment: 'negative',
    source: 'KPMG 2026 Budget Review'
  },
  {
    title: "Connect PNG Momentum",
    description: "The continued investment in the Connect PNG infrastructure program (K5.8B) is viewed positively for long-term supply chain resilience and market access for rural districts.",
    sentiment: 'positive',
    source: 'KPMG 2026 Budget Review'
  },
  {
    title: "SME Tax Incentives",
    description: "New tax incentives for Small and Medium Enterprises in the 2026 budget are a welcome move to diversify the economy away from the resource sector dependence.",
    sentiment: 'positive',
    source: 'KPMG 2026 Budget Review'
  }
];

// Simulated data reflecting PNG 2026 Budget Context
export const BUDGET_DATA: BudgetCode[] = [
  // --- SECTORS ---
  {
    id: 'SEC-01',
    name: 'Administration',
    category: 'Sector',
    allocation2024: 3200000000,
    allocation2025: 3400000000,
    allocation2026: 3550000000,
    description: 'General public administration, finance management, and governance.'
  },
  {
    id: 'SEC-02',
    name: 'Infrastructure (Connect PNG)',
    category: 'Sector',
    allocation2024: 4500000000,
    allocation2025: 5100000000,
    allocation2026: 5800000000,
    description: 'Roads, bridges, wharves, and airstrips under the Connect PNG program.'
  },
  {
    id: 'SEC-03',
    name: 'Health',
    category: 'Sector',
    allocation2024: 2800000000,
    allocation2025: 3100000000,
    allocation2026: 3400000000,
    description: 'Provincial health authorities, medical supplies, and hospital infrastructure.'
  },
  {
    id: 'SEC-04',
    name: 'Education',
    category: 'Sector',
    allocation2024: 3500000000,
    allocation2025: 3800000000,
    allocation2026: 4100000000,
    description: 'Tuition fee subsidies, teacher salaries, and school infrastructure.'
  },
  {
    id: 'SEC-05',
    name: 'Law & Justice',
    category: 'Sector',
    allocation2024: 1800000000,
    allocation2025: 1950000000,
    allocation2026: 2100000000,
    description: 'Police, judiciary, correctional services, and justice administration.'
  },
  {
    id: 'SEC-06',
    name: 'Economic',
    category: 'Sector',
    allocation2024: 1200000000,
    allocation2025: 1350000000,
    allocation2026: 1600000000,
    description: 'Agriculture, tourism, mining support, and SME development.'
  },
  {
    id: 'SEC-07',
    name: 'Debt Services',
    category: 'Sector',
    allocation2024: 3800000000,
    allocation2025: 4200000000,
    allocation2026: 4600000000,
    description: 'Interest payments and loan servicing commitments.'
  },
  {
    id: 'SEC-08',
    name: 'Provinces & Districts Grants',
    category: 'Sector',
    allocation2024: 2500000000,
    allocation2025: 3000000000,
    allocation2026: 3500000000,
    description: 'SIPs (DSIP/PSIP) and functional grants to sub-national governments.'
  },
  {
    id: 'SEC-09',
    name: 'Miscellaneous',
    category: 'Sector',
    allocation2024: 1100000000,
    allocation2025: 1200000000,
    allocation2026: 1450000000,
    description: 'Government office utilities, rentals, and contingency funds.'
  },

  // --- PROVINCES (All 22) ---
  { id: 'PROV-01', name: 'National Capital District', category: 'Province', allocation2024: 850000000, allocation2025: 900000000, allocation2026: 950000000, description: 'Capital city services.' },
  { id: 'PROV-02', name: 'Morobe', category: 'Province', allocation2024: 650000000, allocation2025: 720000000, allocation2026: 780000000, description: 'Lae city and industrial hub.' },
  { id: 'PROV-03', name: 'Eastern Highlands', category: 'Province', allocation2024: 450000000, allocation2025: 480000000, allocation2026: 510000000, description: 'Coffee industry support.' },
  { id: 'PROV-04', name: 'Enga', category: 'Province', allocation2024: 420000000, allocation2025: 460000000, allocation2026: 550000000, description: 'Porgera mine development.' },
  { id: 'PROV-05', name: 'East New Britain', category: 'Province', allocation2024: 380000000, allocation2025: 410000000, allocation2026: 440000000, description: 'Tourism and cocoa.' },
  { id: 'PROV-06', name: 'Southern Highlands', category: 'Province', allocation2024: 500000000, allocation2025: 520000000, allocation2026: 540000000, description: 'Resource projects.' },
  { id: 'PROV-07', name: 'Western Highlands', category: 'Province', allocation2024: 400000000, allocation2025: 430000000, allocation2026: 460000000, description: 'Mt Hagen city services.' },
  { id: 'PROV-08', name: 'Chimbu (Simbu)', category: 'Province', allocation2024: 280000000, allocation2025: 300000000, allocation2026: 320000000, description: 'Highlands regional support.' },
  { id: 'PROV-09', name: 'Hela', category: 'Province', allocation2024: 350000000, allocation2025: 380000000, allocation2026: 410000000, description: 'LNG project areas.' },
  { id: 'PROV-10', name: 'Jiwaka', category: 'Province', allocation2024: 200000000, allocation2025: 220000000, allocation2026: 240000000, description: 'Agricultural development.' },
  { id: 'PROV-11', name: 'Madang', category: 'Province', allocation2024: 410000000, allocation2025: 440000000, allocation2026: 470000000, description: 'Marine and tourism.' },
  { id: 'PROV-12', name: 'East Sepik', category: 'Province', allocation2024: 390000000, allocation2025: 420000000, allocation2026: 450000000, description: 'Cocoa and vanilla.' },
  { id: 'PROV-13', name: 'West Sepik (Sandaun)', category: 'Province', allocation2024: 290000000, allocation2025: 310000000, allocation2026: 330000000, description: 'Border development.' },
  { id: 'PROV-14', name: 'Manus', category: 'Province', allocation2024: 180000000, allocation2025: 200000000, allocation2026: 220000000, description: 'Maritime infrastructure.' },
  { id: 'PROV-15', name: 'New Ireland', category: 'Province', allocation2024: 250000000, allocation2025: 270000000, allocation2026: 290000000, description: 'Lihir mine support.' },
  { id: 'PROV-16', name: 'West New Britain', category: 'Province', allocation2024: 310000000, allocation2025: 340000000, allocation2026: 370000000, description: 'Oil palm industry.' },
  { id: 'PROV-17', name: 'Milne Bay', category: 'Province', allocation2024: 260000000, allocation2025: 280000000, allocation2026: 300000000, description: 'Tourism and fisheries.' },
  { id: 'PROV-18', name: 'Oro (Northern)', category: 'Province', allocation2024: 220000000, allocation2025: 240000000, allocation2026: 260000000, description: 'Palm oil and cocoa.' },
  { id: 'PROV-19', name: 'Central', category: 'Province', allocation2024: 300000000, allocation2025: 330000000, allocation2026: 360000000, description: 'Central city development.' },
  { id: 'PROV-20', name: 'Gulf', category: 'Province', allocation2024: 240000000, allocation2025: 260000000, allocation2026: 280000000, description: 'Papua LNG preparation.' },
  { id: 'PROV-21', name: 'Western (Fly River)', category: 'Province', allocation2024: 480000000, allocation2025: 500000000, allocation2026: 530000000, description: 'Ok Tedi mine areas.' },
  { id: 'PROV-22', name: 'Bougainville (ABG)', category: 'Province', allocation2024: 600000000, allocation2025: 650000000, allocation2026: 700000000, description: 'Autonomous government grants.' },

  // --- AGENCIES & DEPARTMENTS (Comprehensive List) ---
  {
    id: 'AGY-01',
    name: 'National Parliament',
    category: 'Agency',
    allocation2024: 140000000,
    allocation2025: 145000000,
    allocation2026: 155000000,
    description: 'Parliamentary services and legislative operations.'
  },
  {
    id: 'AGY-02',
    name: 'Office of the Governor-General',
    category: 'Agency',
    allocation2024: 9000000,
    allocation2025: 9500000,
    allocation2026: 10500000,
    description: 'Vice-regal operational support.'
  },
  {
    id: 'AGY-03',
    name: 'Dept of Prime Minister & NEC',
    category: 'Agency',
    allocation2024: 95000000,
    allocation2025: 98000000,
    allocation2026: 105000000,
    description: 'Executive government coordination.'
  },
  {
    id: 'AGY-04',
    name: 'National Statistical Office',
    category: 'Agency',
    allocation2024: 50000000,
    allocation2025: 120000000,
    allocation2026: 80000000,
    description: 'Census and national demographic statistics.'
  },
  {
    id: 'AGY-05',
    name: 'Office of Bougainville Affairs',
    category: 'Agency',
    allocation2024: 12000000,
    allocation2025: 13500000,
    allocation2026: 15000000,
    description: 'Coordination of ABG relations and referendum implementation.'
  },
  {
    id: 'AGY-06',
    name: 'Department of Finance',
    category: 'Agency',
    allocation2024: 180000000,
    allocation2025: 195000000,
    allocation2026: 210000000,
    description: 'Public financial management and accounting.'
  },
  {
    id: 'AGY-07',
    name: 'Department of Treasury',
    category: 'Agency',
    allocation2024: 150000000,
    allocation2025: 160000000,
    allocation2026: 175000000,
    description: 'Economic policy and budget formulation.'
  },
  {
    id: 'AGY-08',
    name: 'Dept of National Planning & Monitoring',
    category: 'Agency',
    allocation2024: 110000000,
    allocation2025: 115000000,
    allocation2026: 125000000,
    description: 'Development planning and PIP monitoring.'
  },
  {
    id: 'AGY-09',
    name: 'Auditor General\'s Office',
    category: 'Agency',
    allocation2024: 28000000,
    allocation2025: 30000000,
    allocation2026: 32000000,
    description: 'Public sector auditing and accountability.'
  },
  {
    id: 'AGY-10',
    name: 'Ombudsman Commission',
    category: 'Agency',
    allocation2024: 32000000,
    allocation2025: 34000000,
    allocation2026: 36000000,
    description: 'Leadership code enforcement and administrative complaints.'
  },
  {
    id: 'AGY-11',
    name: 'Electoral Commission',
    category: 'Agency',
    allocation2024: 80000000,
    allocation2025: 90000000,
    allocation2026: 400000000,
    description: 'Election preparation and management.'
  },
  {
    id: 'AGY-12',
    name: 'Dept of Provincial & Local Govt Affairs',
    category: 'Agency',
    allocation2024: 55000000,
    allocation2025: 58000000,
    allocation2026: 62000000,
    description: 'Sub-national government coordination.'
  },
  {
    id: 'AGY-13',
    name: 'Dept of Personnel Management',
    category: 'Agency',
    allocation2024: 45000000,
    allocation2025: 48000000,
    allocation2026: 52000000,
    description: 'Public service HR policy and management.'
  },
  {
    id: 'AGY-14',
    name: 'Public Service Commission',
    category: 'Agency',
    allocation2024: 14000000,
    allocation2025: 15000000,
    allocation2026: 16000000,
    description: 'Review of personnel matters.'
  },
  {
    id: 'AGY-15',
    name: 'Judiciary Services',
    category: 'Agency',
    allocation2024: 250000000,
    allocation2025: 270000000,
    allocation2026: 300000000,
    description: 'Courts administration (Supreme & National).'
  },
  {
    id: 'AGY-16',
    name: 'Magisterial Services',
    category: 'Agency',
    allocation2024: 65000000,
    allocation2025: 68000000,
    allocation2026: 75000000,
    description: 'District court administration.'
  },
  {
    id: 'AGY-17',
    name: 'Dept of Justice & Attorney General',
    category: 'Agency',
    allocation2024: 110000000,
    allocation2025: 115000000,
    allocation2026: 125000000,
    description: 'Legal advice and justice sector coordination.'
  },
  {
    id: 'AGY-18',
    name: 'Police (RPNGC)',
    category: 'Agency',
    allocation2024: 900000000,
    allocation2025: 980000000,
    allocation2026: 1100000000,
    description: 'Law enforcement and recruitment programs.'
  },
  {
    id: 'AGY-19',
    name: 'Correctional Services',
    category: 'Agency',
    allocation2024: 180000000,
    allocation2025: 190000000,
    allocation2026: 200000000,
    description: 'Prison management and rehabilitation.'
  },
  {
    id: 'AGY-20',
    name: 'PNG Defence Force',
    category: 'Agency',
    allocation2024: 400000000,
    allocation2025: 450000000,
    allocation2026: 500000000,
    description: 'National security and border protection.'
  },
  {
    id: 'AGY-21',
    name: 'Department of Education',
    category: 'Agency',
    allocation2024: 1200000000,
    allocation2025: 1300000000,
    allocation2026: 1450000000,
    description: 'Curriculum development and national examinations.'
  },
  {
    id: 'AGY-22',
    name: 'Dept of Higher Education (DHERST)',
    category: 'Agency',
    allocation2024: 320000000,
    allocation2025: 340000000,
    allocation2026: 360000000,
    description: 'University and technical college regulation.'
  },
  {
    id: 'AGY-23',
    name: 'Teaching Service Commission',
    category: 'Agency',
    allocation2024: 18000000,
    allocation2025: 19000000,
    allocation2026: 21000000,
    description: 'Teacher employment conditions.'
  },
  {
    id: 'AGY-24',
    name: 'Department of Health',
    category: 'Agency',
    allocation2024: 1500000000,
    allocation2025: 1650000000,
    allocation2026: 1800000000,
    description: 'National health standards and specialist hospitals.'
  },
  {
    id: 'AGY-25',
    name: 'Dept of Community Development',
    category: 'Agency',
    allocation2024: 35000000,
    allocation2025: 38000000,
    allocation2026: 42000000,
    description: 'Women, youth, and religion affairs.'
  },
  {
    id: 'AGY-26',
    name: 'National Volunteer Service',
    category: 'Agency',
    allocation2024: 4000000,
    allocation2025: 4500000,
    allocation2026: 5000000,
    description: 'Community volunteer deployment.'
  },
  {
    id: 'AGY-27',
    name: 'Department of Works & Highways',
    category: 'Agency',
    allocation2024: 2100000000,
    allocation2025: 2400000000,
    allocation2026: 2800000000,
    description: 'Implementation of national road network projects.'
  },
  {
    id: 'AGY-28',
    name: 'Department of Transport',
    category: 'Agency',
    allocation2024: 25000000,
    allocation2025: 28000000,
    allocation2026: 32000000,
    description: 'Transport policy and regulation.'
  },
  {
    id: 'AGY-29',
    name: 'Civil Aviation Safety Authority',
    category: 'Agency',
    allocation2024: 22000000,
    allocation2025: 24000000,
    allocation2026: 26000000,
    description: 'Aviation safety oversight.'
  },
  {
    id: 'AGY-30',
    name: 'Dept of Commerce & Industry',
    category: 'Agency',
    allocation2024: 18000000,
    allocation2025: 20000000,
    allocation2026: 22000000,
    description: 'Trade and industrial development.'
  },
  {
    id: 'AGY-31',
    name: 'Dept of Labor & Industrial Relations',
    category: 'Agency',
    allocation2024: 22000000,
    allocation2025: 24000000,
    allocation2026: 26000000,
    description: 'Workforce regulation and safety.'
  },
  {
    id: 'AGY-32',
    name: 'Investment Promotion Authority',
    category: 'Agency',
    allocation2024: 8000000,
    allocation2025: 9000000,
    allocation2026: 10000000,
    description: 'Business registration and investment promotion.'
  },
  {
    id: 'AGY-33',
    name: 'Small Medium Enterprise Corp',
    category: 'Agency',
    allocation2024: 45000000,
    allocation2025: 48000000,
    allocation2026: 52000000,
    description: 'SME support programs.'
  },
  {
    id: 'AGY-34',
    name: 'Dept of Agriculture & Livestock',
    category: 'Agency',
    allocation2024: 70000000,
    allocation2025: 75000000,
    allocation2026: 85000000,
    description: 'Agricultural policy and extension services.'
  },
  {
    id: 'AGY-35',
    name: 'NAQIA',
    category: 'Agency',
    allocation2024: 18000000,
    allocation2025: 19000000,
    allocation2026: 21000000,
    description: 'Biosecurity and quarantine.'
  },
  {
    id: 'AGY-36',
    name: 'Dept of Lands & Physical Planning',
    category: 'Agency',
    allocation2024: 40000000,
    allocation2025: 42000000,
    allocation2026: 46000000,
    description: 'Land administration and mapping.'
  },
  {
    id: 'AGY-37',
    name: 'Dept of Mineral Policy & Geohazards',
    category: 'Agency',
    allocation2024: 28000000,
    allocation2025: 30000000,
    allocation2026: 32000000,
    description: 'Mining policy and volcano monitoring.'
  },
  {
    id: 'AGY-38',
    name: 'Dept of Petroleum & Energy',
    category: 'Agency',
    allocation2024: 35000000,
    allocation2025: 38000000,
    allocation2026: 42000000,
    description: 'Oil and gas sector regulation.'
  },
  {
    id: 'AGY-39',
    name: 'Dept of Info & Communications Technology',
    category: 'Agency',
    allocation2024: 30000000,
    allocation2025: 33000000,
    allocation2026: 38000000,
    description: 'Digital transformation and ICT policy.'
  },
  {
    id: 'AGY-40',
    name: 'National Broadcasting Corporation',
    category: 'Agency',
    allocation2024: 28000000,
    allocation2025: 29000000,
    allocation2026: 32000000,
    description: 'Public radio and television.'
  },
  {
    id: 'AGY-41',
    name: 'Fire Service',
    category: 'Agency',
    allocation2024: 35000000,
    allocation2025: 38000000,
    allocation2026: 42000000,
    description: 'Emergency fire response.'
  },
  {
    id: 'AGY-42',
    name: 'Immigration & Citizenship Authority',
    category: 'Agency',
    allocation2024: 40000000,
    allocation2025: 44000000,
    allocation2026: 48000000,
    description: 'Visa and passport services.'
  },
  {
    id: 'AGY-43',
    name: 'Customs Service',
    category: 'Agency',
    allocation2024: 55000000,
    allocation2025: 58000000,
    allocation2026: 65000000,
    description: 'Border protection and trade facilitation.'
  },
  {
    id: 'AGY-44',
    name: 'Internal Revenue Commission',
    category: 'Agency',
    allocation2024: 85000000,
    allocation2025: 90000000,
    allocation2026: 100000000,
    description: 'Tax collection and administration.'
  },
  {
    id: 'AGY-45',
    name: 'Climate Change & Development Authority',
    category: 'Agency',
    allocation2024: 12000000,
    allocation2025: 14000000,
    allocation2026: 16000000,
    description: 'Climate action and carbon trade policy.'
  },
  {
    id: 'AGY-46',
    name: 'National Museum & Art Gallery',
    category: 'Agency',
    allocation2024: 7000000,
    allocation2025: 8000000,
    allocation2026: 9000000,
    description: 'Heritage preservation.'
  },
  {
    id: 'AGY-47',
    name: 'Tourism Promotion Authority',
    category: 'Agency',
    allocation2024: 18000000,
    allocation2025: 20000000,
    allocation2026: 22000000,
    description: 'Marketing PNG as a destination.'
  },
  {
    id: 'AGY-48',
    name: 'National Forest Authority',
    category: 'Agency',
    allocation2024: 40000000,
    allocation2025: 42000000,
    allocation2026: 45000000,
    description: 'Forestry regulation.'
  },
  {
    id: 'AGY-49',
    name: 'National Fisheries Authority',
    category: 'Agency',
    allocation2024: 15000000,
    allocation2025: 18000000,
    allocation2026: 20000000,
    description: 'Fisheries management (Grant component).'
  },
  {
    id: 'AGY-50',
    name: 'National Housing Corporation',
    category: 'Agency',
    allocation2024: 12000000,
    allocation2025: 14000000,
    allocation2026: 16000000,
    description: 'Public housing management.'
  }
];

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#d0ed57', '#a4de6c'];

export const SECTOR_DATA_2026 = BUDGET_DATA
  .filter(b => b.category === 'Sector')
  .map((b, index) => ({
    name: b.name,
    value: b.allocation2026,
    color: COLORS[index % COLORS.length]
  }));

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-PG', { style: 'currency', currency: 'PGK', maximumFractionDigits: 0 }).format(amount);
};

export const formatBillions = (amount: number) => {
  return `K${(amount / 1000000000).toFixed(1)}B`;
};