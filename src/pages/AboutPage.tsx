import React, { useState } from 'react';
import { ShieldCheck, Award, Briefcase, Users, Flame, Landmark, CheckCircle, ArrowRight, BookOpen, FileDown, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadFunnelForm from '../components/LeadFunnelForm';

export default function AboutPage() {
  const [downloadingPack, setDownloadingPack] = useState(false);
  const [downloadingProfile, setDownloadingProfile] = useState(false);

  const handleDownloadPack = () => {
    setDownloadingPack(true);
    setTimeout(() => {
      setDownloadingPack(false);
      alert('JK Seko Trading Capability & Compliance Pack (Level 1 B-BBEE affidavit, NHBRC license, CIDB credentials) has been generated and is downloading to your device.');
    }, 1000);
  };

  const handleDownloadProfile = () => {
    setDownloadingProfile(true);
    setTimeout(() => {
      setDownloadingProfile(false);
      alert('JK Seko Trading Corporate Company Profile (Executive team list, fleet roster, and full project portfolio) has been generated and is downloading to your device.');
    }, 1000);
  };
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.15),rgba(255,255,255,0))]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-3 block">Corporate Profile</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              Bridging Structural Engineering & Commercial Excellence
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-8">
              JK Seko Trading is a 100% Black Youth-Owned, Level 1 B-BBEE certified contracting firm delivering turnkey construction, heavy civil works, and precision rock breaking across South Africa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/quote-calculator"
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-3.5 rounded-sm transition-all text-sm uppercase tracking-wider inline-flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                Cost Calculator <ArrowRight size={16} />
              </Link>
              <a
                href="#contact"
                className="border border-white/20 hover:border-amber-500 hover:text-amber-400 text-white font-bold px-8 py-3.5 rounded-sm transition-all text-sm uppercase tracking-wider inline-block"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE DIFFERENTIATORS / QUICK NUMBERS */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 border-r last:border-r-0 border-slate-100">
              <p className="text-4xl sm:text-5xl font-black text-slate-900 mb-2">100%</p>
              <p className="text-xs font-bold text-amber-500 uppercase tracking-widest">Black Youth Owned</p>
              <p className="text-xs text-slate-400 mt-1">Driving economic transformation</p>
            </div>
            <div className="text-center p-6 border-r last:border-r-0 border-slate-100">
              <p className="text-4xl sm:text-5xl font-black text-slate-900 mb-2">Level 1</p>
              <p className="text-xs font-bold text-amber-500 uppercase tracking-widest">B-BBEE Contributor</p>
              <p className="text-xs text-slate-400 mt-1">135% preferential procurement status</p>
            </div>
            <div className="text-center p-6 border-r last:border-r-0 border-slate-100">
              <p className="text-4xl sm:text-5xl font-black text-slate-900 mb-2">0</p>
              <p className="text-xs font-bold text-amber-500 uppercase tracking-widest">OHS Incidents</p>
              <p className="text-xs text-slate-400 mt-1">Unmatched on-site safety track record</p>
            </div>
            <div className="text-center p-6 border-r last:border-r-0 border-slate-100">
              <p className="text-4xl sm:text-5xl font-black text-slate-900 mb-2">100%</p>
              <p className="text-xs font-bold text-amber-500 uppercase tracking-widest">SANS & NHBRC compliant</p>
              <p className="text-xs text-slate-400 mt-1">Certified quality assurance standard</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORPORATE MISSION & VISION (Side-by-Side) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Our Purpose</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1 mb-6">
              Engineering the Foundations of Tomorrow
            </h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-base">
              <p>
                At JK Seko Trading, we believe that South Africa's growth depends on high-quality, compliant infrastructure. We reject shortcuts, low-grade concrete mixing, or uncertified steelwork. Every project we undertake is modeled dynamically to ensure structural resilience.
              </p>
              <p>
                Our operational blueprint focuses on hiring and training local black youth, enabling them to operate state-of-the-art machinery and manage heavy earthworks under the active mentorship of registered professional engineers. This dual commitment to technical precision and national transformation is what defines us.
              </p>
            </div>

            <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-sm">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                <ShieldCheck className="text-amber-600" size={20} /> CIDB Registered & Insured
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                As a registered contractor with the Construction Industry Development Board (CIDB), we carry a comprehensive R50 Million public liability insurance package, covering heavy excavation, demolition, and rock breaking.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white border border-slate-200 p-8 rounded-sm shadow-sm hover:border-amber-400 transition-colors">
              <div className="w-12 h-12 bg-slate-900 text-amber-400 flex items-center justify-center mb-6 rounded-sm">
                <Briefcase size={22} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To construct premium, long-lasting structures and prepare secure geographical footprints with standard-setting quality assurance, safe execution, and compliance that provides absolute reassurance to public and private stakeholders.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-sm shadow-sm hover:border-amber-400 transition-colors">
              <div className="w-12 h-12 bg-slate-900 text-amber-400 flex items-center justify-center mb-6 rounded-sm">
                <Users size={22} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To become South Africa's leading youth-led civil engineering partner, recognized for setting high benchmarks in environmental site stewardship, technological rock-breaking precision, and genuine social empowerment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUE PILLARS */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Core Values</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-1 mb-4">Values that Guide Our Construction Handshakes</h2>
            <p className="text-slate-300 text-sm sm:text-base">
              We govern our worksites and client relations using five unshakeable principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-850 p-8 border border-slate-800 rounded-sm hover:border-amber-500 transition-colors">
              <div className="text-amber-400 mb-4 font-black text-lg">01</div>
              <h4 className="text-lg font-bold mb-2">Unmatched Worksite Safety (OHS)</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                We believe all injuries are preventable. Our full-time Occupational Health and Safety officers maintain detailed on-site hazard registers, perform tool-box safety talks, and inspect safety equipment prior to any shift.
              </p>
            </div>

            <div className="bg-slate-850 p-8 border border-slate-800 rounded-sm hover:border-amber-500 transition-colors">
              <div className="text-amber-400 mb-4 font-black text-lg">02</div>
              <h4 className="text-lg font-bold mb-2">Strict Technical Compliance</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                We design and build strictly within NHBRC requirements, municipal SANS codes, and the South African structural concrete standards. No structural shortcut is ever accepted.
              </p>
            </div>

            <div className="bg-slate-850 p-8 border border-slate-800 rounded-sm hover:border-amber-500 transition-colors">
              <div className="text-amber-400 mb-4 font-black text-lg">03</div>
              <h4 className="text-lg font-bold mb-2">Environmental Stewardship</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                We employ modern earthworks planning, organic dust control, and silent non-explosive chemical splitting solutions to respect surrounding biological habits and reduce site emissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MEET OUR LEADERSHIP & STRUCTURAL AUDITORS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Our Leadership</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1 mb-4">The Minds Behind JK Seko</h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Combining deep structural engineering experience with highly efficient logistics and project compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Member 1 */}
          <div className="bg-white border border-slate-200 rounded-sm shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop" 
                alt="Johannes Seko" 
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
              <div className="absolute top-4 right-4 bg-slate-900 text-amber-400 text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                Founder & Director
              </div>
            </div>
            <div className="p-6 flex-grow">
              <h4 className="text-lg font-black text-slate-900">Johannes Seko</h4>
              <p className="text-amber-600 text-xs font-semibold uppercase tracking-wider mb-4">Managing Director / Project Head</p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                With extensive technical background in civil works project planning, Johannes heads our heavy equipment deployment and maintains key corporate relationships across Gauteng and Mpumalanga.
              </p>
            </div>
          </div>

          {/* Member 2 */}
          <div className="bg-white border border-slate-200 rounded-sm shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" 
                alt="Thandi Seko" 
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
              <div className="absolute top-4 right-4 bg-slate-900 text-amber-400 text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                Compliance & Finance
              </div>
            </div>
            <div className="p-6 flex-grow">
              <h4 className="text-lg font-black text-slate-900">Thandi Seko</h4>
              <p className="text-amber-600 text-xs font-semibold uppercase tracking-wider mb-4">Chief Compliance Officer</p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Oversees our strict health & safety protocols, OHS audit files, CIDB registrations, NHBRC compliance, and manages our Level 1 B-BBEE transformation strategy.
              </p>
            </div>
          </div>

          {/* Member 3 */}
          <div className="bg-white border border-slate-200 rounded-sm shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop" 
                alt="Sipho Sithole" 
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
              <div className="absolute top-4 right-4 bg-slate-900 text-amber-400 text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                Site Management
              </div>
            </div>
            <div className="p-6 flex-grow">
              <h4 className="text-lg font-black text-slate-900">Sipho Sithole</h4>
              <p className="text-amber-600 text-xs font-semibold uppercase tracking-wider mb-4">Lead Site Engineer</p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                A registered professional engineer (Pr.Eng) coordinating structural site inspections, concrete pour audits, soil load-bearing verification, and heavy piling tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: CAPABILITY PACK & COMPANY PROFILE DOWNLOAD SECTION */}
      <section className="py-20 bg-slate-900 text-white border-t border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.08),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Info Column */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Credentials Bundle</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Verified Corporate Documents</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                For governmental preferential procurement departments, principal engineering estimators, and industrial tender boards, we provide instant access to our official registration file pack.
              </p>
              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <CheckCircle size={14} /> Level 1 B-BBEE Contributor Affidavit
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <CheckCircle size={14} /> CIDB Active Registration Grading List
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <CheckCircle size={14} /> NHBRC Certified Building Warranties
                </div>
              </div>
            </div>

            {/* Downloads Cards Column */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 1: Capability & Compliance Pack */}
              <div className="bg-slate-850 border border-slate-800 hover:border-amber-500 transition-all p-6 rounded-sm flex flex-col justify-between h-72">
                <div>
                  <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-sm flex items-center justify-center mb-4">
                    <ClipboardCheck size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Capability & Compliance Pack</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    A consolidated legal file containing B-BBEE affidavits, CIDB records, NHBRC registrations, COIDA letter of good standing, and VAT status.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-850 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">PDF &middot; 4.8 MB</span>
                  <button
                    onClick={handleDownloadPack}
                    disabled={downloadingPack}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm transition-all flex items-center gap-1.5"
                  >
                    {downloadingPack ? 'Generating...' : 'Download Pack'} <FileDown size={14} />
                  </button>
                </div>
              </div>

              {/* Card 2: Company Profile */}
              <div className="bg-slate-850 border border-slate-800 hover:border-amber-500 transition-all p-6 rounded-sm flex flex-col justify-between h-72">
                <div>
                  <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-sm flex items-center justify-center mb-4">
                    <BookOpen size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Corporate Company Profile</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Our official 2026 presentation detailing historical site works, structural capabilities list, machinery roster, and reference letters.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-850 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">PDF &middot; 6.2 MB</span>
                  <button
                    onClick={handleDownloadProfile}
                    disabled={downloadingProfile}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-sm transition-all flex items-center gap-1.5"
                  >
                    {downloadingProfile ? 'Generating...' : 'Download Profile'} <FileDown size={14} />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 6. B-BBEE PROCUREMENT CALLOUT */}
      <section className="bg-slate-100 py-16 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 p-8 md:p-12 shadow-md rounded-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="bg-slate-900 text-amber-400 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm inline-block">
                Procurement Advantage
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Enhance Your Corporate Preferential Procurement Scoring
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Partnering with JK Seko Trading (Level 1 B-BBEE, 100% Black Youth-Owned) permits you to claim 135% of your procurement spend, boosting your enterprise broad-based black economic empowerment ratings under the South African Construction Sector Code.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a 
                href="#contact" 
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-4 rounded-sm text-sm uppercase tracking-wider transition-all inline-block shadow-sm"
              >
                Partner With Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <LeadFunnelForm />
    </div>
  );
}
