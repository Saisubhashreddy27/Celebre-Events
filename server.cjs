var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  let eventsDatabase = [];
  let userDatabase = [];
  let paymentsDatabase = [];
  let contactDatabase = [];
  const seedUserId = "usr_sarah_101";
  userDatabase.push({
    id: seedUserId,
    name: "Sarah Jenkins",
    email: "saisubhashvemireddy@gmail.com",
    timezone: "America/New_York",
    country: "United States"
  });
  eventsDatabase.push(
    {
      id: "evt_upcoming_1",
      plannerId: seedUserId,
      plannerName: "Sarah Jenkins",
      plannerEmail: "saisubhashvemireddy@gmail.com",
      recipient: {
        name: "Michael Jenkins",
        email: "michael.jenkins@example.com",
        phone: "+1 (555) 438-9852",
        relationship: "Partner"
      },
      eventType: "Anniversary",
      customHeaderMessage: "To My Life Partner, 5 Years of Pure Magic Across the Miles!",
      // Anniversary scheduled exactly 5 days from today so the countdown widget counts down beautifully!
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0],
      time: "18:00",
      reminderDays: [1, 3],
      reminderMethod: "Both",
      packageType: "STANDARD",
      status: "Scheduled",
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1e3).toISOString(),
      backgroundMusic: "track_2",
      collage: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800"
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-holding-hands-of-a-happy-couple-walking-43405-large.mp4",
      messages: [
        {
          id: "msg_1",
          authorName: "Sarah Jenkins",
          relationship: "Partner",
          text: "Happy 5th Anniversary, my love! Even though we are thousands of miles apart today, my heart is right next to yours. I remember our walks along the beach and the way we laughed until our stomachs hurt. Here is to wrapping up this distance very soon and celebrating a lifetime together. You are my home."
        }
      ]
    },
    {
      id: "evt_past_1",
      plannerId: seedUserId,
      plannerName: "Sarah Jenkins",
      plannerEmail: "saisubhashvemireddy@gmail.com",
      recipient: {
        name: "Olivia Jenkins",
        email: "olivia.jenk@example.com",
        phone: "+1 (555) 839-4402",
        relationship: "Sibling"
      },
      eventType: "Birthday",
      customHeaderMessage: "Wishing the Best Little Sister standard-breaking happiness! \u{1F382}\u2728",
      // Delivery completed 4 days ago
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0],
      time: "10:00",
      reminderDays: [1, 3, 7],
      reminderMethod: "Email",
      packageType: "PREMIUM",
      status: "Delivered",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1e3).toISOString(),
      backgroundMusic: "track_1",
      collage: [
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800"
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-blowing-party-horn-41584-large.mp4",
      giftVoucherCode: "CELEBRE-PREM-GIFT-VAL-8592",
      messages: [
        {
          id: "msg_sister_1",
          authorName: "Sarah Jenkins",
          relationship: "Sibling",
          text: "Happy Birthday to my lovely little sister! No matter where life takes us, we will always be attached at the heart. Have the most magical day of laughter and sweet treats! I have loaded this memory capsule with snapshots of our favorite roadtrips, along with voice/text notes from Mom, Dad, and Danny!"
        },
        {
          id: "msg_sister_2",
          authorName: "Mom & Dad",
          relationship: "Parent",
          text: "Olivia darling, we are so incredibly proud of the wonderful young woman you have become. Wishing you a year filled with grand successes and good health. We miss you and send you big hugs from across the miles!"
        },
        {
          id: "msg_sister_3",
          authorName: "Danny (Brother)",
          relationship: "Sibling",
          text: "Happy Birthday Liv! Stop growing up so fast. Miss stealing your fries and arguing over my clothes. Have a massive cake for me!"
        }
      ]
    }
  );
  let ai = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new import_genai.GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.post("/api/auth/register", (req, res) => {
    const { name, email, country, timezone, phone } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email address is required." });
    }
    const exists = userDatabase.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.json({ success: true, user: exists, message: "Welcome back!" });
    }
    const newUser = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name: name || email.split("@")[0],
      email: email.toLowerCase(),
      phone: phone || "",
      country: country || "United States",
      timezone: timezone || "EST"
    };
    userDatabase.push(newUser);
    res.json({ success: true, user: newUser, message: "Account crafted successfully." });
  });
  app.post("/api/auth/login", (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email address is required." });
    }
    let user = userDatabase.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      user = {
        id: "usr_" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0].split(/[._-]/).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" "),
        email: email.toLowerCase(),
        country: "India",
        timezone: "America/New_York"
      };
      userDatabase.push(user);
    }
    res.json({ success: true, user });
  });
  app.post("/api/auth/google-oauth", (req, res) => {
    const { email, name } = req.body;
    if (!email) {
      return res.status(400).json({ error: "OAuth email missing." });
    }
    let user = userDatabase.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      user = {
        id: "usr_" + Math.random().toString(36).substr(2, 9),
        name: name || "Emma Stone",
        email: email.toLowerCase(),
        country: "United States",
        timezone: "UTC"
      };
      userDatabase.push(user);
    }
    res.json({ success: true, user });
  });
  app.get("/api/events", (req, res) => {
    const { plannerId } = req.query;
    if (plannerId) {
      const filtered = eventsDatabase.filter((e) => e.plannerId === plannerId);
      res.json(filtered);
    } else {
      res.json(eventsDatabase);
    }
  });
  app.get("/api/events/:id", (req, res) => {
    const event = eventsDatabase.find((e) => e.id === req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Surprise celebration event not found" });
    }
    res.json(event);
  });
  app.post("/api/events", (req, res) => {
    const eventInput = req.body;
    const newEvent = {
      ...eventInput,
      id: "evt_" + Math.random().toString(36).substr(2, 9),
      status: "Draft",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      messages: eventInput.messages || []
    };
    eventsDatabase.push(newEvent);
    res.json(newEvent);
  });
  app.put("/api/events/:id", (req, res) => {
    const idx = eventsDatabase.findIndex((e) => e.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ error: "Celebration not found" });
    }
    eventsDatabase[idx] = {
      ...eventsDatabase[idx],
      ...req.body
    };
    res.json(eventsDatabase[idx]);
  });
  app.delete("/api/events/:id", (req, res) => {
    const originalLen = eventsDatabase.length;
    eventsDatabase = eventsDatabase.filter((e) => e.id !== req.params.id);
    if (eventsDatabase.length === originalLen) {
      return res.status(404).json({ error: "Could not delete: event not found" });
    }
    res.json({ success: true, message: "Celebration cancelled successfully" });
  });
  app.post("/api/payments/checkout", (req, res) => {
    const { eventId, packageType, promoCode, paymentMethod, currency } = req.body;
    const eventIdx = eventsDatabase.findIndex((e) => e.id === eventId);
    if (eventIdx === -1) {
      return res.status(404).json({ error: "Celebration event not found to process payment" });
    }
    let usd = 9;
    let inr = 499;
    if (packageType === "STANDARD") {
      usd = 19;
      inr = 1499;
    } else if (packageType === "PREMIUM") {
      usd = 49;
      inr = 3499;
    }
    let discountUSD = 0;
    let discountINR = 0;
    if (promoCode && promoCode.toUpperCase() === "CELEBRE10") {
      discountUSD = parseFloat((usd * 0.1).toFixed(2));
      discountINR = parseFloat((inr * 0.1).toFixed(2));
    }
    const payId = "pay_ch_" + Math.random().toString(36).substr(2, 9);
    const eventRef = eventsDatabase[eventIdx];
    eventRef.status = "Scheduled";
    eventRef.paymentId = payId;
    if (packageType === "PREMIUM") {
      eventRef.giftVoucherCode = "CELEBRE-" + packageType + "-GIFT-" + Math.floor(1e5 + Math.random() * 9e5);
      if (!eventRef.messages || eventRef.messages.length <= 1) {
        eventRef.messages = [
          ...eventRef.messages || [],
          {
            id: "msg_f1",
            authorName: "Aunty Clara",
            relationship: "Parent",
            text: "So proud of your journey dear! Sending you my warmest prayers, delicious baked treats (in spirit!), and looking forward to our reunion."
          },
          {
            id: "msg_f2",
            authorName: "David S. (Grad classmate)",
            relationship: "Friend",
            text: "Happy Birthday comrade! To the late night studies, project panics, and endless tea breaks. Cheers to overcoming the miles!"
          },
          {
            id: "msg_f3",
            authorName: "CEO Mr. Thomas",
            relationship: "Colleague",
            text: "Superb milestone! On behalf of the entire team, congrats on your exceptional work. We are extremely glad to have you in our division."
          }
        ];
      }
    }
    const paymentRecord = {
      id: payId,
      eventId,
      packageType,
      amountUSD: usd - discountUSD,
      amountINR: inr - discountINR,
      status: "Completed",
      date: (/* @__PURE__ */ new Date()).toISOString(),
      promoCode: promoCode || "",
      discountUSD,
      paymentMethod: paymentMethod || "Credit Card",
      cardLast4: "4242"
    };
    paymentsDatabase.push(paymentRecord);
    res.json({
      success: true,
      message: "Payment confirmed safely via SSL sandbox gateway!",
      event: eventRef,
      paymentRecord
    });
  });
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message body are required" });
    }
    const newMessage = {
      id: "cont_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      subject: subject || "General Inquiry",
      message,
      date: (/* @__PURE__ */ new Date()).toISOString(),
      status: "Unread"
    };
    contactDatabase.push(newMessage);
    res.json({
      success: true,
      message: "Luxury event concierge has received your request. Expect a personalized response at " + email + " within 4 hours. \u2728"
    });
  });
  app.post("/api/gemini/generate-card", async (req, res) => {
    const { eventType, recipientName, relationship, tone, plannerName } = req.body;
    if (!eventType || !recipientName || !plannerName) {
      return res.status(400).json({ error: "eventType, recipientName, and plannerName are required fields" });
    }
    const fallbackMessage = () => {
      const templates = {
        Birthday: `Happy Birthday, dearest ${recipientName}! \u{1F382}

Even though oceans and timezones separate us physically today, my heart is right next to yours. You occupy my thoughts, and I am celebrating your beautiful presence in this world from afar. I hope this custom curated memory capsule brings a immense sparkle to your eye.

Wishing you an extraordinary year filled with laughter, breakthroughs, and love.

Sent with endless warmth,
${plannerName}`,
        Anniversary: `To My Beautiful Partner, ${recipientName} \u2014 Happy Anniversary! \u{1F48D}

Sharing life with you has been a grand adventure. Distance is temporary, but our bond is permanent and stronger with each setting sun. Every memory we make is locked safely in my heart until we hold hands again.

All my love and adoration across the miles,
${plannerName}`,
        Graduation: `Dearest ${recipientName}, Happy Graduation day! \u{1F393}

Watching you conquer milestones from thousands of miles away has been my greatest pride. Your hard work, brilliant mind, and kind soul have brought you to this glorious pinnacle. The world awaits your footprints!

Cheers from afar,
${plannerName}`,
        Valentine: `My Dearest ${recipientName}, Happy Valentine's Day! \u{1F48C}

No distance can ever dim the celebration of us. This reveal page is a digital bridge built from the thousand beautiful memories we have woven together. Sending you the warmest embraces and looking forward to our next embrace.

Forever yours,
${plannerName}`,
        Promotion: `Dear ${recipientName}, Congratulations on your well-deserved Promotion! \u{1F3C6}

Your relentless drive, talent, and standard of excellence are inspiring. Truly glad to witness your professional success rise. Celebrate big today!

Warmest regards,
${plannerName}`,
        default: `Dearest ${recipientName},

I wanted to reach across the distance today and hold a special celebration for you because you deserve to know how deeply you are appreciated. May this little digital surprise place a warm hug right in your heart and let you know how much you are cherished.

With absolute love and care,
${plannerName}`
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
      const prompt = `You are an elite, emotionally deep copywriter for "C\xE9l\xE8bre" (a luxury physical/digital event planning service).
Your task is to craft an elegant, rich, and touching personal celebration letter.
Planner's Name: ${plannerName}
Recipient's Name: ${recipientName}
Relationship: The recipient is the planner's ${relationship || "beloved one"}
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
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.85
        }
      });
      const parsed = JSON.parse(result.text || "{}");
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
    } catch (err) {
      console.error("Gemini card text generation error:", err);
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
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[C\xE9l\xE8bre Server] Listening elegantly on http://0.0.0.0:${PORT}`);
  });
}
startServer();
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=server.cjs.map
