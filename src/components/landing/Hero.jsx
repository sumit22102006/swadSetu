import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-20 text-text-light bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.6)),url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=2000')] bg-center bg-cover bg-no-repeat">
      <div className="max-w-[1200px] mx-auto px-6 w-full">
        <div className="max-w-[600px]">
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-4">The Warmth of a Home-Cooked Meal, Delivered.</h1>
          <p className="text-base font-normal opacity-90 mb-8 leading-relaxed">
            Experience authentic regional flavors prepared by local kitchen artisans. 
            Sustainable, healthy, and crafted with the care of a home kitchen.
          </p>
          <div className="flex gap-4">
            <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded font-semibold text-sm transition-colors">Explore Our Plans</button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-2.5 rounded font-semibold text-sm hover:bg-white/20 transition-colors">View Menu</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
