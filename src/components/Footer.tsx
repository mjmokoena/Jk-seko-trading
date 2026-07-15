import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex flex-col items-start justify-center mb-6 inline-block">
              <span className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase leading-none mb-2">
                JK Seko Trading
              </span>
              <span className="text-[0.55rem] md:text-[0.65rem] font-bold tracking-[0.2em] text-slate-400 uppercase leading-none">
                Safety | Environment | Kept | Obliged
              </span>
            </Link>
            <p className="mb-4 max-w-sm">
              Turnkey civil engineering, construction, and rock breaking. Compliant, safe, and built to last.
            </p>
            <div className="flex gap-4">
               {/* Social links can go here */}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><a href="/#services" className="hover:text-amber-400 transition-colors">Our Services</a></li>
              <li><a href="/#projects" className="hover:text-amber-400 transition-colors">Project Portfolio</a></li>
              <li><Link to="/blog" className="hover:text-amber-400 transition-colors">Blog & Resources</Link></li>
              <li><a href="/#contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>123 Industrial Park Ave.</li>
              <li>Johannesburg, South Africa</li>
              <li className="mt-4"><a href="tel:+27123456789" className="text-amber-400 font-bold hover:underline">+27 12 345 6789</a></li>
              <li><a href="mailto:info@jkseko.co.za" className="hover:text-white transition-colors">info@jkseko.co.za</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} JK Seko Trading. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
