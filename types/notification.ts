export type NotificationType = 'info' | 'warning' | 'success' | 'error';
export type NotificationTarget = 'distributor' | 'channel_partner' | 'all';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  target: NotificationTarget;
  isActive: boolean;
  createdAt: Date;
  expiresAt?: Date;
}
