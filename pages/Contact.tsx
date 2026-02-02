
import React, { useState } from 'react';
import { ContactInquiry } from '../types';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Laboratory Consultation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the inquiry object
    const newInquiry: ContactInquiry = {
      id: `INQ-${Date.now()}`,
      name: formState.name,
      email: formState.email,
      subject: formState.subject,
      message: formState.message || "No message provided.",
      date: new Date().toLocaleString()
    };

    // Save to Local Database (localStorage)
    const existingInquiries = localStorage.getItem('hk_inquiries_db');
    const inquiries: ContactInquiry[] = existingInquiries ? JSON.parse(existingInquiries) : [];
    const updatedInquiries = [newInquiry, ...inquiries];
    localStorage.setItem('hk_inquiries_db', JSON.stringify(updatedInquiries));

    setSubmitted(true);
    // Reset form
    setFormState({
      name: '',
      email: '',
      subject: 'Laboratory Consultation',
      message: ''
    });
  };

  return (
    <div className="bg-slate-100 min-h-screen pt-32 pb-40">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <span className="text-blue-900 text-[10px] font-bold tracking-[0.4em] uppercase">Inquiries</span>
          <h1 className="text-6xl font-serif text-slate-950">Global Concierge</h1>
          <div className="w-12 h-[1px] bg-blue-900 mx-auto"></div>
          <p className="text-slate-500 text-lg font-light leading-relaxed">
            Connect with our world-class gemologists to schedule a private examination or inquire about international reports.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4 space-y-12">
            {[
              { 
                title: "GLOBAL HEADQUARTERS", 
                content: "Nepal, Kathmandu,\nKageshwori Manohara, Birendrachowk, Near Marts", 
                icon: "fa-location-dot"
              },
              { 
                title: "DIRECT LIAISON", 
                content: "+977 98476039922\nhkgems@gmail.com", 
                icon: "fa-phone-volume"
              }
            ].map((info, i) => (
              <div key={i} className="flex space-x-8 group">
                <div className="w-10 h-10 border border-slate-300 flex-shrink-0 flex items-center justify-center rounded-sm text-slate-400 group-hover:text-blue-900 group-hover:border-blue-900 transition-all">
                  <i className={`fa-solid ${info.icon} text-sm`}></i>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold tracking-[0.3em] text-slate-400 mb-3 uppercase">{info.title}</h3>
                  <p className="text-slate-900 text-sm whitespace-pre-line leading-relaxed font-medium">{info.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-8">
            <div className="bg-slate-50 border border-slate-200 p-8 md:p-16 shadow-2xl rounded-sm">
              {submitted ? (
                <div className="text-center py-20 space-y-8 animate-fade-in">
                  <div className="w-20 h-20 border border-blue-900 text-blue-900 flex items-center justify-center rounded-full mx-auto text-3xl">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <h2 className="text-4xl font-serif text-slate-950">Inquiry Received</h2>
                  <p className="text-slate-500 font-light">Your request has been securely logged into our laboratory system. A representative will contact you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="text-blue-900 text-[10px] font-bold tracking-widest hover:underline uppercase">Send Another Request</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase">Your Name</label>
                      <input required type="text" className="w-full py-4 bg-transparent border-b border-slate-300 focus:outline-none focus:border-blue-900 transition-all text-slate-900" placeholder="NAME" value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase">Email Address</label>
                      <input required type="email" className="w-full py-4 bg-transparent border-b border-slate-300 focus:outline-none focus:border-blue-900 transition-all text-slate-900" placeholder="EMAIL" value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase">Message / Special Instructions</label>
                    <textarea rows={4} className="w-full py-4 bg-transparent border-b border-slate-300 focus:outline-none focus:border-blue-900 transition-all text-slate-900" placeholder="PLEASE DESCRIBE YOUR INQUIRY..." value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})} />
                  </div>
                  <button type="submit" className="w-full bg-slate-950 text-white py-6 text-[11px] font-bold tracking-[0.4em] hover:bg-blue-900 transition-all duration-500 shadow-xl uppercase">Submit Secure Request</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
