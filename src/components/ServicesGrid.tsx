import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HardHat, Building2, Wrench, Mountain } from 'lucide-react';

const services = [
  {
    id: 'civil-works',
    title: 'Civil Works',
    description: 'Bulk earthworks, trenching, road construction, and foundational structural engineering.',
    icon: HardHat,
    image: 'https://images.unsplash.com/photo-1541888086225-eb4520cc32e8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'construction',
    title: 'Construction',
    description: 'Turnkey commercial and residential builds, handled from blueprint to final handover.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'industrial-trades',
    title: 'Industrial Trades',
    description: 'Specialized electrical, plumbing, structural steelwork, and heavy maintenance.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'rock-breaking',
    title: 'Rock Breaking',
    description: 'Precision mechanical and chemical rock breaking for tough geotechnical challenges.',
    icon: Mountain,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop'
  }
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-slate-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-2">Our Capabilities</h2>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl mb-4">
            Industrial-Grade Solutions
          </h3>
          <p className="text-lg text-slate-600">
            Comprehensive construction and engineering services designed for scale, durability, and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-sm border border-slate-200 overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20 bg-amber-400 p-3 shadow-md">
                  <service.icon className="w-6 h-6 text-slate-900" />
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 mb-6 flex-grow">{service.description}</p>
                <Link to={`/service/${service.id}`} className="inline-flex items-center text-sm font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wide group/btn">
                  Learn More & Verify
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
