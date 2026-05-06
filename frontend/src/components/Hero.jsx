import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section 
      className="relative h-[85vh] min-h-[600px] flex items-center bg-cover bg-center text-white" 
      style={{ backgroundImage: `url('/images/hero.png')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 bg-linear-to-b from-black/60 to-black/30"></div>
      
      <div className="container relative z-10">
        <div className="max-w-[600px]">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4 md:mb-5">
            The Warmth of a Home-Cooked Meal, Delivered.
          </h1>
          <p className="text-base md:text-lg mb-7 md:mb-9 opacity-90">
            Experience authentic regional flavors prepared by local kitchen artisans. Sustainable, healthy, and crafted with the care of a home kitchen.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/signup" className="btn btn-primary text-center">Explore Our Plans</Link>
            <button className="btn btn-outline">View Menu</button>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Hero;
