/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  timezone: string;
  country: string;
}

export type RelationshipType = 'Partner' | 'Friend' | 'Parent' | 'Sibling' | 'Colleague' | 'Other';

export interface Recipient {
  name: string;
  email: string;
  phone?: string;
  relationship: RelationshipType;
}

export type EventType =
  | 'Birthday'
  | 'Anniversary'
  | 'Graduation'
  | 'Valentine'
  | 'Promotion'
  | 'BabyShower'
  | 'BabyFirstBirthday'
  | 'FirstJob'
  | 'HouseWarming'
  | 'Festival'
  | 'CustomSurprise'
  | 'DeathEvent';

export type PackageType = 'BASIC' | 'STANDARD' | 'PREMIUM';

export type EventStatus = 'Draft' | 'Scheduled' | 'Delivered' | 'Cancelled';

export interface EventMessage {
  id: string;
  authorName: string;
  relationship: string;
  text: string;
  photoUrl?: string;
  avatarUrl?: string;
}

export interface CelebrationEvent {
  id: string;
  plannerId: string;
  plannerName: string;
  plannerEmail: string;
  recipient: Recipient;
  eventType: EventType;
  customEventName?: string;
  date: string;
  time: string;
  reminderDays: number[]; // e.g. [1, 3, 7]
  reminderMethod: 'Email' | 'SMS' | 'Both';
  packageType: PackageType;
  status: EventStatus;
  createdAt: string;
  paymentId?: string;
  
  // Customization elements for the Reveal Page (Memory Capsule)
  customHeaderMessage?: string;
  backgroundMusic: string; // url or track identifier
  collage: string[]; // List of photo URLs
  videoUrl?: string; // Standard/Premium video greeting or slide URL
  messages: EventMessage[]; // Group messages (Premium support up to 10, Standard support 1)
  giftVoucherCode?: string; // Premium only virtual gift voucher
  revealedAt?: string; // Time the recipient unlocked the capsule
}

export interface PackageDetails {
  id: PackageType;
  name: string;
  priceUSD: number;
  priceINR: number;
  features: string[];
  popular?: boolean;
}

export interface PaymentRecord {
  id: string;
  eventId: string;
  packageType: PackageType;
  amountUSD: number;
  amountINR: number;
  status: 'Pending' | 'Completed' | 'Failed';
  date: string;
  promoCode?: string;
  discountUSD: number;
  paymentMethod: string; // e.g., 'Credit Card', 'UPI', 'PayPal'
  cardLast4?: string;
}

export interface SystemNotification {
  id: string;
  eventId: string;
  recipientName: string;
  type: '7_DAYS' | '3_DAYS' | '1_DAY' | 'DAY_OF_EVENT';
  deliveryDate: string; // UTC ISO string or YYYY-MM-DD
  status: 'Pending' | 'Sent';
  sentAt?: string;
  channel: 'Email' | 'SMS' | 'Both';
  subject: string;
  bodyPreview: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Replied';
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
