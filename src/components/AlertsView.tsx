import React, { useState } from 'react';
import { ShieldAlert, Info, AlertTriangle, Search, Filter, MapPin, ChevronRight, Bell, Camera, FlaskConical, Stethoscope, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

const DISEASES = {
  "MAIZE_MLN": {
    name: "Maize Lethal Necrosis (MLN)",
    symptoms: ["Yellowing of leaves", "Stunted growth", "Drying of leaf margins"],
    treatment: "Uproot infected plants, practice crop rotation, use certified seeds.",
    severity: "High"
  },
  "CATTLE_FMD": {
    name: "Foot and Mouth Disease",
    symptoms: ["Blisters on mouth and feet", "Drooling", "Lameness"],
    treatment: "Quarantine animals, vaccinate healthy ones, consult vet immediately.",
    severity: "High"
  },
  "POULTRY_NEWCASTLE": {
    name: "Newcastle Disease",
    symptoms: ["Respiratory distress", "Twisted necks", "Greenish diarrhea"],
    treatment: "Vaccination is the only effective prevention. Cull infected birds.",
    severity: "High"
  }
};

const alerts = [
  {
    id: 1,
    type: 'Pest',
    title: 'Fall Armyworm Outbreak',
    description: 'Significant activity reported in the northern sub-counties. High risk for maize and sorghum crops.',
    severity: 'High',
    date: '2026-02-24',
    location: 'Nairobi North',
    source: 'plantwise'
  },
  {
    id: 2,
    type: 'Disease',
    title: 'Maize Lethal Necrosis (MLN)',
    description: 'Early signs detected in neighboring farms. Ensure use of certified seeds.',
    severity: 'Medium',
    date: '2026-02-23',
    location: 'Regional',
    source: 'kalro'
  }
];

export default function AlertsView() {
  const [activeTab, setActiveTab] = useState('alerts');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const handleScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(DISEASES.MAIZE_MLN);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-earth-900 tracking-tight">Disease Detection & Alerts</h1>
          <p className="text-earth-500 mt-1">AI-powered diagnosis and regional outbreak monitoring.</p>
        </div>
        <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-earth-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('alerts')}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === 'alerts' ? "bg-primary-500 text-white shadow-md" : "text-earth-500 hover:bg-earth-50"
            )}
          >
            Alerts
          </button>
          <button 
            onClick={() => setActiveTab('scan')}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
              activeTab === 'scan' ? "bg-primary-500 text-white shadow-md" : "text-earth-500 hover:bg-earth-50"
            )}
          >
            AI Scanner
          </button>
        </div>
      </section>

      {activeTab === 'alerts' ? (
        <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-white rounded-[2.5rem] border border-earth-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row group">
              <div className={cn(
                "w-full md:w-3 flex items-center justify-center transition-colors",
                alert.severity === 'High' ? "bg-red-500" : "bg-orange-500"
              )} />
              <div className="p-8 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                      alert.severity === 'High' ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
                    )}>
                      {alert.severity === 'High' ? <AlertTriangle size={28} /> : <Info size={28} />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-earth-900 group-hover:text-primary-600 transition-colors">{alert.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={cn("source-badge", alert.source)}>{alert.source.toUpperCase()}</span>
                        <span className="text-[10px] font-bold text-earth-400 uppercase tracking-widest flex items-center gap-1">
                          <MapPin size={12} /> {alert.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-earth-600 text-lg leading-relaxed mb-8 max-w-4xl">
                  {alert.description}
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-3 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20">
                    View Treatment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-[3rem] border-2 border-dashed border-earth-200 p-12 text-center">
            {!isScanning && !scanResult && (
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-8 text-primary-500">
                  <Camera size={48} />
                </div>
                <h3 className="text-2xl font-bold text-earth-900 mb-4">Scan for Disease</h3>
                <p className="text-earth-500 mb-10 leading-relaxed">
                  Upload a photo of your crop or animal symptoms. Our AI will analyze it against our expert database.
                </p>
                <button 
                  onClick={handleScan}
                  className="w-full py-5 bg-primary-500 text-white rounded-[2rem] font-bold text-lg shadow-xl shadow-primary-500/20 hover:bg-primary-600 transition-all flex items-center justify-center gap-3"
                >
                  <FlaskConical size={24} /> Start AI Analysis
                </button>
              </div>
            )}

            {isScanning && (
              <div className="py-12">
                <Loader2 size={64} className="animate-spin text-primary-500 mx-auto mb-8" />
                <h3 className="text-2xl font-bold text-earth-900 mb-2">Analyzing Symptoms...</h3>
                <p className="text-earth-500">Comparing with 5,000+ agricultural disease patterns</p>
              </div>
            )}

            {scanResult && (
              <div className="text-left animate-in zoom-in-95 duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-earth-900">Diagnosis: {scanResult.name}</h3>
                    <p className="text-red-600 font-bold uppercase tracking-widest text-xs mt-1">Severity: {scanResult.severity}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-earth-50 p-8 rounded-[2rem] border border-earth-100">
                    <h4 className="font-bold text-earth-900 mb-4 flex items-center gap-2">
                      <Stethoscope size={20} className="text-primary-500" /> Detected Symptoms
                    </h4>
                    <ul className="space-y-3">
                      {scanResult.symptoms.map((s: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-earth-600">
                          <CheckCircle2 size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-primary-50 p-8 rounded-[2rem] border border-primary-100">
                    <h4 className="font-bold text-primary-900 mb-4 flex items-center gap-2">
                      <FlaskConical size={20} className="text-primary-600" /> Recommended Treatment
                    </h4>
                    <p className="text-primary-800 leading-relaxed font-medium">
                      {scanResult.treatment}
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <button className="px-10 py-4 bg-primary-500 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20 hover:bg-primary-600 transition-all">
                    Generate Full Report
                  </button>
                  <button 
                    onClick={() => setScanResult(null)}
                    className="px-10 py-4 bg-white border border-earth-200 text-earth-600 rounded-2xl font-bold hover:bg-earth-50 transition-all"
                  >
                    Scan Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
