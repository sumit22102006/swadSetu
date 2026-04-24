import React from 'react';
import { LayoutDashboard, Utensils, Truck, Settings, LifeBuoy } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
    { name: 'Meal Plans', icon: <Utensils size={18} />, path: '/meal-plans' },
    { name: 'Deliveries', icon: <Truck size={18} />, path: '/deliveries' },
    { name: 'Preferences', icon: <Settings size={18} />, path: '/preferences' },
    { name: 'Support', icon: <LifeBuoy size={18} />, path: '/support' },
  ];

  return (
    <aside className="w-64 bg-[#F8F8F8] border-r border-border h-[calc(100vh-64px)] p-8 flex flex-col">
      <div className="mb-10">
        <div className="text-[10px] uppercase font-bold text-text-muted tracking-widest mb-1">Navigation</div>
        <div className="text-xs text-text-muted">Manage your meals</div>
      </div>
      
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-md transition-all relative ${
                isActive 
                  ? 'text-primary font-semibold' 
                  : 'text-text-muted hover:text-text-dark'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {item.icon}
                <span className="text-sm">{item.name}</span>
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
