// src/components/layout/Header.tsx

import React from 'react';
import { Calendar, Settings, RefreshCw, Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onRegenerateSchedule: () => void;
  onToggleSettings: () => void;
  showSettings: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onRegenerateSchedule,
  onToggleSettings,
  showSettings
}) => {
  return (
    <header className="bg-[#1a1a1a] border-b border-[#252525] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-[#252525] rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        <Calendar className="text-[#6366f1]" size={28} />
        <h1 className="text-2xl font-bold">Schedule Generator</h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onRegenerateSchedule}
          className="flex items-center gap-2 px-4 py-2 bg-[#252525] hover:bg-[#2a2a2a] rounded-lg transition-colors"
        >
          <RefreshCw size={18} />
          <span className="hidden sm:inline">Regenerate</span>
        </button>
        <button
          onClick={onToggleSettings}
          className="flex items-center gap-2 px-4 py-2 bg-[#252525] hover:bg-[#2a2a2a] rounded-lg transition-colors"
        >
          <Settings size={18} />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
    </header>
  );
};
