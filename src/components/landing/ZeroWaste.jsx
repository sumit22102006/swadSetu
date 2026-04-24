import React from 'react';
import { Recycle, Truck } from 'lucide-react';
import tiffinImg from '../../assets/Screenshot 2026-04-24 125513.png';

const ZeroWaste = () => {
  return (
    <section className="py-20 bg-bg-light">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
        <div className="bg-[#F5F5F5] rounded flex justify-center items-center overflow-hidden">
          <img src={tiffinImg} alt="Stainless steel tiffin" className="w-full h-auto object-cover mix-blend-multiply" />
        </div>
        <div className="text-left">
          <h2 className="text-3xl font-bold mb-2">Zero Waste Living</h2>
          <p className="text-primary italic font-semibold text-lg mb-10">"Good for your soul, better for our planet"</p>
          
          <div className="flex flex-col gap-8 mb-10">
            <div className="flex gap-4">
              <Recycle size={24} className="text-accent-green shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-semibold mb-1">No Single-Use Plastic</h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  Every meal arrives in high-grade stainless steel tiffins, eliminating thousands of plastic containers every month.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Truck size={24} className="text-accent-green shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-semibold mb-1">Artisanal Sourcing</h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  We source directly from local farmers, reducing the carbon footprint and ensuring the freshest ingredients possible.
                </p>
              </div>
            </div>
          </div>
          
          <button className="bg-accent-green hover:bg-[#135d36] text-white px-6 py-3 rounded font-semibold text-sm transition-colors">
            Our Sustainability Roadmap
          </button>
        </div>
      </div>
    </section>
  );
};

export default ZeroWaste;
