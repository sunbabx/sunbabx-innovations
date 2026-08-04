import React, { useState, useEffect } from 'react';
import { KeyRound, ShieldAlert, Users, Search, Download, Trash2, CheckCircle2, RotateCcw, AlertTriangle, FileSpreadsheet, ClipboardList, Eye, Plus, Check } from 'lucide-react';
import { Lead } from '../types.js';
import { motion, AnimatePresence } from 'motion/react';

interface LeadDashboardProps {
  refreshTrigger: number;
}

export default function LeadDashboard({ refreshTrigger }: LeadDashboardProps) {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Microsoft Graph Mail Composer States
  const [mailRecipient, setMailRecipient] = useState('');
  const [mailSubject, setMailSubject] = useState('');
  const [mailBody, setMailBody] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [mailStatus, setMailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [mailMessage, setMailMessage] = useState('');
  const [composerTab, setComposerTab] = useState<'edit' | 'preview'>('edit');
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

  const mailTemplates: Record<string, { subject: string; body: string }> = {
    blank: { subject: '', body: '' },
    followup: {
      subject: 'Following up on your inquiry with SUNBABX-INNOVATIONS',
      body: `<div style="font-family: Arial, sans-serif; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
  <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px; text-align: center; color: white; border-bottom: 3px solid #06b6d4;">
    <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #38bdf8; letter-spacing: -0.025em;">SUNBABX-INNOVATIONS</h1>
    <p style="margin: 4px 0 0 0; font-size: 11px; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.05em;">Enterprise IT Solutions & Services</p>
  </div>
  <div style="padding: 24px;">
    <p style="font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 0;">Hello,</p>
    <p>Thank you for reaching out to SUNBABX-INNOVATIONS! We have received your inquiry and wanted to follow up with you directly.</p>
    <p>Our specialists are currently reviewing your request. We would love to set up a quick 15-minute call to discuss your objectives and how we can support your business with custom IT solutions, e-commerce rollouts, or value-added digital integrations.</p>
    <p>Please let us know your availability over the next few days, or reply directly to this email.</p>
    <p style="margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px; margin-bottom: 0; font-size: 13px; color: #64748b;">
      Best regards,<br/>
      <strong style="color: #0284c7; font-weight: 700;">SUNBABX Administrative Team</strong>
    </p>
  </div>
</div>`
    },
    it: {
      subject: 'Pillar Proposal: Custom Enterprise IT Solutions - SUNBABX-INNOVATIONS',
      body: `<div style="font-family: Arial, sans-serif; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
  <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px; text-align: center; color: white; border-bottom: 3px solid #06b6d4;">
    <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #38bdf8; letter-spacing: -0.025em;">SUNBABX-INNOVATIONS</h1>
    <p style="margin: 4px 0 0 0; font-size: 11px; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.05em;">Enterprise IT Solutions & Engineering</p>
  </div>
  <div style="padding: 24px;">
    <p style="font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 0;">Hello,</p>
    <p>We are delighted to submit our preliminary IT Consulting & Engineering framework for your review.</p>
    <p>At SUNBABX-INNOVATIONS, we specialize in building highly resilient cloud environments, automating manual operational pipelines, and designing high-performance custom software systems tailored precisely to your brand's growth plans.</p>
    <p style="font-weight: 700; color: #0f172a; margin-bottom: 8px;">Our core development capabilities include:</p>
    <ul style="margin-top: 0; padding-left: 20px;">
      <li style="margin-bottom: 6px;">Full-stack Web and Custom Software Engineering</li>
      <li style="margin-bottom: 6px;">Scalable Server Configurations & Secure Cloud Operations</li>
      <li style="margin-bottom: 6px;">Corporate CRM & Automation Pipelines</li>
    </ul>
    <p>We are prepared to schedule a direct interactive architecture session with your team to detail scope, timeline, and budget.</p>
    <p style="margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px; margin-bottom: 0; font-size: 13px; color: #64748b;">
      Warm regards,<br/>
      <strong style="color: #0284c7; font-weight: 700;">SUNBABX Engineering & Tech Team</strong>
    </p>
  </div>
</div>`
    },
    ecommerce: {
      subject: 'Premium E-Commerce Launch Strategy - SUNBABX-INNOVATIONS',
      body: `<div style="font-family: Arial, sans-serif; color: #334155; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
  <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px; text-align: center; color: white; border-bottom: 3px solid #06b6d4;">
    <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #38bdf8; letter-spacing: -0.025em;">SUNBABX-INNOVATIONS</h1>
    <p style="margin: 4px 0 0 0; font-size: 11px; opacity: 0.8; text-transform: uppercase; letter-spacing: 0.05em;">Retail & E-Commerce Implementations</p>
  </div>
  <div style="padding: 24px;">
    <p style="font-size: 16px; font-weight: bold; color: #0f172a; margin-top: 0;">Hello,</p>
    <p>We noticed your interest in our E-Commerce & digital storefront solutions. E-commerce is one of our flagship specializations, helping brands tap into local and global markets instantly.</p>
    <p>Our unified strategy focuses on premium storefront layout, robust inventory tracking, high-converting checkout forms, and secure local/international gateway payment integrations.</p>
    <p>Let's map out a customized digital storefront roadmap for your product lineup. Reply to this mail to coordinate a timeline!</p>
    <p style="margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px; margin-bottom: 0; font-size: 13px; color: #64748b;">
      Best regards,<br/>
      <strong style="color: #0284c7; font-weight: 700;">SUNBABX Retail Integration Team</strong>
    </p>
  </div>
</div>`
    }
  };

  const handleTemplateChange = (templateKey: string) => {
    setSelectedTemplate(templateKey);
    const selected = mailTemplates[templateKey];
    if (selected) {
      setMailSubject(selected.subject);
      setMailBody(selected.body);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mailRecipient.trim() || !mailSubject.trim() || !mailBody.trim()) {
      setMailStatus('error');
      setMailMessage('Recipient email, Subject, and HTML Content are all required.');
      return;
    }

    setMailStatus('sending');
    setMailMessage('');

    try {
      const response = await fetch(`${apiBaseUrl}/api/admin/send-email?password=${encodeURIComponent(password)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({
          toEmail: mailRecipient,
          subject: mailSubject,
          contentHtml: mailBody
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setMailStatus('success');
        setMailMessage(data.message || 'Email successfully sent via Microsoft Graph API!');
        // Clear composer state for next dispatch
        setMailSubject('');
        setMailBody('');
        setSelectedTemplate('blank');
      } else {
        setMailStatus('error');
        setMailMessage(data.error || 'Microsoft Graph API failed to dispatch email. Check logs.');
      }
    } catch (err: any) {
      console.error(err);
      setMailStatus('error');
      setMailMessage('Network connection error while communicating with mail backend.');
    }
  };

  const selectLeadForReply = (leadEmail: string, leadName: string) => {
    setMailRecipient(leadEmail);
    setSelectedTemplate('followup');
    const template = mailTemplates.followup;
    setMailSubject(`Following up on your inquiry with SUNBABX-INNOVATIONS`);
    // Insert personalized greeting
    const personalizedBody = template.body.replace('Hello,', `Hello ${leadName},`);
    setMailBody(personalizedBody);
    setComposerTab('edit');

    // Scroll to composer panel
    const element = document.getElementById('msgraph-mailer-panel');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filtering and searching state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  // Internal admin note state
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Fetch leads from backend
  const fetchLeads = async (pw: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/api/leads?password=${encodeURIComponent(pw)}`, {
        headers: {
          'Authorization': `Bearer ${pw}`
        }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setLeads(data.leads);
        setIsUnlocked(true);
        setError(null);
      } else {
        setError(data.error || 'Authentication failed. Please verify your admin password.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Could not connect to lead server. Verify that the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      fetchLeads(password);
    }
  }, [refreshTrigger]);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please input an administrative password');
      return;
    }
    fetchLeads(password);
  };

  // Update lead status
  const updateLeadStatus = async (id: string, newStatus: 'new' | 'contacted' | 'resolved') => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/leads/${id}?password=${encodeURIComponent(password)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update lead status');
      }
    } catch (err) {
      console.error(err);
      alert('Network failure while updating status');
    }
  };

  // Update lead notes
  const saveNotes = async (id: string) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/leads/${id}?password=${encodeURIComponent(password)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({ notes: tempNotes })
      });
      if (response.ok) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, notes: tempNotes } : l));
        setEditingNotesId(null);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save administrative notes');
      }
    } catch (err) {
      console.error(err);
      alert('Network failure while saving notes');
    }
  };

  // Delete lead
  const deleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this lead? This action is irreversible.')) {
      return;
    }
    try {
      const response = await fetch(`${apiBaseUrl}/api/leads/${id}?password=${encodeURIComponent(password)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });
      if (response.ok) {
        setLeads(prev => prev.filter(l => l.id !== id));
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete lead');
      }
    } catch (err) {
      console.error(err);
      alert('Network failure while deleting lead');
    }
  };

  // CSV Lead Export
  const exportToCSV = () => {
    if (leads.length === 0) return;

    const headers = ['Lead ID', 'Name', 'Email', 'Phone', 'Company', 'Service Requested', 'Message', 'Created At', 'Status', 'Admin Notes'];
    const rows = leads.map(l => [
      l.id,
      l.name,
      l.email,
      l.phone || '',
      l.company || '',
      l.service,
      l.message.replace(/\n/g, ' '),
      new Date(l.createdAt).toLocaleString(),
      l.status,
      (l.notes || '').replace(/\n/g, ' ')
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sunbabx_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset Lock
  const handleLock = () => {
    setIsUnlocked(false);
    setPassword('');
    setLeads([]);
  };

  // Filter Logic
  const filteredLeads = leads.filter(l => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      l.name.toLowerCase().includes(query) ||
      l.email.toLowerCase().includes(query) ||
      (l.phone || '').toLowerCase().includes(query) ||
      (l.company || '').toLowerCase().includes(query) ||
      l.message.toLowerCase().includes(query) ||
      l.service.toLowerCase().includes(query);

    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const matchesService = serviceFilter === 'all' || l.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  // Stats calculation
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'new').length;
  const contactedLeadsCount = leads.filter(l => l.status === 'contacted').length;
  const resolvedLeadsCount = leads.filter(l => l.status === 'resolved').length;

  return (
    <section id="admin-dashboard" className="py-16 bg-[#050b1a] text-white relative border-t border-white/5">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-white/5 pb-8 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-[10px] font-bold text-cyan-300 tracking-widest uppercase">Admin Operations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
              Administrative Lead Console
            </h2>
            <p className="text-xs text-white/50 font-medium mt-1">
              Verify client submissions, update status cycles, and safely export data records.
            </p>
          </div>

          {isUnlocked && (
            <button
              onClick={handleLock}
              className="mt-4 md:mt-0 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 self-start transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Lock Console
            </button>
          )}
        </div>

        {/* Content Toggle */}
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            /* locked view */
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-md mx-auto bg-white/4 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 text-center shadow-2xl"
            >
              <div className="w-14 h-14 bg-white/5 border border-white/10 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <KeyRound className="w-6 h-6" />
              </div>

              <h3 className="font-display font-bold text-lg mb-2 text-white">Console Lockout Active</h3>
              <p className="text-xs text-white/50 font-medium leading-relaxed mb-6">
                Please provide the corporate admin security password to establish connection and fetch active leads records.
              </p>

              {error && (
                <div className="p-3.5 bg-red-950/40 border border-red-500/30 text-red-300 rounded-xl text-xs font-semibold text-left mb-5 flex gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleUnlockSubmit} className="space-y-4">
                <div className="text-left">
                  <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase tracking-widest">
                    Security Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password..."
                    className="w-full p-3 bg-[#050b1a] border border-white/10 rounded-xl text-sm font-semibold text-white placeholder-white/20 focus:outline-hidden focus:border-cyan-500/50"
                  />
                  <p className="text-[10px] text-white/40 font-medium mt-1 text-left italic">
                    
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-cyan-500/10 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  {loading ? 'Decrypting Vault...' : 'Unlock Administrative Console'}
                </button>
              </form>
            </motion.div>
          ) : (
            /* unlocked view */
            <motion.div
              key="unlocked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/4 backdrop-blur-md border border-white/10 rounded-xl p-5 text-left flex items-center gap-4">
                  <div className="p-3 bg-white/5 text-cyan-400 border border-white/10 rounded-lg shrink-0">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-white/40 font-bold leading-none block mb-1">Total Leads</span>
                    <span className="text-2xl font-black font-display text-white">{totalLeads}</span>
                  </div>
                </div>

                <div className="bg-white/4 backdrop-blur-md border border-white/10 rounded-xl p-5 text-left flex items-center gap-4">
                  <div className="p-3 bg-white/5 text-orange-400 border border-white/10 rounded-lg shrink-0">
                    <AlertTriangle className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs text-white/40 font-bold leading-none block mb-1">New Inquiries</span>
                    <span className="text-2xl font-black font-display text-white">{newLeadsCount}</span>
                  </div>
                </div>

                <div className="bg-white/4 backdrop-blur-md border border-white/10 rounded-xl p-5 text-left flex items-center gap-4">
                  <div className="p-3 bg-white/5 text-red-400 border border-white/10 rounded-lg shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-white/40 font-bold leading-none block mb-1">Contacted</span>
                    <span className="text-2xl font-black font-display text-white">{contactedLeadsCount}</span>
                  </div>
                </div>

                <div className="bg-white/4 backdrop-blur-md border border-white/10 rounded-xl p-5 text-left flex items-center gap-4">
                  <div className="p-3 bg-white/5 text-emerald-400 border border-white/10 rounded-lg shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-white/40 font-bold leading-none block mb-1">Resolved</span>
                    <span className="text-2xl font-black font-display text-white">{resolvedLeadsCount}</span>
                  </div>
                </div>
              </div>

              {/* Microsoft Graph Mail Dispatcher Panel */}
              <div id="msgraph-mailer-panel" className="bg-white/4 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 text-left shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center shrink-0">
                      <ClipboardList className="w-5 h-5 text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-white">Microsoft Graph Mail Dispatcher</h3>
                      <p className="text-xs text-white/50 font-medium">Draft corporate emails routed securely through the administrator's MS tenant mailbox.</p>
                    </div>
                  </div>

                  {/* Active credentials telemetry */}
                  <div className="bg-[#050b1a] border border-white/10 rounded-xl p-3 flex items-center gap-3 self-start lg:self-auto">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <div className="text-left">
                      <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider leading-none">Graph Status</p>
                      <p className="text-[11px] font-extrabold text-emerald-400 leading-tight mt-1">Ready • admin@sunbabx-innovation.com</p>
                    </div>
                  </div>
                </div>

                {mailMessage && (
                  <div className={`p-4 rounded-xl text-xs font-semibold mb-6 flex gap-2.5 items-start ${
                    mailStatus === 'success'
                      ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                      : 'bg-red-950/40 border border-red-500/30 text-red-300'
                  }`}>
                    {mailStatus === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    )}
                    <span>{mailMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSendEmail} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: Metadata / Inputs */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Recipient Email */}
                      <div>
                        <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase tracking-widest text-left">
                          Recipient Address
                        </label>
                        <input
                          type="email"
                          required
                          value={mailRecipient}
                          onChange={(e) => setMailRecipient(e.target.value)}
                          placeholder="client@company.com"
                          className="w-full p-3 bg-[#050b1a] border border-white/10 rounded-xl text-xs font-semibold text-white placeholder-white/20 focus:outline-hidden focus:border-cyan-500/50"
                        />
                      </div>

                      {/* Template Selector */}
                      <div>
                        <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase tracking-widest text-left">
                          Quick HTML Template
                        </label>
                        <select
                          value={selectedTemplate}
                          onChange={(e) => handleTemplateChange(e.target.value)}
                          className="w-full p-3 bg-[#050b1a] border border-white/10 rounded-xl text-xs font-semibold text-white/80 focus:outline-hidden focus:border-cyan-500/50"
                        >
                          <option value="blank">Blank Message (Custom HTML)</option>
                          <option value="followup">Corporate Follow-up / Thank You</option>
                          <option value="it">Enterprise IT Solutions Proposal</option>
                          <option value="ecommerce">Premium E-Commerce Platform Consultation</option>
                        </select>
                      </div>
                    </div>

                    {/* Subject Line */}
                    <div>
                      <label className="block text-[10px] font-bold text-white/50 mb-1.5 uppercase tracking-widest text-left">
                        Email Subject
                      </label>
                      <input
                        type="text"
                        required
                        value={mailSubject}
                        onChange={(e) => setMailSubject(e.target.value)}
                        placeholder="e.g. Project Consultation Details - SUNBABX-INNOVATIONS"
                        className="w-full p-3 bg-[#050b1a] border border-white/10 rounded-xl text-xs font-semibold text-white placeholder-white/20 focus:outline-hidden focus:border-cyan-500/50"
                      />
                    </div>

                    {/* Prompt info */}
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[11px] text-white/60 leading-relaxed font-medium">
                      💡 <strong className="text-cyan-300">UX Shortcut:</strong> You can click the <strong className="text-white">"Reply via Graph"</strong> button on any active client lead card below. This will automatically populate their email, select the follow-up template, personalize the greeting, and scroll you back here!
                    </div>

                    {/* Dispatch Button */}
                    <button
                      type="submit"
                      disabled={mailStatus === 'sending'}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-cyan-500/10 text-[#050b1a] font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {mailStatus === 'sending' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#050b1a]/20 border-t-[#050b1a] rounded-full animate-spin" />
                          Authentication & Mailing via Azure Graph...
                        </>
                      ) : (
                        <>
                          Dispatch Live Email via Microsoft Graph
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right Column: HTML Editor or Preview */}
                  <div className="flex flex-col h-full min-h-[320px]">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                      <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest text-left">
                        HTML Message Content
                      </label>
                      <div className="flex bg-[#050b1a] border border-white/10 rounded-lg p-0.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => setComposerTab('edit')}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                            composerTab === 'edit' ? 'bg-cyan-500 text-[#050b1a]' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Source Code
                        </button>
                        <button
                          type="button"
                          onClick={() => setComposerTab('preview')}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                            composerTab === 'preview' ? 'bg-cyan-500 text-[#050b1a]' : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Interactive Preview
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col min-h-[220px]">
                      {composerTab === 'edit' ? (
                        <textarea
                          required
                          value={mailBody}
                          onChange={(e) => setMailBody(e.target.value)}
                          placeholder="Compose HTML or plain text content here..."
                          className="w-full flex-grow p-3 bg-[#050b1a] border border-white/10 rounded-xl text-xs font-mono text-cyan-300 placeholder-white/20 focus:outline-hidden focus:border-cyan-500/50 resize-y min-h-[200px]"
                        />
                      ) : (
                        <div className="w-full flex-grow bg-white text-slate-800 rounded-xl p-4 overflow-auto border border-white/10 text-xs min-h-[200px] max-h-[300px]">
                          {mailBody ? (
                            <div dangerouslySetInnerHTML={{ __html: mailBody }} />
                          ) : (
                            <p className="text-slate-400 italic text-center py-12">HTML content is empty. Add message source code to see preview.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>

              {/* Filters & Actions bar */}
              <div className="bg-white/4 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative w-full lg:max-w-md shrink-0">
                  <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search leads by name, email, query details..."
                    className="w-full bg-[#050b1a] border border-white/10 py-2.5 pl-10 pr-4 rounded-lg text-xs font-semibold text-white placeholder-white/20 focus:outline-hidden focus:border-cyan-500/50"
                  />
                </div>

                {/* Dropdown Filters & Export */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:justify-end">
                  {/* Status filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#050b1a] border border-white/10 text-xs font-semibold py-2.5 px-3.5 rounded-lg focus:outline-hidden focus:border-cyan-500/50 text-left text-white/80"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New Inquiries</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved</option>
                  </select>

                  {/* Service filter */}
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="bg-[#050b1a] border border-white/10 text-xs font-semibold py-2.5 px-3.5 rounded-lg focus:outline-hidden focus:border-cyan-500/50 text-left text-white/80"
                  >
                    <option value="all">All Services</option>
                    <option value="IT Solutions">IT Solutions</option>
                    <option value="Retail & E-Commerce">Retail & E-Commerce</option>
                    <option value="Value-Added Services">Value-Added Services</option>
                    <option value="Digital Products">Digital Products</option>
                    <option value="Other Inquiry">Other Inquiry</option>
                  </select>

                  {/* CSV download button */}
                  <button
                    onClick={exportToCSV}
                    disabled={leads.length === 0}
                    className="bg-gradient-to-r from-orange-500 to-[#E06C1F] hover:scale-[1.01] active:scale-[0.99] text-white font-bold text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:bg-white/5 disabled:border-white/10 disabled:text-white/20 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Leads List Grid */}
              <div className="space-y-4">
                {filteredLeads.length === 0 ? (
                  <div className="bg-white/4 backdrop-blur-md border border-white/10 rounded-2xl py-12 px-4 text-center select-none text-white/40 font-bold text-xs">
                    No matching lead records located in database.
                  </div>
                ) : (
                  filteredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white/4 backdrop-blur-md border border-white/10 rounded-xl p-6 text-left flex flex-col md:flex-row justify-between gap-6 hover:border-white/20 transition-all"
                    >
                      {/* Left: Lead Metadata */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-display font-bold text-base text-white">{lead.name}</span>
                          
                          {/* Company if available */}
                          {lead.company && (
                            <span className="bg-white/5 text-white/70 border border-white/10 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {lead.company}
                            </span>
                          )}

                          {/* Created date */}
                          <span className="text-[10px] text-white/40 font-medium">
                            {new Date(lead.createdAt).toLocaleString()}
                          </span>

                          {/* Category Badge */}
                          <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {lead.service}
                          </span>
                        </div>

                        {/* Direct Contacts */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/50 font-medium">
                          <span>Email: <a href={`mailto:${lead.email}`} className="text-cyan-400 hover:underline">{lead.email}</a></span>
                          {lead.phone && <span>Phone: <a href={`tel:${lead.phone}`} className="text-white hover:underline">{lead.phone}</a></span>}
                          <span className="text-white/30">ID: {lead.id}</span>
                        </div>

                        {/* Inquiry Message */}
                        <div className="bg-[#050b1a]/80 border border-white/5 p-4 rounded-lg text-xs leading-relaxed text-white/80 whitespace-pre-wrap font-medium">
                          {lead.message}
                        </div>

                        {/* Administrative notes */}
                        <div className="pt-2 border-t border-white/5 text-xs">
                          {editingNotesId === lead.id ? (
                            <div className="flex flex-col sm:flex-row gap-2">
                              <input
                                type="text"
                                value={tempNotes}
                                onChange={(e) => setTempNotes(e.target.value)}
                                placeholder="Add follow-up notes (e.g. Sent pricing, scheduled call)..."
                                className="flex-1 bg-[#050b1a] border border-white/10 p-2 rounded-lg text-xs font-semibold text-white focus:outline-hidden"
                              />
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => saveNotes(lead.id)}
                                  className="bg-emerald-600 hover:bg-emerald-500 p-2 rounded-lg text-white font-bold text-xs flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingNotesId(null)}
                                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white p-2 rounded-lg text-xs transition-colors shrink-0 cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start justify-between gap-4 p-2 bg-white/4 border border-white/10 rounded-md">
                              <span className="text-white/40 font-semibold italic text-[11px]">
                                Admin Notes:{' '}
                                <span className="text-orange-300 not-italic font-medium">
                                  {lead.notes || 'No notes added yet.'}
                                </span>
                              </span>
                              <button
                                onClick={() => {
                                  setEditingNotesId(lead.id);
                                  setTempNotes(lead.notes || '');
                                }}
                                className="text-[10px] font-bold text-cyan-400 hover:underline cursor-pointer"
                              >
                                Edit Notes
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Actions (Status Changer & Delete) */}
                      <div className="flex flex-row md:flex-col justify-between md:justify-start items-center gap-4 shrink-0 border-t md:border-t-0 border-white/5 pt-4 md:pt-0 w-full md:w-auto">
                        {/* Status dropdown */}
                        <div className="text-left w-full">
                          <label className="block text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1 text-left">
                            Cycle Status
                          </label>
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                            className={`text-xs font-bold py-1.5 px-3 rounded-lg border focus:outline-hidden text-left bg-[#050b1a] w-full ${
                              lead.status === 'new'
                                ? 'border-orange-500/30 text-orange-400'
                                : lead.status === 'contacted'
                                ? 'border-purple-500/30 text-purple-400'
                                : 'border-emerald-500/30 text-emerald-400'
                            }`}
                          >
                            <option value="new">New Inquiry</option>
                            <option value="contacted">Contacted</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>

                        {/* Interactive Actions Grid */}
                        <div className="flex items-center gap-2 mt-2 w-full justify-between sm:justify-start">
                          {/* Reply via Microsoft Graph Button */}
                          <button
                            onClick={() => selectLeadForReply(lead.email, lead.name)}
                            className="flex-grow sm:flex-grow-0 bg-cyan-500 hover:bg-cyan-400 text-[#050b1a] font-extrabold text-[10px] py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            title="Draft and Send reply via Microsoft Graph API"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Reply via Graph
                          </button>

                          {/* Trash Delete button */}
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="bg-red-950/40 hover:bg-red-950/60 border border-red-500/30 text-red-400 p-2 rounded-lg transition-colors cursor-pointer"
                            title="Delete Lead Permanent"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
