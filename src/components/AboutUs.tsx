import React from 'react';
import { CheckCircle2, ShieldAlert, Truck } from 'lucide-react';

export default function AboutUs() {
  return (
    <>
      <section className="py-24 bg-white overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative">
              <div className="aspect-[4/3] bg-slate-100 rounded-sm overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" 
                  alt="Construction Fleet" 
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 border-8 border-amber-400 pointer-events-none transform translate-x-4 translate-y-4 rounded-sm z-10 hidden sm:block"></div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-2">About JK Seko Trading</h2>
              <h3 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl mb-6 leading-tight">
                Uncompromising Quality & Execution
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                JK Seko Trading combines operational capacity with technical expertise. We execute industrial, commercial, and residential projects with a zero-compromise approach to safety and quality.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                As a Level 1 B-BBEE, 100% Black Youth Owned enterprise, we elevate construction standards while driving economic participation in South Africa.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-t border-slate-100" id="why-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-2">Why Us</h2>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl mb-4">
              The JK Seko Advantage
            </h3>
            <p className="text-lg text-slate-600">
              Our operational model is built on self-reliance, rigorous compliance, and unmatched technical capability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 hover:shadow-xl transition-shadow text-center flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 text-amber-400 mb-6">
                <Truck size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Extensive Fleet Capacity</h4>
              <p className="text-slate-600">Our in-house fleet of heavy machinery ensures uninterrupted execution and strict timeline management without relying on third-party rentals.</p>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 hover:shadow-xl transition-shadow text-center flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 text-amber-400 mb-6">
                <ShieldAlert size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Risk Mitigation</h4>
              <p className="text-slate-600">Fully covered by extensive public liability insurance with strict adherence to OHS regulations, ensuring site safety and peace of mind.</p>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 hover:shadow-xl transition-shadow text-center flex flex-col items-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 text-amber-400 mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Certified Professionals</h4>
              <p className="text-slate-600">Our workforce includes master artisans, qualified civil engineers, and certified blasters dedicated to structural integrity.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
