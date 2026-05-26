/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

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
app.post('/api/auth/register', async (req, res) => {
  const { name, email, country, timezone, phone } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  try {
    const { data: exists } = await supabase
      .from('users')
      .select('*')
      .ilike('email', email)
      .single();

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

    const { data, error } = await supabase.from('users').insert(newUser).select().single();
    if (error) throw error;

    res.json({ success: true, user: data, message: 'Account crafted successfully.' });
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Failed to create account.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .ilike('email', email)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'No account found with this email. Please create an account.' });
    }

    res.json({ success: true, user });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed.' });
  }
});

// Google OAuth flow simulation
app.post('/api/auth/google-oauth', async (req, res) => {
  const { email, name } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'OAuth email missing.' });
  }

  try {
    let { data: user } = await supabase
      .from('users')
      .select('*')
      .ilike('email', email)
      .single();

    if (!user) {
      const newUser = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name: name || 'Emma Stone',
        email: email.toLowerCase(),
        country: 'United States',
        timezone: 'UTC'
      };
      const { data: created } = await supabase.from('users').insert(newUser).select().single();
      user = created;
    }
    res.json({ success: true, user });
  } catch (error: any) {
    console.error('OAuth error:', error);
    res.status(500).json({ error: 'OAuth failed.' });
  }
});

// 2. Events CRUD Operations
app.get('/api/events', async (req, res) => {
  const { plannerId } = req.query;
  try {
    let query = supabase.from('events').select('*');
    if (plannerId) {
      query = query.eq('plannerId', plannerId);
    }
    const { data, error } = await query;
    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.get('/api/events/:id', async (req, res) => {
  try {
    const { data: event, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !event) {
      return res.status(404).json({ error: 'Surprise celebration event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

app.post('/api/events', async (req, res) => {
  const eventInput = req.body;
  
  // Sanitize input to ONLY include fields that exist in our Supabase schema
  const newEvent = {
    id: 'evt_' + Math.random().toString(36).substr(2, 9),
    plannerId: eventInput.plannerId,
    plannerName: eventInput.plannerName,
    plannerEmail: eventInput.plannerEmail,
    recipient: eventInput.recipient,
    eventType: eventInput.customEventName && eventInput.eventType === 'CustomSurprise' 
      ? `Custom: ${eventInput.customEventName}` 
      : eventInput.eventType,
    customHeaderMessage: eventInput.customHeaderMessage,
    date: eventInput.date,
    time: eventInput.time,
    reminderDays: eventInput.reminderDays,
    reminderMethod: eventInput.reminderMethod,
    packageType: eventInput.packageType,
    status: 'Draft',
    createdAt: new Date().toISOString(),
    backgroundMusic: eventInput.backgroundMusic,
    collage: eventInput.collage,
    videoUrl: eventInput.videoUrl,
    giftVoucherCode: eventInput.giftVoucherCode,
    messages: eventInput.messages || []
  };

  try {
    const { data, error } = await supabase.from('events').insert(newEvent).select().single();
    if (error) {
      console.error('Supabase insert error details:', error);
      throw error;
    }
    res.json(data);
  } catch (error: any) {
    console.error('Create event error:', error);
    res.status(500).json({ error: error.message || 'Failed to create event' });
  }
});

app.put('/api/events/:id', async (req, res) => {
  const eventInput = req.body;
  
  // Sanitize input to ONLY include fields that exist in our Supabase schema
  const updatePayload: any = {};
  const validKeys = [
    'plannerId', 'plannerName', 'plannerEmail', 'recipient', 
    'eventType', 'customHeaderMessage', 'date', 'time', 
    'reminderDays', 'reminderMethod', 'packageType', 'status', 
    'backgroundMusic', 'collage', 'videoUrl', 'giftVoucherCode', 
    'messages', 'paymentId'
  ];
  
  for (const key of validKeys) {
    if (eventInput[key] !== undefined) {
      updatePayload[key] = eventInput[key];
    }
  }

  // Handle custom event name
  if (eventInput.customEventName && eventInput.eventType === 'CustomSurprise') {
    updatePayload.eventType = `Custom: ${eventInput.customEventName}`;
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .update(updatePayload)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Celebration not found' });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const { error, count } = await supabase
      .from('events')
      .delete({ count: 'exact' })
      .eq('id', req.params.id);

    if (error || count === 0) {
      return res.status(404).json({ error: 'Could not delete: event not found' });
    }
    res.json({ success: true, message: 'Celebration cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// 3. Payment Processing Integration Simulator (Razorpay/Stripe details)
app.post('/api/payments/checkout', async (req, res) => {
  const { eventId, packageType, promoCode, paymentMethod, currency } = req.body;
  
  try {
    const { data: eventRef, error: fetchError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (fetchError || !eventRef) {
      return res.status(404).json({ error: 'Celebration event not found to process payment' });
    }

    let usd = 9;
    let inr = 499;
    if (packageType === 'STANDARD') {
      usd = 19;
      inr = 1499;
    } else if (packageType === 'PREMIUM') {
      usd = 49;
      inr = 3499;
    }

    let discountUSD = 0;
    let discountINR = 0;
    if (promoCode && promoCode.toUpperCase() === 'CELEBRE10') {
      discountUSD = parseFloat((usd * 0.1).toFixed(2));
      discountINR = parseFloat((inr * 0.1).toFixed(2));
    }

    const payId = 'pay_ch_' + Math.random().toString(36).substr(2, 9);
    
    // Premium Features Hydration!
    const updates: any = {
      status: 'Scheduled',
      paymentId: payId
    };

    if (packageType === 'PREMIUM') {
      updates.giftVoucherCode = 'CELEBRE-' + packageType + '-GIFT-' + Math.floor(100000 + Math.random() * 900000);
      if (!eventRef.messages || eventRef.messages.length <= 1) {
        updates.messages = [
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

    const { data: updatedEvent, error: updateError } = await supabase
      .from('events')
      .update(updates)
      .eq('id', eventId)
      .select()
      .single();

    if (updateError) throw updateError;

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

    await supabase.from('payments').insert(paymentRecord);

    res.json({
      success: true,
      message: 'Payment confirmed safely via SSL sandbox gateway!',
      event: updatedEvent,
      paymentRecord
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment processing failed.' });
  }
});

// 4. Contact Form Submission
app.post('/api/contact', async (req, res) => {
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

  try {
    await supabase.from('contact_messages').insert(newMessage);
    res.json({
      success: true,
      message: 'Luxury event concierge has received your request. Expect a personalized response at ' + email + ' within 4 hours. ✨'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit contact message.' });
  }
});

// 5. Server-Side Gemini AI e-card Copywriter Integration
app.post('/api/gemini/generate-card', async (req, res) => {
  const { eventType, recipientName, relationship, tone, plannerName } = req.body;
  
  if (!eventType || !recipientName || !plannerName) {
    return res.status(400).json({ error: 'eventType, recipientName, and plannerName are required fields' });
  }

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
