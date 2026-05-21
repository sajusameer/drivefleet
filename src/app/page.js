import HeroSection from '@/components/HeroSection';
import SpecialOffers from '@/components/SpecialOffers';
import Testimonials from '@/components/Testimonials';
import React from 'react';

const page = () => {
  return (
 <main>
      <HeroSection />
      <SpecialOffers/>
      <Testimonials/>
    </main>
  );
};

export default page;