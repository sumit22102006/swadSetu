import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SupportPage from './pages/SupportPage'
import ProfilePage from './pages/ProfilePage'
import PreferencesPage from './pages/PreferencesPage'
import DashboardPage from './pages/DashboardPage'
import MealPlanPage from './pages/MealPlanPage'
import DeliveriesPage from './pages/DeliveriesPage'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

function App() {
  const { theme } = useSelector((state) => state.ui);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'dark' ? '#121212' : '#fff',
            color: theme === 'dark' ? '#fff' : '#121212',
            border: theme === 'dark' ? '1px solid #333' : '1px solid #f0f0f0',
            fontSize: '14px',
            fontWeight: '600',
            borderRadius: '12px',
            padding: '16px 24px',
          },
          success: {
            iconTheme: {
              primary: '#f97316',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/meal-plans" element={<MealPlanPage />} />
        <Route path="/deliveries" element={<DeliveriesPage />} />
      </Routes>
    </Router>
  )
}


export default App

