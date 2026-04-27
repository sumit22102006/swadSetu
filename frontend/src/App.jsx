import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import SupportPage from './pages/SupportPage'
import ProfilePage from './pages/ProfilePage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/meal-plans" element={<div className="flex items-center justify-center h-screen">Meal Plans Page (Coming Soon)</div>} />
        <Route path="/deliveries" element={<div className="flex items-center justify-center h-screen">Deliveries Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  )
}


export default App

