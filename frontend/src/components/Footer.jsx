import React from 'react';

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border-custom">
      <div className="container flex flex-col md:row justify-between items-center gap-5 md:gap-0">
        <div className="text-center md:text-left">
          <div className="font-bold text-xl mb-1">swadSetu</div>
          <p className="text-text-light text-xs">© 2024 SwadSetu. Artisanal meals delivered with care.</p>
        </div>
        <div className="flex gap-5">
          <a href="#" className="text-text-light text-xs hover:text-primary transition-all">Sustainability</a>
          <a href="#" className="text-text-light text-xs hover:text-primary transition-all">Kitchen Partners</a>
          <a href="#" className="text-text-light text-xs hover:text-primary transition-all">Careers</a>
          <a href="#" className="text-text-light text-xs hover:text-primary transition-all">Privacy Policy</a>
          <a href="#" className="text-text-light text-xs hover:text-primary transition-all">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
