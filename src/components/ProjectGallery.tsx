import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const categories = ['All', 'Civil', 'Structural', 'Finishes'];

const projects = [
  { id: 1, title: 'Bulk Earthworks Phase 1', category: 'Civil', image: 'https://images.unsplash.com/photo-1541888086225-eb4520cc32e8?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Steel Framework Assembly', category: 'Structural', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Commercial Office Fit-out', category: 'Finishes', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Highway Trenching', category: 'Civil', image: 'https://images.unsplash.com/photo-1574620892095-2cc0b1d3dce0?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'Concrete Core Pouring', category: 'Structural', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'Luxury Retail Facade', category: 'Finishes', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop' },
];

export default function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = projects.filter(
    (p) => activeFilter === 'All' || p.category === activeFilter
  );

  return (
    <section className="py-24 bg-slate-900" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-2">Portfolio</h2>
            <h3 className="text-3xl font-black text-white tracking-tight sm:text-4xl">
              Project Execution Gallery
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2 text-sm font-bold rounded-sm border transition-all ${
                  activeFilter === cat 
                    ? 'bg-amber-400 border-amber-400 text-slate-900' 
                    : 'border-slate-700 text-slate-300 hover:border-amber-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-slate-800"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                    {project.category}
                  </span>
                  <h4 className="text-xl font-bold text-white">{project.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
