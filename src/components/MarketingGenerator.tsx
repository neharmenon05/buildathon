import React, { useState } from 'react';
import { MessageCircle, Copy, Share, Sparkles } from 'lucide-react';
import type { Product, MarketingContent } from '../types';

interface MarketingGeneratorProps {
  products: Product[];
  language: string;
}

const MarketingGenerator: React.FC<MarketingGeneratorProps> = ({ products, language }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [marketingContent, setMarketingContent] = useState<MarketingContent | null>(null);
  const [generating, setGenerating] = useState(false);

  const generateMarketingContent = async (product: Product) => {
    setGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const festivals = ['दिवाली', 'होली', 'नवरात्रि', 'करवा चौथ'];
      const currentFestival = festivals[Math.floor(Math.random() * festivals.length)];
      
      const templates = {
        hindi: [
          `🌟 ताज़े ${product.nameHindi} 🥗\n₹${product.price}/${product.unit}\n${currentFestival} के लिए विशेष! 🎉\nआज ही ऑर्डर करें! 📞\n#ताजी_सब्जी #${currentFestival}_स्पेशल`,
          `🔥 फ्रेश ${product.nameHindi} 🌱\n💰 केवल ₹${product.price}/${product.unit}\n🎊 ${currentFestival} ऑफर!\n📲 अभी संपर्क करें!\n#गुणवत्ता #फ्रेश_मंडी`,
          `⭐ प्रीमियम ${product.nameHindi} ⭐\n🏷️ ₹${product.price}/${product.unit}\n🎁 ${currentFestival} धमाका ऑफर!\n✅ होम डिलीवरी उपलब्ध\n#सब्जी_मंडी #ऑर्गेनिक`
        ],
        english: [
          `🌟 Fresh ${product.name} 🥗\n₹${product.price}/${product.unit}\nSpecial for ${currentFestival}! 🎉\nOrder now! 📞\n#FreshVeggies #Festival_Special`,
          `🔥 Premium ${product.name} 🌱\n💰 Only ₹${product.price}/${product.unit}\n🎊 Festival Offer!\n📲 Call now!\n#Quality #FreshMarket`,
          `⭐ Organic ${product.name} ⭐\n🏷️ ₹${product.price}/${product.unit}\n🎁 Special Festival Price!\n✅ Home delivery available\n#Organic #VeggieMarket`
        ]
      };

      const hindiCaption = templates.hindi[Math.floor(Math.random() * templates.hindi.length)];
      const englishCaption = templates.english[Math.floor(Math.random() * templates.english.length)];

      const demand = product.price > 40 ? 'high' : product.price > 25 ? 'medium' : 'low';

      setMarketingContent({
        whatsappCaption: englishCaption,
        whatsappCaptionHindi: hindiCaption,
        suggestedPrice: Math.round(product.price * 1.05), // 5% markup suggestion
        marketDemand: demand
      });
      
      setGenerating(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(language === 'hi' ? 'कॉपी हो गया!' : 'Copied to clipboard!');
  };

  const shareOnWhatsApp = (text: string) => {
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDemandText = (demand: string) => {
    const texts = {
      high: { en: 'High Demand', hi: 'उच्च मांग' },
      medium: { en: 'Medium Demand', hi: 'मध्यम मांग' },
      low: { en: 'Low Demand', hi: 'कम मांग' }
    };
    return texts[demand as keyof typeof texts]?.[language as 'en' | 'hi'] || demand;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <MessageCircle className="mr-2 text-green-600" size={24} />
        {language === 'hi' ? 'व्हाट्सएप मार्केटिंग' : 'WhatsApp Marketing'}
      </h2>

      {products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MessageCircle size={48} className="mx-auto mb-4 opacity-30" />
          <p>{language === 'hi' ? 'पहले कोई उत्पाद जोड़ें' : 'Add a product first'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Product Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'hi' ? 'उत्पाद चुनें:' : 'Select Product:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product);
                    setMarketingContent(null);
                  }}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedProduct?.id === product.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">
                    {language === 'hi' ? product.nameHindi : product.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    ₹{product.price}/{product.unit} • {product.quantity}{product.unit}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          {selectedProduct && (
            <button
              onClick={() => generateMarketingContent(selectedProduct)}
              disabled={generating}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
            >
              <Sparkles size={20} className="mr-2" />
              {generating
                ? (language === 'hi' ? 'तैयार कर रहे हैं...' : 'Generating...')
                : (language === 'hi' ? 'मार्केटिंग कंटेंट बनाएं' : 'Generate Marketing Content')
              }
            </button>
          )}

          {/* Generated Content */}
          {marketingContent && (
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  {language === 'hi' ? 'जेनरेट किया गया कंटेंट' : 'Generated Content'}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getDemandColor(marketingContent.marketDemand)}`}>
                    {getDemandText(marketingContent.marketDemand)}
                  </span>
                  <span className="text-sm text-gray-600">
                    {language === 'hi' ? 'सुझावित कीमत:' : 'Suggested:'} ₹{marketingContent.suggestedPrice}
                  </span>
                </div>
              </div>

              {/* WhatsApp Caption */}
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-green-800">
                    {language === 'hi' ? 'व्हाट्सएप संदेश:' : 'WhatsApp Message:'}
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(
                        language === 'hi' ? marketingContent.whatsappCaptionHindi : marketingContent.whatsappCaption
                      )}
                      className="p-1 text-green-600 hover:text-green-700"
                      title={language === 'hi' ? 'कॉपी करें' : 'Copy'}
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      onClick={() => shareOnWhatsApp(
                        language === 'hi' ? marketingContent.whatsappCaptionHindi : marketingContent.whatsappCaption
                      )}
                      className="p-1 text-green-600 hover:text-green-700"
                      title={language === 'hi' ? 'व्हाट्सएप पर शेयर करें' : 'Share on WhatsApp'}
                    >
                      <Share size={16} />
                    </button>
                  </div>
                </div>
                <div className="bg-white p-3 rounded border font-mono text-sm whitespace-pre-line">
                  {language === 'hi' ? marketingContent.whatsappCaptionHindi : marketingContent.whatsappCaption}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">
                  💡 {language === 'hi' ? 'मार्केटिंग टिप्स:' : 'Marketing Tips:'}
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• {language === 'hi' ? 'सुबह 8-10 बजे और शाम 5-7 बजे पोस्ट करें' : 'Post between 8-10 AM and 5-7 PM'}</li>
                  <li>• {language === 'hi' ? 'अपने ग्राहकों के व्हाट्सएप ग्रुप में शेयर करें' : 'Share in customer WhatsApp groups'}</li>
                  <li>• {language === 'hi' ? 'असली फोटो जोड़ें बेहतर रिस्पांस के लिए' : 'Add real photos for better response'}</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketingGenerator;