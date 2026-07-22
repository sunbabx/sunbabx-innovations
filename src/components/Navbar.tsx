import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, Mail } from 'lucide-react';
import Logo from './Logo.js';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#050b1a]/60 text-white/70 text-xs py-2 px-4 hidden md:block select-none border-b border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-medium">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <a href="mailto:admin@sunbabx-innovations.com">admin@sunbabx-innovations.com</a>
            </span>
            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <a href="tel:+2349048410304">+2349048410304</a>
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] opacity-70 tracking-wider">
            <span>IT SOLUTIONS</span>
            <span>•</span>
            <span>RETAIL & E-COMMERCE</span>
            <span>•</span>
            <span>DIGITAL INNOVATION</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        id="navbar-header"
        className={`fixed top-0 md:top-8 left-0 right-0 z-50 transition-all duration-300 w-full ${
          scrolled
            ? 'bg-[#050b1a]/80 backdrop-blur-xl shadow-lg shadow-cyan-950/20 py-3 border-b border-white/10'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center">
              <Logo size="md" light={true} />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-medium text-sm text-white/70 hover:text-cyan-400 tracking-wider uppercase relative py-1.5 transition-colors group text-xs"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-cyan-500/30 transition-all duration-300 flex items-center gap-1.5 group hover:scale-[1.02] uppercase tracking-wider"
              >
                Inquire Now
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white/80 hover:text-cyan-400 p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-[#050b1a]/95 backdrop-blur-xl border-b border-white/10 shadow-xl overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="block px-3 py-2.5 rounded-lg font-medium text-base text-white/80 hover:text-cyan-400 hover:bg-white/5 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-white/10 flex flex-col gap-3 px-3">
                  <div className="text-xs text-white/60 space-y-1.5">
                    <p className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      admin@sunbabx-innovations.com
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      +234 (0) 800-SUNBABX
                    </p>
                  </div>
                  <a
                    href="#contact"
                    onClick={(e) => handleLinkClick(e, '#contact')}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center font-semibold py-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 uppercase tracking-wider text-sm"
                  >
                    Get in Touch
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
