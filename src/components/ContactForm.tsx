/// <reference types="vite/client" />
import React, { useState } from 'react';
import {
  Send,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  BrainCircuit,
  Cloud,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ContactFormProps {
  onLeadAdded?: () => void;
}



// Custom client-side logging utility styled for senior developer diagnostics
const logger = {
  info: (message: string, context?: any) => {
    console.log(
      `%c[SUNBABX INFO] [${new Date().toLocaleTimeString()}] ${message}`,
      'color: #38bdf8; font-weight: bold; background: #0f172a; padding: 3px 6px; border-radius: 4px; border-left: 3px solid #0ea5e9;',
      context !== undefined ? context : ''
    );
  },
  warn: (message: string, context?: any) => {
    console.warn(
      `%c[SUNBABX WARN] [${new Date().toLocaleTimeString()}] ${message}`,
      'color: #fbbf24; font-weight: bold; background: #0f172a; padding: 3px 6px; border-radius: 4px; border-left: 3px solid #d97706;',
      context !== undefined ? context : ''
    );
  },
  error: (message: string, error?: any, context?: any) => {
    console.error(
      `%c[SUNBABX ERROR] [${new Date().toLocaleTimeString()}] ${message}`,
      'color: #f87171; font-weight: bold; background: #0f172a; padding: 3px 6px; border-radius: 4px; border-left: 3px solid #dc2626;',
      error !== undefined ? error : '',
      context !== undefined ? context : ''
    );
  }
};

const countryCodes = [
  { country: 'Nigeria', code: '+234' },
  { country: 'United Kingdom', code: '+44' },
  { country: 'United States', code: '+1' },
  { country: 'Canada', code: '+1' },

  { country: 'Ghana', code: '+233' },
  { country: 'South Africa', code: '+27' },
  { country: 'Kenya', code: '+254' },
  { country: 'Uganda', code: '+256' },
  { country: 'Tanzania', code: '+255' },
  { country: 'Rwanda', code: '+250' },
  { country: 'Ethiopia', code: '+251' },
  { country: 'Egypt', code: '+20' },
  { country: 'Cameroon', code: '+237' },
  { country: 'Côte d’Ivoire', code: '+225' },
  { country: 'Senegal', code: '+221' },
  { country: 'Zambia', code: '+260' },
  { country: 'Zimbabwe', code: '+263' },
  { country: 'Botswana', code: '+267' },
  { country: 'Namibia', code: '+264' },
  { country: 'Sierra Leone', code: '+232' },
  { country: 'Liberia', code: '+231' },
  { country: 'Gambia', code: '+220' },
  { country: 'Togo', code: '+228' },
  { country: 'Benin', code: '+229' },
  { country: 'Burkina Faso', code: '+226' },
  { country: 'Guinea', code: '+224' },
  { country: 'Mali', code: '+223' },
  { country: 'Niger', code: '+227' },
  { country: 'DR Congo', code: '+243' },
  { country: 'Republic of the Congo', code: '+242' },
  { country: 'Angola', code: '+244' },
  { country: 'Mozambique', code: '+258' },
  { country: 'Mauritius', code: '+230' },

  { country: 'Australia', code: '+61' },
  { country: 'New Zealand', code: '+64' },
  { country: 'India', code: '+91' },
  { country: 'China', code: '+86' },
  { country: 'Japan', code: '+81' },
  { country: 'South Korea', code: '+82' },
  { country: 'Singapore', code: '+65' },

  { country: 'United Arab Emirates', code: '+971' },
  { country: 'Saudi Arabia', code: '+966' },
  { country: 'Qatar', code: '+974' },

  { country: 'Germany', code: '+49' },
  { country: 'France', code: '+33' },
  { country: 'Italy', code: '+39' },
  { country: 'Spain', code: '+34' },
  { country: 'Netherlands', code: '+31' },
  { country: 'Switzerland', code: '+41' },
  { country: 'Sweden', code: '+46' },
  { country: 'Norway', code: '+47' },
  { country: 'Denmark', code: '+45' },
  { country: 'Ireland', code: '+353' },
  { country: 'Portugal', code: '+351' },
  { country: 'Belgium', code: '+32' },
  { country: 'Austria', code: '+43' },

  { country: 'Brazil', code: '+55' },
  { country: 'Mexico', code: '+52' },
  { country: 'Argentina', code: '+54' },
];

export default function ContactForm({ onLeadAdded }: ContactFormProps) {
  const [successMessage, setSuccessMessage] = useState("");
  // Form Fields state
const [formData, setFormData] = useState({
  name: '',
  email: '',
  countryCode: '+234',
  phone: '',
  company: '',
  service: 'IT Solutions',
  message: '',
});

  // Client-side validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
    details?: string;
  } | null>(null);

  const validate = () => {
  const tempErrors: Record<string, string> = {};

  if (!formData.name.trim())
    tempErrors.name = "Full name is required";

  if (!formData.email.trim()) {
    tempErrors.email = "Email is required";
} else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
) {
    tempErrors.email = "Invalid email address";
}

  if (!formData.message.trim())
    tempErrors.message = "Message is required";

  setErrors(tempErrors);

  return Object.keys(tempErrors).length === 0;
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as they type
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  logger.info("Submitting contact form", formData);

  if (!validate()) {
    logger.warn("Validation failed");
    return;
  }

  setIsSubmitting(true);
  setSubmissionResult(null);
  setSuccessMessage("");

  const controller = new AbortController();

  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, 20000);

  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      signal: controller.signal,

      body: JSON.stringify({
        ...formData,

        phone: formData.phone.trim()
          ? `${formData.countryCode} ${formData.phone.trim()}`
          : "",
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Unable to send message."
      );
    }

    logger.info("Contact email sent", result);

    setSuccessMessage("Success");

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 4000);

    setSubmissionResult({
      success: true,
      message: "Request Successfully Submitted",
      details:
        "Thank you for contacting SUNBABX INNOVATIONS. Your consultation request has been securely received, and a confirmation email has been sent to your inbox. Our engineering team will review your requirements and respond within one business day.",
    });

    setFormData({
      name: "",
      email: "",
      countryCode: "+234",
      phone: "",
      company: "",
      service: "IT Solutions",
      message: "",
    });

    onLeadAdded?.();

  } catch (err: any) {
    logger.error("Contact form submission failed", err);

    if (err?.name === "AbortError") {
      setSubmissionResult({
        success: false,
        message: "Request Timed Out",
        details:
          "The request took too long to complete. Please try again. Your information has not been cleared.",
      });
    } else {
      setSubmissionResult({
        success: false,
        message: "Unable to Submit Request",
        details:
          err?.message ||
          "We were unable to process your request. Please try again.",
      });
    }

  } finally {
    window.clearTimeout(timeoutId);
    setIsSubmitting(false);
  }
};


const servicesList = [
  'Enterprise Software Engineering',
  'Cybersecurity Engineering',
  'AI Security Solutions',
  'Fraud Detection Systems',
  'Secure Payment Gateway Integration',
  'Cloud Infrastructure Engineering',
  'API Engineering',
  'Enterprise Consultation',
];
  return (
    <section id="contact" className="py-24 bg-[#050b1a] relative overflow-hidden">
      <div className="absolute top-1/3 left-10 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none select-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4 select-none">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-300 tracking-wider uppercase">Enterprise Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-4">
            Let's Engineer Your Next Secure Solution
          </h2>
          <p className="text-sm text-white/60 font-medium leading-relaxed">
            Have an IT project, require retail consultancy, or want to integrate our value-added services? Fill out the portal inquiry and we will respond within 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Details */}
          {/* Left Column */}

<div className="lg:col-span-5 flex flex-col justify-between space-y-10">

  <div>

    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

      <ShieldCheck className="w-4 h-4 text-cyan-400" />

      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">
        Enterprise Engineering
      </span>

    </div>

    <h3 className="mt-6 text-3xl font-black text-white leading-tight">

      Secure by Engineering.
      <br />

      Intelligent by Design.

    </h3>

    <p className="mt-6 text-white/60 leading-8">

      We partner with organizations to engineer secure enterprise
      software, modern cybersecurity platforms, fraud detection
      systems, cloud infrastructure and AI-powered security
      solutions.

    </p>

  </div>

  {/* Core Expertise */}

  <div className="space-y-4">

    <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4">

      <BrainCircuit className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />

      <div>

        <h4 className="font-bold text-white">
          Enterprise Software Engineering
        </h4>

        <p className="text-sm text-white/55 mt-1">
          Secure business applications and enterprise platforms.
        </p>

      </div>

    </div>

    <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4">

      <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />

      <div>

        <h4 className="font-bold text-white">
          Cybersecurity Engineering
        </h4>

        <p className="text-sm text-white/55 mt-1">
          Security architecture, monitoring and fraud protection.
        </p>

      </div>

    </div>

    <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4">

      <Cloud className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />

      <div>

        <h4 className="font-bold text-white">
          Cloud Infrastructure
        </h4>

        <p className="text-sm text-white/55 mt-1">
          Secure cloud-native infrastructure and API engineering.
        </p>

      </div>

    </div>

  </div>

  {/* Contact Details */}

  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

    <h4 className="text-white font-bold mb-5">

      Engineering Consultation Center

    </h4>

    <div className="space-y-5">

      <div className="flex items-center gap-4">

        <Mail className="w-5 h-5 text-cyan-400" />

        <div>

          <p className="text-xs uppercase tracking-widest text-white/40">
            Email
          </p>

          <p className="text-white">
            admin@sunbabx-innovations.com
          </p>

        </div>

      </div>

      <div className="flex items-center gap-4">

        <Phone className="w-5 h-5 text-cyan-400" />

        <div>

          <p className="text-xs uppercase tracking-widest text-white/40">
            Phone
          </p>

          <p className="text-white">
            +234 904 841 0304
          </p>

        </div>

      </div>

      <div className="flex items-center gap-4">

        <MapPin className="w-5 h-5 text-cyan-400" />

        <div>

          <p className="text-xs uppercase tracking-widest text-white/40">
            Global Operations
          </p>

          <p className="text-white">
            Lagos, Nigeria
          </p>
          <p className="text-xs text-cyan-300 mt-2">
  Average response time: Less than 24 business hours
</p>

        </div>

      </div>

    </div>

  </div>

</div>

{/* Left Column */}

<div className="lg:col-span-5 flex flex-col justify-between">

  <div>

    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

      <ShieldCheck className="w-4 h-4 text-cyan-400" />

      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">
        Enterprise Engineering
      </span>

    </div>

    <h3 className="mt-6 text-4xl font-black leading-tight text-white">

      Secure by Engineering.

      <br />

      Intelligent by Design.

    </h3>

    <p className="mt-6 text-white/60 leading-8">

      We engineer secure enterprise software, AI-powered cybersecurity,
      fraud detection platforms, cloud infrastructure and resilient
      digital solutions that help organizations innovate with confidence.

    </p>

  </div>

  <div className="mt-10 space-y-5">

    {/* Card 1 */}

    <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

      <div className="flex gap-4">

        <ShieldCheck className="w-8 h-8 text-cyan-400 shrink-0" />

        <div>

          <h4 className="font-bold text-white">

            Cybersecurity Engineering

          </h4>

          <p className="mt-2 text-sm text-white/60 leading-6">

            Secure architectures, threat protection,
            fraud detection and enterprise resilience.

          </p>

        </div>

      </div>

    </div>

    {/* Card 2 */}

    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <div className="flex gap-4">

        <BrainCircuit className="w-8 h-8 text-cyan-400 shrink-0" />

        <div>

          <h4 className="font-bold text-white">

            AI Security Solutions

          </h4>

          <p className="mt-2 text-sm text-white/60 leading-6">

            Intelligent monitoring,
            anomaly detection and automated protection.

          </p>

        </div>

      </div>

    </div>

    {/* Card 3 */}

    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <div className="flex gap-4">

        <Cloud className="w-8 h-8 text-cyan-400 shrink-0" />

        <div>

          <h4 className="font-bold text-white">

            Cloud Infrastructure

          </h4>

          <p className="mt-2 text-sm text-white/60 leading-6">

            Secure Azure-ready cloud infrastructure,
            APIs and enterprise deployments.

          </p>

        </div>

      </div>

    </div>

    {/* Card 4 */}

    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

      <div className="flex gap-4">

        <Mail className="w-8 h-8 text-cyan-400 shrink-0" />

        <div>

          <h4 className="font-bold text-white">

            Engineering Consultation

          </h4>

          <p className="mt-2 text-sm text-white/60 leading-6">

            Every consultation is reviewed directly by our
            engineering team.

          </p>

        </div>

      </div>

    </div>

  </div>

  {/* Bottom Trust Banner */}

  <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6">

    <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">

      Enterprise Promise

    </p>

    <h4 className="mt-3 text-2xl font-black text-white">

      Security First.

      <br />

      Engineering Always.

    </h4>

    <p className="mt-4 text-sm leading-7 text-white/60">

      Every project is engineered with security,
      scalability and long-term maintainability
      at its core.

    </p>

  </div>

</div>

          {/* Right Column - Contact Form Box */}
         {/* Right Column */}

<div className="lg:col-span-7">

  <div className="bg-white/4 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

    <div className="border-b border-white/10 pb-6 mb-8">

      <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-1">

        <Sparkles className="w-4 h-4 text-cyan-400" />

        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-cyan-300">
          Enterprise Consultation
        </span>

      </span>

      <h3 className="mt-5 text-3xl font-black text-white">
        Tell Us About Your Project
      </h3>

      <p className="mt-3 text-white/55 leading-7">
       Complete the consultation request below. Every submission is securely
processed through our Microsoft 365 infrastructure and delivered directly
to our engineering team. An acknowledgement email will be sent to you
immediately, followed by a detailed response from one of our engineers.
      </p>

    </div>



              {/* Form elements */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="text-left">
                    <label className="block text-xs font-bold text-white/70 mb-1.5 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className={`w-full p-3 rounded-xl bg-white/5 border text-sm font-semibold text-white placeholder:text-white/20 focus:outline-hidden focus:ring-2 ${
                        errors.name
                          ? 'border-red-400 focus:ring-red-500/20 text-red-300'
                          : 'border-white/10 focus:ring-cyan-500/20 focus:border-cyan-500'
                      }`}
                    />
                    {errors.name && <p className="text-red-400 text-[11px] font-bold mt-1">{errors.name}</p>}
                  </div>

                  {/* Email field */}
                  <div className="text-left">
                    <label className="block text-xs font-bold text-white/70 mb-1.5 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@company.com"
                      className={`w-full p-3 rounded-xl bg-white/5 border text-sm font-semibold text-white placeholder:text-white/20 focus:outline-hidden focus:ring-2 ${
                        errors.email
                          ? 'border-red-400 focus:ring-red-500/20 text-red-300'
                          : 'border-white/10 focus:ring-cyan-500/20 focus:border-cyan-500'
                      }`}
                    />
                    {errors.email && <p className="text-red-400 text-[11px] font-bold mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone field */}
                  {/* Phone field */}
<div className="text-left">
  <label className="block text-xs font-bold text-white/70 mb-1.5 uppercase tracking-wide">
    Phone Number 
  </label>

  <div className="flex gap-2">
    {/* Country Code */}
    <select
      name="countryCode"
      value={formData.countryCode}
      onChange={handleInputChange}
      aria-label="Country calling code"
      className="w-[145px] shrink-0 p-3 rounded-xl bg-[#050b1a] border border-white/10 text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
    >
      {countryCodes.map((item) => (
        <option
          key={`${item.country}-${item.code}`}
          value={item.code}
          className="bg-[#050b1a] text-white"
        >
          {item.country} ({item.code})
        </option>
      ))}
    </select>

    {/* Phone Number */}
    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleInputChange}
      placeholder="803 123 4567"
      inputMode="tel"
      autoComplete="tel"
      className={`min-w-0 flex-1 p-3 rounded-xl bg-white/5 border text-sm font-semibold text-white placeholder:text-white/20 focus:outline-hidden focus:ring-2 ${
        errors.phone
          ? 'border-red-400 focus:ring-red-500/20 text-red-300'
          : 'border-white/10 focus:ring-cyan-500/20 focus:border-cyan-500'
      }`}
    />
  </div>

  <p className="text-[10px] text-white/30 mt-1.5">
    Select your country and enter your local phone number.
  </p>

  {errors.phone && (
    <p className="text-red-400 text-[11px] font-bold mt-1">
      {errors.phone}
    </p>
  )}
</div>

                  {/* Company field */}
                  <div className="text-left">
                    <label className="block text-xs font-bold text-white/70 mb-1.5 uppercase tracking-wide">
                      Company Name 
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Sunbabx Innovations Ltd"
                      className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Service Category Selection */}
                <div className="text-left">
                  <label className="block text-xs font-bold text-white/70 mb-1.5 uppercase tracking-wide">
                    Service Category *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-xl bg-[#050b1a] border border-white/10 text-white text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  >
                    {servicesList.map((srv) => (
                      <option key={srv} value={srv} className="bg-[#050b1a] text-white">
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message text area */}
                <div className="text-left">
                  <label className="block text-xs font-bold text-white/70 mb-1.5 uppercase tracking-wide">
                    Inquiry Message *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your IT setup requirements, digital catalog needs, or retail consult details..."
                    className={`w-full p-3 rounded-xl bg-white/5 border text-sm font-semibold text-white placeholder:text-white/20 focus:outline-hidden focus:ring-2 ${
                      errors.message
                        ? 'border-red-400 focus:ring-red-500/20 text-red-300'
                        : 'border-white/10 focus:ring-cyan-500/20 focus:border-cyan-500'
                    }`}
                  />
                  {errors.message && <p className="text-red-400 text-[11px] font-bold mt-1">{errors.message}</p>}
                </div>

                {/* Form CTA Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 select-none uppercase tracking-wider text-xs ${
                    isSubmitting
                      ? 'bg-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-cyan-500/30 hover:scale-[1.01] active:scale-[0.99]'
                  }`}
                >
                  {isSubmitting ? (
  <>
    <Loader2 className="w-5 h-5 animate-spin" />
    Sending Secure Request...
  </>
) : (
  <>
    <Send className="w-4 h-4" />
    Submit Secure Consultation Request
  </>
)}


                </button>
                                {successMessage && (
  <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-center">
    <p className="text-sm font-bold text-emerald-400">
      Success
    </p>
  </div>
)}
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
