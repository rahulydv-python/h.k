
import React, { useState, useEffect, useRef } from 'react';
import { ReportResult, ContactInquiry } from '../types';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  
  const [activeView, setActiveView] = useState<'gems' | 'inquiries'>('gems');
  const [gems, setGems] = useState<ReportResult[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password Change States
  const [passChange, setPassChange] = useState({ current: '', new: '', confirm: '' });
  const [passChangeError, setPassChangeError] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState(false);

  const initialGemState: Partial<ReportResult> = {
    id: '',
    certificateNo: '',
    stoneName: '',
    stoneType: '',
    weight: '',
    shapeCut: '',
    color: '',
    dimensions: '',
    refractiveIndex: '',
    specificGravity: '',
    hardness: '',
    comments: '',
    issuedTo: '',
    issueDate: new Date().toISOString().split('T')[0],
    imageUrl: '',
    verificationStatus: 'Verified Official'
  };

  const [newGem, setNewGem] = useState<Partial<ReportResult>>(initialGemState);

  // Initialize and check local storage for custom passphrase
  const getStoredPassphrase = () => localStorage.getItem('hk_admin_passphrase') || 'hkadmin2024';

  useEffect(() => {
    const authStatus = sessionStorage.getItem('hk_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    const loadData = () => {
      const savedGems = localStorage.getItem('hk_gems_db');
      if (savedGems) {
        setGems(JSON.parse(savedGems));
      }

      const savedInquiries = localStorage.getItem('hk_inquiries_db');
      if (savedInquiries) {
        setInquiries(JSON.parse(savedInquiries));
      }
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === getStoredPassphrase()) {
      setIsAuthenticated(true);
      sessionStorage.setItem('hk_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('INVALID SECURITY PASSPHRASE. ACCESS DENIED.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('hk_admin_auth');
    setIsChangingPassword(false);
  };

  const handlePassphraseChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPassChangeError('');
    setPassChangeSuccess(false);

    if (passChange.current !== getStoredPassphrase()) {
      setPassChangeError('CURRENT PASSPHRASE INCORRECT.');
      return;
    }
    if (passChange.new.length < 6) {
      setPassChangeError('NEW PASSPHRASE MUST BE AT LEAST 6 CHARACTERS.');
      return;
    }
    if (passChange.new !== passChange.confirm) {
      setPassChangeError('PASSPHRASES DO NOT MATCH.');
      return;
    }

    localStorage.setItem('hk_admin_passphrase', passChange.new);
    setPassChangeSuccess(true);
    setPassChange({ current: '', new: '', confirm: '' });
    setTimeout(() => {
      setIsChangingPassword(false);
      setPassChangeSuccess(false);
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGem({ ...newGem, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveToDB = (updatedGems: ReportResult[]) => {
    setGems(updatedGems);
    localStorage.setItem('hk_gems_db', JSON.stringify(updatedGems));
  };

  const saveInquiriesToDB = (updatedInquiries: ContactInquiry[]) => {
    setInquiries(updatedInquiries);
    localStorage.setItem('hk_inquiries_db', JSON.stringify(updatedInquiries));
  };

  const handleAddGem = (e: React.FormEvent) => {
    e.preventDefault();
    const gemToSave: ReportResult = {
      ...(newGem as ReportResult),
      verificationStatus: 'Verified Official'
    };
    const updated = [gemToSave, ...gems];
    saveToDB(updated);
    setIsAdding(false);
    setNewGem(initialGemState);
  };

  const deleteGem = (id: string) => {
    if (confirm('Permanently remove this record from the official ledger?')) {
      const updated = gems.filter(g => g.id !== id);
      saveToDB(updated);
    }
  };

  const deleteInquiry = (id: string) => {
    if (confirm('Permanently remove this customer inquiry?')) {
      const updated = inquiries.filter(i => i.id !== id);
      saveInquiriesToDB(updated);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-white/10 p-12 rounded-sm shadow-2xl space-y-10">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-900/20 border border-blue-900/50 flex items-center justify-center rounded-full mx-auto mb-6 text-blue-500">
              <i className="fa-solid fa-shield-halved text-2xl"></i>
            </div>
            <h2 className="text-2xl font-serif text-white uppercase tracking-widest">Admin Authorization</h2>
            <p className="text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase">Security Clearance Required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[9px] font-bold tracking-[0.4em] text-slate-400 uppercase">Secure Passphrase</label>
              <input 
                type="password" 
                className="w-full bg-slate-800 border-b border-white/10 py-4 px-2 text-white focus:outline-none focus:border-blue-900 transition-all font-mono"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>
            {loginError && <p className="text-red-500 text-[9px] font-bold tracking-widest text-center animate-pulse uppercase">{loginError}</p>}
            <button type="submit" className="w-full py-5 bg-blue-900 text-white text-[11px] font-bold tracking-[0.4em] hover:bg-[#d4af37] hover:text-slate-950 transition-all duration-500 uppercase shadow-lg">Verify Credentials</button>
            <div className="text-center">
              <button 
                type="button" 
                onClick={() => setShowForgotModal(true)}
                className="text-[9px] font-bold tracking-widest text-slate-600 hover:text-[#d4af37] transition-colors uppercase"
              >
                Forgot Security Passphrase?
              </button>
            </div>
          </form>
        </div>

        {/* Forgot Password Modal */}
        {showForgotModal && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-[100] px-4">
            <div className="max-w-md w-full bg-slate-900 border border-white/10 p-10 rounded-sm shadow-2xl space-y-8 animate-fade-in">
              <div className="text-center space-y-4">
                <i className="fa-solid fa-triangle-exclamation text-amber-500 text-4xl"></i>
                <h3 className="text-xl font-serif text-white italic">Security Recovery Protocol</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  For security reasons, H.K. Gems Laboratory credentials can only be reset via a physical encrypted hardware key or by the Chief Technical Officer.
                </p>
              </div>
              <div className="p-6 bg-slate-800/50 border border-white/5 rounded-sm">
                <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-4">Contact Protocol:</p>
                <p className="text-white text-sm font-bold tracking-wide">SECURE LIAISON: +977 98476039922</p>
                <p className="text-slate-400 text-xs mt-1">Ref: ADMIN-RESET-REQ-001</p>
              </div>
              <button 
                onClick={() => setShowForgotModal(false)}
                className="w-full py-4 border border-white/10 text-white text-[10px] font-bold tracking-widest hover:bg-white hover:text-slate-950 transition-all uppercase"
              >
                Return to Login
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-32 pb-40 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-blue-500 text-[10px] font-bold tracking-[0.4em] uppercase">Verified Session Active</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-5xl font-serif text-white italic">Laboratory Command</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className={`px-6 py-4 border border-white/10 text-[11px] font-bold tracking-widest transition-all uppercase ${isChangingPassword ? 'text-[#d4af37] border-[#d4af37]' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fa-solid fa-key mr-2"></i>
              Security
            </button>
            <button onClick={handleLogout} className="px-6 py-4 border border-white/10 text-slate-400 text-[11px] font-bold tracking-widest hover:text-white hover:border-white transition-all uppercase">Logout</button>
            <button onClick={() => { setIsAdding(!isAdding); setIsChangingPassword(false); }} className="px-8 py-4 bg-blue-900 text-white text-[11px] font-bold tracking-widest hover:bg-[#d4af37] hover:text-slate-950 transition-all uppercase flex items-center space-x-3">
              <i className={`fa-solid ${isAdding ? 'fa-minus' : 'fa-plus'}`}></i>
              <span>{isAdding ? 'CLOSE PROTOCOL' : 'NEW REGISTRATION'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-12 mb-10 border-b border-white/5">
          <button 
            onClick={() => {setActiveView('gems'); setIsAdding(false);}}
            className={`pb-4 text-[10px] font-bold tracking-[0.4em] uppercase transition-all relative ${activeView === 'gems' ? 'text-[#d4af37]' : 'text-slate-500 hover:text-white'}`}
          >
            Asset Ledger
            {activeView === 'gems' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37]"></div>}
          </button>
          <button 
            onClick={() => {setActiveView('inquiries'); setIsAdding(false);}}
            className={`pb-4 text-[10px] font-bold tracking-[0.4em] uppercase transition-all relative ${activeView === 'inquiries' ? 'text-[#d4af37]' : 'text-slate-500 hover:text-white'}`}
          >
            Customer Inquiries
            {inquiries.length > 0 && <span className="ml-2 bg-blue-900 text-white px-1.5 py-0.5 rounded-full text-[8px]">{inquiries.length}</span>}
            {activeView === 'inquiries' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#d4af37]"></div>}
          </button>
        </div>

        {/* Change Password Panel */}
        {isChangingPassword && (
          <div className="bg-slate-800 p-10 rounded-sm mb-16 shadow-2xl border-l-4 border-amber-500 animate-fade-in text-white max-w-2xl">
            <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
              <h3 className="text-xl font-serif italic text-amber-500">Credential Update Protocol</h3>
              <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">System Security</span>
            </div>
            
            <form onSubmit={handlePassphraseChange} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Current Passphrase</label>
                  <input 
                    type="password" required 
                    className="w-full bg-slate-900 border-b border-white/10 py-3 text-white font-mono focus:outline-none focus:border-amber-500"
                    value={passChange.current}
                    onChange={e => setPassChange({...passChange, current: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">New Passphrase</label>
                  <input 
                    type="password" required 
                    className="w-full bg-slate-900 border-b border-white/10 py-3 text-white font-mono focus:outline-none focus:border-amber-500"
                    value={passChange.new}
                    onChange={e => setPassChange({...passChange, new: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Confirm New Passphrase</label>
                  <input 
                    type="password" required 
                    className="w-full bg-slate-900 border-b border-white/10 py-3 text-white font-mono focus:outline-none focus:border-amber-500"
                    value={passChange.confirm}
                    onChange={e => setPassChange({...passChange, confirm: e.target.value})}
                  />
                </div>
              </div>
              
              {passChangeError && <p className="text-red-500 text-[9px] font-bold tracking-widest uppercase animate-pulse">{passChangeError}</p>}
              {passChangeSuccess && <p className="text-green-500 text-[9px] font-bold tracking-widest uppercase">PASSPHRASE UPDATED SUCCESSFULLY.</p>}
              
              <button 
                type="submit" 
                className="px-10 py-4 bg-amber-600 text-slate-950 text-[10px] font-bold tracking-widest hover:bg-amber-500 transition-all uppercase"
              >
                Update Credentials
              </button>
            </form>
          </div>
        )}

        {isAdding && activeView === 'gems' && (
          <div className="bg-slate-50 p-8 md:p-12 rounded-sm mb-16 shadow-2xl border-l-4 border-blue-900 animate-fade-in text-slate-900">
            <div className="flex justify-between items-end mb-12 border-b border-slate-200 pb-6">
              <h3 className="text-xl font-serif italic text-blue-900">Official Asset Entry Protocol</h3>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Secure Scientific Ledger</span>
            </div>

            <form onSubmit={handleAddGem} className="space-y-16">
              {/* Form fields same as before */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 space-y-4">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Stone Macro Image</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square border-2 border-dashed border-slate-300 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-blue-900 transition-all bg-white relative overflow-hidden"
                  >
                    {newGem.imageUrl ? (
                      <img src={newGem.imageUrl} className="w-full h-full object-cover" alt="Gem preview" />
                    ) : (
                      <>
                        <i className="fa-solid fa-cloud-arrow-up text-3xl text-slate-200 mb-4"></i>
                        <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase">Upload Analysis Photo</span>
                      </>
                    )}
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                </div>

                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="md:col-span-2 text-[10px] font-bold text-blue-900 uppercase tracking-[0.3em] mb-4">I. Authentication Credentials</div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Report-ID</label>
                    <input required className="w-full border-b border-slate-200 py-3 bg-transparent font-bold focus:border-blue-900 outline-none" placeholder="HK-2024-XXXX" value={newGem.id} onChange={e => setNewGem({...newGem, id: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Certificate No</label>
                    <input className="w-full border-b border-slate-200 py-3 bg-transparent font-bold focus:border-blue-900 outline-none" placeholder="CERT-XXXXXX" value={newGem.certificateNo} onChange={e => setNewGem({...newGem, certificateNo: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Stone Name</label>
                    <input className="w-full border-b border-slate-200 py-3 bg-transparent font-bold focus:border-blue-900 outline-none" placeholder="E.G. NATURAL SAPPHIRE" value={newGem.stoneName} onChange={e => setNewGem({...newGem, stoneName: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Species / Group</label>
                    <input required className="w-full border-b border-slate-200 py-3 bg-transparent font-bold focus:border-blue-900 outline-none" placeholder="CORUNDUM" value={newGem.stoneType} onChange={e => setNewGem({...newGem, stoneType: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Analysis Date</label>
                    <input type="date" className="w-full border-b border-slate-200 py-3 bg-transparent font-bold focus:border-blue-900 outline-none" value={newGem.issueDate} onChange={e => setNewGem({...newGem, issueDate: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* Technical fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-3 text-[10px] font-bold text-blue-900 uppercase tracking-[0.3em] mb-4 border-b border-slate-100 pb-2">II. Scientific Analysis</div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Weight (CTS)</label>
                  <input required className="w-full border-b border-slate-200 py-3 bg-transparent font-bold focus:border-blue-900 outline-none" placeholder="0.00" value={newGem.weight} onChange={e => setNewGem({...newGem, weight: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Shape / Cut</label>
                  <input className="w-full border-b border-slate-200 py-3 bg-transparent font-bold focus:border-blue-900 outline-none" placeholder="CUSHION BRILLIANT" value={newGem.shapeCut} onChange={e => setNewGem({...newGem, shapeCut: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Colour Grade</label>
                  <input className="w-full border-b border-slate-200 py-3 bg-transparent font-bold focus:border-blue-900 outline-none" placeholder="VIVID BLUE" value={newGem.color} onChange={e => setNewGem({...newGem, color: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="md:col-span-2 text-[10px] font-bold text-blue-900 uppercase tracking-[0.3em] mb-4 border-b border-slate-100 pb-2">III. Administrative & Records</div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Issued To</label>
                  <input className="w-full border-b border-slate-200 py-3 bg-transparent font-bold focus:border-blue-900 outline-none" placeholder="CLIENT NAME" value={newGem.issuedTo} onChange={e => setNewGem({...newGem, issuedTo: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase">Analysis Comments</label>
                  <input className="w-full border-b border-slate-200 py-3 bg-transparent font-bold focus:border-blue-900 outline-none" placeholder="NO INDICATIONS OF HEATING..." value={newGem.comments} onChange={e => setNewGem({...newGem, comments: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="w-full py-8 bg-slate-950 text-white text-[11px] font-bold tracking-[0.5em] hover:bg-blue-900 transition-all uppercase shadow-2xl flex items-center justify-center space-x-4">
                <i className="fa-solid fa-lock"></i>
                <span>AUTHORIZE & COMMIT SECURE ENTRY</span>
              </button>
            </form>
          </div>
        )}

        {/* Dynamic Table Section */}
        {activeView === 'gems' ? (
          <div className="bg-slate-800/30 border border-white/5 shadow-2xl overflow-hidden rounded-sm animate-fade-in">
            <div className="p-8 border-b border-white/5 bg-slate-800/80 flex justify-between items-center">
              <span className="text-blue-400 text-[10px] font-bold tracking-[0.4em] uppercase">Official Laboratory Ledger</span>
              <span className="text-slate-500 text-[9px] font-bold tracking-widest">{gems.length} RECORDS REGISTERED</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 text-[10px] font-bold tracking-widest uppercase border-b border-white/5">
                    <th className="p-8">Visual</th>
                    <th className="p-8">Report ID</th>
                    <th className="p-8">Stone Name</th>
                    <th className="p-8">Weight</th>
                    <th className="p-8 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400 text-sm">
                  {gems.length === 0 ? (
                    <tr><td colSpan={5} className="p-20 text-center text-slate-600 font-light italic">No asset records found.</td></tr>
                  ) : (
                    gems.map(gem => (
                      <tr key={gem.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-8">
                          <div className="w-12 h-12 bg-slate-700 rounded-sm overflow-hidden border border-white/10">
                            {gem.imageUrl ? <img src={gem.imageUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[8px]">NO IMG</div>}
                          </div>
                        </td>
                        <td className="p-8 font-bold text-white tracking-widest">{gem.id}</td>
                        <td className="p-8 uppercase">{gem.stoneName || gem.stoneType}</td>
                        <td className="p-8">{gem.weight} CTS</td>
                        <td className="p-8 text-right">
                          <button onClick={() => deleteGem(gem.id)} className="text-slate-600 hover:text-red-500 transition-colors p-2"><i className="fa-solid fa-trash-can"></i></button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/30 border border-white/5 shadow-2xl overflow-hidden rounded-sm animate-fade-in">
            <div className="p-8 border-b border-white/5 bg-slate-800/80 flex justify-between items-center">
              <span className="text-amber-500 text-[10px] font-bold tracking-[0.4em] uppercase">Customer Communication Hub</span>
              <span className="text-slate-500 text-[9px] font-bold tracking-widest">{inquiries.length} PENDING MESSAGES</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 text-[10px] font-bold tracking-widest uppercase border-b border-white/5">
                    <th className="p-8">Received</th>
                    <th className="p-8">Client Identity</th>
                    <th className="p-8">Inquiry Details</th>
                    <th className="p-8 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400 text-sm">
                  {inquiries.length === 0 ? (
                    <tr><td colSpan={4} className="p-20 text-center text-slate-600 font-light italic">No pending customer inquiries.</td></tr>
                  ) : (
                    inquiries.map(inq => (
                      <tr key={inq.id} className="border-b border-white/5 hover:bg-white/5 transition-colors align-top">
                        <td className="p-8 text-[10px] font-mono">{inq.date}</td>
                        <td className="p-8">
                          <div className="flex flex-col space-y-1">
                            <span className="text-white font-bold uppercase">{inq.name}</span>
                            <span className="text-xs text-blue-400 underline">{inq.email}</span>
                          </div>
                        </td>
                        <td className="p-8">
                          <div className="space-y-2 max-w-md">
                            <span className="text-[10px] font-bold text-[#d4af37] tracking-widest uppercase block">{inq.subject}</span>
                            <p className="text-xs leading-relaxed font-light">{inq.message}</p>
                          </div>
                        </td>
                        <td className="p-8 text-right">
                          <div className="flex justify-end space-x-2">
                             <a href={`mailto:${inq.email}?subject=RE: ${inq.subject}`} className="text-slate-600 hover:text-blue-400 transition-colors p-2"><i className="fa-solid fa-reply"></i></a>
                             <button onClick={() => deleteInquiry(inq.id)} className="text-slate-600 hover:text-red-500 transition-colors p-2"><i className="fa-solid fa-trash-can"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
