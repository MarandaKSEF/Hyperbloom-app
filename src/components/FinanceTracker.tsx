import React, { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus, Filter, Download, PieChart, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../utils/cn';

const transactions = [
  { id: 1, type: 'income', category: 'Crop Sale', amount: 45000, date: '2026-02-20', note: 'Maize harvest sale' },
  { id: 2, type: 'expense', category: 'Seeds', amount: 12000, date: '2026-02-18', note: 'Certified maize seeds' },
  { id: 3, type: 'expense', category: 'Fertilizer', amount: 8500, date: '2026-02-15', note: 'DAP fertilizer' },
  { id: 4, type: 'income', category: 'Milk Sale', amount: 3200, date: '2026-02-24', note: 'Daily milk collection' },
];

export default function FinanceTracker() {
  const [activeTab, setActiveTab] = useState('overview');

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-earth-900 tracking-tight">Finance Tracker</h1>
          <p className="text-earth-500 mt-1">Monitor your farm's income, expenses, and overall profitability.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20">
            <Plus size={18} /> Add Transaction
          </button>
          <button className="p-3 bg-white border border-earth-200 rounded-2xl text-earth-500 hover:text-primary-500 transition-all shadow-sm">
            <Download size={20} />
          </button>
        </div>
      </section>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-earth-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center">
              <Wallet size={24} />
            </div>
            <span className="text-[10px] font-bold text-earth-400 uppercase tracking-widest">Total Balance</span>
          </div>
          <h3 className="text-4xl font-black text-earth-900">KSh {balance.toLocaleString()}</h3>
          <p className="text-xs text-earth-400 mt-4 flex items-center gap-2 font-medium">
            <TrendingUp size={14} className="text-primary-500" /> +12% from last month
          </p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-earth-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
            <span className="text-[10px] font-bold text-earth-400 uppercase tracking-widest">Total Income</span>
          </div>
          <h3 className="text-4xl font-black text-green-600">KSh {totalIncome.toLocaleString()}</h3>
          <p className="text-xs text-earth-400 mt-4 flex items-center gap-2 font-medium">
            This month's earnings
          </p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-earth-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
              <TrendingDown size={24} />
            </div>
            <span className="text-[10px] font-bold text-earth-400 uppercase tracking-widest">Total Expenses</span>
          </div>
          <h3 className="text-4xl font-black text-red-600">KSh {totalExpense.toLocaleString()}</h3>
          <p className="text-xs text-earth-400 mt-4 flex items-center gap-2 font-medium">
            This month's spending
          </p>
        </div>
      </div>

      {/* Transactions List */}
      <section className="bg-white rounded-[3rem] border border-earth-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-earth-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-earth-900">Recent Transactions</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-earth-50 text-earth-600 rounded-xl text-xs font-bold hover:bg-earth-100 transition-all">All</button>
            <button className="px-4 py-2 bg-white border border-earth-200 text-earth-500 rounded-xl text-xs font-bold hover:border-primary-500 transition-all">Income</button>
            <button className="px-4 py-2 bg-white border border-earth-200 text-earth-500 rounded-xl text-xs font-bold hover:border-primary-500 transition-all">Expenses</button>
          </div>
        </div>
        <div className="divide-y divide-earth-50">
          {transactions.map((t) => (
            <div key={t.id} className="p-8 flex items-center justify-between hover:bg-earth-50/50 transition-all group">
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                  t.type === 'income' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {t.type === 'income' ? <ArrowUpRight size={24} /> : <ArrowDownRight size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-earth-900">{t.category}</h4>
                  <p className="text-xs text-earth-400 font-medium mt-1">{t.note} • {t.date}</p>
                </div>
              </div>
              <div className={cn(
                "text-xl font-black",
                t.type === 'income' ? "text-green-600" : "text-red-600"
              )}>
                {t.type === 'income' ? '+' : '-'} {t.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 bg-earth-50 text-center">
          <button className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">View All Transactions</button>
        </div>
      </section>
    </div>
  );
}
