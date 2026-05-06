import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThemeToggle from './ThemeToggle';
import { API_URL } from '../services/api';
import { X, Menu } from 'lucide-react';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 py-5 transition-all duration-300">
      <div className="container flex justify-between items-center">
        <div className="text-2xl font-bold text-white dark:text-gray-100 transition-colors">
          <Link to="/" className="hover:text-primary transition-all">swadSetu</Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8">
          <li><Link to="/menu" className="text-primary text-sm font-medium">Menu</Link></li>
          <li><Link to="/story" className="text-white dark:text-gray-300 opacity-80 hover:opacity-100 hover:text-primary transition-all text-sm font-medium">Our Story</Link></li>
          <li><Link to="/subscription" className="text-white dark:text-gray-300 opacity-80 hover:opacity-100 hover:text-primary transition-all text-sm font-medium">Subscription</Link></li>
          <li><Link to="/support" className="text-white dark:text-gray-300 opacity-80 hover:opacity-100 hover:text-primary transition-all text-sm font-medium">Support</Link></li>
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">
          <ThemeToggle />
          <Link to="/cart" className="text-white dark:text-gray-100 hover:text-primary transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </Link>
          <Link to={userInfo ? "/dashboard" : "/login"} className="text-white dark:text-gray-100 hover:text-primary transition-all overflow-hidden rounded-full w-6 h-6 flex items-center justify-center border border-white/20">
            {userInfo?.profileImage ? (
              <img src={`${API_URL}/api${userInfo.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
          </Link>
          <Link to={userInfo ? "/dashboard" : "/signup"} className="btn btn-primary">{userInfo ? 'Dashboard' : 'Order Now'}</Link>
        </div>

        {/* Mobile: Theme + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-1"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-t border-white/10 py-6 px-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link to="/menu" onClick={() => setIsMenuOpen(false)} className="text-primary text-sm font-semibold">Menu</Link>
          <Link to="/story" onClick={() => setIsMenuOpen(false)} className="text-white/80 hover:text-primary text-sm font-medium transition-colors">Our Story</Link>
          <Link to="/subscription" onClick={() => setIsMenuOpen(false)} className="text-white/80 hover:text-primary text-sm font-medium transition-colors">Subscription</Link>
          <Link to="/support" onClick={() => setIsMenuOpen(false)} className="text-white/80 hover:text-primary text-sm font-medium transition-colors">Support</Link>
          <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
            <Link to={userInfo ? "/dashboard" : "/login"} onClick={() => setIsMenuOpen(false)} className="text-white/80 hover:text-primary text-sm font-medium transition-colors">
              {userInfo ? 'Dashboard' : 'Log In'}
            </Link>
            <Link to={userInfo ? "/dashboard" : "/signup"} onClick={() => setIsMenuOpen(false)} className="btn btn-primary text-center w-full">
              {userInfo ? 'Go to Dashboard' : 'Order Now'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
