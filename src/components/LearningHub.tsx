import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Satellite, 
  Book, 
  Video, 
  FlaskConical, 
  Download, 
  Bookmark,
  ChevronRight,
  Play,
  Star,
  CloudRain,
  Droplets,
  Thermometer,
  Lightbulb,
  Redo
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';

const sources = [
  { id: 'kilimo', name: 'KILIMO', category: 'Government & Policy', color: 'kilimo' },
  { id: 'kalro', name: 'KALRO GAPs', category: 'Government & Policy', color: 'kalro' },
  { id: 'kaop', name: 'KAOP', category: 'Real-Time Advisory', color: 'kaop' },
  { id: 'aik', name: 'AIK', category: 'Real-Time Advisory', color: 'aik' },
  { id: 'plantwise', name: 'PlantwisePlus', category: 'Plant Health & Nutrition', color: 'plantwise' },
  { id: 'yara', name: 'YARA Kenya', category: 'Plant Health & Nutrition', color: 'yara' },
  { id: 'accessag', name: 'Access Agriculture', category: 'Multimedia & Guides', color: 'accessag' },
  { id: 'kfdg', name: 'KFDG', category: 'Multimedia & Guides', color: 'kfdg' },
];

const contentItems = [
  {
    id: 1,
    title: 'Maize Production Best Practices',
    description: 'Complete guide on maize land preparation, planting, weeding, and post-harvest handling according to official KALRO standards.',
    source: 'kalro',
    category: 'Maize',
    tags: ['Land Prep', 'Planting', 'Official'],
    icon: Book
  },
  {
    id: 2,
    title: 'Armyworm Detection and Management',
    description: 'Identify and manage armyworm outbreaks in maize using integrated pest management strategies.',
    source: 'plantwise',
    category: 'Pest Management',
    tags: ['Maize', 'Pest Control', 'Smart Alert'],
    icon: FlaskConical
  },
  {
    id: 3,
    title: 'Fertilizer Recommendation System',
    description: 'Get precise fertilizer recommendations based on soil type, crop stage, and yield targets from YARA experts.',
    source: 'yara',
    category: 'Nutrition',
    tags: ['Fertilizer', 'Soil Testing', 'Precision'],
    icon: FlaskConical
  },
  {
    id: 4,
    title: 'Real-Time Rainfall Monitoring',
    description: 'Satellite-based rainfall data and alerts for your specific location with planting recommendations.',
    source: 'kaop',
    category: 'Weather Advisory',
    tags: ['Rainfall', 'Satellite', 'Location'],
    icon: Satellite
  }
];

export default function LearningHub() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [hyperScore, setHyperScore] = useState(1250);

  const toggleSource = (sourceId: string) => {
    setSelectedSources(prev => 
      prev.includes(sourceId) 
        ? prev.filter(id => id !== sourceId) 
        : [...prev, sourceId]
    );
  };

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = selectedSources.length === 0 || selectedSources.includes(item.source);
    return matchesSearch && matchesSource;
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Learning & Advisory Hub</h1>
          <p className="text-primary-50 text-lg opacity-90">
            Access Kenya's most trusted agricultural databases and expert guidance to optimize your farm's productivity.
          </p>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-earth-200 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-earth-900 flex items-center gap-2 mb-6">
              <Filter size={20} className="text-primary-500" /> Filter by Source
            </h3>
            
            <div className="space-y-6">
              {['Government & Policy', 'Real-Time Advisory', 'Plant Health & Nutrition', 'Multimedia & Guides'].map(cat => (
                <div key={cat}>
                  <h4 className="text-[10px] font-bold text-earth-400 uppercase tracking-widest mb-3">{cat}</h4>
                  <div className="space-y-2">
                    {sources.filter(s => s.category === cat).map(source => (
                      <label key={source.id} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-earth-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                          checked={selectedSources.includes(source.id)}
                          onChange={() => toggleSource(source.id)}
                        />
                        <span className={cn("source-badge", source.color)}>{source.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setSelectedSources([])}
              className="w-full mt-8 flex items-center justify-center gap-2 py-3 bg-earth-100 text-earth-700 rounded-xl font-bold hover:bg-earth-200 transition-colors"
            >
              <Redo size={18} /> Reset Filters
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="space-y-8">
          {/* GAP Search Engine */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-earth-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Search className="text-primary-500" size={24} />
              <h2 className="text-xl font-bold text-earth-900">GAP Search Engine</h2>
            </div>
            <p className="text-earth-500 mb-6">Search KALRO Good Agricultural Practices database</p>
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Search GAP (e.g., Maize, Beans, Dairy)..."
                className="flex-1 px-6 py-4 bg-earth-50 border border-earth-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="px-8 py-4 bg-primary-500 text-white rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20">
                Search
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {['Maize', 'Beans', 'Dairy', 'Vegetables', 'Poultry'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSearchQuery(cat)}
                  className="px-4 py-2 bg-white border border-earth-200 rounded-full text-sm font-medium text-earth-600 hover:border-primary-500 hover:text-primary-600 transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* Satellite Advisor Widget */}
          <section className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-[2.5rem] border-2 border-primary-500 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Satellite className="text-primary-500" size={24} />
                <h2 className="text-xl font-bold text-primary-700">Satellite Advisor</h2>
              </div>
              <div className="flex gap-2">
                <span className="source-badge kaop">KAOP</span>
                <span className="source-badge kilimo">KILIMO</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <AdvisorCard icon={CloudRain} label="Rainfall" value="145 mm" sub="expected this month" />
              <AdvisorCard icon={Droplets} label="Soil Moisture" value="42%" sub="% optimal range" />
              <AdvisorCard icon={Thermometer} label="Temperature" value="24.5°C" sub="average" />
              <AdvisorCard 
                icon={Lightbulb} 
                label="Plant Now" 
                value="Maize" 
                sub="Based on KILIMO" 
                highlight 
              />
            </div>
          </section>

          {/* Content Grid */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-earth-900 flex items-center gap-3">
                <Book className="text-primary-500" /> Learning Resources
              </h2>
              <div className="bg-accent-500/10 text-accent-600 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                <Star size={16} fill="currentColor" /> {hyperScore} HyperScore
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredContent.map(item => (
                <div key={item.id} className="bg-white rounded-[2rem] border border-earth-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="p-6 bg-earth-50 border-b border-earth-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-500 shadow-sm">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-earth-900 group-hover:text-primary-600 transition-colors">{item.title}</h3>
                        <span className={cn("source-badge mt-1", item.source)}>{item.source.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-earth-600 leading-relaxed mb-6">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-earth-100 text-earth-500 rounded-lg text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-all flex items-center justify-center gap-2">
                        <Book size={18} /> Read Guide
                      </button>
                      <button className="p-3 bg-earth-100 text-earth-500 rounded-xl hover:bg-accent-500 hover:text-white transition-all">
                        <Bookmark size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Clinic Section */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-earth-200 shadow-sm">
            <h2 className="text-2xl font-bold text-earth-900 mb-8 flex items-center gap-3">
              <FlaskConical className="text-primary-500" /> Equipment & Nutrition Clinic
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ClinicCard 
                icon={FlaskConical} 
                title="Fertilizer Schedule" 
                source="yara" 
                desc="Get precision crop nutrition guidance based on soil type."
              />
              <ClinicCard 
                icon={Redo} 
                title="Equipment Maintenance" 
                source="aik" 
                desc="Step-by-step maintenance guides for farm equipment."
              />
              <ClinicCard 
                icon={Filter} 
                title="Pest & Disease ID" 
                source="plantwise" 
                desc="Identify and manage common pests and diseases."
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function AdvisorCard({ icon: Icon, label, value, sub, highlight }: any) {
  return (
    <div className={cn(
      "bg-white p-6 rounded-3xl text-center border-2 border-transparent transition-all hover:border-primary-500 hover:shadow-md",
      highlight && "border-accent-500 bg-accent-50/50"
    )}>
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4", highlight ? "bg-accent-500 text-white" : "bg-primary-50 text-primary-500")}>
        <Icon size={24} />
      </div>
      <h3 className="text-sm font-bold text-earth-500 mb-1">{label}</h3>
      <div className={cn("text-2xl font-bold", highlight ? "text-accent-600" : "text-primary-600")}>{value}</div>
      <p className="text-[10px] text-earth-400 font-medium uppercase tracking-wider mt-1">{sub}</p>
    </div>
  );
}

function ClinicCard({ icon: Icon, title, source, desc }: any) {
  return (
    <div className="p-6 rounded-3xl bg-earth-50 border border-earth-100 hover:border-primary-500 transition-all text-center flex flex-col items-center">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-500 shadow-sm mb-4">
        <Icon size={32} />
      </div>
      <h3 className="font-bold text-earth-900 mb-1">{title}</h3>
      <span className={cn("source-badge mb-4", source)}>{source.toUpperCase()}</span>
      <p className="text-xs text-earth-500 leading-relaxed mb-6">{desc}</p>
      <button className="w-full py-3 bg-white border-2 border-primary-500 text-primary-600 rounded-xl font-bold hover:bg-primary-500 hover:text-white transition-all">
        View Guide
      </button>
    </div>
  );
}
