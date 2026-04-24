import React from 'react';
import { UtensilsCrossed, ChefHat, Leaf } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-bg-beige text-center">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-3xl font-bold mb-3">How It Works</h2>
        <div className="w-10 h-[3px] bg-primary mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-10 px-6 border border-border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#FEECE0] rounded-xl flex items-center justify-center mb-6 text-primary">
              <UtensilsCrossed size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-3">Choose Your Plan</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Select a meal schedule that fits your life—from daily lunches to curated weekend feasts.
            </p>
          </div>
          
          <div className="p-10 px-6 border border-border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#FEECE0] rounded-xl flex items-center justify-center mb-6 text-primary">
              <ChefHat size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-3">Kitchen Crafting</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Our partner artisans prepare your meals using traditional techniques and fresh, local sourcing.
            </p>
          </div>
          
          <div className="p-10 px-6 border border-border flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#FEECE0] rounded-xl flex items-center justify-center mb-6 text-primary">
              <Leaf size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-3">Eco-Friendly Drop</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Delivered in zero-waste reusable containers. We pick them up, clean them, and repeat the cycle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
