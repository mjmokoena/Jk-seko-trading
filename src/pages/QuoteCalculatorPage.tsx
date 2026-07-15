import React, { useState, useEffect } from 'react';
import { 
  Calculator, Check, ArrowRight, RefreshCw, AlertTriangle, HelpCircle, 
  MapPin, ShieldAlert, FileCheck, Hammer, HardHat, Compass, FileText 
} from 'lucide-react';
import { Link } from 'react-router-dom';

type ProjectType = 'civil-earthworks' | 'general-building' | 'steel-trades' | 'rock-breaking';

interface ProvinceRate {
  name: string;
  factor: number; // Regional mobilization factor
}

const provinces: Record<string, ProvinceRate> = {
  gauteng: { name: 'Gauteng (Johannesburg / Pretoria)', factor: 1.0 },
  mpumalanga: { name: 'Mpumalanga (Nelspruit / Witbank)', factor: 1.15 },
  limpopo: { name: 'Limpopo (Polokwane)', factor: 1.2 },
  northwest: { name: 'North West (Rustenburg)', factor: 1.18 },
  freestate: { name: 'Free State (Bloemfontein)', factor: 1.25 }
};

export default function QuoteCalculatorPage() {
  const [projectType, setProjectType] = useState<ProjectType>('civil-earthworks');
  const [province, setProvince] = useState<string>('gauteng');
  
  // State variables for different services
  const [areaSize, setAreaSize] = useState<number>(500); // in m²
  const [soilType, setSoilType] = useState<'stable' | 'expansive-clay' | 'sandy-collapsible'>('stable');
  const [excavationDepth, setExcavationDepth] = useState<number>(1.5); // in meters
  
  const [buildingFloors, setBuildingFloors] = useState<number>(1);
  const [buildingQuality, setBuildingQuality] = useState<'standard-commercial' | 'industrial-warehouse' | 'premium-estate'>('standard-commercial');
  
  const [steelWeight, setSteelWeight] = useState<number>(10); // in tons
  const [hasElectricalCoC, setHasElectricalCoC] = useState<boolean>(true);
  
  const [rockVolume, setRockVolume] = useState<number>(50); // in m³
  const [rockHardness, setRockHardness] = useState<'soft-shale' | 'medium-dolerite' | 'ultra-hard-granite'>('medium-dolerite');
  const [breakingMethod, setBreakingMethod] = useState<'mechanical' | 'silent-chemical' | 'controlled-blasting'>('silent-chemical');

  // Interactive Tabs
  const [activeTab, setActiveTab] = useState<'cost-estimator' | 'material-calculator'>('cost-estimator');

  // Material Calculator States
  const [materialType, setMaterialType] = useState<'concrete' | 'brick'>('concrete');
  
  // Concrete States
  const [concreteLength, setConcreteLength] = useState<number>(10); // m
  const [concreteWidth, setConcreteWidth] = useState<number>(5);   // m
  const [concreteThickness, setConcreteThickness] = useState<number>(0.15); // m (150mm slab)
  const [concreteGrade, setConcreteGrade] = useState<'15mpa' | '25mpa' | '30mpa'>('25mpa');

  // Brick States
  const [brickLength, setBrickLength] = useState<number>(20); // m
  const [brickHeight, setBrickHeight] = useState<number>(3);  // m
  const [brickSkin, setBrickSkin] = useState<'single' | 'double'>('double');

  // Contact sync state
  const [calcSubmitted, setCalcSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  });

  // Calculator outputs state
  const [lineItems, setLineItems] = useState<{ label: string; value: number }[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [estimatedDays, setEstimatedDays] = useState<number>(0);
  const [beeProcurementBenefit, setBeeProcurementBenefit] = useState<number>(0);

  // Recalculate cost whenever input variables change
  useEffect(() => {
    let items: { label: string; value: number }[] = [];
    let baseMobilization = 15000; // Base transport / setup fee
    let laborRate = 0;
    let materialCost = 0;
    let machineryCost = 0;
    let complianceFee = 12500; // NHBRC/SANS and OHS audit setup
    let duration = 5;

    const mobFactor = provinces[province]?.factor || 1.0;
    const adjustedMobilization = baseMobilization * mobFactor;

    items.push({ label: 'Site Mobilization & Heavy Fleet Logistics', value: adjustedMobilization });

    if (projectType === 'civil-earthworks') {
      // Civil Earthworks Math
      // Area size and depth determine volume
      const volume = areaSize * excavationDepth;
      
      // Soil factor affects excavation complexity
      let soilMultiplier = 1.0;
      if (soilType === 'expansive-clay') soilMultiplier = 1.45;
      if (soilType === 'sandy-collapsible') soilMultiplier = 1.3;

      machineryCost = volume * 42 * soilMultiplier; // R42 per m³ for mechanical diggers & fuel
      laborRate = areaSize * 15; // R15 per m² for on-site crew and spotters
      materialCost = volume * 28; // Backfill soil, sub-base gravel aggregate
      
      duration = Math.ceil((volume / 250) + 3); // Approx 250m³ moved per day + setup

      items.push({ label: `Heavy Machinery (Excavator/TLB) Hire & Fuel (${volume.toFixed(0)}m³ dynamic volume)`, value: machineryCost });
      items.push({ label: 'On-Site Geotechnical Crew & Labor', value: laborRate });
      items.push({ label: 'Engineered Soil Stabilization & Aggregate Fill', value: materialCost });

    } else if (projectType === 'general-building') {
      // General Building Math
      let baseRatePerM2 = 8200; // Average R8200/m² basic commercial rate
      if (buildingQuality === 'industrial-warehouse') baseRatePerM2 = 6500;
      if (buildingQuality === 'premium-estate') baseRatePerM2 = 12500;

      const totalBuildArea = areaSize * buildingFloors;
      materialCost = totalBuildArea * baseRatePerM2 * 0.55; // 55% materials
      laborRate = totalBuildArea * baseRatePerM2 * 0.35; // 35% skilled masonry & bricklayers
      machineryCost = totalBuildArea * baseRatePerM2 * 0.1; // 10% scaffolding & mixers
      complianceFee = 25000 * buildingFloors; // NHBRC registration scales with size

      duration = Math.ceil((totalBuildArea / 12) + 15); // Approx 12m² constructed per day

      items.push({ label: `SANS 10400 Certified Materials & Brickwork (${totalBuildArea.toFixed(0)}m² total area)`, value: materialCost });
      items.push({ label: 'NHBRC Registered Skilled Building Artisans', value: laborRate });
      items.push({ label: 'Scaffolding, Concrete Mixers & Lifting Plant', value: machineryCost });

    } else if (projectType === 'steel-trades') {
      // Structural Steel & Trades Math
      const baseSteelCostPerTon = 28000; // R28,000 per fabricated ton
      materialCost = steelWeight * baseSteelCostPerTon;
      laborRate = steelWeight * 8500; // Fabrication and rigging crew
      machineryCost = steelWeight * 3500; // Crane rental and rigging rigs

      if (hasElectricalCoC) {
        laborRate += 22000; // Certified electrician fee
        complianceFee += 6500; // CoC testing & legal documentation
      }

      duration = Math.ceil((steelWeight * 1.5) + 4);

      items.push({ label: `Fabricated Structural Steel & Trusses (${steelWeight} Tons)`, value: materialCost });
      items.push({ label: 'Rigging, Welding, & Assembly Crew Labor', value: laborRate });
      items.push({ label: 'Heavy Crane Lift & Transport Hire', value: machineryCost });

    } else if (projectType === 'rock-breaking') {
      // Rock Breaking Math
      let hardnessFactor = 1.0;
      if (rockHardness === 'medium-dolerite') hardnessFactor = 1.4;
      if (rockHardness === 'ultra-hard-granite') hardnessFactor = 2.1;

      let methodCostPerM3 = 350; // Mechanical hydraulic pecker default
      if (breakingMethod === 'silent-chemical') methodCostPerM3 = 580; // chemical mortar is premium
      if (breakingMethod === 'controlled-blasting') methodCostPerM3 = 750; // explosives licensing and seismic monitoring is high

      machineryCost = rockVolume * methodCostPerM3 * hardnessFactor;
      laborRate = rockVolume * 120; // Specialized drilling & hand-tool operators
      complianceFee = breakingMethod === 'controlled-blasting' ? 45000 : 15000; // blasting permit & vibration monitoring is premium

      duration = Math.ceil((rockVolume / 20) * hardnessFactor + 2);

      items.push({ label: `Rock Fracturing (${breakingMethod.replace('-', ' ')} breaking method)`, value: machineryCost });
      items.push({ label: 'Precision Pneumatic Drilling & Crew Labor', value: laborRate });
    }

    items.push({ label: 'OHS Audit File & SANS Quality Inspections', value: complianceFee });

    const total = items.reduce((acc, curr) => acc + curr.value, 0);
    // B-BBEE Procurement saving - 135% credit of project spend value is earned by the client
    const beeBenefit = total * 1.35;

    setLineItems(items);
    setSubtotal(total);
    setEstimatedDays(duration);
    setBeeProcurementBenefit(beeBenefit);
  }, [projectType, province, areaSize, soilType, excavationDepth, buildingFloors, buildingQuality, steelWeight, hasElectricalCoC, rockVolume, rockHardness, breakingMethod]);

  const handleSubmitEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out the required contact information to submit your estimate.');
      return;
    }
    // Simulate API posting or hook into local LeadFunnelForm
    setCalcSubmitted(true);
  };

  // Concrete calculation logic
  const concreteVolume = concreteLength * concreteWidth * concreteThickness; // m³
  let cementBagsCon = 0;
  let sandVolCon = 0;
  let stoneVolCon = 0;

  if (concreteGrade === '15mpa') {
    cementBagsCon = Math.ceil(concreteVolume * 5.6);
    sandVolCon = concreteVolume * 0.63;
    stoneVolCon = concreteVolume * 0.63;
  } else if (concreteGrade === '25mpa') {
    cementBagsCon = Math.ceil(concreteVolume * 7.8);
    sandVolCon = concreteVolume * 0.54;
    stoneVolCon = concreteVolume * 0.54;
  } else {
    // 30mpa
    cementBagsCon = Math.ceil(concreteVolume * 9.4);
    sandVolCon = concreteVolume * 0.51;
    stoneVolCon = concreteVolume * 0.51;
  }

  const concreteCementCost = cementBagsCon * 115; // R115 per bag
  const concreteSandCost = sandVolCon * 360;    // R360 per m³
  const concreteStoneCost = stoneVolCon * 490;   // R490 per m³
  const concreteTotalCost = concreteCementCost + concreteSandCost + concreteStoneCost;

  // Brick calculation logic
  const wallArea = brickLength * brickHeight; // m²
  const brickMultiplier = brickSkin === 'single' ? 55 : 110;
  const rawBricks = wallArea * brickMultiplier;
  const totalBricks = Math.ceil(rawBricks * 1.05); // 5% wastage

  const mortarVolume = wallArea * (brickSkin === 'single' ? 0.02 : 0.04); // m³
  const cementBagsBrick = Math.ceil(mortarVolume * 8.5);
  const sandVolBrick = mortarVolume * 1.1;

  const brickUnitCost = 2.90; // R2.90 per clay face brick
  const brickMaterialCost = totalBricks * brickUnitCost;
  const brickCementCost = cementBagsBrick * 115;
  const brickSandCost = sandVolBrick * 360;
  const brickTotalCost = brickMaterialCost + brickCementCost + brickSandCost;

  const getCalculatorTitle = () => {
    switch (projectType) {
      case 'civil-earthworks': return 'Bulk Earthworks & Site Prep Calculator';
      case 'general-building': return 'Commercial Turnkey Building Calculator';
      case 'steel-trades': return 'Structural Steel & Trades Estimator';
      case 'rock-breaking': return 'Geotechnical Rock Breaking Estimator';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. EDITORIAL BANNER */}
      <div className="bg-slate-900 text-white py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_120%,rgba(245,158,11,0.12),rgba(255,255,255,0))]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-3 block">Engineering Tool</span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">Construction & Civil Estimate Calculator</h1>
            <p className="text-slate-300 text-lg">
              Generate an instant, real-time cost breakdown customized to South African SANS building standards, mobilization indices, and regional geological factors.
            </p>
          </div>
        </div>
      </div>

      {/* 2. MAIN CALCULATOR AND RESULT INTERFACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* INTERACTIVE TABS */}
        <div className="flex border-b border-slate-200 mb-10 max-w-md bg-white p-1 rounded-sm shadow-xs border">
          <button
            type="button"
            onClick={() => { setActiveTab('cost-estimator'); setCalcSubmitted(false); }}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-wider text-center transition-all rounded-xs ${
              activeTab === 'cost-estimator'
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Cost Estimator
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('material-calculator'); setCalcSubmitted(false); }}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-wider text-center transition-all rounded-xs ${
              activeTab === 'material-calculator'
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Material Calculator
          </button>
        </div>

        {activeTab === 'cost-estimator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* CALCULATOR SETTINGS PANEL (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 shadow-xl rounded-sm p-6 sm:p-10 space-y-10">
            
            {/* Project Category Picker */}
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 block">1. Select Project Classification</label>
              <div className="grid grid-cols-2 gap-4">
                {(['civil-earthworks', 'general-building', 'steel-trades', 'rock-breaking'] as ProjectType[]).map((type) => {
                  const isActive = projectType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setProjectType(type)}
                      className={`text-left p-4 border rounded-sm transition-all flex flex-col justify-between h-28 ${
                        isActive 
                          ? 'border-amber-500 bg-amber-500/5 ring-1 ring-amber-500' 
                          : 'border-slate-200 hover:border-slate-400 bg-white'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-amber-500 text-slate-900' : 'bg-slate-100 text-slate-600'}`}>
                        {type === 'civil-earthworks' && <Compass size={16} />}
                        {type === 'general-building' && <Hammer size={16} />}
                        {type === 'steel-trades' && <HardHat size={16} />}
                        {type === 'rock-breaking' && <ShieldAlert size={16} />}
                      </span>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm capitalize mt-2">
                        {type.replace('-', ' ')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Regional Province Factor */}
            <div>
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">2. Site Location (South Africa)</label>
              <div className="relative">
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-sm px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all font-semibold text-slate-800"
                >
                  {Object.entries(provinces).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.name} {value.factor > 1.0 ? `(+${Math.round((value.factor - 1) * 100)}% remote premium)` : '(Base Rate)'}
                    </option>
                  ))}
                </select>
                <MapPin className="absolute right-4 top-3 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Dynamic Inputs per project category */}
            <div className="border-t border-slate-100 pt-8 space-y-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Calculator className="text-amber-500" size={20} /> {getCalculatorTitle()}
              </h3>

              {/* A. CIVIL EARTHWORKS INPUTS */}
              {projectType === 'civil-earthworks' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Site Area Footprint (m²)</label>
                      <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-sm">{areaSize} m²</span>
                    </div>
                    <input 
                      type="range" 
                      min="100" 
                      max="15000" 
                      step="100"
                      value={areaSize}
                      onChange={(e) => setAreaSize(parseInt(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-bold mt-1">
                      <span>100 m²</span>
                      <span>5,000 m²</span>
                      <span>15,000 m² (Commercial Site)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Estimated Excavation Depth (m)</label>
                      <select
                        value={excavationDepth}
                        onChange={(e) => setExcavationDepth(parseFloat(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-sm px-3 py-2.5 text-xs font-semibold text-slate-800"
                      >
                        <option value={0.5}>0.5m (Surface Scrape / Level)</option>
                        <option value={1.5}>1.5m (Standard Foundations)</option>
                        <option value={3.0}>3.0m (Deep Structural Piling)</option>
                        <option value={5.0}>5.0m (Subterranean Excavation)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Soil Classification Factor</label>
                      <select
                        value={soilType}
                        onChange={(e) => setSoilType(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-sm px-3 py-2.5 text-xs font-semibold text-slate-800"
                      >
                        <option value="stable">Stable Red Soil / Shale</option>
                        <option value="expansive-clay">Expansive High-Clay (+45% complexity)</option>
                        <option value="sandy-collapsible">Collapsible Sands (+30% complexity)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* B. GENERAL BUILDING INPUTS */}
              {projectType === 'general-building' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Ground Floor Footprint (m²)</label>
                      <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-sm">{areaSize} m²</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="3000" 
                      step="50"
                      value={areaSize}
                      onChange={(e) => setAreaSize(parseInt(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-bold mt-1">
                      <span>50 m²</span>
                      <span>1,500 m²</span>
                      <span>3,000 m²</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Number of Stories</label>
                      <select
                        value={buildingFloors}
                        onChange={(e) => setBuildingFloors(parseInt(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-sm px-3 py-2.5 text-xs font-semibold text-slate-800"
                      >
                        <option value={1}>Single-Story Build</option>
                        <option value={2}>Double-Story Complex</option>
                        <option value={3}>Three-Story Commercial Footprint</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Construction Class Style</label>
                      <select
                        value={buildingQuality}
                        onChange={(e) => setBuildingQuality(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-sm px-3 py-2.5 text-xs font-semibold text-slate-800"
                      >
                        <option value="industrial-warehouse">Industrial Portal Frame Steel Warehouse</option>
                        <option value="standard-commercial">Standard SANS-Approved Office / Retail Complex</option>
                        <option value="premium-estate">Premium Multi-Unit Housing & luxury finish</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* C. INDUSTRIAL TRADES INPUTS */}
              {projectType === 'steel-trades' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Estimated Steel Weight (Tons)</label>
                      <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-sm">{steelWeight} Tons</span>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max="150" 
                      step="1"
                      value={steelWeight}
                      onChange={(e) => setSteelWeight(parseInt(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-bold mt-1">
                      <span>2 Tons (Light Frame)</span>
                      <span>75 Tons</span>
                      <span>150 Tons (Heavy Industrial)</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-sm flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm">Include Industrial Electrical CoC Grid</h5>
                      <p className="text-slate-500 text-[11px] sm:text-xs">Certified three-phase panel boards & site wiring files</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={hasElectricalCoC}
                      onChange={(e) => setHasElectricalCoC(e.target.checked)}
                      className="w-5 h-5 accent-amber-500 cursor-pointer rounded-sm"
                    />
                  </div>
                </div>
              )}

              {/* D. ROCK BREAKING INPUTS */}
              {projectType === 'rock-breaking' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Rubble / Bedrock Volume (m³)</label>
                      <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-sm">{rockVolume} m³</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="1200" 
                      step="10"
                      value={rockVolume}
                      onChange={(e) => setRockVolume(parseInt(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-bold mt-1">
                      <span>10 m³</span>
                      <span>600 m³</span>
                      <span>1,200 m³ (Heavy Bedrock)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Geological Hardness Class</label>
                      <select
                        value={rockHardness}
                        onChange={(e) => setRockHardness(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-sm px-3 py-2.5 text-xs font-semibold text-slate-800"
                      >
                        <option value="soft-shale">Fractured Sandstone / Shale</option>
                        <option value="medium-dolerite">Dense Dolerite Outcrops (+40% wear)</option>
                        <option value="ultra-hard-granite">High-Quartz Granite Bedrock (+110% wear)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Deploying Extraction Method</label>
                      <select
                        value={breakingMethod}
                        onChange={(e) => setBreakingMethod(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-sm px-3 py-2.5 text-xs font-semibold text-slate-800"
                      >
                        <option value="silent-chemical">Silent Chemical Expansive Mortar (Sensitive site)</option>
                        <option value="mechanical">Mechanical Hydraulic Heavy Hammer (Fast open site)</option>
                        <option value="controlled-blasting">Controlled Precision Micro-Blasting (Deep Quarry)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DYNAMIC BREAKDOWN PANEL (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900 text-white border border-slate-850 shadow-2xl rounded-sm p-6 sm:p-8 space-y-8 sticky top-28">
            <div>
              <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Cost Estimation Model</span>
              <h3 className="text-2xl font-black tracking-tight mt-1">Dynamic SANS Price Model</h3>
            </div>

            {/* Line Items Breakdown */}
            <div className="space-y-4 border-b border-white/10 pb-6">
              {lineItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4 text-xs sm:text-sm">
                  <span className="text-slate-300 leading-relaxed">{item.label}</span>
                  <span className="font-mono font-bold text-white whitespace-nowrap">
                    R {item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtotal Display */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Estimated Subtotal</span>
                <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                  R {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 italic">
                *Estimated project cost, excluding VAT. Final sign-off is subject to mechanical soil and structural blueprint verification.
              </p>
            </div>

            {/* Schedule and B-BBEE Indicators */}
            <div className="grid grid-cols-2 gap-4 bg-slate-850 p-4 border border-slate-800 rounded-sm">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Project Duration</p>
                <p className="text-lg font-black text-white">{estimatedDays} Working Days</p>
                <p className="text-[9px] text-slate-400 leading-tight">Subject to municipal clearance files</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Preferential Procurement</p>
                <p className="text-lg font-black text-emerald-400">135% Claimable</p>
                <p className="text-[9px] text-slate-400 leading-tight">Claim R {(beeProcurementBenefit).toLocaleString(undefined, { maximumFractionDigits: 0 })} B-BBEE credits</p>
              </div>
            </div>

            {/* SUBMIT CALCULATION DIRECTLY TO EXPERTS FORM (But does not replace standard form!) */}
            <div className="border-t border-white/10 pt-6">
              {calcSubmitted ? (
                <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-sm text-center">
                  <FileCheck size={32} className="text-emerald-400 mx-auto mb-2" />
                  <h4 className="font-bold text-white text-sm mb-1">Estimate Sent to Engineers!</h4>
                  <p className="text-slate-300 text-xs">
                    Our technical lead (Johannes Seko) will review this R {subtotal.toLocaleString(undefined, { maximumFractionDigits: 0 })} model and contact you back within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitEstimate} className="space-y-4">
                  <h4 className="text-xs font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
                    <FileText size={14} /> Link & Submit Estimate to Technical Lead
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Enter your contact details below to send this dynamic calculation model directly to our engineering division for a certified, SANS-compliant written proposal.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Contact Name *" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-slate-800 border border-slate-700 text-white rounded-sm px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 outline-none w-full"
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address *" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-slate-800 border border-slate-700 text-white rounded-sm px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 outline-none w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="Phone Number *" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-slate-800 border border-slate-700 text-white rounded-sm px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 outline-none w-full"
                    />
                    <input 
                      type="text" 
                      placeholder="Company Name (Optional)" 
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-slate-800 border border-slate-700 text-white rounded-sm px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 outline-none w-full"
                    />
                  </div>

                  <textarea 
                    rows={2}
                    placeholder="Specific site notes, soil condition or municipal requirements..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="bg-slate-800 border border-slate-700 text-white rounded-sm p-3 text-xs focus:ring-1 focus:ring-amber-500 outline-none w-full block"
                  />

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 text-center rounded-sm text-xs uppercase tracking-widest transition-all"
                  >
                    Submit Calculator Model for Sign-Off
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Panel - Inputs (7 Cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 shadow-xl rounded-sm p-6 sm:p-10 space-y-8">
              <div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Calculator className="text-amber-500" size={24} /> SANS 10400 Material Volume Estimator
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                  Accurately estimate bags of cement, cubic meters of sand, stones, and brick quantities according to standard South African building specifications.
                </p>
              </div>

              {/* Material Type Selector */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setMaterialType('concrete')}
                  className={`p-4 border rounded-sm text-center transition-all flex flex-col items-center justify-center gap-2 ${
                    materialType === 'concrete'
                      ? 'border-amber-500 bg-amber-500/5 ring-1 ring-amber-500'
                      : 'border-slate-200 hover:border-amber-300 bg-white'
                  }`}
                >
                  <span className="font-black text-xs uppercase tracking-wider text-slate-900">Concrete Slab / Footing</span>
                  <span className="text-[10px] text-slate-400">Piles, slabs, pavers, blinding</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMaterialType('brick')}
                  className={`p-4 border rounded-sm text-center transition-all flex flex-col items-center justify-center gap-2 ${
                    materialType === 'brick'
                      ? 'border-amber-500 bg-amber-500/5 ring-1 ring-amber-500'
                      : 'border-slate-200 hover:border-amber-300 bg-white'
                  }`}
                >
                  <span className="font-black text-xs uppercase tracking-wider text-slate-900">Brick Wall & Mortar</span>
                  <span className="text-[10px] text-slate-400">Boundary, structural, retaining walls</span>
                </button>
              </div>

              {/* CONCRETE FORM FIELDS */}
              {materialType === 'concrete' && (
                <div className="space-y-6 pt-4 border-t border-slate-100">
                  {/* Length */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Length of Slab / Trench (meters)</label>
                      <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-sm">{concreteLength} m</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      step="0.5"
                      value={concreteLength}
                      onChange={(e) => setConcreteLength(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                    />
                  </div>

                  {/* Width */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Width of Slab / Trench (meters)</label>
                      <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-sm">{concreteWidth} m</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="50"
                      step="0.1"
                      value={concreteWidth}
                      onChange={(e) => setConcreteWidth(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                    />
                  </div>

                  {/* Thickness */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Thickness / Depth of Pour (meters)</label>
                      <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-sm">{(concreteThickness * 1000).toFixed(0)} mm ({(concreteThickness).toFixed(2)}m)</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="1.50"
                      step="0.05"
                      value={concreteThickness}
                      onChange={(e) => setConcreteThickness(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Standard pedestrian walkways: 75-100mm. Slabs & driveways: 100-150mm. Structural footings: 300mm+.</p>
                  </div>

                  {/* Concrete Grade */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block">Concrete Structural Grade (SANS 1200)</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { val: '15mpa', label: '15 MPa (Blinding)', desc: '1:3:4 mix. For non-structural trenches, mass fillings' },
                        { val: '25mpa', label: '25 MPa (Structural)', desc: '1:2:3 mix. For floor slabs, driveways, house foundations' },
                        { val: '30mpa', label: '30 MPa (Heavy paving)', desc: '1:1.5:2 mix. For commercial pavement, heavy machinery pads' }
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setConcreteGrade(item.val as any)}
                          className={`p-3 border rounded-sm text-left transition-all flex flex-col justify-between h-32 ${
                            concreteGrade === item.val
                              ? 'border-amber-500 bg-amber-500/5 ring-1 ring-amber-500'
                              : 'border-slate-200 hover:border-amber-300 bg-white'
                          }`}
                        >
                          <span className="font-bold text-slate-900 text-xs">{item.label}</span>
                          <span className="text-[9px] text-slate-400 mt-2 leading-tight">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* BRICK FORM FIELDS */}
              {materialType === 'brick' && (
                <div className="space-y-6 pt-4 border-t border-slate-100">
                  {/* Length */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Total Length of Wall (meters)</label>
                      <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-sm">{brickLength} m</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="500"
                      step="1"
                      value={brickLength}
                      onChange={(e) => setBrickLength(parseInt(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                    />
                  </div>

                  {/* Height */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Total Height of Wall (meters)</label>
                      <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2 py-0.5 rounded-sm">{brickHeight} m</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="10"
                      step="0.1"
                      value={brickHeight}
                      onChange={(e) => setBrickHeight(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                    />
                  </div>

                  {/* Skin Thickness */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block">Wall Thickness (SANS 10400 PART K)</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setBrickSkin('single')}
                        className={`p-4 border rounded-sm text-left transition-all flex flex-col justify-between h-24 ${
                          brickSkin === 'single'
                            ? 'border-amber-500 bg-amber-500/5 ring-1 ring-amber-500'
                            : 'border-slate-200 hover:border-amber-300 bg-white'
                        }`}
                      >
                        <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">Single Skin (110mm / Half Brick)</span>
                        <span className="text-[10px] text-slate-400 mt-2 leading-tight">Requires ~55 bricks per m² (boundary / partition walls)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setBrickSkin('double')}
                        className={`p-4 border rounded-sm text-left transition-all flex flex-col justify-between h-24 ${
                          brickSkin === 'double'
                            ? 'border-amber-500 bg-amber-500/5 ring-1 ring-amber-500'
                            : 'border-slate-200 hover:border-amber-300 bg-white'
                        }`}
                      >
                        <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">Double Skin (220mm / Full Brick)</span>
                        <span className="text-[10px] text-slate-400 mt-2 leading-tight">Requires ~110 bricks per m² (external load-bearing, wet zone walls)</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel - Outputs (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900 text-white border border-slate-850 shadow-2xl rounded-sm p-6 sm:p-8 space-y-8 sticky top-28">
              <div>
                <span className="text-amber-500 font-bold uppercase tracking-widest text-xs">Material Quantities Output</span>
                <h3 className="text-2xl font-black tracking-tight mt-1">SANS Standard Yield</h3>
              </div>

              {materialType === 'concrete' ? (
                <div className="space-y-6">
                  {/* Volume display */}
                  <div className="bg-slate-850 p-4 border border-slate-850 rounded-sm">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Concrete Yield Required</p>
                    <p className="text-2xl font-black text-amber-400 font-mono">{concreteVolume.toFixed(2)} m³</p>
                    <p className="text-[9px] text-slate-400 leading-tight mt-1">Volume includes raw compaction & standard strike factors.</p>
                  </div>

                  {/* Components Lists */}
                  <div className="space-y-4 border-b border-white/10 pb-6">
                    <h4 className="text-xs uppercase font-black text-slate-400 tracking-wider">SANS Mix Ratio Yield</h4>
                    
                    {/* Cement */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">Portland Cement (50kg bags)</span>
                        <span className="text-[10px] text-slate-400">Est. R {concreteCementCost.toLocaleString()} @ R115/bag</span>
                      </div>
                      <span className="font-mono font-bold text-amber-400 text-lg">{cementBagsCon} Bags</span>
                    </div>

                    {/* Sand */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">Builders / Rivers Sand</span>
                        <span className="text-[10px] text-slate-400">Est. R {Math.round(concreteSandCost).toLocaleString()} @ R360/m³</span>
                      </div>
                      <span className="font-mono font-bold text-slate-200 text-md">{sandVolCon.toFixed(2)} m³</span>
                    </div>

                    {/* Stone */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">19mm Coarse Aggregate Stone</span>
                        <span className="text-[10px] text-slate-400">Est. R {Math.round(concreteStoneCost).toLocaleString()} @ R490/m³</span>
                      </div>
                      <span className="font-mono font-bold text-slate-200 text-md">{stoneVolCon.toFixed(2)} m³</span>
                    </div>
                  </div>

                  {/* Aggregate Cost Card */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Est. Retail Material Cost</span>
                      <span className="text-3xl font-black text-emerald-400 font-mono">
                        R {concreteTotalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 italic">
                      *Estimated bulk materials cost only. Excludes reinforcement rebar steel, mesh wire, formwork labor and delivery transport.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Area display */}
                  <div className="bg-slate-850 p-4 border border-slate-850 rounded-sm">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Wall Area Footprint</p>
                    <p className="text-2xl font-black text-amber-400 font-mono">{wallArea.toFixed(1)} m²</p>
                    <p className="text-[9px] text-slate-400 leading-tight mt-1">Based on {brickLength}m Length x {brickHeight}m Height.</p>
                  </div>

                  {/* Components Lists */}
                  <div className="space-y-4 border-b border-white/10 pb-6">
                    <h4 className="text-xs uppercase font-black text-slate-400 tracking-wider">Materials Breakdown</h4>
                    
                    {/* Bricks */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">Standard Clay Bricks</span>
                        <span className="text-[10px] text-slate-400">Est. R {brickMaterialCost.toLocaleString()} @ R2.90/brick (5% waste incl.)</span>
                      </div>
                      <span className="font-mono font-bold text-amber-400 text-lg">{totalBricks.toLocaleString()} Units</span>
                    </div>

                    {/* Mortar Cement */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">Mortar Cement (50kg bags)</span>
                        <span className="text-[10px] text-slate-400">Est. R {brickCementCost.toLocaleString()} @ R115/bag</span>
                      </div>
                      <span className="font-mono font-bold text-slate-200 text-md">{cementBagsBrick} Bags</span>
                    </div>

                    {/* Builders Sand */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">Mortar Builders Sand</span>
                        <span className="text-[10px] text-slate-400">Est. R {Math.round(brickSandCost).toLocaleString()} @ R360/m³</span>
                      </div>
                      <span className="font-mono font-bold text-slate-200 text-md">{sandVolBrick.toFixed(2)} m³</span>
                    </div>
                  </div>

                  {/* Aggregate Cost Card */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Est. Retail Material Cost</span>
                      <span className="text-3xl font-black text-emerald-400 font-mono">
                        R {brickTotalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 italic">
                      *Estimated materials cost only. Excludes bricklaying labor cost, wall-ties, lintels, damp-proof course (DPC) and delivery transport.
                    </p>
                  </div>
                </div>
              )}

              {/* Form inside Material Calculator */}
              <div className="border-t border-white/10 pt-6">
                {calcSubmitted ? (
                  <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-sm text-center">
                    <FileCheck size={32} className="text-emerald-400 mx-auto mb-2" />
                    <h4 className="font-bold text-white text-sm mb-1">Material Bill Sent to Estimators!</h4>
                    <p className="text-slate-300 text-xs">
                      We will compile a formal quote including material delivery transport & construction labor options, and email it to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitEstimate} className="space-y-4">
                    <h4 className="text-xs font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
                      <FileText size={14} /> Request Material Supply Quote
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Need these materials delivered directly to your site in Gauteng or Mpumalanga? Submit these details to get bulk discount pricing.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="Contact Name *" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-slate-800 border border-slate-700 text-white rounded-sm px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 outline-none w-full"
                      />
                      <input 
                        type="email" 
                        placeholder="Email Address *" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-slate-800 border border-slate-700 text-white rounded-sm px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 outline-none w-full"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="Phone Number *" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-slate-800 border border-slate-700 text-white rounded-sm px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 outline-none w-full"
                      />
                      <input 
                        type="text" 
                        placeholder="Company Name" 
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="bg-slate-800 border border-slate-700 text-white rounded-sm px-3 py-2 text-xs focus:ring-1 focus:ring-amber-500 outline-none w-full"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 text-center rounded-sm text-xs uppercase tracking-widest transition-all"
                    >
                      Get Certified Materials Quote
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
