export interface GraphMailConfig {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  mailbox: string;
}

export interface EmailJsConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey: string;
}

const HARDCODED_GRAPH_VALUES = new Set([
  'e8b9c65e-8fad-4142-b9b7-7bb1e5b51a38',
  '66ad8ce5-3c3d-44e4-9e68-3312223a99e5',
  'Pkv8Q~W73IntpTKY8.5wj4EehXgGdLmWIxtrkbGP',
]);

export function getGraphMailConfig(env: Record<string, string | undefined>): GraphMailConfig | null {
  const tenantId = env.AZURE_TENANT_ID?.trim();
  const clientId = env.AZURE_CLIENT_ID?.trim();
  const clientSecret = env.AZURE_CLIENT_SECRET?.trim();
  const mailbox = env.MAILBOX?.trim();

  if (!tenantId || !clientId || !clientSecret || !mailbox) {
    return null;
  }

  if ([tenantId, clientId, clientSecret].some((value) => HARDCODED_GRAPH_VALUES.has(value))) {
    return null;
  }

  return {
    tenantId,
    clientId,
    clientSecret,
    mailbox,
  };
}

export function getEmailJsConfig(env: Record<string, string | undefined>): EmailJsConfig | null {
  const serviceId = env.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = env.VITE_EMAILJS_PUBLIC_KEY?.trim();
  const privateKey = env.VITE_EMAILJS_PRIVATE_KEY?.trim();

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    return null;
  }

  return {
    serviceId,
    templateId,
    publicKey,
    privateKey,
  };
}
