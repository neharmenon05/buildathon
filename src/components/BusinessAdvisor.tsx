import React, { useState } from 'react';
import { Calculator, Lightbulb, HandHeart, TrendingDown, ExternalLink } from 'lucide-react';
import type { Product, BusinessAdvice } from '../types';
import { governmentSchemes } from '../data/mockData';

interface BusinessAdvisorProps {
  products: Product[];
  language: string;
}

const BusinessAdvisor: React.FC<BusinessAdvisorProps> = ({ products, language }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [advice, setAdvice] = useState<BusinessAdvice | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const analyzeProduct = async (product: Product) => {
    setAnalyzing(true);
    
    // Simulate business analysis
    setTimeout(() => {
      const marginPercent = product.supplierPrice 
        ? Math.round(((product.price - product.supplierPrice) / product.supplierPrice) * 100)
        : 0;

      const costSavings = [
        `Direct sourcing can save ₹${Math.round(product.price * 0.15)} per ${product.unit}`,
        `Bulk buying (50+ ${product.unit}) offers 10-15% discount`,
        `Storage optimization can reduce waste by 20%`
      ];

      const costSavingsHindi = [
        `सीधी खरीदारी से ₹${Math.round(product.price * 0.15)} प्रति ${product.unit} की बचत`,
        `थोक खरीदारी (50+ ${product.unit}) पर 10-15% छूट मिलती है`,
        `भंडारण सुधार से 20% बर्बादी कम हो सकती है`
      ];

      const supplierTips = [
        `Contact local farmers directly through mandi apps`,
        `Join farmer producer organizations (FPOs) for better rates`,
        `Use government e-NAM platform for transparent pricing`
      ];

      const supplierTipsHindi = [
        `मंडी एप्स के जरिए सीधे स्थानीय किसानों से संपर्क करें`,
        `बेहतर रेट के लिए किसान उत्पादक संगठनों (FPO) से जुड़ें`,
        `पारदर्शी मूल्य निर्धारण के लिए सरकारी ई-नाम प्लेटफॉर्म का उपयोग करें`
      ];

      const relevantSchemes = governmentSchemes.filter(() => Math.random() > 0.3);

      setAdvice({
        costSavings,
        costSavingsHindi,
        supplierTips,
        supplierTipsHindi,
        governmentSchemes: relevantSchemes.map(s => s.name),
        governmentSchemesHindi: relevantSchemes.map(s => s.nameHindi)
      });
      
      setAnalyzing(false);
    }, 1500);
  };

  const getMarginColor = (product: Product) => {
    if (!product.supplierPrice) return 'text-gray-500';
    const margin = ((product.price - product.supplierPrice) / product.supplierPrice) * 100;
    if (margin > 30) return 'text-green-600';
    if (margin > 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  const calculateMargin = (product: Product) => {
    if (!product.supplierPrice) return 'N/A';
    return Math.round(((product.price - product.supplierPrice) / product.supplierPrice) * 100);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Calculator className="mr-2 text-blue-600" size={24} />
        {language === 'hi' ? 'व्यापार सलाहकार' : 'Business Advisor'}
      </h2>

      {products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Calculator size={48} className="mx-auto mb-4 opacity-30" />
          <p>{language === 'hi' ? 'विश्लेषण के लिए उत्पाद जोड़ें' : 'Add products for analysis'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Product Selection with Margin Display */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'hi' ? 'उत्पाद का विश्लेषण करें:' : 'Analyze Product:'}
            </label>
            <div className="grid grid-cols-1 gap-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedProduct?.id === product.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedProduct(product);
                    setAdvice(null);
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {language === 'hi' ? product.nameHindi : product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === 'hi' ? 'बाजार दर:' : 'Market Price:'} ₹{product.price}/{product.unit}
                      </p>
                      {product.supplierPrice && (
                        <p className="text-sm text-gray-600">
                          {language === 'hi' ? 'खरीदी दर:' : 'Purchase Price:'} ₹{product.supplierPrice}/{product.unit}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      {product.supplierPrice && (
                        <div className="mb-1">
                          <span className={`text-sm font-medium ${getMarginColor(product)}`}>
                            {calculateMargin(product)}% {language === 'hi' ? 'मार्जिन' : 'Margin'}
                          </span>
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        {product.quantity} {product.unit}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analyze Button */}
          {selectedProduct && (
            <button
              onClick={() => analyzeProduct(selectedProduct)}
              disabled={analyzing}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
            >
              <Lightbulb size={20} className="mr-2" />
              {analyzing
                ? (language === 'hi' ? 'विश्लेषण कर रहे हैं...' : 'Analyzing...')
                : (language === 'hi' ? 'व्यापार विश्लेषण करें' : 'Analyze Business')
              }
            </button>
          )}

          {/* Analysis Results */}
          {advice && (
            <div className="space-y-6 mt-6">
              {/* Cost Savings */}
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="flex items-center font-semibold text-green-800 mb-3">
                  <TrendingDown size={20} className="mr-2" />
                  {language === 'hi' ? 'लागत में बचत के तरीके' : 'Cost Saving Opportunities'}
                </h3>
                <ul className="space-y-2">
                  {(language === 'hi' ? advice.costSavingsHindi : advice.costSavings).map((saving, index) => (
                    <li key={index} className="flex items-start text-sm text-green-700">
                      <span className="text-green-600 mr-2">💰</span>
                      {saving}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Supplier Tips */}
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="flex items-center font-semibold text-blue-800 mb-3">
                  <Lightbulb size={20} className="mr-2" />
                  {language === 'hi' ? 'आपूर्तिकर्ता सुझाव' : 'Supplier Optimization'}
                </h3>
                <ul className="space-y-2">
                  {(language === 'hi' ? advice.supplierTipsHindi : advice.supplierTips).map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-blue-700">
                      <span className="text-blue-600 mr-2">🔗</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Government Schemes */}
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h3 className="flex items-center font-semibold text-orange-800 mb-3">
                  <HandHeart size={20} className="mr-2" />
                  {language === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {governmentSchemes.slice(0, 3).map((scheme, index) => (
                    <div key={index} className="bg-white p-3 rounded border">
                      <h4 className="font-medium text-orange-800 mb-1">
                        {language === 'hi' ? scheme.nameHindi : scheme.name}
                      </h4>
                      <p className="text-xs text-orange-700 mb-2">
                        {language === 'hi' ? scheme.descriptionHindi : scheme.description}
                      </p>
                      <p className="text-xs text-gray-600">
                        {language === 'hi' ? 'पात्रता: ' + scheme.eligibilityHindi : 'Eligibility: ' + scheme.eligibility}
                      </p>
                      <button className="mt-2 text-xs text-orange-600 hover:text-orange-700 flex items-center">
                        {language === 'hi' ? 'और जानें' : 'Learn More'}
                        <ExternalLink size={12} className="ml-1" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">
                  🎯 {language === 'hi' ? 'तुरंत करने योग्य काम' : 'Quick Actions'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <button className="p-2 bg-white rounded border text-sm text-left hover:bg-gray-50 transition-colors">
                    📱 {language === 'hi' ? 'ई-नाम ऐप डाउनलोड करें' : 'Download e-NAM app'}
                  </button>
                  <button className="p-2 bg-white rounded border text-sm text-left hover:bg-gray-50 transition-colors">
                    🤝 {language === 'hi' ? 'स्थानीय FPO से जुड़ें' : 'Connect with local FPO'}
                  </button>
                  <button className="p-2 bg-white rounded border text-sm text-left hover:bg-gray-50 transition-colors">
                    💳 {language === 'hi' ? 'किसान क्रेडिट कार्ड आवेदन' : 'Apply for KCC loan'}
                  </button>
                  <button className="p-2 bg-white rounded border text-sm text-left hover:bg-gray-50 transition-colors">
                    📊 {language === 'hi' ? 'मार्केट ट्रेंड ट्रैक करें' : 'Track market trends'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessAdvisor;