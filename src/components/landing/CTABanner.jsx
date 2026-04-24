import React from 'react';
import { Link } from 'react-router-dom';

const CTABanner = () => {
  return (
    <section className="bg-bg-dark text-white py-20 relative overflow-hidden">
      <div className="absolute -right-[5%] top-1/2 -translate-y-1/2 text-[400px] text-white/[0.03] z-[1] pointer-events-none font-black leading-none uppercase">
        swadSetu
      </div>
      <div className="container relative z-[2] max-w-[600px] mx-auto md:ml-[max(24px,calc((100vw-1200px)/2))] text-center md:text-left">
        <h2 className="text-3xl font-bold mb-4">Ready for a better lunch ritual?</h2>
        <p className="text-base opacity-80 mb-8 leading-relaxed">
          Join 5,000+ conscious diners who have traded processed meals for the warmth of home-cooked artisanal food.
        </p>
        <Link to="/dashboard" className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded font-semibold text-sm transition-colors text-center inline-block">
          Start Your Subscription
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
