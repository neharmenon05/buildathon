import React from 'react';
import { TrendingUp, Store, Award, AlertCircle } from 'lucide-react';
import type { ActionCard } from '../types';

interface ActionCardsProps {
  cards: ActionCard[];
  language: string;
}

const ActionCards: React.FC<ActionCardsProps> = ({ cards, language }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pricing': return <TrendingUp className="text-green-600" size={20} />;
      case 'storage': return <Store className="text-blue-600" size={20} />;
      case 'schemes': return <Award className="text-orange-600" size={20} />;
      default: return <AlertCircle className="text-gray-600" size={20} />;
    }
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      high: { en: 'High Priority', hi: 'उच्च प्राथमिकता' },
      medium: { en: 'Medium Priority', hi: 'मध्यम प्राथमिकता' },
      low: { en: 'Low Priority', hi: 'कम प्राथमिकता' }
    };
    return labels[priority as keyof typeof labels]?.[language as 'en' | 'hi'] || priority;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        {language === 'hi' ? 'आपके लिए सुझाव' : 'Recommendations for You'}
      </h2>
      
      {cards.map((card) => (
        <div
          key={card.id}
          className={`border-l-4 rounded-lg p-4 ${getPriorityColor(card.priority)} shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              {getCategoryIcon(card.category)}
              <h3 className="ml-2 text-lg font-semibold text-gray-800">
                {language === 'hi' ? card.titleHindi : card.title}
              </h3>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              card.priority === 'high' ? 'bg-red-100 text-red-700' :
              card.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {getPriorityLabel(card.priority)}
            </span>
          </div>
          
          <p className="text-gray-700 mb-3">
            {language === 'hi' ? card.descriptionHindi : card.description}
          </p>
          
          <div className="bg-white p-3 rounded border-l-2 border-blue-400">
            <p className="font-medium text-blue-800">
              🎯 {language === 'hi' ? 'कार्य:' : 'Action:'} {language === 'hi' ? card.actionHindi : card.action}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActionCards;