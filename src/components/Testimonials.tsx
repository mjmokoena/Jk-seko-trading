import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const cases = [
  {
    id: 'meyerton',
    title: 'Meyerton Industrial Park',
    type: 'Bulk Earthworks & Civil Infrastructure',
    description: 'Delivered full site clearance, 40,000m³ bulk earthworks, and foundational piling 3 weeks ahead of schedule.',
    image: 'https://images.unsplash.com/photo-1587293852726-6947b508f7aa?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    client: "Grinaker LTA",
    quote: "JK Seko Trading exceeded our expectations. Their fleet capacity and site management were unparalleled."
  },
  {
    id: 'cosmo-city',
    title: 'Cosmo City Residential Build',
    type: 'Turnkey Residential Development',
    description: 'End-to-end execution of a 45-unit premium housing complex including all wet works, structural roofing, and finishes.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    client: "Cosmo Developments",
    quote: "A flawless execution from foundation to roof. The quality of finishes is top-tier."
  },
  {
    id: 'sandton-commercial',
    title: 'Sandton Commercial Office',
    type: 'Structural & Industrial Trades',
    description: 'Complete fit-out and structural reinforcements for a 5-story commercial building in Sandton.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    client: "Growthpoint Properties",
    quote: "Professional, compliant, and delivered strictly on time. Will definitely partner again."
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cases.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };

  const study = cases[currentIndex];

  return (
    <section className="py-24 bg-slate-100 overflow-hidden" id="case-studies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-2">Proven Track Record</h2>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl mb-4">
            Featured Case Studies
          </h3>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={study.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white flex flex-col lg:flex-row border border-slate-200 shadow-xl rounded-sm overflow-hidden"
            >
              <div className="lg:w-1/2 h-64 lg:h-auto relative">
                <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-slate-900 text-white p-2">
                  <FileText size={20} />
                </div>
              </div>
              <div className="p-8 lg:w-1/2 flex flex-col justify-center">
                <span className="text-amber-600 text-xs font-bold uppercase tracking-wider mb-2 block">
                  {study.type}
                </span>
                <h4 className="text-2xl font-black text-slate-900 mb-3">{study.title}</h4>
                <p className="text-slate-600 mb-8">{study.description}</p>
                
                <Link to={`/case-study/${study.id}`} className="inline-flex items-center justify-center px-6 py-3 border border-slate-900 text-sm font-bold rounded-sm text-slate-900 hover:bg-slate-900 hover:text-white transition-colors group w-max">
                  View Full Case Study
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-amber-500 hover:border-amber-500 transition-colors shadow-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-amber-500 hover:border-amber-500 transition-colors shadow-sm"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
