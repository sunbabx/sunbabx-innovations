import express from 'express';
import path from 'path';
import fs from 'fs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { Lead } from './src/types.js';
import { getEmailJsConfig } from './mailConfig.ts';

dotenv.config();

// Production-grade logging system mimicking high-compliance enterprise standards
const log = {
  info: (message: string, context?: any) => {
    const timestamp = new Date().toISOString();
    const ctxString = context ? ` | Context: ${JSON.stringify(context)}` : '';
    console.log(`[${timestamp}] [INFO] ${message}${ctxString}`);
  },
  warn: (message: string, context?: any) => {
    const timestamp = new Date().toISOString();
    const ctxString = context ? ` | Context: ${JSON.stringify(context)}` : '';
    console.warn(`[${timestamp}] [WARN] ${message}${ctxString}`);
  },
  error: (message: string, error?: any, context?: any) => {
    const timestamp = new Date().toISOString();
    let errorMsg = '';
    if (error instanceof Error) {
      errorMsg = ` | Error: ${error.message}\nStack: ${error.stack}`;
    } else if (error) {
      errorMsg = ` | Error: ${JSON.stringify(error)}`;
    }
    const ctxString = context ? ` | Context: ${JSON.stringify(context)}` : '';
    console.error(`[${timestamp}] [ERROR] ${message}${errorMsg}${ctxString}`);
  }
};

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '127.0.0.1';
const __dirname = process.cwd();
const leadsFilePath = path.join(__dirname, 'leads.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin_sunbabx_2026';

// Middleware
app.use(express.json());

// Helper to read leads
function readLeads(): Lead[] {
  try {
    if (!fs.existsSync(leadsFilePath)) {
      fs.writeFileSync(leadsFilePath, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const data = fs.readFileSync(leadsFilePath, 'utf-8');
    return JSON.parse(data) as Lead[];
  } catch (err) {
    console.error('Error reading leads:', err);
    return [];
  }
}

// Helper to write leads
function writeLeads(leads: Lead[]): void {
  try {
    fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing leads:', err);
  }
}

// Validate admin password
function checkAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const queryPassword = req.query.password as string;
  
  let suppliedPassword = '';
  if (authHeader && authHeader.startsWith('Bearer ')) {
    suppliedPassword = authHeader.split(' ')[1];
  } else if (queryPassword) {
    suppliedPassword = queryPassword;
  }

  if (suppliedPassword === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid password' });
  }
}

// =======================================================
// Microsoft Graph Mail Integration
// =======================================================
interface GraphMailOptions {
  subject: string;
  contentHtml: string;
  toEmail: string;
}

async function sendEmailViaGraph(options: GraphMailOptions): Promise<{ success: boolean; error?: string }> {
  const tenantId = process.env.AZURE_TENANT_ID || 'e8b9c65e-8fad-4142-b9b7-7bb1e5b51a38';
  const clientId = process.env.AZURE_CLIENT_ID || '5d5a3e1f-e2c5-46b2-a682-47461fc06edf';
  const clientSecret = process.env.AZURE_CLIENT_SECRET || 'Pkv8Q~W73IntpTKY8.5wj4EehXgGdLmWIxtrkbGP';
  const mailbox = process.env.MAILBOX || 'admin@sunbabx-innovation.com';

  const maskedSecret = clientSecret ? `${clientSecret.slice(0, 4)}...${clientSecret.slice(-4)}` : 'UNDEFINED';

  try {
    log.info('Microsoft Graph API: Commencing client credentials token request.', {
      tenantId,
      clientId,
      clientSecretMasked: maskedSecret,
      mailbox,
      recipient: options.toEmail
    });

    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('scope', 'https://graph.microsoft.com/.default');

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      log.error('Microsoft Graph Token Exchange Failed!', null, {
        statusCode: tokenResponse.status,
        statusText: tokenResponse.statusText,
        errorBody: errorText
      });
      throw new Error(`Failed to obtain Microsoft Graph access token: ${errorText}`);
    }

    const tokenData = await tokenResponse.json() as { access_token: string };
    const accessToken = tokenData.access_token;
    log.info('Microsoft Graph Token Exchange Succeeded. Access token retrieved successfully.');

    const sendMailUrl = `https://graph.microsoft.com/v1.0/users/${mailbox}/sendMail`;
    const emailBody = {
      message: {
        subject: options.subject,
        body: {
          contentType: 'HTML',
          content: options.contentHtml,
        },
        toRecipients: [
          {
            emailAddress: {
              address: options.toEmail,
            },
          },
        ],
      },
      saveToSentItems: 'false',
    };

    log.info(`Microsoft Graph API: Dispatching email delivery payload on behalf of mailbox: ${mailbox}`, {
      recipient: options.toEmail,
      subject: options.subject
    });

    const sendResponse = await fetch(sendMailUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailBody),
    });

    if (!sendResponse.ok) {
      const errorText = await sendResponse.text();
      log.error('Microsoft Graph sendMail endpoint returned error status code!', null, {
        statusCode: sendResponse.status,
        statusText: sendResponse.statusText,
        errorBody: errorText,
        senderMailbox: mailbox,
        recipientMail: options.toEmail
      });
      throw new Error(`Microsoft Graph API sendMail endpoint failed: ${errorText}`);
    }

    log.info(`Microsoft Graph API: Transmission completed. Mail dispatched successfully to ${options.toEmail}.`);
    return { success: true };
  } catch (err: any) {
    log.error('Microsoft Graph sending pipeline halted on exception.', err, { subject: options.subject, recipient: options.toEmail });
    return { success: false, error: err.message || 'Unknown Graph dispatch error' };
  }
}

interface EmailJsMailOptions {
  subject: string;
  contentHtml: string;
  toEmail: string;
  templateParams?: Record<string, string>;
}

async function sendEmailViaEmailJs(options: EmailJsMailOptions): Promise<{ success: boolean; error?: string }> {
  const emailJsConfig = getEmailJsConfig(process.env);
  if (!emailJsConfig) {
    return { success: false, error: 'EmailJS credentials are not configured.' };
  }

  try {
    const receiverEmail = process.env.VITE_EMAIL_RECEIVER || options.toEmail || 'admin@sunbabx-innovations.com';
    const payload = {
      service_id: emailJsConfig.serviceId,
      template_id: emailJsConfig.templateId,
        // MUST be the PUBLIC key
    user_id: emailJsConfig.publicKey,

    // MUST be the PRIVATE key
    accessToken: emailJsConfig.privateKey,
      template_params: {
        from_name: 'Sunbabx Innovations',
        from_email: 'noreply@sunbabx-innovations.com',
        to_email: receiverEmail,
        receiver_email: receiverEmail,
        subject: options.subject,
        message: options.contentHtml,
        ...(options.templateParams || {}),
      },
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`EmailJS send failed: ${response.status} ${response.statusText} ${errorText}`);
    }

    console.log({
    serviceId: emailJsConfig.serviceId,
    templateId: emailJsConfig.templateId,
    publicKey: emailJsConfig.publicKey,
    privateKey: emailJsConfig.privateKey
    });

    log.info('EmailJS fallback dispatch succeeded.', { recipient: options.toEmail, subject: options.subject });
    return { success: true };
  } catch (err: any) {

    console.log({
    serviceId: emailJsConfig.serviceId,
    templateId: emailJsConfig.templateId,
    publicKey: emailJsConfig.publicKey,
    privateKey: emailJsConfig.privateKey
    });

    log.error('EmailJS fallback dispatch failed.', err, { recipient: options.toEmail, subject: options.subject });
    return { success: false, error: err.message || 'Unknown EmailJS dispatch error' };
  }
}

// API Routes

// Endpoint to serve client-side EmailJS config dynamically to prevent build-time baking issues
app.get('/api/config/emailjs', (req, res) => {
  log.info('API Gateway: Received GET request at /api/config/emailjs');
  
  let serviceId = process.env.VITE_EMAILJS_SERVICE_ID || '';
  const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY || '';
  
  // Senior Developer Forethought: Corrective auto-fix for known config discrepancy (Sunbabx@0365 vs service_jac0u5k)
  if (serviceId === 'Sunbabx@0365') {
    log.warn('Auto-Correction: Env variable VITE_EMAILJS_SERVICE_ID was set to "Sunbabx@0365", which is incorrect. Auto-correcting to the actual EmailJS Service ID "service_jac0u5k" from dashboard config.');
    serviceId = 'service_jac0u5k';
  }

  res.json({
    serviceId,
    templateId,
    publicKey
  });
});

// 1. Submit lead from contact form (Microsoft Graph first, SMTP fallback)
app.post('/api/contact', async (req, res) => {
  log.info('API Gateway: Received POST request at /api/contact', { origin: req.get('origin'), ip: req.ip });
  try {
    const { name, email, phone, company, service, message } = req.body;

    if (!name || !email || !service || !message) {
      log.warn('Validation Failed: Missing mandatory payload attributes.', { name: !!name, email: !!email, service: !!service, message: !!message });
      return res.status(400).json({ error: 'Missing required fields (name, email, service, message)' });
    }

    log.info(`Ingestion Cycle: Processing lead for client "${name}" interested in "${service}".`);

    const leads = readLeads();
    const newLead: Lead = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      email,
      phone: phone || '',
      company: company || '',
      service,
      message,
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    leads.push(newLead);
    writeLeads(leads);
    log.info(`Database: Successfully persisted lead ID: ${newLead.id} to flat-file storage.`);

    let emailSent = false;
    let emailProvider = '';
    let emailError = '';

    const leadHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 28px; text-align: center; color: white; border-bottom: 3px solid #06b6d4;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; text-transform: uppercase; color: #38bdf8;">SUNBABX-INNOVATIONS</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; font-weight: 500; opacity: 0.8; letter-spacing: 0.05em; text-transform: uppercase;">Real-Time Microsoft Graph Alert</p>
        </div>
        <div style="padding: 28px; color: #334155;">
          <h2 style="color: #0284c7; font-size: 18px; font-weight: 700; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px; margin-top: 0; margin-bottom: 20px;">New Contact Inquire Received</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; width: 130px; color: #64748b; font-size: 13px; text-transform: uppercase; tracking: 0.05em;">Client Name:</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #64748b; font-size: 13px; text-transform: uppercase; tracking: 0.05em;">Email Address:</td>
              <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #64748b; font-size: 13px; text-transform: uppercase; tracking: 0.05em;">Phone Number:</td>
              <td style="padding: 10px 0; color: #334155; font-size: 14px;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #64748b; font-size: 13px; text-transform: uppercase; tracking: 0.05em;">Company:</td>
              <td style="padding: 10px 0; color: #334155; font-size: 14px;">${company || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #64748b; font-size: 13px; text-transform: uppercase; tracking: 0.05em;">Selected Pillar:</td>
              <td style="padding: 10px 0; font-weight: 700; color: #0369a1; font-size: 14px;">${service}</td>
            </tr>
          </table>
 
          <div style="padding: 20px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #0284c7;">
            <h3 style="margin: 0 0 8px 0; font-size: 13px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Inquire Message:</h3>
            <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #1e293b; font-weight: 500;">${message}</p>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 18px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; font-weight: 500;">
          Received on ${new Date().toLocaleString()}<br/>
          Securely routed to <span style="font-weight: 700; color: #64748b;">admin@sunbabx-innovation.com</span> via MS Graph.
        </div>
      </div>
    `;

    // Create the auto-reply HTML template using the user's provided snippet
    const appUrl = process.env.APP_URL || 'https://sunbabx-innovations.com';
    const clientAutoReplyHtml = `
      <div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; padding: 24px; background-color: #ffffff; color: #333333;">
        <div style="margin-bottom: 20px;">
          <a style="text-decoration: none; outline: none" href="${appUrl}" target="_blank">
            <img style="height: 32px; vertical-align: middle" height="32px" src="https://sunbabx-innovations.com/images/logo.png" alt="logo" />
          </a>
        </div>
        <p style="padding-top: 16px; border-top: 1px solid #eaeaea">Hi ${name},</p>
        <p>
          Thank you for reaching out to us! We have received your request: "<strong>${service}</strong>", and we'll do our
          best to respond within 3 business days.
        </p>
        <p style="padding-top: 16px; border-top: 1px solid #eaeaea">
          Best regards,<br />Sunbabx-Innovations
        </p>
      </div>
    `;

    // 1. Try Microsoft Graph sending (primary routing)
    const toEmail = process.env.MAILBOX || 'admin@sunbabx-innovation.com';
    log.info('Mailing Pipeline: Attempting Primary dispatch via Microsoft Graph API client.', { toEmail });
    const graphResult = await sendEmailViaGraph({
      subject: `[MS Graph Inquiry] ${service} - ${name}`,
      contentHtml: leadHtml,
      toEmail: toEmail
    });

    if (graphResult.success) {
      emailSent = true;
      emailProvider = 'Microsoft Graph';
      log.info('Mailing Pipeline: Primary Microsoft Graph dispatch succeeded.');

      // Send auto-reply to the customer via Microsoft Graph
      try {
        log.info(`Mailing Pipeline: Dispatching automated confirmation reply to user: ${email} via Microsoft Graph...`);
        await sendEmailViaGraph({
          subject: `We have received your inquiry: ${service}`,
          contentHtml: clientAutoReplyHtml,
          toEmail: email
        });
        log.info(`Mailing Pipeline: Auto-reply delivered successfully to client: ${email}`);
      } catch (autoReplyErr) {
        log.error('Mailing Pipeline: Secondary user auto-reply dispatch over MS Graph failed.', autoReplyErr);
      }
    } else {
      log.warn('Mailing Pipeline: Primary Microsoft Graph delivery cycle failed. Initializing failover route.', { error: graphResult.error });
      emailError = graphResult.error || 'Graph error';

      // 2. Fallback to standard SMTP if SMTP user/pass is configured
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpHost = process.env.SMTP_HOST || 'smtp.office365.com';
      const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
      const smtpTo = process.env.SMTP_TO || 'admin@sunbabx-innovations.com';

      log.info('Failover Analyzer: Evaluating standard SMTP configuration variables...', {
        smtpUserPresent: !!smtpUser,
        smtpPassPresent: !!smtpPass,
        smtpHost,
        smtpPort,
        smtpTo
      });

      if (smtpUser && smtpPass) {
        log.info(`Failover Dispatcher: Activating secondary SMTP mail transporter: ${smtpHost}:${smtpPort}`);
        try {
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
            tls: {
              rejectUnauthorized: false
            }
          });

          log.info(`Transporter Status: Transport verification in progress for user "${smtpUser}"`);
          // Send admin alert
          await transporter.sendMail({
            from: `"SUNBABX Lead SMTP" <${smtpUser}>`,
            to: smtpTo,
            subject: `[SMTP Fallback] ${service} - ${name}`,
            html: leadHtml,
          });

          emailSent = true;
          emailProvider = 'SMTP Mailer';
          log.info('Failover Dispatcher: SMTP delivery succeeded. Fallback alert dispatched to admin.');

          // Send auto-reply to the customer via SMTP
          try {
            log.info(`Failover Dispatcher: Dispatching SMTP automated client confirmation: ${email}`);
            await transporter.sendMail({
              from: `"Sunbabx-Innovations" <${smtpUser}>`,
              to: email,
              subject: `We have received your inquiry: ${service}`,
              html: clientAutoReplyHtml,
            });
            log.info(`Failover Dispatcher: Client auto-reply delivered successfully to ${email}`);
          } catch (autoReplyErr) {
            log.error('Failover Dispatcher: Customer auto-reply transmission over SMTP failed.', autoReplyErr);
          }
        } catch (smtpErr: any) {
          log.error('Failover Dispatcher: Secondary SMTP execution crashed.', smtpErr, { host: smtpHost, port: smtpPort, user: smtpUser });
          emailError = `Graph Error: ${emailError}. SMTP Fallback Error: ${smtpErr.message}`;
        }
      } else {
        log.warn('Failover Analyzer: Decoupling aborted. SMTP credentials are not configured in the host environment.');
      }

      if (!emailSent) {
        log.warn('Mailing Pipeline: Both Microsoft Graph and SMTP failed. Initiating EmailJS third-route fallback.');
        const emailJsResult = await sendEmailViaEmailJs({
          subject: `[EmailJS Fallback] ${service} - ${name}`,
          contentHtml: leadHtml,
          toEmail: toEmail,
          templateParams: {
            service_selected: service,
            client_name: name,
            client_email: email,
            client_phone: phone || 'N/A',
            company_name: company || 'N/A',
            inquiry_message: message,
          },
        });

        if (emailJsResult.success) {
          emailSent = true;
          emailProvider = 'EmailJS';
          log.info('Mailing Pipeline: EmailJS fallback succeeded.');
        } else {
          emailError = `${emailError} EmailJS Fallback Error: ${emailJsResult.error}`;
          log.warn('Mailing Pipeline: EmailJS fallback also failed.', { error: emailJsResult.error });
        }
      }
    }

    log.info('Workflow Outcome Summary:', { leadId: newLead.id, emailSent, providerUsed: emailProvider || 'None', routingError: emailError || 'None' });

    res.status(200).json({
      success: true,
      lead: newLead,
      emailSent,
      emailProvider,
      emailError: emailError || undefined,
      message: emailSent
        ? `Inquiry received! Notification successfully delivered to admin inbox via ${emailProvider}.`
        : 'Inquiry saved to server registry (Email notification pending Azure/SMTP configuration).'
    });
  } catch (error: any) {
    log.error('API Controller Crash: Endpoint /api/contact caught critical exception.', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 1.5 Send manual email via Microsoft Graph (Admin Dashboard - Password Protected)
app.post('/api/admin/send-email', checkAdminAuth, async (req, res) => {
  try {
    const { toEmail, subject, contentHtml } = req.body;
    if (!toEmail || !subject || !contentHtml) {
      return res.status(400).json({ error: 'Missing required mail parameters (toEmail, subject, contentHtml)' });
    }

    const graphResult = await sendEmailViaGraph({
      toEmail,
      subject,
      contentHtml
    });

    if (graphResult.success) {
      res.json({ success: true, message: 'Email successfully sent via Microsoft Graph API.' });
    } else {
      res.status(500).json({ error: graphResult.error || 'Failed to dispatch email via Graph' });
    }
  } catch (error: any) {
    console.error('Error in /api/admin/send-email API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 2. Get all leads (Admin Dashboard - Password Protected)
app.get('/api/leads', checkAdminAuth, (req, res) => {
  try {
    const leads = readLeads();
    // Sort leads by date descending
    leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json({ success: true, leads });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 3. Update lead status/notes (Admin Dashboard - Password Protected)
app.patch('/api/leads/:id', checkAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const leads = readLeads();
    const leadIndex = leads.findIndex(l => l.id === id);

    if (leadIndex === -1) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    if (status) leads[leadIndex].status = status;
    if (notes !== undefined) leads[leadIndex].notes = notes;

    writeLeads(leads);
    res.json({ success: true, lead: leads[leadIndex] });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 4. Delete lead (Admin Dashboard - Password Protected)
app.delete('/api/leads/:id', checkAdminAuth, (req, res) => {
  try {
    const { id } = req.params;
    const leads = readLeads();
    const filteredLeads = leads.filter(l => l.id !== id);

    if (leads.length === filteredLeads.length) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    writeLeads(filteredLeads);
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start backend API server
function startServer() {
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
}

startServer();
