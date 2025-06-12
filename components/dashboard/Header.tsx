'use client'

import React from 'react';
import { Search, Bell, HelpCircle, Command  } from 'lucide-react';

interface HeaderProps {
  // setIsLogin: (value: boolean) => void;
  user: string;
}

const Header: React.FC<HeaderProps> = ({user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isDropdownOpen && !target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="h-16 flex items-center justify-between px-6 bg-gradient-to-r from-white via-[#D8F3D9] to-white border-b border-[#E3F2FD] font-sans ml-0.5">
      {/* Welcome Section */}
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">Welcome,</span>
        <span className="text-sm font-medium text-[#1976d2]">{user}</span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl px-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600" size={18} />
          <input
            type="text"
            placeholder="Find something"
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-white/70 
                     border border-[#D8F3D9] text-sm 
                     focus:outline-none focus:ring-2 focus:ring-[#35A839] focus:border-transparent
                     placeholder:text-[#35A839]/50"
          />
          <Command className="absolute right-3 top-1/2 -translate-y-1/2 text-[#35A839]" size={18} />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-[#1976d2] hover:bg-[#D8F3D9] rounded-lg transition-colors
                         relative group">
          <HelpCircle size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#E93755] rounded-full"></span>
        </button>
        <button className="p-2 text-[#1976d2] hover:bg-[#D8F3D9] rounded-lg transition-colors
                         relative group">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFC700] rounded-full
                         flex items-center justify-center text-[10px] text-white font-medium">2</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
