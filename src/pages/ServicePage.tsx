import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, FileText, ChevronLeft, ChevronRight, 
  Award, Building2, HardHat, Wrench, Mountain, ArrowRight, Star, AlertTriangle 
} from 'lucide-react';
import LeadFunnelForm from '../components/LeadFunnelForm';
import { motion, AnimatePresence } from 'motion/react';

// Structuring custom landing-page details for each service
interface SubService {
  title: string;
  desc: string;
  image: string;
}

interface ServiceLandingData {
  title: string;
  tagline: string;
  heroSlides: SubService[];
  overview: string;
  accreditations: {
    title: string;
    authority: string;
    badge: string;
    desc: string;
  }[];
  deliverables: string[];
  gallery: {
    title: string;
    image: string;
  }[];
  featuredCaseStudy: {
    id: string;
    title: string;
    type: string;
    desc: string;
    image: string;
  };
}

const servicesLandingData: Record<string, ServiceLandingData> = {
  'civil-works': {
    title: 'Civil Works',
    tagline: 'Leading bulk earthworks, precision trenching, road infrastructure, and foundational engineering across South Africa.',
    heroSlides: [
      {
        title: 'Bulk Earthworks & Site Prep',
        desc: 'Moving over 40,000m³ of soil using our state-of-the-art heavy fleet for safe foundational building.',
        image: 'https://images.unsplash.com/photo-1541888086225-eb4520cc32e8?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: 'Trenching & Pipeline Networks',
        desc: 'Advanced mechanical excavation for massive industrial storm-water drainage and high-density piping.',
        image: 'https://images.unsplash.com/photo-1574620892095-2cc0b1d3dce0?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: 'Road Construction & Paving',
        desc: 'Heavy-duty asphalt paving, soil stabilization, and comprehensive civil road layout engineering.',
        image: 'https://images.unsplash.com/photo-1587293852726-6947b508f7aa?q=80&w=1200&auto=format&fit=crop'
      }
    ],
    overview: 'Our Civil Engineering and Works division operates at the core of heavy South African infrastructure. We prepare complex commercial footprints, excavate deep subterranean networks, and construct stable arterial transport surfaces. Operating with an extensive in-house fleet of mechanical excavators, front-end loaders, and tippers, we eliminate reliance on third-party hires to execute strict project timelines with high-efficiency output.',
    accreditations: [
      {
        title: 'CIDB Grade 5CE',
        authority: 'Construction Industry Development Board',
        badge: 'CE',
        desc: 'Formally registered and compliant for heavy Civil Engineering contracts up to R10 Million per project.'
      },
      {
        title: 'SANS 1200 Standard',
        authority: 'South African National Standards',
        badge: 'SANS',
        desc: 'Strict adherence to standardized specifications for civil engineering construction and structural wet works.'
      },
      {
        title: 'B-BBEE Level 1',
        authority: 'Economic Empowerment Board',
        badge: 'Level 1',
        desc: '135% procurement recognition status helping corporate and government clients maximize enterprise ratings.'
      }
    ],
    deliverables: [
      'Site Clearance, Grubbing & Levelling',
      'Bulk Excavation & Engineered Backfilling',
      'Stormwater & Sub-Soil Drainage Installation',
      'Subgrade Compaction & Soil Stabilization Testing',
      'Foundational Earth Piling Preparation',
      'Asphalt Road Construction & Pavement Layering'
    ],
    gallery: [
      { title: 'Excavation & Leveling Phase', image: 'https://images.unsplash.com/photo-1541888086225-eb4520cc32e8?q=80&w=800&auto=format&fit=crop' },
      { title: 'Piping Laydown Preparation', image: 'https://images.unsplash.com/photo-1574620892095-2cc0b1d3dce0?q=80&w=800&auto=format&fit=crop' },
      { title: 'Subbase Compaction Work', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop' },
      { title: 'Aggregate Crushing on Site', image: 'https://images.unsplash.com/photo-1587293852726-6947b508f7aa?q=80&w=800&auto=format&fit=crop' }
    ],
    featuredCaseStudy: {
      id: 'meyerton',
      title: 'Meyerton Industrial Park',
      type: 'Bulk Earthworks & Civil Infrastructure',
      desc: 'Cleared 40,000m³ of clay-heavy earth and completed technical foundational piling 3 weeks ahead of schedule.',
      image: 'https://images.unsplash.com/photo-1587293852726-6947b508f7aa?q=80&w=800&auto=format&fit=crop'
    }
  },
  'construction': {
    title: 'Construction',
    tagline: 'Premium turnkey commercial builds, industrial warehousing, and luxury residential estates crafted from blueprint to key handover.',
    heroSlides: [
      {
        title: 'Turnkey Commercial Complexes',
        desc: 'Sleek, multi-story office buildings and retail centers engineered for safe, high-traffic commercial use.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: 'Industrial Warehousing',
        desc: 'Spacious, steel-reinforced portal frame structures optimized for logistics, storage, and factories.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: 'Premium Residential Estates',
        desc: 'High-end multi-unit housing developments featuring first-class masonry, finishes, and NHBRC safety.',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop'
      }
    ],
    overview: 'Our Construction Division provides comprehensive turnkey services across South Africa. From laying heavy reinforced foundations to configuring advanced steel roofing structures and high-end aesthetic snags, our master-builders oversee every details. We maintain strict compliance with NHBRC (National Home Builders Registration Council) guidelines and SANS 10400 building regulations, offering extensive quality checks on all structural brickwork and concrete mixes.',
    accreditations: [
      {
        title: 'NHBRC Registered Builder',
        authority: 'National Home Builders Registration Council',
        badge: 'NHBRC',
        desc: 'Ensures absolute legal compliance, structural guarantees, and professional wet-works standards.'
      },
      {
        title: 'SANS 10400 Compliant',
        authority: 'South African National Building Regulations',
        badge: 'SANS',
        desc: 'Fully aligned to the national building code governing layout, fire safety, structural concrete, and ventilation.'
      },
      {
        title: 'CIDB Grade 5GB',
        authority: 'General Building Registration',
        badge: 'GB',
        desc: 'Accredited to contract and execute extensive general building works for public and private enterprise.'
      }
    ],
    deliverables: [
      'Turnkey Commercial & Retail Construction',
      'Structural Steel Portal Frame Warehouses',
      'Multi-Unit Housing Development Wet Works',
      'SANS-Aligned Reinforced Concrete Batching',
      'Professional Masonry, Brickwork, & Plastering',
      'Full Site Project Management & Structural Audits'
    ],
    gallery: [
      { title: 'Commercial Columns Setup', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop' },
      { title: 'Residential Complex Masonry', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop' },
      { title: 'Foundational Steel Grid', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop' },
      { title: 'High-Rise Office Fitout', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop' }
    ],
    featuredCaseStudy: {
      id: 'cosmo-city',
      title: 'Cosmo City Residential Build',
      type: 'Turnkey Residential Development',
      desc: 'Constructed a 45-unit premium housing development with flawless SANS compliance and zero snags on handover.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop'
    }
  },
  'industrial-trades': {
    title: 'Industrial Trades',
    tagline: 'Certified structural steel fabrication, industrial electrical networks, heavy plumbing, and professional facility maintenance.',
    heroSlides: [
      {
        title: 'Structural Steel Framing',
        desc: 'Off-site precision welding and fabrication of structural support pillars and roof trusses.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: 'Industrial Electrical Systems',
        desc: 'Configuring safe high-voltage distribution boards, cable trays, and factory power grids.',
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: 'Heavy plumbing & Drainage',
        desc: 'Robust high-volume drainage, sewage reticulation, and industrial plumbing manifolds.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop'
      }
    ],
    overview: 'Industrial construction demands specialized technical expertise. Our Trades Division consists of registered master-artisans, certified electrical engineers, and commercial plumbers who bring deep technical competence on-site. From erecting precision structural steel frames designed to withstand massive shear loads, to installing critical electrical grids with full Certificates of Compliance (CoC), we ensure your facility is safe, functional, and efficient.',
    accreditations: [
      {
        title: 'ECB Registered Electricians',
        authority: 'Electrical Contracting Board of South Africa',
        badge: 'ECB',
        desc: 'Authorised to execute high-voltage wiring, industrial boards, and issue compliance certificates.'
      },
      {
        title: 'PIRB Registered Plumbers',
        authority: 'Plumbing Industry Registration Board',
        badge: 'PIRB',
        desc: 'Guarantees that all high-pressure systems and fluid lines match national water hygiene standards.'
      },
      {
        title: 'COIDA Certified',
        authority: 'Compensation for Occupational Injuries Board',
        badge: 'COIDA',
        desc: 'Ensuring rigorous safety mitigation and coverage, protecting workers on high-risk trade environments.'
      }
    ],
    deliverables: [
      'Structural Steel Fabrication & Precision Welding',
      'Industrial Power Reticulation & Cable Trays',
      'Electrical compliance inspections & full CoC Issuing',
      'High-Volume Drainage & Industrial Plumbing Reticulation',
      'Precision Mechanical Plant Maintenance & Overhauls',
      'Corrosion Protection & Steel Sandblasting On-Site'
    ],
    gallery: [
      { title: 'Precision Steel Fabrication', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop' },
      { title: 'Electrical Panel Assembly', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop' },
      { title: 'Industrial Facility Maintenance', image: 'https://images.unsplash.com/photo-1581092121797-5dc44df73e45?q=80&w=800&auto=format&fit=crop' },
      { title: 'Commercial Fluid Systems', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop' }
    ],
    featuredCaseStudy: {
      id: 'sandton-commercial',
      title: 'Sandton Commercial Office',
      type: 'Structural & Industrial Trades',
      desc: 'Executed precision structural steel reinforcement and complete high-voltage fitting out inside an active commercial tower.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
    }
  },
  'rock-breaking': {
    title: 'Rock Breaking',
    tagline: 'High-capacity mechanical breaking, silent non-explosive chemical splitting, and controlled blasting for tough geological terrains.',
    heroSlides: [
      {
        title: 'Silent Chemical Rock Cracking',
        desc: 'Using high-expansion chemical mortar to split hard bedrock silently with zero vibration or debris.',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: 'Mechanical Hydraulic Pecking',
        desc: 'Heavy hydraulic hammers fitted to our excavators split high-density dolerite and granite outcrops.',
        image: 'https://images.unsplash.com/photo-1541888086225-eb4520cc32e8?q=80&w=1200&auto=format&fit=crop'
      },
      {
        title: 'Controlled Blasting Services',
        desc: 'Precision micro-blasting managed by highly certified explosivists in compliance with mining regulations.',
        image: 'https://images.unsplash.com/photo-1587293852726-6947b508f7aa?q=80&w=1200&auto=format&fit=crop'
      }
    ],
    overview: 'Encountering bedrock can easily bring site operations to a halt if not handled with correct engineering. Our Rock Breaking division offers specialized geotechnical methods to quickly fracture and excavate dolerite, granite, and reinforced concrete. For sensitive suburban sites directly adjacent to existing structures, we utilize non-explosive expansive chemical mortar to crack bedrock silently without generating structural vibration, noise, or dust.',
    accreditations: [
      {
        title: 'Certified Explosives Blasters',
        authority: 'Department of Mineral Resources',
        badge: 'DMR',
        desc: 'All blasting projects are executed by licensed explosives blasters with strict safety compliance.'
      },
      {
        title: 'R50M Public Liability Insured',
        authority: 'Underwritten Risk Coverage',
        badge: 'Insured',
        desc: 'Comprehensive public liability coverage guaranteeing complete financial peace of mind for urban rock breaking.'
      },
      {
        title: 'SANS Vibration Code Compliant',
        authority: 'South African National Standards',
        badge: 'Vibration',
        desc: 'Strict seismic and acoustic monitoring on-site to protect neighboring buildings from micro-shocks.'
      }
    ],
    deliverables: [
      'Chemical Silent Expansive Rock Cracking',
      'Heavy-Duty Mechanical Hydraulic Rock Pecking',
      'Controlled Precision Micro-Blasting',
      'Foundation Rock Slot Trenching',
      'Seismic Vibration & Acoustic Site Monitoring',
      'Bedrock Rubble Clearance & Site Haulage'
    ],
    gallery: [
      { title: 'Subterranean Dolerite Splitting', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop' },
      { title: 'Excavator Hammer Operating', image: 'https://images.unsplash.com/photo-1541888086225-eb4520cc32e8?q=80&w=800&auto=format&fit=crop' },
      { title: 'Trench Rock Clearance', image: 'https://images.unsplash.com/photo-1587293852726-6947b508f7aa?q=80&w=800&auto=format&fit=crop' },
      { title: 'Geotechnical Soil Sampling', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop' }
    ],
    featuredCaseStudy: {
      id: 'meyerton',
      title: 'Meyerton Industrial Park',
      type: 'Bulk Earthworks & Civil Infrastructure',
      desc: 'Used mechanical rock breaking and chemical splitting to bypass heavy subterranean rock, preventing massive timeline delays.',
      image: 'https://images.unsplash.com/photo-1587293852726-6947b508f7aa?q=80&w=800&auto=format&fit=crop'
    }
  }
};

export default function ServicePage() {
  const { serviceId } = useParams();
  const service = serviceId ? servicesLandingData[serviceId] : null;
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto scroll sub-services mini carousel
  useEffect(() => {
    if (!service) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % service.heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [service, serviceId]);

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center text-center px-4 py-24 min-h-[60vh] bg-slate-50">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Service Not Found</h1>
        <Link to="/" className="text-amber-600 font-bold hover:underline flex items-center">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  const nextSlide = () => {
    setActiveSlide(prev => (prev + 1) % service.heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide(prev => (prev - 1 + service.heroSlides.length) % service.heroSlides.length);
  };

  return (
    <div className="bg-slate-50">
      
      {/* 1. HERO CAROUSEL OF SERVICE CLASSES */}
      <section className="relative h-[65vh] min-h-[480px] w-full bg-slate-900 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${service.heroSlides[activeSlide].image})` }} 
            />
            <div className="absolute inset-0 bg-slate-950/70" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-20 pointer-events-none">
          <button 
            onClick={prevSlide}
            className="p-3 rounded-full bg-slate-900/40 text-white hover:bg-amber-500 hover:text-slate-900 pointer-events-auto transition-all shadow-md backdrop-blur-xs"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="p-3 rounded-full bg-slate-900/40 text-white hover:bg-amber-500 hover:text-slate-900 pointer-events-auto transition-all shadow-md backdrop-blur-xs"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Content Wrapper */}
        <div className="absolute inset-0 flex items-center z-10 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
            <div className="max-w-3xl pointer-events-auto">
              <Link to="/" className="inline-flex items-center text-amber-400 font-bold hover:text-amber-300 mb-6 transition-colors text-sm uppercase tracking-wider">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
              </Link>
              
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-3 block">
                Professional Services • {service.title}
              </span>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
                    {service.heroSlides[activeSlide].title}
                  </h1>
                  <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl">
                    {service.heroSlides[activeSlide].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Dots Indicators */}
              <div className="flex gap-2 mt-8">
                {service.heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeSlide ? 'w-8 bg-amber-400' : 'w-2 bg-white/40'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW & ACCREDITATION BADGES SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-2">Service Landing</h2>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Premium {service.title} Solutions
              </h3>
              <p className="text-slate-500 italic mt-2 text-lg">
                "{service.tagline}"
              </p>
            </div>
            
            <p className="text-lg text-slate-700 leading-relaxed">
              {service.overview}
            </p>

            {/* Accreditations Grid */}
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Award className="text-amber-500" /> Professional Licensing & Accreditation
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {service.accreditations.map((acc, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 p-6 shadow-xs rounded-sm hover:border-amber-400 transition-colors">
                    <div className="w-12 h-12 bg-slate-900 text-amber-400 font-black text-xs flex items-center justify-center mb-4 rounded-sm uppercase tracking-wider">
                      {acc.badge}
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm mb-1">{acc.title}</h5>
                    <p className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold mb-2">{acc.authority}</p>
                    <p className="text-slate-600 text-xs leading-relaxed">{acc.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Deliverables Sidebar */}
          <div className="lg:col-span-1 bg-white border border-slate-200 p-8 rounded-sm shadow-lg sticky top-32">
            <h4 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-6 pb-2 border-b border-slate-100">
              Key Deliverables
            </h4>
            <ul className="space-y-4 mb-8">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="text-amber-500 mt-0.5 mr-3 flex-shrink-0 w-5 h-5" />
                  <span className="font-semibold text-slate-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-slate-900 text-white p-6 rounded-sm mb-6">
              <ShieldCheck className="text-amber-400 w-10 h-10 mb-4" />
              <h5 className="font-bold text-lg mb-2">SANS & OHS Compliant</h5>
              <p className="text-xs text-slate-300 leading-relaxed">
                JK Seko guarantees all projects are executed under certified structural specifications with a strict OHS (Occupational Health & Safety) audit file.
              </p>
            </div>

            <button 
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 text-center rounded-sm text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              Request a Technical Estimate
            </button>
          </div>
        </div>
      </section>

      {/* 3. LANDING PICTURES GALLERY */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-xs">Work Evidence</span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">{service.title} Project Photos</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.gallery.map((pic, idx) => (
              <div key={idx} className="group relative aspect-[4/3] rounded-sm overflow-hidden bg-slate-800 border border-slate-800">
                <img 
                  src={pic.image} 
                  alt={pic.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{pic.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTEGRATED CASE STUDY CAROUSEL LINK */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="bg-white border border-slate-200 p-8 md:p-12 shadow-xl rounded-sm flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/3 aspect-[4/3] overflow-hidden rounded-sm relative shadow-md">
            <img 
              src={service.featuredCaseStudy.image} 
              alt={service.featuredCaseStudy.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-slate-900 text-white p-2">
              <FileText size={18} />
            </div>
          </div>
          <div className="flex-grow space-y-4">
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-full">
              Featured Case Study
            </span>
            <h4 className="text-2xl font-black text-slate-900">
              {service.featuredCaseStudy.title}
            </h4>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {service.featuredCaseStudy.desc}
            </p>
            <div className="pt-2">
              <Link 
                to={`/case-study/${service.featuredCaseStudy.id}`}
                className="inline-flex items-center text-sm font-bold text-slate-900 border-b-2 border-amber-500 hover:text-amber-600 transition-colors"
              >
                Read full case study <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ESTIMATE FORM */}
      <LeadFunnelForm />
    </div>
  );
}
