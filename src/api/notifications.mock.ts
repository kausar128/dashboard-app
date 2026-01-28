// mockData.ts

export type NotificationType = 'warning' | 'info' | 'error' | 'success';

export interface Notification {
  id: string;
  title: string;
  description: string[]; // Supports multiple lines of text per item
  buttonText: string;
  type: NotificationType;
}

export const mockNotifications: Notification[] = [
  { 
    id: '1', 
    title: 'Identity Verification', 
    description: ['Please upload a valid government ID', 'Format: JPG, PNG or PDF'], 
    buttonText: 'Upload ID', 
    type: 'warning' 
  },
  { 
    id: '2', 
    title: 'Payment Method Expiring', 
    description: ['Your Visa ending in 4242 expires next month', 'Update billing details'], 
    buttonText: 'Update Now', 
    type: 'error' 
  },
  { 
    id: '3', 
    title: 'Security Update', 
    description: ['Two-factor authentication is recommended', 'Protect your account'], 
    buttonText: 'Enable 2FA', 
    type: 'info' 
  },
  { 
    id: '4', 
    title: 'Profile Incomplete', 
    description: ['Add your professional experience', 'Help recruiters find you'], 
    buttonText: 'Edit Profile', 
    type: 'warning' 
  },
  { 
    id: '5', 
    title: 'Email Confirmation', 
    description: ['Please verify your primary email address', 'check your inbox for a link'], 
    buttonText: 'Resend Email', 
    type: 'info' 
  },
  { 
    id: '6', 
    title: 'System Maintenance', 
    description: ['Scheduled maintenance this Saturday', 'Expect 2 hours of downtime'], 
    buttonText: 'View Schedule', 
    type: 'warning' 
  },
  { 
    id: '7', 
    title: 'Policy Update', 
    description: ['We have updated our terms of service', 'Please review the changes'], 
    buttonText: 'Review Terms', 
    type: 'success' 
  }
];