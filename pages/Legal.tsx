
import React from 'react';

const Legal: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-40">
      <section className="bg-slate-950 py-32 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-4">
          <span className="text-[#d4af37] text-[10px] font-bold tracking-[0.5em] uppercase">Terms of Laboratory Service</span>
          <h1 className="text-6xl font-serif text-white italic">Legal Notice</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 space-y-20">
        <div className="space-y-6">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase border-b border-slate-100 pb-2">I. Report Validity</h2>
          <p className="text-slate-600 leading-relaxed font-light">
            An H.K. Gems Report represents the scientific opinion of the laboratory at the time of examination. It is not a valuation, appraisal, or guarantee. The laboratory disclaims all liability for any errors or omissions resulting from technological limitations at the date of testing.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase border-b border-slate-100 pb-2">II. Intellectual Property</h2>
          <p className="text-slate-600 leading-relaxed font-light">
            The brand "H.K. GEMS TESTING LAB," its logo, and the proprietary structure of its analysis reports are the exclusive property of Hemant Koirala and protected under international copyright and trademark laws. Unauthorized reproduction of reports or digital assets is strictly prohibited.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase border-b border-slate-100 pb-2">III. Limitation of Liability</h2>
          <p className="text-slate-600 leading-relaxed font-light">
            H.K. Gems Lab shall not be liable for any indirect, incidental, or consequential damages arising from the use of its reports in commercial transactions. Users are advised that gemstone treatments and synthetic growth technologies are constantly evolving.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase border-b border-slate-100 pb-2">IV. Jurisdiction</h2>
          <p className="text-slate-600 leading-relaxed font-light">
            These terms are governed by the laws of Nepal. Any disputes arising from laboratory services shall be subject to the exclusive jurisdiction of the courts in Kathmandu.
          </p>
        </div>

        <div className="pt-20 border-t border-slate-100 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
          LEGAL REVISION 4.2 | REGISTERED IN NEPAL
        </div>
      </section>
    </div>
  );
};

export default Legal;
