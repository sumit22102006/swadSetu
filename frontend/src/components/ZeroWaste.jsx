import React from 'react';

const ZeroWaste = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 w-full">
            <img src="/images/zero_waste.png" alt="Stainless Steel Tiffins" className="rounded-lg w-full shadow-lg" />
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-2">Zero Waste Living</h2>
            <span className="italic text-primary text-lg mb-8 block">"Good for your soul, better for our planet"</span>
            
            <div className="flex gap-5 mb-6">
              <div className="text-primary text-2xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold mb-1">No Single-Use Plastic</h4>
                <p className="text-text-light text-sm">Every meal arrives in high-grade stainless steel tiffins, eliminating thousands of plastic containers every month.</p>
              </div>
            </div>

            <div className="flex gap-5 mb-6">
              <div className="text-primary text-2xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-bold mb-1">Artisanal Sourcing</h4>
                <p className="text-text-light text-sm">We source directly from local farmers, reducing the carbon footprint and ensuring the freshest ingredients possible.</p>
              </div>
            </div>

            <button className="btn bg-[#2D6A4F] text-white hover:bg-[#1B4332] px-6">Our Sustainability Roadmap</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZeroWaste;
