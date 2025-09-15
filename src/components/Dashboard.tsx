import React from 'react';
import { TrendingUp, Users, IndianRupee, Calendar } from 'lucide-react';
import ActionCards from './ActionCards';
import { mockActionCards } from '../data/mockData';
import type { Product } from '../types';

interface DashboardProps {
  products: Product[];
  language: string;
}

const Dashboard: React.FC<DashboardProps> = ({ products, language }) => {
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const totalProducts = products.length;
  const avgPrice = totalProducts > 0 ? Math.round(totalValue / totalProducts) : 0;

  const stats = [
    {
      icon: IndianRupee,
      value: `₹${totalValue.toLocaleString()}`,
      label: language === 'hi' ? 'कुल मूल्य' : 'Total Value',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: TrendingUp,
      value: totalProducts.toString(),
      label: language === 'hi' ? 'उत्पाद' : 'Products',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Users,
      value: `₹${avgPrice}`,
      label: language === 'hi' ? 'औसत दर' : 'Avg Price',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Calendar,
      value: new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN'),
      label: language === 'hi' ? 'आज का दिन' : 'Today',
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          {language === 'hi' ? 'नमस्ते! SmartBiz Hub में आपका स्वागत है' : 'Welcome to SmartBiz Hub!'}
        </h2>
        <p className="text-green-100">
          {language === 'hi' 
            ? 'आज के व्यापार के लिए स्मार्ट सुझाव और बाजार की जानकारी प्राप्त करें।'
            : 'Get smart insights and market intelligence for your business today.'
          }
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {language === 'hi' ? 'आज करने योग्य काम' : 'Today\'s Quick Actions'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
            📊 {language === 'hi' ? 'मार्केट रेट देखें' : 'Check Market Rates'}
          </button>
          <button className="p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
            🛒 {language === 'hi' ? 'नया ऑर्डर' : 'New Order'}
          </button>
          <button className="p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
            💬 {language === 'hi' ? 'व्हाट्सएप मैसेज' : 'WhatsApp Message'}
          </button>
          <button className="p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium">
            🏛️ {language === 'hi' ? 'सरकारी योजना' : 'Govt Schemes'}
          </button>
        </div>
      </div>

      {/* Market Alert */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="text-yellow-600 text-xl">⚡</div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              {language === 'hi' ? 'मार्केट अलर्ट' : 'Market Alert'}
            </h3>
            <p className="text-sm text-yellow-700">
              {language === 'hi' 
                ? 'आज टमाटर की कीमत 15% बढ़ी है। बेचने का अच्छा समय है!'
                : 'Tomato prices increased by 15% today. Good time to sell!'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <ActionCards cards={mockActionCards} language={language} />
    </div>
  );
};

export default Dashboard;