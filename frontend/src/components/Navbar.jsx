import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-5 transition-all duration-300">
      <div className="container flex justify-between items-center">
        <div className="text-2xl font-bold text-white"><Link to="/" className="hover:text-primary transition-all">swadSetu</Link></div>
        <ul className="hidden md:flex gap-8">
          <li><Link to="/menu" className="text-primary text-sm font-medium">Menu</Link></li>

          <li><Link to="/story" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition-all text-sm font-medium">Our Story</Link></li>
          <li><Link to="/subscription" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition-all text-sm font-medium">Subscription</Link></li>
          <li><Link to="/support" className="text-white opacity-80 hover:opacity-100 hover:text-primary transition-all text-sm font-medium">Support</Link></li>
        </ul>

        <div className="flex items-center gap-5">
          <Link to="/cart" className="text-white hover:text-primary transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </Link>
          <Link to="/signup" className="text-white hover:text-primary transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
          <Link to="/signup" className="btn btn-primary">Order Now</Link>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
