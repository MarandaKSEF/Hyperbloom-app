import React, { useState } from 'react';
import { Cloud, CloudRain, CloudSun, Sun, Wind, Droplets, Thermometer, MapPin, RefreshCcw, Calendar, TrendingUp } from 'lucide-react';
import { cn } from '../utils/cn';

const forecastData = {
  current: { temp: 26, condition: 'Mostly Sunny', humidity: '42%', wind: '12 km/h', feelsLike: '28°C', advice: "Optimal conditions for planting maize today. High evaporation rates expected; consider evening irrigation for young seedlings." },
  weekly: [
    { day: 'Today', temp: 26, condition: 'Sunny', icon: Sun },
    { day: 'Thu', temp: 28, condition: 'Partly Cloudy', icon: CloudSun },
    { day: 'Fri', temp: 30, condition: 'Sunny', icon: Sun },
    { day: 'Sat', temp: 27, condition: 'Rainy', icon: CloudRain },
    { day: 'Sun', temp: 25, condition: 'Cloudy', icon: Cloud },
    { day: 'Mon', temp: 24, condition: 'Rainy', icon: CloudRain },
    { day: 'Tue', temp: 26, condition: 'Sunny', icon: Sun },
  ],
  monthly: [
    { week: 'Week 1', avgTemp: 25, rainChance: '10%', condition: 'Dry' },
    { week: 'Week 2', avgTemp: 24, rainChance: '45%', condition: 'Showers' },
    { week: 'Week 3', avgTemp: 22, rainChance: '80%', condition: 'Heavy Rain' },
    { week: 'Week 4', avgTemp: 23, rainChance: '30%', condition: 'Mixed' },
  ],
  yearly: [
    { season: 'Long Rains (Mar-May)', status: 'Expected Normal', outlook: 'Good for planting' },
    { season: 'Dry Season (Jun-Sep)', status: 'Warmer than usual', outlook: 'Irrigation required' },
    { season: 'Short Rains (Oct-Dec)', status: 'Above average', outlook: 'Risk of flooding' },
    { season: 'Hot Season (Jan-Feb)', status: 'Extreme Heat', outlook: 'Protect livestock' },
  ]
};

export default function WeatherView() {
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-earth-900 tracking-tight">Weather & Forecasts</h1>
          <p className="text-earth-500 mt-1 flex items-center gap-2">
            <MapPin size={16} className="text-primary-500" /> Localized data for Green Valley Farm, Nairobi
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-earth-200 rounded-2xl font-bold text-earth-700 hover:bg-earth-50 transition-all shadow-sm">
          <RefreshCcw size={18} className="text-primary-500" /> Refresh Data
        </button>
      </section>

      {/* Weather Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['current', 'weekly', 'monthly', 'yearly'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-8 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border-2 capitalize",
              activeTab === tab 
                ? "bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/20" 
                : "bg-white text-earth-500 border-earth-100 hover:border-primary-200 hover:bg-earth-50"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'current' && (
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="relative">
                <Sun size={120} className="text-yellow-300 drop-shadow-[0_0_30px_rgba(253,224,71,0.5)]" />
              </div>
              <div className="text-center md:text-left">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-8xl font-bold tracking-tighter">{forecastData.current.temp}°</h2>
                  <span className="text-4xl font-light opacity-60">C</span>
                </div>
                <p className="text-2xl font-medium text-primary-50 mt-2">{forecastData.current.condition}</p>
                <div className="flex gap-6 mt-8">
                  <WeatherStat icon={Droplets} label="Humidity" value={forecastData.current.humidity} />
                  <WeatherStat icon={Wind} label="Wind" value={forecastData.current.wind} />
                  <WeatherStat icon={Thermometer} label="Feels Like" value={forecastData.current.feelsLike} />
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/20 max-w-md">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Sun size={20} className="text-yellow-300" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary-100">Farmer's Advice</h3>
              </div>
              <p className="text-lg leading-relaxed text-primary-50 font-medium">
                "{forecastData.current.advice}"
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'weekly' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {forecastData.weekly.map((item, idx) => (
            <div 
              key={idx} 
              className={cn(
                "bg-white p-8 rounded-[2.5rem] border transition-all flex flex-col items-center text-center group",
                idx === 0 ? "border-primary-500 shadow-lg ring-4 ring-primary-500/10" : "border-earth-200 shadow-sm hover:shadow-md hover:border-primary-300"
              )}
            >
              <p className={cn("text-xs font-bold uppercase tracking-widest mb-6", idx === 0 ? "text-primary-600" : "text-earth-400")}>
                {item.day}
              </p>
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                idx === 0 ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20" : "bg-earth-50 text-earth-400"
              )}>
                <item.icon size={32} />
              </div>
              <p className="text-2xl font-bold text-earth-900">{item.temp}°</p>
              <p className="text-[10px] text-earth-400 font-bold uppercase tracking-wider mt-2">{item.condition}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'monthly' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {forecastData.monthly.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-earth-200 shadow-sm hover:shadow-md transition-all">
              <h4 className="text-lg font-bold text-earth-900 mb-4">{item.week}</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-earth-500 text-sm">Avg. Temp</span>
                  <span className="font-bold text-earth-900">{item.avgTemp}°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-earth-500 text-sm">Rain Chance</span>
                  <span className="font-bold text-primary-600">{item.rainChance}</span>
                </div>
                <div className="pt-4 border-t border-earth-100">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-earth-400">Outlook</span>
                  <p className="font-bold text-earth-700 mt-1">{item.condition}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'yearly' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {forecastData.yearly.map((item, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[3rem] border border-earth-200 shadow-sm hover:shadow-md transition-all flex items-center gap-8">
              <div className="w-20 h-20 bg-earth-50 rounded-[1.5rem] flex items-center justify-center text-primary-500 flex-shrink-0">
                <Calendar size={40} />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-earth-900">{item.season}</h4>
                <div className="flex items-center gap-3 mt-2">
                  <span className="px-3 py-1 bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-primary-100">
                    {item.status}
                  </span>
                </div>
                <p className="text-earth-500 mt-4 font-medium italic">"{item.outlook}"</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WeatherStat({ icon: Icon, label, value }: any) {
  return (
    <div className="flex flex-col items-center md:items-start gap-1">
      <div className="flex items-center gap-2 text-primary-200">
        <Icon size={16} />
        <span className="text-[10px] uppercase tracking-widest font-bold">{label}</span>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
