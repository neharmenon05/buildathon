import React from 'react';
import { Home, Plus, MessageCircle, Calculator, BarChart3, Mic } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  language: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, language }) => {
  const tabs = [
    { id: 'dashboard', icon: Home, label: { en: 'Home', hi: 'होम' } },
    { id: 'add-product', icon: Plus, label: { en: 'Add Product', hi: 'उत्पाद जोड़ें' } },
    { id: 'voice', icon: Mic, label: { en: 'Voice', hi: 'आवाज़' } },
    { id: 'marketing', icon: MessageCircle, label: { en: 'Marketing', hi: 'मार्केटिंग' } },
    { id: 'advisor', icon: Calculator, label: { en: 'Advisor', hi: 'सलाहकार' } },
    { id: 'trends', icon: BarChart3, label: { en: 'Trends', hi: 'ट्रेंड्स' } }
  ];

  return (
    <nav className="bg-white border-t border-gray-200 px-4 py-2 sticky bottom-0 shadow-lg">
      <div className="flex justify-around items-center max-w-6xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center px-2 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1 font-medium">
                {tab.label[language as 'en' | 'hi']}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;