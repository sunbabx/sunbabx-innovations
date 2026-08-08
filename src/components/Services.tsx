import React from 'react';
import {
  ShieldCheck,
  BrainCircuit,
  Cloud,
  LockKeyhole,
  Workflow,
  ServerCog,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Services() {
  const serviceCategories = [
    {
      id: 'enterprise-software',
      title: 'Enterprise Software Engineering',
      subtitle: 'Mission-Critical Platforms',
      description:
        'We design and engineer secure enterprise applications that automate operations, improve efficiency, and support long-term business growth.',
      icon: Workflow,
      color: '#22d3ee',
      bgClass: 'hover:border-cyan-500/30',
      badgeColor: 'bg-cyan-500/10 text-cyan-300',
      features: [
        {
          title: 'Enterprise Applications',
          desc: 'Business platforms, portals, ERP, CRM and workflow automation.',
        },
        {
          title: 'API Engineering',
          desc: 'Secure REST APIs and enterprise integrations.',
        },
        {
          title: 'System Integration',
          desc: 'Connecting existing systems into one secure ecosystem.',
        },
        {
          title: 'Modern Architecture',
          desc: 'Scalable solutions built for reliability and future growth.',
        },
      ],
    },

    {
      id: 'cybersecurity',
      title: 'Cybersecurity Engineering',
      subtitle: 'Secure by Design',
      description:
        'Security is engineered into every solution from architecture through deployment, helping organizations reduce risk and improve resilience.',
      icon: ShieldCheck,
      color: '#38bdf8',
      bgClass: 'hover:border-sky-500/30',
      badgeColor: 'bg-sky-500/10 text-sky-300',
      features: [
        {
          title: 'Threat Detection',
          desc: 'Continuous monitoring and intelligent threat visibility.',
        },
        {
          title: 'Fraud Detection',
          desc: 'Detection systems for financial and transactional fraud.',
        },
        {
          title: 'Identity Protection',
          desc: 'Authentication, authorization and access control.',
        },
        {
          title: 'Security Assessment',
          desc: 'Engineering reviews and secure architecture recommendations.',
        },
      ],
    },

    {
      id: 'cloud-ai',
      title: 'Cloud & AI Security',
      subtitle: 'Future Ready Infrastructure',
      description:
        'Cloud-native engineering combined with AI-powered security solutions for resilient enterprise environments.',
      icon: Cloud,
      color: '#60a5fa',
      bgClass: 'hover:border-indigo-500/30',
      badgeColor: 'bg-indigo-500/10 text-indigo-300',
      features: [
        {
          title: 'Cloud Infrastructure',
          desc: 'Azure-ready secure infrastructure engineering.',
        },
        {
          title: 'Secure Payment APIs',
          desc: 'Reliable payment gateway integration and protection.',
        },
        {
          title: 'AI Security',
          desc: 'Anomaly detection and intelligent security automation.',
        },
        {
          title: 'Cloud Operations',
          desc: 'Scalable deployment, monitoring and resilience.',
        },
      ],
    },
  ];

  return (
  <section
    id="services"
    className="relative overflow-hidden bg-[#050b1a] py-24">
    {/* Background */}

    <div className="absolute inset-0 pointer-events-none">

      <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="absolute bottom-[-180px] right-[-120px] h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[150px]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:34px_34px]" />

      </div><div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

      {/* Section Header */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .5 }}
        className="max-w-3xl mx-auto text-center"
      >

        <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">

          Core Engineering Capabilities

        </span>

        <h2 className="mt-8 text-4xl md:text-5xl font-black tracking-tight text-white">

          Secure Engineering
          <br />

          Built Around Trust

        </h2>

        <p className="mt-8 text-lg leading-8 text-white/60">

          We engineer enterprise software, cybersecurity solutions,
          AI-powered security platforms, cloud infrastructure and
          secure digital ecosystems designed for organizations that
          demand resilience, scalability and long-term reliability.

        </p>

      </motion.div>

      {/* Cards */}

      <div className="mt-20 grid gap-8 lg:grid-cols-3"></div>
              {serviceCategories.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.12,
              }}
              className={`group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 ${service.bgClass}`}
            >
              <div className="p-8">

                {/* Header */}

                <div className="flex items-center justify-between">

                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: `${service.color}20`,
                    }}
                  >
                    <Icon
                      className="h-8 w-8"
                      style={{ color: service.color }}
                    />
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] ${service.badgeColor}`}
                  >
                    {service.subtitle}
                  </span>

                </div>

                <h3 className="mt-8 text-2xl font-black text-white">
                  {service.title}
                </h3>

                <p className="mt-5 text-sm leading-7 text-white/60">
                  {service.description}
                </p>

                {/* Features */}

                <div className="mt-8 space-y-4">

                  {service.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="rounded-2xl border border-white/5 bg-[#050b1a]/60 p-4"
                    >
                      <div className="flex items-start gap-3">

                        <div className="mt-1">

                          <LockKeyhole
                            className="h-4 w-4"
                            style={{ color: service.color }}
                          />

                        </div>

                        <div>

                          <h4 className="font-semibold text-white">
                            {feature.title}
                          </h4>

                          <p className="mt-1 text-sm leading-6 text-white/50">
                            {feature.desc}
                          </p>

                        </div>

                      </div>
                    </div>
                  ))}

                </div>

                {/* CTA */}

                <button
                  className="mt-10 inline-flex items-center gap-2 font-semibold text-cyan-300 transition-all group-hover:gap-3"
                >
                  Learn More

                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>
            </motion.div>
          );
        })}
      </div>
            {/* Enterprise Trust Banner */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-24 overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10"
      >
        <div className="grid gap-8 px-10 py-12 lg:grid-cols-2 lg:items-center">

          <div>

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
              Secure by Engineering
            </span>

            <h3 className="mt-4 text-3xl font-black text-white">
              Engineering Solutions That Scale With Your Business
            </h3>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/60">
              Every solution is designed with security, performance and
              long-term maintainability in mind. We combine software
              engineering, cybersecurity and cloud technologies to build
              resilient digital platforms that organizations can trust.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <ShieldCheck className="mb-3 h-7 w-7 text-cyan-400" />

              <h4 className="font-bold text-white">
                Secure Architecture
              </h4>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Security integrated into every engineering decision.
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <BrainCircuit className="mb-3 h-7 w-7 text-cyan-400" />

              <h4 className="font-bold text-white">
                AI Ready
              </h4>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Intelligent systems built for the next generation.
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <ServerCog className="mb-3 h-7 w-7 text-cyan-400" />

              <h4 className="font-bold text-white">
                Cloud Native
              </h4>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Modern infrastructure designed for scalability.
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <Cloud className="mb-3 h-7 w-7 text-cyan-400" />

              <h4 className="font-bold text-white">
                Enterprise Grade
              </h4>

              <p className="mt-2 text-sm leading-6 text-white/50">
                Built for organizations that demand reliability.
              </p>

            </div>

          </div>

        </div>
      </motion.div>

      
    </section>   );
}


// import React from 'react';
// import { Laptop, ShoppingCart, Smartphone, ArrowRight } from 'lucide-react';
// import { motion } from 'motion/react';

// export default function Services() {
//   const serviceCategories = [
//     {
//       id: 'it-solutions',
//       title: 'IT Solutions',
//       subtitle: 'Technical Advancement',
//       description: 'Robust and reliable IT strategies and custom implementations designed to empower enterprises and modernize routine corporate structures.',
//       icon: Laptop,
//       color: '#22d3ee', // Cyan-400
//       bgClass: 'hover:border-cyan-500/30',
//       badgeColor: 'bg-cyan-500/10 text-cyan-400',
//       features: [
//         { title: 'Custom Software Development', desc: 'Crafting tailored web, mobile, and enterprise apps aligned with specific operations.' },
//         { title: 'Cloud Migrations & Databases', desc: 'Securing structural data using scalable cloud platforms and server arrays.' },
//         { title: 'Network Design & Safety', desc: 'Establishing bulletproof local network infrastructures with professional safety.' },
//         { title: 'IT Support & Diagnostics', desc: 'Delivering continuous technical support to resolve problems instantly.' }
//       ]
//     },
//     {
//       id: 'retail-ecommerce',
//       title: 'Retail & E-Commerce',
//       subtitle: 'Digital Commerce',
//       description: 'Bridging the gap between quality products and consumers. We launch, scale, and optimize beautiful online marketplaces and digital product storefronts.',
//       icon: ShoppingCart,
//       color: '#fb923c', // Orange-400
//       bgClass: 'hover:border-orange-500/30',
//       badgeColor: 'bg-orange-500/10 text-orange-400',
//       features: [
//         { title: 'Online Store Creation', desc: 'Designing modern e-commerce storefronts with seamless checkouts.' },
//         { title: 'Digital Product Distribution', desc: 'Highly automated sales of software, gift vouchers, and premium keys.' },
//         { title: 'Payment Gateways Setup', desc: 'Integrating localized merchant accounts and international payment checkouts.' },
//         { title: 'E-Commerce Consultancy', desc: 'Devising strategic marketing, inventory, and fulfillment plans.' }
//       ]
//     },
//     {
//       id: 'value-added',
//       title: 'Value-Added Services',
//       subtitle: 'Digital Innovation',
//       description: 'Enhancing everyday life through digital innovation. We integrate convenient platforms for bill settlements, micro-transactions, and utilities.',
//       icon: Smartphone,
//       color: '#f87171', // Red-400
//       bgClass: 'hover:border-red-500/30',
//       badgeColor: 'bg-red-500/10 text-red-400',
//       features: [
//         { title: 'Utility Payments Gateway', desc: 'Fast, secure channels to clear electricity, internet, and TV subscriptions.' },
//         { title: 'Dedicated Vouchering Engine', desc: 'Crafting specialized voucher cards and dynamic discount models.' },
//         { title: 'Mobile Refills & Recharges', desc: 'Automating mass data bundles and airtime disbursements.' },
//         { title: 'Premium Digital Goods', desc: 'Curated gift cards and entertainment subscription managers.' }
//       ]
//     }
//   ];

//   return (
//     <section id="services" className="py-24 bg-[#050b1a] relative overflow-hidden">
//       {/* Decorative gradient lines */}
//       <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-white/5 via-transparent to-white/5 pointer-events-none" />
//       <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
//         {/* Section Heading */}
//         <div className="text-center max-w-3xl mx-auto mb-20">
//           <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
//             <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
//             <span className="text-xs font-bold text-cyan-300 tracking-wider uppercase">What We Offer</span>
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-4">
//             Sunbabx Innovations Core Service Offerings
//           </h2>
//           <p className="text-base text-white/60 font-medium leading-relaxed">
//             From enterprise IT infrastructure to modern e-commerce storefronts, Sunbabx Innovations builds digital experiences that drive growth, innovation, and customer trust.
//           </p>
//         </div>

//         {/* Categories Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
//           {serviceCategories.map((category, idx) => {
//             const IconComponent = category.icon;
//             return (
//               <motion.div
//                 key={category.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-100px' }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 className={`bg-white/4 backdrop-blur-md border border-white/10 rounded-2xl p-8 transition-all duration-300 shadow-xl hover:bg-white/10 flex flex-col justify-between ${category.bgClass}`}
//               >
//                 <div>
//                   {/* Category Header */}
//                   <div className="flex items-start justify-between mb-6">
//                     <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 shadow-inner" style={{ color: category.color }}>
//                       <IconComponent className="w-7 h-7" />
//                     </div>
//                     <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${category.badgeColor}`}>
//                       {category.subtitle}
//                     </span>
//                   </div>

//                   <h3 className="text-2xl font-bold font-display text-white mb-3">{category.title}</h3>
//                   <p className="text-sm text-white/50 font-medium leading-relaxed mb-8">{category.description}</p>

//                   {/* Feature Bullets list */}
//                   <div className="space-y-4">
//                     {category.features.map((feature, fIdx) => (
//                       <div key={fIdx} className="flex gap-3">
//                         <div className="mt-1 shrink-0">
//                           <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: category.color }} />
//                         </div>
//                         <div className="flex flex-col">
//                           <h4 className="text-xs font-bold text-white/90 leading-none mb-1">{feature.title}</h4>
//                           <span className="text-xs text-white/40 leading-tight font-medium">{feature.desc}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Card CTA */}
//                 <div className="mt-10 pt-6 border-t border-white/5">
//                   <a
//                     href="#contact"
//                     className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors group uppercase tracking-wider"
//                     style={{ color: category.color }}
//                   >
//                     Inquire about {category.title}
//                     <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
//                   </a>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Bottom Callout */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 backdrop-blur-md shadow-xl"
//         >
//           <div className="text-left">
//             <h4 className="font-display font-bold text-lg text-white mb-1">Need a custom solution tailored for your team?</h4>
//             <p className="text-xs font-medium text-white/50">Our senior technologists will assess your requirements and deploy specialized setups.</p>
//           </div>
//           <a
//             href="#contact"
//             className="shrink-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/30 uppercase tracking-wider"
//           >
//             Schedule Free Strategy Call
//           </a>
//         </motion.div>

//       </div>
//     </section>
//   );
// }
