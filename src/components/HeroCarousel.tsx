import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ChevronRight, MessageSquare } from 'lucide-react';

const slides = [
  {
    id: 1,
    headline: "Turnkey Civil Engineering & Commercial Construction.",
    subtext: "Delivering industrial-grade infrastructure with precision and uncompromising safety.",
    bgImage: "https://images.unsplash.com/photo-1541888086225-eb4520cc32e8?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    headline: "Rock Breaking, Blasting & Bulk Earthworks.",
    subtext: "Advanced excavation and rock removal for complex geotechnical environments.",
    bgImage: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: 3,
    headline: "Residential Builds & Turnkey Renovations.",
    subtext: "End-to-end construction from foundation to final handover.",
    bgImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentSlide].bgImage})` }}
        >
          <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6 leading-tight">
                {slides[currentSlide].headline}
              </h1>
              <p className="mt-4 text-xl text-slate-300 mb-10 max-w-2xl font-medium">
                {slides[currentSlide].subtext}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/#contact" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-sm text-slate-900 bg-amber-400 hover:bg-amber-500 transition-colors duration-300 shadow-lg hover:shadow-amber-400/20 group">
                  Start Your Project
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="https://wa.me/27123456789" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-bold rounded-sm text-white hover:bg-white hover:text-slate-900 transition-colors duration-300 group">
                  <MessageSquare className="mr-2 h-5 w-5 text-green-400 group-hover:text-green-500" />
                  WhatsApp Quick-Chat
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-12 h-1.5 transition-all duration-300 ${
              idx === currentSlide ? "bg-amber-400" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
