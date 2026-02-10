import React, { useEffect, useState } from 'react';
import { productionApi } from '../services/api';
import { TrendingUp, DollarSign } from 'lucide-react';

const ProductionPage = () => {
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productionApi.getSuggestion()
      .then(res => setSuggestion(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading suggestions...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-green-600" />
          Production Suggestion
        </h2>
        <p className="text-gray-600 mb-6">
          Based on current stock and prioritizing higher-value products.
        </p>

        {suggestion?.suggestedProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {suggestion.suggestedProducts.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{item.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${item.unitPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">${item.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-right font-bold">Total Potential Value:</td>
                  <td className="px-6 py-4 font-bold text-green-600 text-xl flex items-center">
                    <DollarSign className="w-5 h-5" />
                    {suggestion.totalValue.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No products can be produced with the current stock.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductionPage;
