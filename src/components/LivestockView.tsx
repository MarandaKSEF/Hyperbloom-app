import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Dog, 
  Info, 
  Calculator, 
  Syringe, 
  Pill, 
  HeartPulse, 
  Stethoscope,
  Search,
  AlertTriangle,
  FlaskConical,
  Lightbulb
} from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';
import { Vaccination } from '../types';

const medications = {
  cattle: {
    amoxicillin: { dosage: 15, unit: "mg/kg" },
    tetracycline: { dosage: 20, unit: "mg/kg" },
    penicillin: { dosage: 10, unit: "mg/kg" },
    ivermectin: { dosage: 0.2, unit: "mg/kg" },
    albendazole: { dosage: 10, unit: "mg/kg" }
  },
  goats: {
    amoxicillin: { dosage: 20, unit: "mg/kg" },
    tetracycline: { dosage: 25, unit: "mg/kg" },
    penicillin: { dosage: 12, unit: "mg/kg" },
    ivermectin: { dosage: 0.2, unit: "mg/kg" },
    albendazole: { dosage: 15, unit: "mg/kg" }
  },
  poultry: {
    amoxicillin: { dosage: 50, unit: "mg/kg" },
    tetracycline: { dosage: 40, unit: "mg/kg" },
    coccidiostat: { dosage: 125, unit: "mg/kg" },
    ivermectin: { dosage: 0.2, unit: "mg/kg" },
    ampicillin: { dosage: 30, unit: "mg/kg" }
  }
};

export default function LivestockView() {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'management' | 'dosage' | 'detection'>('management');

  // Dosage Calculator State
  const [dosageSpecies, setDosageSpecies] = useState<string>('cattle');
  const [dosageWeight, setDosageWeight] = useState<string>('');
  const [dosageMed, setDosageMed] = useState<string>('');
  const [calculatedDosage, setCalculatedDosage] = useState<number | null>(null);

  useEffect(() => {
    fetchVaccinations();
  }, []);

  const fetchVaccinations = async () => {
    try {
      const res = await fetch('/api/vaccinations');
      const data = await res.json();
      setVaccinations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateDosage = () => {
    if (!dosageSpecies || !dosageWeight || !dosageMed) return;
    const weight = parseFloat(dosageWeight);
    const medInfo = (medications as any)[dosageSpecies][dosageMed];
    if (medInfo) {
      setCalculatedDosage(weight * medInfo.dosage);
    }
  };

  const toggleComplete = async (id: number, current: boolean) => {
    try {
      await fetch(`/api/vaccinations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !current })
      });
      fetchVaccinations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Livestock Health Assistant</h1>
            <p className="text-primary-50 text-lg opacity-90 max-w-xl">
              Optimize animal care with precision dosage calculations, automated vaccination schedules, and disease detection.
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-white text-primary-600 rounded-2xl font-bold hover:bg-primary-50 transition-all shadow-lg"
            >
              <Plus className="inline-block mr-2" size={20} /> Add Schedule
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-white rounded-2xl border border-earth-200 w-fit">
        <button 
          onClick={() => setActiveTab('management')}
          className={cn(
            "px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
            activeTab === 'management' ? "bg-primary-500 text-white shadow-md" : "text-earth-500 hover:bg-earth-50"
          )}
        >
          <Syringe size={18} /> Management
        </button>
        <button 
          onClick={() => setActiveTab('dosage')}
          className={cn(
            "px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
            activeTab === 'dosage' ? "bg-primary-500 text-white shadow-md" : "text-earth-500 hover:bg-earth-50"
          )}
        >
          <Calculator size={18} /> Dosage Calculator
        </button>
        <button 
          onClick={() => setActiveTab('detection')}
          className={cn(
            "px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
            activeTab === 'detection' ? "bg-primary-500 text-white shadow-md" : "text-earth-500 hover:bg-earth-50"
          )}
        >
          <Stethoscope size={18} /> Disease Detection
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'management' && (
            <section className="space-y-4">
              <h3 className="text-xl font-bold text-earth-900 flex items-center gap-2">
                <Calendar size={24} className="text-primary-500" /> Upcoming Vaccinations
              </h3>
              
              {loading ? (
                <div className="p-12 text-center text-earth-400">Loading schedules...</div>
              ) : vaccinations.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-earth-200 rounded-[2.5rem] p-16 text-center">
                  <div className="w-20 h-20 bg-earth-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Syringe size={40} className="text-earth-300" />
                  </div>
                  <h4 className="text-xl font-bold text-earth-900 mb-2">No schedules found</h4>
                  <p className="text-earth-500 mb-8">Start tracking your livestock health by adding your first vaccination schedule.</p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-3 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-all"
                  >
                    Create First Schedule
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {vaccinations.map((v) => (
                    <div 
                      key={v.id} 
                      className={cn(
                        "bg-white p-6 rounded-[2rem] border transition-all flex items-center justify-between gap-6 group",
                        v.completed ? "border-earth-100 opacity-60" : "border-earth-200 shadow-sm hover:border-primary-300 hover:shadow-md"
                      )}
                    >
                      <div className="flex items-center gap-6">
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors",
                          v.completed ? "bg-earth-100 text-earth-400" : "bg-primary-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-white"
                        )}>
                          <Dog size={32} />
                        </div>
                        <div>
                          <h4 className={cn("text-lg font-bold text-earth-900", v.completed && "line-through")}>{v.vaccine_name}</h4>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                            <span className="text-xs font-bold text-earth-400 uppercase tracking-widest">{v.livestock_type}</span>
                            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest flex items-center gap-1">
                              <Calendar size={12} /> {v.date}
                            </span>
                            <span className="text-xs font-bold text-earth-400 uppercase tracking-widest flex items-center gap-1">
                              <FlaskConical size={12} /> {v.dosage}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => toggleComplete(v.id, v.completed)}
                        className={cn(
                          "w-12 h-12 rounded-full transition-all flex items-center justify-center",
                          v.completed ? "bg-primary-500 text-white" : "bg-earth-50 text-earth-300 hover:bg-primary-50 hover:text-primary-500 border-2 border-earth-100 hover:border-primary-200"
                        )}
                      >
                        <CheckCircle2 size={24} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === 'dosage' && (
            <section className="bg-white p-8 rounded-[2.5rem] border border-earth-200 shadow-sm space-y-8">
              <div className="flex items-center gap-3">
                <Calculator className="text-primary-500" size={24} />
                <h2 className="text-2xl font-bold text-earth-900">Dosage Calculator</h2>
              </div>
              <p className="text-earth-500">Calculate precise medication dosages based on animal weight and species.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-earth-400 uppercase tracking-widest">Animal Species</label>
                  <select 
                    className="w-full p-4 bg-earth-50 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none"
                    value={dosageSpecies}
                    onChange={(e) => {
                      setDosageSpecies(e.target.value);
                      setDosageMed('');
                      setCalculatedDosage(null);
                    }}
                  >
                    <option value="cattle">Cattle</option>
                    <option value="goats">Goats</option>
                    <option value="poultry">Poultry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-earth-400 uppercase tracking-widest">Animal Weight (kg)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 500"
                    className="w-full p-4 bg-earth-50 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none"
                    value={dosageWeight}
                    onChange={(e) => setDosageWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-earth-400 uppercase tracking-widest">Medication</label>
                  <select 
                    className="w-full p-4 bg-earth-50 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none"
                    value={dosageMed}
                    onChange={(e) => setDosageMed(e.target.value)}
                  >
                    <option value="">Select Medication</option>
                    {Object.keys((medications as any)[dosageSpecies]).map(med => (
                      <option key={med} value={med}>{med.charAt(0).toUpperCase() + med.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                onClick={calculateDosage}
                className="w-full py-4 bg-primary-500 text-white rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20"
              >
                Calculate Dosage
              </button>

              <AnimatePresence>
                {calculatedDosage !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-[2rem] text-white text-center shadow-xl"
                  >
                    <p className="text-primary-100 font-bold uppercase tracking-widest text-xs mb-2">Recommended Dosage</p>
                    <div className="text-5xl font-bold mb-4">{calculatedDosage.toLocaleString()} mg</div>
                    <div className="grid grid-cols-2 gap-4 text-sm border-t border-white/20 pt-6 mt-6">
                      <div className="text-left">
                        <p className="text-primary-200">Frequency</p>
                        <p className="font-bold">Every 8-12 hours</p>
                      </div>
                      <div className="text-right">
                        <p className="text-primary-200">Duration</p>
                        <p className="font-bold">5-7 days</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          )}

          {activeTab === 'detection' && (
            <section className="bg-white p-8 rounded-[2.5rem] border border-earth-200 shadow-sm space-y-8">
              <div className="flex items-center gap-3">
                <Stethoscope className="text-primary-500" size={24} />
                <h2 className="text-2xl font-bold text-earth-900">Disease Detection Scanner</h2>
              </div>
              <p className="text-earth-500">Describe symptoms observed in your livestock for an instant AI-powered analysis.</p>
              
              <div className="space-y-4">
                <textarea 
                  className="w-full p-6 bg-earth-50 border border-earth-200 rounded-3xl focus:ring-2 focus:ring-primary-500 outline-none min-h-[150px] text-lg"
                  placeholder="e.g. Cattle showing blistering on hooves, drooling, and high fever..."
                />
                <button className="w-full py-4 bg-primary-500 text-white rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2">
                  <Search size={20} /> Scan for Disease
                </button>
              </div>

              <div className="p-6 bg-red-50 border border-red-100 rounded-3xl flex gap-4 items-start">
                <AlertTriangle className="text-red-500 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-red-900 mb-1 text-sm">Important Disclaimer</h4>
                  <p className="text-xs text-red-700 leading-relaxed">
                    This tool is for informational purposes only. It should not be used as a substitute for professional veterinary diagnosis. Always consult with a licensed veterinarian.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-earth-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-2xl">
                  <HeartPulse size={24} className="text-primary-400" />
                </div>
                <h3 className="text-xl font-bold">Health Guidance</h3>
              </div>
              <p className="text-sm text-earth-300 leading-relaxed mb-8">
                Official best practices for maintaining a healthy herd and maximizing productivity.
              </p>
              <div className="space-y-4">
                <GuidanceItem label="Cattle (Anthrax)" value="2ml / animal" />
                <GuidanceItem label="Poultry (Newcastle)" value="Eye drop / animal" />
                <GuidanceItem label="Goats (PPR)" value="1ml / animal" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-40 h-40 bg-primary-500/10 rounded-full blur-2xl"></div>
          </div>

          <div className="bg-accent-50 border border-accent-100 p-8 rounded-[2.5rem]">
            <h4 className="font-bold text-accent-900 mb-4 flex items-center gap-2">
              <Lightbulb size={20} className="text-accent-600" /> Vaccination Tips
            </h4>
            <ul className="text-sm text-accent-800 space-y-4">
              <li className="flex gap-3">
                <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-2 flex-shrink-0"></span>
                Keep vaccines in a cool box (2-8°C) at all times.
              </li>
              <li className="flex gap-3">
                <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-2 flex-shrink-0"></span>
                Use a fresh sterile needle for every 10 animals.
              </li>
              <li className="flex gap-3">
                <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-2 flex-shrink-0"></span>
                Record batch numbers for full traceability.
              </li>
              <li className="flex gap-3">
                <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-2 flex-shrink-0"></span>
                Observe animals for 30 mins after injection.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-earth-900 mb-8">New Schedule</h2>
            <form className="space-y-6" onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data = Object.fromEntries(formData.entries());
              await fetch('/api/vaccinations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              setIsModalOpen(false);
              fetchVaccinations();
            }}>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-earth-400 uppercase tracking-widest ml-1">Livestock Type</label>
                <select name="livestock_type" className="w-full p-4 bg-earth-50 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none">
                  <option>Cattle</option>
                  <option>Poultry</option>
                  <option>Goats/Sheep</option>
                  <option>Pigs</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-earth-400 uppercase tracking-widest ml-1">Vaccine Name</label>
                <input name="vaccine_name" required className="w-full p-4 bg-earth-50 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. Anthrax" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-earth-400 uppercase tracking-widest ml-1">Date</label>
                  <input name="date" type="date" required className="w-full p-4 bg-earth-50 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-earth-400 uppercase tracking-widest ml-1">Dosage</label>
                  <input name="dosage" required className="w-full p-4 bg-earth-50 border border-earth-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. 2ml" />
                </div>
              </div>
              <div className="flex gap-4 mt-10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-earth-100 text-earth-700 rounded-2xl font-bold hover:bg-earth-200 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-primary-500 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-600 transition-all">Save</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function GuidanceItem({ label, value }: any) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
      <span className="text-sm text-earth-400">{label}</span>
      <span className="font-mono text-primary-400 font-bold">{value}</span>
    </div>
  );
}
