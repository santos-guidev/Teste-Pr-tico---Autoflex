import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Package, Truck, BarChart3 } from 'lucide-react';
import ProductsPage from './pages/ProductsPage';
import MaterialsPage from './pages/MaterialsPage';
import ProductionPage from './pages/ProductionPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8 items-center">
                <span className="text-xl font-bold text-blue-600">Autoflex Inventory</span>
                <div className="hidden md:flex space-x-4">
                  <Link to="/" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600">
                    <Package className="w-5 h-5 mr-1" /> Products
                  </Link>
                  <Link to="/materials" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600">
                    <Truck className="w-5 h-5 mr-1" /> Raw Materials
                  </Link>
                  <Link to="/production" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600">
                    <BarChart3 className="w-5 h-5 mr-1" /> Production Suggestion
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/production" element={<ProductionPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
