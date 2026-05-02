import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border-custom dark:border-gray-800 dark:bg-gray-950 transition-colors duration-300">
      <div className="container flex flex-col md:row justify-between items-center gap-5 md:gap-0">
        <div className="text-center md:text-left">
          <div className="font-bold text-xl mb-1 dark:text-white">swadSetu</div>
          <p className="text-text-light dark:text-gray-400 text-xs transition-colors">© 2024 SwadSetu. Artisanal meals delivered with care.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          <Link to="/sustainability" className="text-text-light dark:text-gray-400 text-xs hover:text-primary transition-all">Sustainability</Link>
          <Link to="/partners" className="text-text-light dark:text-gray-400 text-xs hover:text-primary transition-all">Kitchen Partners</Link>
          <Link to="/support" className="text-text-light dark:text-gray-400 text-xs hover:text-primary transition-all">Support</Link>
          <Link to="/careers" className="text-text-light dark:text-gray-400 text-xs hover:text-primary transition-all">Careers</Link>
          <Link to="/privacy" className="text-text-light dark:text-gray-400 text-xs hover:text-primary transition-all">Privacy Policy</Link>
          <Link to="/contact" className="text-text-light dark:text-gray-400 text-xs hover:text-primary transition-all">Contact</Link>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
