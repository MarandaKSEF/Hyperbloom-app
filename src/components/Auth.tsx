import React, { useState } from 'react';
import { Sprout, Mail, Lock, User, ArrowRight, Facebook, Chrome } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';

interface AuthProps {
  onLogin: (user: any) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      setIsLoading(false);
      onLogin({ name: formData.name || 'Farmer John', email: formData.email });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-earth-50 p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl border border-earth-200 overflow-hidden relative z-10"
      >
        <div className="p-10 lg:p-12">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary-500/30 mb-6 rotate-3 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=200&h=200&auto=format&fit=crop" alt="Hyperbloom Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-black text-earth-900 tracking-tighter">HYPERBLOOM</h1>
            <p className="text-earth-500 mt-2 font-medium">
              {isLogin ? 'Welcome back, Farmer!' : 'Start your digital farm journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-xs font-black text-earth-400 uppercase tracking-widest ml-4">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-earth-400" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      className="w-full pl-12 pr-6 py-4 bg-earth-50 border border-earth-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-black text-earth-400 uppercase tracking-widest ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-earth-400" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="farmer@example.com"
                  className="w-full pl-12 pr-6 py-4 bg-earth-50 border border-earth-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-4">
                <label className="text-xs font-black text-earth-400 uppercase tracking-widest">Password</label>
                {isLogin && (
                  <button type="button" className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline">Forgot?</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-earth-400" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-6 py-4 bg-earth-50 border border-earth-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-5 bg-primary-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-primary-500/30 hover:bg-primary-600 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-earth-100"></div>
              </div>
              <span className="relative px-4 bg-white text-[10px] font-black text-earth-300 uppercase tracking-[0.2em]">Or continue with</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 bg-earth-50 border border-earth-200 rounded-2xl hover:bg-earth-100 transition-all font-bold text-earth-700">
                <Chrome size={20} /> Google
              </button>
              <button className="flex items-center justify-center gap-3 py-4 bg-earth-50 border border-earth-200 rounded-2xl hover:bg-earth-100 transition-all font-bold text-earth-700">
                <Facebook size={20} /> Facebook
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-earth-500 font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-600 font-black hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
