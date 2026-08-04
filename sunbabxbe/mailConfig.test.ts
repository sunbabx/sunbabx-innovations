import test from 'node:test';
import assert from 'node:assert/strict';
import { getGraphMailConfig, getEmailJsConfig } from './mailConfig.ts';

test('returns null when Graph credentials are missing', () => {
  assert.equal(getGraphMailConfig({}), null);
});

test('returns config when Azure Graph values are present', () => {
  const result = getGraphMailConfig({
    AZURE_TENANT_ID: 'tenant-id',
    AZURE_CLIENT_ID: 'client-id',
    AZURE_CLIENT_SECRET: 'client-secret',
    MAILBOX: 'admin@sunbabx-innovations.com',
  });

  assert.deepEqual(result, {
    tenantId: 'tenant-id',
    clientId: 'client-id',
    clientSecret: 'client-secret',
    mailbox: 'admin@sunbabx-innovations.com',
  });
});

test('rejects hard-coded placeholder values', () => {
  const result = getGraphMailConfig({
    AZURE_TENANT_ID: 'e8b9c65e-8fad-4142-b9b7-7bb1e5b51a38',
    AZURE_CLIENT_ID: '66ad8ce5-3c3d-44e4-9e68-3312223a99e5',
    AZURE_CLIENT_SECRET: 'Pkv8Q~W73IntpTKY8.5wj4EehXgGdLmWIxtrkbGP',
    MAILBOX: 'admin@sunbabx-innovation.com',
  });

  assert.equal(result, null);
});

test('returns null when EmailJS credentials are missing', () => {
  assert.equal(getEmailJsConfig({}), null);
});

test('returns config when EmailJS values are present', () => {
  const result = getEmailJsConfig({
    VITE_EMAILJS_SERVICE_ID: 'service_abc123',
    VITE_EMAILJS_TEMPLATE_ID: 'template_xyz789',
    VITE_EMAILJS_PUBLIC_KEY: 'public_key_123',
  });

  assert.deepEqual(result, {
    serviceId: 'service_abc123',
    templateId: 'template_xyz789',
    publicKey: 'public_key_123',
  });
});
