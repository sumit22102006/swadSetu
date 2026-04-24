import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import FeaturedKitchens from '../components/landing/FeaturedKitchens';
import ZeroWaste from '../components/landing/ZeroWaste';
import CTABanner from '../components/landing/CTABanner';
import Footer from '../components/landing/Footer';

const Landing = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <FeaturedKitchens />
      <ZeroWaste />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Landing;
