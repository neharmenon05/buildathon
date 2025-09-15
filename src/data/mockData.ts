import type { ActionCard, TrendData } from '../types';

export const seasonalData: Record<string, any> = {
  'tomato': {
    currentPrice: 42,
    demand: 'high',
    season: 'peak',
    tips: {
      en: 'Tomato prices are high this week. Best time to sell!',
      hi: 'इस सप्ताह टमाटर की कीमतें ऊंची हैं। बेचने का सबसे अच्छा समय!'
    }
  },
  'onion': {
    currentPrice: 35,
    demand: 'medium',
    season: 'regular',
    tips: {
      en: 'Stable onion demand. Consider storing for better prices next month.',
      hi: 'प्याज की मांग स्थिर है। अगले महीने बेहतर कीमत के लिए भंडारण करें।'
    }
  },
  'potato': {
    currentPrice: 28,
    demand: 'medium',
    season: 'regular',
    tips: {
      en: 'Potato prices steady. Good for bulk sales.',
      hi: 'आलू की कीमतें स्थिर हैं। थोक बिक्री के लिए अच्छी हैं।'
    }
  },
  'rice': {
    currentPrice: 45,
    demand: 'high',
    season: 'peak',
    tips: {
      en: 'Rice demand is high due to festival season.',
      hi: 'त्योहारी सीजन के कारण चावल की मांग ज्यादा है।'
    }
  },
  'wheat': {
    currentPrice: 25,
    demand: 'medium',
    season: 'regular',
    tips: {
      en: 'Wheat prices are stable. Good time for regular sales.',
      hi: 'गेहूं की कीमतें स्थिर हैं। नियमित बिक्री के लिए अच्छा समय।'
    }
  }
};

export const governmentSchemes = [
  {
    name: 'PM-KISAN',
    nameHindi: 'पीएम-किसान',
    description: 'Direct income support of ₹6,000 per year',
    descriptionHindi: 'सालाना ₹6,000 की प्रत्यक्ष आय सहायता',
    eligibility: 'All farmer families',
    eligibilityHindi: 'सभी किसान परिवार'
  },
  {
    name: 'Crop Insurance',
    nameHindi: 'फसल बीमा',
    description: 'Insurance against crop loss',
    descriptionHindi: 'फसल नुकसान के खिलाफ बीमा',
    eligibility: 'All farmers',
    eligibilityHindi: 'सभी किसान'
  },
  {
    name: 'KCC Loan',
    nameHindi: 'किसान क्रेडिट कार्ड',
    description: 'Low interest agricultural loans',
    descriptionHindi: 'कम ब्याज पर कृषि ऋण',
    eligibility: 'Farmers with land records',
    eligibilityHindi: 'भूमि रिकॉर्ड वाले किसान'
  }
];

export const trendingProducts: TrendData[] = [
  {
    product: 'Tomato',
    demand: 'high',
    priceRange: { min: 38, max: 45 },
    season: 'Peak demand'
  },
  {
    product: 'Onion',
    demand: 'medium',
    priceRange: { min: 32, max: 38 },
    season: 'Stable'
  },
  {
    product: 'Green Chili',
    demand: 'high',
    priceRange: { min: 55, max: 65 },
    season: 'High demand'
  },
  {
    product: 'Potato',
    demand: 'medium',
    priceRange: { min: 25, max: 30 },
    season: 'Stable'
  }
];

export const mockActionCards: ActionCard[] = [
  {
    id: '1',
    title: 'Sell Tomatoes Now',
    titleHindi: 'अभी टमाटर बेचें',
    description: 'Tomato prices are at peak. Demand is high in your area.',
    descriptionHindi: 'टमाटर की कीमतें चरम पर हैं। आपके क्षेत्र में मांग अधिक है।',
    action: 'Sell at ₹42/kg this week',
    actionHindi: 'इस सप्ताह ₹42/किग्रा पर बेचें',
    priority: 'high',
    category: 'pricing'
  },
  {
    id: '2',
    title: 'Store Onions',
    titleHindi: 'प्याज स्टोर करें',
    description: 'Onion prices expected to rise next month.',
    descriptionHindi: 'अगले महीने प्याज की कीमतों में वृद्धि की उम्मीद है।',
    action: 'Store in cool, dry place for 4 weeks',
    actionHindi: 'ठंडी, सूखी जगह पर 4 सप्ताह के लिए स्टोर करें',
    priority: 'medium',
    category: 'storage'
  },
  {
    id: '3',
    title: 'Apply for PM-KISAN',
    titleHindi: 'पीएम-किसान के लिए आवेदन करें',
    description: 'Get ₹6,000 annual support from government.',
    descriptionHindi: 'सरकार से ₹6,000 वार्षिक सहायता प्राप्त करें।',
    action: 'Visit nearest CSC center',
    actionHindi: 'निकटतम सीएससी केंद्र पर जाएं',
    priority: 'high',
    category: 'schemes'
  }
];