import React from 'react';
import { Star, ArrowRight } from 'lucide-react';

const FeaturedKitchens = () => {
  const kitchens = [
    {
      title: "Asha's Heirloom Recipes",
      rating: 4.8,
      desc: "Bringing the lost flavors of Maharashtra's coastal villages to your doorstep using 50-year old recipes.",
      img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "The Malabar Coast",
      rating: 4.5,
      desc: "Specializing in slow-cooked stews and fermented rice cakes from the heart of Kerala.",
      img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Grandma's Punjab",
      rating: 4.9,
      desc: "Robust, hearty, and butter-laden classics that remind you of long afternoons in a sun-drenched courtyard.",
      img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-0">Featured Kitchens</h2>
            <p className="text-sm text-text-muted mt-2">The soul of swadSetu lies in our local artisan partners.</p>
          </div>
          <a href="#" className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-[gap]">
            View All Kitchens <ArrowRight size={16} />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kitchens.map((kitchen, idx) => (
            <div key={idx} className="border border-border bg-white overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all">
              <img src={kitchen.img} alt={kitchen.title} className="w-full h-[200px] object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">{kitchen.title}</h3>
                  <div className="bg-[#E6F4EA] text-[#1A7B48] text-[12px] font-semibold px-2 py-1 rounded flex items-center gap-1">
                    <Star size={12} fill="currentColor" /> {kitchen.rating}
                  </div>
                </div>
                <p className="text-sm text-text-muted mb-5 leading-relaxed">{kitchen.desc}</p>
                <a href="#" className="text-primary text-sm font-semibold relative inline-block after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-full after:h-[1px] after:bg-primary">
                  View Menu
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedKitchens;
