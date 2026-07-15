import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Ruler, HardHat, Star } from 'lucide-react';
import LeadFunnelForm from '../components/LeadFunnelForm';

const casesData: Record<string, any> = {
  'meyerton': {
    title: 'Meyerton Industrial Park',
    type: 'Bulk Earthworks & Civil Infrastructure',
    description: 'Delivered full site clearance, 40,000m³ bulk earthworks, and foundational piling 3 weeks ahead of schedule.',
    image: 'https://images.unsplash.com/photo-1587293852726-6947b508f7aa?q=80&w=2070&auto=format&fit=crop',
    client: 'Grinaker LTA',
    duration: '4 Months',
    scale: '40,000m³ Excavation',
    challenge: 'The site presented severe geotechnical challenges with unexpected subterranean rock formations and a high water table, threatening to delay the overall construction schedule.',
    solution: 'We deployed our specialized rock breaking division alongside heavy-duty excavators. Implementing a 24/7 dewatering system allowed continuous earthworks. The rock was crushed on-site and repurposed as aggregate for the foundational layers.',
    results: [
      'Completed 3 weeks ahead of schedule.',
      'Saved client 15% on aggregate material costs by repurposing excavated rock.',
      'Zero Lost Time Injury (LTI) over 45,000 man-hours.'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1541888086225-eb4520cc32e8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop'
    ],
    testimonial: {
      quote: "JK Seko Trading exceeded our expectations. Their fleet capacity and site management were unparalleled. They handled the unexpected rock formations with complete professionalism, keeping us ahead of schedule.",
      author: "Johnathan Smit",
      role: "Project Director, Grinaker LTA"
    }
  },
  'cosmo-city': {
    title: 'Cosmo City Residential Build',
    type: 'Turnkey Residential Development',
    description: 'End-to-end execution of a 45-unit premium housing complex including all wet works, structural roofing, and finishes.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop',
    client: 'Cosmo Developments',
    duration: '14 Months',
    scale: '45 Premium Units',
    challenge: 'Coordinating multiple trades on a tight footprint while adhering strictly to high-end architectural specifications and NHBRC standards.',
    solution: 'Utilized critical path method (CPM) scheduling to seamlessly integrate our structural, electrical, and plumbing divisions. We established an on-site quality control laboratory to test concrete batching daily.',
    results: [
      '100% NHBRC compliance passed on first inspection.',
      'All 45 units handed over simultaneously with zero snags.',
      'Awarded contractor of the year by the client.'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop'
    ],
    testimonial: {
      quote: "A flawless execution from foundation to roof. The quality of finishes is top-tier and their adherence to safety regulations gave us complete peace of mind.",
      author: "Sarah Jenkins",
      role: "Development Lead, Cosmo Developments"
    }
  },
  'sandton-commercial': {
    title: 'Sandton Commercial Office',
    type: 'Structural & Industrial Trades',
    description: 'Complete fit-out and structural reinforcements for a 5-story commercial building in Sandton.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop',
    client: 'Growthpoint Properties',
    duration: '8 Months',
    scale: '12,000m² Floor Space',
    challenge: 'Executing structural reinforcements in an active commercial district with severe noise and logistical restrictions.',
    solution: 'Implemented chemical (silent) rock breaking for basement expansions and scheduled heavy material deliveries exclusively during off-peak night hours. Structural steel assemblies were prefabricated off-site.',
    results: [
      'Zero noise complaints from neighboring businesses.',
      'Successfully reinforced foundations to support 2 additional floors.',
      'Completed within budget.'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop'
    ],
    testimonial: {
      quote: "Professional, compliant, and delivered strictly on time. The silent rock breaking technology they used was a game-changer for our urban site.",
      author: "David Mofokeng",
      role: "Operations Manager, Growthpoint Properties"
    }
  }
};

export default function CaseStudyPage() {
  const { caseId } = useParams();
  const study = caseId ? casesData[caseId] : null;

  if (!study) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-4 py-24">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Case Study Not Found</h1>
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
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${study.image})` }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link to="/" className="inline-flex items-center text-amber-400 font-bold hover:text-amber-300 mb-8 transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
          </Link>
          <div className="max-w-4xl">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4 block">{study.type}</span>
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight mb-6">{study.title}</h1>
          </div>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Project Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 -mt-32 relative z-20">
          <div className="bg-white p-6 shadow-xl border-t-4 border-amber-500 rounded-sm">
            <HardHat className="text-slate-400 mb-4 w-8 h-8" />
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Client</h4>
            <p className="text-xl font-bold text-slate-900">{study.client}</p>
          </div>
          <div className="bg-white p-6 shadow-xl border-t-4 border-amber-500 rounded-sm">
            <Clock className="text-slate-400 mb-4 w-8 h-8" />
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Duration</h4>
            <p className="text-xl font-bold text-slate-900">{study.duration}</p>
          </div>
          <div className="bg-white p-6 shadow-xl border-t-4 border-amber-500 rounded-sm">
            <Ruler className="text-slate-400 mb-4 w-8 h-8" />
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Scale</h4>
            <p className="text-xl font-bold text-slate-900">{study.scale}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none text-slate-600">
              <h2 className="text-3xl font-black text-slate-900 mb-6 mt-0">The Challenge</h2>
              <p className="leading-relaxed mb-10">{study.challenge}</p>
              
              <h2 className="text-3xl font-black text-slate-900 mb-6">Our Solution</h2>
              <p className="leading-relaxed mb-10">{study.solution}</p>
              
              <h2 className="text-3xl font-black text-slate-900 mb-6 mt-12">Project Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {study.gallery.map((img: string, idx: number) => (
                  <img key={idx} src={img} alt={`Gallery ${idx + 1}`} className="w-full h-64 object-cover rounded-sm shadow-md hover:shadow-xl transition-shadow" />
                ))}
              </div>

              {study.testimonial && (
                <div className="bg-slate-50 p-8 rounded-sm border-l-4 border-amber-500 mt-12 mb-8">
                  <div className="flex text-amber-400 mb-4 gap-1">
                    <Star className="fill-current w-5 h-5" />
                    <Star className="fill-current w-5 h-5" />
                    <Star className="fill-current w-5 h-5" />
                    <Star className="fill-current w-5 h-5" />
                    <Star className="fill-current w-5 h-5" />
                  </div>
                  <blockquote className="text-xl font-medium text-slate-800 italic mb-6">
                    "{study.testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-bold text-slate-900">{study.testimonial.author}</p>
                    <p className="text-sm text-slate-600">{study.testimonial.role}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-slate-50 border border-slate-200 rounded-sm p-8 sticky top-32">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Results</h3>
              <ul className="space-y-4">
                {study.results.map((result: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center mr-4 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-slate-900" />
                    </div>
                    <span className="font-medium text-slate-700">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <LeadFunnelForm />
    </>
  );
}
