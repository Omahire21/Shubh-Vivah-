import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-red-800 text-yellow-50 py-2 lg:py-4 shadow-md border-b-4 border-yellow-500">
      <div className="container mx-auto px-4 flex items-center justify-center gap-2 lg:gap-3">
        <Sparkles className="text-yellow-400" size={20} />
        <h1 className="text-xl lg:text-3xl font-traditional font-bold tracking-wider">
          Shubh Vivah
        </h1>
        <Sparkles className="text-yellow-400" size={20} />
      </div>
      <p className="text-center text-[10px] lg:text-sm text-red-200 mt-0.5 lg:mt-1 uppercase tracking-widest">
        Traditional Wedding Card Maker
      </p>
    </header>
  );
};

export default Header;