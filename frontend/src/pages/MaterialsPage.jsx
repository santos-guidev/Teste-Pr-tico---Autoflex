import React, { useEffect, useState } from 'react';
import { materialsApi } from '../services/api';
import { Plus, Trash2 } from 'lucide-react';

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');

  const loadMaterials = () => materialsApi.getAll().then(res => setMaterials(res.data));

  useEffect(() => {
    loadMaterials();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    materialsApi.create({ name, stockQuantity: parseFloat(stock) }).then(() => {
      setName('');
      setStock('');
      loadMaterials();
    });
  };

  const handleDelete = (id) => {
    materialsApi.delete(id).then(loadMaterials);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Add Raw Material</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Material Name"
            className="border p-2 rounded flex-1 min-w-[200px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Stock Qty"
            className="border p-2 rounded w-32"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded flex items-center hover:bg-green-700">
            <Plus className="w-4 h-4 mr-1" /> Add
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {materials.map(material => (
              <tr key={material.id}>
                <td className="px-6 py-4">{material.name}</td>
                <td className="px-6 py-4">{material.stockQuantity}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(material.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialsPage;
