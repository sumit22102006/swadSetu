import React from 'react';

const CTA = () => {
  return (
    <section 
      className="relative h-[400px] flex items-center bg-cover bg-center text-white text-center" 
      style={{ backgroundImage: `url('/images/cta_bg.png')` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container relative z-10 px-4">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">Ready for a better lunch ritual?</h2>
        <p className="text-base md:text-lg mb-8 opacity-90 max-w-xl mx-auto">Join 5,000+ conscious diners who have traded processed meals for the warmth of home-cooked artisanal food.</p>
        <button className="btn btn-primary">Start Your Subscription</button>
      </div>
    </section>
  );
};

export default CTA;
