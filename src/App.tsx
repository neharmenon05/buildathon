import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ProductInput from './components/ProductInput';
import VoiceInput from './components/VoiceInput';
import MarketingGenerator from './components/MarketingGenerator';
import BusinessAdvisor from './components/BusinessAdvisor';
import TrendDashboard from './components/TrendDashboard';
import type { Product, Language } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState<Language>('hi');
  const [products, setProducts] = useState<Product[]>([]);
  const [voiceTranscript, setVoiceTranscript] = useState('');

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('smartbiz-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('smartbiz-products', JSON.stringify(products));
  }, [products]);

  const handleProductAdd = (product: Product) => {
    setProducts(prev => [...prev, product]);
    // Show success message
    const message = language === 'hi' ? 'उत्पाद सफलतापूर्वक जोड़ा गया!' : 'Product added successfully!';
    
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  const handleVoiceTranscript = (transcript: string) => {
    setVoiceTranscript(transcript);
    // Here you would process the voice input with AI
    // For now, we'll just show it was received
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard products={products} language={language} />;
      case 'add-product':
        return <ProductInput onProductAdd={handleProductAdd} language={language} />;
      case 'voice':
        return (
          <div className="space-y-6">
            <VoiceInput onTranscript={handleVoiceTranscript} language={language} />
            {voiceTranscript && (
              <div className="bg-white rounded-lg p-4 shadow-md">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {language === 'hi' ? 'AI प्रतिक्रिया:' : 'AI Response:'}
                </h3>
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                  <p className="text-blue-800">
                    {language === 'hi' 
                      ? 'आपका सवाल समझ गया। टमाटर की वर्तमान दर ₹42/किग्रा है। मांग अच्छी है, इसलिए यह बेचने का सही समय है।'
                      : 'I understand your question. Current tomato rate is ₹42/kg. Demand is good, so this is the right time to sell.'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      case 'marketing':
        return <MarketingGenerator products={products} language={language} />;
      case 'advisor':
        return <BusinessAdvisor products={products} language={language} />;
      case 'trends':
        return <TrendDashboard language={language} />;
      default:
        return <Dashboard products={products} language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        {renderContent()}
      </main>
      
      <Navigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
      />
    </div>
  );
}

export default App;