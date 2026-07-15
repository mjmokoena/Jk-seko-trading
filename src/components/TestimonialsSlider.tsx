import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const testimonials = [
  {
    id: 1,
    quote: "JK Seko Trading delivered our commercial build ahead of schedule. Their professionalism and adherence to safety standards are unmatched in the industry.",
    name: "Michael van der Merwe",
    role: "Operations Director, Core Developments",
  },
  {
    id: 2,
    quote: "The rock breaking division handled an incredibly complex site for us. No explosives, zero noise complaints, and perfect execution.",
    name: "Sipho Mkhize",
    role: "Lead Engineer, Urban Infrastructure Projects",
  },
  {
    id: 3,
    quote: "From earthworks to the final aesthetic finishes, their team's attention to detail ensured our residential development was a complete success.",
    name: "Claire Thompson",
    role: "Managing Partner, Thompson Estate Holdings",
  }
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-2">Testimonials</h2>
          <h3 className="text-3xl font-black tracking-tight sm:text-4xl mb-4">
            What Our Clients Say
          </h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Quote className="w-12 h-12 text-amber-400 mx-auto mb-8 opacity-50" />
              <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              <div>
                <p className="font-bold text-xl text-amber-400">{testimonials[currentIndex].name}</p>
                <p className="text-slate-400">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-12 gap-4">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full border border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-400 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full border border-slate-700 text-slate-300 hover:text-amber-400 hover:border-amber-400 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
