/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

  // In-memory data persistence representing our PostgreSQL tables:
  // Users, Recipients, Events, Payments, Contact Messages, etc.
  let eventsDatabase: any[] = [];
  let userDatabase: any[] = [];
  let paymentsDatabase: any[] = [];
  let contactDatabase: any[] = [];

  // Seed standard Sarah Jenkins user so client has a default login state
  const seedUserId = 'usr_sarah_101';
  userDatabase.push({
    id: seedUserId,
    name: 'Sarah Jenkins',
    email: 'saisubhashvemireddy@gmail.com',
    timezone: 'America/New_York',
    country: 'United States'
  });

  // Seed gorgeous initial Scheduled and Delivered surprise events for Sarah Jenkins
  // so the user receives a fully working and exciting dashboard with actual countdowns immediately!
  eventsDatabase.push(
    {
      id: 'evt_upcoming_1',
      plannerId: seedUserId,
      plannerName: 'Sarah Jenkins',
      plannerEmail: 'saisubhashvemireddy@gmail.com',
      recipient: {
        name: 'Michael Jenkins',
        email: 'michael.jenkins@example.com',
        phone: '+1 (555) 438-9852',
        relationship: 'Partner'
      },
      eventType: 'Anniversary',
      customHeaderMessage: 'To My Life Partner, 5 Years of Pure Magic Across the Miles!',
      // Anniversary scheduled exactly 5 days from today so the countdown widget counts down beautifully!
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '18:00',
      reminderDays: [1, 3],
      reminderMethod: 'Both',
      packageType: 'STANDARD',
      status: 'Scheduled',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      backgroundMusic: 'track_2',
      collage: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
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
      plannerId: seedUserId,
      plannerName: 'Sarah Jenkins',
      plannerEmail: 'saisubhashvemireddy@gmail.com',
      recipient: {
        name: 'Olivia Jenkins',
        email: 'olivia.jenk@example.com',
        phone: '+1 (555) 839-4402',
        relationship: 'Sibling'
      },
      eventType: 'Birthday',
      customHeaderMessage: 'Wishing the Best Little Sister standard-breaking happiness! 🎂✨',
      // Delivery completed 4 days ago
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
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
          text: 'Happy Birthday Liv! Stop growing up so fast. Miss stealing your fries and arguing over my clothes. Have a massive cake for me!'
        }
      ]
    }
  );

  // Initialize official Gemini Client from @google/genai
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }

  // API Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // --- PERSISTENCE REST API ENDPOINTS ---

  // 1. JWT-alike Client Authentication Routes
  app.post('/api/auth/register', (req, res) => {
    const { name, email, country, timezone, phone } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email address is required.' });
    }
    const exists = userDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.status(400).json({ error: 'An account with this email already exists. Please log in.' });
    }
    const newUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: name || email.split('@')[0],
      email: email.toLowerCase(),
      phone: phone || '',
      country: country || 'United States',
      timezone: timezone || 'EST'
    };
    userDatabase.push(newUser);
    res.json({ success: true, user: newUser, message: 'Account crafted successfully.' });
  });

  app.post('/api/auth/login', (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email address is required.' });
    }
    // Strict lookup: if user does not exist, tell them to register
    let user = userDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(404).json({ error: 'No account found with this email. Please create an account.' });
    }
    res.json({ success: true, user });
  });

  // Google OAuth flow simulation
  app.post('/api/auth/google-oauth', (req, res) => {
    const { email, name } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'OAuth email missing.' });
    }
    let user = userDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      user = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name: name || 'Emma Stone',
        email: email.toLowerCase(),
        country: 'United States',
        timezone: 'UTC'
      };
      userDatabase.push(user);
    }
    res.json({ success: true, user });
  });

  // 2. Events CRUD Operations
  app.get('/api/events', (req, res) => {
    const { plannerId } = req.query;
    if (plannerId) {
      const filtered = eventsDatabase.filter(e => e.plannerId === plannerId);
      res.json(filtered);
    } else {
      res.json(eventsDatabase);
    }
  });

  app.get('/api/events/:id', (req, res) => {
    const event = eventsDatabase.find(e => e.id === req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Surprise celebration event not found' });
    }
    res.json(event);
  });

  app.post('/api/events', (req, res) => {
    const eventInput = req.body;
    const newEvent = {
      ...eventInput,
      id: 'evt_' + Math.random().toString(36).substr(2, 9),
      status: 'Draft',
      createdAt: new Date().toISOString(),
      messages: eventInput.messages || []
    };
    eventsDatabase.push(newEvent);
    res.json(newEvent);
  });

  app.put('/api/events/:id', (req, res) => {
    const idx = eventsDatabase.findIndex(e => e.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Celebration not found' });
    }
    eventsDatabase[idx] = {
      ...eventsDatabase[idx],
      ...req.body
    };
    res.json(eventsDatabase[idx]);
  });

  app.delete('/api/events/:id', (req, res) => {
    const originalLen = eventsDatabase.length;
    eventsDatabase = eventsDatabase.filter(e => e.id !== req.params.id);
    if (eventsDatabase.length === originalLen) {
      return res.status(404).json({ error: 'Could not delete: event not found' });
    }
    res.json({ success: true, message: 'Celebration cancelled successfully' });
  });

  // 3. Payment Processing Integration Simulator (Razorpay/Stripe details)
  app.post('/api/payments/checkout', (req, res) => {
    const { eventId, packageType, promoCode, paymentMethod, currency } = req.body;
    
    const eventIdx = eventsDatabase.findIndex(e => e.id === eventId);
    if (eventIdx === -1) {
      return res.status(404).json({ error: 'Celebration event not found to process payment' });
    }

    // Determine prices based on packageType
    let usd = 9;
    let inr = 499;
    if (packageType === 'STANDARD') {
      usd = 19;
      inr = 1499;
    } else if (packageType === 'PREMIUM') {
      usd = 49;
      inr = 3499;
    }

    // Apply coupon discount (e.g. CELEBRE10 gives 10% off)
    let discountUSD = 0;
    let discountINR = 0;
    if (promoCode && promoCode.toUpperCase() === 'CELEBRE10') {
      discountUSD = parseFloat((usd * 0.1).toFixed(2));
      discountINR = parseFloat((inr * 0.1).toFixed(2));
    }

    const payId = 'pay_ch_' + Math.random().toString(36).substr(2, 9);
    
    // Update event record to Scheduled and bind payment references
    const eventRef = eventsDatabase[eventIdx];
    eventRef.status = 'Scheduled';
    eventRef.paymentId = payId;

    // Premium Features Hydration! Add group comments if none are registered
    if (packageType === 'PREMIUM') {
      eventRef.giftVoucherCode = 'CELEBRE-' + packageType + '-GIFT-' + Math.floor(100000 + Math.random() * 900000);
      if (!eventRef.messages || eventRef.messages.length <= 1) {
        eventRef.messages = [
          ...(eventRef.messages || []),
          {
            id: 'msg_f1',
            authorName: 'Aunty Clara',
            relationship: 'Parent',
            text: 'So proud of your journey dear! Sending you my warmest prayers, delicious baked treats (in spirit!), and looking forward to our reunion.'
          },
          {
            id: 'msg_f2',
            authorName: 'David S. (Grad classmate)',
            relationship: 'Friend',
            text: 'Happy Birthday comrade! To the late night studies, project panics, and endless tea breaks. Cheers to overcoming the miles!'
          },
          {
            id: 'msg_f3',
            authorName: 'CEO Mr. Thomas',
            relationship: 'Colleague',
            text: 'Superb milestone! On behalf of the entire team, congrats on your exceptional work. We are extremely glad to have you in our division.'
          }
        ];
      }
    }

    const paymentRecord = {
      id: payId,
      eventId: eventId,
      packageType: packageType,
      amountUSD: usd - discountUSD,
      amountINR: inr - discountINR,
      status: 'Completed',
      date: new Date().toISOString(),
      promoCode: promoCode || '',
      discountUSD: discountUSD,
      paymentMethod: paymentMethod || 'Credit Card',
      cardLast4: '4242'
    };
    paymentsDatabase.push(paymentRecord);

    res.json({
      success: true,
      message: 'Payment confirmed safely via SSL sandbox gateway!',
      event: eventRef,
      paymentRecord
    });
  });

  // 4. Contact Form Submission
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message body are required' });
    }
    const newMessage = {
      id: 'cont_' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
      date: new Date().toISOString(),
      status: 'Unread'
    };
    contactDatabase.push(newMessage);
    res.json({
      success: true,
      message: 'Luxury event concierge has received your request. Expect a personalized response at ' + email + ' within 4 hours. ✨'
    });
  });

  // 5. Server-Side Gemini AI e-card Copywriter Integration
  app.post('/api/gemini/generate-card', async (req, res) => {
    const { eventType, recipientName, relationship, tone, plannerName } = req.body;
    
    if (!eventType || !recipientName || !plannerName) {
      return res.status(400).json({ error: 'eventType, recipientName, and plannerName are required fields' });
    }

    // Fine-tuned elegant fallbacks in case GEMINI_API_KEY is not configured
    const fallbackMessage = () => {
      const templates: Record<string, string> = {
        Birthday: `Happy Birthday, dearest ${recipientName}! 🎂\n\nEven though oceans and timezones separate us physically today, my heart is right next to yours. You occupy my thoughts, and I am celebrating your beautiful presence in this world from afar. I hope this custom curated memory capsule brings a immense sparkle to your eye.\n\nWishing you an extraordinary year filled with laughter, breakthroughs, and love.\n\nSent with endless warmth,\n${plannerName}`,
        Anniversary: `To My Beautiful Partner, ${recipientName} — Happy Anniversary! 💍\n\nSharing life with you has been a grand adventure. Distance is temporary, but our bond is permanent and stronger with each setting sun. Every memory we make is locked safely in my heart until we hold hands again.\n\nAll my love and adoration across the miles,\n${plannerName}`,
        Graduation: `Dearest ${recipientName}, Happy Graduation day! 🎓\n\nWatching you conquer milestones from thousands of miles away has been my greatest pride. Your hard work, brilliant mind, and kind soul have brought you to this glorious pinnacle. The world awaits your footprints!\n\nCheers from afar,\n${plannerName}`,
        Valentine: `My Dearest ${recipientName}, Happy Valentine's Day! 💌\n\nNo distance can ever dim the celebration of us. This reveal page is a digital bridge built from the thousand beautiful memories we have woven together. Sending you the warmest embraces and looking forward to our next embrace.\n\nForever yours,\n${plannerName}`,
        Promotion: `Dear ${recipientName}, Congratulations on your well-deserved Promotion! 🏆\n\nYour relentless drive, talent, and standard of excellence are inspiring. Truly glad to witness your professional success rise. Celebrate big today!\n\nWarmest regards,\n${plannerName}`,
        default: `Dearest ${recipientName},\n\nI wanted to reach across the distance today and hold a special celebration for you because you deserve to know how deeply you are appreciated. May this little digital surprise place a warm hug right in your heart and let you know how much you are cherished.\n\nWith absolute love and care,\n${plannerName}`
      };
      
      return templates[eventType] || templates.default;
    };

    if (!ai) {
      return res.json({
        success: true,
        text: fallbackMessage(),
        title: `A Surprising Celebration for Dearest ${recipientName}`,
        captionIdeas: [
          `Miles may keep us apart, but memories bind our hearts.`,
          `Our favorite adventures together, frozen in time.`,
          `Celebrating the beautiful human that you are, every day.`
        ],
        isFallback: true
      });
    }

    try {
      const prompt = `You are an elite, emotionally deep copywriter for "Célèbre" (a luxury physical/digital event planning service).
Your task is to craft an elegant, rich, and touching personal celebration letter.
Planner's Name: ${plannerName}
Recipient's Name: ${recipientName}
Relationship: The recipient is the planner's ${relationship || 'beloved one'}
Occasion: ${eventType}
Aesthetic tone details: Warm, classic, nostalgic, luxuriously heartwarming, focused on conquering distance.

Write a touching 2-3 paragraph letter.
Also output:
1. An elegant, romantic messageTitle (e.g., "A Lifetime of Love Across the Ocean").
2. Three brief, standard-setting photo caption ideas for their interactive collage.

Respond ONLY with valid JSON structure, matching this schema:
{
  "messageTitle": "string",
  "letterBody": "string with newlines",
  "captionIdeas": ["string", "string", "string"]
}`;

      const result = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.85
        }
      });

      const parsed = JSON.parse(result.text || '{}');
      res.json({
        success: true,
        text: parsed.letterBody || result.text,
        title: parsed.messageTitle || `In Honor of Your ${eventType}, Dearest ${recipientName}`,
        captionIdeas: parsed.captionIdeas || [
          `Smiles that span across the miles.`,
          `Shared moments of immense joy.`,
          `Our bridge of love remains unbroken.`
        ],
        isAI: true
      });
    } catch (err: any) {
      console.error('Gemini card text generation error:', err);
      // Fail safely to gorgeous built-ins
      res.json({
        success: true,
        text: fallbackMessage(),
        title: `In Honor of Your ${eventType}, Dearest ${recipientName}`,
        captionIdeas: [
          `Smiles that span across the miles.`,
          `Shared moments of immense joy.`,
          `Our bridge of love remains unbroken.`
        ]
      });
    }
  });

  // --- VITE MIDDLEWARE CONFIGURATION ---

  async function setupVite() {
    if (process.env.NODE_ENV !== 'production') {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa'
      });
      app.use(vite.middlewares);
    } else if (!process.env.VERCEL) {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  if (!process.env.VERCEL) {
    setupVite().then(() => {
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`[Célèbre Server] Listening elegantly on http://0.0.0.0:${PORT}`);
      });
    });
  }

export default app;
