import { Shield, AlertTriangle, CheckCircle, Mail, FileText, Paperclip, ExternalLink, User, Clock, Tag, ShieldAlert, ShieldCheck, Info } from 'lucide-react';

export type Severity = 'High' | 'Medium' | 'Low' | 'Informational';
export type Classification = 'Confirmed Phishing' | 'Malware Delivery Attempt' | 'Credential Phishing' | 'Legitimate Email';

export interface IOC {
  type: 'Domain' | 'URL' | 'Attachment' | 'Social Engineering';
  value: string;
  description?: string;
}

export interface EmailAnalysis {
  senderHeaderAnalysis: string[];
  identifiedIOCs: IOC[];
  assessment: {
    classification: Classification;
    severity: Severity;
    action: string;
  };
}

export interface EmailData {
  id: string;
  from: string;
  replyTo?: string;
  to: string;
  subject: string;
  date: string;
  content: string;
  attachment?: string;
  analysis: EmailAnalysis;
}

export const EMAILS: EmailData[] = [
  {
    id: '1',
    from: 'PayPal Support <support@paypa1.com>',
    replyTo: 'billing@secure-paypa1.net',
    to: 'user@company.com',
    subject: 'URGENT: Your Account Has Been Suspended',
    date: '23 Feb 2026, 09:12 AM',
    content: 'Dear Customer,\n\nWe detected unusual activity in your account. For your protection, your account has been temporarily suspended. You must verify your identity within 24 hours or your account will be permanently disabled.\n\nClick below to restore access:\nhttp://secure-paypa1-login.com/verify\n\nFailure to act immediately may result in account closure.\n\nThank you,\nPayPal Security Team',
    analysis: {
      senderHeaderAnalysis: [
        'Display name impersonates a trusted brand.',
        'Sender domain: paypa1.com (typosquatting – number "1" instead of "l").',
        'Reply-To domain differs from sender domain.'
      ],
      identifiedIOCs: [
        { type: 'Domain', value: 'paypa1.com', description: 'Typosquatted domain' },
        { type: 'URL', value: 'http://secure-paypa1-login.com/verify', description: 'Phishing URL' },
        { type: 'Social Engineering', value: 'Urgency-based', description: 'Account suspension threat' }
      ],
      assessment: {
        classification: 'Confirmed Phishing',
        severity: 'High',
        action: 'Escalated to Incident Response Team'
      }
    }
  },
  {
    id: '2',
    from: 'Accounts Department <accounts@trustedvendor.com>',
    to: 'finance@company.com',
    subject: 'Invoice #45821 – Payment Overdue',
    date: '23 Feb 2026, 10:04 AM',
    attachment: 'Invoice_Feb2026.xlsm',
    content: 'Dear Finance Team,\n\nPlease find attached the invoice for February services. Payment is now overdue. Kindly process this immediately to avoid service disruption.\n\nBest Regards,\nAccounts Team\nTrusted Vendor Ltd.',
    analysis: {
      senderHeaderAnalysis: [
        'Sender domain appears legitimate.',
        'Contains macro-enabled attachment: Invoice_Feb2026.xlsm.'
      ],
      identifiedIOCs: [
        { type: 'Attachment', value: 'Invoice_Feb2026.xlsm', description: 'Macro-enabled Excel file' },
        { type: 'Social Engineering', value: 'Financial Urgency', description: 'Overdue payment pressure' }
      ],
      assessment: {
        classification: 'Malware Delivery Attempt',
        severity: 'High',
        action: 'Escalated for malware sandbox analysis'
      }
    }
  },
  {
    id: '3',
    from: 'IT Helpdesk <it-support@company-helpdesk.com>',
    to: 'employee@company.com',
    subject: 'Password Expiration Notice – Immediate Reset Required',
    date: '23 Feb 2026, 11:15 AM',
    content: 'Dear Employee,\n\nYour password is set to expire today. To avoid account lockout, reset your password immediately using the secure portal below:\n\nReset Password:\nhttp://company-reset-password.security-check.com\n\nFailure to update may result in access suspension.\n\nIT Helpdesk\nCompany IT Department',
    analysis: {
      senderHeaderAnalysis: [
        'Sender domain: company-helpdesk.com (not official domain).',
        'Impersonates internal IT department.',
        'Likely SPF failure.',
        'Sent from external mail infrastructure.'
      ],
      identifiedIOCs: [
        { type: 'Domain', value: 'company-helpdesk.com', description: 'Spoofed internal domain' },
        { type: 'URL', value: 'http://company-reset-password.security-check.com', description: 'Credential harvesting link' },
        { type: 'Social Engineering', value: 'Internal Impersonation', description: 'IT Helpdesk persona' }
      ],
      assessment: {
        classification: 'Credential Phishing',
        severity: 'High',
        action: 'Escalated and domain flagged for blocking'
      }
    }
  },
  {
    id: '4',
    from: 'HR Department <hr@company.com>',
    to: 'allstaff@company.com',
    subject: 'Quarterly HR Policy Update',
    date: '23 Feb 2026, 12:30 PM',
    content: 'Dear Team,\n\nPlease review the updated HR policy document available on the intranet. No action is required at this time.\n\nThank you,\nHR Department',
    analysis: {
      senderHeaderAnalysis: [
        'Legitimate internal domain.',
        'Sent from official mail server.'
      ],
      identifiedIOCs: [],
      assessment: {
        classification: 'Legitimate Email',
        severity: 'Informational',
        action: 'No escalation required'
      }
    }
  }
];
