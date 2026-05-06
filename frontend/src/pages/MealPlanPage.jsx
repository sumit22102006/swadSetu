import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API_URL } from '../services/api';
import { MapPin, ChevronLeft, ChevronRight, CalendarX, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { User, Star } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import SEO from '../components/SEO';

const MealPlanPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysOfWeek = (baseDate) => {
    const date = new Date(baseDate);
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    
    const monday = new Date(date);
    monday.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + i);
      days.push(nextDay);
    }
    return days;
  };

  const currentWeekDays = getDaysOfWeek(currentDate);
  const currentMonth = currentWeekDays[0].toLocaleString('default', { month: 'long' });

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };
  
  const formatDateRange = (days) => {
    const start = days[0];
    const end = days[6];
    const startMonth = start.toLocaleString('default', { month: 'short' });
    const endMonth = end.toLocaleString('default', { month: 'short' });
    return `${startMonth} ${start.getDate()} - ${startMonth === endMonth ? '' : endMonth + ' '}${end.getDate()}`;
  };

  const getDayState = (day) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const compareDate = new Date(day);
    compareDate.setHours(0,0,0,0);
    
    const diffTime = compareDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays < 0) return 'past';
    if (diffDays === 1) return 'tomorrow';
    if (diffDays === 2) return 'skipped';
    return 'unplanned';
  };

  const [thursdayState, setThursdayState] = useState('customized');
  const [fridayState, setFridayState] = useState('skipped');
  const [saturdayState, setSaturdayState] = useState('unplanned');
  const [toastMessage, setToastMessage] = useState(null);

  const getStats = () => {
    let planned = 1; // Wednesday
    let customized = 0;
    let skipped = 0;
    
    [thursdayState, fridayState, saturdayState].forEach(s => {
      if (s === 'planned' || s === 'ready') planned++;
      if (s === 'customized') customized++;
      if (s === 'skipped') skipped++;
    });
    
    return { planned, customized, skipped };
  };

  const currentStats = getStats();

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyLastWeek = () => {
    showToast('Successfully copied last week\'s meal plan!');
    setThursdayState('customized');
    setFridayState('planned');
    setSaturdayState('planned');
  };

  const handleAutoFillGaps = () => {
    showToast('Auto-filled missing days successfully!');
    if (saturdayState === 'unplanned') setSaturdayState('planned');
    if (fridayState === 'skipped') setFridayState('planned');
  };

  const handlePlanFullWeek = () => {
    showToast('Full week planned! Get ready for great meals.');
    if (thursdayState === 'skipped') setThursdayState('planned');
    setFridayState('planned');
    setSaturdayState('planned');
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <SEO title="Meal Plan" url="/meal-plans" />
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        
        {toastMessage && (
          <div className="fixed bottom-10 right-10 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <span className="font-bold text-sm tracking-wide">{toastMessage}</span>
          </div>
        )}
        {/* Header from Dashboard for consistency */}
        <header className="bg-[#121212] dark:bg-[#000000] pl-16 lg:pl-8 pr-4 sm:pr-8 py-4 flex justify-between items-center sticky top-0 z-40 shadow-xl transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-xl font-bold text-white tracking-tight">swadSetu</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="hidden sm:flex bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full text-[10px] font-bold text-orange-400 uppercase tracking-widest items-center gap-2">
              <Star className="w-3 h-3 fill-orange-400" />
              Standard Plan
            </div>
            <ThemeToggle />
            <Link to="/profile" className="w-9 h-9 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-full flex items-center justify-center text-white cursor-pointer overflow-hidden ring-2 ring-gray-800 hover:ring-orange-500/50 transition-all">
              {userInfo?.profileImage ? (
                <img src={`${API_URL}/api${userInfo.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </Link>
          </div>
        </header>

        <main className="p-4 sm:p-8 lg:p-12 w-full mx-auto">
          <div className="bg-white dark:bg-gray-900 w-full rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12 text-gray-900 dark:text-white transition-colors">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-extrabold tracking-tight">Meal plan</h1>
              <span className="bg-[#ff6b2b] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                {currentMonth}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Mom's Kitchen - Sector 5</span>
            </div>
          </div>

          <div className="flex gap-8 mt-6 md:mt-0">
            <div className="flex flex-col items-center transition-all">
              <span className="text-2xl font-bold text-[#ff6b2b]">{currentStats.planned}</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Planned</span>
            </div>
            <div className="flex flex-col items-center transition-all">
              <span className="text-2xl font-bold text-[#b85b3b]">{currentStats.customized}</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Customized</span>
            </div>
            <div className="flex flex-col items-center transition-all">
              <span className="text-2xl font-bold text-[#d93838]">{currentStats.skipped}</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Skipped</span>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center">
            <button onClick={handlePrevWeek} className="border border-gray-200 dark:border-gray-800 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <ChevronLeft className="w-4 h-4 text-orange-500" />
            </button>
            <div className="border-y border-gray-200 dark:border-gray-800 px-6 py-1.5 font-bold text-sm min-w-[140px] text-center">
              {formatDateRange(currentWeekDays)}
            </div>
            <button onClick={handleNextWeek} className="border border-gray-200 dark:border-gray-800 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <ChevronRight className="w-4 h-4 text-orange-500" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px] font-bold">
            <button onClick={handleCopyLastWeek} className="border border-gray-200 px-4 py-2 hover:bg-gray-50 transition-colors active:scale-95">
              Copy last week
            </button>
            <button onClick={handleAutoFillGaps} className="bg-orange-50 text-[#ff6b2b] px-4 py-2 border border-orange-100 hover:bg-orange-100 transition-colors active:scale-95">
              Auto-fill gaps
            </button>
            <button onClick={handlePlanFullWeek} className="bg-[#ff6b2b] text-white px-4 py-2 hover:bg-[#e85a1a] transition-colors shadow-md active:scale-95">
              Plan full week
            </button>
          </div>
        </div>

        {/* Days Strip */}
        <div 
          className="flex overflow-x-auto border border-gray-200 dark:border-gray-800 mb-10 snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {currentWeekDays.map((day, idx) => {
            const state = getDayState(day);
            const isToday = state === 'today';
            const dayName = day.toLocaleString('default', { weekday: 'short' });
            const dateNum = day.getDate();
            
            let bgClass = "bg-white";
            let dotClass = null;
            let textClass = "text-gray-700";
            let dayTextClass = "text-gray-400";
            
            if (isToday) {
              bgClass = "bg-[#ff6b2b] text-white";
              textClass = "text-white";
              dayTextClass = "text-white opacity-90";
            } else if (state === 'past') {
              dotClass = "bg-green-500";
            } else if (state === 'tomorrow') {
              bgClass = "bg-orange-50/50";
              dotClass = "bg-[#ff6b2b]";
            } else if (state === 'skipped') {
              bgClass = "bg-red-50/30";
              dotClass = "bg-[#d93838]";
            } else {
              textClass = "text-gray-300";
              dayTextClass = "text-gray-300";
            }
            
            return (
              <div 
                key={idx} 
                className={`border-r border-gray-200 dark:border-gray-800 py-3 flex flex-col items-center justify-center text-center shrink-0 w-[14.28%] min-w-[80px] snap-center ${bgClass}`}
              >
                <span className={`text-[10px] font-bold tracking-widest uppercase ${dayTextClass}`}>{dayName}</span>
                <span className={`text-lg font-bold mt-1 ${isToday ? 'mb-1' : 'mb-2'} ${textClass}`}>{dateNum}</span>
                {isToday && <span className="text-[9px] font-bold tracking-wider uppercase opacity-90">Today</span>}
                {dotClass && <div className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></div>}
              </div>
            );
          })}
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Area (Cards) - Takes up 2 columns */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-max">
            
            {/* Card 1: Today */}
            <div className="border border-gray-200 dark:border-gray-800 flex flex-col h-full bg-white dark:bg-gray-900 transition-colors">
              <div className="bg-[#ff6b2b] text-white px-4 py-3 flex justify-between items-center">
                <span className="text-xs font-bold">Today • Oct 14</span>
                <span className="text-[9px] font-black tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded">Ready for delivery</span>
              </div>
              <div className="h-40 w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800" 
                  alt="Classic Feast" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">Mom's Classic Feast</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                  A rich blend of seasonal spices and artisan paneer.
                </p>
                <ul className="space-y-3 mt-auto">
                  <li className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Basmati Pilaf
                  </li>
                  <li className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div> Paneer Butter Masala
                  </li>
                  <li className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                    <div className="w-1.5 h-1.5 bg-[#ff6b2b] rounded-full"></div> Gulab Jamun (Add-on)
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2: Thursday */}
            {thursdayState === 'skipped' ? (
              <div className="border border-gray-200 dark:border-gray-800 flex flex-col h-full bg-white dark:bg-gray-900">
                <div className="bg-red-50/50 dark:bg-red-500/5 text-gray-900 dark:text-white px-4 py-3 flex justify-between items-center border-b border-red-100 dark:border-red-500/10">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Thu • Oct 15</span>
                  <span className="text-[9px] font-black tracking-widest uppercase text-[#d93838]">Skipped</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/30">
                  <div className="w-12 h-12 bg-red-50 text-[#d93838] rounded-xl flex items-center justify-center mb-4 border border-red-100">
                    <CalendarX className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-gray-500 mb-4">You've opted out for this day.</p>
                  <button onClick={() => { setThursdayState('customized'); showToast('Thursday restored!'); }} className="text-[11px] font-black tracking-widest uppercase text-[#ff6b2b] hover:text-[#e85a1a]">
                    Undo Skip
                  </button>
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 dark:border-gray-800 flex flex-col h-full bg-white dark:bg-gray-900">
                <div className="bg-orange-50 dark:bg-orange-500/5 text-gray-900 dark:text-white px-4 py-3 flex justify-between items-center border-b border-orange-100 dark:border-orange-500/10">
                  <span className="text-xs font-bold">Thu • Oct 15</span>
                  <span className="text-[9px] font-black tracking-widest uppercase text-[#ff6b2b] transition-colors">{thursdayState}</span>
                </div>
                <div className="h-40 w-full overflow-hidden p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800" 
                    alt="Dal and Roti" 
                    className="w-full h-full object-cover rounded shadow-sm"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">Yellow Dal & Roti</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                    Light and comforting lentil soup with handmade whole wheat rotis.
                  </p>
                  <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-4">
                    <button className="text-xs font-bold text-[#ff6b2b] hover:text-[#e85a1a]">Edit choices</button>
                    <button onClick={() => { setThursdayState('skipped'); showToast('Thursday skipped.'); }} className="text-xs font-bold text-[#d93838] hover:text-red-700">Skip day</button>
                  </div>
                </div>
              </div>
            )}

            {/* Card 3: Friday */}
            {fridayState === 'skipped' ? (
              <div className="border border-gray-200 dark:border-gray-800 flex flex-col h-full bg-white dark:bg-gray-900">
                <div className="bg-red-50/50 dark:bg-red-500/5 text-gray-900 dark:text-white px-4 py-3 flex justify-between items-center border-b border-red-100 dark:border-red-500/10">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Fri • Oct 16</span>
                  <span className="text-[9px] font-black tracking-widest uppercase text-[#d93838]">Skipped</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/30">
                  <div className="w-12 h-12 bg-red-50 text-[#d93838] rounded-xl flex items-center justify-center mb-4 border border-red-100">
                    <CalendarX className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-gray-500 mb-4">You've opted out for this day.</p>
                  <button onClick={() => { setFridayState('planned'); showToast('Friday restored!'); }} className="text-[11px] font-black tracking-widest uppercase text-[#ff6b2b] hover:text-[#e85a1a]">
                    Undo Skip
                  </button>
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 dark:border-gray-800 flex flex-col h-full bg-white dark:bg-gray-900">
                <div className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                  <span className="text-xs font-bold">Fri • Oct 16</span>
                  <span className="text-[9px] font-black tracking-widest uppercase text-gray-600 dark:text-gray-400">Planned</span>
                </div>
                <div className="h-40 w-full overflow-hidden p-4">
                  <img src="https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover rounded shadow-sm" alt="Aloo Gobi" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-black text-gray-900 mb-2">Aloo Gobi & Rice</h3>
                  <p className="text-xs text-gray-500 mb-8 leading-relaxed">Homestyle cauliflower and potatoes with jeera rice.</p>
                  <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-4">
                    <button className="text-xs font-bold text-[#ff6b2b] hover:text-[#e85a1a]">Edit choices</button>
                    <button onClick={() => { setFridayState('skipped'); showToast('Friday skipped.'); }} className="text-xs font-bold text-[#d93838] hover:text-red-700">Skip day</button>
                  </div>
                </div>
              </div>
            )}

            {/* Card 4: Saturday */}
            {saturdayState === 'unplanned' ? (
              <div className="border border-gray-200 dark:border-gray-800 flex flex-col h-full bg-white dark:bg-gray-900">
                <div className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Sat • Oct 17</span>
                  <span className="text-[9px] font-black tracking-widest uppercase text-gray-500">Unplanned</span>
                </div>
                <div className="flex-1 p-6">
                  <div onClick={() => { setSaturdayState('planned'); showToast('Saturday meal added!'); }} className="w-full h-full border-2 border-dashed border-gray-200 hover:border-orange-300 transition-colors flex flex-col items-center justify-center cursor-pointer group">
                    <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center mb-3 group-hover:border-orange-500 group-hover:bg-orange-50 transition-colors">
                      <Plus className="w-4 h-4 text-gray-400 group-hover:text-orange-500" />
                    </div>
                    <span className="text-[11px] font-black tracking-widest uppercase text-[#ff6b2b] group-hover:text-[#e85a1a]">Customize now</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 dark:border-gray-800 flex flex-col h-full bg-white dark:bg-gray-900">
                <div className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                  <span className="text-xs font-bold">Sat • Oct 17</span>
                  <span className="text-[9px] font-black tracking-widest uppercase text-gray-600 dark:text-gray-400">Planned</span>
                </div>
                <div className="h-40 w-full overflow-hidden p-4">
                  <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover rounded shadow-sm" alt="Palak Paneer" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-black text-gray-900 mb-2">Palak Paneer</h3>
                  <p className="text-xs text-gray-500 mb-8 leading-relaxed">Fresh spinach gravy with artisan paneer cubes.</p>
                  <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-4">
                    <button className="text-xs font-bold text-[#ff6b2b] hover:text-[#e85a1a]">Edit choices</button>
                    <button onClick={() => { setSaturdayState('unplanned'); showToast('Saturday cleared!'); }} className="text-xs font-bold text-[#d93838] hover:text-red-700">Clear day</button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Area (Sidebar) - Takes up 1 column */}
          <div className="space-y-6">
            
            {/* Nutrition Snapshot */}
            <div className="border border-gray-200 dark:border-gray-800 bg-[#faf9f8] dark:bg-gray-800/50 p-6 transition-colors">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-6">Nutrition Snapshot</h3>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-gray-700 dark:text-gray-300">Daily Calories</span>
                    <span className="text-[#ff6b2b]">1,850 Kcal</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#ff6b2b]" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-gray-700">Protein</span>
                    <span className="text-green-600">65g</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-gray-700">Healthy Fats</span>
                    <span className="text-[#f59e0b]">42g</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#f59e0b]" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-gray-700">Carbs</span>
                    <span className="text-gray-500">210g</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-500" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Costing */}
            <div className="border border-gray-200 dark:border-gray-800 transition-colors">
              <div className="bg-[#1c1c1c] dark:bg-[#000000] text-white text-[10px] font-black tracking-widest uppercase p-4">
                Weekly Costing
              </div>
              <div className="p-5">
                <ul className="space-y-4 text-xs font-medium text-gray-600 dark:text-gray-400">
                  <li className="flex justify-between">
                    <span>Mon - Kitchen Sector 5</span>
                    <span className="font-bold text-gray-900 dark:text-white">180</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Tue - Kitchen Sector 5</span>
                    <span className="font-bold text-gray-900 dark:text-white">180</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Wed - Today's Special</span>
                    <span className="font-bold text-gray-900 dark:text-white">210</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Thu - Customized</span>
                    <span className="font-bold text-gray-900 dark:text-white">195</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Fri - Skipped</span>
                    <span className="font-bold text-[#d93838]">₹0</span>
                  </li>
                </ul>

                <div className="mt-6 pt-5 border-t border-dashed border-gray-300 dark:border-gray-700 flex justify-between items-center">
                  <span className="text-sm font-black text-gray-900 dark:text-white">Total</span>
                  <span className="text-xl font-black text-[#ff6b2b]">765</span>
                </div>
              </div>
            </div>

          </div>

        </div>

          </div>
        </main>

      </div>
    </div>
  );
};

export default MealPlanPage;
