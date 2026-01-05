
import { BudgetCode, AnalysisInsight } from './types';

export const KPMG_REPORT_URL = "https://assets.kpmg.com/content/dam/kpmg/pg/pdf/2025/KPMG_PNG_National_Budget_2026.pdf";
export const TREASURY_URL = "https://www.treasury.gov.pg";
export const NSO_URL = "https://www.nso.gov.pg/statistics/population/";

/**
 * FISCAL STRATEGY METRICS 2026 (Official Strategy Alignment)
 */
export const FISCAL_METRICS = {
  deficitGdp: 1.1,
  deficitGdp2024: 2.2,
  debtGdp: 45.5,
  debtGdp2025: 48.4,
  internalFundingRatio: 88,
  nationalPerCapita: 3035,
  operationalExp: 19100000000,
  capitalExp: 11813000000,
  domesticRevenue: 27400000000,
  totalExpenditure: 30913000000,
  totalRevenue: 29300000000,
};

export const KPMG_INSIGHTS: AnalysisInsight[] = [
  {
    title: "Fiscal Consolidation Path",
    description: "The reduction of the deficit to 1.1% of GDP is a significant milestone in the 13-year Budget Repair Plan.",
    sentiment: 'positive',
    source: 'KPMG 2026 Budget Review'
  },
  {
    title: "Functional Grant Increase",
    description: "K769.9 million allocated for Functional Grants ensures sub-national service delivery.",
    sentiment: 'positive',
    source: 'Budget Strategy 2026'
  },
  {
    title: "Revenue Volatility Risk",
    description: "Heavy reliance on commodity prices; a 10% gold/oil drop could widen the deficit significantly.",
    sentiment: 'warning',
    source: 'KPMG 2026 Budget Review'
  },
  {
    title: "PHA Funding Surge",
    description: "K1.47 billion total for Provincial Health Authorities (PHAs) aims to decentralize healthcare.",
    sentiment: 'positive',
    source: 'Volume 1 - 2026 Budget'
  },
  {
    title: "Security with Growth Theme",
    description: "The budget dual-focus on law & order (K2.5B) alongside 4.5% non-resource growth targets long-term stability.",
    sentiment: 'positive',
    source: 'KPMG 2026 Budget Review'
  },
  {
    title: "New Income Tax Act 2026",
    description: "Effective Jan 1, 2026. Businesses must prepare for significant changes in employee and corporate tax calculations.",
    sentiment: 'warning',
    source: 'KPMG 2026 Budget Review'
  },
  {
    title: "Path to 2027 Surplus",
    description: "Aggressive fiscal consolidation targets a balanced budget by 2027 and total debt clearance by 2034.",
    sentiment: 'positive',
    source: 'KPMG 2026 Budget Review'
  },
  {
    title: "Agriculture & SME Focus",
    description: "Record K1.5B for Agriculture and K0.8B for SMEs signals a shift towards diversifying the non-resource economy.",
    sentiment: 'positive',
    source: 'KPMG 2026 Budget Review'
  }
];

/**
 * COMPREHENSIVE BUDGET DATA (Volume 2 A-D Alignment)
 * Including 22 Provinces and key districts/projects.
 */

export const BUDGET_DATA: BudgetCode[] = [

  // --- REVENUE SOURCES ---
  { id: 'REV-03', name: 'Personal Income Tax (PAYE)', category: 'Revenue', allocation2024: 7200000000, allocation2025: 7800000000, allocation2026: 8800000000 },
  { id: 'REV-03-01', name: 'Public Sector PAYE', parentId: 'REV-03', category: 'Revenue', allocation2024: 2800000000, allocation2025: 3000000000, allocation2026: 3400000000 },
  { id: 'REV-03-02', name: 'Private Sector PAYE', parentId: 'REV-03', category: 'Revenue', allocation2024: 3200000000, allocation2025: 3500000000, allocation2026: 4000000000 },
  { id: 'REV-03-03', name: 'Mining & Resource Sector PAYE', parentId: 'REV-03', category: 'Revenue', allocation2024: 1200000000, allocation2025: 1300000000, allocation2026: 1400000000 },

  { id: 'REV-01', name: 'Mining & Petroleum Dividends', category: 'Revenue', allocation2024: 7800000000, allocation2025: 8400000000, allocation2026: 7500000000 },
  { id: 'REV-01-01', name: 'Ok Tedi Mining Dividends', parentId: 'REV-01', category: 'Revenue', allocation2024: 2100000000, allocation2025: 2300000000, allocation2026: 2000000000 },
  { id: 'REV-01-02', name: 'PNG LNG Project (ExxonMobil)', parentId: 'REV-01', category: 'Revenue', allocation2024: 2500000000, allocation2025: 2800000000, allocation2026: 2400000000 },
  { id: 'REV-01-03', name: 'Porgera Gold Mine', parentId: 'REV-01', category: 'Revenue', allocation2024: 1200000000, allocation2025: 1300000000, allocation2026: 1100000000 },
  { id: 'REV-01-04', name: 'Lihir Gold (Newmont)', parentId: 'REV-01', category: 'Revenue', allocation2024: 1000000000, allocation2025: 1100000000, allocation2026: 1000000000 },
  { id: 'REV-01-05', name: 'Other Mining & Petroleum', parentId: 'REV-01', category: 'Revenue', allocation2024: 1000000000, allocation2025: 900000000, allocation2026: 1000000000 },

  { id: 'REV-02', name: 'Goods & Services Tax (GST)', category: 'Revenue', allocation2024: 5500000000, allocation2025: 6400000000, allocation2026: 7200000000 },
  { id: 'REV-02-01', name: 'Retail & Wholesale GST', parentId: 'REV-02', category: 'Revenue', allocation2024: 2200000000, allocation2025: 2600000000, allocation2026: 2900000000 },
  { id: 'REV-02-02', name: 'Import GST', parentId: 'REV-02', category: 'Revenue', allocation2024: 1800000000, allocation2025: 2100000000, allocation2026: 2400000000 },
  { id: 'REV-02-03', name: 'Services Sector GST', parentId: 'REV-02', category: 'Revenue', allocation2024: 1000000000, allocation2025: 1200000000, allocation2026: 1400000000 },
  { id: 'REV-02-04', name: 'Hospitality & Tourism GST', parentId: 'REV-02', category: 'Revenue', allocation2024: 500000000, allocation2025: 500000000, allocation2026: 500000000 },

  { id: 'REV-04', name: 'Company Income Tax', category: 'Revenue', allocation2024: 3200000000, allocation2025: 3800000000, allocation2026: 4200000000 },
  { id: 'REV-04-01', name: 'Mining & Petroleum CIT', parentId: 'REV-04', category: 'Revenue', allocation2024: 1400000000, allocation2025: 1700000000, allocation2026: 1900000000 },
  { id: 'REV-04-02', name: 'Financial Services CIT', parentId: 'REV-04', category: 'Revenue', allocation2024: 800000000, allocation2025: 900000000, allocation2026: 1000000000 },
  { id: 'REV-04-03', name: 'Telecommunications CIT', parentId: 'REV-04', category: 'Revenue', allocation2024: 500000000, allocation2025: 600000000, allocation2026: 700000000 },
  { id: 'REV-04-04', name: 'Other Corporate CIT', parentId: 'REV-04', category: 'Revenue', allocation2024: 500000000, allocation2025: 600000000, allocation2026: 600000000 },

  { id: 'REV-05', name: 'Other Non-Tax Revenue', category: 'Revenue', allocation2024: 1100000000, allocation2025: 1400000000, allocation2026: 1600000000 },
  { id: 'REV-05-01', name: 'Government Fees & Charges', parentId: 'REV-05', category: 'Revenue', allocation2024: 400000000, allocation2025: 500000000, allocation2026: 600000000 },
  { id: 'REV-05-02', name: 'SOE Dividends', parentId: 'REV-05', category: 'Revenue', allocation2024: 350000000, allocation2025: 450000000, allocation2026: 500000000 },
  { id: 'REV-05-03', name: 'Customs & Excise Duties', parentId: 'REV-05', category: 'Revenue', allocation2024: 250000000, allocation2025: 300000000, allocation2026: 350000000 },
  { id: 'REV-05-04', name: 'Licenses & Permits', parentId: 'REV-05', category: 'Revenue', allocation2024: 100000000, allocation2025: 150000000, allocation2026: 150000000 },


  // --- SECTORS (Sum: K30.913B) --- 
  { id: 'SEC-02', name: 'Infrastructure (Connect PNG)', category: 'Sector', allocation2024: 4800000000, allocation2025: 5900000000, allocation2026: 6800000000 },
  { id: 'SEC-02-01', name: 'Dept of Works & Highways Major Roads', parentId: 'SEC-02', category: 'Sector', allocation2024: 2500000000, allocation2025: 3000000000, allocation2026: 3500000000 },
  { id: 'SEC-02-02', name: 'Connect PNG Missing Links', parentId: 'SEC-02', category: 'Sector', allocation2024: 1500000000, allocation2025: 1800000000, allocation2026: 2000000000 },
  { id: 'SEC-02-03', name: 'National Bridge Maintenance', parentId: 'SEC-02', category: 'Sector', allocation2024: 500000000, allocation2025: 700000000, allocation2026: 800000000 },
  { id: 'SEC-02-04', name: 'Strategic Airports Upgrades (CADIP)', parentId: 'SEC-02', category: 'Sector', allocation2024: 300000000, allocation2025: 400000000, allocation2026: 500000000 },

  { id: 'SEC-03', name: 'Education', category: 'Sector', allocation2024: 3800000000, allocation2025: 4402000000, allocation2026: 4900000000 },
  { id: 'SEC-03-01', name: 'Teachers Salaries & Benefits', parentId: 'SEC-03', category: 'Sector', allocation2024: 2500000000, allocation2025: 2800000000, allocation2026: 3000000000 },
  { id: 'SEC-03-02', name: 'Tuition Fee Free (TFF) Subsidy', parentId: 'SEC-03', category: 'Sector', allocation2024: 700000000, allocation2025: 750000000, allocation2026: 800000000 },
  { id: 'SEC-03-03', name: 'School Infrastructure PIP', parentId: 'SEC-03', category: 'Sector', allocation2024: 300000000, allocation2025: 450000000, allocation2026: 600000000 },
  { id: 'SEC-03-04', name: 'Higher Education (DHERST) Support', parentId: 'SEC-03', category: 'Sector', allocation2024: 300000000, allocation2025: 402000000, allocation2026: 500000000 },

  { id: 'SEC-04', name: 'Health (incl. PHAs)', category: 'Sector', allocation2024: 3200000000, allocation2025: 2763000000, allocation2026: 3200000000 },
  { id: 'SEC-04-01', name: 'Provincial Health Authorities (PHAs)', parentId: 'SEC-04', category: 'Sector', allocation2024: 1200000000, allocation2025: 1100000000, allocation2026: 1470000000 },
  { id: 'SEC-04-02', name: 'Medical Supplies Procurement', parentId: 'SEC-04', category: 'Sector', allocation2024: 900000000, allocation2025: 800000000, allocation2026: 1000000000 },
  { id: 'SEC-04-03', name: 'Hospital Management Services', parentId: 'SEC-04', category: 'Sector', allocation2024: 600000000, allocation2025: 500000000, allocation2026: 500000000 },
  { id: 'SEC-04-04', name: 'Rural Health Infrastructure', parentId: 'SEC-04', category: 'Sector', allocation2024: 500000000, allocation2025: 363000000, allocation2026: 230000000 },

  { id: 'SEC-05', name: 'Debt Services', category: 'Sector', allocation2024: 4500000000, allocation2025: 5200000000, allocation2026: 5800000000 },
  { id: 'SEC-05-01', name: 'Domestic Debt Interest', parentId: 'SEC-05', category: 'Sector', allocation2024: 2800000000, allocation2025: 3200000000, allocation2026: 3500000000 },
  { id: 'SEC-05-02', name: 'External Loan Interest', parentId: 'SEC-05', category: 'Sector', allocation2024: 1200000000, allocation2025: 1500000000, allocation2026: 1800000000 },
  { id: 'SEC-05-03', name: 'Loan Fees & Charges', parentId: 'SEC-05', category: 'Sector', allocation2024: 500000000, allocation2025: 500000000, allocation2026: 500000000 },

  { id: 'SEC-06', name: 'Law & Justice', category: 'Sector', allocation2024: 1900000000, allocation2025: 2281000000, allocation2026: 2500000000 },
  { id: 'SEC-06-01', name: 'Police (RPNGC) Operations', parentId: 'SEC-06', category: 'Sector', allocation2024: 900000000, allocation2025: 1100000000, allocation2026: 1200000000 },
  { id: 'SEC-06-02', name: 'Correctional Services', parentId: 'SEC-06', category: 'Sector', allocation2024: 500000000, allocation2025: 581000000, allocation2026: 600000000 },
  { id: 'SEC-06-03', name: 'Judiciary Services', parentId: 'SEC-06', category: 'Sector', allocation2024: 300000000, allocation2025: 350000000, allocation2026: 400000000 },
  { id: 'SEC-06-04', name: 'Attorney General & Justice Dept', parentId: 'SEC-06', category: 'Sector', allocation2024: 200000000, allocation2025: 250000000, allocation2026: 300000000 },

  { id: 'SEC-07', name: 'Economic & Agriculture', category: 'Sector', allocation2024: 1100000000, allocation2025: 1610000000, allocation2026: 3213000000 },
  { id: 'SEC-07-01', name: 'Agriculture (DAL) & Livestock', parentId: 'SEC-07', category: 'Sector', allocation2024: 500000000, allocation2025: 800000000, allocation2026: 1500000000 },
  { id: 'SEC-07-02', name: 'SME Corporation Support', parentId: 'SEC-07', category: 'Sector', allocation2024: 300000000, allocation2025: 500000000, allocation2026: 800000000 },
  { id: 'SEC-07-03', name: 'Lands & Physical Planning', parentId: 'SEC-07', category: 'Sector', allocation2024: 150000000, allocation2025: 200000000, allocation2026: 513000000 },
  { id: 'SEC-07-04', name: 'Tourism Promotion & Culture', parentId: 'SEC-07', category: 'Sector', allocation2024: 150000000, allocation2025: 110000000, allocation2026: 400000000 },

  { id: 'SEC-08', name: 'Public Administration', category: 'Sector', allocation2024: 4000000000, allocation2025: 4200000000, allocation2026: 4500000000 },
  { id: 'SEC-08-01', name: 'Grants to Provinces & LLGs', parentId: 'SEC-08', category: 'Sector', allocation2024: 1200000000, allocation2025: 1300000000, allocation2026: 1500000000 },
  { id: 'SEC-08-02', name: 'General Public Service Salaries', parentId: 'SEC-08', category: 'Sector', allocation2024: 1800000000, allocation2025: 1900000000, allocation2026: 2000000000 },
  { id: 'SEC-08-03', name: 'Parliamentary Services', parentId: 'SEC-08', category: 'Sector', allocation2024: 600000000, allocation2025: 600000000, allocation2026: 600000000 },
  { id: 'SEC-08-04', name: 'Electoral Commission', parentId: 'SEC-08', category: 'Sector', allocation2024: 400000000, allocation2025: 400000000, allocation2026: 400000000 },

  // --- PROVINCIAL DATA (VOLUME 2 A, B, C, D) ---

  // VOLUME 2A - SOUTHERN REGION & NCD
  { id: 'PROV-01', name: 'National Capital District', category: 'Province', allocation2024: 850000000, allocation2025: 900000000, allocation2026: 1200000000, population: 970170 },
  { id: 'PROV-01-D1', name: 'Moresby North-West', parentId: 'PROV-01', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-01-D2', name: 'Moresby North-East', parentId: 'PROV-01', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-01-D3', name: 'Moresby South', parentId: 'PROV-01', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-01-P1', name: 'NCD Roads Rehabilitation', parentId: 'PROV-01', category: 'Agency', allocation2024: 50000000, allocation2025: 80000000, allocation2026: 120000000 },

  { id: 'PROV-04', name: 'Western', category: 'Province', allocation2024: 550000000, allocation2025: 600000000, allocation2026: 720000000, population: 245399 },
  { id: 'PROV-04-D1', name: 'North Fly', parentId: 'PROV-04', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-04-D2', name: 'Middle Fly', parentId: 'PROV-04', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-04-D3', name: 'South Fly', parentId: 'PROV-04', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-04-P1', name: 'Daru Water Supply PIP', parentId: 'PROV-04', category: 'Agency', allocation2024: 5000000, allocation2025: 12000000, allocation2026: 25000000 },

  { id: 'PROV-06', name: 'Gulf', category: 'Province', allocation2024: 420000000, allocation2025: 480000000, allocation2026: 580000000, population: 158197 },
  { id: 'PROV-06-D1', name: 'Kerema', parentId: 'PROV-06', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-06-D2', name: 'Kikori', parentId: 'PROV-06', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-06-P1', name: 'Ihu Special Economic Zone', parentId: 'PROV-06', category: 'Agency', allocation2024: 5000000, allocation2025: 10000000, allocation2026: 20000000 },

  { id: 'PROV-07', name: 'Central', category: 'Province', allocation2024: 480000000, allocation2025: 540000000, allocation2026: 620000000, population: 269756 },
  { id: 'PROV-07-D1', name: 'Abau', parentId: 'PROV-07', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-07-D2', name: 'Rigo', parentId: 'PROV-07', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-07-D3', name: 'Kairuku', parentId: 'PROV-07', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-07-D4', name: 'Goilala', parentId: 'PROV-07', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-07-P1', name: 'Central Province HQ (Bautama)', parentId: 'PROV-07', category: 'Agency', allocation2024: 10000000, allocation2025: 25000000, allocation2026: 45000000 },

  { id: 'PROV-08', name: 'Milne Bay', category: 'Province', allocation2024: 480000000, allocation2025: 520000000, allocation2026: 640000000, population: 276512 },
  { id: 'PROV-08-D1', name: 'Alotau', parentId: 'PROV-08', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-08-D2', name: 'Esa-ala', parentId: 'PROV-08', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-08-D3', name: 'Kiriwina-Goodenough', parentId: 'PROV-08', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-08-D4', name: 'Samarai-Murua', parentId: 'PROV-08', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-08-P1', name: 'Alotau Wharf Upgrade', parentId: 'PROV-08', category: 'Agency', allocation2024: 5000000, allocation2025: 15000000, allocation2026: 30000000 },

  { id: 'PROV-09', name: 'Oro (Northern)', category: 'Province', allocation2024: 380000000, allocation2025: 420000000, allocation2026: 510000000, population: 186309 },
  { id: 'PROV-09-D1', name: 'Ijivitari', parentId: 'PROV-09', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-09-D2', name: 'Sohe', parentId: 'PROV-09', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-09-P1', name: 'Oro Bridges Reconstruction', parentId: 'PROV-09', category: 'Agency', allocation2024: 20000000, allocation2025: 35000000, allocation2026: 50000000 },

  // VOLUME 2B - MOMASE REGION
  { id: 'PROV-02', name: 'Morobe', category: 'Province', allocation2024: 1500000000, allocation2025: 1650000000, allocation2026: 1850000000, population: 992646 },
  { id: 'PROV-02-D1', name: 'Lae', parentId: 'PROV-02', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-02-D2', name: 'Bulolo', parentId: 'PROV-02', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-02-D3', name: 'Finschhafen', parentId: 'PROV-02', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-02-D4', name: 'Huon Gulf', parentId: 'PROV-02', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-02-D5', name: 'Kabwum', parentId: 'PROV-02', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-02-D6', name: 'Markham', parentId: 'PROV-02', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-02-D7', name: 'Menyamya', parentId: 'PROV-02', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-02-D8', name: 'Nawae', parentId: 'PROV-02', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-02-D9', name: 'Tewae-Siassi', parentId: 'PROV-02', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-02-D10', name: 'Wau-Waria', parentId: 'PROV-02', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-02-P1', name: 'Nadzab Tomodachi Airport Phase 2', parentId: 'PROV-02', category: 'Agency', allocation2024: 150000000, allocation2025: 200000000, allocation2026: 250000000 },

  { id: 'PROV-13', name: 'Madang', category: 'Province', allocation2024: 650000000, allocation2025: 720000000, allocation2026: 840000000, population: 493906 },
  { id: 'PROV-13-D1', name: 'Madang District', parentId: 'PROV-13', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-13-D2', name: 'Bogia', parentId: 'PROV-13', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-13-D3', name: 'Sumkar', parentId: 'PROV-13', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-13-D4', name: 'Usino-Bundi', parentId: 'PROV-13', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-13-D5', name: 'Rai Coast', parentId: 'PROV-13', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-13-D6', name: 'Middle Ramu', parentId: 'PROV-13', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-13-P1', name: 'Pacific Marine Industrial Zone (PMIZ)', parentId: 'PROV-13', category: 'Agency', allocation2024: 20000000, allocation2025: 45000000, allocation2026: 75000000 },

  { id: 'PROV-14', name: 'East Sepik', category: 'Province', allocation2024: 600000000, allocation2025: 650000000, allocation2026: 780000000, population: 550000 },
  { id: 'PROV-14-D1', name: 'Wewak', parentId: 'PROV-14', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-14-D2', name: 'Maprik', parentId: 'PROV-14', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-14-D3', name: 'Angoram', parentId: 'PROV-14', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-14-D4', name: 'Ambunti-Dreikikier', parentId: 'PROV-14', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-14-D5', name: 'Wosera-Gawi', parentId: 'PROV-14', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-14-D6', name: 'Yangoru-Saussia', parentId: 'PROV-14', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-14-P1', name: 'Sepik Plains Agriculture Project', parentId: 'PROV-14', category: 'Agency', allocation2024: 10000000, allocation2025: 20000000, allocation2026: 35000000 },

  { id: 'PROV-15', name: 'West Sepik (Sandaun)', category: 'Province', allocation2024: 420000000, allocation2025: 460000000, allocation2026: 540000000, population: 248411 },
  { id: 'PROV-15-D1', name: 'Vanimo-Green River', parentId: 'PROV-15', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-15-D2', name: 'Aitape-Lumi', parentId: 'PROV-15', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-15-D3', name: 'Nuku', parentId: 'PROV-15', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-15-D4', name: 'Telefomin', parentId: 'PROV-15', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-15-P1', name: 'Wutung Border Post Facilities', parentId: 'PROV-15', category: 'Agency', allocation2024: 5000000, allocation2025: 10000000, allocation2026: 20000000 },

  // VOLUME 2C - HIGHLANDS REGION
  { id: 'PROV-03', name: 'Southern Highlands', category: 'Province', allocation2024: 950000000, allocation2025: 980000000, allocation2026: 1100000000, population: 984868 },
  { id: 'PROV-03-D1', name: 'Ialibu-Pangia', parentId: 'PROV-03', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-03-D2', name: 'Imbonggu', parentId: 'PROV-03', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-03-D3', name: 'Kagua-Erave', parentId: 'PROV-03', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-03-D4', name: 'Mendi-Munihu', parentId: 'PROV-03', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-03-D5', name: 'Nipa-Kutubu', parentId: 'PROV-03', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-03-P1', name: 'Mendi Airport Upgrade', parentId: 'PROV-03', category: 'Agency', allocation2024: 15000000, allocation2025: 30000000, allocation2026: 45000000 },

  { id: 'PROV-05', name: 'Western Highlands', category: 'Province', allocation2024: 780000000, allocation2025: 820000000, allocation2026: 950000000, population: 730693 },
  { id: 'PROV-05-D1', name: 'Mount Hagen', parentId: 'PROV-05', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-05-D2', name: 'Dei', parentId: 'PROV-05', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-05-D3', name: 'Mul-Baiyer', parentId: 'PROV-05', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-05-D4', name: 'Tambul-Nebilyer', parentId: 'PROV-05', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-05-P1', name: 'Kagamuga Airport Redevelopment', parentId: 'PROV-05', category: 'Agency', allocation2024: 20000000, allocation2025: 45000000, allocation2026: 65000000 },

  { id: 'PROV-21', name: 'Hela', category: 'Province', allocation2024: 450000000, allocation2025: 500000000, allocation2026: 620000000, population: 352698 },
  { id: 'PROV-21-D1', name: 'Tari-Pori', parentId: 'PROV-21', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-21-D2', name: 'Koroba-Kopiago', parentId: 'PROV-21', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-21-D3', name: 'Komo-Magarima', parentId: 'PROV-21', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-21-P1', name: 'Hela LNG Infrastructure Grants', parentId: 'PROV-21', category: 'Agency', allocation2024: 25000000, allocation2025: 45000000, allocation2026: 70000000 },

  { id: 'PROV-11', name: 'Eastern Highlands', category: 'Province', allocation2024: 720000000, allocation2025: 780000000, allocation2026: 880000000, population: 579825 },
  { id: 'PROV-11-D1', name: 'Goroka', parentId: 'PROV-11', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-11-D2', name: 'Kainantu', parentId: 'PROV-11', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-11-D3', name: 'Daulo', parentId: 'PROV-11', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-11-D4', name: 'Henganofi', parentId: 'PROV-11', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-11-D5', name: 'Lufa', parentId: 'PROV-11', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-11-D6', name: 'Okapa', parentId: 'PROV-11', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-11-D7', name: 'Obura-Wonenara', parentId: 'PROV-11', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-11-D8', name: 'Unggai-Bena', parentId: 'PROV-11', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-11-P1', name: 'Goroka Water Supply Project', parentId: 'PROV-11', category: 'Agency', allocation2024: 10000000, allocation2025: 25000000, allocation2026: 40000000 },

  { id: 'PROV-10', name: 'Chimbu (Simbu)', category: 'Province', allocation2024: 550000000, allocation2025: 600000000, allocation2026: 720000000, population: 376280 },
  { id: 'PROV-10-D1', name: 'Kundiawa-Gembogl', parentId: 'PROV-10', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-10-D2', name: 'Chuave', parentId: 'PROV-10', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-10-D3', name: 'Gumine', parentId: 'PROV-10', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-10-D4', name: 'Karimui-Nomane', parentId: 'PROV-10', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-10-D5', name: 'Kerowagi', parentId: 'PROV-10', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-10-D6', name: 'Sina Sina-Yonggomugl', parentId: 'PROV-10', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-10-P1', name: 'Simbu Provincial Hospital Construction', parentId: 'PROV-10', category: 'Agency', allocation2024: 20000000, allocation2025: 45000000, allocation2026: 80000000 },

  { id: 'PROV-17', name: 'Enga', category: 'Province', allocation2024: 750000000, allocation2025: 820000000, allocation2026: 940000000, population: 432049 },
  { id: 'PROV-17-D1', name: 'Wabag', parentId: 'PROV-17', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-17-D2', name: 'Kandep', parentId: 'PROV-17', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-17-D3', name: 'Kompiam-Ambum', parentId: 'PROV-17', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-17-D4', name: 'Lagaip-Porgera', parentId: 'PROV-17', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-17-D5', name: 'Wapenamanda', parentId: 'PROV-17', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-17-P1', name: 'Enga Provincial Hospital Phase 2', parentId: 'PROV-17', category: 'Agency', allocation2024: 40000000, allocation2025: 75000000, allocation2026: 110000000 },

  { id: 'PROV-22', name: 'Jiwaka', category: 'Province', allocation2024: 380000000, allocation2025: 420000000, allocation2026: 520000000, population: 343979 },
  { id: 'PROV-22-D1', name: 'Anglimp-South Waghi', parentId: 'PROV-22', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-22-D2', name: 'Jimi', parentId: 'PROV-22', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-22-D3', name: 'North Waghi', parentId: 'PROV-22', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-22-P1', name: 'Kurumul Provincial HQ Development', parentId: 'PROV-22', category: 'Agency', allocation2024: 10000000, allocation2025: 25000000, allocation2026: 45000000 },

  // VOLUME 2D - ISLANDS REGION & BOUGAINVILLE
  { id: 'PROV-12', name: 'East New Britain', category: 'Province', allocation2024: 650000000, allocation2025: 720000000, allocation2026: 850000000, population: 436778 },
  { id: 'PROV-12-D1', name: 'Gazelle', parentId: 'PROV-12', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-12-D2', name: 'Kokopo', parentId: 'PROV-12', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-12-D3', name: 'Pomio', parentId: 'PROV-12', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-12-D4', name: 'Rabaul', parentId: 'PROV-12', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-12-P1', name: 'Tokua Airport Redevelopment', parentId: 'PROV-12', category: 'Agency', allocation2024: 25000000, allocation2025: 50000000, allocation2026: 95000000 },

  { id: 'PROV-18', name: 'West New Britain', category: 'Province', allocation2024: 480000000, allocation2025: 540000000, allocation2026: 620000000, population: 264264 },
  { id: 'PROV-18-D1', name: 'Hoskins', parentId: 'PROV-18', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-18-D2', name: 'Kandrian-Gloucester', parentId: 'PROV-18', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-18-D3', name: 'Talasea', parentId: 'PROV-18', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-18-P1', name: 'Kimbe Town Roads sealing', parentId: 'PROV-18', category: 'Agency', allocation2024: 5000000, allocation2025: 15000000, allocation2026: 25000000 },

  { id: 'PROV-19', name: 'New Ireland', category: 'Province', allocation2024: 450000000, allocation2025: 510000000, allocation2026: 590000000, population: 194067 },
  { id: 'PROV-19-D1', name: 'Kavieng', parentId: 'PROV-19', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-19-D2', name: 'Namatanai', parentId: 'PROV-19', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-19-P1', name: 'Boluminski Highway Maintenance', parentId: 'PROV-19', category: 'Agency', allocation2024: 10000000, allocation2025: 20000000, allocation2026: 35000000 },

  { id: 'PROV-20', name: 'Manus', category: 'Province', allocation2024: 280000000, allocation2025: 320000000, allocation2026: 380000000, population: 60485 },
  { id: 'PROV-20-D1', name: 'Manus District', parentId: 'PROV-20', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-20-P1', name: 'Manus Nali Island Ring Road', parentId: 'PROV-20', category: 'Agency', allocation2024: 5000000, allocation2025: 12000000, allocation2026: 18000000 },

  { id: 'PROV-16', name: 'Bougainville (AROB)', category: 'Province', allocation2024: 700000000, allocation2025: 780000000, allocation2026: 950000000, population: 333036 },
  { id: 'PROV-16-D1', name: 'North Bougainville', parentId: 'PROV-16', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-16-D2', name: 'Central Bougainville', parentId: 'PROV-16', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-16-D3', name: 'South Bougainville', parentId: 'PROV-16', category: 'District', allocation2024: 10000000, allocation2025: 10000000, allocation2026: 10000000 },
  { id: 'PROV-16-P1', name: 'Buka Ring Road Upgrades', parentId: 'PROV-16', category: 'Agency', allocation2024: 20000000, allocation2025: 35000000, allocation2026: 55000000 },
  { id: 'PROV-16-P2', name: 'Aropa Airport Fencing', parentId: 'PROV-16', category: 'Agency', allocation2024: 5000000, allocation2025: 8000000, allocation2026: 12000000 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6', '#F97316'];

const SECTOR_DATA_2026 = BUDGET_DATA
  .filter(b => b.category === 'Sector')
  .sort((a, b) => b.allocation2026 - a.allocation2026)
  .map((b, index) => ({
    name: b.name,
    value: b.allocation2026,
    color: COLORS[index % COLORS.length],
    id: b.id
  }));

const REVENUE_DATA_2026 = BUDGET_DATA
  .filter(b => b.category === 'Revenue' && !b.parentId)
  .sort((a, b) => b.allocation2026 - a.allocation2026)
  .map((b, index) => ({
    name: b.name,
    value: b.allocation2026,
    color: ['#10B981', '#059669', '#047857', '#065F46', '#064E3B', '#14532D', '#166534'][index % 7],
    id: b.id
  }));

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-PG', { style: 'currency', currency: 'PGK', maximumFractionDigits: 0 }).format(amount);
};

export const formatBillions = (amount: number) => {
  return `K${(amount / 1000000000).toFixed(2)}B`;
};
