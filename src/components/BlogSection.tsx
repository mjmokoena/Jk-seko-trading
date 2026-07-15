import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'Sustainable Earthworks in South Africa',
    excerpt: 'Modern techniques for reducing environmental impact during large-scale excavations.',
    date: 'Oct 12, 2023',
    author: 'Seko Engineering',
    category: 'Industry Insights',
    image: 'https://images.unsplash.com/photo-1587293852726-6947b508f7aa?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'NHBRC Compliance for Commercial Builds',
    excerpt: 'Ensuring your commercial construction project meets all regulatory standards.',
    date: 'Nov 05, 2023',
    author: 'Compliance Team',
    category: 'Guides',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Precision Rock Breaking Solutions',
    excerpt: 'How chemical and mechanical rock breaking revolutionizes urban site preparation.',
    date: 'Jan 18, 2024',
    author: 'Geotechnical Div',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop'
  }
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-white" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-2">Industry Insights</h2>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
              Latest from Our Blog
            </h3>
          </div>
          <button className="inline-flex items-center text-sm font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wide group">
            View All Articles
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="aspect-[16/9] overflow-hidden rounded-sm mb-6 relative">
                <div className="absolute top-4 left-4 z-10 bg-slate-900 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                  {post.category}
                </div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {post.date}
                </div>
                <div className="flex items-center gap-1">
                  <User size={14} />
                  {post.author}
                </div>
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                {post.title}
              </h4>
              <p className="text-slate-600 line-clamp-2">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
