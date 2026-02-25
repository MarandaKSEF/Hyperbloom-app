import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, Calendar, Clock, AlertCircle, CheckCircle2, ListFilter, MoreVertical } from 'lucide-react';
import { cn } from '../utils/cn';

const initialTasks = [
  { id: 1, title: 'Morning Irrigation', time: '06:00 AM', category: 'Crops', priority: 'High', completed: true },
  { id: 2, title: 'Check Livestock Water', time: '08:00 AM', category: 'Livestock', priority: 'High', completed: false },
  { id: 3, title: 'Fertilizer Application', time: '10:00 AM', category: 'Crops', priority: 'Medium', completed: false },
  { id: 4, title: 'Clean Poultry House', time: '04:00 PM', category: 'Poultry', priority: 'Medium', completed: false },
];

export default function FarmChecklist() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('All');

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = tasks.filter(t => filter === 'All' || t.category === filter);

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-earth-900 tracking-tight">Farm Checklist</h1>
          <p className="text-earth-500 mt-1">Manage your daily tasks and ensure nothing gets overlooked.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-2xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20">
          <Plus size={18} /> New Task
        </button>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['All', 'Crops', 'Livestock', 'Poultry', 'Maintenance'].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn(
              "px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border-2",
              filter === t 
                ? "bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/20" 
                : "bg-white text-earth-500 border-earth-100 hover:border-primary-200 hover:bg-earth-50"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] border border-earth-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-earth-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckSquare className="text-primary-500" size={24} />
            <h3 className="text-xl font-bold text-earth-900">Today's Tasks</h3>
          </div>
          <div className="text-sm font-bold text-earth-400 uppercase tracking-widest">
            {tasks.filter(t => t.completed).length}/{tasks.length} Completed
          </div>
        </div>
        
        <div className="divide-y divide-earth-50">
          {filteredTasks.map((task) => (
            <div 
              key={task.id} 
              className={cn(
                "p-8 flex items-center justify-between transition-all group",
                task.completed ? "bg-earth-50/50 opacity-60" : "hover:bg-earth-50/30"
              )}
            >
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all",
                    task.completed 
                      ? "bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/20" 
                      : "border-earth-200 hover:border-primary-500"
                  )}
                >
                  {task.completed && <CheckCircle2 size={18} />}
                </button>
                <div>
                  <h4 className={cn("font-bold text-lg transition-all", task.completed ? "text-earth-400 line-through" : "text-earth-900")}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-earth-400 uppercase tracking-widest">
                      <Clock size={14} /> {task.time}
                    </span>
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border",
                      task.priority === 'High' ? "bg-red-50 text-red-600 border-red-100" : "bg-orange-50 text-orange-600 border-orange-100"
                    )}>
                      {task.priority} Priority
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-3 text-earth-300 hover:text-red-500 transition-all">
                  <Trash2 size={20} />
                </button>
                <button className="p-3 text-earth-300 hover:text-earth-600 transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTasks.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-earth-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ListFilter size={40} className="text-earth-300" />
            </div>
            <h4 className="text-xl font-bold text-earth-900 mb-2">No tasks found</h4>
            <p className="text-earth-500">Try adjusting your filters or add a new task.</p>
          </div>
        )}
      </div>
    </div>
  );
}
