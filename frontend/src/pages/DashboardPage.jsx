import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  Bell, 
  User, 
  Star, 
  ArrowRight,
  TrendingUp,
  Clock,
  ArrowUpRight
} from 'lucide-react';

const DashboardPage = () => {
  const [isSkipped, setIsSkipped] = React.useState(false);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Namaste';
    return 'Good Evening';
  };

  const upcomingMeals = [
    { day: 'Tomorrow', menu: 'Butter Chicken & Naan', type: 'Dinner', time: '8:00 PM' },
    { day: 'Wednesday', menu: 'Paneer Pulao & Raita', type: 'Lunch', time: '1:30 PM' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-gray-800 font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#121212] px-8 py-4 flex justify-between items-center sticky top-0 z-40 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-xl font-bold text-white tracking-tight">swadSetu</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="group relative">
              <div className="bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full text-[10px] font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2 cursor-help">
                <Star className="w-3 h-3 fill-orange-400" />
                Standard Plan
              </div>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-3 border border-gray-100 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50">
                <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Your Benefits</p>
                <ul className="text-xs text-gray-700 space-y-1 font-medium">
                  <li>• Daily artisan meals</li>
                  <li>• 5 free swaps/month</li>
                  <li>• Priority support</li>
                </ul>
              </div>
            </div>
            <div className="w-9 h-9 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-full flex items-center justify-center text-white cursor-pointer overflow-hidden ring-2 ring-gray-800 hover:ring-orange-500/50 transition-all">
              <User className="w-5 h-5" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8 lg:p-12 max-w-6xl w-full mx-auto">
          {/* Greeting & Quick Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                {getGreeting()}, Arjun
              </h1>
              <p className="text-gray-500 font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                Next delivery: <span className="text-gray-900 font-bold">1:00 PM Today</span> from Annapurna Kitchen
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsSkipped(!isSkipped)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  isSkipped 
                  ? 'bg-red-50 text-red-600 border border-red-100' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-500 hover:text-orange-600 shadow-sm'
                }`}
              >
                {isSkipped ? 'Meal Skipped' : 'Skip Today\'s Meal'}
              </button>
              <button className="bg-orange-600 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-200 hover:bg-orange-700 hover:-translate-y-0.5 transition-all">
                Modify Schedule
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 group hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loyalty</h3>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-black text-gray-900">12 Days Active</p>
                  <p className="text-[10px] text-green-600 font-bold mt-2">+2 days from last week</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 group hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Flexibility</h3>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                  </div>
                  <p className="text-2xl font-black text-gray-900">2 Swaps Left</p>
                  <p className="text-[10px] text-gray-500 font-bold mt-2">Resets in 4 days</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 group hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Feedback</h3>
                    <div className="flex gap-0.5">
                      {[1,2,3,4].map(i => <Star key={i} className="w-3 h-3 text-orange-500 fill-orange-500" />)}
                    </div>
                  </div>
                  <p className="text-2xl font-black text-gray-900">4.8 Avg Rating</p>
                  <p className="text-[10px] text-gray-500 font-bold mt-2">Top 5% of diners</p>
                </div>
              </div>

              {/* Featured Card */}
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden group border border-gray-100">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-5/12 relative overflow-hidden h-[250px] md:h-auto">
                    <img 
                      src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1000" 
                      alt="Today's Special Thali" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6 bg-green-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                      Freshly Prepared
                    </div>
                  </div>
                  <div className="md:w-7/12 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-8 h-px bg-orange-500"></span>
                      <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">Chef's Special</span>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4 leading-tight">Today's Special Thali</h2>
                    <p className="text-gray-500 leading-relaxed mb-8 font-medium">
                      Slow-cooked yellow dal tadka, jeera rice, aloo gobhi matar, and two handmade whole wheat rotis.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="bg-gray-100 text-gray-600 text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-wider">High Protein</span>
                      <span className="bg-gray-100 text-gray-600 text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-wider">Mild Spicy</span>
                      <span className="bg-orange-50 text-orange-600 text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-wider border border-orange-100">Most Popular</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo & Recent Activity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-10 text-white shadow-lg shadow-orange-200 relative overflow-hidden group">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                  <h3 className="text-2xl font-black mb-4 relative z-10">Share the taste, earn rewards</h3>
                  <p className="opacity-90 leading-relaxed mb-10 text-sm font-medium relative z-10">
                    Refer a friend and get 3 free premium meal swaps added to your account instantly.
                  </p>
                  <button className="bg-white text-orange-600 font-black text-[10px] uppercase tracking-widest py-4 px-10 rounded-2xl w-fit hover:bg-orange-50 hover:shadow-xl transition-all relative z-10">
                    Get Referral Link
                  </button>
                </div>

                <div className="bg-[#121212] rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-10">Recent Activity</h3>
                  <div className="space-y-8">
                    <div className="flex gap-5">
                      <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center shrink-0">
                        <Star className="w-5 h-5 text-orange-500 fill-orange-500" />
                      </div>
                      <div>
                        <p className="font-black text-sm mb-1.5">Last meal rated 5/5</p>
                        <p className="text-gray-500 text-xs leading-relaxed font-medium">Thank you for rating the Paneer Lababdar.</p>
                      </div>
                    </div>
                    <div className="pt-8 border-t border-gray-800 flex justify-between items-center">
                      <Link to="/orders" className="text-orange-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-all">
                        View Full History <ArrowRight className="w-3 h-3" />
                      </Link>
                      <span className="text-[10px] text-gray-600 font-bold uppercase">4 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Upcoming & Discovery */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center justify-between">
                  Upcoming Meals
                  <span className="text-[10px] text-orange-500 font-bold lowercase hover:underline cursor-pointer">see all</span>
                </h3>
                <div className="space-y-6">
                  {upcomingMeals.map((meal, idx) => (
                    <div key={idx} className="flex gap-4 group cursor-pointer">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex flex-col items-center justify-center border border-gray-100 group-hover:border-orange-200 transition-colors">
                        <span className="text-[10px] font-black text-gray-400 uppercase leading-none mb-1">{meal.day.substring(0,3)}</span>
                        <span className="text-xs font-black text-gray-900">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-black text-gray-900 group-hover:text-orange-600 transition-colors">{meal.menu}</p>
                        <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-wider">{meal.type} • {meal.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#121212] rounded-3xl p-8 text-white relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=500" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-black mb-2">Upgrade to Pro</h4>
                  <p className="text-gray-400 text-xs font-medium mb-6 leading-relaxed">Unlock unlimited meal swaps and weekend artisan specials.</p>
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 group-hover:gap-3 transition-all">
                    Explore Plans <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* New Horizontal Discovery Section */}
          <div className="mt-20">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-1 tracking-tight">Discover Kitchen Artisans</h3>
                <p className="text-gray-500 text-sm font-medium">Top-rated kitchens curated just for you this week.</p>
              </div>
              <Link to="/kitchens" className="text-orange-500 text-xs font-black uppercase tracking-widest border-b-2 border-orange-500/20 pb-1 hover:border-orange-500 transition-all">
                View Map
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Annapurna Kitchen', rating: '4.9', dishes: '24' },
                { name: 'Royal Tiffins', rating: '4.7', dishes: '18' },
                { name: 'Satvic Delights', rating: '4.8', dishes: '12' },
                { name: 'Konkan Coast', rating: '4.9', dishes: '31' }
              ].map((kitchen, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-xl hover:shadow-gray-100 transition-all cursor-pointer">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <h5 className="font-black text-sm mb-1">{kitchen.name}</h5>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400">
                    <span className="flex items-center gap-1 text-orange-500"><Star className="w-3 h-3 fill-orange-500" /> {kitchen.rating}</span>
                    <span>{kitchen.dishes} Dishes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improved Footer */}
          <footer className="mt-32 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-400 text-[10px] font-bold pb-20">
            <div className="flex items-center gap-10">
              <span className="text-gray-900 text-sm font-black tracking-tight">swadSetu<span className="text-orange-500">.</span></span>
              <span className="font-medium">© 2024 SwadSetu. Built for honesty and clarity.</span>
            </div>
            <div className="flex gap-8 uppercase tracking-widest">
              <Link to="/support" className="hover:text-orange-500 transition-colors">Help Center</Link>
              <Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
