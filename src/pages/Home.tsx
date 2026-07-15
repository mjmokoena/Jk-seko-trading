import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import PerformanceCounters from '../components/PerformanceCounters';
import AboutUs from '../components/AboutUs';
import ServicesGrid from '../components/ServicesGrid';
import ProjectGallery from '../components/ProjectGallery';
import Testimonials from '../components/Testimonials';
import TestimonialsSlider from '../components/TestimonialsSlider';
import BlogSection from '../components/BlogSection';
import LeadFunnelForm from '../components/LeadFunnelForm';

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <PerformanceCounters />
      <AboutUs />
      <ServicesGrid />
      <ProjectGallery />
      <Testimonials />
      <TestimonialsSlider />
      <BlogSection />
      <LeadFunnelForm />
    </>
  );
}
