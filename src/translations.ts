/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LanguageCode = 'en' | 'te' | 'hi' | 'kn';

export interface TranslationSet {
  welcome_back: string;
  pavilion_workspace: string;
  quote_1: string;
  quote_2: string;
  quote_3: string;
  quote_author_1: string;
  quote_author_2: string;
  quote_author_3: string;
  bespoke_configurator: string;
  bespoke_title: string;
  bespoke_desc: string;
  step_1: string;
  step_2: string;
  step_2_desc: string;
  addon_frames: string;
  addon_frames_desc: string;
  addon_blood: string;
  addon_blood_desc: string;
  addon_sketches: string;
  addon_sketches_desc: string;
  addon_gallery: string;
  addon_gallery_desc: string;
  select_standard_illus: string;
  select_premium_stock: string;
  select_deluxe_hi_res: string;
  what_we_provide: string;
  provide_1: string;
  provide_2: string;
  provide_3: string;
  provide_4: string;
  live_preview: string;
  total: string;
  configured_price: string;
  book_now_cta: string;
  redirect_msg: string;
  schedule_title: string;
  schedule_subtitle: string;
  schedule_desc: string;
  target_celebration: string;
  bespoke_action: string;
  action_option_sketches: string;
  action_option_blood: string;
  action_option_frames: string;
  action_option_gallery: string;
  action_option_gemini: string;
  execution_time: string;
  add_cron_btn: string;
  active_cron_triggers: string;
  no_cron: string;
  arm_label: string;
  cancel_update: string;
  select_language: string;
  english: string;
  telugu: string;
  hindi: string;
  kannada: string;
  tier_basic_title: string;
  tier_basic_desc: string;
  tier_standard_title: string;
  tier_standard_desc: string;
  tier_premium_title: string;
  tier_premium_desc: string;
  base_charge_label: string;
  sketch_overlay_label: string;
  blood_dots_badge: string;
  card_preview_title: string;
  card_preview_desc: string;
  tier_luxury_frames: string;
  tier_pulse_dots: string;
  tier_pencil_sketch: string;
  tier_good_imagery: string;
  hero_subtitle: string;
  hero_title_1: string;
  hero_title_2: string;
  hero_desc: string;
  btn_start_planning: string;
  btn_see_how_it_works: string;
  pillars_subtitle: string;
  pillars_title: string;
  pillar_1_title: string;
  pillar_1_desc: string;
  pillar_2_title: string;
  pillar_2_desc: string;
  pillar_3_title: string;
  pillar_3_desc: string;
  blueprint_subtitle: string;
  blueprint_title_1: string;
  blueprint_title_2: string;
  blueprint_desc: string;
  btn_schedule_capsule: string;
  milestones_subtitle: string;
  milestones_title: string;
  tailored_subtitle: string;
  tailored_title: string;
  tailored_desc: string;
  btn_select_tier: string;
  testimonials_subtitle: string;
  testimonials_title: string;
  footer_cta_title_1: string;
  footer_cta_title_2: string;
  footer_cta_desc: string;
  nav_home: string;
  nav_bookings: string;
  nav_new_booking: string;
  nav_packages: string;
  nav_about_us: string;
  nav_contact: string;
  nav_login_signup: string;
  nav_logout: string;
  app_subtitle: string;
  footer_brand_desc: string;
  footer_nav_title: string;
  footer_integrity_title: string;
  footer_ssl_badge: string;
  footer_delivery_badge: string;
  footer_news_title: string;
  footer_news_desc: string;
  footer_link_home: string;
  footer_link_brand: string;
  footer_link_faq: string;
  footer_link_dash: string;
  btn_join: string;
  footer_copyright: string;
  footer_secure_link: string;
  footer_terms: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationSet> = {
  en: {
    welcome_back: "Welcome Back,",
    pavilion_workspace: "Célèbre Private Pavilion Workspace",
    quote_1: "Across every boundary, mile, and timezone — never miss a person.",
    quote_2: "Because distance should never dim the majestic light of celebration.",
    quote_3: "A physical gift wears thin; an orchestrated digital memory capsule remains forever.",
    quote_author_1: "Milestone Philosophy Collective",
    quote_author_2: "Célèbre Orchestration Creed",
    quote_author_3: "Luxury Curation Institute",
    bespoke_configurator: "BESPOKE CONFIGURATOR",
    bespoke_title: "Bespoke Interactive Curation Pricing",
    bespoke_desc: "Customize the visual language, digital frames, and image count to match your milestones. Add-ons layer seamlessly to orchestrate standard-shattering experiences.",
    step_1: "Step 1: Choose Your Core Memory Package Tier",
    step_2: "Step 2: Premium Add-ons & Curation Layers (Starting from ₹500)",
    step_2_desc: "Customize the milestone recipient screen by embedding tactile artwork, dynamic heart pulsing coordinates, or high-definition pictures.",
    addon_frames: "Bespoke Floating Frames (+₹500 / $6)",
    addon_frames_desc: "Styles the core reveal cards with elegant, hand-crafted digital borders and luxury shadow structures.",
    addon_blood: "Interactive Blood-Dots Sync (+₹500 / $6)",
    addon_blood_desc: "Generates real-time, pulsing red/crimson heartbeat accents reflecting synchronized emotion across miles.",
    addon_sketches: "Hand-drawn portrait sketch artwork (+₹500 / $6)",
    addon_sketches_desc: "Configures our server sketching engine to produce dynamic pencil-sketch overlays of memory assets.",
    addon_gallery: "Good Images & Gallery Scale",
    addon_gallery_desc: "Scale ranges dynamically of photos loaded in their memory room vault.",
    select_standard_illus: "Standard Illustration placeholders (Included)",
    select_premium_stock: "5 Premium Stock High-HQ Theme Images (+₹500 / $6)",
    select_deluxe_hi_res: "15 Deluxe High-Resolution Curated Images (+₹1500 / $18)",
    what_we_provide: "⚙️ WHAT WE PROVIDE IN EVERY CAPSULE ORCHESTRATION:",
    provide_1: "Gemini AI letter drafting initialized on server",
    provide_2: "Real-time local timezone clock synchronization",
    provide_3: "Instant high-contrast audio and waltz selection",
    provide_4: "Confetti blowing particle canvas triggers on load",
    live_preview: "Live Aesthetic Playground Preview",
    total: "Total",
    configured_price: "Configured Price",
    book_now_cta: "Book Now with Custom Configuration ✨",
    redirect_msg: "Redirects standard to coordinate form pre-armed with configurations.",
    schedule_title: "Schedule Background Capsule Updates",
    schedule_subtitle: "CHRONO-COORDINATION",
    schedule_desc: "Need to inject portrait Sketches, replace Frames, or swap background soundtracks after booking? Coordinate autonomous cron updates so edits execute at the precise milestone hour.",
    target_celebration: "Target Scheduled Celebration",
    bespoke_action: "Bespoke Update Action",
    action_option_sketches: "Inject Handcrafted Portrait Sketches (₹500)",
    action_option_blood: "Embed Beating Blood-Dots Sync (₹500)",
    action_option_frames: "Swap/Update Global Floating Frames (₹500)",
    action_option_gallery: "Re-Hydrate High-HQ Good Images Room (₹1,500)",
    action_option_gemini: "Recalculate Gemini AI Wording Balance (Included)",
    execution_time: "Scheduled Action Execution",
    add_cron_btn: "Configure Background Update Cron",
    active_cron_triggers: "🗓️ Active background cron scheduler triggers:",
    no_cron: "No automated update events scheduled. Use the form above to add customized automation flags.",
    arm_label: "Cron Armed",
    cancel_update: "Cancel Update",
    select_language: "Select Language",
    english: "English 🇬🇧",
    telugu: "తెలుగు 🇮🇳",
    hindi: "हिन्दी 🇮🇳",
    kannada: "ಕನ್ನಡ 🇮🇳",
    tier_basic_title: "Basic Tier",
    tier_basic_desc: "Physical greeting card, mini cake, and standard surprise delivery",
    tier_standard_title: "Standard Tier",
    tier_standard_desc: "Premium theme cake, beautiful decorations, and live music",
    tier_premium_title: "Premium Tier",
    tier_premium_desc: "Designer multi-tier cake, luxury venue decor, and live art performances",
    base_charge_label: "Base Charge",
    sketch_overlay_label: "Fine-Art Custom Pencil Sketch Aspect Attached",
    blood_dots_badge: "Blood dots Live",
    card_preview_title: "Happy 30th Birthday Surprising Capsule!",
    card_preview_desc: "We've bound this memory. It contains custom letters written via Gemini AI copywriters, champagne strings, and your specified media layers.",
    tier_luxury_frames: "Luxury Frames",
    tier_pulse_dots: "Pulse Blood dots",
    tier_pencil_sketch: "Pencil Sketch",
    tier_good_imagery: "Good Imagery",
    hero_subtitle: "The Art of Long-Distance Celebration",
    hero_title_1: "Celebrate Love Across",
    hero_title_2: "Every Single Mile.",
    hero_desc: '"Because Distance Should Never Dim the Celebration." Handcraft, schedule, and deliver fully interactive luxury digital memory capsules softly to your loved ones on their glorious days.',
    btn_start_planning: "Start Planning Now",
    btn_see_how_it_works: "See How It Works",
    pillars_subtitle: "Our Orchestration Pillars",
    pillars_title: "Designed for Heartstrings, Crafted for Trust",
    pillar_1_title: "1. Plan the Milestone",
    pillar_1_desc: "Use our elegant multi-step wizard to setup key contacts. Choose an anniversary, birthday, graduation, or a gentle customized token to bridge the gap.",
    pillar_2_title: "2. Interactive Curation",
    pillar_2_desc: "Select rich background acoustic strings, upload precious photographs, trigger video montages, and use server-side AI to compose the ultimate heartfelt message.",
    pillar_3_title: "3. Surprise Delivery",
    pillar_3_desc: "Célèbre monitors timezone triggers perfectly. On the day, we blast SMS, Email, and WhatsApp links. When clicked, a magical confetti reveal explodes on their screen.",
    blueprint_subtitle: "The Delivery Blueprint",
    blueprint_title_1: "An Orchestrated Path",
    blueprint_title_2: "to Pure Joy.",
    blueprint_desc: "Distance can make celebrating feel clinical. We replace standard generic greeting text alerts with full-scale experiences complete with memories, interactive openers, and lifetime galleries.",
    btn_schedule_capsule: "Schedule Capsule",
    milestones_subtitle: "Milestones of Note",
    milestones_title: "We Honor Every Bridge Worth Crossing",
    tailored_subtitle: "Tailored Grandeur",
    tailored_title: "Select Your Surprise Package Structure",
    tailored_desc: "Choose the depth of experience you wish to deliver overseas. From simple card schedules to lifetime Premium capsule montages.",
    btn_select_tier: "Select Tier",
    testimonials_subtitle: "Real Eloquence",
    testimonials_title: "Stories of Distance Melted Away",
    footer_cta_title_1: "Ready to Plan",
    footer_cta_title_2: "Something Beautiful?",
    footer_cta_desc: "Bring comfort, classic elegance, and beautiful visual capsules right to their device workspace. Setup a celebration today.",
    nav_home: "Home",
    nav_bookings: "My Bookings",
    nav_new_booking: "New Booking",
    nav_packages: "Packages",
    nav_about_us: "About Us",
    nav_contact: "Contact",
    nav_login_signup: "Login / Sign Up",
    nav_logout: "Log Out",
    app_subtitle: "Event Capsules",
    footer_brand_desc: "\"Because Distance Should Never Dim the Celebration.\" Célèbre is a high-concept luxury surprise scheduling agency bridging families across the physical oceans.",
    footer_nav_title: "Workspace Navigation",
    footer_integrity_title: "Corporate Integrity",
    footer_ssl_badge: "SSL encrypted sandboxes",
    footer_delivery_badge: "Universal deliveries active",
    footer_news_title: "Surprise Chronicle Newsletter",
    footer_news_desc: "Subscribe to receive milestone guides and anniversary quotes compiled by Emilie Claire.",
    footer_link_home: "Célèbre Home",
    footer_link_brand: "Brand Story",
    footer_link_faq: "Support FAQs",
    footer_link_dash: "Planner Dashboard",
    btn_join: "Join",
    footer_copyright: "© 2026 Célèbre Inc. Designed and programmed beautifully with Inter & Cormorant Garamond.",
    footer_secure_link: "Secure Protocols",
    footer_terms: "Terms and Conditions"
  },
  te: {
    welcome_back: "తిరిగి స్వాగతం,",
    pavilion_workspace: "Célèbre ప్రైవేట్ పెవిలియన్ వర్క్‌స్పేస్",
    quote_1: "ఏ సరిహద్దులు, మైళ్ళు లేదా సమయ మండలాలు దాటినా — ఏ ఒక్కరిని ఎప్పటికీ మిస్ అవ్వకండి.",
    quote_2: "ఎందుకంటే దూరం ఎప్పుడూ ఒకరి మహోన్నత వేడుకల కాంతిని తగ్గించకూడదు.",
    quote_3: "భౌతిక బహుమతి కాలక్రమేణా కరిగిపోతుంది; కానీ ఒక డిజిటల్ మెమరీ క్యాప్సూల్ ఎప్పటికీ నిలిచి ఉంటుంది.",
    quote_author_1: "మైల్‌స్టోన్ ఫిలాసఫీ కలెక్టివ్",
    quote_author_2: "Célèbre ఆర్కెస్ట్రేషన్ క్రీడ్",
    quote_author_3: "లగ్జరీ క్యూరేషన్ ఇన్స్టిట్యూట్",
    bespoke_configurator: "అనుకూల కాన్ఫిగరేటర్ (Bespoke)",
    bespoke_title: "ఇంటరాక్టివ్ బెస్పోక్ ప్యాకేజీల ధరలు",
    bespoke_desc: "మీ మైలురాళ్లకు సరిపోయేలా డిజిటల్ ఫ్రేమ్‌లు మరియు చిత్రాల సంఖ్యను అనుకూలీకరించుకోండి. అద్భుతమైన అనుభవాన్ని సృష్టించడానికి అదనపు ఆప్షన్‌లను అమర్చుకోండి.",
    step_1: "దశ 1: మీ ప్రధాన మెమరీ ప్యాకేజీ టైర్‌ను ఎంచుకోండి",
    step_2: "దశ 2: ప్రీమియం యాడ్-ఆన్‌లు & క్యూరేషన్ లేయర్‌లు (₹500 నుండి ప్రారంభం)",
    step_2_desc: "అద్భుతమైన ఆర్ట్‌వర్క్ లేదా హృదయపూర్వకమైన పల్సింగ్ మూమెంట్స్‌ను జోడించడం ద్వారా రిసిపియంట్ స్క్రీన్‌ను అనుకూలీకరించండి.",
    addon_frames: "ప్రత్యేక ఫ్లోటింగ్ ఫ్రేమ్‌లు (+₹500 / $6)",
    addon_frames_desc: "అందమైన, చేతితో తయారు చేసిన డిజిటల్ బార్డర్‌లు మరియు లగ్జరీ షాడోలతో కార్డులను అలంకరిస్తుంది.",
    addon_blood: "నిజ-సమయ బ్లడ్-డాట్స్ సమకాలీకరణ (+₹500 / $6)",
    addon_blood_desc: "దూరాలను అధిగమించి సమకాలీకరించబడిన భావోద్వేగాలను ప్రతిబింబించే బ్లడ్-డాట్స్ మరియు హృదయ స్పందన ప్రభావాలను సృష్టిస్తుంది.",
    addon_sketches: "చేతితో గీసిన పెన్సిల్ స్కెచ్ ఆర్ట్‌వర్క్ (+₹500 / $6)",
    addon_sketches_desc: "మీ మెమరీ ఫొటోలపై పెన్సిల్-స్కెచ్ లేయర్‌లను సృష్టించేందుకు మా ఆర్ట్ ఇంజిన్‌ను సెటప్ చేస్తుంది.",
    addon_gallery: "మంచి చిత్రాలు & గ్యాలరీ స్కేల్ (Good Images)",
    addon_gallery_desc: "మెమరీ రూమ్ వాల్ట్‌లో లోడ్ చేయబడిన ఫోటోల పరిధిని పెంచుతుంది.",
    select_standard_illus: "సాధారణ ఇలస్ట్రేషన్ ప్లేస్‌హోల్డర్‌లు (చేర్చబడినవి)",
    select_premium_stock: "5 ప్రీమియం హై-క్వాలిటీ థీమ్ చిత్రాలు (+₹500 / $6)",
    select_deluxe_hi_res: "15 లగ్జరీ హై-రిజల్యూషన్‌తో కూడిన చిత్రాలు (+₹1500 / $18)",
    what_we_provide: "⚙️ ప్రతి క్యాప్సూల్ ఆర్కెస్ట్రేషన్‌లో మేము అందించేవి:",
    provide_1: "సర్వర్‌లో జెమిని AI సాయంతో లేఖల డ్రాఫ్టింగ్",
    provide_2: "రిసిపియంట్ స్థానిక సమయ మండలంతో గడియారం సమకాలీకరణ",
    provide_3: "అనుకూలమైన సంగీతం మరియు వాల్ట్ రాగాల ఎంపిక",
    provide_4: "పేజీ లోడ్ అయినప్పుడు కలర్‌ఫుల్ పేపర్ క్రాఫ్ట్ కాన్ఫెట్టి ఎఫెక్ట్స్",
    live_preview: "లైవ్ ఏస్తెటిక్ ప్లేగ్రౌండ్ ప్రివ్యూ",
    total: "మొత్తం",
    configured_price: "కాన్ఫిగర్ చేసిన ధర",
    book_now_cta: "కస్టమ్ కాన్ఫిగరేషన్‌తో ఇప్పుడే బుక్ చేసుకోండి ✨",
    redirect_msg: "సేవ్ చేసిన ఆప్షన్‌లతో డైరెక్ట్ ప్లానింగ్ ఫారమ్‌కు నావిగేట్ చేస్తుంది.",
    schedule_title: "బ్యాక్‌గ్రౌండ్‌లో క్యాప్సూల్ అప్‌డేట్‌లను షెడ్యూల్ చేయండి",
    schedule_subtitle: "సమయ అనుసంధానం (Chrono)",
    schedule_desc: "బుకింగ్ తర్వాత స్కెచ్‌లు లేదా కొత్త మ్యూజిక్ లేదా ఫ్రేమ్‌లను జోడించాలా? సరైన సమయంలో ఆటోమేటిక్‌గా అప్‌డేట్ అయ్యేలా క్రోన్ (cron) అప్‌డేట్‌లను షెడ్యూల్ చేయండి.",
    target_celebration: "టార్గెట్ చేయబడిన వేడుక",
    bespoke_action: "అప్‌డేట్ చేయవలసిన ఆప్షన్",
    action_option_sketches: "చేతితో గీసిన పోర్ట్రెయిట్ స్కెచ్‌లు జోడించండి (₹500)",
    action_option_blood: "బీటింగ్ బ్లడ్-డాట్స్ సమకాలీకరణ జోడించండి (₹500)",
    action_option_frames: "గ్లోబల్ ఫ్లోటింగ్ ఫ్రేమ్‌లను మార్చండి (₹500)",
    action_option_gallery: "హై-క్వాలిటీ చిత్రాలను అప్‌గ్రేడ్ చేయండి (₹1,500)",
    action_option_gemini: "జెమిని AI పదాల వ్యక్తీకరణను మార్చండి (ఉచితం)",
    execution_time: "షెడ్యూల్ చేయబడిన అప్‌డేట్ సమయం",
    add_cron_btn: "బ్యాక్‌గ్రౌండ్ అప్‌డేట్ క్రోన్‌ను కాన్ఫిగర్ చేయి",
    active_cron_triggers: "🗓️ ప్రస్తుతం యాక్టివ్‌గా ఉన్న బ్యాక్‌గ్రౌండ్ క్రోన్ ట్రిగ్గర్‌లు:",
    no_cron: "షెడ్యూల్ చేసిన అప్‌డేట్‌లు ఏవీ లేవు. పైన ఉన్న ఫారమ్‌ను ఉపయోగించి యాడ్ చేయండి.",
    arm_label: "క్రోన్ యాక్టివ్",
    cancel_update: "అప్‌డేట్ క్యాన్సిల్ చేయి",
    select_language: "భాష ఎంచుకోండి",
    english: "English (ఇంగ్లీష్)",
    telugu: "తెలుగు",
    hindi: "हिन्दी (హిందీ)",
    kannada: "ಕನ್ನಡ (కన్నడ)",
    tier_basic_title: "బేసిక్ టైర్",
    tier_basic_desc: "భౌతిక గ్రీటింగ్ కార్డ్, మినీ కేక్ మరియు స్టాండర్డ్ సర్ప్రైజ్ డెలివరీ",
    tier_standard_title: "స్టాండర్డ్ టైర్",
    tier_standard_desc: "ప్రీమియం థీమ్ కేక్, అందమైన అలంకరణలు మరియు లైవ్ మ్యూజిక్",
    tier_premium_title: "ప్రీమియం టైర్",
    tier_premium_desc: "డిజైనర్ మల్టీ-టైర్ కేక్, లగ్జరీ వెన్యూ డెకరేషన్ మరియు లైవ్ ఆర్ట్",
    base_charge_label: "ప్రాథమిక రుసుము",
    sketch_overlay_label: "చేతితో గీసిన కస్టమ్ పెన్సిల్ స్కెచ్ జతచేయబడింది",
    blood_dots_badge: "బ్లడ్ డాట్స్ లైవ్",
    card_preview_title: "30వ పుట్టినరోజు శుభాకాంక్షల క్యాప్సూల్!",
    card_preview_desc: "మేము ఈ జ్ఞాపకాన్ని భద్రపరిచాము. ఇందులో జెమిని AI సాయంతో వ్రాసిన లేఖలు మరియు మీ ఫొటోలు ఉన్నాయి.",
    tier_luxury_frames: "లగ్జరీ ఫ్రేమ్స్",
    tier_pulse_dots: "పల్స్ బ్లడ్ డాట్స్",
    tier_pencil_sketch: "పెన్సిల్ స్కెచ్",
    tier_good_imagery: "మంచి చిత్రాలు",
    hero_subtitle: "దూరాలను మైళ్ళతో కాదు, జ్ఞాపకాలతో కొలవండి",
    hero_title_1: "ప్రతి మైలు దాటి",
    hero_title_2: "ప్రేమను పంచుకోండి ఎప్పటికీ.",
    hero_desc: '"దూరం ఎప్పుడూ ఒకరి మహోన్నత వేడుకల కాంతిని తగ్గించకూడదు." మీ ప్రియమైనవారి ప్రత్యేక దినోత్సవాల కోసం ఇంటరాక్టివ్ లగ్జరీ డిజిటల్ మెమరీ క్యాప్సూల్‌లను తయారు చేయండి, షెడ్యూల్ చేయండి మరియు సున్నితంగా పంపండి.',
    btn_start_planning: "ఇప్పుడే ప్లాన్ చేయడం ప్రారంభించండి",
    btn_see_how_it_works: "ఇది ఎలా పనిచేస్తుందో చూడండి",
    pillars_subtitle: "మా ప్రధాన స్తంభాలు",
    pillars_title: "హృదయాలను బంధించేలా, నమ్మకంతో నిర్మించబడినది",
    pillar_1_title: "1. మైలురాయిని ప్లాన్ చేయండి",
    pillar_1_desc: "ముఖ్యమైన పరిచయాలను సెటప్ చేయడానికి మా సులభమైన విజార్డ్‌ని ఉపయోగించండి. వార్షికోత్సవం, పుట్టినరోజు, గ్రాడ్యుయేషన్ లేదా కస్టమ్ టోకెన్‌ను ఎంచుకోండి.",
    pillar_2_title: "2. ఇంటరాక్టిベーション",
    pillar_2_desc: "అందమైన బ్యాక్‌గ్రౌండ్ సంగీతాన్ని ఎంచుకోండి, ఫోటోలను అప్‌లోడ్ చేయండి, వీడియోలను సెట్ చేయండి మరియు ప్రేమపూర్వక సందేశాన్ని రాయడానికి మా AI ని ఉపయోగించండి.",
    pillar_3_title: "3. ఆశ్చర్యకరమైన డెలివరీ",
    pillar_3_desc: "Célèbre సమయ మండలాలను ఖచ్చితంగా గమనిస్తుంది. ఆ రోజు మేము SMS, ఈమెయిల్ మరియు వాట్సాప్ లింక్‌లను పంపుతాము. క్లిక్ చేసినప్పుడు స్క్రీన్‌పై రంగుల కాన్ఫెట్టి వర్షం కురుస్తుంది.",
    blueprint_subtitle: "డెలివరీ బ్లూప్రింట్",
    blueprint_title_1: "నిజమైన ఆనందానికి",
    blueprint_title_2: "ఒక అద్భుతమైన మార్గం.",
    blueprint_desc: "దూరాలు వేడుకలను నిస్తేజం చేయవచ్చు. మేము సాధారణ టెక్స్ట్ సందేశాల స్థానంలో జ్ఞాపకాలు మరియు ఇంటరాక్టివ్ గ్యాలరీలతో కూడిన అపూర్వమైన అనుభవాలను అందిస్తాము.",
    btn_schedule_capsule: "క్యాప్సూల్ షెడ్యూల్ చేయి",
    milestones_subtitle: "ప్రత్యేక మైలురాళ్లు",
    milestones_title: "ప్రతి బంధాన్ని మరియు మైలురాయిని గౌరవిస్తాము",
    tailored_subtitle: "అనుకూల ప్యాకేజీలు",
    tailored_title: "మీ ఆశ్చర్యకరమైన ప్యాకేజీని ఎంచుకోండి",
    tailored_desc: "మీరు అందించాలనుకునే అనుభవాల పరిధిని ఎంచుకోండి. సాధారణ ఈ-కార్డుల నుండి శాశ్వత మెమరీ క్యాప్సూల్స్ వరకు అందుబాటులో ఉంటాయి.",
    btn_select_tier: "టైర్ ఎంచుకోండి",
    testimonials_subtitle: "నిజమైన స్పందనలు",
    testimonials_title: "దూరాలను కరిగించిన నిజమైన కథలు",
    footer_cta_title_1: "ప్లాన్ చేయడానికి",
    footer_cta_title_2: "సిద్ధంగా ఉన్నారా?",
    footer_cta_desc: "అందమైన అనుభూతులు మరియు శాశ్వత డిజిటల్ మెమరీ క్యాప్సూల్‌లను మీ ప్రియమైనవారి చెంతకు చేర్చండి. కేవలం ₹499 నుండి ప్రారంభం.",
    nav_home: "హోమ్",
    nav_bookings: "నా బుకింగ్స్",
    nav_new_booking: "కొత్త బుకింగ్",
    nav_packages: "ప్యాకేజీలు",
    nav_about_us: "మా గురించి",
    nav_contact: "సంప్రదించండి",
    nav_login_signup: "లాగిన్ / రిజిస్ట్రేషన్",
    nav_logout: "లాగ్ అవుట్",
    app_subtitle: "ఈవెంట్ క్యాప్సూల్స్",
    footer_brand_desc: "\"ఎందుకంటే దూరం ఎప్పుడూ ఒకరి మహోన్నత వేడుకల కాంతిని తగ్గించకూడదు.\" Célèbre అనేది కుటుంబాలను అనుసంధానించే ఒక ఉన్నతమైన లగ్జరీ సర్ప్రైజ్ మేనేజ్‌మెంట్ ఏజెన్సీ.",
    footer_nav_title: "వర్క్‌స్పేస్ నావిగేషన్",
    footer_integrity_title: "సంస్థ యొక్క విశ్వసనీయత",
    footer_ssl_badge: "SSL సురక్షిత శాండ్‌బాక్స్",
    footer_delivery_badge: "గ్లోబల్ డెలివరీలు యాక్టివ్",
    footer_news_title: "సర్‌ప్రైజ్ క్రానికల్ వార్తాలేఖ",
    footer_news_desc: "ఎమిలీ క్లైర్ రూపొందించిన మైలురాయి మార్గదర్శకాలు మరియు వార్షికోత్సవ కోట్‌లను స్వీకరించడానికి సభ్యత్వాన్ని పొందండి.",
    footer_link_home: "హోమ్ పేజీ",
    footer_link_brand: "బ్రాండ్ స్టోరీ",
    footer_link_faq: "మద్దతు మరియు ప్రశ్నలు",
    footer_link_dash: "ప్లానర్ డాష్‌బోర్డ్",
    btn_join: "చేరండి",
    footer_copyright: "© 2026 Célèbre ఇంక్. ఇంటర్ & కోర్మోరెంట్ గారమండ్ టైపోగ్రఫీతో అందంగా రూపొందించబడింది.",
    footer_secure_link: "సురక్షిత ప్రోటోకాల్స్",
    footer_terms: "నిబంధనలు మరియు షరతులు"
  },
  hi: {
    welcome_back: "वापसी पर स्वागत है,",
    pavilion_workspace: "Célèbre प्राइवेट पवेलियन वर्कस्पेस",
    quote_1: "हर सीमा, मील और टाइमज़ोन के पार — किसी प्रियजन को कभी न खोएं।",
    quote_2: "क्योंकि दूरी को कभी भी उत्सव की शानदार रोशनी को कम नहीं करना चाहिए।",
    quote_3: "एक भौतिक उपहार पुराना हो सकता है; लेकिन एक डिजिटल मेमोरी कैप्सूल हमेशा बना रहता है।",
    quote_author_1: "माइलस्टोन फिलॉसफी कलेक्टिव",
    quote_author_2: "Célèbre ऑर्केस्ट्रेशन क्रीड",
    quote_author_3: "लक्ज़री क्यूरेशन इंस्टीट्यूट",
    bespoke_configurator: "बेस्पोक कॉन्फ़िगेटर",
    bespoke_title: "कस्टमाइजेबल बेस्पोक पैकेज और कीमतें",
    bespoke_desc: "अपने खास पलों के हिसाब से रंगीन फ़्रेम, डिज़ाइन और चित्रों की संख्या को कस्टमाइज़ करें। जादुई अनुभव के लिए एक्स्ट्रा फीचर्स जोड़ें।",
    step_1: "चरण 1: अपना मुख्य मेमोरी पैकेज टियर चुनें",
    step_2: "चरण 2: प्रीमियम ऐड-ऑन्स और कस्टमाइजेशन (₹500 से शुरू)",
    step_2_desc: "अपनी मेमोरी स्क्रीन में सुलेख कलाकृतियां, धड़कते दिल के भाव या हाई-डेफिनिशन तस्वीरें जोड़कर कस्टमाइज़ करें।",
    addon_frames: "बेस्पोक फ्लोटिंग फ्रेम्स (+₹500 / $6)",
    addon_frames_desc: "मुख्य कार्ड को सुंदर, हाथ से बने डिजिटल बॉर्डर और छाया प्रभावों से सुशोभित करता है।",
    addon_blood: "लाइव ब्लड-डॉट्स समन्वयन (+₹500 / $6)",
    addon_blood_desc: "दूरी के बावजूद भावनाओं को दर्शाने वाले लाइव लाल ब्लड-डॉट्स और बीटिंग हार्टबीट इफेक्ट्स तैयार करता है।",
    addon_sketches: "हाथ से तैयार की गई पेंसिल स्केच कलाकृति (+₹500 / $6)",
    addon_sketches_desc: "तस्वीरों पर सुंदर पेंसिल-स्केच लेयर्स जोड़ने के लिए हमारे आर्ट इंजन को कॉन्फ़िगर करता है।",
    addon_gallery: "बेहतरीन तस्वीरें और गैलरी स्केल",
    addon_gallery_desc: "मेमोरी रूम वॉल्ट में लोड की गई कुल फ़ोटो की सीमा को बढ़ाता है।",
    select_standard_illus: "मानक चित्रण प्लेसहोल्डर (शामिल)",
    select_premium_stock: "5 प्रीमियम थीम वाली तस्वीरें (+₹500 / $6)",
    select_deluxe_hi_res: "15 डीलक्स हाई-रिज़ॉल्यूशन तस्वीरें (+₹1500 / $18)",
    what_we_provide: "⚙️ हर कैप्सूल में हम क्या प्रदान करते हैं:",
    provide_1: "सर्वर पर जेमिनी एआई की मदद से सुंदर बधाई संदेश लेखन",
    provide_2: "प्राप्तकर्ता के स्थानीय टाइमज़ोन के साथ रीयल-टाइम घड़ी सिंक",
    provide_3: "क्लासिक संगीत और वाल्ट्ज़ धुनों का त्वरित चयन",
    provide_4: "पेज खुलने पर शानदार रिबन और रंगीन कंफ़ेद्दी की वेव",
    live_preview: "लाइव एस्थेटिक प्लेग्राउंड प्रीव्यू",
    total: "कुल",
    configured_price: "कॉन्फ़िगर की गई कीमत",
    book_now_cta: "कस्टमाइज़ेशन के साथ अभी बुक करें ✨",
    redirect_msg: "आपके द्वारा सेटिंग्स के साथ बुकिंग फॉर्म को तुरंत लोड करेगा और आगे बढ़ाएगा।",
    schedule_title: "बैकग्राउंड कैप्सूल अपडेट शेड्यूल करें",
    schedule_subtitle: "समय समन्वयन (Chrono-Coordination)",
    schedule_desc: "बुकिंग के बाद स्केच, फ़्रेम या बैकग्राउंड गाना बदलना चाहते हैं? ऑटोमैटिक क्रॉन अपडेट सेट करें ताकि बदलाव तय तिथि पर अपने आप लागू हो जाएं।",
    target_celebration: "लक्षित उत्सव",
    bespoke_action: "अपडेट प्रक्रिया",
    action_option_sketches: "पेंसिल स्केच कलाकृति जोड़ें (₹500)",
    action_option_blood: "धड़कते ब्लड-डॉट्स प्रभाव जोड़ें (₹500)",
    action_option_frames: "ग्लोबल फ्लोटिंग फ्रेम्स बदलें (₹500)",
    action_option_gallery: "हाई-क्यू थीम तस्वीरों को अपग्रेड करें (₹1,500)",
    action_option_gemini: "जेमिनी एआई संदेश लेखन को फिर से संतुलित करें (फ्री)",
    execution_time: "शेड्यूल किया गया अपडेट समय",
    add_cron_btn: "बैकग्राउंड अपडेट क्रॉन कॉन्फ़िगर करें",
    active_cron_triggers: "🗓️ सक्रिय बैकग्राउंड क्रॉन ट्रिगर्स:",
    no_cron: "कोई अपडेट शेड्यूल्ड नहीं है। जोड़ने के लिए ऊपर दिए गए फॉर्म का उपयोग करें।",
    arm_label: "क्रॉन सक्रिय है",
    cancel_update: "अपडेट रद्द करें",
    select_language: "भाषा चुनें",
    english: "English (अंग्रेज़ी)",
    telugu: "తెలుగు (तेलुगु)",
    hindi: "हिन्दी",
    kannada: "ಕನ್ನಡ (कन्नड़)",
    tier_basic_title: "मूल टियर (Basic)",
    tier_basic_desc: "भौतिक ग्रीटिंग कार्ड, मिनी केक और मानक सरप्राइज डिलीवरी",
    tier_standard_title: "मानक टियर (Standard)",
    tier_standard_desc: "प्रीमियम थीम केक, खूबसूरत सजावट और लाइव संगीत",
    tier_premium_title: "प्रीमियम टियर (Premium)",
    tier_premium_desc: "डिज़ाइनर मल्टी-टियर केक, लक्ज़री वेन्यू डेकोरेशन और लाइव आर्ट परफॉर्मेंस",
    base_charge_label: "मूल शुल्क",
    sketch_overlay_label: "हाथ से बनी सुंदर पेंसिल स्केच कलाकृति संलग्न है",
    blood_dots_badge: "लाइव ब्लड डॉट्स",
    card_preview_title: "30वें जन्मदिन की ढेर सारी शुभकामनाएं कैप्सूल!",
    card_preview_desc: "हमने इस अमूल्य स्मृति को सुरक्षित किया है। इसमें जेमिनी एआई की मदद से लिखे पत्र और आपकी तस्वीरें हैं।",
    tier_luxury_frames: "लक्ज़री फ्रेम्स",
    tier_pulse_dots: "पल्स ब्लड डॉट्स",
    tier_pencil_sketch: "पेंसिल स्केच",
    tier_good_imagery: "बेहतरीन तस्वीरें",
    hero_subtitle: "मीलों दूर रहकर भी अनूठा उत्सव मनाने की कला",
    hero_title_1: "दूरी के हर पार",
    hero_title_2: "प्यार को महसूस कराएं हर पल।",
    hero_desc: '"क्योंकि दूरी को कभी भी उत्सव की शानदार रोशनी को कम नहीं करना चाहिए।" कस्टमाइज करें, शेड्यूल करें, और अपने प्रियजनों को उनके खास दिन पर शानदार डिजिटल मेमोरी कैप्सूल भेजें।',
    btn_start_planning: "अभी योजना बनाना शुरू करें",
    btn_see_how_it_works: "देखें यह कैसे काम करता है",
    pillars_subtitle: "हमारे मुख्य स्तंभ",
    pillars_title: "दिल को छूने वाले, पूरी तरह विश्वसनीय",
    pillar_1_title: "1. उत्सव की योजना बनाएं",
    pillar_1_desc: "मुख्य संपर्कों को जोड़ने के लिए हमारे सरल विज़ार्ड का उपयोग करें। वर्षगांठ, जन्मदिन, स्नातक, या एक कस्टमाइज्ड अवसर चुनें।",
    pillar_2_title: "2. इंटरएक्टिव कस्टमाइजेशन",
    pillar_2_desc: "सुंदर संगीत चुनें, यादगार तस्वीरें अपलोड करें, और व्यक्तिगत संदेश लिखने के लिए हमारे जेमिनी एआई का उपयोग करें।",
    pillar_3_title: "3. सरप्राइज डिलीवरी",
    pillar_3_desc: "Célèbre समय क्षेत्र को ठीक से समझता है। विशेष दिन पर हम SMS, ईमेल और व्हाट्सएप लिंक भेजते हैं। क्लिक करते ही स्क्रीन पर मनमोहक लाइव कंफ़ेद्दी बरसती है।",
    blueprint_subtitle: "उत्सव का पूरा रोडमैप",
    blueprint_title_1: "सच्ची खुशियों की तरफ",
    blueprint_title_2: "एक सुनियोजित मार्ग।",
    blueprint_desc: "दूरी उत्सवों को सामान्य बना सकती है। हम साधारण बधाई संदेशों के स्थान पर यादों, गीतों और वीडियो गैलरियों के साथ बेजोड़ डिजिटल अनुभव प्रदान करते हैं।",
    btn_schedule_capsule: "कैप्सूल शेड्यूल करें",
    milestones_subtitle: "अविस्मरणीय यादें",
    milestones_title: "हम हर महत्वपूर्ण रिश्ते और अवसर का सम्मान करते हैं",
    tailored_subtitle: "निजीकृत पैकेज",
    tailored_title: "अपना सरप्राइज पैकेज चुनें",
    tailored_desc: "अनुभवों की गहराई के अनुसार पैक चुनें। बुनियादी डिजिटल कार्ड से लेकर आजीवन प्रीमियम मेमोरी रूम कैप्सूल तक सब कुछ शामिल है।",
    btn_select_tier: "टियर चुनें",
    testimonials_subtitle: "सच्चे अनुभव",
    testimonials_title: "दूरी को मिटाने वाली सच्ची कहानियां",
    footer_cta_title_1: "एक सुंदर यादगार पल",
    footer_cta_title_2: "बनाने के लिए तैयार हैं?",
    footer_cta_desc: "सुंदर और क्लासिक डिजिटल मेमोरी कैप्सूल को सीधे उनके करीब भेजें। केवल ₹499 से शुरुआत.",
    nav_home: "मुख्य पृष्ठ",
    nav_bookings: "मेरी बुकिंग",
    nav_new_booking: "नई बुकिंग",
    nav_packages: "पैकेज",
    nav_about_us: "हमारे बारे में",
    nav_contact: "संपर्क करें",
    nav_login_signup: "लॉगिन / साइन अप",
    nav_logout: "लॉग आउट",
    app_subtitle: "इवेंट कैप्सूल्स",
    footer_brand_desc: "\"क्योंकि दूरी को कभी भी उत्सव की शानदार रोशनी को कम नहीं करना चाहिए।\" Célèbre परिवारों को मिलाने वाली एक उच्च-स्तरीय लक्ज़री सरप्राइज शेड्यूलिंग एजेंसी है।",
    footer_nav_title: "नेविगेशन हेल्प",
    footer_integrity_title: "कॉर्पोरेट सत्यनिष्ठा",
    footer_ssl_badge: "SSL एन्क्रिप्टेड सैंडबॉक्स",
    footer_delivery_badge: "सार्वभौमिक डिलीवरी सक्रिय",
    footer_news_title: "सरप्राइज क्रॉनिकल न्यूज़लेटर",
    footer_news_desc: "एमिली क्लेयर द्वारा संकलित माइलस्टोन गाइड और वर्षगांठ कोट्स प्राप्त करने के लिए सदस्यता लें।",
    footer_link_home: "मुख्य पृष्ठ",
    footer_link_brand: "ब्रांड स्टोरी",
    footer_link_faq: "अक्सर पूछे जाने वाले प्रश्न",
    footer_link_dash: "योजनाकार डैशबोर्ड",
    btn_join: "शामिल हों",
    footer_copyright: "© 2026 Célèbre इंक। इंटर और कॉर्मोरेंट गरमोंड के साथ खूबसूरती से डिजाइन किया गया।",
    footer_secure_link: "सुरक्षित प्रोटोकॉल",
    footer_terms: "नियम और शर्तें"
  },
  kn: {
    welcome_back: "ಮರಳಿ ಸುಸ್ವಾಗತ,",
    pavilion_workspace: "Célèbre ಪ್ರೈವೇಟ್ ಪೆವಿಲಿಯನ್ ವರ್ಕ್‌ಸ್ಪೇಸ್",
    quote_1: "ಪ್ರತಿ ಗಡಿಗಳು, ಮೈಲಿಗಳು ಮತ್ತು ಟೈಮ್‌ಝೋನ್‌ಗಳ ಆಚೆಗೂ — ಪ್ರೀತಿಪಾತ್ರರನ್ನು ಎಂದಿಗೂ ಮರೆಯಬೇಡಿ.",
    quote_2: "ಏಕೆಂದರೆ ದೂರವು ಎಂದಿಗೂ ಮಹೋನ್ನತ ಆಚರಣೆಯ ಬೆಳಕನ್ನು ಮಂದಗೊಳಿಸಬಾರದು.",
    quote_3: "ಭೌತಿಕ ಉಡುಗೊರೆಗಳು ಹಳೆಯದಾಗಬಹುದು; ಆದರೆ ಡಿಜಿಟಲ್ ಮೆಮರಿ ಕ್ಯಾಪ್ಸೂಲ್ ಶಾಶ್ವತವಾಗಿ ಉಳಿಯುತ್ತದೆ.",
    quote_author_1: "ಮೈಲ್‌ಸ್ಟೋನ್ ಫಿಲಾಸಫಿ ಕಲೆಕ್ಟಿವ್",
    quote_author_2: "Célèbre ಆರ್ಕೆಸ್ಟ್ರೆಷನ್ ಕ್ರೀಡ್",
    quote_author_3: "ಲಕ್ಶುರಿ ಕ್ಯೂರೇಶನ್ ಇನ್‌ಸ್ಟಿಟ್ಯೂಟ್",
    bespoke_configurator: "ಬೆಸ್ಪೋಕ್ ಕಾನ್ಫಿಗರೇಟರ್",
    bespoke_title: "ಬೆಸ್ಪೋಕ್ ಇಂಟರಾಕ್ಟಿವ್ ಪ್ಯಾಕೇಜ್ ಬೆಲೆಗಳು",
    bespoke_desc: "ನಿಮ್ಮ ಮೈಲುಗಲ್ಲುಗಳಿಗೆ ತಕ್ಕಂತೆ ಡಿಜಿಟಲ್ ಫ್ರೇಮ್‌ಗಳು ಮತ್ತು ಫೋಟೋಗಳ ಸಂಖ್ಯೆಯನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ. ಅದ್ಭುತ ಅನುಭವಕ್ಕಾಗಿ ಪ್ರೀಮಿಯಂ ಆಡ್-ಆನ್‌ಗಳನ್ನು ಜೋಡಿಸಿ.",
    step_1: "ಹಂತ 1: ನಿಮ್ಮ ಕೋರ್ ಮೆಮರಿ ಪ್ಯಾಕೇಜ್ ಆಯ್ಕೆಮಾಡಿ",
    step_2: "ಹಂತ 2: ಪ್ರೀಮಿಯಂ ಆಡ್-ಆನ್‌ಗಳು ಮತ್ತು ಕ್ಯೂರೇಶನ್ ಲೇಯರ್‌ಗಳು (₹500 ರಿಂದ ಪ್ರಾರಂಭ)",
    step_2_desc: "ಕಲಾಕೃತಿಗಳು, ಧಡಕಿಸುವ ಹೃದಯದ ಅತ್ಯಾಕರ್ಷಕ ಬಣ್ಣಗಳು ಅಥವಾ ಹೈ-ಡೆಫಿನಿಷನ್ ಫೋಟೋಗಳನ್ನು ಅಳವಡಿಸಿ ಪ್ರೆಸೆಂಟೇಶನ್ ಸುಂದರಗೊಳಿಸಿ.",
    addon_frames: "ಬೆಸ್ಪೋಕ್ ಫ್ಲೋಟಿಂಗ್ ಫ್ರೇಮ್‌ಗಳು (+₹500 / $6)",
    addon_frames_desc: "ನಿಮ್ಮ ಮೆಮರಿ ಕಾರ್ಡ್‌ಗಳಿಗೆ ಸುಂದರವಾದ ಕೈಯಿಂದ ರಚಿಸಿದ ಡಿಜಿಟಲ್ ಬಾರ್ಡರ್‌ಗಳು ಮತ್ತು ನೆರಳಿನ ವಿಹಂಗಮ ನೋಟ ನೀಡುತ್ತದೆ.",
    addon_blood: "ಲೈವ್ ಬ್ಲಡ್-ಡಾಟ್ಸ್ ಸಿಂಕ್ (+₹500 / $6)",
    addon_blood_desc: "ದೂರದ ಹೊರತಾಗಿಯೂ ಭಾವನೆಗಳನ್ನು ವ್ಯಕ್ತಪಡಿಸಲು ಧಡಕಿಸುವ ಕೆಂಪು ಬ್ಲಡ್-ಡಾಟ್‌ಗಳು ಮತ್ತು ಹೃದಯಬಡಿತದ ಎಫೆಕ್ಟ್ ನೀಡುತ್ತದೆ.",
    addon_sketches: "ಕೈಯಿಂದ ಬರೆದ ಪೆನ್ಸಿಲ್ ಸ್ಕೆಚ್ ಕಲಾಕೃತಿ (+₹500 / $6)",
    addon_sketches_desc: "ನಿಮ್ಮ ಫೋಟೋಗಳ ಮೇಲೆ ಅದ್ಭುತ ಪೆನ್ಸಿಲ್-ಸ್ಕೆಚ್ ಲೇಯರ್ ರಚಿಸಲು ನಮ್ಮ ಸ್ವಯಂಚಾಲಿತ ಆರ್ಟ್ ಎಂಜಿನ್ ಸಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ.",
    addon_gallery: "ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಫೋಟೋಗಳು ಮತ್ತು ಗ್ಯಾಲರಿ ಸ್ಕೇಲ್",
    addon_gallery_desc: "ಮೆಮರಿ ರೂಮ್ ವಾಲ್ಟ್‌ನಲ್ಲಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗುವ ಫೋಟೋಗಳ ಸಂಖ್ಯೆಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.",
    select_standard_illus: "ಸಾಮಾನ್ಯ ವಿವರಣೆ ಪ್ಲೇಸ್‌ಹೋಲ್ಡರ್‌ಗಳು (ಒಳಗೊಂಡಿದೆ)",
    select_premium_stock: "5 ಪ್ರೀಮಿಯಂ ಹೈ-ಕ್ವಾಲಿಟಿ ಥೀಮ್ ಫೋಟೋಗಳು (+₹500 / $6)",
    select_deluxe_hi_res: "15 ಲಕ್ಶುರಿ ಹೈ-ರೆಸಲ್ಯೂಷನ್ ಫೋಟೋಗಳು (+₹1500 / $18)",
    what_we_provide: "⚙️ ಪ್ರತಿ ಕ್ಯಾಪ್ಸೂಲ್‌ನಲ್ಲಿ ನಾವು ಒದಗಿಸುವ ಸೌಲಭ್ಯಗಳು:",
    provide_1: "ಸರ್ವರ್‌ನಲ್ಲಿ ಜೆಮಿನಿ AI ಸಹಾಯದಿಂದ ಶುಭಾಶಯ ಪತ್ರಗಳ ರಚನೆ",
    provide_2: "ಸ್ವೀಕರಿಸುವವರ ಸ್ಥಳೀಯ ಟೈಮ್‌ಝೋನ್‌ನೊಂದಿಗೆ ಗಡಿಯಾರ ಸಿಂಕ್",
    provide_3: "ಅತ್ತ್ಯುತ್ತಮ ಆಯ್ದ ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತ ಮತ್ತು ವಾಲ್ಟ್ಜ್ ರಾಗಗಳು",
    provide_4: "ಪುಟ ತೆರೆದಾಗ ವರ್ಣರಂಜಿತ ಪೇಪರ್ ಕ್ರಾಫ್ಟ್ ಕನ್ಫೆಟ್ಟಿ ಎಫೆಕ್ಟ್ ಸಕ್ರಿಯ",
    live_preview: "ಲೈವ್ ಎಸ್ಥೆಟಿಕ್ ಪ್ಲೇಗ್ರೌಂಡ್ ಪ್ರಿವ್ಯೂ",
    total: "ಒಟ್ಟು",
    configured_price: "ಕಾನ್ಫಿಗರ್ ಮಾಡಿದ ಬೆಲೆ",
    book_now_cta: "ಅನುಕೂಲಕರ ಕಾನ್ಫಿಗರೇಶನ್‌ನೊಂದಿಗೆ ಈಗಲೇ ಬುಕ್ ಮಾಡಿ ✨",
    redirect_msg: "ಸಂಪೂರ್ಣ ಮಾಹಿತಿಯೊಂದಿಗೆ ನಿಮ್ಮನ್ನು ಬುಕಿಂಗ್ ಪ್ರಕ್ರಿಯೆಗೆ ಕೊಂಡೊಯ್ಯುತ್ತದೆ.",
    schedule_title: "ಬ್ಯಾಕ್‌ಗ್ರೌಂಡ್ ಕ್ಯಾಪ್ಸೂಲ್ ಅಪ್‌ಡೇಟ್ ವೇಳಾಪಟ್ಟಿ",
    schedule_subtitle: "ಸಮಯ ಸಂಯೋಜನೆ (Chrono)",
    schedule_desc: "ಬುಕಿಂಗ್ ಮಾಡಿದ ನಂತರ ಸ್ಕೆಚ್‌ಗಳು, ಫ್ರೇಮ್‌ಗಳು ಅಥವಾ ಹಿನ್ನೆಲೆ ಗೀತೆಯನ್ನು ಬದಲಾಯಿಸಬೇಕೇ? ಆಟೋಮ್ಯಾಟಿಕ್ ಕ್ರೋನ್ ಅಪ್‌ಡೇಟ್ ನಿಗದಿಪಡಿಸಿ.",
    target_celebration: "ಟಾರ್ಗೆಟ್ ಆಚರಣೆ",
    bespoke_action: "ಅಪ್‌ಡೇಟ್ ಕ್ರಿಯೆ",
    action_option_sketches: "ಪೆನ್ಸಿಲ್ ಸ್ಕೆಚ್ ಆರ್ಟ್‌ವರ್ಕ್ ಸೇರಿಸಿ (₹500)",
    action_option_blood: "ಬೀಟಿಂಗ್ ಬ್ಲಡ್-ಡಾಟ್ಸ್ ಸಿಂಕ್ ಅಳವಡಿಸಿ (₹500)",
    action_option_frames: "ಗ್ಲೋಬಲ್ ಫ್ಲೋಟಿಂಗ್ ಫ್ರೇಮ್ಸ್ ಬದಲಾಯಿಸಿ (₹500)",
    action_option_gallery: "ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಫೋಟೋಗಳನ್ನು ಅಪ್‌ಗ್ರೇಡ್ ಮಾಡಿ (₹1,500)",
    action_option_gemini: "ಜೆಮಿನಿ AI ಮೂಲಕ ಪದಗಳ ಸಮತೋಲನ ಪುನರ್-ಲೆಕ್ಕಾಚಾರ (ಉಚಿತ)",
    execution_time: "ನಿಗದಿಪಡಿಸಿದ ಅಪ್‌ಡೇಟ್ ಸಮಯ",
    add_cron_btn: "ಬ್ಯಾಕ್‌ಗ್ರೌಂಡ್ ಅಪ್‌ಡೇಟ್ ಕ್ರೋನ್ ನಿಗದಿಪಡಿಸಿ",
    active_cron_triggers: "🗓️ ಪ್ರಸ್ತುತ ಸಕ್ರಿಯವಾಗಿರುವ ಬ್ಯಾಕ್‌ಗ್ರೌಂಡ್ ಕ್ರೋನ್ ಅಪ್‌ಡೇಟ್‌ಗಳು:",
    no_cron: "ಯಾವುದೇ ಅಪ್‌ಡೇಟ್‌ಗಳು ನಿಗದಿಯಾಗಿಲ್ಲ. ಸೇರಿಸಲು ಮೇಲಿನ ಫಾರ್ಮ್ ಬಳಸಿ.",
    arm_label: "ಕ್ರೋನ್ ಸಕ್ರಿಯವಾಗಿದೆ",
    cancel_update: "ಅಪ್‌ಡೇಟ್ ರದ್ದುಗೊಳಿಸಿ",
    select_language: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",
    english: "English (ಇಂಗ್ಲಿಷ್)",
    telugu: "తెలుగు (ತೆಲುಗು)",
    hindi: "हिन्दी (ಹಿಂದಿ)",
    kannada: "ಕನ್ನಡ",
    tier_basic_title: "ಬೇಸಿಕ್ ಟೈರ್ (Basic)",
    tier_basic_desc: "ಭೌತಿಕ ಶುಭಾಶಯ ಪತ್ರ, ಮಿನಿ ಕೇಕ್ ಮತ್ತು ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಸರ್ಪ್ರೈಸ್ ವಿತರಣೆ",
    tier_standard_title: "ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಟೈರ್ (Standard)",
    tier_standard_desc: "ಪ್ರೀಮಿಯಂ ಥೀಮ್ ಕೇಕ್, ಸುಂದರವಾದ ಅಲಂಕಾರಗಳು ಮತ್ತು ಲೈವ್ ಸಂಗೀತ",
    tier_premium_title: "ಪ್ರೀಮಿಯಂ ಟೈರ್ (Premium)",
    tier_premium_desc: "ಡಿಸೈನರ್ ಬಹು-ಹಂತದ ಕೇಕ್, ಐಷಾರಾಮಿ ಸ್ಥಳದ ಅಲಂಕಾರ ಮತ್ತು ಲೈವ್ ಆರ್ಟ್ ಪ್ರದರ್ಶನಗಳು",
    base_charge_label: "ಮೂಲ ಶುಲ್ಕ",
    sketch_overlay_label: "ಕೈಯಿಂದ ಬರೆದ ಕಸ್ಟಮ್ ಪೆನ್ಸಿಲ್ ಸ್ಕೆಚ್ ಆರ್ಟ್‌ವರ್ಕ್ ಲಿಂಕ್ ಮಾಡಲಾಗಿದೆ",
    blood_dots_badge: "ಲೈವ್ ಬ್ಲಡ್ ಡಾಟ್ಸ್",
    card_preview_title: "30 ನೇ ಜನ್ಮದಿನದ ಶುಭಾಶಯಗಳ ಕ್ಯಾಪ್ಸೂಲ್!",
    card_preview_desc: "ನಾವು ಈ ನೆನಪನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸಿದ್ದೇವೆ. ಇದರಲ್ಲಿ ಜೆಮಿನಿ AI ಸಹಾಯದಿಂದ ಬರೆಯಲಾದ ಪತ್ರಗಳು ಮತ್ತು ನಿಮ್ಮ ಫೋಟೋಗಳಿವೆ.",
    tier_luxury_frames: "ಲಕ್ಶುರಿ ಫ್ರೇಮ್ಸ್‌",
    tier_pulse_dots: "ಪಲ್ಸ್ ಬ್ಲಡ್ ಡಾಟ್ಸ್",
    tier_pencil_sketch: "ಪೆನ್ಸಿಲ್ ಸ್ಕೆಚ್",
    tier_good_imagery: "ಗುಣಮಟ್ಟದ ಚಿತ್ರಗಳು",
    hero_subtitle: "ದೂರದ ಆಚರಣೆಯನ್ನು ಅತ್ಯಾಕರ್ಷಕಗೊಳಿಸುವ ಕಲೆ",
    hero_title_1: "ಪ್ರತಿಯೊಂದು ಮೈಲಿಗಳಾಚೆಯೂ",
    hero_title_2: "ಪ್ರೀತಿಯನ್ನು ಹಂಚಿ ಯಶಸ್ವಿಯಾಗಿ.",
    hero_desc: '"ಏಕೆಂದರೆ ದೂರವು ಎಂದಿಗೂ ಮಹೋನ್ನತ ಆಚರಣೆಯ ಬೆಳಕನ್ನು ಮಂದಗೊಳಿಸಬಾರದು." ನಿಮ್ಮ ಪ್ರೀತಿಪಾತ್ರರ ಸುಂದರ ದಿನಗಳಿಗಾಗಿ ಇಂಟರಾಕ್ಟಿವ್ ಲಕ್ಶುರಿ ಡಿಜಿಟಲ್ ಮೆಮರಿ ಕ್ಯಾಪ್ಸೂಲ್‌ಗಳನ್ನು ರಚಿಸಿ, ವೇಳಾಪಟ್ಟಿ ನಿಗದಿಪಡಿಸಿ ಮತ್ತು ಸುಲಭವಾಗಿ ತಲುಪಿಸಿ.',
    btn_start_planning: "ಈಗಲೇ ಪ್ಲಾನ್ ಮಾಡಲು ಪ್ರಾರಂಭಿಸಿ",
    btn_see_how_it_works: "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ ಎಂದು ನೋಡಿ",
    pillars_subtitle: "ನಮ್ಮ ಪ್ರಮುಖ ಆಧಾರಸ್ತಂಭಗಳು",
    pillars_title: "ಭಾವನಾತ್ಮಕ ಸಂಬಂಧಗಳ ಬಂಧ ಬೆಸೆಯಲು ಅತ್ಯಂತ ನಂಬಿಕಸ್ಥ ಜಾಲ",
    pillar_1_title: "1. ಮೈಲಿಗಲ್ಲುಗಳನ್ನು ಪ್ಲಾನ್ ಮಾಡಿ",
    pillar_1_desc: "ಪ್ರಮುಖ ಸಂಪರ್ಕಗಳನ್ನು ಹೊಂದಿಸಲು ನಮ್ಮ ಸುಲಭವಾದ ಗೈಡ್ ಬಳಸಿ. ವಾರ್ಷಿಕೋತ್ಸವ, ಜನ್ಮದಿನ, ಪದವಿ ಅಥವಾ ನಿಮ್ಮ ಆಯ್ಕೆಯ ವಿಶೇಷ ದಿನ ಆಯ್ಕೆಮಾಡಿ.",
    pillar_2_title: "2. ಇಂಟರಾಕ್ಟಿವ್ ಡಿಜಿಟಲ್ ಕ್ಯೂರೇಶನ್",
    pillar_2_desc: "ಹಿನ್ನೆಲೆಯಲ್ಲಿ ಕೇಳಿಸುವ ಸಂಗೀತವನ್ನು ಗುಣಪಡಿಸಿ, ಫೋಟೋಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ, ವಿಡಿಯೋಗಳನ್ನು ಸೆಟ್ ಮಾಡಿ ಮತ್ತು ಮಾಂತ್ರಿಕ ಸಂದೇಶ ಬರೆಯಲು ನಮ್ಮ AI ಬಳಸಿ.",
    pillar_3_title: "3. ಆಶ್ಚರ್ಯಕರ ವಿತರಣೆ",
    pillar_3_desc: "Célèbre ನಿಖರವಾಗಿ ಟೈಮ್‌ಝೋನ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತದೆ. ಆ ವಿಶೇಷ ದಿನದಂದು ನಾವು SMS, ಇಮೇಲ್ ಮತ್ತು ವಾಟ್ಸಾಪ್ ಲಿಂಕ್ ಕಳುಹಿಸುತ್ತೇವೆ. ಅದು ತೆರೆದಾಗ ಪರದೆಯ ಮೇಲೆ ಕನ್ಫೆಟ್ಟಿ ಸಿಡಿಯುತ್ತದೆ.",
    blueprint_subtitle: "ವಿತರಣೆಯ ನೀಲನಕ್ಷೆ (Blueprint)",
    blueprint_title_1: "ನಿಜವಾದ ಆನಂದಕ್ಕಾಗಿ",
    blueprint_title_2: "ಒಂದು ಸುವ್ಯವಸ್ಥಿತ ಮಾರ್ಗ.",
    blueprint_desc: "ದೂರವು ಆಚರಣೆಗಳನ್ನು ಸಾಮಾನ್ಯ ಟೆಕ್ಸ್ಟ್ ಸಂದೇಶಗಳಾಗಿ ಪರಿವರ್ತಿಸಬಹುದು. ನಾವು ಅವುಗಳ ಜಾಗದಲ್ಲಿ ನೆನಪುಗಳು, ಹಾಡುಗಳು ಮತ್ತು ಗ್ಯಾಲರಿಗಳೊಂದಿಗೆ ಅದ್ಭುತ ಡಿಜಿಟಲ್ ಅನುಭವ ನೀಡುತ್ತೇವೆ.",
    btn_schedule_capsule: "ಕ್ಯಾಪ್ಸೂಲ್ ನಿಗದಿಪಡಿಸಿ",
    milestones_subtitle: "ಅವಿಸ್ಮರಣೀಯ ನೆನಪುಗಳು",
    milestones_title: "ನಾವು ಪ್ರತಿ ಸುಂದರ ಸಂಬಂಧಕ್ಕೆ ಗೌರವ ಸಲ್ಲಿಸುತ್ತೇವೆ",
    tailored_subtitle: "ವಿಶೇಷ ಪ್ಯಾಕೇಜ್‌ಗಳು",
    tailored_title: "ನಿಮ್ಮ ಆಶ್ಚರ್ಯಕರ ಪ್ಯಾಕೇಜ್ ಆಯ್ಕೆಮಾಡಿ",
    tailored_desc: "ನೀವು ನೀಡಲು ಬಯಸುವ ಅನುಭವದ ಆಧಾರದ ಮೇಲೆ ಪ್ಯಾಕೇಜ್ ಆರಿಸಿ. ಸಾಮಾನ್ಯ ಇ-ಕಾರ್ಡ್‌ನಿಂದ ಹಿಡಿದು ಶಾಶ್ವತ ಪ್ರೀಮಿಯಂ ಮೆಮರಿ ರೂಮ್ ಕ್ಯಾಪ್ಸೂಲ್‌ಗಳವರೆಗೆ ಲಭ್ಯವಿದೆ.",
    btn_select_tier: "ಟೈರ್ ಆಯ್ಕೆಮಾಡಿ",
    testimonials_subtitle: "ನಿಜವಾದ ಅನುಭವಗಳ ನುಡಿ",
    testimonials_title: "ದೂರವನ್ನು ಹತ್ತಿರವಾಗಿಸಿದ ನೈಜ ಮಧುರ ಕಥೆಗಳು",
    footer_cta_title_1: "ಒಂದು ಸುಂದರ ಆಚರಣೆಯನ್ನು",
    footer_cta_title_2: "ಪ್ಲಾನ್ ಮಾಡಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
    footer_cta_desc: "ಆರಾಮದಾಯಕ, ಕ್ಲಾಸಿಕ್ ಮತ್ತು ಅತ್ಯಂತ ಸುಂದರ ಡಿಜಿಟಲ್ ಮೆಮರಿ ಕ್ಯಾಪ್ಸೂಲ್ ಅನ್ನು ಅವರ ಸಾಧನಕ್ಕೆ ಕಳುಹಿಸಿ. ಕೇವಲ ₹499 ರಿಂದ ಪ್ರಾರಂಭ.",
    nav_home: "ಮುಖಪುಟ",
    nav_bookings: "ನನ್ನ ಬುಕಿಂಗ್ಸ್",
    nav_new_booking: "ಹೊಸ ಬುಕಿಂಗ್",
    nav_packages: "ಪ್ಯಾಕೇಜ್‌ಗಳು",
    nav_about_us: "ನಮ್ಮ ಬಗ್ಗೆ",
    nav_contact: "ಸಂಪರ್ಕಿಸಿ",
    nav_login_signup: "ಲಾಗಿನ್ / ಸೈನ್ ಅಪ್",
    nav_logout: "ಲಾಗ್ ಔಟ್",
    app_subtitle: "ಮೆಮೊರಿ ಕ್ಯಾಪ್ಸೂಲ್ಸ್",
    footer_brand_desc: "\"ಏಕೆಂದರೆ ದೂರವು ಎಂದಿಗೂ ಮಹೋನ್ನತ ಆಚರಣೆಯ ಬೆಳಕನ್ನು ಮಂದಗೊಳಿಸಬಾರದು.\" Célèbre ಎಂಬುದು ಪ್ರಪಂಚದಾದ್ಯಂತ ಕುಟುಂಬಗಳನ್ನು ಬೆಸೆಯುವ ಅತ್ಯಾಧುನಿಕ ಐಷಾರಾಮಿ ಸರ್ಪ್ರೈಸ್ ಸಂಸ್ಥೆ.",
    footer_nav_title: "ಸಂಚಾರ ಸಹಾಯ",
    footer_integrity_title: "ಸಂಸ್ಥೆಯ ವಿಶ್ವಾಸಾರ್ಹತೆ",
    footer_ssl_badge: "SSL ಎನ್‌ಕ್ರಿಪ್ಟೆಡ್ ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್",
    footer_delivery_badge: "ವಿಶ್ವವ್ಯಾಪಿ ವಿತರಣೆ ಸಕ್ರಿಯ",
    footer_news_title: "ಸರ್ಪ್ರೈಸ್ ಕ್ರಾನಿಕಲ್ ಸುದ್ದಿಪತ್ರ",
    footer_news_desc: "ಎಮಿಲಿ ಕ್ಲೇರ್ ಸಿದ್ಧಪಡಿಸಿದ ಮೈಲಿಗಲ್ಲು ಮಾರ್ಗದರ್ಶಿಗಳು ಮತ್ತು ವಾರ್ಷಿಕೋತ್ಸವದ ಶುಭಾಶಯಗಳನ್ನು ಸ್ವೀಕರಿಸಲು ಚಂದಾದಾರರಾಗಿ.",
    footer_link_home: "ಕೋರ್ ಮುಖಪುಟ",
    footer_link_brand: "ಬ್ರಾಂಡ್ ಕಥೆ",
    footer_link_faq: "ಪ್ರಶ್ನೋತ್ತರ ವಿಭಾಗ",
    footer_link_dash: "ಯೋಜನಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    btn_join: "ಸೇರಿರಿ",
    footer_copyright: "© 2026 Célèbre ಇಂಕ್. ಇಂಟರ್ ಮತ್ತು ಕಾರ್ಮೋರಂಟ್‌ ಗರಾಮಾಂಡ್‌ನೊಂದಿಗೆ ಸುಂದರವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
    footer_secure_link: "secure ನಿಯಮಾವಳಿಗಳು",
    footer_terms: "ನಿಯಮ ಮತ್ತು ನಿಬಂಧನೆಗಳು"
  }
};
