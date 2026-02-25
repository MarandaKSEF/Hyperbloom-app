import React from 'react';
import { 
  CloudSun, 
  ShieldAlert, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  Droplets,
  Wind,
  Thermometer,
  Sprout,
  Stethoscope,
  BookOpen,
  ShoppingBag,
  Wallet,
  CheckSquare,
  MessageSquare,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

export default function Dashboard({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const services = [
    { id: 'weather', label: 'Weather & Forecasts', desc: 'Get localized forecasts to plan your farming activities and protect your crops.', icon: CloudSun, color: 'bg-blue-500' },
    { id: 'alerts', label: 'Disease Detection', desc: 'AI-powered diagnosis for plants and livestock with expert treatment plans.', icon: Stethoscope, color: 'bg-red-500' },
    { id: 'learning', label: 'Learning & Advisory', desc: 'Access official practices from KALRO, KILIMO, and international experts.', icon: BookOpen, color: 'bg-primary-500' },
    { id: 'marketplace', label: 'Global Agri-Market', desc: 'Search and compare equipment across Kenya\'s trusted suppliers.', icon: ShoppingBag, color: 'bg-orange-500' },
    { id: 'finance', label: 'Finance Tracker', desc: 'Monitor your farm\'s profitability with real-time income and expense tracking.', icon: Wallet, color: 'bg-emerald-500' },
    { id: 'checklist', label: 'Farm Checklist', desc: 'Manage daily tasks and seasonal operations to ensure nothing falls through.', icon: CheckSquare, color: 'bg-yellow-500' },
    { id: 'schedule', label: 'Schedule & Calendar', desc: 'Plan your farming season with automated reminders and task scheduling.', icon: Calendar, color: 'bg-indigo-500' },
    { id: 'chat', label: 'AI Assistant', desc: 'Consult our intelligent assistant for any agricultural challenges you face.', icon: MessageSquare, color: 'bg-primary-600' },
  ];

  return (
    <div className="-mt-6 lg:-mt-12 space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[500px] h-[60vh] max-h-[800px] flex items-center justify-center overflow-hidden rounded-[3rem] lg:rounded-[4rem] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&h=1080&auto=format&fit=crop" 
            alt="Farm Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-earth-900/90 via-earth-900/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 sm:px-12 lg:px-24 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 backdrop-blur-md border border-primary-500/30 rounded-full text-primary-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
              <div className="w-4 h-4 rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=50&h=50&auto=format&fit=crop" alt="Logo" className="w-full h-full object-cover" />
              </div>
              The Future of Farming
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-8">
              Grow Smarter, <br />
              <span className="text-primary-400">Harvest Better.</span>
            </h1>
            <p className="text-xl text-earth-200 mb-12 leading-relaxed max-w-xl">
              Your all-in-one digital farming platform powered by satellite data, expert knowledge, and intelligent tools to help you make better decisions.
            </p>
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => onNavigate('learning')}
                className="px-10 py-5 bg-primary-500 text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary-500/40 hover:bg-primary-600 transition-all active:scale-95"
              >
                Get Started Free
              </button>
              <button 
                onClick={() => onNavigate('weather')}
                className="px-10 py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl font-black text-lg hover:bg-white/20 transition-all active:scale-95"
              >
                Explore Services
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Stats Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-12 right-12 hidden xl:block"
        >
          <div className="glass p-8 rounded-[2.5rem] shadow-2xl border-white/20 flex flex-col gap-6 w-80">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-accent-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
                <Star size={24} fill="currentColor" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest">HyperScore</p>
                <p className="text-2xl font-black text-earth-900">1,250</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-2 bg-earth-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 w-3/4 rounded-full"></div>
              </div>
              <p className="text-xs text-earth-500 font-medium">You're in the top 5% of farmers in your region!</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Purpose Section */}
      <section className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-black text-earth-900 tracking-tight mb-6">What is Hyperbloom?</h2>
          <p className="text-lg text-earth-500 leading-relaxed">
            Hyperbloom is a comprehensive digital farming assistant designed specifically for Kenyan farmers. We combine official agricultural best practices, real-time satellite data, and expert clinics to help you optimize every aspect of your farm.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <PurposeItem 
            icon={BookOpen} 
            title="Learn from Experts" 
            desc="Access official guides from KALRO, KILIMO, and international agricultural organizations."
          />
          <PurposeItem 
            icon={CloudSun} 
            title="Real-Time Data" 
            desc="Monitor your farm with satellite imagery, rainfall data, and soil moisture insights."
          />
          <PurposeItem 
            icon={ShoppingBag} 
            title="Smart Marketplace" 
            desc="Compare and purchase quality agricultural equipment from trusted Kenyan suppliers."
          />
          <PurposeItem 
            icon={TrendingUp} 
            title="Track & Manage" 
            desc="Monitor finances, health of crops, and farm operations all in one secure place."
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black text-earth-900 tracking-tight mb-4">What You Can Do</h2>
            <p className="text-lg text-earth-500 leading-relaxed">
              Explore our comprehensive suite of farm management tools designed to help you succeed in modern agriculture.
            </p>
          </div>
          <button 
            onClick={() => onNavigate('chat')}
            className="group flex items-center gap-3 px-8 py-4 bg-earth-900 text-white rounded-2xl font-bold hover:bg-earth-800 transition-all"
          >
            Talk to AI Assistant <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service) => (
            <button 
              key={service.id}
              onClick={() => onNavigate(service.id)}
              className="group bg-white p-8 xl:p-10 rounded-[3rem] border border-earth-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all text-left flex flex-col h-full relative overflow-hidden"
            >
              <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white mb-8 shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-3", service.color)}>
                <service.icon size={32} />
              </div>
              <h3 className="text-xl font-black text-earth-900 mb-4 group-hover:text-primary-600 transition-colors">{service.label}</h3>
              <p className="text-sm text-earth-500 leading-relaxed mb-10 flex-1">{service.desc}</p>
              <div className="flex items-center gap-2 text-primary-600 font-black text-xs uppercase tracking-widest">
                Access Service <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </button>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 lg:px-12">
        <div className="bg-gradient-to-br from-earth-900 to-earth-800 rounded-[4rem] p-16 lg:p-24 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
            <div className="space-y-4">
              <div className="text-6xl font-black text-primary-400 tracking-tighter">8</div>
              <p className="text-earth-400 text-xs font-black uppercase tracking-[0.2em]">Trusted Data Sources</p>
            </div>
            <div className="space-y-4">
              <div className="text-6xl font-black text-primary-400 tracking-tighter">7</div>
              <p className="text-earth-400 text-xs font-black uppercase tracking-[0.2em]">Management Tools</p>
            </div>
            <div className="space-y-4">
              <div className="text-6xl font-black text-primary-400 tracking-tighter">24/7</div>
              <p className="text-earth-400 text-xs font-black uppercase tracking-[0.2em]">Expert Advisory</p>
            </div>
            <div className="space-y-4">
              <div className="text-6xl font-black text-primary-400 tracking-tighter">100%</div>
              <p className="text-earth-400 text-xs font-black uppercase tracking-[0.2em]">Free to Get Started</p>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(40,167,69,0.2),transparent_70%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_120%,rgba(32,201,151,0.1),transparent_50%)]"></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 lg:px-12">
        <div className="bg-primary-500 rounded-[4rem] p-16 lg:p-24 text-white text-center shadow-2xl shadow-primary-500/30 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-8">Start Farming Smarter Today</h2>
            <p className="text-xl text-primary-50 mb-12 opacity-90 leading-relaxed">
              Join thousands of Kenyan farmers who are using Hyperbloom to increase yields, reduce costs, and make better decisions for their future.
            </p>
            <button 
              onClick={() => onNavigate('learning')}
              className="px-12 py-6 bg-white text-primary-600 rounded-[2rem] font-black text-xl shadow-2xl hover:bg-primary-50 transition-all active:scale-95"
            >
              Sign Up Now - It's Free
            </button>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-earth-900/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}

function PurposeItem({ icon: Icon, title, desc }: any) {
  return (
    <div className="bg-white p-10 rounded-[3rem] border border-earth-100 shadow-sm hover:shadow-xl transition-all group text-center">
      <div className="w-20 h-20 bg-earth-50 text-primary-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-inner">
        <Icon size={36} />
      </div>
      <h3 className="text-xl font-black text-earth-900 mb-4">{title}</h3>
      <p className="text-sm text-earth-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend, color }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-earth-200 shadow-sm hover:shadow-md transition-all group">
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", color)}>
        <Icon size={28} />
      </div>
      <p className="text-sm font-bold text-earth-400 uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-3xl font-bold text-earth-900">{value}</h4>
      <p className="text-xs text-earth-400 mt-4 flex items-center gap-2 font-medium">
        <TrendingUp size={14} className="text-primary-500" /> {trend}
      </p>
    </div>
  );
}
