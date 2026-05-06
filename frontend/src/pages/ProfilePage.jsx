import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  User, Camera, Edit3, Loader, X, Mail, Phone, Shield, ExternalLink, MapPin, LogOut
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import Sidebar from '../components/Sidebar';
import { setCredentials, logout } from '../store/slices/authSlice';
import { setLoading } from '../store/slices/uiSlice';
import { setProfile } from '../store/slices/userSlice';
import api, { API_URL } from '../services/api';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { profile: user } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.ui);
  
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit form state
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!userInfo || !userInfo.token) {
          navigate('/login');
          return;
        }

        dispatch(setLoading(true));
        const { data } = await api.get('/users/profile');
        
        dispatch(setProfile(data));
        setEditName(data.name);
        setEditEmail(data.email);
        setEditPhone(data.phone || '');
        setImagePreview(data.profileImage || '');
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProfile();
  }, [navigate, userInfo, dispatch]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploadingImage(true);

    try {
      const { data } = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setImagePreview(data.image);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Image upload failed', error);
      toast.error('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const submitProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/users/profile', {
        name: editName,
        email: editEmail,
        phone: editPhone,
        profileImage: imagePreview,
      });

      dispatch(setProfile(data));
      dispatch(setCredentials({ ...userInfo, ...data }));
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Profile update failed', error);
      toast.error(error.response?.data?.message || 'Profile update failed');
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Logged out successfully');
  };

  // Don't block full page on loading - just show spinner overlay

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <SEO title="My Profile" url="/profile" />
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#121212] dark:bg-[#000000] pl-16 xl:pl-8 pr-4 sm:pr-8 py-4 flex justify-between items-center sticky top-0 z-40 shadow-xl transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-lg sm:text-xl font-bold text-white tracking-tight">Your Profile</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <button
              onClick={logoutHandler}
              className="hidden sm:flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white overflow-hidden cursor-pointer">
              {user?.profileImage ? (
                <img src={`${API_URL}/api${user.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-8 xl:p-12 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Hero Profile Card */}
            <div className="bg-white dark:bg-[#121212] rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden transition-all duration-300">
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-[2rem] bg-gray-50 dark:bg-gray-800 border-4 border-white dark:border-gray-900 shadow-2xl flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
                    {user?.profileImage ? (
                      <img src={`${API_URL}/api${user.profileImage}`} alt={user.name} className="w-full h-full object-cover" onError={(e) => e.target.src = user.profileImage} />
                    ) : (
                      <User className="w-12 h-12 text-gray-300" />
                    )}
                  </div>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="absolute -bottom-2 -right-2 bg-orange-600 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg hover:bg-orange-700 transition-all active:scale-90"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex-1 text-center md:text-left pt-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{user?.name}</h1>
                    <span className="inline-flex bg-orange-500/10 text-orange-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest self-center md:self-auto border border-orange-500/20">Active Member</span>
                  </div>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-6">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm font-bold">{user?.email}</span>
                    </div>
                    {user?.phone && (
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm font-bold">{user.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-bold">Bangalore, IN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Security Card */}
              <div className="bg-white dark:bg-[#121212] rounded-[2rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Security</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</span>
                    <button className="text-[10px] font-black text-orange-600 uppercase tracking-widest hover:underline">Change</button>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Two-Factor Auth</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Disabled</span>
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div className="bg-white dark:bg-[#121212] rounded-[2rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Subscription</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Plan Type</span>
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Standard Monthly</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Next Billing</span>
                    <span className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest">May 24, 2024</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex-1 bg-[#121212] dark:bg-[#000000] rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 transition-colors shadow-2xl">
                <div>
                  <h3 className="text-xl font-black tracking-tight mb-1">Upgrade to Premium</h3>
                  <p className="text-gray-400 text-xs font-medium">Get unlimited meal swaps and priority support.</p>
                </div>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group">
                  Learn More <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <button 
                onClick={logoutHandler}
                className="bg-white dark:bg-gray-900 border border-red-100 dark:border-red-900/30 text-red-600 px-8 py-8 rounded-[2.5rem] text-[10px] font-black uppercase tracking-widest transition-all flex flex-col items-center justify-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/10 group shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LogOut className="w-5 h-5" />
                </div>
                Logout Account
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#121212] rounded-[3rem] w-full max-w-lg p-10 shadow-2xl relative overflow-hidden transition-colors">
            <div className="absolute top-0 left-0 w-full h-2 bg-orange-600"></div>
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Edit Profile</h2>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Update your personal details</p>
              </div>
              <button onClick={() => setIsEditing(false)} className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={submitProfileHandler} className="space-y-8">
              <div className="flex justify-center">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-[2rem] border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden transition-colors">
                    {imagePreview ? (
                      <img src={imagePreview.startsWith('http') ? imagePreview : `${API_URL}/api${imagePreview}`} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.src = imagePreview} />
                    ) : (
                      <User className="w-10 h-10 text-gray-300" />
                    )}
                  </div>
                  <label className="absolute inset-0 bg-black/60 rounded-[2rem] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                    {uploadingImage ? (
                      <Loader className="w-6 h-6 animate-spin mb-1" />
                    ) : (
                      <>
                        <Camera className="w-6 h-6 mb-1" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Upload</span>
                      </>
                    )}
                    <input type="file" onChange={uploadFileHandler} className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Full Name</label>
                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm font-bold text-gray-900 dark:text-white transition-all" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Email Address</label>
                  <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm font-bold text-gray-900 dark:text-white transition-all" placeholder="john@example.com" required />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                  <input type="tel" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm font-bold text-gray-900 dark:text-white transition-all" placeholder="+91 9876543210" />
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-4 rounded-2xl bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:bg-orange-700 transition-all">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
