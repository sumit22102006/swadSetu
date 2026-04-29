import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Info, 
  CheckCircle, 
  Leaf, 
  Landmark, 
  ShieldCheck, 
  Activity, 
  Flame, 
  Monitor, 
  Plus, 
  X, 
  Bell, 
  User,
  Search,
  ChevronRight,
  HandPlatter
} from 'lucide-react';

const ProfilePage = () => {
  const [selectedDiet, setSelectedDiet] = useState('Pure veg');
  const [spiciness, setSpiciness] = useState('Medium');
  const [oilLevel, setOilLevel] = useState(50);
  const [tiffinTime, setTiffinTime] = useState('11am-1pm');
  const [avoidItems, setAvoidItems] = useState(['Peanuts', 'Dairy', 'Shellfish', 'Gluten', 'Mustard', 'Sesame']);

  const diets = [
    { id: 'Pure veg', icon: <Leaf className="w-5 h-5 text-green-500" />, title: 'Pure veg', desc: 'Strictly vegetarian meals only' },
    { id: 'Jain', icon: <Landmark className="w-5 h-5 text-orange-500" />, title: 'Jain', desc: 'No root vegetables, purely Satvic' },
    { id: 'No onion/garlic', icon: <HandPlatter className="w-5 h-5 text-gray-500" />, title: 'No onion/garlic', desc: 'Excludes all alliums from preparation' },
    { id: 'Diabetic-safe', icon: <Activity className="w-5 h-5 text-blue-500" />, title: 'Diabetic-safe', desc: 'Low glycemic index, controlled portions' },
    { id: 'High protein', icon: <Flame className="w-5 h-5 text-red-500" />, title: 'High protein', desc: 'Extra legumes, paneer and soy proteins' },
    { id: 'Low calorie', icon: <Monitor className="w-5 h-5 text-purple-500" />, title: 'Low calorie', desc: 'Optimized for weight management' },
  ];

  const spicinessLevels = ['No spice', 'Mild', 'Medium', 'Spicy', 'Extra hot'];
  const tiffinTimes = ['Before 11am', '11am-1pm', '1pm-3pm', 'After 3pm'];

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f] font-sans text-gray-800">
      {/* Navbar */}
      <nav className="bg-[#0f0f0f] border-b border-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold text-white tracking-tight">SwadSetu<span className="text-orange-500">.</span></Link>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/menu" className="hover:text-white transition-colors">Menu</Link>
          <Link to="/orders" className="hover:text-white transition-colors">Orders</Link>
          <Link to="/profile" className="text-white border-b-2 border-orange-500 pb-1">Profile</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-orange-700 transition-colors">Go Premium</button>
          <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" />
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white cursor-pointer">
            <User className="w-5 h-5" />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 bg-white w-full p-6 md:p-12 shadow-inner">
        <div className="w-full mx-auto max-w-[1600px]">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My preferences</h1>
              <p className="text-gray-500 text-sm mt-1">These global settings apply to all your delivery centers automatically.</p>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 text-xs font-semibold">All centers synced</span>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-8 flex items-center gap-3">
            <Info className="w-5 h-5 text-orange-500 shrink-0" />
            <p className="text-orange-800 text-sm font-medium">Changes made here will take effect from your next scheduled delivery.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: What do you eat? */}
            <div className="border border-gray-100 rounded-xl p-6 bg-gray-50/50">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">What do you eat?</h2>
                  <p className="text-gray-500 text-xs">Applied to all centers</p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-md">Veg selected</span>
              </div>

              <div className="space-y-3">
                {diets.map((diet) => (
                  <div 
                    key={diet.id}
                    onClick={() => setSelectedDiet(diet.id)}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedDiet === diet.id 
                      ? 'bg-white border-orange-500 shadow-sm' 
                      : 'bg-white/50 border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${selectedDiet === diet.id ? 'bg-orange-50' : 'bg-gray-100'}`}>
                      {diet.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{diet.title}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">{diet.desc}</p>
                    </div>
                    {selectedDiet === diet.id && (
                      <div className="ml-auto">
                        <CheckCircle className="w-5 h-5 text-orange-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Spiciness */}
              <div className="border border-gray-100 rounded-xl p-6 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">How spicy do you like it?</h2>
                <div className="flex flex-wrap gap-2">
                  {spicinessLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSpiciness(level)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        spiciness === level
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-6">Oil quantity</h3>
                  <div className="relative pt-1 px-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={oilLevel}
                      onChange={(e) => setOilLevel(e.target.value)}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      <span>Less</span>
                      <span>Normal</span>
                      <span>Extra</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tiffin Time */}
              <div className="border border-gray-100 rounded-xl p-6 bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">When do you want your tiffin?</h2>
                <div className="grid grid-cols-2 gap-3">
                  {tiffinTimes.map((time) => (
                    <div
                      key={time}
                      onClick={() => setTiffinTime(time)}
                      className={`p-3 rounded-lg border text-center cursor-pointer transition-all ${
                        tiffinTime === time
                        ? 'bg-white border-orange-500 text-orange-600 shadow-sm font-bold'
                        : 'bg-white border-gray-100 text-gray-600 font-medium'
                      }`}
                    >
                      <span className="text-xs">{time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Advance meal lock time</span>
                    <span className="font-bold text-orange-600">10:00 pm</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Default if not customized</span>
                    <span className="font-bold text-orange-600">Chef's choice</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Things to Avoid */}
          <div className="mt-8 border border-gray-100 rounded-xl p-6 bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Things to avoid</h2>
            <div className="flex flex-wrap gap-2">
              {avoidItems.map((item) => (
                <div key={item} className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-md border border-orange-100 text-xs font-semibold">
                  {item}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-orange-900" 
                    onClick={() => setAvoidItems(avoidItems.filter(i => i !== item))}
                  />
                </div>
              ))}
              <button className="flex items-center gap-2 bg-white border border-dashed border-gray-300 px-4 py-1.5 rounded-md text-xs font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-600">
                <Plus className="w-3 h-3" />
                Add item
              </button>
            </div>
          </div>

          {/* Bottom Validation Banner */}
          <div className="mt-8 bg-green-50 border border-green-100 rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
              <p className="text-green-800 text-sm font-medium">All your nutritional preferences are currently validated for your region.</p>
            </div>
            <Link to="/nutrition" className="text-green-700 text-xs font-bold underline decoration-2 underline-offset-4 hover:text-green-800 transition-colors">
              View nutritional breakdown
            </Link>
          </div>

          {/* Footer Actions */}
          <div className="mt-10 flex items-center justify-end gap-4">
            <button className="text-gray-500 text-sm font-semibold hover:text-gray-700 transition-colors mr-auto">
              Reset to default
            </button>
            <button className="border border-orange-500 text-orange-600 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-orange-50 transition-all">
              Preview changes
            </button>
            <button className="bg-orange-600 text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all">
              Save preferences
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
