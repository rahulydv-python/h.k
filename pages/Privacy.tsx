
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-40">
      <section className="bg-slate-950 py-32 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1512168474268-21859368ea01?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-4">
          <span className="text-[#d4af37] text-[10px] font-bold tracking-[0.5em] uppercase">Data Protection Protocol</span>
          <h1 className="text-6xl font-serif text-white italic">Privacy Policy</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 space-y-20">
        <div className="space-y-6">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase border-b border-slate-100 pb-2">I. Commitment to Confidentiality</h2>
          <p className="text-slate-600 leading-relaxed font-light">
            At H.K. Gems Testing Lab, the privacy of our clientele and the security of laboratory records are paramount. This policy outlines how we handle data collected through our digital portal and physical examination facilities. We maintain an ironclad separation between gemstone data and personal client identification.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase border-b border-slate-100 pb-2">II. Data Acquisition</h2>
          <div className="space-y-4 text-slate-600 font-light">
            <p>We collect information only necessary for the issuance of scientific reports, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Identification details for the registration of investment-grade assets.</li>
              <li>Communication data for laboratory consultations and concierge inquiries.</li>
              <li>Technical metadata for the security of our verification gateway.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase border-b border-slate-100 pb-2">III. Scientific Record Retention</h2>
          <p className="text-slate-600 leading-relaxed font-light">
            Gemstone analysis data—once authenticated—is permanently stored in our secure encrypted ledger to facilitate lifelong verification. This data does not contain personal identifying information of the owner unless explicitly requested for high-value estate documentation.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-[10px] font-bold tracking-[0.4em] text-blue-900 uppercase border-b border-slate-100 pb-2">IV. Contact Information</h2>
          <p className="text-slate-600 leading-relaxed font-light">
            For inquiries regarding your data or to request an audit of your stored records, contact our Data Integrity Officer at <span className="text-blue-900 font-medium">privacy@hkgemslab.com</span>.
          </p>
        </div>

        <div className="pt-20 border-t border-slate-100 text-[9px] font-bold tracking-widest text-slate-400 uppercase">
          Last Updated: OCTOBER 2024 | DOCUMENT REF: HK-SEC-001
        </div>
      </section>
    </div>
  );
};

export default Privacy;
