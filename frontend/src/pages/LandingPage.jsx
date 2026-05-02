import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import FeaturedKitchens from '../components/FeaturedKitchens';
import ZeroWaste from '../components/ZeroWaste';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="home-page">
      <SEO 
        title="Artisan Tiffin Service" 
        description="Discover healthy, home-cooked meals from local kitchen artisans. SwadSetu connects you with authentic flavors and zero-waste tiffin deliveries."
        url="/"
      />
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedKitchens />
      <ZeroWaste />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
