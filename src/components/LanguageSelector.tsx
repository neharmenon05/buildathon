import React from 'react';
import { Globe } from 'lucide-react';
import type { Language } from '../types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: 'en' as Language, name: 'English', native: 'English' },
    { code: 'hi' as Language, name: 'Hindi', native: 'हिंदी' },
    { code: 'mr' as Language, name: 'Marathi', native: 'मराठी' },
    { code: 'ta' as Language, name: 'Tamil', native: 'தமிழ்' }
  ];

  return (
    <div className="flex items-center bg-white rounded-lg shadow-sm border">
      <Globe size={18} className="ml-3 text-gray-600" />
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="p-2 bg-transparent border-none outline-none text-sm font-medium text-gray-700 cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.native}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;