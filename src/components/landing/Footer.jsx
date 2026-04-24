import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border bg-bg-light border-b-[5px] border-[#00A3FF]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
        <div className="flex flex-col gap-1 text-center md:text-left">
          <div className="text-lg font-bold">swadSetu</div>
          <div className="text-[12px] text-text-muted">© 2024 swadSetu. Artisanal meals delivered with care.</div>
        </div>
        <div className="flex gap-6 flex-wrap justify-center">
          <a href="#" className="text-[12px] text-text-muted hover:text-text-dark transition-colors">Sustainability</a>
          <a href="#" className="text-[12px] text-text-muted hover:text-text-dark transition-colors">Kitchen Partners</a>
          <a href="#" className="text-[12px] text-text-muted hover:text-text-dark transition-colors">Careers</a>
          <a href="#" className="text-[12px] text-text-muted hover:text-text-dark transition-colors">Privacy Policy</a>
          <a href="#" className="text-[12px] text-text-muted hover:text-text-dark transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
