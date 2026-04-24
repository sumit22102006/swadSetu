import React from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import Sidebar from '../components/dashboard/Sidebar';
import { Star, MessageSquare, History } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-10">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-text-dark mb-1">Namaste, Arjun</h1>
            <p className="text-sm text-text-muted">Today's delivery: 1:00 PM from Annapurna Kitchen</p>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="p-6 bg-white border border-border rounded-sm">
              <div className="text-[10px] uppercase font-bold text-text-muted tracking-widest mb-2">Loyalty</div>
              <div className="text-xl font-bold">12 Days Active</div>
            </div>
            <div className="p-6 bg-white border border-border rounded-sm">
              <div className="text-[10px] uppercase font-bold text-text-muted tracking-widest mb-2">Flexibility</div>
              <div className="text-xl font-bold">2 Swaps Left</div>
            </div>
            <div className="p-6 bg-white border border-border rounded-sm">
              <div className="text-[10px] uppercase font-bold text-text-muted tracking-widest mb-2">Feedback</div>
              <div className="text-xl font-bold">4.8 Avg Rating</div>
            </div>
          </div>
          
          {/* Today's Meal Card */}
          <div className="bg-white border border-border rounded-sm overflow-hidden flex flex-col md:flex-row mb-10">
            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=1200" 
                alt="Today's Meal" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-accent-green text-white text-[10px] font-bold px-2 py-1 rounded">
                VEG
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4">Today's Special Thali</h2>
              <p className="text-sm text-text-muted leading-relaxed mb-8">
                Slow-cooked yellow dal tadka, jeera rice, aloo gobhi matar, and two handmade whole wheat rotis.
              </p>
              <div className="flex gap-3">
                <span className="text-[10px] font-medium border border-border px-3 py-1.5 rounded text-text-muted">High Protein</span>
                <span className="text-[10px] font-medium border border-border px-3 py-1.5 rounded text-text-muted">Mild Spicy</span>
              </div>
            </div>
          </div>
          
          {/* Bottom Row Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <div className="bg-primary p-8 rounded-sm text-white relative">
              <h3 className="text-xl font-bold mb-3">Share the taste, earn rewards</h3>
              <p className="text-sm opacity-90 mb-6 max-w-[80%]">
                Refer a friend and get 3 free premium meal swaps added to your account instantly.
              </p>
              <button className="bg-white text-primary px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider">
                Refer Now
              </button>
            </div>
            
            <div className="bg-[#1C1C1C] p-8 rounded-sm text-white">
              <div className="text-[10px] uppercase font-bold text-white/40 tracking-widest mb-6">Recent Activity</div>
              <div className="flex gap-4 items-start mb-10">
                <Star size={16} fill="#FF7B00" className="text-primary mt-1" />
                <div>
                  <h4 className="text-sm font-bold mb-1">Your last meal was rated 5/5</h4>
                  <p className="text-xs text-white/60">Thank you for your feedback on the Paneer Lababdar.</p>
                </div>
              </div>
              <a href="#" className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:underline">
                View History
              </a>
            </div>
          </div>
          
          {/* Dashboard Mini Footer */}
          <footer className="pt-10 border-t border-border flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <span className="text-xs font-bold">swadSetu</span>
              <span className="text-[10px] text-text-muted">© 2024 swadSetu. Built for honesty and clarity.</span>
            </div>
            <div className="flex gap-6 text-[10px] text-text-muted">
              <a href="#" className="hover:text-text-dark">Help Center</a>
              <a href="#" className="hover:text-text-dark">Privacy Policy</a>
              <a href="#" className="hover:text-text-dark">Contact Us</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
