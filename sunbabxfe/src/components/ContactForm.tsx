/// <reference types="vite/client" />
import React, { useState } from 'react';
import { Send, CheckCircle, Mail, Phone, MapPin, Sparkles, Server, Cpu, Globe, Info, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';

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

export default function ContactForm({ onLeadAdded }: ContactFormProps) {
  // Form Fields state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

  // EmailJS configuration values for editing/testing
  const [emailjsConfig, setEmailjsConfig] = useState({
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  });

  const [showConfigHelper, setShowConfigHelper] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    else if (formData.name.trim().length < 2) tempErrors.name = 'Name must be at least 2 characters';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) tempErrors.email = 'Email address is required';
    else if (!emailRegex.test(formData.email.trim())) tempErrors.email = 'Invalid email address';

    if (formData.phone.trim() && !/^[+0-9\s-]{6,20}$/.test(formData.phone.trim())) {
      tempErrors.phone = 'Invalid phone number format';
    }

    if (!formData.message.trim()) tempErrors.message = 'Inquiry message is required';
    else if (formData.message.trim().length < 10) tempErrors.message = 'Message must be at least 10 characters';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    logger.info('Contact inquiry submission triggered by client click.', { name: formData.name, email: formData.email, service: formData.service });

    if (!validate()) {
      logger.warn('Client-side form validation failed.', errors);
      return;
    }

    setIsSubmitting(true);
    setSubmissionResult(null);

    let serverSuccess = false;
    let serverEmailSent = false;
    let serverData: any = null;

    try {
      logger.info('Step 1/2: Attempting secure server-side lead ingestion and email forwarding...', { endpoint: '/api/contact' });
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        serverData = await response.json();
        serverSuccess = true;
        serverEmailSent = !!serverData.emailSent;
        logger.info('Secure server successfully stored the lead.', { serverResponse: serverData });
      } else {
        const errorText = await response.text();
        logger.warn('Secure server responded with a non-OK status. Dispatch failed.', { status: response.status, statusText: response.statusText, body: errorText });
      }
    } catch (err: any) {
      logger.error('Secure server endpoint is unreachable or thrown exception.', err, { message: err?.message });
    }

    // If server succeeded and email was sent successfully, we are fully successful!
    if (serverSuccess && serverEmailSent) {
      logger.info('Successful path completed. Server recorded the lead AND dispatched the Microsoft Graph or SMTP email alert.');
      setSubmissionResult({
        success: true,
        message: 'Message sent successfully!',
        details: 'Thank you! Your message has been received and our team will get back to you shortly.',
      });
      setFormData({ name: '', email: '', phone: '', company: '', service: 'IT Solutions', message: '' });
      if (onLeadAdded) onLeadAdded();
      setIsSubmitting(false);
      return;
    }

    // Otherwise, transparently execute the Direct EmailJS fallback from the browser!
    logger.warn('Server-side mail dispatch is pending or failed (SMTP/MS Graph credentials likely unconfigured). Initializing Step 2/2: Direct EmailJS fallback routing...');

    let serviceId = '';
    let templateId = '';
    let publicKey = '';

    try {
      logger.info('Fetching live EmailJS configuration from secure server endpoint /api/config/emailjs...');
      const configRes = await fetch('/api/config/emailjs');
      if (configRes.ok) {
        const liveConfig = await configRes.json();
        serviceId = liveConfig.serviceId;
        templateId = liveConfig.templateId;
        publicKey = liveConfig.publicKey;
        logger.info('Live EmailJS configuration fetched successfully from server.', {
          serviceId: serviceId ? `${serviceId.slice(0, 5)}...` : 'MISSING',
          templateId: templateId ? `${templateId.slice(0, 5)}...` : 'MISSING',
          publicKey: publicKey ? `${publicKey.slice(0, 5)}...` : 'MISSING'
        });
      }
    } catch (fetchErr) {
      logger.warn('Failed to fetch live EmailJS config from server. Falling back to local/bundled variables.', fetchErr);
    }

    // Fallback to state or bundled import.meta.env
    if (!serviceId) serviceId = emailjsConfig.serviceId || import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    if (!templateId) templateId = emailjsConfig.templateId || import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    if (!publicKey) publicKey = emailjsConfig.publicKey || import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

    logger.info('Evaluating final consolidated EmailJS credentials:', {
      serviceId: serviceId ? `${serviceId.slice(0, 5)}...` : 'MISSING',
      templateId: templateId ? `${templateId.slice(0, 5)}...` : 'MISSING',
      publicKey: publicKey ? `${publicKey.slice(0, 5)}...` : 'MISSING'
    });

    if (!serviceId || !templateId || !publicKey) {
      logger.error('EmailJS direct fallback aborted: Missing required credentials configuration.');
      // If client-side backup is missing config, but server saved lead, we can at least say saved.
      if (serverSuccess) {
        logger.info('Completing with partial success state. Lead is stored on server, but no automatic emails were dispatched.');
        setSubmissionResult({
          success: true,
          message: 'Message sent successfully!',
          details: 'Thank you! Your message has been received and our team will get back to you shortly.',
        });
        setFormData({ name: '', email: '', phone: '', company: '', service: 'IT Solutions', message: '' });
        if (onLeadAdded) onLeadAdded();
      } else {
        logger.error('Both server storage and EmailJS fallback failed. Informing user of total failure.');
        setSubmissionResult({
          success: false,
          message: 'Submission failed.',
          details: 'Secure server registry is offline, and browser backup EmailJS keys are not configured.',
        });
      }
      setIsSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'N/A',
        company: formData.company || 'N/A',
        service_selected: formData.service,
        message: formData.message,
        to_email: 'admin@sunbabx-innovations.com',
      };

      logger.info('Dispatching direct payload via @emailjs/browser SDK...', templateParams);
      const emailjsResponse = await emailjs.send(serviceId, templateId, templateParams, publicKey);

      if (emailjsResponse.status === 200) {
        logger.info('EmailJS browser direct transmission succeeded.', { response: emailjsResponse });

        // If the server didn't save the lead previously, try to back it up now
        if (!serverSuccess) {
          logger.info('Server was previously offline. Attempting post-send backup transmission to backend registry...');
          try {
            const backupResponse = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...formData, message: `[EmailJS Backup Dispatch] ${formData.message}` }),
            });
            logger.info('Server lead backup response received.', { status: backupResponse.status });
          } catch (e: any) {
            logger.warn('Failed to back up lead to server during post-send EmailJS fallback.', e);
          }
        }

        setSubmissionResult({
          success: true,
          message: 'Message sent successfully!',
          details: 'Thank you! Your message has been received and our team will get back to you shortly.',
        });
        setFormData({ name: '', email: '', phone: '', company: '', service: 'IT Solutions', message: '' });
        if (onLeadAdded) onLeadAdded();
      } else {
        throw new Error(`EmailJS responded with status: ${emailjsResponse.status}`);
      }
    } catch (emailjsErr: any) {
      logger.error('EmailJS direct delivery execution threw exception.', emailjsErr, { errorStack: emailjsErr?.stack });
      if (serverSuccess) {
        logger.warn('Inquiry was saved in server-side db, but direct EmailJS fallback also failed.');
        setSubmissionResult({
          success: true,
          message: 'Message sent successfully!',
          details: 'Thank you! Your message has been received and our team will get back to you shortly.',
        });
        setFormData({ name: '', email: '', phone: '', company: '', service: 'IT Solutions', message: '' });
        if (onLeadAdded) onLeadAdded();
      } else {
        logger.error('Critical failure: No mechanism successfully delivered the lead.');
        setSubmissionResult({
          success: false,
          message: 'Submission failed.',
          details: 'Both secure server registration and direct EmailJS routing encountered errors. Please retry.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicesList = ['IT Solutions', 'Retail & E-Commerce', 'Value-Added Services', 'Digital Products', 'Other Inquiry'];

  return (
    <section id="contact" className="py-24 bg-[#050b1a] relative overflow-hidden">
      <div className="absolute top-1/3 left-10 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none select-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4 select-none">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-cyan-300 tracking-wider uppercase">Contact Portal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight mb-4">
            Connect With Our Innovators
          </h2>
          <p className="text-sm text-white/60 font-medium leading-relaxed">
            Have an IT project, require retail consultancy, or want to integrate our value-added services? Fill out the portal inquiry and we will respond within 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Details */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-10">
            <div>
              <h3 className="font-display font-bold text-2xl text-white mb-3">Company Details</h3>
              <p className="text-sm text-white/50 font-medium leading-relaxed mb-8">
                SUNBABX-INNOVATIONS is based in Nigeria, operating globally to deliver seamless IT, cloud infrastructure, online retail stores, and innovative digital product checkouts.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white/5 text-cyan-400 rounded-xl shrink-0 shadow-xs border border-white/10">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Direct Email Integration</h4>
                    <a href="mailto:admin@sunbabx-innovations.com" className="text-sm font-semibold text-cyan-400 hover:underline">
                      admin@sunbabx-innovations.com
                    </a>
                    <p className="text-[11px] text-white/40 font-medium mt-0.5">Office 365 Outlook Mailbox</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white/5 text-orange-400 rounded-xl shrink-0 shadow-xs border border-white/10">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Inquiry Support Phone</h4>
                    <a href="tel:+2348169036052" className="text-sm font-semibold text-white/80 hover:text-orange-400">
                      +2348169036052
                    </a>
                    <p className="text-[11px] text-white/40 font-medium mt-0.5">Available Mon - Fri, 9am - 5pm</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-white/5 text-red-400 rounded-xl shrink-0 shadow-xs border border-white/10">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Corporate HQ</h4>
                    <p className="text-sm font-medium text-white/80">
                      Lagos, Nigeria
                    </p>
                    <p className="text-[11px] text-white/40 font-medium mt-0.5">Physical & Cloud Operations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick trust card */}
            <div className="bg-white/4 border border-white/10 rounded-xl p-5 select-none">
              <h4 className="font-bold text-cyan-400 text-xs uppercase tracking-wider mb-2">Our Quality Commitment</h4>
              <p className="text-[11px] text-white/60 leading-relaxed font-medium">
                "We bridge the gap between quality products and customers. Reliability, speed, and absolute satisfaction are our pillars. Every submission goes directly to our core review team."
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form Box */}
          <div className="lg:col-span-7">
            <div className="bg-white/4 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
              
              <div className="border-b border-white/10 pb-4 mb-6">
                <h4 className="font-display font-bold text-white text-lg text-left">Inquiry Details</h4>
                <p className="text-xs text-white/40 font-medium mt-1 text-left">Specify your interest and submit securely to our review panel.</p>
              </div>

              {/* Status Alert */}
              <AnimatePresence mode="wait">
                {submissionResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl mb-6 text-left border ${
                      submissionResult.success
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                        : 'bg-red-950/40 text-red-300 border-red-500/30'
                    }`}
                  >
                    <div className="flex gap-3">
                      {submissionResult.success ? (
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h5 className="font-bold text-sm leading-snug">{submissionResult.message}</h5>
                        {submissionResult.details && (
                          <p className="text-xs font-medium opacity-90 mt-1 leading-relaxed">
                            {submissionResult.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>



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
                  <div className="text-left">
                    <label className="block text-xs font-bold text-white/70 mb-1.5 uppercase tracking-wide">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +234 803 123 4567"
                      className={`w-full p-3 rounded-xl bg-white/5 border text-sm font-semibold text-white placeholder:text-white/20 focus:outline-hidden focus:ring-2 ${
                        errors.phone
                          ? 'border-red-400 focus:ring-red-500/20 text-red-300'
                          : 'border-white/10 focus:ring-cyan-500/20 focus:border-cyan-500'
                      }`}
                    />
                    {errors.phone && <p className="text-red-400 text-[11px] font-bold mt-1">{errors.phone}</p>}
                  </div>

                  {/* Company field */}
                  <div className="text-left">
                    <label className="block text-xs font-bold text-white/70 mb-1.5 uppercase tracking-wide">
                      Company Name (Optional)
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
                      Processing Submission...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Dispatch Inquiry to admin@sunbabx-innovations.com
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
