import React, { useState } from 'react';
import { 
  Search, 
  MessageSquare, 
  Phone, 
  Mail, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft,
  Package,
  Calendar,
  CreditCard,
  Truck,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "Can I pause my tiffin plan for a few days?",
      answer: "Yes, you can pause your plan by 9 PM the previous night. Navigate to 'Dashboard', select 'Skip Today's Meal', or manage your schedule in 'Deliveries'. Your plan duration will be extended automatically."
    },
    {
      question: "The meal delivered was cold. What should I do?",
      answer: "We're sorry to hear that. Our tiffins are designed to retain heat, but if your meal arrives cold, please contact our support immediately. You can use the 'Live Chat' feature for a quick resolution."
    },
    {
      question: "How do I change my tiffin center/kitchen?",
      answer: "You can change your kitchen from the 'Profile' page. Changes made before the billing cycle will take effect from the next month."
    },
    {
      question: "What hygiene standards do your centers follow?",
      answer: "All our kitchen artisans are FSSAI certified and undergo regular health checkups. We maintain strict hygiene protocols in all our tiffin centers."
    },
    {
      question: "My tiffin hasn't arrived by 1 PM. Who to contact?",
      answer: "If your delivery is delayed, check the live status in the dashboard. If it's past 1:15 PM, please use the 'Call Us' feature or 'Live Chat' to reach your delivery partner directly."
    }
  ];

  const topics = [
    { title: "Order Tracking & History", sub: "Active orders, history, and receipts", icon: Package, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Tiffin Centers", sub: "Searching kitchens and hygiene reports", icon: ShieldCheck, color: "text-green-500", bg: "bg-green-50" },
    { title: "Subscription Plans", sub: "Renewals, upgrades, and cancellations", icon: Calendar, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Delivery Issues", sub: "Late deliveries, missing items, or packaging", icon: Truck, color: "text-red-500", bg: "bg-red-50" },
    { title: "Payments & Refunds", sub: "Wallet balance, payment failure, and refunds", icon: CreditCard, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Profile Settings", sub: "Edit info, update address, and preferences", icon: Settings, color: "text-orange-500", bg: "bg-orange-50" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 pb-12 transition-colors duration-300">
      {/* Header */}
      <header className="bg-[#121212] dark:bg-[#000000] text-white pt-8 pb-24 px-6 relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="max-w-6xl mx-auto flex justify-between items-center mb-16 relative z-10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-all">
              <ArrowLeft size={18} className="text-orange-500" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">Back to Home</span>
          </Link>
          <div className="text-2xl font-black tracking-tight">swadSetu<span className="text-orange-500">.</span></div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-full text-[10px] font-bold text-orange-400 uppercase tracking-widest cursor-pointer hover:bg-orange-500/20 transition-all">
              My Tickets
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">How can we help?</h1>
          <p className="text-sm md:text-base text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed font-medium">
            Search for articles or choose a topic below to get the help you need for your daily artisan tiffin service.
          </p>
          
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-0 bg-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <input 
              type="text" 
              placeholder="Search for 'delivery status', 'cancel meal', 'refund'..." 
              className="w-full py-5 pl-8 pr-36 rounded-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-2xl border-none outline-none text-sm placeholder:text-gray-400 relative z-10 font-medium transition-colors"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-orange-600 hover:bg-orange-700 text-white px-8 rounded-xl transition-all text-xs font-black uppercase tracking-widest relative z-20">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { icon: MessageSquare, title: "Live Chat", sub: "Available 8 AM - 9 PM daily for instant resolution.", color: "text-orange-600", bg: "bg-orange-50", action: "Chat Now" },
            { icon: Phone, title: "Call Us", sub: "Urgent delivery issue? Call our center direct line.", color: "text-green-600", bg: "bg-green-50", action: "Dial +1-800-SWAD" },
            { icon: Mail, title: "Send Email", sub: "For billing inquiries or plan changes anytime.", color: "text-blue-600", bg: "bg-blue-50", action: "Email Support" }
          ].map((card, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center group hover:-translate-y-1 transition-all">
              <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <card.icon size={28} />
              </div>
              <h3 className="font-black text-xl mb-3 text-gray-900 dark:text-white transition-colors">{card.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 font-medium leading-relaxed transition-colors">{card.sub}</p>
              <button className={`${card.color} text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all`}>
                {card.action} <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Browse by Topic */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-1 bg-orange-500 rounded-full"></div>
            <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white transition-colors">Browse by Topic</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-orange-200 hover:shadow-lg hover:shadow-gray-100 cursor-pointer transition-all group">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${topic.bg} ${topic.color}`}>
                    <topic.icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black mb-1 group-hover:text-orange-600 transition-colors">{topic.title}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{topic.sub}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </section>

        {/* FAQ & Form Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* FAQ Accordion */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black mb-10 tracking-tight flex items-center gap-3">
               <div className="w-2 h-8 bg-gray-900 rounded-full"></div>
               Common Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className={`bg-white dark:bg-gray-900 rounded-2xl border transition-all ${openFaq === i ? 'border-orange-500 shadow-lg shadow-orange-50 dark:shadow-none' : 'border-gray-100 dark:border-gray-800'}`}>
                  <button 
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50/50 dark:hover:bg-gray-800 rounded-2xl transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  >
                    <span className={`text-sm font-black tracking-tight ${openFaq === i ? 'text-orange-600' : 'text-gray-800 dark:text-white'}`}>
                      {faq.question}
                    </span>
                    {openFaq === i ? <ChevronUp size={20} className="text-orange-500" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-800 pt-5 font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl shadow-gray-200/50 dark:shadow-none overflow-hidden border border-gray-100 dark:border-gray-800 sticky top-24 transition-colors">
              <div className="bg-[#121212] dark:bg-[#000000] p-8 text-white relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl"></div>
                <h3 className="font-black text-xl mb-2 relative z-10">Submit a request</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest relative z-10">Response time: &lt; 2 hours</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Your Name</label>
                  <input type="text" placeholder="Arjun Kumar" className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm font-medium outline-none focus:border-orange-500 transition-colors dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Issue Type</label>
                  <div className="relative">
                    <select className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm font-medium outline-none focus:border-orange-500 appearance-none transition-colors dark:text-white">
                      <option>Select a category</option>
                      <option>Delivery Delay</option>
                      <option>Quality Issue</option>
                      <option>Payment Issue</option>
                      <option>Subscription Change</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Description</label>
                  <textarea 
                    placeholder="Tell us more about the issue..." 
                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm font-medium outline-none focus:border-orange-500 h-32 resize-none transition-colors dark:text-white"
                  ></textarea>
                </div>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white p-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-100 dark:shadow-none transition-all active:scale-[0.98]">
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <section className="bg-[#121212] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="flex items-center gap-5 relative z-10">
            <span className="font-black text-sm uppercase tracking-widest">System Status</span>
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-4 py-1.5 rounded-full">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-[10px] font-black uppercase tracking-widest">All systems healthy</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-8 relative z-10">
            {[
              { name: "Ordering", status: "Operational", color: "text-green-400" },
              { name: "Tracking", status: "Slight delay", color: "text-orange-400" },
              { name: "Payments", status: "Operational", color: "text-green-400" },
              { name: "Center switching", status: "Operational", color: "text-green-400" }
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{s.name}</span>
                <span className={`text-[10px] font-black ${s.color} uppercase tracking-widest`}>{s.status}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 mt-32 pt-12 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-400 text-[10px] font-bold pb-20">
        <div className="flex items-center gap-10">
          <span className="text-gray-900 dark:text-white text-sm font-black tracking-tight">swadSetu<span className="text-orange-500">.</span></span>
          <span className="font-medium text-gray-400 dark:text-gray-500">© 2024 SwadSetu. Built for honesty and clarity.</span>
        </div>
        <div className="flex gap-8 uppercase tracking-widest transition-colors">
          <Link to="/support" className="text-gray-900 dark:text-white transition-colors">Help Center</Link>
          <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact Us</Link>
          <Link to="/faq" className="hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</Link>
        </div>
      </footer>
    </div>
  );
};

export default SupportPage;
