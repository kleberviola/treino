import React from 'react';
import { Dumbbell, Calendar, Activity, BarChart3 } from 'lucide-react';

export type TabType = 'treinos' | 'calendario' | 'musculos' | 'estatisticas';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const tabs = [
    { id: 'treinos' as TabType, label: 'Treino', icon: Dumbbell },
    { id: 'calendario' as TabType, label: 'Frequência', icon: Calendar },
    { id: 'musculos' as TabType, label: 'Músculos', icon: Activity },
    { id: 'estatisticas' as TabType, label: 'Evolução', icon: BarChart3 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#111318]/90 backdrop-blur-xl border-t border-white/10 max-w-md mx-auto px-4 py-2">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all ${
                active ? 'text-[#d2fd39]' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-all ${
                  active ? 'bg-[#d2fd39]/15 scale-110 shadow-sm shadow-[#d2fd39]/20' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span className={`text-[10px] mt-0.5 ${active ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
