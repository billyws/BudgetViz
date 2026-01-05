
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { formatCurrency, KPMG_INSIGHTS, KPMG_REPORT_URL, TREASURY_URL, NSO_URL, FISCAL_METRICS, BUDGET_DATA } from '../constants';
import axios from "axios";

const SYSTEM_INSTRUCTION = `You are the "Budget Bot", an expert AI assistant for the Papua New Guinea National Budget Dashboard. 

2026 FISCAL HEALTH METRICS:
- Budget Deficit as % of GDP: 1.1% (Significant reduction from 2.2% in 2024).
- Debt-to-GDP Ratio: 45.5% Target (Down from 48.4% in 2025).
- Internal Funding: 88% of the budget is now internally funded.
- Domestic Revenue: K27.4 Billion of the K29.3B total.

SPENDING EFFICIENCY & PER CAPITA:
- National Per Capita Spending: K2,882 per person.
- Sector Examples: Education (K430/person), Health (K310/person), Connect PNG (K660/person).
- Operational vs Capital Split: K18.5 Billion Operational vs K10.8 Billion Capital/PIP.

KEY SECTOR GROWTH (2025 vs 2026):
- Health: +15.8% increase (Total K3.2B).
- Education: +11.3% increase (Total K4.9B).
- Law & Justice: +9.6% increase (Total K2.5B).

REVENUE HIERARCHY:
- #1 Primary Source: Personal Income Tax (PIT/PAYE) at K8.8 Billion.
- #2 Source: Mining & Petroleum Dividends at K7.5 Billion.
- #3 Source: Goods & Services Tax (GST) at K7.2 Billion.

Official Sources:
- Treasury: ${TREASURY_URL}
- Census/NSO: ${NSO_URL}
- KPMG Review: ${KPMG_REPORT_URL}

Guidelines:
1. When asked about budget "health", highlight the 1.1% deficit-to-GDP milestone.
2. Emphasize that 88% of the budget is internally funded, reducing reliance on external debt.
3. Use the per-capita figures to provide social context for spending.
4. Be accurate with the K6.8B Connect PNG and K8.8B PIT figures.
`;

let chatSession: Chat | null = null;

export const initializeChat = () => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  } catch (error) {
    console.error("Failed to initialize Gemini AI session:", error);
  }
};

export const sendMessage = async (message: string): Promise<string> => {
  if (!chatSession) initializeChat();
  if (!chatSession) return "Error: AI Assistant offline. Check API_KEY.";

  try {
    const result: GenerateContentResponse = await chatSession.sendMessage({ message });
    return result.text || "Summary unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Budget analysis engine busy. Please retry shortly.";
  }
};

export const fetchBudgetData = async (): Promise<any[]> => {
  // Return the static data from constants
  return Promise.resolve(BUDGET_DATA);
};
