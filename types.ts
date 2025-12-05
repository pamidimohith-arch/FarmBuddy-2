export interface FarmerProfile {
  name: string;
  state: string;
  landSize: number; // in acres
  farmingType: string; // e.g., Organic, Conventional, Dairy
  mobileNumber?: string;
}

export interface SubsidyScheme {
  id: string;
  name: string;
  description: string;
  amount: string;
  eligibility: string[];
  documentsRequired: string[];
  category: 'Central' | 'State';
  deadline?: string;
}

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export const FARMING_TYPES = [
  "Organic Farming",
  "Conventional Farming",
  "Horticulture",
  "Dairy Farming",
  "Poultry",
  "Fisheries",
  "Sericulture"
];