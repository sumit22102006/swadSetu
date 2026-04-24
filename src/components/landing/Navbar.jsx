import React from 'react';
import { ShoppingBag, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full py-6 z-10 border-t-[5px] border-[#00A3FF]">
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-text-light tracking-tighter">swadSetu</div>
        <div className="hidden md:flex gap-8">
          <a href="#" className="text-sm font-medium text-text-light opacity-90 hover:opacity-100 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:height-[2px] after:bg-primary text-primary">Menu</a>
          <a href="#" className="text-sm font-medium text-text-light opacity-90 hover:opacity-100">Artisans</a>
          <a href="#" className="text-sm font-medium text-text-light opacity-90 hover:opacity-100">Our Story</a>
          <a href="#" className="text-sm font-medium text-text-light opacity-90 hover:opacity-100">Subscription</a>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="text-text-light text-xl flex items-center justify-center"><ShoppingBag size={20} /></a>
          <a href="#" className="text-text-light text-xl flex items-center justify-center"><User size={20} /></a>
          <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded font-semibold text-sm transition-colors">Order Now</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
