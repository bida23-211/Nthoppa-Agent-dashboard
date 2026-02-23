import React, { useState, useMemo } from 'react';
import { products, Product } from '@/data/dashboardData';

const categoryLabels: Record<string, string> = {
  all: 'All Products',
  loans: 'Loans',
  insurance: 'Insurance',
  investments: 'Investments',
  health: 'Health',
  motor: 'Motor',
  life: 'Life',
};

const categoryColors: Record<string, string> = {
  loans: '#3B82F6',
  insurance: '#A855F7',
  investments: '#F59E0B',
  health: '#EF4444',
  motor: '#06B6D4',
  life: '#22C55E',
};

const ProductCatalog: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = [...products];
    if (categoryFilter !== 'all') result = result.filter(p => p.category === categoryFilter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.provider.toLowerCase().includes(q));
    }
    return result;
  }, [categoryFilter, search]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? 'text-yellow-400' : i - 0.5 <= rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ))}
        <span className="text-gray-400 text-xs ml-1">{rating} ({products[0].reviews})</span>
      </div>
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'loans':
        return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'health':
        return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
      case 'motor':
        return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 0a2 2 0 110-4h8a2 2 0 110 4m-8 0v10m8-10v10m-8 0h8m-8 0a2 2 0 110 4h8a2 2 0 110-4" /></svg>;
      case 'life':
        return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
      case 'insurance':
        return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
      case 'investments':
        return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
      default:
        return <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth={2} /></svg>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#161b22] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCategoryFilter(key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                categoryFilter === key
                  ? 'bg-orange-500 text-white'
                  : 'bg-[#161b22] border border-gray-700 text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-[#161b22] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-black/20 group"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${product.color}20`, color: product.color }}>
                {getCategoryIcon(product.category)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm group-hover:text-orange-400 transition-colors">{product.name}</h4>
                <p className="text-gray-500 text-xs">{product.provider}</p>
                <div className="mt-1">{renderStars(product.rating)}</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.features.slice(0, 3).map((f, i) => (
                <span key={i} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">{f}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-800">
              <div>
                <p className="text-gray-500 text-xs">Starting from</p>
                <p className="text-white text-sm font-semibold">{product.startingPrice}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs">Commission</p>
                <p className="text-green-400 text-sm font-semibold">{product.commissionRate}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-[#161b22] border border-gray-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-lg">Product Details</h3>
                <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${selectedProduct.color}20`, color: selectedProduct.color }}>
                  {getCategoryIcon(selectedProduct.category)}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{selectedProduct.name}</h4>
                  <p className="text-gray-500 text-sm">{selectedProduct.provider}</p>
                  <div className="mt-1">{renderStars(selectedProduct.rating)}</div>
                </div>
              </div>

              <div className="mb-5">
                <h5 className="text-white font-semibold mb-2">Description</h5>
                <p className="text-gray-400 text-sm">{selectedProduct.description}</p>
              </div>

              <div className="mb-5">
                <h5 className="text-white font-semibold mb-2">Key Features</h5>
                <div className="space-y-2">
                  {selectedProduct.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg className="w-5 h-5 flex-shrink-0" style={{ color: selectedProduct.color }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-300 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h5 className="text-white font-semibold mb-2">Pricing</h5>
                <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Starting from:</span>
                    <span className="text-white font-semibold">{selectedProduct.startingPrice}</span>
                  </div>
                  {selectedProduct.maxCoverage && (
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Maximum coverage:</span>
                      <span className="text-white font-semibold">{selectedProduct.maxCoverage}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-700">
                    <span className="text-gray-400 text-sm">Your commission:</span>
                    <span className="text-green-400 font-bold">{selectedProduct.commissionRate}%</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  Calculate Premium
                </button>
                <button className="flex-1 text-white py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2" style={{ backgroundColor: selectedProduct.color }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
