import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CloudSun, 
  ShieldAlert, 
  Stethoscope, 
  BookOpen, 
  MessageSquare,
  Menu,
  X,
  ShoppingBag, 
  Wallet, 
  CheckSquare,
  Calendar,
  Sprout,
  Bell,
  Star,
  ChevronRight,
  User,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './utils/cn';

import Dashboard from './components/Dashboard';
import WeatherView from './components/WeatherView';
import AlertsView from './components/AlertsView';
import LivestockView from './components/LivestockView';
import LearningHub from './components/LearningHub';
import AIChat from './components/AIChat';
import Marketplace from './components/Marketplace';
import FinanceTracker from './components/FinanceTracker';
import FarmChecklist from './components/FarmChecklist';
import Auth from './components/Auth';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hyperScore, setHyperScore] = useState(1250);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'alerts', label: 'Disease Detection', icon: Stethoscope },
    { id: 'learning', label: 'Academy', icon: BookOpen },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'finance', label: 'Finance', icon: Wallet },
    { id: 'checklist', label: 'Checklist', icon: CheckSquare },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={setActiveTab} />;
      case 'weather': return <WeatherView />;
      case 'alerts': return <AlertsView />;
      case 'learning': return <LearningHub />;
      case 'marketplace': return <Marketplace />;
      case 'finance': return <FinanceTracker />;
      case 'checklist': return <FarmChecklist />;
      case 'schedule': return <LivestockView />;
      case 'chat': return <AIChat />;
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-earth-50 font-sans selection:bg-primary-500/30">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-earth-900/60 backdrop-blur-md z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 xl:w-80 bg-white border-r border-earth-200 transform transition-transform duration-700 ease-[0.22,1,0.36,1] lg:relative lg:translate-x-0 shadow-2xl lg:shadow-none",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="p-8 xl:p-10 flex items-center gap-4">
            <div className="w-12 h-12 xl:w-14 xl:h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-[1.25rem] flex items-center justify-center text-white shadow-2xl shadow-primary-500/30 rotate-3 transition-transform hover:rotate-0 cursor-pointer overflow-hidden">
              <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=200&h=200&auto=format&fit=crop" alt="Hyperbloom Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xl xl:text-2xl font-black text-earth-900 tracking-tighter leading-none">HYPERBLOOM</h1>
              <p className="text-[10px] font-black text-primary-500 uppercase tracking-[0.3em] mt-1">Digital Farm</p>
            </div>
          </div>

          <nav className="flex-1 mt-4 px-6 space-y-1 overflow-y-auto no-scrollbar">
            <p className="px-6 text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold transition-all group relative overflow-hidden",
                  activeTab === item.id
                    ? "bg-earth-900 text-white shadow-2xl shadow-earth-900/20 translate-x-2"
                    : "text-earth-500 hover:bg-earth-100 hover:text-earth-900"
                )}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <item.icon size={20} className={cn("transition-transform group-hover:scale-110", activeTab === item.id ? "text-primary-400" : "text-primary-500")} />
                  {item.label}
                </div>
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-earth-900 to-earth-800"
                  />
                )}
                {activeTab === item.id && <ChevronRight size={16} className="relative z-10 text-primary-400" />}
              </button>
            ))}
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all group mt-4"
            >
              <LogOut size={20} className="transition-transform group-hover:scale-110" />
              Sign Out
            </button>
          </nav>

          <div className="p-8">
            <div className="p-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-[2.5rem] text-white shadow-2xl shadow-primary-500/30 relative overflow-hidden group cursor-pointer">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Star size={20} fill="currentColor" />
                  </div>
                  <span className="text-xs font-black tracking-widest opacity-80 uppercase">Pro Plan</span>
                </div>
                <p className="text-2xl font-black mb-1">{hyperScore}</p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">HyperScore Points</p>
                
                <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-primary-500 bg-earth-100 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${i}/50/50`} alt="Avatar" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold">+12 Friends</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-24 bg-white/80 backdrop-blur-2xl border-b border-earth-200 flex items-center justify-between px-8 lg:px-16 sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-4 text-earth-600 lg:hidden hover:bg-earth-100 rounded-2xl transition-all active:scale-95"
            >
              <Menu size={24} />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-2xl font-black text-earth-900 tracking-tight">
                {navItems.find(i => i.id === activeTab)?.label}
              </h2>
              <p className="text-xs text-earth-400 font-bold uppercase tracking-widest mt-1">
                {activeTab === 'dashboard' ? 'Overview & Insights' : 'Service Module'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex items-center gap-4 bg-earth-100 px-6 py-3 rounded-2xl border border-earth-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-black text-earth-600 uppercase tracking-widest">Satellite Connected</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-4 text-earth-400 hover:text-earth-900 hover:bg-earth-100 rounded-2xl transition-all relative group active:scale-95">
                <Bell size={24} />
                <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full border-2 border-white ring-4 ring-red-500/10"></span>
              </button>
              
              <div className="h-10 w-[1px] bg-earth-200 mx-2 hidden sm:block"></div>
              
              <button className="flex items-center gap-4 p-1.5 pr-6 hover:bg-earth-100 rounded-[1.5rem] transition-all group active:scale-95">
                <div className="w-12 h-12 rounded-2xl bg-earth-100 border-2 border-white shadow-xl overflow-hidden group-hover:border-primary-500 transition-all">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`} alt="Profile" referrerPolicy="no-referrer" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-black text-earth-900 leading-none">{user?.name || 'Farmer John'}</p>
                  <p className="text-[10px] font-black text-primary-500 uppercase tracking-widest mt-1.5">Premium</p>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 xl:p-16 scroll-smooth bg-earth-50/50">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[1600px] mx-auto"
          >
            {renderContent()}
          </motion.div>
          
          <footer className="mt-32 py-20 border-t border-earth-200 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-10 h-10 bg-earth-900 rounded-xl flex items-center justify-center text-primary-400 shadow-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=200&h=200&auto=format&fit=crop" alt="Hyperbloom" className="w-full h-full object-cover" />
              </div>
              <span className="text-2xl font-black text-earth-900 tracking-tighter">HYPERBLOOM</span>
            </div>
            <p className="text-sm text-earth-400 font-bold uppercase tracking-widest mb-4">Empowering the Next Generation of Farmers</p>
            <div className="flex justify-center gap-8 text-earth-400 text-xs font-bold uppercase tracking-widest mb-8">
              <a href="#" className="hover:text-primary-500 transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-primary-500 transition-colors">Support</a>
            </div>
            <p className="text-[10px] text-earth-300 font-medium">© 2026 Hyperbloom Platform. Built for Kenya, Inspired by Nature.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
