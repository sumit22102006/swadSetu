import React from 'react';
import { User } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <header className="h-16 bg-[#1A1A1A] text-white flex items-center justify-between px-8 w-full z-20">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-primary rounded-full"></div>
        <span className="text-xl font-bold tracking-tighter">swadSetu</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-[#2A2A2A] text-[10px] uppercase font-bold px-2 py-1 rounded border border-white/10 tracking-widest text-white/60">
          Standard Plan
        </div>
        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
          <User size={18} className="text-white/80" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
