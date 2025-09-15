import React from 'react';
import { Sprout } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import type { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <Sprout className="text-green-600" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SmartBiz Hub</h1>
              <p className="text-green-100 text-sm">
                {language === 'hi' 
                  ? 'छोटे किसान और दुकानदारों के लिए स्मार्ट बिजनेस सलाह'
                  : 'Smart Business Insights for Small Farmers & Shopkeepers'
                }
              </p>
            </div>
          </div>
          
          <LanguageSelector 
            currentLanguage={language}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;