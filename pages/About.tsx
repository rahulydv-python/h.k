
import React from 'react';

const About: React.FC = () => {
  const gemAssets = {
    vibrantPile: './VibrantPile.png',
    blueFaceted: './blueFated.png',
    lightBlueGem: './lightBlueGem.jpg'
  };

  const fallbacks = {
    jewelry: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000",
    diamond: "https://images.unsplash.com/photo-1584308666744-24d5ec76b9c1?auto=format&fit=crop&q=80&w=1000"
  };

  return (
    <div className="bg-slate-100">
      <section className="relative h-[70vh] bg-slate-950 flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img 
            src={gemAssets.lightBlueGem} 
            alt="Jewel Macro" 
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = fallbacks.diamond; }}
           />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-blue-950/20 to-slate-950"></div>
        </div>
        <div className="relative z-10 space-y-6 px-4">
          <span className="text-[#d4af37] text-[10px] font-bold tracking-[0.5em] uppercase">A Legacy of Scientific Rigor</span>
          <h1 className="text-6xl md:text-8xl font-serif text-white">Defining <span className="italic text-slate-400">Excellence.</span></h1>
        </div>
      </section>

      <section className="py-40 max-w-7xl mx-auto px-4 bg-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-blue-900 text-[10px] font-bold tracking-[0.4em] uppercase">The Journey</span>
              <h2 className="text-5xl font-serif text-slate-950 leading-tight">Decades of Discovery and Scientific Precision.</h2>
            </div>
            <div className="space-y-8 text-slate-600 font-light text-lg leading-relaxed">
              <p>
                Established in 1998, H.K. Gems Testing Lab was founded on the belief that gemstone analysis requires both the heart of an artist and the mind of a physicist.
              </p>
              <p>
                Under the leadership of  Hemant koirala, the lab has grown into an international benchmark for gemstone authentication.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12 pt-8">
              <div className="space-y-2">
                <div className="text-3xl font-serif text-slate-950">1998</div>
                <div className="text-[9px] font-bold tracking-widest text-blue-900 uppercase">Inception</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-serif text-slate-950">GLOBAL</div>
                <div className="text-[9px] font-bold tracking-widest text-blue-900 uppercase">Accreditation</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
             <div className="aspect-[4/5] bg-slate-200 overflow-hidden shadow-2xl rounded-sm border border-slate-300">
                <img 
                  src={gemAssets.blueFaceted} 
                  alt="Emerald Macro" 
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-1000"
                  onError={(e) => { (e.target as HTMLImageElement).src = fallbacks.jewelry; }}
                />
             </div>
             <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-900 opacity-5 -z-10"></div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-40 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="space-y-6 mb-24">
            <span className="text-[#d4af37] text-[10px] font-bold tracking-[0.4em] uppercase">Philosophy</span>
            <h2 className="text-5xl font-serif">Scientific Foundations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { t: "OBJECTIVITY", d: "Our analysis is strictly data-driven, insulated from market trends." },
              { t: "INNOVATION", d: "We continuously update our laboratory with the latest spectroscopic technologies." },
              { t: "TRANSPARENCY", d: "We believe in full disclosure, providing detailed explanations for findings." }
            ].map((p, i) => (
              <div key={i} className="space-y-8 group">
                <div className="text-blue-400 text-4xl font-serif italic">0{i + 1}.</div>
                <h3 className="text-xl font-bold tracking-widest uppercase">{p.t}</h3>
                <p className="text-slate-500 font-light text-sm leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
