/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, MessageSquare, Sparkles, Clock, Check } from 'lucide-react';
import { LanguageCode } from '../translations';

interface ContactPageProps {
  language: LanguageCode;
}

const CONTACT_TRANSLATIONS: Record<LanguageCode, {
  support_subtitle: string;
  support_title_1: string;
  support_title_s: string;
  faq_heading: string;
  form_heading: string;
  label_name: string;
  label_email: string;
  label_subject: string;
  label_message: string;
  placeholder_name: string;
  placeholder_subject: string;
  placeholder_message: string;
  btn_transmit: string;
  btn_loading: string;
  success_heading: string;
  success_desc: string;
  chat_fab_text: string;
  chat_marie_status: string;
  chat_always_online: string;
  chat_placeholder: string;
  chat_init_text: string;
  alert_err_submit: string;
  alert_exception: string;
}> = {
  en: {
    support_subtitle: "Contact & Support Concierges",
    support_title_1: "We are Always",
    support_title_s: "Within Reach",
    faq_heading: "Frequently Resolved Queries",
    form_heading: "Inquire or Speak to Designers",
    label_name: "Your Name",
    label_email: "Email Coordinates",
    label_subject: "Subject of Inquiry",
    label_message: "Message",
    placeholder_name: "Sarah Jenkins",
    placeholder_subject: "Inquiry regarding Premium custom corporate milestones",
    placeholder_message: "Detail your request or customization ideas here...",
    btn_transmit: "Transmit Inquiry",
    btn_loading: "Dispatched Checking...",
    success_heading: "Surprise Ticket Dispatched ✨",
    success_desc: "We have registered your assistance ticket. A designated Célèbre curator will respond within 2-4 hours. Thank you!",
    chat_fab_text: "Concierge Support Chat",
    chat_marie_status: "Marie — Célèbre Lead Support",
    chat_always_online: "Always Online concierge",
    chat_placeholder: "Ask about refunds, photo upload, cost...",
    chat_init_text: "Hello! I am Marie from Célèbre Concierge. How can I help you coordinate your upcoming surprise milestone today? ✨",
    alert_err_submit: "Enquiry failed to deliver. Please try again.",
    alert_exception: "Network exception. Please check connection."
  },
  te: {
    support_subtitle: "సంప్రదింపుల మరియు మద్దతు సహాయకులు",
    support_title_1: "మేము ఎల్లప్పుడూ మీకు",
    support_title_s: "అందుబాటులో ఉంటాము",
    faq_heading: "తరచుగా అడిగే ప్రశ్నలు (FAQ)",
    form_heading: "సహాయం లేదా సేవల కోసం విచారణ",
    label_name: "మీ పేరు",
    label_email: "ఈమెయిల్ చిరునామా",
    label_subject: "విచారణా విషయం",
    label_message: "సందేశం",
    placeholder_name: "సారా జెంకిన్స్",
    placeholder_subject: "ప్రీమియం కస్టమ్ మైలురాళ్ల గురించి విచారణ",
    placeholder_message: "మీ అభ్యర్థన లేదా అనుకూలీకరణ ఆలోచనలను ఇక్కడ నమోదు చేయండి...",
    btn_transmit: "సందేశాన్ని పంపండి",
    btn_loading: "సమర్పిస్తోంది...",
    success_heading: "మీ టికెట్ విజయవంతంగా నమోదైంది ✨",
    success_desc: "మేము మీ సహాయ అభ్యర్థనను నమోదు చేసాము. మా ప్రతినిధి 2-4 గంటలలోపు స్పందిస్తారు. ధన్యవాదాలు!",
    chat_fab_text: "ప్రత్యక్ష సహాయ చాట్",
    chat_marie_status: "మేరీ — లీడ్ సపోర్ట్",
    chat_always_online: "ఆన్‌లైన్ సహాయకుడు అందుబాటులో ఉన్నారు",
    chat_placeholder: "రీఫండ్‌లు, ఫోటో అప్‌లోడ్ మొదలైన వాటి గురించి అడగండి...",
    chat_init_text: "నమస్తే! నేను Célèbre కన్సల్టెంట్ మేరిని. ఈరోజు మీ సవరన్ లేదా సర్‌ప్రైజ్ ప్లాన్ చేయడానికి సహాయం కావాలా? ✨",
    alert_err_submit: "సందేశం పంపడం విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.",
    alert_exception: "నెట్‌వర్క్ అంతరాయం. ఇంటర్నెట్ తనిఖీ చేయండి."
  },
  hi: {
    support_subtitle: "संपर्क और सहायता टीम",
    support_title_1: "हम हमेशा आपके",
    support_title_s: "निकट हैं",
    faq_heading: "अक्सर पूछे जाने वाले सवाल",
    form_heading: "डिज़ाइनरों या सलाहकारों से बातचीत",
    label_name: "आपका नाम",
    label_email: "ईमेल आईडी",
    label_subject: "पूछताछ का विषय",
    label_message: "संदेश",
    placeholder_name: "सारा जेन्किन्स",
    placeholder_subject: "प्रीमियम कस्टम माइलस्टोन के बारे में पूछताछ",
    placeholder_message: "अपना अनुरोध या कस्टमाइज़ेशन विवरण यहाँ लिखें...",
    btn_transmit: "पूछताछ भेजें",
    btn_loading: "भेजा जा रहा है...",
    success_heading: "टिकट सफलतापूर्वक भेजा गया ✨",
    success_desc: "हमने आपके सहायता अनुरोध को दर्ज कर लिया है। एक समर्पित क्युरेटर 2-4 घंटे के भीतर जवाब देगा। धन्यवाद!",
    chat_fab_text: "कंसीयज सहायता चैट",
    chat_marie_status: "मैरी — Célèbre सहायता प्रमुख",
    chat_always_online: "सहायक सदैव ऑनलाइन",
    chat_placeholder: "रिफंड, फोटो अपलोड, लागत के बारे में पूछें...",
    chat_init_text: "नमस्ते! मैं Célèbre कंसीयज से मैरी हूँ। आज आपके सुंदर माइलस्टोन सरप्राइज की योजना बनाने में मैं आपकी क्या मदद कर सकती हूँ? ✨",
    alert_err_submit: "पूछताछ भेजने में असमर्थ। पुनः प्रयास करें।",
    alert_exception: "नेटवर्क समस्या। कृपया इंटरनेट की जांच करें।"
  },
  kn: {
    support_subtitle: "ಸಂಪರ್ಕ ಮತ್ತು ಬೆಂಬಲ ಕನ್ಸಿಯರ್ಜ್",
    support_title_1: "ನಾವು ಯಾವಾಗಲೂ ನಿಮ್ಮ",
    support_title_s: "ಸಂಪರ್ಕದಲ್ಲಿದ್ದೇವೆ",
    faq_heading: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
    form_heading: "ವಿಚಾರಣೆ ಅಥವಾ ವಿನ್ಯಾಸಕರೊಂದಿಗೆ ಚರ್ಚೆ",
    label_name: "ನಿಮ್ಮ ಹೆಸರು",
    label_email: "ಇಮೇಲ್ ವಿಳಾಸ",
    label_subject: "ವಿಚಾರಣೆಯ ವಿಷಯ",
    label_message: "ಸಂದೇಶ",
    placeholder_name: "ಸಾರಾ ಜೆಂಕಿನ್ಸ್",
    placeholder_subject: "ಪ್ರೀಮಿಯಂ ಕಸ್ಟಮ್ ಮೈಲಿಗಲ್ಲುಗಳ ಕುರಿತು ವಿಚಾರಣೆ",
    placeholder_message: "ನಿಮ್ಮ ವಿನಂತಿ ಅಥವಾ ಕಸ್ಟಮೈಸೇಶನ್ ಐಡಿಯಾಗಳನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...",
    btn_transmit: "ವಿಚಾರಣೆ ಸಲ್ಲಿಸಿ",
    btn_loading: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...",
    success_heading: "ಸಹಾಯ ಟಿಕೆಟ್ ಕಳುಹಿಸಲಾಗಿದೆ ✨",
    success_desc: "ನಾವು ನಿಮ್ಮ ಸಹಾಯ ಟಿಕೆಟ್ ಅನ್ನು ನೋಂದಾಯಿಸಿದ್ದೇವೆ. ನಮ್ಮ ನಿಯೋಜಿತ ಪ್ರತಿನಿಧಿ 2-4 ಗಂಟೆಗಳಲ್ಲಿ ಉತ್ತರಿಸುತ್ತಾರೆ. ಧನ್ಯವಾದಗಳು!",
    chat_fab_text: "ಲೈವ್ ಸಹಾಯಕ ಚಾಟ್",
    chat_marie_status: "ಮೇರಿ — ಹೆಡ್ ಆಫ್ ಸಪೋರ್ಟ್",
    chat_always_online: "ಲೈವ್ ಸಹಾಯಕರು ಲಭ್ಯವಿರುತ್ತಾರೆ",
    chat_placeholder: "ಮರುಪಾವತಿ, ಫೋಟೋ ಅಪ್ಲೋಡ್ ಬಗ್ಗೆ ಕೇಳಿ...",
    chat_init_text: "ಹಲೋ! ನಾನು ಮೇರಿ. Célèbre ಸಪೋರ್ಟ್ ಕನ್ಸಿಯರ್ಜ್‌ನಿಂದ ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ. ನಿಮ್ಮ ಆಚರಣೆಯನ್ನು ಯೋಜಿಸಲು ನಾನೆಲ್ಲ ಸಹಾಯ ಮಾಡಲಿ? ✨",
    alert_err_submit: "ವಿಚಾರಣೆ ಸಲ್ಲಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.",
    alert_exception: "ನೆಟ್‌ವರ್ಕ್ ತೊಂದರೆ. ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ."
  }
};

const FAQs_BY_LANG: Record<LanguageCode, { question: string; answer: string }[]> = {
  en: [
    {
      question: "What is Célèbre and how does it deliver long-distance surprises?",
      answer: "Célèbre is a luxury celebration orchestration platform. We bridge the emotional gap of distance by allowing you to schedule highly personalized, digital experiences called \"Memory Capsules.\" On the special day, we deliver a secret, interactive Reveal Link via Email, SMS, or WhatsApp. When they open it, they are greeted with elegant music, custom video creations, user-submitted media, and heartfelt words designed to feel like a warm hug across miles."
    },
    {
      question: "How does the Recipient Reveal Page work?",
      answer: "Once you schedule a celebration, our state-of-the-art Scheduler waits for the precise date and time in the recipient’s local timezone. On the selected hour, they receive a beautifully curated message (e.g., \"A surprise memory capsule awaits you from [Name]...\"). Clicking the link launches a customized full-screen celebratory reveal complete with a confetti burst, an interactive opening sequence, background music, family collage slide-shows, or montage clips."
    },
    {
      question: "Can I collect messages from multiple family members for the surprise?",
      answer: "Yes! Our Premium Package unlocks the \"Group Contribution Room.\" After booking, you receive a coordinator link to share with up to 10 friends, parents, or colleagues. They can upload their photos and text messages, which are automatically elegantized and presented inside the recipient’s Memory Capsule as dynamic sliding cards."
    },
    {
      question: "What payment and currencies do you support?",
      answer: "We support fully secure international and domestic checking. Payments are integrated seamlessly via Stripe for USD/international ($) and Razorpay for INR/domestic (₹). We accept all major Credit/Debit Cards, UPI payments, NetBanking, PayPal, and Apple Pay."
    },
    {
      question: "How do planner reminders and automated schedulers operate?",
      answer: "We guide you through the leading-up schedule. You will receive elegant status alerts in-app and via email/SMS 7 days, 3 days, and 1 day prior, reminding you to look over details, upload fresh photos, approve family notes, or review the generated e-card text. We ensure everything is absolutely perfect before launch."
    },
    {
      question: "Can the recipient download or keep the digital memories?",
      answer: "Absolutely. For our Standard and Premium users, the Reveal Page features a \"Download Memory Archive\" button. Premium users also receive lifetime cloud archive hosting with a shareable permanent gallery link so they can revisit their golden milestone whenever they choose."
    }
  ],
  te: [
    {
      question: "Célèbre అంటే ఏమిటి మరియు సుదూర ప్రాంతాలలో అది సర్ప్రైజ్ వేడుకలను ఎలా అందజేస్తుంది?",
      answer: "Célèbre అనేది ఒక లగ్జరీ వేడుకల ప్రణాళిక ప్లాట్‌ఫారమ్. మేము \"మెమరీ క్యాప్సూల్స్\" అని పిలువబడే డిజిటల్ అనుభవాల ద్వారా కుటుంబాల మధ్య దూరాలను తగ్గిస్తాము. ఆ ప్రత్యేక దినోత్సవం రోజున మేము ఈమెయిల్, SMS లేదా వాట్సాప్ ద్వారా రహస్య లింక్‌ను పంపుతాము. వారు దాన్ని తెరిచినప్పుడు, స్క్రీన్‌పై రంగుల కాన్ఫెట్టితో పాటు ఒక మధురమైన గ్రీటింగ్ అనుభూతిని పొందుతారు."
    },
    {
      question: "సర్‌ప్రైజ్ స్వీకర్త మెమోరీ రూమ్ ఎలా పనిచేస్తుంది?",
      answer: "మీరు ఒక వేడుకను షెడ్యూల్ చేసిన తర్వాత, మా సిస్టమ్ నిర్దేశిత సమయం వరకు వేచి ఉంటుంది. ఆ గంటలో వారు ఒక అందమైన సర్‌ప్రైజ్ లింక్‌ను పొందుతారు, దాన్ని క్లిక్ చేయగానే పూర్తి స్క్రీన్‌పై రంగుల కాన్ఫెట్టి వర్షం కురుస్తుంది, సున్నితమైన సంగీతం మరియు కుటుంబ ఫోటోల స్లైడ్‌హో లు కనిపిస్తాయి."
    },
    {
      question: "నేను ఒకేసారి బహుళ కుటుంబ సభ్యుల నుండి సందేశాలను సేకరించవచ్చా?",
      answer: "అవును! మా ప్రీమియం ప్యాకేజీ \"గ్రూప్ కాంట్రిబ్యూషన్ రూమ్\" ని అన్‌లాక్ చేస్తుంది. బుకింగ్ చేసిన తర్వాత లభించే లింక్‌ను గరిష్టంగా 10 మంది స్నేహితులు లేదా బంధువులతో పంచుకోవచ్చు. వారు అప్‌లోడ్ చేసిన ఫొటోలు, సందేశాలు గ్రహీత యొక్క మెమరీ రూమ్‌లో కనిపిస్తాయి."
    },
    {
      question: "మీరు ఏయే చెల్లింపుల పద్ధతులను మరియు కరెన్సీలను సపోర్ట్ చేస్తారు?",
      answer: "మేము పూర్తి సురక్షితమైన దేశీయ మరియు అంతర్జాతీయ లావాదేవీలను సమర్ధిస్తాము. అంతర్జాతీయ చెల్లింపుల కోసం Stripe ($) ని, మరియు భారతదేశంలో INR (₹) చెల్లింపుల కోసం Razorpay ని ఉపయోగిస్తాము. మీరు క్రెడిట్/డెబిట్ కార్డులు, UPI, మరియు నెట్ బ్యాంకింగ్ ఉపయోగించి చెల్లించవచ్చు."
    },
    {
      question: "షెడ్యూల్ చేసిన నోటిఫికేషన్‌లు ఎలా పనిచేస్తాయి?",
      answer: "మేము విరామ సమయాల్లో మీకు సమాచారం అందిస్తాము. మీ ప్రధాన ఈవెంట్ కు 7 రోజుల ముందు, 3 రోజుల ముందు మరియు 1 రోజు ముందు SMS మరియు ఈమెయిల్ అలర్ట్‌లు అందుతాయి. తద్వారా మీరు వివరాలను సరిచూసుకోవచ్చు."
    },
    {
      question: "సర్ప్రైజ్ క్యాప్సూల్ డిజిటల్ జ్ఞాపకాలను నిల్వ చేసుకోవచ్చా?",
      answer: "ఖచ్చితంగా. స్టాండర్డ్ మరియు ప్రీమియం యూజర్లు మీడియా ఆర్కైవ్‌లను సులభంగా డౌన్‌లోడ్ చేసుకోవచ్చు. ప్రీమియం యూజర్లు లైఫ్‌టైం శాశ్వత గ్యాలరీ లింక్‌ను కూడా పొందుతారు."
    }
  ],
  hi: [
    {
      question: "Célèbre क्या है और यह दूरी के पार डिजिटल सरप्राइज कैसे डिलीवर करता है?",
      answer: "Célèbre एक कस्टमाइज्ड सेलिब्रेशन आर्केस्ट्रेशन प्लेटफॉर्म है। हम \"मेमोरी कैप्सूल्स\" नामक डिजिटल अनुभवों के माध्यम से दूरी के भावनात्मक अंतर को पाटते हैं। विशेष दिन पर, हम ईमेल, एसएमएस या व्हाट्सएप के माध्यम से एक सीक्रेट लिंक डिलीवर करते हैं जिसे खोलने पर उन्हें खूबसूरत कन्फ़ेद्दी, व्यक्तिगत वीडियो और दिल को छूने वाले संगीत का अनुभव मिलता है।"
    },
    {
      question: "प्राप्तकर्ता क्युरेटेड रिवील पेज कैसे काम करता है?",
      answer: "एक बार जब आप सरप्राइज शेड्यूल करते हैं, तो हमारा शेड्यूलर प्राप्तकर्ता के स्थानीय समय के अनुसार काम करता है। विशिष्ट घंटे पर उन्हें सरप्राइज लिंक मिलता है। लिंक खोलने पर मनमोहक लाइव संगीत, पारिवारिक तस्वीरों का कोलाज और स्लाइड शो प्रकट होता है।"
    },
    {
      question: "क्या मैं सरप्राइज में परिवार के कई सदस्यों से संदेश एकत्र कर सकता हूँ?",
      answer: "हाँ! हमारा प्रीमियम पैकेज \"ग्रुप कंट्रीब्यूशन रूम\" को अनलॉक करता है। बुकिंग के बाद आपको एक लिंक मिलता है जिसे आप अधिकतम 10 दोस्तों और रिश्तेदारों के साथ साझा कर सकते हैं ताकि वे अपनी तस्वीरें और संदेश जोड़ सकें।"
    },
    {
      question: "आप किन भुगतान विधियों और मुद्राओं का समर्थन करते हैं?",
      answer: "हम पूरी तरह से सुरक्षित बुकिंग का समर्थन करते हैं। अंतरराष्ट्रीय भुगतान के लिए Stripe ($) और भारतीय रुपयों (₹) के लिए Razorpay की सुविधा उपलब्ध है। आप क्रेडिट/डेबिट कार्ड, यूपीआई और नेटबैंकिंग के जरिए आसानी से भुगतान कर सकते हैं।"
    },
    {
      question: "उत्सव के दौरान अनुस्मारक (Reminders) कैसे काम करते हैं?",
      answer: "हम आपको समय-समय पर सूचित करते हैं। लॉन्च के 7 दिन पहले, 3 दिन पहले और 1 दिन पहले आपको ईमेल/एसएमएस अलर्ट मिलेंगे ताकि आप तस्वीरें बदलने या संदेशों को दोबारा संपादित करने का विकल्प देख सकें।"
    },
    {
      question: "क्या प्राप्तकर्ता डिजिटल यादों को डाउनलोड कर सकता है?",
      answer: "बिल्कुल। हमारे मानक और प्रीमियम उपयोगकर्ताओं के लिए रिवील पेज पर \"मेमोरी डाउनलोड करें\" का बटन होता है। प्रीमियम उपयोगकर्ताओं को जीवन भर के लिए यादों को सुरक्षित रखने हेतु क्लाउड आर्काइव लिंक भी दिया जाता है।"
    }
  ],
  kn: [
    {
      question: "Célèbre ಎಂದರೇನು ಮತ್ತು ಇದು ದೂರದ ಆಚರಣೆಗಳನ್ನು ಹೇಗೆ ತಲುಪಿಸುತ್ತದೆ?",
      answer: "Célèbre ಎಂಬುದು ಭಾವನಾತ್ಮಕ ಸಂಬಂಧ ಬೆಸೆಯಲು ಸಹಾಯ ಮಾಡುವ ಐಷಾರಾಮಿ ಡಿಜಿಟಲ್ ವೇದಿಕೆಯಾಗಿದೆ. ನಾವು \"ಮೆಮೊರಿ ಕ್ಯಾಪ್ಸೂಲ್ಸ್\" ರೂಪದಲ್ಲಿ ಸಿದ್ಧಪಡಿಸಿದ ರಹಸ್ಯ ಲಿಂಕ್ ಅನ್ನು ಇಮೇಲ್, SMS ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಕಳುಹಿಸುತ್ತೇವೆ. ಅದನ್ನು ತೆರೆದಾಗ ಸುಂದರ ಸಂಗೀತ ಹಾಗೂ ಕಾಣಿಕೆಗಳು ಕಣ್ಣೆದುರು ತೆರೆದುಕೊಳ್ಳುತ್ತವೆ."
    },
    {
      question: "ಸ್ವೀಕೃತದಾರರ ಪುಟ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?",
      answer: "ನಿಗದಿಪಡಿಸಿದ ನಂತರ, ಸಿಸ್ಟಮ್ ಸ್ವೀಕೃತದಾರರ ಸ್ಥಳೀಯ ಸಮಯದ ಆಧಾರದ ಮೇಲೆ ಲಿಂಕ್ ಕಳುಹಿಸುತ್ತದೆ. ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿದಾಗ ಆಕರ್ಷಕ ಕನ್ಫೆಟ್ಟಿ ಆಚರಣೆಯೊಂದಿಗೆ ಅವರ ಮೆಮೊರಿ ಕೊಲಾಜ್ ಮತ್ತು ಹಿನ್ನೆಲೆ ಸಂಗೀತ ತೆರೆದುಕೊಳ್ಳುತ್ತದೆ."
    },
    {
      question: "ಸರ್ಪ್ರೈಸ್‌ಗೆ ನಾನು ಬಹು ಬಾಂಧವ್ಯಗಳಿಂದ ಶುಭ ಹಾರೈಕೆ ಸಂಗ್ರಹಿಸಬಹುದೇ?",
      answer: "ಹೌದು! ನಮ್ಮ ಪ್ರೀಮಿಯಂ ಪ್ಯಾಕೇಜ್ \"ಗ್ರೂಪ್ ಕೊಡುಗೆ ಕೊಠಡಿ\" ಅನ್ನು ಮುಕ್ತಗೊಳಿಸುತ್ತದೆ. ನಿಮ್ಮ ಪ್ರೀತಿಯ 10 ಸ್ನೇಹಿತರ ಬಳಿ ಲಿಂಕ್ ಹಂಚಿಕೊಂಡು ಅವರ ಸಂದೇಶ ಹಾಗೂ ಫೋಟೋಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸಬಹುದು."
    },
    {
      question: "ಯಾವ ಪಾವತಿ ಕಾಯ್ದೆ ಹಾಗೂ ಕರೆನ್ಸಿಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತೀರಿ?",
      answer: "ನಾವು ಅಂತರರಾಷ್ಟಯ ಪಾವತಿಗಾಗಿ Stripe ($) ಹಾಗೂ ಭಾರತೀಯ ದೇಶೀಯ ಪಾವತಿಗಾಗಿ Razorpay (₹) ಅನ್ನು ಬೆಂಬಲಿಸುತ್ತೇವೆ. ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್, ಡೆಬಿಟ್ ಕಾರ್ಡ್, UPI ಮತ್ತು ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಮೂಲಕ ಸುಲಭವಾಗಿ ಪಾವತಿಸಬಹುದು."
    },
    {
      question: "ನಮಗೆ ಸಿಗುವ ನೆನಪೋಲೆಗಳು (Reminders) ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತವೆ?",
      answer: "ನಾವು ನಿಮ್ಮ ಯಶಸ್ವಿ ಯೋಜನೆಗಾಗಿ 7 ದಿನ, 3 ದಿನ ಮತ್ತು 1 ದಿನ ಮುಂಚಿತವಾಗಿ SMS ಮತ್ತು ಇಮೇಲ್ ಮೂಲಕ ಮಾಹಿತಿ ರವಾನಿಸುತ್ತೇವೆ. ಇದರಿಂದ ಕೊನೆಯ ಹಂತದ ಬದಲಾವಣೆ ಸುಲಭವಾಗುತ್ತದೆ."
    },
    {
      question: "ಸ್ವೀಕೃತದಾರರು ಈ ನೆನಪುಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳಬಹುದೇ?",
      answer: "ಖಂಡಿತವಾಗಿಯೂ. ಪ್ರಮಾಣಿತ ಮತ್ತು ಪ್ರೀಮಿಯಂ ಬಳಕೆದಾರರ ಪುಟದಲ್ಲಿ \"ಡೌನ್‌ಲೋಡ್ ಆರ್ಕೈವ್\" ಬಟನ್ ಇರುತ್ತದೆ. ಪ್ರೀಮಿಯಂ ಬಳಕೆದಾರರು ಶಾಶ್ವತ ಲೈಫ್‌ಟೈಮ್ ಶಾಸ್ತ್ರ ಆನ್‌ಲೈನ್ ಲಿಂಕ್ ಕೂಡ ಪಡೆಯುತ್ತಾರೆ."
    }
  ]
};

export default function ContactPage({ language }: ContactPageProps) {
  const ct = CONTACT_TRANSLATIONS[language] || CONTACT_TRANSLATIONS.en;
  const faqs = FAQs_BY_LANG[language] || FAQs_BY_LANG.en;

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sub, setSub] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Chat Widget Simulator state
  const [chatOpen, setChatOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [messages, setMessages] = useState<{ sender: 'User' | 'Concierge'; text: string; time: string }[]>([
    { sender: 'Concierge', text: ct.chat_init_text, time: 'Just Now' }
  ]);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject: sub, message: msg })
      });

      const data = await resp.json();
      if (resp.ok && data.success) {
        setSent(true);
        setName('');
        setEmail('');
        setSub('');
        setMsg('');
      } else {
        alert(ct.alert_err_submit);
      }
    } catch (err) {
      alert(ct.alert_exception);
    } finally {
      setLoading(false);
    }
  };

  // Live Chat Reply Simulator
  const handleSendMessage = () => {
    if (!userQuery.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsgs = [...messages, { sender: 'User' as const, text: userQuery, time: userTime }];
    setMessages(newMsgs);
    const typed = userQuery.toLowerCase();
    setUserQuery('');

    // Generate response mapped to language
    setTimeout(() => {
      let replyText = language === 'te' 
        ? "మేరీ: అది చాలా మంచి ప్రశ్న! మా సిస్టమ్స్ అన్నీ సురక్షితంగా ఉన్నాయి. ప్లానర్ ఫారమ్‌లలో మీరు ఈ క్యాప్సూల్స్ డిజైన్ చేయవచ్చు."
        : language === 'hi'
        ? "मैरी: यह बहुत बढ़िया सवाल है! हमारे क्रोन शेड्यूलर्स हमेशा सटीक समय पर काम करते हैं। आप इसे योजना विज़ार्ड से सरलता से कस्टमाइज़ कर सकते हैं।"
        : language === 'kn'
        ? "ಮೇರಿ: ಇದು ಒಳ್ಳೆಯ ಪ್ರಶ್ನೆ! ಆಚರಣೆಗಳನ್ನು ನಿಗದಿತ ದಿನದಂದು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ತಲುಪಿಸಲಾಗುವುದು. ಕಸ್ಟಮೈಸೇಶನ್ ಗಾಗಿ ನೀವು ಟೈರ್ ಆಯ್ಕೆ ಮಾಡಬಹುದು."
        : "Marie: That is an excellent question! Our crons deliver surprise capsules down to the exact scheduled minutes globally. Feel free to plan yours using our multi-step planner wizard.";

      if (typed.includes('refund') || typed.includes('cancel') || typed.includes('రీఫండ్') || typed.includes('ರದ್ದತಿ')) {
        replyText = language === 'te'
          ? "మేరీ: గడువు కంటే 48 గంటల ముందు వరకు ఉచిత రద్దు సదుపాయం ఉంటుంది. మీరు 'మై ఈవెంట్స్' లో దీని సమాచారం చూడగలరు! ✨"
          : language === 'hi'
          ? "मैरी: निर्धारित समय से 48 घंटे पहले तक निरस्तीकरण या तिथि परिवर्तन किया जा सकता है। आप इसे 'माई इवेंट्स' से सुरक्षित रूप से प्रबंधित कर सकते हैं! ✨"
          : language === 'kn'
          ? "ಮೇರಿ: ವಿತರಣೆಗೆ 48 ಗಂಟೆಗಳ ಮೊದಲು ಸುಲಭವಾಗಿ ರದ್ದುಗೊಳಿಸಬಹುದು. 'ನನ್ನ ಇವೆಂಟ್ಸ್' ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಇದನ್ನು ನಿರ್ವಹಿಸಬಹುದು! ✨"
          : "Marie: Standard and Premium planning tickets can be cancelled or rescheduled up to 48 hours before delivery. You can manage this securely from the 'My Events' workspace portal! ✨";
      } else if (typed.includes('price') || typed.includes('cost') || typed.includes('package') || typed.includes('ధర') || typed.includes('ಪ್ಯಾಕೇಜ್')) {
        replyText = language === 'te'
          ? "మేరీ: మా వద్ద మూడు ప్యాకేజీలు ఉన్నాయి: బేసిక్ (₹499), స్టాండర్డ్ (₹1499), మరియు ప్రీమియమ్ (₹3499). ప్రీమియమ్ అత్యంత ప్రాచుర్యం పొందింది."
          : language === 'hi'
          ? "मैरी: हमारे पास तीन बजट-अनुकूल पैकेज हैं: मूल (₹499), मानक (₹1499), और प्रीमियम (₹3499)। प्रीमियम में भरपूर सुविधाएं शामिल हैं।"
          : language === 'kn'
          ? "ಮೇರಿ: ನಮ್ಮ ಆಚರಣೆಗಳು 3 ಅತ್ಯುತ್ತಮ ಟೈರ್‌ಗಳಲ್ಲಿವೆ: ಬೇಸಿಕ್ (₹499), ಸ್ಟ್ಯಾಂಡರ್ಡ್ (₹1499), ಮತ್ತು ಪ್ರೀಮಿಯಂ (₹3499)."
          : "Marie: We support 3 premium layouts: Basic ($9/₹499), Standard ($19/₹1499), and Premium ($49/₹3499). Premium unlocks full e-gift cards and group guest notes.";
      } else if (typed.includes('upload') || typed.includes('photo') || typed.includes('song') || typed.includes('music') || typed.includes('ఫొటో') || typed.includes('ಹಾಡು')) {
        replyText = language === 'te'
          ? "మేరీ: అవును! స్టాండర్డ్‌ మరియు ప్రీమియం లో కస్టమ్ ఫొటోలు, ఆడియోలని జోడించవచ్చు. బుకింగ్ విండో ద్వారా వీటిని అప్‌లోడ్ చేయండి!"
          : language === 'hi'
          ? "मैरी: बिल्कुल! मानक और प्रीमियम पैकेजों में आप तस्वीरें और संगीत ट्रैक कस्टमाइज़ कर सकते हैं। इसके लिए क्युरेटर टूल का उपयोग करें!"
          : language === 'kn'
          ? "ಮೇರಿ: ಹೌದು! ಕಸ್ಟಮ್ ಫೋಟೋಗಳು ಮತ್ತು ಹಿನ್ನೆಲೆ ಸಂಗೀತ ಅಳವಡಿಸುವುದು ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಹಾಗೂ ಪ್ರೀಮಿಯಂ ನಲ್ಲಿ ಸುಲಭವಾಗಿದೆ!"
          : "Marie: Absolutely! Standard and Premium packages allow uploading up to 10 memories and choosing acoustic backing tracks. You can adjust this during Step 5 of the planner wizard!";
      }

      setMessages(m => [...m, { sender: 'Concierge' as const, text: replyText, time: userTime }]);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-16 animate-fade-in" id="contact_page_root">
      
      {/* HEADER ROW */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-gold-dark font-semibold">
          {ct.support_subtitle}
        </span>
        <h1 className="font-serif text-3xl sm:text-4.5xl text-navy-deep font-light">
          {ct.support_title_1} <span className="italic font-normal text-gold">{ct.support_title_s}</span>
        </h1>
        <div className="w-16 h-[1.5px] bg-gold/40 mx-auto" />
      </div>

      <div className="grid lg:grid-cols-12 gap-12" id="contact_and_faqs_grid">
        
        {/* COLUMN 1: INTERACTIVE FAQS */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center space-x-2 text-navy-deep border-b border-gold/15 pb-2.5">
            <HelpCircle className="w-5.5 h-5.5 text-gold-dark" />
            <h2 className="font-serif text-xl sm:text-2xl font-semibold">{ct.faq_heading}</h2>
          </div>

          <div className="space-y-3" id="collapsible_accordions_wrapper">
            {faqs.map((faq, fidx) => (
              <div
                key={fidx}
                className="bg-white border border-gold/12 hover:border-gold/30 rounded-xl transition-all duration-300"
                id={`accordion_item_${fidx}`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(fidx)}
                  className="w-full text-left px-5 py-4 font-serif text-charcoal text-sm sm:text-base font-semibold flex items-center justify-between focus:outline-hidden cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="text-[#B89025] font-sans text-xs">{activeFaq === fidx ? '−' : '+'}</span>
                </button>

                {activeFaq === fidx && (
                  <div className="px-5 pb-4 pt-1 font-sans text-xs sm:text-sm text-luxury-gray leading-relaxed border-t border-gold/5 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 2: CONTACT FORM */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center space-x-2 text-navy-deep border-b border-gold/15 pb-2.5">
            <Mail className="w-5.5 h-5.5 text-gold-dark" />
            <h2 className="font-serif text-xl sm:text-2xl font-semibold">{ct.form_heading}</h2>
          </div>

          {sent ? (
            <div className="bg-emerald-500/5 text-emerald-800 border border-emerald-500/20 p-6 rounded-2xl text-center space-y-3 animate-fade-in" id="contact_sent_notice">
              <Check className="w-10 h-10 text-emerald-600 mx-auto animate-pulse" />
              <h3 className="font-serif text-lg font-semibold text-navy-deep">{ct.success_heading}</h3>
              <p className="font-sans text-xs text-luxury-gray max-w-xs mx-auto">
                {ct.success_desc}
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-xs sm:text-sm" id="support_enquiry_form">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-charcoal/85 uppercase tracking-wider">{ct.label_name}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={ct.placeholder_name}
                    className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-2.5 rounded-xl text-charcoal"
                    id="contact_name_input"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-charcoal/85 uppercase tracking-wider">{ct.label_email}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="saisubhashvemireddy@gmail.com"
                    className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-2.5 rounded-xl text-charcoal"
                    id="contact_email_input"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-charcoal/85 uppercase tracking-wider">{ct.label_subject}</label>
                <input
                  type="text"
                  value={sub}
                  onChange={(e) => setSub(e.target.value)}
                  placeholder={ct.placeholder_subject}
                  className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-2.5 rounded-xl text-charcoal"
                  id="contact_subject_input"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-charcoal/85 uppercase tracking-wider">{ct.label_message}</label>
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder={ct.placeholder_message}
                  className="w-full bg-gold-pale/15 border border-gold/15 focus:border-gold focus:outline-hidden p-4 rounded-xl text-charcoal min-h-[120px]"
                  id="contact_message_textarea"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-navy-deep hover:bg-gold hover:text-navy-deep text-white py-3.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-1"
                id="contact_submit_btn"
              >
                <span>{loading ? ct.btn_loading : ct.btn_transmit}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>

      {/* FLOATING CÉLÈBRE AI LIVE CHAT SIMULATOR */}
      <div className="fixed bottom-6 right-6 z-[800] font-sans" id="live_chat_simulation_capsule">
        
        {/* Chat Toggle Button */}
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-navy-deep text-gold border border-gold p-4 rounded-full shadow-2xl flex items-center justify-center space-x-2 hovering-glow cursor-pointer transition-transform hover:scale-107"
            id="chat_fab_trigger"
          >
            <MessageSquare className="w-5 h-5 text-gold-dark" />
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-white hidden sm:inline">{ct.chat_fab_text}</span>
          </button>
        ) : (
          /* EMBEDDED REALISTIC TIDIO BOX */
          <div className="bg-white border-2 border-gold/35 rounded-[22px] w-[320px] sm:w-[360px] h-[450px] shadow-2xl flex flex-col justify-between overflow-hidden animate-fade-in" id="chat_dialog_widget">
            
            {/* Conversations Header Box */}
            <div className="bg-navy-deep text-white p-4 flex items-center justify-between border-b border-gold/20">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold font-serif font-bold text-xs">
                  M
                </div>
                <div>
                  <span className="font-serif text-sm font-semibold text-white block">{ct.chat_marie_status}</span>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-gold-light font-bold block flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>{ct.chat_always_online}</span>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setChatOpen(false)}
                className="text-white/70 hover:text-white text-lg font-sans font-bold cursor-pointer"
                id="close_chat_dialog"
              >
                ✕
              </button>
            </div>

            {/* Conversation Flow area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gold-pale/20" id="chat_scroll_area">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[85%] ${
                    m.sender === 'User' ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                  id={`chat_bubble_${idx}`}
                >
                  <div className={`p-3 rounded-2xl text-xs sm:text-xs/relaxed ${
                    m.sender === 'User' 
                      ? 'bg-navy-deep text-white rounded-br-none' 
                      : 'bg-white border border-gold/15 text-charcoal rounded-bl-none'
                  }`}>
                    {m.text}
                  </div>
                  <span className="text-[8px] text-luxury-gray/70 uppercase mt-0.5 tracking-wider px-1">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Send Interface bar */}
            <div className="p-3 border-t border-gold/15 bg-white flex space-x-2 items-center">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                placeholder={ct.chat_placeholder}
                className="flex-1 bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-3.5 py-2 rounded-xl text-xs text-charcoal font-medium"
                id="chat_text_input"
              />
              <button
                onClick={handleSendMessage}
                className="bg-navy-deep text-gold p-2 rounded-xl border border-gold hover:bg-gold hover:text-navy-deep transition-colors cursor-pointer"
                id="submit_query_btn"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
