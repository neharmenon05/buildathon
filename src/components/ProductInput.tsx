import React, { useState } from 'react';
import { Plus, Truck, IndianRupee } from 'lucide-react';
import type { Product } from '../types';
import { seasonalData } from '../data/mockData';

interface ProductInputProps {
  onProductAdd: (product: Product) => void;
  language: string;
}

const ProductInput: React.FC<ProductInputProps> = ({ onProductAdd, language }) => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [supplierPrice, setSupplierPrice] = useState('');
  const [unit, setUnit] = useState('kg');

  const commonProducts = [
    { en: 'Tomato', hi: 'टमाटर', key: 'tomato' },
    { en: 'Onion', hi: 'प्याज', key: 'onion' },
    { en: 'Potato', hi: 'आलू', key: 'potato' },
    { en: 'Rice', hi: 'चावल', key: 'rice' },
    { en: 'Wheat', hi: 'गेहूं', key: 'wheat' },
    { en: 'Green Chili', hi: 'हरी मिर्च', key: 'greenchili' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !quantity || !price) return;

    const product: Product = {
      id: Date.now().toString(),
      name: productName,
      nameHindi: getHindiName(productName),
      type: 'vegetable',
      quantity: parseFloat(quantity),
      unit,
      price: parseFloat(price),
      supplierPrice: supplierPrice ? parseFloat(supplierPrice) : undefined,
      createdAt: new Date()
    };

    onProductAdd(product);
    
    // Reset form
    setProductName('');
    setQuantity('');
    setPrice('');
    setSupplierPrice('');
  };

  const getHindiName = (name: string): string => {
    const product = commonProducts.find(p => 
      p.en.toLowerCase() === name.toLowerCase() || p.key === name.toLowerCase()
    );
    return product ? product.hi : name;
  };

  const getSuggestion = (productKey: string) => {
    const data = seasonalData[productKey.toLowerCase()];
    if (data) {
      return language === 'hi' 
        ? `सुझाव: ₹${data.currentPrice}/${unit} - ${data.tips.hi}`
        : `Suggestion: ₹${data.currentPrice}/${unit} - ${data.tips.en}`;
    }
    return '';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Plus className="mr-2 text-green-600" size={24} />
        {language === 'hi' ? 'उत्पाद जोड़ें' : 'Add Product'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quick Select Buttons */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            {language === 'hi' ? 'लोकप्रिय उत्पाद:' : 'Popular Products:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {commonProducts.map((product) => (
              <button
                key={product.key}
                type="button"
                onClick={() => {
                  setProductName(product.en);
                  setPrice(seasonalData[product.key]?.currentPrice.toString() || '');
                }}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {language === 'hi' ? product.hi : product.en}
              </button>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {language === 'hi' ? 'उत्पाद का नाम' : 'Product Name'}
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder={language === 'hi' ? 'जैसे: टमाटर, प्याज' : 'e.g., Tomato, Onion'}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Quantity and Unit */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'hi' ? 'मात्रा' : 'Quantity'}
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="w-24">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'hi' ? 'इकाई' : 'Unit'}
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="kg">Kg</option>
              <option value="quintal">Quintal</option>
              <option value="ton">Ton</option>
              <option value="piece">Piece</option>
            </select>
          </div>
        </div>

        {/* Current Market Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <IndianRupee size={16} className="mr-1" />
            {language === 'hi' ? 'वर्तमान बाजार दर (प्रति ' + unit + ')' : 'Current Market Price (per ' + unit + ')'}
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Supplier Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Truck size={16} className="mr-1" />
            {language === 'hi' ? 'आपूर्तिकर्ता से खरीदी दर (वैकल्पिक)' : 'Purchase Price from Supplier (Optional)'}
          </label>
          <input
            type="number"
            value={supplierPrice}
            onChange={(e) => setSupplierPrice(e.target.value)}
            placeholder="0"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Smart Suggestion */}
        {productName && (
          <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
            <p className="text-sm text-green-700 font-medium">
              💡 {getSuggestion(productName)}
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center"
        >
          <Plus size={20} className="mr-2" />
          {language === 'hi' ? 'उत्पाद जोड़ें' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductInput;