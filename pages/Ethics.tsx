
import React from 'react';

const Ethics: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-40">
      <section className="bg-slate-950 py-32 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1573408302382-90547c84643f?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-4">
          <span className="text-[#d4af37] text-[10px] font-bold tracking-[0.5em] uppercase">The Crystalline Integrity Code</span>
          <h1 className="text-6xl font-serif text-white italic">Ethics & Values</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 space-y-20">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase border-b border-slate-100 pb-2">I. Scientific Neutrality</h2>
            <p className="text-slate-600 leading-relaxed font-light">
              H.K. Gems Lab operates as a strictly neutral third-party. We hold no financial interest in the purchase, sale, or trade of gemstones. Our revenue is derived solely from examination fees, ensuring that our findings remain uninfluenced by market pressures or commercial incentives.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase border-b border-slate-100 pb-2">II. Conflict-Free Sourcing Assistance</h2>
            <p className="text-slate-600 leading-relaxed font-light">
              We actively support the Kimberley Process and international efforts to eliminate conflict minerals. Through origin determination spectroscopy, we provide the transparency required to ensure that the beauty of a gemstone is not tarnished by unethical extraction practices.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase border-b border-slate-100 pb-2">III. Environmental Stewardship</h2>
            <p className="text-slate-600 leading-relaxed font-light">
              Our laboratory is committed to reducing its ecological footprint. We utilize energy-efficient spectroscopic equipment and aim for a paperless documentation environment, encouraging digital report verification through our secure gateway.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase border-b border-slate-100 pb-2">IV. Professional Conduct</h2>
            <p className="text-slate-600 leading-relaxed font-light">
              Every gemologist at H.K. Gems Lab is bound by a strict code of conduct. This includes ongoing education, adherence to established international grading standards, and the duty to report any attempted coercion or manipulation of laboratory results.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-12 border border-slate-100 rounded-sm">
          <h3 className="font-serif text-2xl italic text-slate-950 mb-6 text-center">"Science without integrity is merely vanity."</h3>
          <p className="text-center text-slate-400 text-[10px] font-bold tracking-[0.3em] uppercase">— Laboratory Mandate</p>
        </div>

        <div className="pt-20 border-t border-slate-100 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
          CODE OF ETHICS | VERSION 2024
        </div>
      </section>
    </div>
  );
};

export default Ethics;
