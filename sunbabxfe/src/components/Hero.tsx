import React from 'react';
import { ArrowRight, Sparkles, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#050b1a]"
    >
      {/* Decorative clean radial background gradients - Ambient Glow Meshes */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none select-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none select-none" />
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-indigo-600/15 rounded-full blur-[80px] pointer-events-none select-none" />

      {/* Thin elegant grid lines for technical structure representation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left - Copy & CTA */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-fit mb-6 shadow-xs select-none"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-[10px] font-bold text-cyan-300 tracking-[0.2em] uppercase">
                Sunbabx Innovations • IT Solutions & Digital Innovation
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.1] mb-6"
            >
              Sunbabx Innovations delivers trusted <span className="text-cyan-400 relative">IT Solutions</span>,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#E06C1F]">E-Commerce</span> growth, and digital innovation
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-white/60 font-medium leading-relaxed max-w-2xl mb-8"
            >
              Sunbabx Innovations is a technology-driven company helping brands and individuals launch scalable digital products, modern online stores, and secure IT services built for performance, accessibility, and long-term growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <button
                onClick={() => handleScrollTo('#contact')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02] uppercase tracking-wider text-sm"
              >
                Inquire Services
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => handleScrollTo('#services')}
                className="bg-white/5 text-white hover:text-cyan-400 border border-white/10 hover:border-cyan-500/30 font-semibold px-8 py-4 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] uppercase tracking-wider text-sm backdrop-blur-sm"
              >
                Explore Offerings
              </button>
            </motion.div>

            {/* Key Benefits Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 max-w-lg"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                  <CheckCircle className="w-4.5 h-4.5 text-cyan-400" />
                  100% Secure
                </div>
                <span className="text-xs text-white/40 font-medium leading-tight">Digital Transactions</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                  <Zap className="w-4.5 h-4.5 text-blue-400" />
                  Swift Setup
                </div>
                <span className="text-xs text-white/40 font-medium leading-tight">Online Store Launch</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                  <ShieldCheck className="w-4.5 h-4.5 text-red-400" />
                  Expert Care
                </div>
                <span className="text-xs text-white/40 font-medium leading-tight">Dedicated IT Support</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right - Interactive visual card showcase */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            {/* Visual background rings */}
            <div className="absolute w-[400px] h-[400px] rounded-full border border-white/5 animate-[spin_40s_linear_infinite] pointer-events-none select-none" />
            <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-white/10 animate-[spin_20s_linear_infinite_reverse] pointer-events-none select-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl max-w-md w-full relative group hover:border-cyan-500/20 transition-all duration-300"
            >
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-gradient-to-r from-red-600 to-orange-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md select-none">
                Value Added
              </div>

              {/* Company Logo representation inside the visual box */}
              <div className="bg-white/5 rounded-xl p-5 mb-6 flex justify-center border border-white/10">
                <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-md">
                  <path
                    d="M 12,65 C 10,75 50,85 78,55 C 92,40 92,25 78,18"
                    stroke="#E06C1F"
                    strokeWidth="8"
                    fill="none"
                  />
                  <text x="20" y="64" fill="#FFFFFF" fontFamily="system-ui" fontWeight="900" fontStyle="italic" fontSize="48" letterSpacing="-2">S</text>
                  <text x="48" y="64" fill="#FFFFFF" fontFamily="system-ui" fontWeight="900" fontStyle="italic" fontSize="48" letterSpacing="-2">I</text>
                  <path
                    d="M 12,65 C 20,45 60,30 88,40"
                    stroke="#E06C1F"
                    strokeWidth="8"
                    fill="none"
                  />
                </svg>
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-2 uppercase text-sm tracking-wider text-cyan-300">Our Mission Statement</h3>
              <p className="text-sm text-white/60 leading-relaxed font-medium mb-6">
                "Our mission is to make digital services more accessible, efficient, and impactful, empowering individuals and businesses to thrive in an increasingly connected world by delivering customer-focused solutions."
              </p>

              {/* Dynamic feature items in box */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="text-xs font-bold text-white/80">Custom E-Commerce Storefronts</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shrink-0" />
                  <span className="text-xs font-bold text-white/80">Digital Voucher & Gift Card Sales</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 shrink-0" />
                  <span className="text-xs font-bold text-white/80">IT Infrastructures & System Solutions</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
