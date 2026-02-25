import React, { useState } from 'react';
import { ShoppingBag, Search, Filter, MapPin, ExternalLink, Star, Tag, Info } from 'lucide-react';
import { cn } from '../utils/cn';

const products = [
  { id: 1, name: 'Walking Tractor (12HP)', price: 'KSh 120,000', supplier: 'Agri-Tools Kenya', location: 'Nairobi', rating: 4.8, image: 'https://picsum.photos/seed/tractor/400/300' },
  { id: 2, name: 'Solar Irrigation Pump', price: 'KSh 45,000', supplier: 'SunCulture', location: 'Thika', rating: 4.9, image: 'https://picsum.photos/seed/pump/400/300' },
  { id: 3, name: 'Drip Irrigation Kit (1 Acre)', price: 'KSh 25,000', supplier: 'Amiran Kenya', location: 'Naivasha', rating: 4.7, image: 'https://picsum.photos/seed/drip/400/300' },
  { id: 4, name: 'Knapsack Sprayer (20L)', price: 'KSh 3,500', supplier: 'Local Agri-Store', location: 'Eldoret', rating: 4.5, image: 'https://picsum.photos/seed/sprayer/400/300' },
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-earth-900 tracking-tight">Global Agri-Market</h1>
          <p className="text-earth-500 mt-1">Find and compare agricultural equipment from trusted Kenyan suppliers.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400" size={18} />
            <input 
              type="text" 
              placeholder="Search equipment..." 
              className="pl-12 pr-6 py-3 bg-white border border-earth-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full md:w-64 shadow-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-3 bg-white border border-earth-200 rounded-2xl text-earth-500 hover:text-primary-500 transition-all shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-[2.5rem] border border-earth-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary-600 shadow-sm flex items-center gap-1">
                <Star size={12} fill="currentColor" /> {product.rating}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={14} className="text-primary-500" />
                <span className="text-[10px] font-bold text-earth-400 uppercase tracking-widest">Equipment</span>
              </div>
              <h3 className="text-lg font-bold text-earth-900 mb-1 group-hover:text-primary-600 transition-colors">{product.name}</h3>
              <p className="text-2xl font-black text-primary-600 mb-4">{product.price}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-earth-500">
                  <ShoppingBag size={14} /> {product.supplier}
                </div>
                <div className="flex items-center gap-2 text-xs text-earth-500">
                  <MapPin size={14} /> {product.location}
                </div>
              </div>

              <button className="w-full py-3 bg-earth-900 text-white rounded-xl font-bold hover:bg-earth-800 transition-all flex items-center justify-center gap-2">
                View Details <ExternalLink size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-primary-50 rounded-[3rem] p-10 border border-primary-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary-500 shadow-sm">
            <Info size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary-900">Are you a supplier?</h3>
            <p className="text-primary-700">List your products on HYPERBLOOM and reach thousands of farmers.</p>
          </div>
        </div>
        <button className="px-10 py-4 bg-primary-500 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-600 transition-all whitespace-nowrap">
          Register as Supplier
        </button>
      </section>
    </div>
  );
}
