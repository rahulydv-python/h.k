
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Reports from './pages/Reports';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Privacy from './pages/Privacy';
import Legal from './pages/Legal';
import Ethics from './pages/Ethics';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT US', path: '/about' },
    { label: 'REPORTS', path: '/reports' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-slate-950/95 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-5 group">
            <div className="relative">
              <div className="w-12 h-12 border-2 border-white flex items-center justify-center rotate-45 group-hover:rotate-[225deg] transition-all duration-700 bg-slate-950 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <div className="w-full h-full border border-white/20 flex items-center justify-center">
                   <i className="fa-solid fa-gem text-[#d4af37] text-xl -rotate-45 group-hover:rotate-[-225deg] transition-all duration-700"></i>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-[0.25em] leading-none text-white font-sans">H.K. GEMS</span>
              <span className="text-[10px] uppercase tracking-[0.55em] text-[#d4af37] font-bold mt-1.5 border-t border-white/10 pt-1">TESTING LAB</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[11px] font-bold tracking-widest transition-all duration-300 relative py-2 group ${
                  isActive(item.path) ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#d4af37] transform transition-transform duration-300 ${isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            ))}
            <Link
              to="/reports"
              className="px-6 py-2.5 bg-transparent border border-[#d4af37] text-[#d4af37] text-[11px] font-bold tracking-widest hover:bg-[#d4af37] hover:text-slate-950 transition-all duration-500 uppercase"
            >
              Verify Report
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none p-2 hover:scale-110 transition-transform">
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Redesigned Stylish Mobile Overlay */}
      <div className={`lg:hidden fixed inset-0 bg-slate-950 z-[100] transform transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Background Texture for elegance */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
        
        <div className="relative h-full flex flex-col justify-center items-center px-10">
          {/* Top Close Button */}
          <button 
            onClick={() => setIsOpen(false)} 
            className="absolute top-10 right-10 text-white text-3xl hover:rotate-90 transition-transform duration-500 p-2"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          {/* Navigation Items Stack */}
          <div className="flex flex-col items-center space-y-12 mb-16">
            {navItems.map((item, idx) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-serif text-white hover:text-[#d4af37] transition-all duration-300 tracking-[0.25em] uppercase text-center transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Blocky Gold Verification Button */}
          <div className={`w-full max-w-xs transform transition-all duration-700 delay-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <Link
              to="/reports"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-[#d4af37] text-slate-950 py-5 text-center text-xs font-bold tracking-[0.25em] uppercase shadow-2xl hover:bg-white hover:shadow-[#d4af37]/20 transition-all duration-300"
            >
              Verify Report
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <i className="fa-solid fa-gem text-[#d4af37] text-2xl"></i>
              <span className="text-xl font-bold text-white tracking-[0.2em]">H.K. GEMS</span>
            </div>
            <p className="text-sm leading-relaxed font-light">
              Elevating the standards of gemstone science through precision, integrity, and unparalleled technological sophistication.
            </p>
            <div className="flex space-x-6">
              {['facebook-f', 'instagram', 'linkedin-in', 'x-twitter'].map(icon => (
                <a key={icon} href="#" className="text-slate-500 hover:text-[#d4af37] transition-colors text-lg">
                  <i className={`fa-brands fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-10">Navigation</h4>
            <ul className="space-y-4 text-xs font-medium tracking-widest">
              {['Home', 'About Us', 'Reports', 'Contact'].map(link => (
                <li key={link}>
                  <Link to={link === 'Home' ? '/' : `/${link.toLowerCase()}`} className="hover:text-white transition-colors uppercase">{link}</Link>
                </li>
              ))}
              <li>
                <Link to="/admin" className="text-slate-700 hover:text-[#d4af37] transition-colors uppercase border-t border-white/5 pt-4 block">Admin Portal</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-10">Scientific Services</h4>
            <ul className="space-y-4 text-xs font-medium tracking-widest">
              {['Gemstone Identification', 'Origin Determination', 'Treatment Detection', 'Diamond Grading'].map(service => (
                <li key={service} className="cursor-default hover:text-white transition-colors">{service.toUpperCase()}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-10">Headquarters</h4>
            <ul className="space-y-6 text-xs font-light tracking-wide">
              <li className="flex items-start space-x-4">
                <i className="fa-solid fa-location-dot text-[#d4af37] mt-1"></i>
                <span className="leading-relaxed">Nepal, Kathmandu,<br />Kageshwori Manohara, Birendrachowk, Near Marts</span>
              </li>
              <li className="flex items-center space-x-4">
                <i className="fa-solid fa-phone text-[#d4af37]"></i>
                <span>+977 98476039922</span>
              </li>
              <li className="flex items-center space-x-4">
                <i className="fa-solid fa-envelope text-[#d4af37]"></i>
                <span>hkgems@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-[0.2em]">
          <p className="mb-4 md:mb-0 uppercase">© 2024 H.K. GEMS TESTING LAB. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 uppercase">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/legal" className="hover:text-white transition-colors">Legal</Link>
            <Link to="/ethics" className="hover:text-white transition-colors">Ethics</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/ethics" element={<Ethics />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
