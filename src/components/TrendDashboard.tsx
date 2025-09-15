import React from 'react';
import { TrendingUp, TrendingDown, BarChart3, Calendar, MapPin } from 'lucide-react';
import type { TrendData } from '../types';
import { trendingProducts } from '../data/mockData';

interface TrendDashboardProps {
  language: string;
}

const TrendDashboard: React.FC<TrendDashboardProps> = ({ language }) => {
  const getDemandIcon = (demand: string) => {
    switch (demand) {
      case 'high': return <TrendingUp className="text-green-600" size={16} />;
      case 'low': return <TrendingDown className="text-red-600" size={16} />;
      default: return <BarChart3 className="text-yellow-600" size={16} />;
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'bg-green-100 text-green-700';
      case 'low': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getDemandText = (demand: string) => {
    const texts = {
      high: { en: 'High', hi: 'ऊंची' },
      medium: { en: 'Medium', hi: 'मध्यम' },
      low: { en: 'Low', hi: 'कम' }
    };
    return texts[demand as keyof typeof texts]?.[language as 'en' | 'hi'] || demand;
  };

  const getProductNameHindi = (productName: string): string => {
    const names: Record<string, string> = {
      'Tomato': 'टमाटर',
      'Onion': 'प्याज', 
      'Green Chili': 'हरी मिर्च',
      'Potato': 'आलू',
      'Rice': 'चावल',
      'Wheat': 'गेहूं'
    };
    return names[productName] || productName;
  };

  const weeklyInsights = [
    {
      en: 'Tomato prices increased by 15% this week',
      hi: 'इस सप्ताह टमाटर की कीमतें 15% बढ़ीं'
    },
    {
      en: 'Green chili demand high due to festival season',
      hi: 'त्योहारी सीजन के कारण हरी मिर्च की मांग ज्यादा'
    },
    {
      en: 'Best time to sell stored onions',
      hi: 'भंडारित प्याज बेचने का सबसे अच्छा समय'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <BarChart3 className="mr-2 text-purple-600" size={24} />
          {language === 'hi' ? 'साप्ताहिक ट्रेंड्स' : 'Weekly Trends'}
        </h2>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-1" />
          {language === 'hi' ? 'अपडेटेड: आज' : 'Updated: Today'}
        </div>
      </div>

      {/* Market Overview */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-6 border-l-4 border-purple-500">
        <div className="flex items-center mb-2">
          <MapPin size={18} className="mr-2 text-purple-600" />
          <h3 className="font-semibold text-purple-800">
            {language === 'hi' ? 'आपके क्षेत्र में मार्केट अपडेट' : 'Market Update for Your Area'}
          </h3>
        </div>
        <p className="text-sm text-purple-700">
          {language === 'hi' 
            ? 'आज मंडी में अच्छी गतिविधि है। सब्जियों की मांग बढ़ी है।' 
            : 'Good activity in the market today. Vegetable demand has increased.'
          }
        </p>
      </div>

      {/* Trending Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {trendingProducts.map((product, index) => (
          <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-800">
                {language === 'hi' ? getProductNameHindi(product.product) : product.product}
              </h3>
              <div className="flex items-center">
                {getDemandIcon(product.demand)}
                <span className={`ml-1 px-2 py-1 text-xs rounded-full ${getDemandColor(product.demand)}`}>
                  {getDemandText(product.demand)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {language === 'hi' ? 'कीमत रेंज:' : 'Price Range:'}
                </span>
                <span className="font-medium">
                  ₹{product.priceRange.min}-{product.priceRange.max}/kg
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {language === 'hi' ? 'स्थिति:' : 'Status:'}
                </span>
                <span className="text-gray-700">{product.season}</span>
              </div>
              
              {/* Price Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" 
                  style={{ 
                    width: `${Math.min((product.priceRange.max / 70) * 100, 100)}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Insights */}
      <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
        <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
          💡 {language === 'hi' ? 'इस सप्ताह की मुख्य बातें' : 'Key Insights This Week'}
        </h3>
        <ul className="space-y-2">
          {weeklyInsights.map((insight, index) => (
            <li key={index} className="flex items-start text-sm text-yellow-700">
              <span className="text-yellow-600 mr-2">•</span>
              {language === 'hi' ? insight.hi : insight.en}
            </li>
          ))}
        </ul>
      </div>

      {/* Market Tips */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <div className="text-2xl mb-2">🌅</div>
          <h4 className="font-medium text-blue-800 mb-1">
            {language === 'hi' ? 'सबसे अच्छा समय' : 'Best Time'}
          </h4>
          <p className="text-xs text-blue-700">
            {language === 'hi' ? 'सुबह 6-9 बजे मंडी जाएं' : 'Visit market 6-9 AM'}
          </p>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <div className="text-2xl mb-2">📱</div>
          <h4 className="font-medium text-green-800 mb-1">
            {language === 'hi' ? 'डिजिटल मंडी' : 'Digital Market'}
          </h4>
          <p className="text-xs text-green-700">
            {language === 'hi' ? 'ऑनलाइन रेट चेक करें' : 'Check rates online'}
          </p>
        </div>
        
        <div className="bg-orange-50 p-3 rounded-lg text-center">
          <div className="text-2xl mb-2">🤝</div>
          <h4 className="font-medium text-orange-800 mb-1">
            {language === 'hi' ? 'सीधी बिक्री' : 'Direct Sales'}
          </h4>
          <p className="text-xs text-orange-700">
            {language === 'hi' ? 'ग्राहकों से सीधे संपर्क' : 'Connect directly with buyers'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendDashboard;