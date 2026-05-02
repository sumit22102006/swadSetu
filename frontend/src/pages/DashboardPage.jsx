import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ThemeToggle from '../components/ThemeToggle';
import { 
  Bell, 
  User, 
  Star, 
  ArrowRight,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Heart,
  X,
  RefreshCw,
  Check
} from 'lucide-react';

const DashboardPage = () => {
  const [isSkipped, setIsSkipped] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState('1:00 PM');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [activeBadge, setActiveBadge] = useState(null);
  
  const [swapsLeft, setSwapsLeft] = useState(3);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [mealIdxToSwap, setMealIdxToSwap] = useState(null);
  
  const [upcomingMeals, setUpcomingMeals] = useState([
    { day: 'Tomorrow', menu: 'Butter Chicken & Naan', type: 'Dinner', time: '8:00 PM' },
    { day: 'Wednesday', menu: 'Paneer Pulao & Raita', type: 'Lunch', time: '1:30 PM' },
  ]);

  const alternativeDishes = [
    'Palak Paneer & Roti',
    'Dal Makhani & Jeera Rice',
    'Chole Bhature',
    'Mutton Curry & Rice',
    'Vegetable Biryani'
  ];

  const handleSwapClick = (idx) => {
    if (swapsLeft > 0) {
      setMealIdxToSwap(idx);
      setIsSwapModalOpen(true);
    } else {
      alert("You have no swaps left this month! Upgrade to Pro for unlimited swaps.");
    }
  };

  const confirmSwap = (newDish) => {
    const updatedMeals = [...upcomingMeals];
    updatedMeals[mealIdxToSwap] = { ...updatedMeals[mealIdxToSwap], menu: newDish };
    setUpcomingMeals(updatedMeals);
    setSwapsLeft(prev => prev - 1);
    setIsSwapModalOpen(false);
  };
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Namaste';
    return 'Good Evening';
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-[#0f0f0f] text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-[#000000] px-8 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm dark:shadow-xl border-b border-gray-100 dark:border-white/5 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">swadSetu</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="group relative">
              <div className="bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full text-[10px] font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2 cursor-help">
                <Star className="w-3 h-3 fill-orange-400" />
                Standard Plan
              </div>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 border border-gray-100 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50">
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase mb-1">Your Benefits</p>
                <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1 font-medium">
                  <li>• Daily artisan meals</li>
                  <li>• 3 free swaps/month</li>
                  <li>• Priority support</li>
                </ul>
              </div>
            </div>
            
            <ThemeToggle />

            <Link to="/profile" className="w-9 h-9 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-full flex items-center justify-center text-white cursor-pointer overflow-hidden ring-2 ring-gray-800 dark:ring-gray-700 hover:ring-orange-500/50 transition-all">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8 lg:p-12 max-w-6xl w-full mx-auto">
          {/* Greeting & Quick Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight transition-colors">
                {getGreeting()}, Arjun
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2 transition-colors">
                <Clock className="w-4 h-4 text-orange-500" />
                Next delivery: <span className="text-gray-900 dark:text-gray-100 font-bold">{isSkipped ? 'Tomorrow' : `${deliveryTime} Today`}</span> from Annapurna Kitchen
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsSkipped(!isSkipped)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  isSkipped 
                  ? 'bg-red-50 text-red-600 border border-red-100 shadow-inner' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-500 hover:text-orange-600 shadow-sm'
                }`}
              >
                {isSkipped ? 'Meal Skipped' : 'Skip Today\'s Meal'}
              </button>
              <button 
                onClick={() => setIsScheduleModalOpen(true)}
                className="bg-orange-600 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-200 hover:bg-orange-700 hover:-translate-y-0.5 transition-all"
              >
                Modify Schedule
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100/50 dark:border-gray-800 group hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loyalty</h3>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">12 Days Active</p>
                  <p className="text-[10px] text-green-600 font-bold mt-2">+2 days from last week</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100/50 dark:border-gray-800 group hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Flexibility</h3>
                    <div className="flex gap-1">
                      {[...Array(Math.max(0, swapsLeft))].map((_, i) => <Heart key={i} className="w-4 h-4 text-red-500 fill-red-500" />)}
                      {[...Array(Math.max(0, 3 - swapsLeft))].map((_, i) => <Heart key={`empty-${i}`} className="w-4 h-4 text-gray-200 dark:text-gray-700" />)}
                    </div>
                  </div>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">{swapsLeft} Swaps Left</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mt-2">Resets in 4 days</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100/50 dark:border-gray-800 group hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Feedback</h3>
                    <div className="flex gap-0.5">
                      {[1,2,3,4].map(i => <Star key={i} className="w-3 h-3 text-orange-500 fill-orange-500" />)}
                    </div>
                  </div>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">4.8 Avg Rating</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mt-2">Top 5% of diners</p>
                </div>
              </div>

              {/* Featured Card */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none overflow-hidden group border border-gray-100 dark:border-gray-800">
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
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 leading-tight">Today's Special Thali</h2>
                    <p className="text-gray-500 leading-relaxed mb-8 font-medium">
                      Slow-cooked yellow dal tadka, jeera rice, aloo gobhi matar, and two handmade whole wheat rotis.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => { setActiveBadge('protein'); setIsInfoModalOpen(true); }}
                        className="bg-gray-100 text-gray-600 text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-wider hover:bg-orange-100 hover:text-orange-600 transition-all transform hover:-translate-y-0.5"
                      >
                        High Protein
                      </button>
                      <button 
                        onClick={() => { setActiveBadge('spice'); setIsInfoModalOpen(true); }}
                        className="bg-gray-100 text-gray-600 text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-wider hover:bg-orange-100 hover:text-orange-600 transition-all transform hover:-translate-y-0.5"
                      >
                        Mild Spicy
                      </button>
                      <button 
                        onClick={() => { setActiveBadge('popular'); setIsInfoModalOpen(true); }}
                        className="bg-orange-50 text-orange-600 text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-wider border border-orange-100 hover:bg-orange-600 hover:text-white transition-all transform hover:-translate-y-0.5"
                      >
                        Most Popular
                      </button>
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

                <div className="bg-white dark:bg-[#121212] rounded-3xl p-10 text-gray-900 dark:text-white shadow-xl dark:shadow-2xl border border-gray-100 dark:border-none relative overflow-hidden transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
                  <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-10">Recent Activity</h3>
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
                    <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                      <Link to="/orders" className="text-orange-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-all">
                        View Full History <ArrowRight className="w-3 h-3" />
                      </Link>
                      <span className="text-[10px] text-gray-400 dark:text-gray-600 font-bold uppercase">4 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Upcoming & Discovery */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-orange-500/5 relative group/card overflow-hidden">
                {/* Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 opacity-80"></div>
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <h3 className="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">Upcoming Schedule</h3>
                  <button className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:text-orange-600 transition-colors">View All</button>
                </div>
                
                <div className="space-y-0 relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-2 bottom-2 w-px bg-gray-100 dark:bg-gray-800"></div>
                  
                  {upcomingMeals.map((meal, idx) => (
                    <div key={idx} className="relative pl-12 pb-8 last:pb-0 group/item">
                      {/* Timeline Dot */}
                      <div className="absolute left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 z-10 group-hover/item:border-orange-500 group-hover/item:scale-125 transition-all duration-300"></div>
                      
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{meal.day} • {meal.time}</span>
                          <button 
                            onClick={() => handleSwapClick(idx)}
                            className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-0.5 active:scale-95 group/swap"
                          >
                            Swap Meal <RefreshCw className="w-3 h-3 group-hover/swap:rotate-180 transition-transform duration-500" />
                          </button>
                        </div>
                        <h4 className="text-sm font-black text-gray-900 dark:text-white group-hover/item:text-orange-600 transition-colors">{meal.menu}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{meal.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* New Horizontal Discovery Section */}
          <div className="mt-20">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1 tracking-tight transition-colors">Discover Kitchen Artisans</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium transition-colors">Top-rated kitchens curated just for you this week.</p>
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
                <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-none transition-all cursor-pointer">
                  <div className="w-8 h-8 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <h5 className="font-black text-sm mb-1 text-gray-900 dark:text-white">{kitchen.name}</h5>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400">
                    <span className="flex items-center gap-1 text-orange-500"><Star className="w-3 h-3 fill-orange-500" /> {kitchen.rating}</span>
                    <span className="dark:text-gray-500">{kitchen.dishes} Dishes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improved Footer */}
          <footer className="mt-32 pt-12 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-400 text-[10px] font-bold pb-20">
            <div className="flex items-center gap-10">
              <span className="text-gray-900 dark:text-white text-sm font-black tracking-tight">swadSetu<span className="text-orange-500">.</span></span>
              <span className="font-medium text-gray-400 dark:text-gray-500">© 2024 SwadSetu. Built for honesty and clarity.</span>
            </div>
            <div className="flex gap-8 uppercase tracking-widest">
              <Link to="/support" className="hover:text-orange-500 transition-colors">Help Center</Link>
              <Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link>
            </div>
          </footer>
        </main>
      </div>

      {/* Swap Modal */}
      {isSwapModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-black text-gray-900">Swap Your Meal</h2>
                <p className="text-xs font-bold text-gray-500 mt-1 flex items-center gap-1">
                  Costs 1 <Heart className="w-3 h-3 text-red-500 fill-red-500" /> • {swapsLeft} remaining
                </p>
              </div>
              <button onClick={() => setIsSwapModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 w-8 h-8 rounded-full flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 mb-6">
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Replacing</p>
              <p className="text-sm font-bold text-gray-900">{upcomingMeals[mealIdxToSwap]?.menu}</p>
            </div>
            
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Select Alternative</h3>
            
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {alternativeDishes.map((dish, i) => (
                <div 
                  key={i}
                  onClick={() => confirmSwap(dish)}
                  className="p-4 rounded-xl border border-gray-100 flex justify-between items-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all group"
                >
                  <span className="text-sm font-bold text-gray-700 group-hover:text-orange-600">{dish}</span>
                  <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-colors">
                    <Check className="w-3 h-3 text-white opacity-0 group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setIsSwapModalOpen(false)}
              className="w-full mt-6 py-3 bg-gray-50 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-black text-gray-900">Modify Schedule</h2>
                <p className="text-xs font-bold text-gray-500 mt-1">Select your preferred delivery time</p>
              </div>
              <button onClick={() => setIsScheduleModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 w-8 h-8 rounded-full flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'].map((time) => (
                <div 
                  key={time}
                  onClick={() => {
                    setDeliveryTime(time);
                    setIsScheduleModalOpen(false);
                  }}
                  className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer transition-all group ${
                    deliveryTime === time 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-100 hover:border-orange-200 hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-sm font-bold ${deliveryTime === time ? 'text-orange-600' : 'text-gray-700'}`}>{time}</span>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                    deliveryTime === time 
                    ? 'bg-orange-500 border-orange-500' 
                    : 'border-gray-200 group-hover:border-orange-300'
                  }`}>
                    <Check className={`w-3 h-3 text-white ${deliveryTime === time ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setIsScheduleModalOpen(false)}
              className="w-full mt-6 py-3 bg-gray-50 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Meal Insights Modal */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Meal Insights</h2>
              <button onClick={() => setIsInfoModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 w-8 h-8 rounded-full flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {activeBadge === 'protein' && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
                  <p className="text-4xl font-black text-blue-600 mb-1">28g</p>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Total Protein</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Primary Sources</p>
                  <ul className="text-sm font-black text-gray-800 space-y-1">
                    <li>• Slow-cooked Yellow Dal</li>
                    <li>• Handmade Whole Wheat Roti</li>
                    <li>• Fresh Aloo Gobhi Matar</li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeBadge === 'spice' && (
              <div className="space-y-6">
                <div className="flex justify-center gap-2">
                  {[1, 2].map(i => <Flame key={i} className="w-8 h-8 text-orange-500 fill-orange-500" />)}
                  {[3, 4, 5].map(i => <Flame key={i} className="w-8 h-8 text-gray-200" />)}
                </div>
                <div className="text-center">
                  <p className="text-lg font-black text-gray-900">Mild Heat Level</p>
                  <p className="text-xs font-medium text-gray-500 mt-2 leading-relaxed">
                    Balanced using Kashmiri red chilies for color and mild warmth, without the intense heat.
                  </p>
                </div>
              </div>
            )}
            
            {activeBadge === 'popular' && (
              <div className="space-y-6">
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 text-center">
                  <div className="flex justify-center gap-1 mb-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />)}
                  </div>
                  <p className="text-2xl font-black text-gray-900">4.9/5 Rating</p>
                  <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mt-1">Based on 1,200+ orders</p>
                </div>
                <p className="text-xs font-medium text-gray-500 text-center leading-relaxed italic">
                  "The Dal Tadka tastes exactly like home. Best thali in the city!"
                </p>
              </div>
            )}
            
            <button 
              onClick={() => setIsInfoModalOpen(false)}
              className="w-full mt-8 py-3 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
