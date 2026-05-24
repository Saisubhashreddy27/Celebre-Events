import { PackageDetails, CelebrationEvent, FaqItem } from './types';

export const PACKAGES: PackageDetails[] = [
  {
    id: 'BASIC',
    name: 'Basic Package',
    priceUSD: 9,
    priceINR: 499,
    features: [
      'Personalized digital e-card from templates',
      'Scheduled email delivery directly to recipient',
      'Elegant real-time countdown widget',
      '1 custom personal message (up to 500 words)',
      'Email reminder to planner (1 day before)',
      'Beautiful classic typographic layout'
    ]
  },
  {
    id: 'STANDARD',
    name: 'Standard Package',
    priceUSD: 19,
    priceINR: 1499,
    popular: true,
    features: [
      'Everything in the Basic Package',
      'Custom photo collage (up to 10 photos)',
      'Animated elegant video greeting card',
      'Dedicated surprise landing page (Reveal Link) with smooth fade-ins',
      'Email + SMS reminders (3 days + 1 day before)',
      'Background music library selection for reveal day',
      'Emotional canvas with floating hearts/sparkles'
    ]
  },
  {
    id: 'PREMIUM',
    name: 'Premium Package',
    priceUSD: 49,
    priceINR: 3499,
    features: [
      'Everything in the Standard Package',
      'Group contribution room (up to 10 friends can add warm audio/video/messages)',
      'Full, interactive memory capsule animated reveal experience',
      'Virtual e-gift voucher (redeemable with top partner global/national brands)',
      'Personalized video montage compilation from combined media',
      'Priority concierge customer support (24/7 dedicated lead)',
      'WhatsApp delivery option directly to recipient',
      'Email + SMS + Status WhatsApp reminders (7, 3, 1 day before)',
      'Secure lifetime memory archive access and shareable capsule link'
    ]
  }
];

export const MUSIC_TRACKS = [
  { id: 'track_1', name: 'Champagne Waltz (Elegant Strings)', url: '#', duration: '2:15' },
  { id: 'track_2', name: 'Warm Memories (Acoustic Piano & Cello)', url: '#', duration: '3:02' },
  { id: 'track_3', name: 'Celestial Dreams (Soft Ambient Synth & Harp)', url: '#', duration: '2:40' },
  { id: 'track_4', name: 'Milestones of Gold (Cinematic Uplifting Orchestral)', url: '#', duration: '3:15' },
  { id: 'track_5', name: 'Serenade of Hearts (Romantic Spanish Guitar)', url: '#', duration: '2:50' }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'General',
    question: 'What is Célèbre and how does it deliver long-distance surprises?',
    answer: 'Célèbre is a luxury celebration orchestration platform. We bridge the emotional gap of distance by allowing you to schedule highly personalized, digital experiences called "Memory Capsules." On the special day, we deliver a secret, interactive Reveal Link via Email, SMS, or WhatsApp. When they open it, they are greeted with elegant music, custom video creations, user-submitted media, and heartfelt words designed to feel like a warm hug across miles.'
  },
  {
    category: 'General',
    question: 'How does the Recipient Reveal Page work?',
    answer: 'Once you schedule a celebration, our state-of-the-art Scheduler waits for the precise date and time in the recipient’s local timezone. On the selected hour, they receive a beautifully curated message (e.g., "A surprise memory capsule awaits you from [Name]..."). Clicking the link launches a customized full-screen celebratory reveal complete with a confetti burst, an interactive opening sequence, background music, family collage slide-shows, or montage clips.'
  },
  {
    category: 'Packages & Payments',
    question: 'Can I collect messages from multiple family members for the surprise?',
    answer: 'Yes! Our Premium Package unlocks the "Group Contribution Room." After booking, you receive a coordinator link to share with up to 10 friends, parents, or colleagues. They can upload their photos and text messages, which are automatically elegantized and presented inside the recipient’s Memory Capsule as dynamic sliding cards.'
  },
  {
    category: 'Packages & Payments',
    question: 'What payment and currencies do you support?',
    answer: 'We support fully secure international and domestic checking. Payments are integrated seamlessly via Stripe for USD/international ($) and Razorpay for INR/domestic (₹). We accept all major Credit/Debit Cards, UPI payments, NetBanking, PayPal, and Apple Pay.'
  },
  {
    category: 'Notifications & Reminder System',
    question: 'How do planner reminders and automated schedulers operate?',
    answer: 'We guide you through the leading-up schedule. You will receive elegant status alerts in-app and via email/SMS 7 days, 3 days, and 1 day prior, reminding you to look over details, upload fresh photos, approve family notes, or review the generated e-card text. We ensure everything is absolutely perfect before launch.'
  },
  {
    category: 'Tech & Media',
    question: 'Can the recipient download or keep the digital memories?',
    answer: 'Absolutely. For our Standard and Premium users, the Reveal Page features a "Download Memory Archive" button. Premium users also receive lifetime cloud archive hosting with a shareable permanent gallery link so they can revisit their golden milestone whenever they choose.'
  }
];

export const MOCK_EVENTS = (userId: string): CelebrationEvent[] => [
  {
    id: 'evt_upcoming_1',
    plannerId: userId,
    plannerName: 'Sarah Jenkins',
    plannerEmail: 'saisubhashvemireddy@gmail.com',
    recipient: {
      name: 'Michael Jenkins',
      email: 'michael_j_99@example.com',
      phone: '+1 (555) 432-1051',
      relationship: 'Partner'
    },
    eventType: 'Anniversary',
    customHeaderMessage: 'To My Life Partner, 5 Years of Pure Magic Across the Miles!',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
    time: '09:00',
    reminderDays: [1, 3],
    reminderMethod: 'Both',
    packageType: 'STANDARD',
    status: 'Scheduled',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    backgroundMusic: 'track_2',
    collage: [
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-holding-hands-of-a-happy-couple-walking-43405-large.mp4',
    messages: [
      {
        id: 'msg_1',
        authorName: 'Sarah Jenkins',
        relationship: 'Partner',
        text: 'Happy 5th Anniversary, my love! Even though we are thousands of miles apart today, my heart is right next to yours. I remember our walks along the beach and the way we laughed until our stomachs hurt. Here is to wrapping up this distance very soon and celebrating a lifetime together. You are my home.'
      }
    ]
  },
  {
    id: 'evt_past_1',
    plannerId: userId,
    plannerName: 'Sarah Jenkins',
    plannerEmail: 'saisubhashvemireddy@gmail.com',
    recipient: {
      name: 'Olivia Jenkins',
      email: 'olivia_jenk_coll@example.com',
      phone: '+1 (555) 839-4402',
      relationship: 'Sibling'
    },
    eventType: 'Birthday',
    customHeaderMessage: 'Wishing the Best Little Sister standard-breaking happiness! 🎂✨',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days ago
    time: '10:00',
    reminderDays: [1, 3, 7],
    reminderMethod: 'Email',
    packageType: 'PREMIUM',
    status: 'Delivered',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    backgroundMusic: 'track_1',
    collage: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-blowing-party-horn-41584-large.mp4',
    giftVoucherCode: 'CELEBRE-PREM-GIFT-VAL-8592',
    messages: [
      {
        id: 'msg_sister_1',
        authorName: 'Sarah Jenkins',
        relationship: 'Sibling',
        text: 'Happy Birthday to my lovely little sister! No matter where life takes us, we will always be attached at the heart. Have the most magical day of laughter and sweet treats! I have loaded this memory capsule with snapshots of our favorite roadtrips, along with voice/text notes from Mom, Dad, and Danny!'
      },
      {
        id: 'msg_sister_2',
        authorName: 'Mom & Dad',
        relationship: 'Parent',
        text: 'Olivia darling, we are so incredibly proud of the wonderful young woman you have become. Wishing you a year filled with grand successes and good health. We miss you and send you big hugs from across the miles!'
      },
      {
        id: 'msg_sister_3',
        authorName: 'Danny (Brother)',
        relationship: 'Sibling',
        text: 'Happy Birthday Liv! Stop growing up so fast. Miss stealing your fries and arguing over the remote. Have a massive cake for me!'
      }
    ]
  }
];
