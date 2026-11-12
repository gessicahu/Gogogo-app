import React from 'react';
import { Swords, MapPin, BookOpen, User } from 'lucide-react';
import { MainTab } from '../types/wireframe';

interface BottomNavBarProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const tabs: { id: MainTab; label: string; icon: React.ElementType }[] = [
    { id: 'sfide', label: 'Sfide', icon: Swords },
    { id: 'goland', label: 'GoLand', icon: MapPin },
    { id: 'diario', label: 'Diario', icon: BookOpen },
    { id: 'profilo', label: 'Profilo', icon: User },
  ];

  return (
    <nav
      aria-label="Navigazione principale"
      className="sticky bottom-0 z-30 w-full bg-white border-t-2 border-black grid grid-cols-4 items-center px-2 py-1.5 min-h-[58px]"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer select-none ${
              isActive
                ? 'bg-black text-white font-bold shadow-[2px_2px_0px_#71717a]'
                : 'bg-transparent text-black hover:bg-neutral-100 font-medium'
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center mb-0.5">
              <Icon
                className={`w-4 h-4 ${
                  isActive ? 'text-white stroke-[2.5]' : 'text-black stroke-[2]'
                }`}
              />
            </div>
            <span
              className={`text-[11px] tracking-tight leading-none truncate max-w-full ${
                isActive ? 'font-bold underline underline-offset-2' : 'font-normal'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
