export interface Product {
  id: string;
  name: string;
  nameHindi: string;
  type: string;
  quantity: number;
  unit: string;
  price: number;
  supplierPrice?: number;
  createdAt: Date;
}

export interface ActionCard {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  action: string;
  actionHindi: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export interface MarketingContent {
  whatsappCaption: string;
  whatsappCaptionHindi: string;
  suggestedPrice: number;
  marketDemand: 'high' | 'medium' | 'low';
}

export interface BusinessAdvice {
  costSavings: string[];
  costSavingsHindi: string[];
  supplierTips: string[];
  supplierTipsHindi: string[];
  governmentSchemes: string[];
  governmentSchemesHindi: string[];
}

export interface TrendData {
  product: string;
  demand: 'high' | 'medium' | 'low';
  priceRange: { min: number; max: number };
  season: string;
}

export type Language = 'en' | 'hi' | 'mr' | 'ta';