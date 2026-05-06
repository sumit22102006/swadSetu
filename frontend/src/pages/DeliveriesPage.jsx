import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { API_URL } from '../services/api';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Package, 
  Phone, 
  Star, 
  ChevronRight,
  User,
  MoreVertical,
  Navigation,
  X,
  Maximize2,
  LocateFixed
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet';
import { Search, Loader, ArrowLeft } from 'lucide-react';
import { addAddress, setCurrentAddress } from '../store/slices/userSlice';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ThemeToggle from '../components/ThemeToggle';
import SEO from '../components/SEO';

// Fix for Leaflet default icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons
const userIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #121212; width: 32px; height: 32px; border-radius: 50%; display: flex; items-center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const deliveryIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: #ea580c; width: 40px; height: 40px; border-radius: 50%; display: flex; items-center; justify-content: center; border: 3px solid white; box-shadow: 0 10px 15px -3px rgb(234 88 12 / 0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polyline points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

// Component to handle map view updates
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Component to handle map clicks for address picking
const LocationPicker = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const DeliveriesPage = () => {
  const dispatch = useDispatch();
  const { addresses, currentAddress: reduxCurrentAddress } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.auth);
  
  const [activeTab, setActiveTab] = useState('all');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Use redux currentAddress if available, otherwise first address as fallback
  const currentAddress = reduxCurrentAddress || addresses[0];
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: '', address: '' });
  const [mapPickerPos, setMapPickerPos] = useState([12.9716, 77.5946]);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLocating, setIsLocating] = useState(false);
  const debounceTimer = useRef(null);
  
  // Simulation State
  const [userPos] = useState([12.9716, 77.5946]); // Bangalore Central
  const [deliveryPos, setDeliveryPos] = useState([12.9516, 77.5746]); // Starting point
  const [distance, setDistance] = useState(2.4);
  const [eta, setEta] = useState(12);

  const deliveryHistory = [
    { id: 'ORD-8291', meal: 'Butter Chicken & Naan', date: 'Yesterday', status: 'Delivered', rating: 5, kitchen: 'Annapurna Kitchen' },
    { id: 'ORD-8275', meal: 'Paneer Pulao & Raita', date: '2 days ago', status: 'Delivered', rating: 4, kitchen: 'Royal Tiffins' },
    { id: 'ORD-8192', meal: 'Dal Tadka & Jeera Rice', date: '3 days ago', status: 'Delivered', rating: 5, kitchen: 'Annapurna Kitchen' },
    { id: 'ORD-8154', meal: 'Chole Bhature', date: '4 days ago', status: 'Delivered', rating: 5, kitchen: 'Satvic Delights' },
    { id: 'ORD-8091', meal: 'Veg Biryani', date: '5 days ago', status: 'Delivered', rating: 4, kitchen: 'Konkan Coast' },
  ];

  const steps = [
    { name: 'Ordered', time: '12:30 PM', completed: true, active: false },
    { name: 'Preparing', time: '12:45 PM', completed: true, active: false },
    { name: 'On the way', time: '1:10 PM', completed: false, active: true },
    { name: 'Delivered', time: 'ETA 1:30 PM', completed: false, active: false },
  ];

  // Simulation Logic
  useEffect(() => {
    let interval;
    if (isMapOpen) {
      interval = setInterval(() => {
        setDeliveryPos(prev => {
          const newLat = prev[0] + (userPos[0] - prev[0]) * 0.05;
          const newLng = prev[1] + (userPos[1] - prev[1]) * 0.05;
          
          // Calculate mocked distance
          const d = Math.sqrt(Math.pow(userPos[0] - newLat, 2) + Math.pow(userPos[1] - newLng, 2)) * 111; // approx km
          setDistance(parseFloat(d.toFixed(1)));
          setEta(Math.ceil(d * 5)); // 5 mins per km
          
          return [newLat, newLng];
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isMapOpen, userPos]);

  const handleLocationSelect = async (pos) => {
    setMapPickerPos(pos);
    setIsGeocoding(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos[0]}&lon=${pos[1]}`);
      const data = await response.json();
      if (data && data.display_name) {
        setNewAddress(prev => ({ ...prev, address: data.display_name }));
      }
    } catch (error) {
      console.error("Geocoding failed:", error);
    } finally {
      setIsGeocoding(false);
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setNewAddress(prev => ({ ...prev, address: value }));
    
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 500);
  };

  const handleSuggestionSelect = (suggestion) => {
    const { lat, lon, display_name } = suggestion;
    const pos = [parseFloat(lat), parseFloat(lon)];
    setMapPickerPos(pos);
    setNewAddress(prev => ({ ...prev, address: display_name }));
    setSuggestions([]);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleLocationSelect([latitude, longitude]);
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsLocating(false);
        // Fallback for demo purposes if browser blocks geo
        handleLocationSelect([12.9716, 77.5946]);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const saveNewAddress = () => {
    if (!newAddress.label || !newAddress.address) return;
    
    const newAddrObj = {
      id: Date.now(),
      label: newAddress.label,
      address: newAddress.address
    };
    
    dispatch(addAddress(newAddrObj));
    setIsAddingNewAddress(false);
    setNewAddress({ label: '', address: '' });
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <SEO title="Track Deliveries" url="/deliveries" />
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
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

        {/* Main Content */}
        <main className="p-4 sm:p-8 lg:p-12 max-w-6xl w-full mx-auto">
          <div className="mb-12">
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight transition-colors">Deliveries</h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium transition-colors">Track your active meals and view order history.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            {/* Left Column: Active Tracking */}
            <div className="lg:col-span-2 space-y-8">
              {/* Active Delivery Card */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors">
                <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1 block">Active Delivery</span>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white transition-colors">Paneer Lababdar & Roti</h2>
                  </div>
                  <div className="bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors">
                    Out for Delivery
                  </div>
                </div>

                <div className="p-8">
                  {/* Tracking Stepper */}
                  <div className="relative flex justify-between mb-12">
                    {/* Progress Line */}
                    <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-800">
                      <div className="h-full bg-orange-500 w-[70%] transition-all duration-1000"></div>
                    </div>

                    {steps.map((step, idx) => (
                      <div key={idx} className="relative flex flex-col items-center group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 relative z-10 ${
                          step.completed 
                          ? 'bg-orange-500 border-white dark:border-gray-900 text-white shadow-lg shadow-orange-200 dark:shadow-none' 
                          : step.active 
                            ? 'bg-white dark:bg-gray-900 border-orange-500 text-orange-500 shadow-lg animate-pulse'
                            : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-300'
                        }`}>
                          {step.completed ? <CheckCircle2 className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                        </div>
                        <div className="mt-4 text-center">
                          <p className={`text-[10px] font-black uppercase tracking-widest transition-colors ${step.active || step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                            {step.name}
                          </p>
                          <p className="text-[10px] font-bold text-gray-400 mt-0.5">{step.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Partner Info */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white dark:bg-gray-900 rounded-full border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-400 shadow-sm overflow-hidden transition-colors">
                        <img 
                          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" 
                          alt="Rohan" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">Your Delivery Partner</p>
                        <p className="font-black text-gray-900 dark:text-white">Rohan Sharma</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                          <span className="text-[10px] font-bold text-gray-600">4.9 (2,400+ deliveries)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                      <button className="flex-1 md:flex-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:border-orange-500 hover:text-orange-600 transition-all">
                        <Phone className="w-3.5 h-3.5" /> Call Rohan
                      </button>
                      <button 
                        onClick={() => setIsMapOpen(true)}
                        className="flex-1 md:flex-none bg-orange-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-200 dark:shadow-none hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-3.5 h-3.5" /> Live Map
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery History Section */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em]">Order History</h3>
                  <div className="flex bg-gray-50 p-1 rounded-lg">
                    {['all', 'weekly', 'monthly'].map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
                          activeTab === tab 
                          ? 'bg-white text-orange-600 shadow-sm' 
                          : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {deliveryHistory.map((order, idx) => (
                    <div key={idx} className="group p-5 rounded-2xl border border-gray-50 hover:border-orange-100 hover:bg-orange-50/30 transition-all flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-orange-500 transition-colors">
                          <Package className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-black text-gray-900">{order.meal}</h4>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span className="text-[10px] font-bold text-gray-400">{order.id}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tighter transition-colors">{order.kitchen}</span>
                            <span className="text-[10px] font-bold text-gray-300 dark:text-gray-700">•</span>
                            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tighter transition-colors">{order.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                          <div className="flex gap-0.5 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-2.5 h-2.5 ${i < order.rating ? 'text-orange-500 fill-orange-500' : 'text-gray-200 dark:text-gray-700'}`} />
                            ))}
                          </div>
                          <span className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest">Rated {order.rating}.0</span>
                        </div>
                        <button className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-white">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-8 py-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-orange-200 dark:hover:border-orange-500/50 hover:text-orange-500 hover:bg-orange-50/50 dark:hover:bg-orange-500/10 transition-all">
                  Load More Orders
                </button>
              </div>
            </div>

            {/* Right Column: Info Cards */}
            <div className="space-y-8">
              {/* Delivery Address Card */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-orange-500/5 dark:shadow-none relative overflow-hidden group transition-colors">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] mb-4">Delivery Address</h3>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg shrink-0">
                        <MapPin className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 dark:text-white">{currentAddress.label}</p>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed mt-1">
                          {currentAddress.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => setIsAddressModalOpen(true)}
                  className="w-full py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
                >
                  Change Address
                </button>
              </div>

              {/* Preferences Summary */}
              <div className="bg-[#121212] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl"></div>
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-8">Delivery Preferences</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-bold text-gray-300 dark:text-gray-400 transition-colors">Preferred Time</span>
                    </div>
                    <span className="text-xs font-black text-white">1:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-bold text-gray-300 dark:text-gray-400 transition-colors">Drop-off Mode</span>
                    </div>
                    <span className="text-xs font-black text-white">At Door</span>
                  </div>
                  <div className="pt-6 border-t border-gray-800 flex justify-between items-center">
                    <Link to="/profile" className="text-orange-500 text-[10px] font-black uppercase tracking-widest hover:translate-x-1 transition-all flex items-center gap-2">
                      Edit Settings <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-orange-500 rounded-3xl p-8 text-white shadow-lg shadow-orange-200">
                <h3 className="text-xl font-black mb-2">Need help with an order?</h3>
                <p className="text-sm opacity-90 leading-relaxed mb-6 font-medium">
                  Our delivery support team is available 24/7 for any issues.
                </p>
                <Link to="/support" className="inline-block bg-white dark:bg-gray-950 text-orange-600 dark:text-orange-500 font-black text-[10px] uppercase tracking-widest py-3 px-8 rounded-xl hover:bg-orange-50 dark:hover:bg-gray-900 transition-all">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 md:mt-32 pt-8 md:pt-12 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-gray-400 text-[10px] font-bold pb-10 md:pb-20 transition-colors">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-10 text-center sm:text-left">
              <span className="text-gray-900 dark:text-white text-sm font-black tracking-tight">swadSetu<span className="text-orange-500">.</span></span>
              <span className="font-medium text-gray-400 dark:text-gray-500">© 2024 SwadSetu. Built for honesty and clarity.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 uppercase tracking-widest">
              <Link to="/support" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Help Center</Link>
              <Link to="/privacy" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Contact Us</Link>
            </div>
          </footer>
        </main>
      </div>

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800 transition-colors">
            {!isAddingNewAddress ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Select Address</h2>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Where should we deliver?</p>
                  </div>
                  <button 
                    onClick={() => setIsAddressModalOpen(false)}
                    className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 mb-8">
                  {addresses.map((addr) => (
                    <div 
                      key={addr.id}
                      onClick={() => dispatch(setCurrentAddress(addr))}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer group ${
                        currentAddress.id === addr.id 
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-500/5' 
                        : 'border-gray-50 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 bg-white dark:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${currentAddress.id === addr.id ? 'bg-orange-500 text-white' : 'bg-gray-50 dark:bg-gray-900 text-gray-400'}`}>
                            <MapPin className="w-4 h-4" />
                          </div>
                          <span className={`text-sm font-black ${currentAddress.id === addr.id ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{addr.label}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          currentAddress.id === addr.id ? 'border-orange-500 bg-orange-500' : 'border-gray-200 dark:border-gray-700'
                        }`}>
                          {currentAddress.id === addr.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                      </div>
                      <p className={`text-[10px] font-medium leading-relaxed ${currentAddress.id === addr.id ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>
                        {addr.address}
                      </p>
                    </div>
                  ))}
                  
                  <button 
                    onClick={() => setIsAddingNewAddress(true)}
                    className="w-full p-5 rounded-2xl border-2 border-dashed border-gray-100 dark:border-gray-800 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:border-orange-200 dark:hover:border-orange-500/30 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    + Add New Address
                  </button>
                </div>

                <button 
                  onClick={() => setIsAddressModalOpen(false)}
                  className="w-full py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-xl shadow-gray-200 dark:shadow-none"
                >
                  Confirm Selection
                </button>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsAddingNewAddress(false)}
                      className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Add New</h2>
                      <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Manual or Map pick</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setIsAddingNewAddress(false);
                      setIsAddressModalOpen(false);
                    }}
                    className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Address Label</label>
                    <div className="flex gap-2">
                      {['Home', 'Office', 'Other'].map(l => (
                        <button
                          key={l}
                          onClick={() => setNewAddress(prev => ({ ...prev, label: l }))}
                          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                            newAddress.label === l ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-50 text-gray-400 hover:border-gray-100'
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Full Address</label>
                      <button 
                        onClick={useCurrentLocation}
                        disabled={isLocating}
                        className="flex items-center gap-1.5 text-[9px] font-black text-orange-500 uppercase tracking-widest hover:text-orange-600 transition-colors disabled:opacity-50"
                      >
                        {isLocating ? <Loader className="w-3 h-3 animate-spin" /> : <Navigation className="w-3 h-3" />}
                        {isLocating ? 'Locating...' : 'Use Current Location'}
                      </button>
                    </div>
                    <div className="relative">
                      <textarea
                        value={newAddress.address}
                        onChange={handleAddressChange}
                        placeholder="Enter full address manually or pick from map..."
                        className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-800 rounded-2xl text-sm focus:border-orange-500 outline-none transition-all resize-none h-32 dark:text-white"
                      />
                      {isGeocoding && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center rounded-2xl">
                          <Loader className="w-6 h-6 text-orange-500 animate-spin" />
                        </div>
                      )}

                      {/* Suggestions Dropdown */}
                      {suggestions.length > 0 && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[110] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                          {suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSuggestionSelect(suggestion)}
                              className="w-full text-left p-4 hover:bg-orange-50 transition-colors flex items-start gap-3 border-b border-gray-50 last:border-0"
                            >
                              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                              <span className="text-xs font-medium text-gray-600 line-clamp-2">{suggestion.display_name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Or pick on map</label>
                    <div className="h-48 rounded-2xl overflow-hidden border-2 border-gray-50 relative group">
                      <MapContainer 
                        center={mapPickerPos} 
                        zoom={15} 
                        style={{ height: '100%', width: '100%' }}
                        zoomControl={false}
                      >
                        <TileLayer
                          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        />
                        <Marker position={mapPickerPos} />
                        <LocationPicker onLocationSelect={handleLocationSelect} />
                        <ChangeView center={mapPickerPos} zoom={15} />
                      </MapContainer>
                      <div className="absolute inset-0 pointer-events-none border-4 border-orange-500/20 rounded-2xl z-[400] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[400] bg-gray-900/80 backdrop-blur-md text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                        Click on map to pick
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={saveNewAddress}
                  disabled={!newAddress.label || !newAddress.address}
                  className="w-full py-4 bg-orange-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save & Select Address
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-0 md:p-10 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-900 w-full h-full md:rounded-3xl shadow-2xl relative overflow-hidden flex flex-col transition-colors">
            {/* Map Header */}
            <div className="bg-[#121212] dark:bg-[#000000] text-white px-8 py-6 flex justify-between items-center relative z-10 shadow-lg transition-colors">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsMapOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-xl font-black tracking-tight">Live Delivery Tracking</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ORDER #ORD-8302 • ACTIVE NOW</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-10">
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Estimated Arrival</p>
                  <p className="text-2xl font-black text-orange-500">{eta} MINS</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Distance Left</p>
                  <p className="text-2xl font-black text-white">{distance} KM</p>
                </div>
              </div>
            </div>

            {/* The Map */}
            <div className="flex-1 relative">
              <MapContainer 
                center={userPos} 
                zoom={14} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                
                <Marker position={userPos} icon={userIcon}>
                  <Popup>
                    <div className="font-bold">Your Home</div>
                  </Popup>
                </Marker>

                <Marker position={deliveryPos} icon={deliveryIcon}>
                  <Popup>
                    <div className="font-bold">Rohan (Delivery Partner)</div>
                  </Popup>
                </Marker>

                <Polyline 
                  positions={[userPos, deliveryPos]} 
                  color="#ea580c" 
                  weight={3} 
                  dashArray="10, 10"
                  opacity={0.6}
                />

                <ChangeView center={deliveryPos} zoom={15} />
              </MapContainer>

              {/* Floating Map Controls */}
              <div className="absolute bottom-8 right-8 z-[400] flex flex-col gap-4">
                <button 
                  onClick={() => setDeliveryPos([12.9516, 77.5746])}
                  className="bg-white dark:bg-gray-800 w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center text-gray-900 dark:text-white hover:bg-orange-500 hover:text-white transition-all group"
                >
                  <LocateFixed className="w-6 h-6 group-hover:rotate-45 transition-transform" />
                </button>
                <button className="bg-white dark:bg-gray-800 w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center text-gray-900 dark:text-white hover:bg-orange-500 hover:text-white transition-all">
                  <Maximize2 className="w-6 h-6" />
                </button>
              </div>

              {/* Delivery Partner Overlay */}
              <div className="absolute bottom-8 left-8 z-[400] bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl dark:shadow-none border border-gray-100 dark:border-gray-800 flex items-center gap-6 max-w-sm transition-colors">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150" 
                    alt="Rohan" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-black text-gray-900 dark:text-white">Rohan Sharma</h4>
                    <span className="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Pro</span>
                  </div>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-tight transition-colors">On a White Scooter • KA 01 JS 2931</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-100 transition-all">Call</button>
                    <button className="flex-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">Message</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveriesPage;
