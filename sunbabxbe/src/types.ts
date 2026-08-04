export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
  notes?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  features: string[];
}
