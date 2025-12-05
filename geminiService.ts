import { GoogleGenAI, Type, Schema } from "@google/genai";
import { FarmerProfile, SubsidyScheme } from "../types";

// Define the schema for the AI response to ensure valid JSON
const subsidySchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING },
      name: { type: Type.STRING },
      description: { type: Type.STRING },
      amount: { type: Type.STRING },
      eligibility: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      documentsRequired: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      category: { type: Type.STRING, enum: ["Central", "State"] },
      deadline: { type: Type.STRING }
    },
    required: ["id", "name", "description", "amount", "eligibility", "documentsRequired", "category"]
  }
};

export const fetchPersonalizedSubsidies = async (profile: FarmerProfile): Promise<SubsidyScheme[]> => {
  const apiKey = process.env.API_KEY;
  
  // Fallback mock data if no API key is present (for prototype robustness)
  if (!apiKey) {
    console.warn("No API Key found. Returning mock data.");
    return [
      {
        id: "pm-kisan",
        name: "PM-Kisan Samman Nidhi",
        description: "Income support of ₹6,000 per year in three equal installments to all land holding farmer families.",
        amount: "₹6,000 / year",
        eligibility: ["Land holding farmer families", "Valid land records"],
        documentsRequired: ["Aadhaar Card", "Land Ownership Documents", "Bank Account Details"],
        category: "Central",
        deadline: "Open all year"
      },
      {
        id: "pm-kusum",
        name: "PM-KUSUM Scheme",
        description: "Subsidy for installation of standalone solar pumps and solarization of grid-connected agriculture pumps.",
        amount: "Up to 60% subsidy",
        eligibility: ["Farmers with cultivable land", "Valid electricity connection (for comp C)"],
        documentsRequired: ["Identity Proof", "Land Documents", "Bank Passbook"],
        category: "Central",
        deadline: "March 31, 2025"
      },
      {
        id: "state-specific-1",
        name: `Organic Farming Promotion Scheme (${profile.state})`,
        description: `State specific subsidy to encourage organic farming adoption in ${profile.state}.`,
        amount: "₹10,000 / acre",
        eligibility: ["Registered farmers", "Must practice organic farming for 3 years"],
        documentsRequired: ["Soil Health Card", "Organic Certification application"],
        category: "State",
        deadline: "August 2025"
      }
    ];
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Act as an expert agricultural consultant for the Indian government.
    I need a list of 5 relevant government subsidies (mix of Central and State specific) for a farmer with the following profile:
    
    Name: ${profile.name}
    State: ${profile.state}
    Land Size: ${profile.landSize} acres
    Farming Type: ${profile.farmingType}

    Provide accurate, real-world schemes like PM-Kisan, PM-FBY, PKVY, or state-specific schemes relevant to ${profile.state}.
    Ensure the eligibility criteria matches the land size of ${profile.landSize} acres.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: subsidySchema,
        temperature: 0.3, // Low temperature for factual accuracy
      },
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    const data = JSON.parse(jsonText) as SubsidyScheme[];
    return data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return empty array or throw, handled by UI
    throw new Error("Failed to fetch smart recommendations.");
  }
};