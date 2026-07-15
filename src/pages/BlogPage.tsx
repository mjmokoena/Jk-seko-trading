import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Search, Clock, ChevronRight, BookOpen } from 'lucide-react';
import LeadFunnelForm from '../components/LeadFunnelForm';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  author: string;
  category: 'Guides' | 'Industry Insights' | 'Technology';
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'sustainable-earthworks-south-africa',
    title: 'Sustainable Earthworks in South Africa',
    excerpt: 'Modern techniques for reducing environmental impact during large-scale excavations and bulk soil movements.',
    date: 'Oct 12, 2023',
    readTime: '6 min read',
    author: 'Seko Engineering team',
    category: 'Industry Insights',
    image: 'https://images.unsplash.com/photo-1587293852726-6947b508f7aa?q=80&w=800&auto=format&fit=crop',
    content: [
      'As urban centers in South Africa expand, the civil engineering sector faces growing pressure to adopt sustainable practices. Bulk earthworks—historically one of the most resource-intensive phases of construction—are undergoing a green revolution.',
      'Historically, clearing land and grading surfaces meant significant soil erosion, heavy diesel emissions, and massive volumes of soil being hauled off-site. Today, the focus has shifted entirely to circular site management. By carefully planning cuts and fills, modern engineering firms can balance soil movement on-site, dramatically reducing the need for diesel-heavy haulage.',
      'Key techniques currently employed include digital ground modeling to map precise soil profiles, organic dust suppression methods instead of excessive water use, and the immediate stabilization of exposed slopes using native flora. Furthermore, our teams focus on soil remediation, identifying and treating contaminated pockets on-site rather than dumping them.',
      'By prioritizing these ecological strategies, civil contractors not only protect native biodiversity and water resources but also deliver significant cost savings to clients by optimizing fuel usage and reducing material transport fees.'
    ]
  },
  {
    id: 2,
    slug: 'nhbrc-compliance-commercial-builds',
    title: 'NHBRC Compliance for Commercial Builds',
    excerpt: 'Ensuring your commercial construction project meets all regulatory standards and SANS guidelines seamlessly.',
    date: 'Nov 05, 2023',
    readTime: '8 min read',
    author: 'Compliance Team',
    category: 'Guides',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
    content: [
      'In South Africa, the National Home Builders Registration Council (NHBRC) and the South African National Standards (SANS) define the boundaries of safe, robust building design. While NHBRC registration is highly publicized for housing, its structural standards set a precedent for commercial builds as well.',
      'Navigating these regulations requires strict oversight at every phase of structural engineering, starting with soil classification. South African soil profiles often contain highly expansive clays or collapsible sands that require custom foundational design, such as raft foundations or deep piling.',
      'To guarantee compliance, developers must follow a rigorous structural timeline: complete geotechnical site investigation, pre-pour steel reinforcement inspections by a registered professional engineer, and concrete cube test validation. These steps are not bureaucratic hurdles; they are life-saving risk-mitigation measures.',
      'At JK Seko Trading, we have made safety and compliance our signature. Every build is accompanied by an open compliance file containing concrete batch test results, steel certifications, and occupational health and safety (OHS) audits. This strict documentation guarantees long-term liability protection and property asset valuation.'
    ]
  },
  {
    id: 3,
    slug: 'precision-rock-breaking-solutions',
    title: 'Precision Rock Breaking Solutions',
    excerpt: 'How chemical and mechanical rock breaking technologies revolutionize urban site preparation in sensitive environments.',
    date: 'Jan 18, 2024',
    readTime: '5 min read',
    author: 'Geotechnical Div',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop',
    content: [
      'Excavating in urban zones like Sandton or Pretoria Central frequently places contractors face-to-face with South Africa’s dense bedrock. Standard explosive blasting is often legally or logistically impossible due to nearby high-rises, structural vibration limits, and strict municipal noise bylaws.',
      'This is where precision technology steps in. Mechanical rock breaking—utilizing heavy hydraulic excavators fitted with high-frequency rock hammer attachments—allows precise fracturing without structural seismic waves. Our fleet of excavators handles bulk breaking efficiently on open industrial sites.',
      'For extremely sensitive environments, such as basement expansions directly adjacent to existing foundations, chemical non-explosive cracking agent (expansive mortar) is the ultimate solution. Holes are drilled in a calculated matrix, filled with the non-explosive mixture, which expands over several hours with a pressure exceeding 15,000 PSI, silently fracturing the rock with zero vibration, noise, or flying debris.',
      'Understanding when to deploy mechanical versus silent chemical breaking is a hallmark of highly professional geotechnical teams, keeping critical infrastructure safe and ensuring surrounding commercial businesses remain fully functional.'
    ]
  },
  {
    id: 4,
    slug: 'bbbee-transformation-construction',
    title: 'B-BBEE and Youth Empowerment in Construction',
    excerpt: 'How Level 1 B-BBEE and black youth ownership are transforming South Africa’s construction and engineering landscape.',
    date: 'Mar 02, 2024',
    readTime: '7 min read',
    author: 'Transformation Div',
    category: 'Industry Insights',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop',
    content: [
      'Broad-Based Black Economic Empowerment (B-BBEE) is more than a regulatory requirement—it is a vital driver of economic transformation and structural equity in South Africa. In the infrastructure and construction sector, this impact is particularly profound.',
      'By placing ownership, decision-making power, and high-level engineering roles in the hands of black youth, we are building a sustainable pipeline of future-ready technical experts. It bridges the gap between raw talent and institutional execution, allowing young professionals to manage high-capacity machinery and complex municipal civil works.',
      'Furthermore, Level 1 B-BBEE contributors provide crucial procurement advantages to large corporate clients and public sector partners. Collaborating with a compliant, high-performing level 1 partner allows companies to significantly boost their own preferential procurement scores while ensuring first-class project delivery.',
      'Transformation and premium craftsmanship are not mutually exclusive; they are mutually reinforcing. Diversity of perspective drives innovation on-site, fostering agile problem-solving in tough structural and logistical situations.'
    ]
  }
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Editorial Header Banner */}
      <div className="bg-slate-900 text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-3 block">Knowledge Base</span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Blog & Industry Resources</h1>
            <p className="text-slate-300 text-lg">
              Explore technical insights, South African building standards, precision rock breaking guides, and civil engineering developments.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {selectedPost ? (
          /* Detailed Blog Post View */
          <div className="bg-white rounded-sm border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto animate-fade-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <button 
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center text-sm font-bold text-slate-700 hover:text-amber-600 uppercase tracking-wider transition-colors"
              >
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to Resources
              </button>
              <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                {selectedPost.category}
              </span>
            </div>

            <div className="relative aspect-[21/9] w-full bg-slate-900">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-6 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-amber-500" />
                  <span>{selectedPost.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-amber-500" />
                  <span>{selectedPost.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-amber-500" />
                  <span className="font-semibold">{selectedPost.author}</span>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-8">
                {selectedPost.title}
              </h2>

              <div className="prose prose-lg max-w-none text-slate-700 space-y-6 leading-relaxed">
                {selectedPost.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Informative accreditation Callout Inside Blog */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-10 rounded-sm">
                <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                  <BookOpen size={20} className="text-amber-600" /> Compliance Note:
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  As part of our commitment to infrastructure development and safety standards across South Africa, JK Seko Trading remains actively accredited under the NHBRC, Master Builders Association, and keeps SANS 10400 compliance on all municipal projects.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-slate-600 text-sm">Was this article helpful? Feel free to contact our expert team.</span>
                <button 
                  onClick={() => {
                    setSelectedPost(null);
                    setTimeout(() => {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-3 rounded-sm transition-colors text-sm uppercase tracking-wider"
                >
                  Consult an Expert
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Grid View of Blog & Resources */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Filter and Search Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                  Search
                </h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-sm focus:ring-2 focus:ring-amber-500 outline-none text-sm transition-all"
                  />
                  <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
                  Categories
                </h3>
                <div className="flex flex-col gap-2">
                  {['All', 'Guides', 'Industry Insights', 'Technology'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left px-4 py-2.5 rounded-sm text-sm font-bold transition-all ${
                        selectedCategory === cat 
                          ? 'bg-amber-500 text-slate-900' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              {filteredPosts.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-sm p-12 text-center shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No Articles Found</h3>
                  <p className="text-slate-500">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map(post => (
                    <article 
                      key={post.id} 
                      onClick={() => setSelectedPost(post)}
                      className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    >
                      <div className="aspect-[16/10] overflow-hidden relative bg-slate-900">
                        <div className="absolute top-4 left-4 z-10 bg-slate-900 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                          {post.category}
                        </div>
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-slate-600 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="inline-flex items-center text-xs font-bold text-amber-600 group-hover:text-amber-700 uppercase tracking-widest mt-auto">
                          Read Full Article <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <LeadFunnelForm />
    </div>
  );
}
