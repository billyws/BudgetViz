import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { BUDGET_DATA, formatCurrency, KPMG_INSIGHTS, KPMG_REPORT_URL } from '../constants';

const API_KEY = process.env.API_KEY || '';

// Construct a context string from the mock data to ground the model
const dataContext = BUDGET_DATA.map(item => 
  `- ${item.name} (${item.category}): 2026 Allocation: ${formatCurrency(item.allocation2026)}. Description: ${item.description}`
).join('\n');

const externalAnalysisContext = KPMG_INSIGHTS.map(insight => 
  `- [Analyst Insight from ${insight.source}]: ${insight.title} - ${insight.description} (Sentiment: ${insight.sentiment})`
).join('\n');

const SYSTEM_INSTRUCTION = `You are the "Budget Bot", an expert AI assistant for the Papua New Guinea 2026 National Budget Dashboard. 
Your goal is to help citizens, journalists, and researchers understand budget allocations.

Here is the key data from the 2026 Budget documents you have access to:
${dataContext}

You also have access to independent analysis from KPMG's 2026 Budget Review:
${externalAnalysisContext}
Source URL for KPMG Report: ${KPMG_REPORT_URL}

Guidelines:
1. Always cite specific figures in Kina (PGK) when asked.
2. If comparing years, calculate the percentage increase/decrease roughly.
3. If users ask for an "independent view" or "critique", refer to the KPMG insights provided above.
4. Be professional, neutral, and helpful.
5. If a user asks about a sector not in your list, explain you only have high-level data for the major sectors provided.
6. The "Connect PNG" infrastructure program is a major highlight.
7. Keep answers concise (under 150 words) unless asked for a detailed breakdown.
`;

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

export const initializeChat = () => {
  if (!API_KEY) return;
  
  genAI = new GoogleGenAI({ apiKey: API_KEY });
  chatSession = genAI.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
};

export const sendMessage = async (message: string): Promise<string> => {
  if (!genAI || !chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    return "Error: API Key missing or initialization failed.";
  }

  try {
    const result: GenerateContentResponse = await chatSession.sendMessage({
      message: message,
    });
    return result.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I'm having trouble connecting to the budget database right now.";
  }
};