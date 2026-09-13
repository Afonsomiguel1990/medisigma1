export type LeadKind = 'service_request' | 'resource_request';
export type NotificationStatus = 'pending' | 'sending' | 'sent' | 'failed' | 'uncertain';
export interface LeadSubmission {
  submissionId: string;
  payloadHash: string;
  leadKind: LeadKind;
  empresa: string;
  telefone: string;
  email: string;
  servico: string;
  mensagem: string;
  pagina: string;
  url: string;
  fonte: string;
  serviceKey?: string;
  companySector?: string;
  resourceId?: string;
  attribution: Record<string, unknown>;
}
export interface SubmissionReceipt {
  status: 'accepted' | 'duplicate' | 'conflict';
  submissionId: string;
  notificationStatus: NotificationStatus;
  createdAt?: string;
  contactId?: string;
}
export interface ContactClickInput {
  eventId: string;
  payloadHash: string;
  channel: 'phone' | 'email' | 'whatsapp';
  pagina: string;
  url: string;
  serviceKey?: string;
  companySector?: string;
  attribution: Record<string, unknown>;
}
export interface ClickReceipt { status: 'accepted' | 'duplicate' | 'conflict'; eventId: string }
export interface AnalyticsGroup { key: string; count: number }
export interface LeadAnalytics {
  submissions: number;
  serviceRequests: number;
  resourceRequests: number;
  clicks: number;
  byService: AnalyticsGroup[];
  bySector: AnalyticsGroup[];
  bySource: AnalyticsGroup[];
  byPage: AnalyticsGroup[];
  notifications: AnalyticsGroup[];
  clicksByChannel: AnalyticsGroup[];
  resourcesByResource: AnalyticsGroup[];
  clicksByPage: AnalyticsGroup[];
  byEntryPage: AnalyticsGroup[];
  assistedArticles: AnalyticsGroup[];
  attributionStatus: AnalyticsGroup[];
  legacyUnattributed: { contacts: number; clicks: number };
}
