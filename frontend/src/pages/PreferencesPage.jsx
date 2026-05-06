import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, Leaf, Landmark, Activity, Flame, Monitor, 
  Plus, X, Bell, User, HandPlatter, Drumstick
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import Sidebar from '../components/Sidebar';
import { API_URL } from '../services/api';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const PreferencesPage = () => {
  const { profile: user } = useSelector((state) => state.user);
  
  // Preferences state (In a real app, this would be fetched from API and managed by Redux)
  const [selectedDiet, setSelectedDiet] = useState('Pure veg');
  const [spiciness, setSpiciness] = useState('Medium');
  const [oilLevel, setOilLevel] = useState(50);
  const [tiffinTime, setTiffinTime] = useState('11am-1pm');
  const [avoidItems, setAvoidItems] = useState(['Peanuts', 'Dairy', 'Shellfish', 'Gluten', 'Mustard', 'Sesame']);

  const diets = [
    { id: 'Pure veg', icon: <Leaf className="w-5 h-5 text-green-500" />, title: 'Pure veg', desc: 'Strictly vegetarian meals only' },
    { id: 'Non-veg', icon: <Drumstick className="w-5 h-5 text-red-600" />, title: 'Non-veg', desc: 'Includes chicken, fish and mutton' },
    { id: 'Jain', icon: <Landmark className="w-5 h-5 text-orange-500" />, title: 'Jain', desc: 'No root vegetables, purely Satvic' },
    { id: 'No onion/garlic', icon: <HandPlatter className="w-5 h-5 text-gray-500" />, title: 'No onion/garlic', desc: 'Excludes all alliums from preparation' },
    { id: 'Diabetic-safe', icon: <Activity className="w-5 h-5 text-blue-500" />, title: 'Diabetic-safe', desc: 'Low glycemic index, controlled portions' },
    { id: 'High protein', icon: <Flame className="w-5 h-5 text-red-500" />, title: 'High protein', desc: 'Extra legumes, paneer and soy proteins' },
    { id: 'Low calorie', icon: <Monitor className="w-5 h-5 text-purple-500" />, title: 'Low calorie', desc: 'Optimized for weight management' },
  ];

  const spicinessLevels = ['No spice', 'Mild', 'Medium', 'Spicy', 'Extra hot'];
  const tiffinTimes = ['Before 11am', '11am-1pm', '1pm-3pm', 'After 3pm'];

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <SEO title="Dietary Preferences" url="/preferences" />
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#121212] dark:bg-[#000000] pl-16 lg:pl-8 pr-4 sm:pr-8 py-4 flex justify-between items-center sticky top-0 z-40 shadow-xl transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-xl font-bold text-white tracking-tight">Preferences</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <ThemeToggle />
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white overflow-hidden cursor-pointer">
              {user?.profileImage ? (
                <img src={`${API_URL}/api${user.profileImage}`} alt="Profile" className="w-full h-full object-cover" onError={(e) => e.target.src = user.profileImage} />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-8 md:p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Preferences Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Dietary Preferences</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">These global settings apply to all your delivery centers automatically.</p>
              </div>
              <div className="flex items-center gap-2 bg-green-50 dark:bg-green-500/10 px-4 py-2 rounded-full border border-green-100 dark:border-green-500/20 shadow-sm transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 dark:text-green-400 text-[10px] font-black uppercase tracking-widest">All centers synced</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column: What do you eat? */}
              <div className="bg-white dark:bg-[#121212] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">What do you eat?</h2>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Primary Choice</p>
                  </div>
                  <span className="bg-orange-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                    {selectedDiet}
                  </span>
                </div>

                <div className="space-y-4">
                  {diets.map((diet) => (
                    <div 
                      key={diet.id}
                      onClick={() => setSelectedDiet(diet.id)}
                      className={`flex items-center gap-5 p-5 rounded-2xl border transition-all cursor-pointer ${
                        selectedDiet === diet.id 
                        ? 'bg-orange-500/5 border-orange-500 shadow-sm ring-1 ring-orange-500/20' 
                        : 'bg-gray-50 dark:bg-gray-800/50 border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        selectedDiet === diet.id 
                        ? 'bg-orange-500 text-white shadow-lg' 
                        : 'bg-white dark:bg-gray-800 text-gray-400'
                      }`}>
                        {diet.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base tracking-tight">{diet.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-0.5">{diet.desc}</p>
                      </div>
                      {selectedDiet === diet.id && (
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-10">
                {/* Spiciness */}
                <div className="bg-white dark:bg-[#121212] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
                  <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-8">How spicy do you like it?</h2>
                  <div className="flex flex-wrap gap-3">
                    {spicinessLevels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSpiciness(level)}
                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          spiciness === level
                          ? 'bg-orange-500 text-white shadow-lg scale-105'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>

                  <div className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Oil quantity</h3>
                      <span className="text-orange-500 font-black text-sm">{oilLevel}%</span>
                    </div>
                    <div className="relative pt-1 px-2">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={oilLevel}
                        onChange={(e) => setOilLevel(e.target.value)}
                        className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-orange-500"
                      />
                      <div className="flex justify-between mt-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                        <span>Less</span>
                        <span>Normal</span>
                        <span>Extra</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tiffin Time */}
                <div className="bg-white dark:bg-[#121212] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
                  <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-8">When do you want your tiffin?</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {tiffinTimes.map((time) => (
                      <div
                        key={time}
                        onClick={() => setTiffinTime(time)}
                        className={`p-5 rounded-2xl border text-center cursor-pointer transition-all ${
                          tiffinTime === time
                          ? 'bg-orange-500/5 border-orange-500 text-orange-600 shadow-sm ring-1 ring-orange-500/20'
                          : 'bg-gray-50 dark:bg-gray-800 border-transparent text-gray-500 font-bold'
                        }`}
                      >
                        <span className="text-xs font-black uppercase tracking-widest">{time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 space-y-4 pt-8 border-t border-gray-50 dark:border-gray-800">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Advance lock time</span>
                      <span className="font-black text-gray-900 dark:text-white text-xs">10:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Default Selection</span>
                      <span className="font-black text-orange-500 text-xs">Chef's choice</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Things to Avoid */}
            <div className="mt-10 bg-white dark:bg-[#121212] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
              <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-8">Things to avoid</h2>
              <div className="flex flex-wrap gap-3">
                {avoidItems.map((item) => (
                 <div key={item} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-5 py-3 rounded-2xl border border-transparent dark:border-gray-700 text-xs font-black uppercase tracking-widest transition-all hover:border-orange-500/30">
                   {item}
                   <X 
                     className="w-4 h-4 cursor-pointer text-gray-400 hover:text-orange-500 transition-colors" 
                     onClick={() => setAvoidItems(avoidItems.filter(i => i !== item))}
                   />
                 </div>
                ))}
                <button className="flex items-center gap-3 bg-white dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-400 hover:border-orange-500/50 hover:text-orange-500 transition-all">
                  <Plus className="w-4 h-4" />
                  Add item
                </button>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-end gap-4 sm:gap-6">
              <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors">Discard changes</button>
              <button 
                onClick={() => toast.success('Preferences saved successfully')}
                className="bg-orange-600 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:bg-orange-700 hover:scale-105 active:scale-95 transition-all"
              >
                Save preferences
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PreferencesPage;
