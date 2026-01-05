<div align="center">
<img width="1200" height="475" alt="BudgetViz Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🇵🇬 BudgetViz: 2026 PNG National Budget Dashboard
**A modern, interactive visualization platform for the Papua New Guinea 2026 National Budget Strategy.**
</div>

## Purpose
BudgetViz is designed to bridge the gap between complex fiscal policy documents and public understanding. It provides a transparent, intuitive interface to explore how Papua New Guinea plans to allocate its resources for the 2026 fiscal year, focusing on the "Security with Growth" theme.

## Key Features
- **Executive Summary**: Real-time KPI cards for Total Expenditure, Revenue, Deficit % of GDP, and Debt-to-GDP ratios.
- **Interactive Drill-downs**: 
  - **Expenditure by Sector**: Multi-level pie charts showing major sectors (Health, Education, Infrastructure) with the ability to drill down into specific agencies and the "Other Sectors" category.
  - **Revenue Generation**: Visual breakdown of internal revenue streams, including GST, PAYE, and Mining & Petroleum dividends.
- **Provincial Equity Map**: A Leaflet-powered interactive map of PNG's 22 provinces, displaying per-capita allocation and district-level funding (DSIP).
- **Data Explorer**: A powerful searching and filtering tool to audit specific budget codes and flagship projects.
- **Budget Comparison**: Side-by-side analysis of budget items across 2024 (Actual), 2025 (Estimate), and 2026 (Projection).
- **AI-Powered Insights**: Integration with Google Gemini for automated budget commentary and strategy analysis.

## Tech Stack
- **Frontend**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS for modern, responsive UI
- **Visualization**: Recharts (Interactive Charts) & Leaflet (Geospatial Mapping)
- **Icons**: Lucide React
- **AI Integration**: Google Generative AI (Gemini Flash)
- **State Management**: React Hooks (useMemo, useEffect, useState)

## Data Sources
- **PNG Department of Treasury**: 2026 National Budget Strategy Paper (Volume 1 & 2).
- **KPMG PNG**: 2026 Budget Commentary and Economic Performance Analysis.
- **National Statistical Office (NSO)**: Provincial population projections for per-capita visualizations.

## Running Locally

**Prerequisites:**  Node.js (v18+)

1. **Clone the repository**:
   ```bash
   git clone [repository-url]
   cd budgetviz
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env` file or set the following variable:
   - `VITE_GEMINI_API_KEY`: Your Google AI Studio API Key.

4. **Start the development server**:
   ```bash
   npm run dev
   ```

---
*Disclaimer: This dashboard is a visualization tool based on publicly available strategy papers and is not an official government publication.*
