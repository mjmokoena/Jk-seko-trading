import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import LeadFunnelForm from '../components/LeadFunnelForm';

const servicesData: Record<string, any> = {
  'civil-works': {
    title: 'Civil Works',
    subtitle: 'Bulk earthworks, trenching, road construction, and foundational structural engineering.',
    heroImage: 'https://images.unsplash.com/photo-1541888086225-eb4520cc32e8?q=80&w=2070&auto=format&fit=crop',
    content: 'Our Civil Engineering division handles everything from site clearance to bulk earthworks, ensuring the ground is perfectly prepared for massive structural loads. We deploy our own fleet of heavy machinery to maintain tight schedules.',
    features: ['Bulk Earthworks', 'Trenching & Piping', 'Road Construction', 'Site Clearance & Leveling']
  },
  'construction': {
    title: 'Construction',
    subtitle: 'Turnkey commercial and residential builds, handled from blueprint to final handover.',
    heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop',
    content: 'We provide end-to-end construction services. Whether it is a luxury residential development or a large-scale commercial warehouse, our project managers ensure flawless execution with 100% compliance to NHBRC and SANS regulations.',
    features: ['Turnkey Commercial Builds', 'Luxury Residential', 'Warehouse & Factory Construction', 'Project Management']
  },
  'industrial-trades': {
    title: 'Industrial Trades',
    subtitle: 'Specialized electrical, plumbing, structural steelwork, and heavy maintenance.',
    heroImage: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop',
    content: 'Our certified master artisans handle all specialized industrial trades required on large-scale sites. From high-voltage electrical setups to industrial plumbing and precision structural steelwork, we deliver robust solutions.',
    features: ['Structural Steelwork', 'Industrial Electrical', 'Heavy Plumbing', 'Site Maintenance']
  },
  'rock-breaking': {
    title: 'Rock Breaking',
    subtitle: 'Precision mechanical and chemical rock breaking for tough geotechnical challenges.',
    heroImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop',
    content: 'When you hit bedrock, we have the solutions. We offer high-capacity mechanical pecking, chemical non-explosive rock breaking for sensitive areas, and controlled blasting handled by certified explosive experts.',
    features: ['Mechanical Rock Pecking', 'Chemical (Silent) Rock Breaking', 'Controlled Blasting', 'Rubble Removal']
  }
};

export default function ServicePage() {
  const { serviceId } = useParams();
  const service = serviceId ? servicesData[serviceId] : null;

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-4 py-24">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Service Not Found</h1>
        <Link to="/" className="text-amber-600 font-bold hover:underline flex items-center">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full bg-slate-900 flex items-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${service.heroImage})` }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link to="/" className="inline-flex items-center text-amber-400 font-bold hover:text-amber-300 mb-8 transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
          </Link>
          <div className="max-w-3xl">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4 block">Service Details</span>
            <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">{service.title}</h1>
            <p className="text-xl text-slate-300">{service.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black text-slate-900 mb-6">Service Overview</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-12">
              {service.content}
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Deliverables</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-start bg-slate-50 p-4 rounded-sm border border-slate-200">
                  <CheckCircle2 className="text-amber-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
                  <span className="font-semibold text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-sm p-8 text-white sticky top-32 shadow-xl">
              <ShieldCheck className="text-amber-400 w-12 h-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Ready to start?</h3>
              <p className="text-slate-300 mb-8 text-sm">
                Get in touch with our technical team to discuss your project requirements and receive a comprehensive estimate.
              </p>
              <a href="#contact" className="block w-full bg-amber-500 text-slate-900 text-center py-4 font-bold rounded-sm hover:bg-amber-400 transition-colors">
                Request an Estimate
              </a>
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="flex items-center text-slate-300 text-sm mb-3">
                  <FileText className="w-4 h-4 mr-2 text-amber-400" />
                  100% SANS Compliant
                </div>
                <div className="flex items-center text-slate-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-amber-400" />
                  Level 1 B-BBEE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LeadFunnelForm />
    </>
  );
}
