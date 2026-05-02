import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Info, CheckCircle, Leaf, Landmark, Activity, Flame, Monitor, 
  Plus, X, Bell, User, HandPlatter, Camera, Edit3, Loader, Drumstick
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import { setCredentials } from '../store/slices/authSlice';
import { setLoading } from '../store/slices/uiSlice';
import { setProfile } from '../store/slices/userSlice';
import api from '../services/api';

const ProfilePage = () => {
  const dispatch = useDispatch();
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
  
  const navigate = useNavigate();

  // Preferences state
  const [selectedDiet, setSelectedDiet] = useState('Pure veg');
  const [spiciness, setSpiciness] = useState('Medium');
  const [oilLevel, setOilLevel] = useState(50);
  const [tiffinTime, setTiffinTime] = useState('11am-1pm');
  const [avoidItems, setAvoidItems] = useState(['Peanuts', 'Dairy', 'Shellfish', 'Gluten', 'Mustard', 'Sesame']);

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
    } catch (error) {
      console.error('Image upload failed', error);
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
    } catch (error) {
      console.error('Profile update failed', error);
    }
  };

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

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]"><Loader className="w-8 h-8 text-orange-500 animate-spin" /></div>;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white dark:bg-[#0f0f0f] border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex justify-between items-center transition-colors">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">SwadSetu<span className="text-orange-500">.</span></Link>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link>
          <Link to="/menu" className="hover:text-gray-900 dark:hover:text-white transition-colors">Menu</Link>
          <Link to="/dashboard" className="hover:text-gray-900 dark:hover:text-white transition-colors">Dashboard</Link>
          <Link to="/profile" className="text-gray-900 dark:text-white border-b-2 border-orange-500 pb-1">Profile</Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-orange-700 transition-colors">Go Premium</button>
          <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white" />
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white overflow-hidden cursor-pointer">
            {user?.profileImage ? (
              <img src={`/api${user.profileImage}`} alt="Profile" className="w-full h-full object-cover" onError={(e) => e.target.src = user.profileImage} />
            ) : (
              <User className="w-5 h-5" />
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 bg-white dark:bg-gray-950 w-full p-6 md:p-12 shadow-inner transition-colors duration-300">
        <div className="w-full mx-auto max-w-[1600px]">
          
          {/* Personal Information Section */}
          <div className="bg-orange-50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/10 rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/40 dark:bg-orange-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            
            <div className="relative z-10 w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
              {user?.profileImage ? (
                <img src={`/api${user.profileImage}`} alt={user.name} className="w-full h-full object-cover" onError={(e) => e.target.src = user.profileImage} />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>
            
            <div className="relative z-10 flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{user?.email}</p>
              {user?.phone && <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">{user.phone}</p>}
            </div>
            
            <button 
              onClick={() => setIsEditing(true)}
              className="relative z-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          </div>

          {/* Edit Profile Modal */}
          {isEditing && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                  <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={submitProfileHandler} className="space-y-5">
                  <div className="flex justify-center mb-6">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden transition-colors">
                        {imagePreview ? (
                          <img src={imagePreview.startsWith('http') ? imagePreview : `/api${imagePreview}`} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.src = imagePreview} />
                        ) : (
                          <User className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <label className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                        {uploadingImage ? (
                          <Loader className="w-6 h-6 animate-spin mb-1" />
                        ) : (
                          <>
                            <Camera className="w-6 h-6 mb-1" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Change</span>
                          </>
                        )}
                        <input type="file" onChange={uploadFileHandler} className="hidden" accept="image/*" />
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Full Name</label>
                      <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:border-orange-500 outline-none bg-white dark:bg-gray-800 dark:text-white transition-colors" required />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Email</label>
                      <input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:border-orange-500 outline-none bg-white dark:bg-gray-800 dark:text-white transition-colors" required />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Phone Number</label>
                      <input type="tel" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="w-full p-2.5 border border-gray-200 dark:border-gray-800 rounded-lg text-sm focus:border-orange-500 outline-none bg-white dark:bg-gray-800 dark:text-white transition-colors" />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-8">
                    <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-2.5 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 py-2.5 bg-orange-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-orange-700 transition-colors">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Preferences Header */}
          <div className="flex justify-between items-start mb-6 border-t border-gray-100 dark:border-gray-800 pt-10 transition-colors">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dietary Preferences</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">These global settings apply to all your delivery centers automatically.</p>
            </div>
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-500/10 px-3 py-1.5 rounded-full border border-green-100 dark:border-green-500/20 transition-colors">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 dark:text-green-400 text-xs font-semibold">All centers synced</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: What do you eat? */}
            <div className="border border-gray-100 rounded-xl p-6 bg-gray-50/50">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">What do you eat?</h2>
                  <p className="text-gray-500 text-xs">Applied to all centers</p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-md">{selectedDiet} selected</span>
              </div>

              <div className="space-y-3">
                {diets.map((diet) => (
                  <div 
                    key={diet.id}
                    onClick={() => setSelectedDiet(diet.id)}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedDiet === diet.id 
                      ? 'bg-white dark:bg-gray-900 border-orange-500 shadow-sm' 
                      : 'bg-white/50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${selectedDiet === diet.id ? 'bg-orange-50 dark:bg-orange-500/10' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {diet.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{diet.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{diet.desc}</p>
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
              <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-6 bg-gray-50/50 dark:bg-gray-900/30 transition-colors">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How spicy do you like it?</h2>
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

          <div className="mt-10 flex items-center justify-end gap-4">
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
