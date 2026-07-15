import React from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm transition-all">
      {/* GLOBAL COMPLIANCE HEADER */}
      <div className="bg-slate-900 text-slate-300 py-2 px-4 text-xs font-semibold tracking-wider text-center uppercase sm:flex sm:justify-center sm:gap-4">
        <span>Level 1 B-BBEE Contributor</span>
        <span className="hidden sm:inline text-slate-600">|</span>
        <span>100% Black Youth Owned</span>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex flex-col items-start justify-center">
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-slate-800 uppercase leading-none mb-1">
                JK Seko Trading
              </span>
              <span className="text-[0.55rem] md:text-[0.65rem] font-bold tracking-[0.2em] text-slate-600 uppercase leading-none">
                Safety | Environment | Kept | Obliged
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-slate-600 hover:text-amber-500 font-medium transition-colors">Home</Link>
            <a href="/#services" className="text-slate-600 hover:text-amber-500 font-medium transition-colors">Services</a>
            <a href="/#projects" className="text-slate-600 hover:text-amber-500 font-medium transition-colors">Projects</a>
            <a href="/#case-studies" className="text-slate-600 hover:text-amber-500 font-medium transition-colors">Case Studies</a>
            <Link to="/blog" className="text-slate-600 hover:text-amber-500 font-medium transition-colors">Blog & Resources</Link>
            <a href="/#contact" className="text-slate-600 hover:text-amber-500 font-medium transition-colors">Contact</a>
            
            <a href="/#contact" className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-6 py-2.5 rounded-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2">
              <Phone size={18} />
              Book a Call
            </a>
          </nav>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-slate-900">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-1 shadow-xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-amber-500 hover:bg-slate-50 rounded-md">Home</Link>
          <a href="/#services" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-amber-500 hover:bg-slate-50 rounded-md">Services</a>
          <a href="/#projects" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-amber-500 hover:bg-slate-50 rounded-md">Projects</a>
          <a href="/#case-studies" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-amber-500 hover:bg-slate-50 rounded-md">Case Studies</a>
          <Link to="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-amber-500 hover:bg-slate-50 rounded-md">Blog & Resources</Link>
          <a href="/#contact" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-amber-500 hover:bg-slate-50 rounded-md">Contact</a>
          <div className="pt-4">
            <a href="/#contact" onClick={() => setIsOpen(false)} className="w-full bg-amber-500 text-slate-900 px-6 py-3 rounded-sm font-bold flex items-center justify-center gap-2">
              <Phone size={18} />
              Book a Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
