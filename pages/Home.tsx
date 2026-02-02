
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReportResult } from '../types';

const Home: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [recentGems, setRecentGems] = useState<ReportResult[]>([]);
  const navigate = useNavigate();

  // Primary local assets provided by the user
  const gemAssets = {
    vibrantPile: './VibrantPile.png',
    blueFaceted: './blueFated.png',
    lightBlueGem: './lightBlueGem.jpg'
  };

  // High-quality diamond jewelry fallbacks
  const fallbacks = {
    jewelry: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000",
    diamond: "https://images.unsplash.com/photo-1584308666744-24d5ec76b9c1?auto=format&fit=crop&q=80&w=1000",
    collection: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80&w=1000"
  };

  // Fetch recent registrations from the DB
  useEffect(() => {
    const loadRecentGems = () => {
      const savedGems = localStorage.getItem('hk_gems_db');
      if (savedGems) {
        const allGems: ReportResult[] = JSON.parse(savedGems);
        // Take the 3 most recent entries
        setRecentGems(allGems.slice(0, 3));
      }
    };

    loadRecentGems();
    // Listen for storage changes in case admin updates in another tab
    window.addEventListener('storage', loadRecentGems);
    return () => window.removeEventListener('storage', loadRecentGems);
  }, []);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      navigate('/reports', { state: { initialReportId: searchId } });
    }
  };

  // Default display if no admin data exists
  const defaultLedger = [
    { 
      id: "DIA-772", 
      stoneName: "Brilliant Aqua", 
      imageUrl: gemAssets.lightBlueGem,
      comments: "High-refraction structural appraisal.",
      stoneType: "Diamond"
    },
    { 
      id: "SAP-901", 
      stoneName: "Royal Facets", 
      imageUrl: gemAssets.blueFaceted,
      comments: "Color saturation & origin mapping.",
      stoneType: "Sapphire"
    },
    { 
      id: "MIX-223", 
      stoneName: "Vibrant Pile", 
      imageUrl: gemAssets.vibrantPile,
      comments: "Batch inventory authentication.",
      stoneType: "Mixed Crystalline"
    }
  ];

  const displayGems = recentGems.length > 0 ? recentGems : defaultLedger;

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src={gemAssets.lightBlueGem}
            alt="Exquisite Light Blue Gemstone Background" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
            onError={(e) => { (e.target as HTMLImageElement).src = fallbacks.diamond; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-blue-950/40 to-slate-950"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center space-y-12">
          <div className="space-y-6">
            <span className="block text-[#d4af37] text-[10px] font-bold tracking-[0.6em] uppercase animate-fade-in">INTERNATIONAL GEMS STONE TESTING LAB</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-none">
              Prismatic <br />
              <span className="italic font-normal text-slate-300">Certainty.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
              Identifying the impossible. We provide the world's most rigorous analysis for high-jewelry and investment-grade gems.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
            <div className="bg-blue-900/10 backdrop-blur-md border border-white/10 p-1 rounded-sm w-full max-w-md group hover:border-[#d4af37]/40 transition-all duration-500">
              <form onSubmit={handleQuickSearch} className="flex">
                <input 
                  type="text" 
                  placeholder="REPORT AUTHENTICATION ID" 
                  className="bg-transparent text-white text-[11px] font-bold tracking-widest p-4 flex-grow focus:outline-none placeholder:text-slate-600 uppercase"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-[#d4af37] text-slate-950 px-8 py-4 text-[11px] font-bold tracking-widest hover:bg-white transition-all duration-300"
                >
                  VERIFY
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 animate-bounce opacity-40">
           <span className="text-white text-[9px] font-bold tracking-[0.4em]">EXPLORE SCIENCE</span>
           <div className="w-[1px] h-10 bg-white"></div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-40 px-4 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
           <img src={gemAssets.blueFaceted} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 group">
            <div className="relative aspect-square overflow-hidden rounded-sm shadow-2xl border border-slate-100 bg-slate-50">
              <img 
                src={gemAssets.blueFaceted}
                alt="Blue Diamond Facets" 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                onError={(e) => { (e.target as HTMLImageElement).src = fallbacks.jewelry; }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
            </div>
          </div>
          
          <div className="lg:col-span-6 space-y-12 order-1 lg:order-2">
            <div className="space-y-6">
              <span className="text-[#d4af37] text-[10px] font-bold tracking-[0.5em] uppercase">Structural Analysis</span>
              <h2 className="text-6xl font-serif text-slate-950 leading-tight">Masters of <br/><span className="italic text-blue-900">Light & Matter.</span></h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-light text-xl">
              Our laboratory doesn't just look at gems; we listen to their crystalline lattice. Using advanced spectroscopy, we detect trace elements that define a stone's specific geological origin.
            </p>
            <div className="pt-4">
              <Link to="/about" className="group flex items-center space-x-4 text-slate-950 font-bold tracking-[0.4em] text-[10px]">
                <span>THE LABORATORY STANDARD</span>
                <div className="w-12 h-[1px] bg-blue-900/20 group-hover:w-24 group-hover:bg-[#d4af37] transition-all duration-700"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Grid - DYNAMICALLY POPULATED FROM ADMIN */}
      <section className="relative py-32 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
           <img src={gemAssets.lightBlueGem} className="w-full h-full object-cover blur-sm" alt="Gem Background" />
           <div className="absolute inset-0 bg-slate-950/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-24 space-y-4">
             <span className="text-[#d4af37] text-[10px] font-bold tracking-[0.4em] uppercase">Authenticated Assets</span>
             <h2 className="text-5xl font-serif text-white italic">Recent Laboratory Registrations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/10 backdrop-blur-sm">
            {displayGems.map((item, i) => {
              const isVibrant = item.id === 'MIX-223';
              return (
                <div key={item.id} className={`group bg-slate-900/40 p-12 hover:bg-white/5 transition-all duration-700 cursor-pointer ${isVibrant ? 'relative overflow-hidden' : ''}`} onClick={() => navigate('/reports', { state: { initialReportId: item.id } })}>
                  {isVibrant && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#d4af37]/10 to-transparent pointer-events-none"></div>
                  )}
                  <div className={`aspect-square mb-10 overflow-hidden rounded-sm relative border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-[#d4af37]/30 ${isVibrant ? 'bg-white/5' : 'bg-slate-900'}`}>
                    <img 
                      src={item.imageUrl || fallbacks.diamond} 
                      alt={item.stoneName} 
                      className={`w-full h-full transition-transform duration-1000 group-hover:scale-110 ${isVibrant ? 'object-contain p-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'object-cover'}`}
                      onError={(e) => { 
                        const target = e.target as HTMLImageElement;
                        if (isVibrant) target.src = gemAssets.vibrantPile;
                        else target.src = fallbacks.jewelry;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold tracking-widest text-white uppercase group-hover:text-[#d4af37] transition-colors truncate pr-4">
                        {item.stoneName || item.stoneType}
                      </h4>
                      <span className="text-[9px] font-bold text-[#d4af37] tracking-widest whitespace-nowrap">{item.id}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-light leading-relaxed group-hover:text-slate-300 transition-colors line-clamp-2">
                      {item.comments || "Official laboratory record of gemstone provenance and structural analysis."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-20 text-center">
             <Link to="/reports" className="text-[10px] font-bold tracking-[0.5em] text-slate-500 hover:text-[#d4af37] transition-colors uppercase border-b border-slate-800 pb-2">View Full Laboratory Archive</Link>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-40 bg-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/5 rounded-full opacity-30 -z-10 blur-[120px]"></div>
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          <div className="w-40 h-40 mx-auto mb-16 relative group">
            <div className="absolute inset-0 bg-blue-900/10 rounded-full blur-xl animate-pulse"></div>
            <img 
              src={gemAssets.lightBlueGem}
              alt="Diamond Icon" 
              className="w-full h-full object-contain relative z-10 transform rotate-0 group-hover:rotate-[360deg] transition-transform duration-[4000ms] ease-in-out"
              onError={(e) => { (e.target as HTMLImageElement).src = fallbacks.diamond; }}
            />
          </div>
          <h2 className="text-6xl font-serif text-slate-950 leading-tight">Trust Your <span className="italic text-blue-900">Provenance.</span></h2>
          <p className="text-slate-500 font-light text-xl max-w-xl mx-auto leading-relaxed">
            We provide the definitive word on gemstone value, ensuring your investment is backed by cold, hard data.
          </p>
          <div className="pt-8">
            <Link 
              to="/contact" 
              className="px-20 py-6 bg-slate-950 text-white text-[11px] font-bold tracking-[0.4em] hover:bg-[#d4af37] hover:text-slate-950 transition-all duration-500 uppercase shadow-2xl relative inline-block group"
            >
              <span className="relative z-10">Consult Our Gemologists</span>
              <div className="absolute inset-0 bg-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 -z-10"></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
