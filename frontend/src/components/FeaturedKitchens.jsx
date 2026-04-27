import React from 'react';
import { Link } from 'react-router-dom';

const KitchenCard = ({ img, title, rating, desc }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="h-[200px] overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
    </div>
    <div className="p-5">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="bg-success text-white px-2 py-0.5 rounded text-xs font-semibold">★ {rating}</div>
      </div>
      <p className="text-text-light text-[0.85rem] mb-4 line-clamp-2">{desc}</p>
      <Link to="/menu" className="text-primary font-semibold text-[0.85rem] border-b border-primary">View Menu</Link>
    </div>
  </div>
);

const FeaturedKitchens = () => {
  const kitchens = [
    {
      img: '/images/kitchen_asha.png',
      title: "Asha's Heirloom Recipes",
      rating: '4.8',
      desc: 'Bringing the lost flavors of Maharashtra\'s coastal villages to your doorstep using 50-year-old spice blends.'
    },
    {
      img: '/images/kitchen_malabar.png',
      title: 'The Malabar Coast',
      rating: '4.9',
      desc: 'Specializing in slow-cooked stews and fermented rice cakes from the heart of Kerala\'s culinary heritage.'
    },
    {
      img: '/images/kitchen_punjab.png',
      title: 'Grandma\'s Punjab',
      rating: '4.7',
      desc: 'Robust, hearty, and butter-laden classics that remind you of long afternoons in a sun-drenched courtyard.'
    }
  ];

  return (
    <section className="py-20 bg-bg-light">
      <div className="container">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-bold mb-1">Featured Kitchens</h2>
            <p className="text-text-light text-sm">The soul of swadSetu lies in our local artisan partners.</p>
          </div>
          <Link to="/kitchens" className="text-primary font-semibold text-sm">View All Kitchens →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kitchens.map((k, i) => <KitchenCard key={i} {...k} />)}
        </div>
      </div>
    </section>
  );
};

export default FeaturedKitchens;
