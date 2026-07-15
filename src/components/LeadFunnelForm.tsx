import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight, ChevronLeft, Upload } from 'lucide-react';

export default function LeadFunnelForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    timeline: '',
    location: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    comments: '',
    fileName: ''
  });

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, fileName: file.name }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would POST to HubSpot / CRM
    console.log('Payload pushed to CRM:', formData);
    
    // Call Google Analytics conversion event
    if (typeof (window as any).trackLeadConversion === 'function') {
      (window as any).trackLeadConversion('Standard Funnel Form', formData.serviceType || 'Not Specified');
    }

    // Call HubSpot Custom Event if user wants to integration
    if (typeof (window as any).trackHubSpotConversion === 'function') {
      (window as any).trackHubSpotConversion('Form Submission', formData);
    }

    alert('Thank you! Our project managers will contact you shortly.');
  };

  return (
    <section className="py-24 bg-white" id="contact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl mb-4">
            Request a Project Quote
          </h2>
          <p className="text-lg text-slate-600">
            Provide your project details and our team will prepare a structured proposal.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-sm p-8 md:p-12 shadow-xl">
          {/* Progress Bar */}
          <div className="mb-8 relative">
            <div className="h-2 bg-slate-200 rounded-full w-full">
              <motion.div 
                className="h-2 bg-amber-500 rounded-full"
                initial={{ width: '25%' }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span className={step >= 1 ? 'text-amber-600' : ''}>Service</span>
              <span className={step >= 2 ? 'text-amber-600' : ''}>Timeline</span>
              <span className={step >= 3 ? 'text-amber-600' : ''}>Location</span>
              <span className={step >= 4 ? 'text-amber-600' : ''}>Contact</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="min-h-[300px] flex flex-col">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="flex-grow"
                >
              <h3 className="text-xl font-bold text-slate-900 mb-6">What type of service do you require?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Civil Works', 'Commercial Construction', 'Residential Build', 'Rock Breaking / Blasting'].map(opt => (
                      <div 
                        key={opt}
                        onClick={() => { updateForm('serviceType', opt); nextStep(); }}
                        className={`p-4 border-2 rounded-sm cursor-pointer transition-all flex justify-between items-center ${
                          formData.serviceType === opt ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-amber-300 bg-white'
                        }`}
                      >
                        <span className="font-semibold text-slate-700">{opt}</span>
                        {formData.serviceType === opt && <Check className="text-amber-500" size={20} />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="flex-grow"
                >
              <h3 className="text-xl font-bold text-slate-900 mb-6">When do you need to start?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Immediately (Emergency)', 'Within 1-3 Months', '3-6 Months', 'Planning Phase (6+ Months)'].map(opt => (
                      <div 
                        key={opt}
                        onClick={() => { updateForm('timeline', opt); nextStep(); }}
                        className={`p-4 border-2 rounded-sm cursor-pointer transition-all flex justify-between items-center ${
                          formData.timeline === opt ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-amber-300 bg-white'
                        }`}
                      >
                        <span className="font-semibold text-slate-700">{opt}</span>
                        {formData.timeline === opt && <Check className="text-amber-500" size={20} />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="flex-grow"
                >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Where is the project located?</h3>
              <div className="space-y-4">
                <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">City / Province</label>
                      <input 
                        type="text" 
                        value={formData.location}
                        onChange={(e) => updateForm('location', e.target.value)}
                        className="w-full p-4 border border-slate-300 rounded-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                        placeholder="e.g. Johannesburg, Gauteng"
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="flex-grow"
                >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Your Contact Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => updateForm('name', e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-sm focus:ring-2 focus:ring-amber-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={(e) => updateForm('company', e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-sm focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-sm focus:ring-2 focus:ring-amber-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-sm focus:ring-2 focus:ring-amber-500 outline-none"
                        required
                      />
                    </div>

                    <div className="sm:col-span-2 mt-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Project Notes / Comments (Optional)</label>
                      <textarea 
                        rows={3}
                        value={formData.comments}
                        onChange={(e) => updateForm('comments', e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-sm focus:ring-2 focus:ring-amber-500 outline-none text-sm"
                        placeholder="Describe any custom requirements, structural details, or special requests..."
                      />
                    </div>

                    <div className="sm:col-span-2 mt-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Upload Building Plan / Scope Document (Optional)</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-sm p-4 bg-white hover:bg-slate-50 transition-colors flex flex-col items-center justify-center text-center relative cursor-pointer group">
                        <input 
                          type="file" 
                          accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.doc,.docx"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                        />
                        <Upload className="text-slate-400 group-hover:text-amber-500 transition-colors mb-2" size={28} />
                        {formData.fileName ? (
                          <div>
                            <p className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1">
                              <Check className="text-emerald-500" size={16} /> {formData.fileName}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">Click or drag to replace file</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-xs font-bold text-slate-600">Drag & drop your files here, or click to browse</p>
                            <p className="text-[10px] text-slate-400 mt-1">Supports PDF, DWG, CAD, JPG, PNG or DOC (Max 25MB)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-200">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="flex items-center text-slate-600 hover:text-slate-900 font-bold">
                  <ChevronLeft size={20} className="mr-1" /> Back
                </button>
              ) : <div></div>}

              {step < 4 ? (
                <button 
                  type="button" 
                  onClick={nextStep} 
                  disabled={
                    (step === 1 && !formData.serviceType) || 
                    (step === 2 && !formData.timeline) || 
                    (step === 3 && !formData.location)
                  }
                  className="flex items-center bg-slate-900 text-white px-8 py-3 rounded-sm font-bold hover:bg-amber-500 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue <ChevronRight size={20} className="ml-1" />
                </button>
              ) : (
                <button 
                  type="submit"
                  className="flex items-center bg-amber-500 text-slate-900 px-8 py-3 rounded-sm font-bold hover:bg-amber-600 transition-colors shadow-lg"
                >
                  Get Your Free Quote <Check size={20} className="ml-2" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
