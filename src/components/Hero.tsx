import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Cpu,
  BrainCircuit,
  Cloud,
  LockKeyhole,
  BadgeCheck,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);

    if (!element) return;

    const offset = 80;

    const position =
      element.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#050b1a] pt-32 pb-20 flex items-center"
    >
      {/* Ambient Background */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute bottom-[-220px] right-[-120px] h-[620px] w-[620px] rounded-full bg-blue-600/10 blur-[150px]" />

        <div className="absolute top-1/3 right-1/4 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[120px]" />

      </div>

      {/* Engineering Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:34px_34px]" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8">

        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* ======================================================= */}

          {/* LEFT */}

          {/* ======================================================= */}

          <div className="lg:col-span-7">

            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .45 }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />

              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">

                SUNBABX INNOVATIONS

              </span>

            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .1 }}
              className="mt-8 text-5xl md:text-6xl xl:text-7xl font-black leading-[1.02] tracking-tight text-white"
            >
              Engineering
              <br />

              Secure Digital
              <br />

              <span className="text-cyan-400">
                Solutions
              </span>

              {" "}That Businesses Trust
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .25 }}
              className="mt-6"
            >
              <span className="inline-flex flex-wrap gap-3 text-sm font-semibold text-cyan-300">

                <span>Software Engineering</span>

                <span className="text-white/25">•</span>

                <span>Cybersecurity</span>

                <span className="text-white/25">•</span>

                <span>Enterprise Solutions</span>

              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .3 }}
              className="mt-8 max-w-2xl text-lg leading-8 text-white/65"
            >
              We engineer enterprise software, AI-powered
              cybersecurity platforms, fraud detection systems,
              secure payment infrastructure, cloud-native
              applications, and mission-critical digital solutions
              designed for resilience, security, and long-term growth.
            </motion.p>

            {/* Core Capabilities */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .45 }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >

              <div className="flex items-center gap-3">

                <BadgeCheck className="w-5 h-5 text-cyan-400" />

                <span className="text-white font-medium">
                  Enterprise Software Engineering
                </span>

              </div>

              <div className="flex items-center gap-3">

                <ShieldCheck className="w-5 h-5 text-cyan-400" />

                <span className="text-white font-medium">
                  Cybersecurity & Fraud Detection
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Cloud className="w-5 h-5 text-cyan-400" />

                <span className="text-white font-medium">
                  Cloud Infrastructure & Secure APIs
                </span>

              </div>

              <div className="flex items-center gap-3">

                <BrainCircuit className="w-5 h-5 text-cyan-400" />

                <span className="text-white font-medium">
                  AI Security Solutions
                </span>

              </div>

            </motion.div>
                        {/* CTA */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .6 }}
              className="mt-12 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => handleScrollTo('#contact')}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-7 py-4 font-bold text-[#050b1a] transition-all hover:scale-[1.02] hover:bg-cyan-400"
              >
                Start Your Project

                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => handleScrollTo('#services')}
                className="rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white transition-all hover:border-cyan-400/40 hover:bg-white/10"
              >
                Explore Solutions
              </button>
            </motion.div>

            {/* Enterprise Trust */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .75 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              <div>
                <h3 className="text-3xl font-black text-cyan-400">
                  Enterprise
                </h3>

                <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
                  Software Engineering
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-white">
                  AI
                </h3>

                <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
                  Security Solutions
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-cyan-400">
                  Cloud
                </h3>

                <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
                  Infrastructure
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-black text-white">
                  Secure
                </h3>

                <p className="mt-2 text-xs uppercase tracking-widest text-white/40">
                  Payment APIs
                </p>
              </div>
            </motion.div>

          </div>

          {/* ======================================================= */}

          {/* RIGHT */}

          {/* ======================================================= */}

          <div className="relative lg:col-span-5">

            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: .7 }}
              className="relative"
            >
              {/* Glow */}

              <div className="absolute inset-0 rounded-[36px] bg-cyan-500/10 blur-3xl" />

              {/* Main Card */}

              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">

                      Engineering Platform

                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-white">
                      Core Capabilities
                    </h3>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">

                    <Cpu className="w-6 h-6 text-cyan-400" />

                  </div>

                </div>

                <div className="mt-8 space-y-4"></div>
                                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: .9 }}
                  className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5"
                >
                  <div className="flex items-center gap-3">

                    <ShieldCheck className="w-8 h-8 text-cyan-400" />

                    <div>

                      <h4 className="font-bold text-white">
                        Enterprise Software Engineering
                      </h4>

                      <p className="mt-1 text-sm leading-6 text-white/60">
                        Secure enterprise platforms engineered for
                        scalability, performance and long-term growth.
                      </p>

                    </div>

                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center gap-3">

                    <LockKeyhole className="w-8 h-8 text-cyan-400" />

                    <div>

                      <h4 className="font-bold text-white">
                        Cybersecurity Engineering
                      </h4>

                      <p className="mt-1 text-sm leading-6 text-white/60">
                        Secure-by-design architecture, threat protection,
                        fraud detection and resilient security engineering.
                      </p>

                    </div>

                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center gap-3">

                    <BrainCircuit className="w-8 h-8 text-cyan-400" />

                    <div>

                      <h4 className="font-bold text-white">
                        AI Security Solutions
                      </h4>

                      <p className="mt-1 text-sm leading-6 text-white/60">
                        Intelligent monitoring, anomaly detection and
                        AI-assisted protection for modern organizations.
                      </p>

                    </div>

                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center gap-3">

                    <Cloud className="w-8 h-8 text-cyan-400" />

                    <div>

                      <h4 className="font-bold text-white">
                        Cloud Infrastructure
                      </h4>

                      <p className="mt-1 text-sm leading-6 text-white/60">
                        Azure-ready infrastructure, secure APIs and
                        cloud-native enterprise deployments.
                      </p>

                    </div>

                  </div>
                </motion.div>

              </div>

              {/* Bottom Metrics */}

              <div className="mt-8 grid grid-cols-3 gap-4">

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">

                  <h3 className="text-2xl font-black text-cyan-400">
                    24/7
                  </h3>

                  <p className="mt-2 text-[10px] uppercase tracking-widest text-white/40">
                    Monitoring
                  </p>

                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">

                  <h3 className="text-2xl font-black text-white">
                    AI
                  </h3>

                  <p className="mt-2 text-[10px] uppercase tracking-widest text-white/40">
                    Powered
                  </p>

                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">

                  <h3 className="text-2xl font-black text-cyan-400">
                    Secure
                  </h3>

                  <p className="mt-2 text-[10px] uppercase tracking-widest text-white/40">
                    By Design
                  </p>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </div>
          </section>
  );
}




// import React from 'react';
// import { ArrowRight, Sparkles, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
// import { motion } from 'motion/react';

// export default function Hero() {
//   const handleScrollTo = (id: string) => {
//     const element = document.querySelector(id);
//     if (element) {
//       const offset = 80;
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - offset;
//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth',
//       });
//     }
//   };

//   return (
//     <section
//       id="home"
//       className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#050b1a]"
//     >
//       {/* Decorative clean radial background gradients - Ambient Glow Meshes */}
//       <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none select-none" />
//       <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none select-none" />
//       <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-indigo-600/15 rounded-full blur-[80px] pointer-events-none select-none" />

//       {/* Thin elegant grid lines for technical structure representation */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//           {/* Hero Left - Copy & CTA */}
//           <div className="lg:col-span-7 flex flex-col text-left">
//             {/* Tagline */}
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 w-fit mb-6 shadow-xs select-none"
//             >
//               <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
//               <span className="text-[10px] font-bold text-cyan-300 tracking-[0.2em] uppercase">
//                 Sunbabx Innovations • IT Solutions & Digital Innovation
//               </span>
//             </motion.div>

//             {/* Main Headline */}
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.1] mb-6"
//             >
//               Sunbabx Innovations delivers trusted <span className="text-cyan-400 relative">IT Solutions</span>,{' '}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#E06C1F]">E-Commerce</span> growth, and digital innovation
//             </motion.h1>

//             {/* Description */}
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-lg text-white/60 font-medium leading-relaxed max-w-2xl mb-8"
//             >
//               Sunbabx Innovations is a technology-driven company helping brands and individuals launch scalable digital products, modern online stores, and secure IT services built for performance, accessibility, and long-term growth.
//             </motion.p>

//             {/* CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="flex flex-col sm:flex-row gap-4 mb-10"
//             >
//               <button
//                 onClick={() => handleScrollTo('#contact')}
//                 className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02] uppercase tracking-wider text-sm"
//               >
//                 Inquire Services
//                 <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
//               </button>
//               <button
//                 onClick={() => handleScrollTo('#services')}
//                 className="bg-white/5 text-white hover:text-cyan-400 border border-white/10 hover:border-cyan-500/30 font-semibold px-8 py-4 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] uppercase tracking-wider text-sm backdrop-blur-sm"
//               >
//                 Explore Offerings
//               </button>
//             </motion.div>

//             {/* Key Benefits Indicators */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 max-w-lg"
//             >
//               <div className="flex flex-col gap-1.5">
//                 <div className="flex items-center gap-1.5 font-bold text-white text-sm">
//                   <CheckCircle className="w-4.5 h-4.5 text-cyan-400" />
//                   100% Secure
//                 </div>
//                 <span className="text-xs text-white/40 font-medium leading-tight">Digital Transactions</span>
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <div className="flex items-center gap-1.5 font-bold text-white text-sm">
//                   <Zap className="w-4.5 h-4.5 text-blue-400" />
//                   Swift Setup
//                 </div>
//                 <span className="text-xs text-white/40 font-medium leading-tight">Online Store Launch</span>
//               </div>
//               <div className="flex flex-col gap-1.5">
//                 <div className="flex items-center gap-1.5 font-bold text-white text-sm">
//                   <ShieldCheck className="w-4.5 h-4.5 text-red-400" />
//                   Expert Care
//                 </div>
//                 <span className="text-xs text-white/40 font-medium leading-tight">Dedicated IT Support</span>
//               </div>
//             </motion.div>
//           </div>

//           {/* Hero Right - Interactive visual card showcase */}
//           <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
//             {/* Visual background rings */}
//             <div className="absolute w-[400px] h-[400px] rounded-full border border-white/5 animate-[spin_40s_linear_infinite] pointer-events-none select-none" />
//             <div className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-white/10 animate-[spin_20s_linear_infinite_reverse] pointer-events-none select-none" />

//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
//               animate={{ opacity: 1, scale: 1, rotate: 0 }}
//               transition={{ duration: 0.8, ease: 'easeOut' }}
//               className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl max-w-md w-full relative group hover:border-cyan-500/20 transition-all duration-300"
//             >
//               {/* Highlight ribbon */}
//               <div className="absolute top-0 right-10 -translate-y-1/2 bg-gradient-to-r from-red-600 to-orange-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md select-none">
//                 Value Added
//               </div>

//               {/* Company Logo representation inside the visual box */}
//               <div className="bg-white/5 rounded-xl p-5 mb-6 flex justify-center border border-white/10">
//                 <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-md">
//                   <path
//                     d="M 12,65 C 10,75 50,85 78,55 C 92,40 92,25 78,18"
//                     stroke="#E06C1F"
//                     strokeWidth="8"
//                     fill="none"
//                   />
//                   <text x="20" y="64" fill="#FFFFFF" fontFamily="system-ui" fontWeight="900" fontStyle="italic" fontSize="48" letterSpacing="-2">S</text>
//                   <text x="48" y="64" fill="#FFFFFF" fontFamily="system-ui" fontWeight="900" fontStyle="italic" fontSize="48" letterSpacing="-2">I</text>
//                   <path
//                     d="M 12,65 C 20,45 60,30 88,40"
//                     stroke="#E06C1F"
//                     strokeWidth="8"
//                     fill="none"
//                   />
//                 </svg>
//               </div>

//               <h3 className="font-display font-bold text-xl text-white mb-2 uppercase text-sm tracking-wider text-cyan-300">Our Mission Statement</h3>
//               <p className="text-sm text-white/60 leading-relaxed font-medium mb-6">
//                 "Our mission is to make digital services more accessible, efficient, and impactful, empowering individuals and businesses to thrive in an increasingly connected world by delivering customer-focused solutions."
//               </p>

//               {/* Dynamic feature items in box */}
//               <div className="space-y-3.5">
//                 <div className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
//                   <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
//                   <span className="text-xs font-bold text-white/80">Custom E-Commerce Storefronts</span>
//                 </div>
//                 <div className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
//                   <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shrink-0" />
//                   <span className="text-xs font-bold text-white/80">Digital Voucher & Gift Card Sales</span>
//                 </div>
//                 <div className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
//                   <span className="w-2.5 h-2.5 rounded-full bg-red-400 shrink-0" />
//                   <span className="text-xs font-bold text-white/80">IT Infrastructures & System Solutions</span>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
