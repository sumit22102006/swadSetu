import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import SupportPage from './pages/SupportPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}


export default App

