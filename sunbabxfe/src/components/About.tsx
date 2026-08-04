import React from 'react';
import { Target, Users, ShieldCheck, HeartHandshake, Eye, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const values = [
    {
      title: 'Customer-Focused',
      desc: 'We place user priorities at the core of our strategy, molding systems that meet authentic needs.',
      icon: Users,
      color: 'text-cyan-400 bg-cyan-500/10 border border-cyan-400/10',
    },
    {
      title: 'Reliable Systems',
      desc: 'Our digital solutions are backed by high uptime, strict protocols, and solid code.',
      icon: ShieldCheck,
      color: 'text-orange-400 bg-orange-500/10 border border-orange-400/10',
    },
    {
      title: 'Accessible & Efficient',
      desc: 'Simplifying complex IT and retail integrations so they are accessible and impactful for everyone.',
      icon: Target,
      color: 'text-red-400 bg-red-500/10 border border-red-400/10',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#050b1a]/60 border-y border-white/5 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none select-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* About Left - Story */}
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-bold text-cyan-300 tracking-wider uppercase">Our Philosophy</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-6">
              Empowering Individuals & Businesses in a Connected World
            </h2>
            
            <div className="space-y-4 text-white/60 font-medium leading-relaxed">
              <p>
                At <strong className="text-cyan-400 font-extrabold">SUNBABX-INNOVATIONS</strong>, we are a technology-driven organization specializing in the delivery of digital solutions, reliable web stores, and a wide array of value-added integrations.
              </p>
              <p>
                We are committed to bridging the gap between quality products and customers by designing solutions that are robust, accessible, and user-centric. In an increasingly connected global landscape, we serve as a trusted technical partner that simplifies digital operations and enhances everyday life.
              </p>
            </div>

            {/* Quote block */}
            <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10 shadow-inner relative backdrop-blur-md">
              <span className="absolute -top-3 left-6 px-3 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wide rounded-full">
                Core Mission
              </span>
              <p className="text-sm font-semibold text-white/80 italic leading-relaxed pt-2">
                "Our mission is to make digital services more accessible, efficient, and impactful, empowering our customers to operate and grow safely without structural limitations."
              </p>
            </div>
          </div>

          {/* About Right - Pillars & Values */}
          <div className="lg:col-span-6">
            <div className="space-y-6">
              <h3 className="text-[10px] font-extrabold text-white/40 uppercase tracking-[0.2em] mb-4 text-left">
                Why SUNBABX-INNOVATIONS?
              </h3>

              <div className="grid grid-cols-1 gap-6">
                {values.map((value, idx) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="bg-white/4 p-6 rounded-xl border border-white/10 shadow-xs flex gap-5 items-start text-left hover:bg-white/8 transition-colors"
                    >
                      <div className={`p-3 rounded-lg shrink-0 ${value.color}`}>
                        <Icon className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base mb-1.5">{value.title}</h4>
                        <p className="text-xs text-white/50 font-medium leading-relaxed">{value.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Achievements banner */}
              <div className="grid grid-cols-3 gap-4 bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-white/10 p-6 rounded-xl text-white shadow-md text-center mt-8 backdrop-blur-md">
                <div>
                  <div className="text-2xl font-black font-display text-white">100%</div>
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Uptime SLA</div>
                </div>
                <div>
                  <div className="text-2xl font-black font-display text-white">5k+</div>
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Vouchers Sold</div>
                </div>
                <div>
                  <div className="text-2xl font-black font-display text-white">24/7</div>
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Monitoring</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
