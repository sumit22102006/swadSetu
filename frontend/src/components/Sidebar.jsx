import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Truck, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
    { name: 'Meal Plans', icon: <UtensilsCrossed className="w-5 h-5" />, path: '/meal-plans' },
    { name: 'Deliveries', icon: <Truck className="w-5 h-5" />, path: '/deliveries' },
    { name: 'Preferences', icon: <Settings className="w-5 h-5" />, path: '/profile' },
    { name: 'Support', icon: <HelpCircle className="w-5 h-5" />, path: '/support' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100 min-h-screen p-6 flex flex-col">
      <div className="mb-10">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Navigation</h3>
        <p className="text-xs text-gray-500 font-medium -mt-3 mb-6">Manage your meals</p>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
                isActive 
                ? 'text-orange-500 bg-orange-50 font-bold' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 font-medium'
              }`}
            >
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-l-full"></div>
              )}
              <span className={isActive ? 'text-orange-500' : 'text-gray-400'}>
                {item.icon}
              </span>
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
