
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ReportResult } from '../types';

const Reports: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'verify' | 'visual'>('verify');
  const [reportId, setReportId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (location.state?.initialReportId) {
      const id = location.state.initialReportId;
      setReportId(id);
      performVerification(id);
    }
  }, [location.state]);

  const performVerification = async (id: string) => {
    if (!id) return;
    setLoading(true);
    setError(null);
    setResult(null);

    // Strict Database Lookup Logic - No AI Simulation
    setTimeout(() => {
      const localDB = localStorage.getItem('hk_gems_db');
      if (localDB) {
        const gems: ReportResult[] = JSON.parse(localDB);
        const match = gems.find(g => g.id.toUpperCase() === id.toUpperCase());
        
        if (match) {
          setResult(match);
          setLoading(false);
          return;
        }
      }
      
      // If not found in local database
      setError("AUTHENTICATION FAILED: THIS REPORT ID IS NOT REGISTERED IN THE H.K. GEMS OFFICIAL LEDGER. PLEASE CONTACT OUR GLOBAL CONCIERGE FOR ASSISTANCE.");
      setLoading(false);
    }, 1200); // Artificial delay to simulate secure server lookup
  };

  const getStoneImage = (item: ReportResult) => {
    if (item.imageUrl) return item.imageUrl;
    return './lightBlueGem.jpg'; // Using relative path
  };

  return (
    <div className="pt-32 pb-40 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-6">
          <span className="text-blue-900 text-[10px] font-bold tracking-[0.4em] uppercase">Scientific Portal</span>
          <h1 className="text-5xl font-serif text-slate-950">Authentication Gateway</h1>
          <p className="text-slate-500 text-sm font-light max-w-xl mx-auto">Access the official H.K. Gems laboratory records for definitive gemstone provenance and analysis.</p>
        </div>

        <div className="bg-white border border-slate-200 p-8 md:p-16 shadow-2xl rounded-sm max-w-5xl mx-auto">
          <form onSubmit={(e) => { e.preventDefault(); performVerification(reportId); }} className="space-y-12">
            <div className="space-y-4">
              <label className="text-[10px] font-bold tracking-widest text-slate-400 block uppercase">Enter Report Authentication ID</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={reportId}
                  onChange={(e) => setReportId(e.target.value)}
                  placeholder="E.G. HK-2024-XXXX"
                  className="w-full bg-transparent border-b border-slate-300 py-6 text-2xl font-serif focus:outline-none focus:border-blue-900 transition-all placeholder:text-slate-300 text-slate-900"
                />
                <i className="fa-solid fa-shield-halved absolute right-0 top-1/2 -translate-y-1/2 text-slate-200 text-xl"></i>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-6 text-[11px] font-bold tracking-[0.3em] transition-all duration-500 ${
                loading ? 'bg-slate-200 text-slate-400 cursor-wait' : 'bg-slate-950 text-white hover:bg-blue-900 shadow-xl'
              }`}
            >
              {loading ? 'CONSULTING OFFICIAL LEDGER...' : 'AUTHENTICATE REPORT'}
            </button>
          </form>

          {error && (
            <div className="mt-12 p-8 bg-red-50 border border-red-100 text-red-700 text-[11px] font-bold tracking-widest text-center leading-relaxed animate-fade-in uppercase">
              <i className="fa-solid fa-triangle-exclamation text-2xl mb-4 block"></i>
              {error}
            </div>
          )}

          {result && (
            <div className="mt-24 animate-fade-in space-y-20 border-t border-slate-100 pt-20">
              <div className="flex flex-col md:flex-row justify-between items-start border-b border-slate-200 pb-12 gap-10">
                <div className="space-y-4">
                  <h3 className="text-4xl font-serif text-slate-950 italic">{result.stoneName || 'Identified Gemstone'}</h3>
                  <div className="flex flex-wrap gap-4 text-[10px] font-bold tracking-widest uppercase">
                    <span className="text-slate-400">REPORT ID: <span className="text-blue-900">{result.id}</span></span>
                    <span className="text-slate-400">CERT NO: <span className="text-blue-900">{result.certificateNo || 'N/A'}</span></span>
                  </div>
                </div>
                <div className={`flex items-center space-x-3 px-8 py-4 rounded-full border text-[10px] font-bold tracking-widest text-green-600 bg-green-50 border-green-100`}>
                  <div className={`w-2.5 h-2.5 rounded-full animate-pulse bg-green-500`}></div>
                  <span className="uppercase">OFFICIALLY AUTHENTICATED</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4 space-y-8">
                   <div className="aspect-square bg-white border border-slate-200 p-2 shadow-2xl overflow-hidden">
                      <img src={getStoneImage(result)} alt={result.stoneType} className="w-full h-full object-cover" />
                   </div>
                   <div className="space-y-4">
                     <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">Issued to:</p>
                     <p className="text-slate-900 font-bold text-sm uppercase">{result.issuedTo || 'Confidential Client'}</p>
                   </div>
                </div>

                <div className="lg:col-span-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      {[
                        { label: "Species / Group", value: result.stoneType },
                        { label: "Stone Name", value: result.stoneName },
                        { label: "Weight (Cts)", value: result.weight },
                        { label: "Shape / Cut", value: result.shapeCut },
                        { label: "Colour Grade", value: result.color },
                        { label: "Dimension (mm)", value: result.dimensions },
                        { label: "Refractive Index", value: result.refractiveIndex },
                        { label: "Specific Gravity", value: result.specificGravity },
                        { label: "Hardness (Mohs)", value: result.hardness },
                        { label: "Analysis Date", value: result.issueDate }
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col space-y-2 border-b border-slate-100 pb-4">
                          <span className="text-slate-400 text-[9px] font-bold tracking-[0.2em] uppercase">{item.label}</span>
                          <span className="text-slate-950 font-bold text-sm tracking-wide uppercase">{item.value || 'N/A'}</span>
                        </div>
                      ))}
                   </div>
                   
                   {result.comments && (
                     <div className="mt-12 p-8 bg-slate-50 border border-slate-100 space-y-4">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Scientific Observations:</span>
                        <p className="text-slate-700 text-sm italic font-light leading-relaxed">{result.comments}</p>
                     </div>
                   )}

                   <div className="mt-16 flex flex-col sm:flex-row gap-4">
                      <button className="flex-grow py-5 bg-slate-950 text-white text-[10px] font-bold tracking-[0.3em] hover:bg-blue-900 transition-all uppercase shadow-xl flex items-center justify-center space-x-3">
                        <i className="fa-solid fa-file-pdf"></i>
                        <span>Download Laboratory Certificate</span>
                      </button>
                      <button className="py-5 px-10 border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all flex items-center justify-center">
                        <i className="fa-solid fa-print"></i>
                      </button>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
