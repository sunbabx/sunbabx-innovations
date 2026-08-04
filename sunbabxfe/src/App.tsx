import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.js';
import Hero from './components/Hero.js';
import Services from './components/Services.js';
import About from './components/About.js';
import ContactForm from './components/ContactForm.js';
import LeadDashboard from './components/LeadDashboard.js';
import Logo from './components/Logo.js';
import { Mail, Phone, MapPin, ChevronUp, ArrowRight, Star, Heart, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  // Simple custom SPA routing state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);

    // Override pushState and replaceState to trigger popstate event
    const originalPushState = window.history.pushState;
    window.history.pushState = function (state, title, url) {
      originalPushState.call(window.history, state, title, url);
      handleLocationChange();
    };

    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function (state, title, url) {
      originalReplaceState.call(window.history, state, title, url);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  // Linking state: increments on submission to signal the Admin Lead Dashboard to re-fetch
  const [refreshDashboard, setRefreshDashboard] = useState(0);

  const handleLeadAdded = () => {
    setRefreshDashboard((prev) => prev + 1);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  // STAFF PORTAL standalone route
  if (currentPath === '/admin' || currentPath === '/admin-dashboard') {
    return (
      <div className="min-h-screen bg-[#050b1a] flex flex-col text-white selection:bg-cyan-500/30 selection:text-white">
        {/* Simple dedicated Staff Portal Header */}
        <header className="bg-white/4 backdrop-blur-md border-b border-white/5 py-4 px-6 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Logo size="sm" light={true} />
              <div className="h-4 w-[1px] bg-white/20 hidden sm:block" />
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest hidden sm:inline-block">Staff Portal</span>
            </div>
            
            <button
              onClick={() => {
                window.history.pushState({}, '', '/');
              }}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-extrabold py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              Back to Website
            </button>
          </div>
        </header>

        <main className="flex-grow">
          <LeadDashboard refreshTrigger={refreshDashboard} />
        </main>

        <footer className="bg-[#050b1a] border-t border-white/5 py-6 text-center text-xs font-semibold text-white/30">
          <p>&copy; {currentYear} SUNBABX-INNOVATIONS • Secure Staff Administration Portal • Protected via SSL & Azure AD</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050b1a] flex flex-col text-white selection:bg-cyan-500/30 selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Dynamic Achievements Banner */}
        <section className="py-12 bg-[#050b1a]/80 border-y border-white/5 select-none relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl font-black font-display text-cyan-400">
                  99.9%
                </p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  Service Uptime
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl font-black font-display text-orange-400">
                  24hr
                </p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  Average Response
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl font-black font-display text-red-400">
                  100%
                </p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  Secure Channels
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl md:text-4xl font-black font-display text-white">
                  Reliable
                </p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  Support Teams
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Showcase */}
        <Services />

        {/* About Us Philosophy */}
        <About />

        {/* Contact Form with callback */}
        <ContactForm onLeadAdded={handleLeadAdded} />
      </main>

      {/* Company Footer */}
      <footer className="bg-[#050b1a] text-white/70 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Branding Column */}
            <div className="md:col-span-5 text-left space-y-6">
              <Logo size="lg" light={true} />
              
              <p className="text-sm text-white/50 font-medium leading-relaxed max-w-sm">
                SUNBABX-INNOVATIONS specializes in IT Solutions, modern online stores launching, software sales, value-added digital integrations, and strategic tech advancements designed to empower individuals and brands.
              </p>

              <div className="flex gap-4 text-xs font-bold text-cyan-400">
                <span>Reliability</span>
                <span>•</span>
                <span>Accessibility</span>
                <span>•</span>
                <span>Innovation</span>
              </div>
            </div>

            {/* Quick Navigation links */}
            <div className="md:col-span-3 text-left space-y-4">
              <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white">
                Company Navigation
              </h4>
              <ul className="space-y-3.5 text-xs font-bold">
                <li>
                  <a href="#home" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-white/60">
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                    Home Platform
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-white/60">
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                    Service Offerings
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-white/60">
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                    Story & Philosophy
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-white/60">
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                    Inquire Contact Form
                  </a>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      window.history.pushState({}, '', '/admin');
                    }}
                    className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-white/60 text-left cursor-pointer w-full bg-transparent border-none p-0"
                  >
                    <ArrowRight className="w-3 h-3 text-cyan-400" />
                    Admin Staff Portal
                  </button>
                </li>
              </ul>
            </div>

            {/* Inquiries Contacts column */}
            <div className="md:col-span-4 text-left space-y-4">
              <h4 className="font-display font-bold text-sm uppercase tracking-widest text-white">
                Direct Contact Desk
              </h4>
              <p className="text-xs text-white/50 font-medium leading-relaxed max-w-xs">
                Reach out directly via our physical support coordinates or digital channels for custom inquiries.
              </p>
              
              <div className="space-y-3 text-xs font-semibold">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <a href="mailto:admin@sunbabx-innovations.com" className="hover:text-white transition-colors text-white/80">
                    admin@sunbabx-innovations.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <a href="tel:+2348169036052" className="hover:text-white transition-colors text-white/80">
                    +234 816-903-6052
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="text-white/60 font-medium">Lagos, Nigeria (Operating Globally)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Back-to-top */}
          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-white/40">
            <p className="text-center sm:text-left select-none">
              &copy; {currentYear} <span className="text-white/60">SUNBABX-INNOVATIONS</span>. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={handleScrollToTop}
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white p-2.5 rounded-full transition-all flex items-center gap-1.5 active:scale-95 group shadow-md cursor-pointer"
                title="Back to top"
              >
                Back to top
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
