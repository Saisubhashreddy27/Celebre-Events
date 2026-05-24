/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Heart, Award, Globe, Users, ArrowRight } from 'lucide-react';
import { LanguageCode } from '../translations';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  language: LanguageCode;
}

const ABOUT_TRANSLATIONS: Record<LanguageCode, {
  vision_subtitle: string;
  vision_title_1: string;
  vision_title_s: string;
  vision_desc: string;
  what_title: string;
  what_p1: string;
  what_p2: string;
  delivery_orchestration: string;
  step_1_title: string;
  step_1_desc: string;
  step_2_title: string;
  step_2_desc: string;
  step_3_title: string;
  step_3_desc: string;
  value_1_title: string;
  value_1_desc: string;
  value_2_title: string;
  value_2_desc: string;
  value_3_title: string;
  value_3_desc: string;
  ai_guidance: string;
  custom_milestone_1: string;
  custom_milestone_2: string;
  custom_desc: string;
  sponsor_btn: string;
  capsules_delivered: string;
  countries_active: string;
  tear_rate: string;
  concierge_active: string;
  creators_title: string;
}> = {
  en: {
    vision_subtitle: "Bridging Hearts Across Meridians",
    vision_title_1: "Our Vision: Because Distance Should",
    vision_title_s: "Never Dim the Celebration",
    vision_desc: "Founded in 2024, Célèbre emerged from a simple observation: although physical boundaries divide us, emotional bonds crave high-fidelity milestones. We represent a luxury digital concierge agency designing tears of joy and surprise capsules for your most treasured families, friends, and siblings across the physical miles.",
    what_title: "What is Célèbre?",
    what_p1: "Célèbre is an interactive digital Memory Capsule platform designed to let you orchestrate gorgeous, scheduled surprises for your loved ones who are living, studying, or working far away.",
    what_p2: "Instead of sending a cold text message or a plain pre-fabricated graphic card, you can curate an immersive, rich media journey filled with personalized audio/video tracks, photo collages, group greeting notes from up to 10 friends, and custom automated countdown timers.",
    delivery_orchestration: "The Delivery Orchestration:",
    step_1_title: "Schedule & Detail:",
    step_1_desc: "You enter your recipient's local timezone, select a milestone (like birthday, baby's 1st birthday, or house warming), and pick a package.",
    step_2_title: "Curate Content:",
    step_2_desc: "Compose heartfelt memories utilizing standard or premium templates, upload snapshots, and add dynamic soundtracks.",
    step_3_title: "Surprise Moment:",
    step_3_desc: "At the designated local hour, they receive an automated surprise signal (secure Email, SMS, or WhatsApp). Clicking it displays an elegant, animated opening screen with live confetti and background melodies.",
    value_1_title: "Emotional Integrity First",
    value_1_desc: "We reject pre-fabricated template cards. Our server-side integrations compute rich visual and acoustic landmarks calibrated for each relationship.",
    value_2_title: "Oceans Transcended",
    value_2_desc: "From Seattle to Mumbai, London to Sydney — Célèbre handles timezones, international billing currencies, and automated delivery channels.",
    value_3_title: "Premium Artistry",
    value_3_desc: "Standard and Premium coordinates unlock automated classical soundtracks, photorealistic displays, and direct messaging networks.",
    ai_guidance: "Human Curation Guided by AI",
    custom_milestone_1: "Crafting Your Custom",
    custom_milestone_2: "Surprise Milestone",
    custom_desc: "When you orchestrate a capsule via Célèbre, your memory data sits in safe sandboxes. Closer to launch, automated crons run email, SMS, or WhatsApp ping notifications. On the target day, recipients click a glowing parcel to trigger emotional reveals.",
    sponsor_btn: "Sponsor a Capsule Today",
    capsules_delivered: "Capsules Delivered",
    countries_active: "Countries Active",
    tear_rate: "Tear Rate ✨",
    concierge_active: "Concierge Active",
    creators_title: "The Creators of Célèbre"
  },
  te: {
    vision_subtitle: "సరిహద్దులను దాటి హృదయాలను అనుసంధానించడం",
    vision_title_1: "మా దార్శనికత: ఎందుకంటే దూరం ఎప్పుడూ",
    vision_title_s: "మహోన్నత వేడుకల కాంతిని తగ్గించకూడదు",
    vision_desc: "2024లో స్థాపించబడిన Célèbre ఒక సాధారణ పరిశీలన నుండి ఉద్భవించింది: భౌతిక సరిహద్దులు మనలను విభజించినప్పటికీ, మానసిక బంధాలు బలమైన జ్ఞాపకాలను కోరుకుంటాయి. మీ అత్యంత ప్రియమైన కుటుంబాలు మరియు స్నేహితుల కోసం ఆనందభాష్పాలు మరియు ఆశ్చర్యకరమైన క్యాప్సూల్స్‌ను రూపొందించే లగ్జరీ డిజిటల్ ఏజెన్సీగా మేము ఉన్నాము.",
    what_title: "Célèbre అంటే ఏమిటి?",
    what_p1: "Célèbre అనేది ఒక ఇంటరాక్టివ్ డిజిటల్ మెమరీ క్యాప్సూల్ ప్లాట్‌ఫారమ్. దీని ద్వారా మీరు సుదూర ప్రాంతాలలో నివసిస్తున్న మీ ప్రియమైన వారి కోసం అద్భుతమైన ఆశ్చర్యకరమైన వేడుకలను ప్లాన్ చేయవచ్చు.",
    what_p2: "సాధారణ టెక్స్ట్ మెసేజ్ లేదా సాధారణ కార్డ్‌కు బదులుగా, మీరు వ్యక్తిగతీకరించిన ఆడియో/వీడియో ట్రాక్‌లు, ఫోటో కొల్లాజ్‌లు మరియు కస్టమ్ కౌంట్‌డౌన్ టైమర్‌లతో కూడిన అపూర్వమైన డిజిటల్ అనుభవాన్ని క్రియేట్ చేయవచ్చు.",
    delivery_orchestration: "డెలివరీ ప్రణాళిక:",
    step_1_title: "షెడ్యూల్ & వివరాలు:",
    step_1_desc: "మీరు మీ ప్రియమైనవారి స్థానిక కాలమండలాన్ని ఎంచుకుంటారు, ఒక మైలురాయిని (పుట్టినరోజు, వార్షికోత్సవం మొదలైనవి) మరియు ప్యాకేజీని ఎంచుకుంటారు.",
    step_2_title: "విషయాల క్యూరేషన్:",
    step_2_desc: "ప్రామాణిక లేదా ప్రీమియం టెంప్లేట్‌లను ఉపయోగించి హృదయపూర్వక జ్ఞాపకాలను రాయండి, ఫోటోలను అప్‌లోడ్ చేయండి మరియు సంగీతాన్ని జోడించండి.",
    step_3_title: "ఆశ్చర్యకరమైన క్షణం:",
    step_3_desc: "నిర్ణీత సమయంలో, వారు ఆటోమేటిక్ నోటిఫికేషన్ (ఈమెయిల్, SMS లేదా వాట్సాప్) అందుకుంటారు. దాన్ని క్లిక్ చేసినప్పుడు లైవ్ కాన్ఫెట్టితో కూడిన అద్భుతమైన ఓపెనింగ్ స్క్రీన్ కనిపిస్తుంది.",
    value_1_title: "మానసిక నమ్మకం",
    value_1_desc: "మేము సాధారణ రెడీమేడ్ కార్డ్‌లను వ్యతిరేకిస్తాము. మా సర్వర్ సైడ్ ఇంటిగ్రేషన్‌లు ప్రతి బంధానికి తగ్గ ల్యాండ్‌మార్క్‌లను అందిస్తాయి.",
    value_2_title: "దూరాలను అధిగమించడం",
    value_2_desc: "సీటెల్ నుండి ముంబై వరకు, లండన్ నుండి సిడ్నీ వరకు — Célèbre అన్ని టైమ్‌జోన్‌లను మరియు అంతర్జాతీయ చెల్లింపులను సులభతరం చేస్తుంది.",
    value_3_title: "ప్రీమియం సృజనాత్మకత",
    value_3_desc: "ప్రామాణిక మరియు ప్రీమియం ఎంపికలతో క్లాసికల్ సంగీతం, లగ్జరీ గ్యాలరీలను అన్‌లాక్ చేయవచ్చు.",
    ai_guidance: "AI సాయంతో కూడిన మానవ సృజనాత్మకత",
    custom_milestone_1: "మీ అనుకూలీకరించిన",
    custom_milestone_2: "సర్‌ప్రైజ్ మైలురాయిని సృష్టించండి",
    custom_desc: "మీరు Célèbre ద్వారా క్యాప్సూల్‌ని బుక్ చేసినప్పుడు, మీ జ్ఞాపకాలు సురక్షితంగా సేవ్ చేయబడతాయి. నిర్ణీత రోజున గ్రహీత ఒక అందమైన లింక్‌ను ఓపెన్ చేసి సర్‌ప్రైజ్ అవుతారు.",
    sponsor_btn: "ఈరోజే ఒక క్యాప్సూల్ స్పాన్సర్ చేయండి",
    capsules_delivered: "పంపిణీ చేసిన క్యాప్సూల్స్",
    countries_active: "క్రియాశీల దేశాలు",
    tear_rate: "ఆనందభాష్పాలు రేటు ✨",
    concierge_active: "కన్సల్టెంట్స్ యాక్టివ్",
    creators_title: "Célèbre నిర్వాహకులు"
  },
  hi: {
    vision_subtitle: "दूरी के पार दिलों को जोड़ना",
    vision_title_1: "हमारी दृष्टि: क्योंकि दूरी को कभी",
    vision_title_s: "उत्सव की शानदार रोशनी कम नहीं करनी चाहिए",
    vision_desc: "2024 में स्थापित, Célèbre की शुरुआत एक साधारण सोच से हुई थी: यद्यपि हमारे बीच भौगोलिक सीमाएं हैं, पर भावनाओं के अटूट संबंधों को खूबसूरत यादों की आवश्यकता होती है। हम आपके सुदूर प्रियजनों के लिए खुशियों के आंसू और डिजिटल सरप्राइज कैप्सूल डिजाइन करने वाली एक लक्जरी डिजिटल एजेंसी हैं।",
    what_title: "Célèbre क्या है?",
    what_p1: "Célèbre एक इंटरैक्टिव डिजिटल मेमोरी कैप्सूल प्लेटफॉर्म है, जिसके जरिए आप अपने दूर रहने वाले प्रियजनों के लिए शानदार सरप्राइज़ प्लान कर सकते हैं।",
    what_p2: "एक साधारण मैसेज या साधारण कार्ड भेजने के बजाय, आप व्यक्तिगत विज़ुअल्स, ऑडियो/वीडियो पटरियों, फोटो कोलाज और अनुकूलित काउंटडाउन टाइमर के साथ एक गहरी यात्रा तैयार कर सकते हैं।",
    delivery_orchestration: "वितरण प्रक्रिया:",
    step_1_title: "शेड्यूल और विवरण:",
    step_1_desc: "आप अपने प्राप्तकर्ता का स्थानीय टाइमज़ोन दर्ज करते हैं, जन्मदिन या वर्षगांठ चुनते हैं और पैकेज आकार तय करते हैं।",
    step_2_title: "सामग्री का चयन:",
    step_2_desc: "प्यारे संदेश लिखें, अमूल्य यादगार तस्वीरें अपलोड करें और पृष्ठभूमि के लिए संगीत की धुनें जोड़ें।",
    step_3_title: "सरप्राइज का क्षण:",
    step_3_desc: "निर्धारित समय पर, वे एक सुरक्षित ईमेल, एसएमएस या व्हाट्सएप सिग्नल प्राप्त करते हैं जिसे खोलने पर सुंदर लाइव कंफ़ेद्दी और पृष्ठभूमि धुनों के साथ संदेश प्रकट होता है।",
    value_1_title: "भावनात्मक सत्यता सर्वोपरि",
    value_1_desc: "हम रेडीमेड टेम्पलेट्स को अस्वीकार करते हैं। हमारे सर्वर-साइड एकीकरण आपके रिश्ते के अनुकूल समृद्ध विजुअल तैयार करते हैं।",
    value_2_title: "महासागरों के पार",
    value_2_desc: "सिएटल से मुंबई, लंदन से सिडनी तक — Célèbre सभी टाइमज़ोन और अंतर्राष्ट्रीय भुगतान मुद्राओं को सहज रूप से संभालता।",
    value_3_title: "प्रीमियम कलात्मकता",
    value_3_desc: "मानक और प्रीमियम विकल्प स्वचालित क्लासिकल धुनें, सुंदर दृश्य और सीधे मैसेजिंग को सक्षम बनाते हैं।",
    ai_guidance: "एआई द्वारा निर्देशित मानव क्युरेशन",
    custom_milestone_1: "कल्पनाशील कस्टमाइज्ड",
    custom_milestone_2: "सरप्राइज माइलस्टोन",
    custom_desc: "Célèbre कैप्सूल की यादें सुरक्षित सैंडबॉक्स में रखी जाती हैं। सही दिन पर सुरक्षित सूचनाएं जाती हैं और प्राप्तकर्ता पार्सल पर क्लिक करके भावुक सरप्राइज पाते हैं।",
    sponsor_btn: "आज ही एक कैप्सूल प्रायोजित करें",
    capsules_delivered: "वितरित कैप्सूल",
    countries_active: "सक्रिय देश",
    tear_rate: "खुशी के आंसू दर ✨",
    concierge_active: "सक्रिय कंसीयज",
    creators_title: "Célèbre के निर्माता"
  },
  kn: {
    vision_subtitle: "ಗಡಿಗಳಾಚೆದ ಹವ್ಯಾಸಗಳನ್ನು ಬೇಸೆಯುವುದು",
    vision_title_1: "ನಮ್ಮ ದೃಷ್ಟಿಕೋನ: ಏಕೆಂದರೆ ದೂರವು ಎಂದಿಗೂ",
    vision_title_s: "ಮಹೋನ್ನತ ಆಚರಣೆಯ ಬೆಳಕನ್ನು ಮಂದಗೊಳಿಸಬಾರದು",
    vision_desc: "2024ರಲ್ಲಿ ಸ್ಥಾಪನೆಯಾದ Célèbre ಒಂದು ಸರಳ ಆಲೋಚನೆಯಿಂದ ಮೂಡಿಬಂದಿದೆ: ಭೌತಿಕ ಗಡಿಗಳು ನಮ್ಮನ್ನು ಪ್ರತ್ಯೇಕಿಸಿದರೂ, ಭಾವನಾತ್ಮಕ ಸಂಬಂಧಗಳು ಅದ್ಭುತ ನೆನಪುಗಳನ್ನು ಬಯಸುತ್ತವೆ. ದೂರದ ಮೈಲಿಗಳಾಚೆ ಇರುವ ನಿಮ್ಮ ಕುಟುಂಬ ಮತ್ತು ಸ್ನೇಹಿತರಿಗಾಗಿ ಆನಂದಬಾಷ್ಪಗಳು ಮತ್ತು ಸಮ್ಮೋಹಕ ಸರ್ಪ್ರೈಸ್ ಕ್ಯಾಪ್ಸೂಲ್‌ಗಳನ್ನು ರಚಿಸುವ ಐಷಾರಾಮಿ ಡಿಜಿಟಲ್ ಸಂಸ್ಥೆ ನಾವಾಗಿದ್ದೇವೆ.",
    what_title: "Célèbre ಎಂದರೇನು?",
    what_p1: "Célèbre ಎಂಬುದು ಪ್ರೀತಿಪಾತ್ರರಿಗಾಗಿ ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಅದ್ಭುತ ಸರ್ಪ್ರೈಸ್ ಆಚರಣೆಗಳನ್ನು ನಿಗದಿಪಡಿಸಲು ಅನುವು ಮಾಡಿಕೊಡುವ ಒಂದು ಸುಂದರ ಡಿಜಿಟಲ್ ಮೆಮರಿ ಕ್ಯಾಪ್ಸೂಲ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಆಗಿದೆ.",
    what_p2: "ಸಾಮಾನ್ಯ ಪಠ್ಯ ಸಂದೇಶ ಅಥವಾ ಹಳೆಯ ಕಾರ್ಡ್ ಕಳುಹಿಸುವ ಬದಲು, ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಆಡಿಯೋ/ವಿಡಿಯೋ ಟ್ರ್ಯಾಕ್‌ಗಳು, ಫೋಟೋ ಕೊಲಾಜ್‌ಗಳು, ಇಂಟರಾಕ್ಟಿವ್ ಕೌಂಟ್‌ಡೌನ್ ಟೈಮರ್‌ಗಳ ಮೂಲಕ ಜೀವಂತ ಮಧುರ ಪ್ರವಾಸ ಸೃಷ್ಟಿಸಬಹುದು.",
    delivery_orchestration: "ವಿತರಣೆಯ ಯೋಜನೆ:",
    step_1_title: "ನಿಗದಿ ಮತ್ತು ವಿವರ:",
    step_1_desc: "ಸ್ವೀಕೃತದಾರರ ಸ್ಥಳೀಯ ಟೈಮ್‌ಝೋನ್ ನಮೂದಿಸಿ, ವಿಶೇಷ ದಿನ ಹಾಗೂ ನಿಮಗಿಷ್ಟವಾದ ಕೋರ್ ಪ್ಯಾಕೇಜ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    step_2_title: "ವಿಷಯ ಜೋಡಣೆ:",
    step_2_desc: "ಹಾರ್ದಿಕ ನೆನಪುಗಳನ್ನು ಸುಂದರ ಟೆಂಪ್ಲೇಟ್‌ಗಳಲ್ಲಿ ಬರೆಯಿರಿ, ಫೋಟೋಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಹಾಗೂ ಹಿನ್ನೆಲೆ ಸಂಗೀತ ಸೇರಿಸಿ.",
    step_3_title: "ಆಶ್ಚರ್ಯದ ಕ್ಷಣ:",
    step_3_desc: "ನಿಗದಿತ ಸಮಯದಲ್ಲಿ ಅವರು ಲಿಂಕ್ ಪಡೆಯುತ್ತಾರೆ. ಅದನ್ನು ತೆರೆದಾಗ ಹಿನ್ನೆಲೆಯಲ್ಲಿ ಸಂಗೀತ ಹಾಗೂ ಪರದೆಯ ಮೇಲೆ ಮಾಂತ್ರಿಕ ಕನ್ಫೆಟ್ಟಿ ಸಿಡಿಯುತ್ತದೆ.",
    value_1_title: "ಭಾವನಾತ್ಮಕತೆಗೆ ಆದ್ಯತೆ",
    value_1_desc: "ನಾವು ಸಾಧಾರಣ ಕಾರ್ಡ್‌ಗಳನ್ನು ತಿರಸ್ಕರಿಸುತ್ತೇವೆ. ನಮ್ಮ ಸರ್ವರ್ ಸಿಸ್ಟಮ್ಸ್ ಪ್ರತಿ ಸುಂದರ ಸಂಬಂಧಕ್ಕೆ ತಕ್ಕಂತೆ ಗ್ಯಾಲರಿ ರೂಪಿಸುತ್ತದೆ.",
    value_2_title: "ವಿಶ್ವವ್ಯಾಪಿ ಸೇವೆ",
    value_2_desc: "ಸಿಯಾಟಲ್‌ನಿಂದ ಮುಂಬೈವರೆಗೆ, ಲಂಡನ್‌ನಿಂದ ಸಿಡ್ನಿವರೆಗೆ — ಇದು ಎಲ್ಲಾ ಟೈಮ್‌ಝೋನ್ ಹಾಗೂ ಅಂತರರಾಷ್ಟಯ ಪಾವತಿಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ.",
    value_3_title: "ಅಪ್ರತಿಮ ಕಲೆ",
    value_3_desc: "ಪ್ರಮಾಣಿತ ಮತ್ತು ಪ್ರೀಮಿಯಂ ಆಯ್ಕೆಗಳು ಕ್ಲಾಸಿಕಲ್ ಸಂಗೀತ ಹಾಗೂ ಅತ್ಯಾಧುನಿಕ ಡಿಜಿಟಲ್ ಫ್ರೇಮ್‌ಗಳನ್ನು ಮುಕ್ತಗೊಳಿಸುತ್ತವೆ.",
    ai_guidance: "AI ನೆರವಿನ ಮಾನವ ಕ್ಯೂರೇಶನ್",
    custom_milestone_1: "ನಿಮ್ಮ ಕಸ್ಟಮ್",
    custom_milestone_2: "ಸರ್ಪ್ರೈಸ್ ಮೈಲುಗಲ್ಲು ರೂಪುಗೊಳಿಸಿ",
    custom_desc: "Célèbre ಸಹಾಯದಿಂದ ನೆನಪುಗಳು ಸುರಕ್ಷಿತವಾಗಿರುತ್ತವೆ. ನಿಗದಿತ ದಿನದಂದು ಸ್ವೀಕೃತದಾರರು ಅತ್ಯಾಕರ್ಷಕ ಡಿಜಿಟಲ್ ಪೆಟ್ಟಿಗೆ ತೆರೆದು ಸಂಭ್ರಮಿಸುತ್ತಾರೆ.",
    sponsor_btn: "ಇಂದೇ ಒಂದು ಕ್ಯಾಪ್ಸೂಲ್ ಪ್ರಾಯೋಜಿಸಿ",
    capsules_delivered: "ಸೇರಿಸಲಾದ ಕ್ಯಾಪ್ಸೂಲ್ಸ್",
    countries_active: "ಸಕ್ರಿಯ ದೇಶಗಳು",
    tear_rate: "ಆನಂದಬಾಷ್ಪಗಳ ಪ್ರಮಾಣ ✨",
    concierge_active: "ಸೇವೆಯಲ್ಲಿರುವ ಕನ್ಸಿಯರ್ಜ್",
    creators_title: "Célèbre ಪ್ರವರ್ತಕರು"
  }
};

export default function AboutPage({ onNavigate, language }: AboutPageProps) {
  const at = ABOUT_TRANSLATIONS[language] || ABOUT_TRANSLATIONS.en;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-16 animate-fade-in" id="about_page_root">
      
      {/* BRAND VISION PROPORTIONS */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-gold-dark block font-semibold">
          {at.vision_subtitle}
        </span>
        <h1 className="font-serif text-3.5xl sm:text-5.5xl font-light text-charcoal leading-tight">
          {at.vision_title_1} <br />
          <span className="italic font-normal text-gold">{at.vision_title_s}</span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-4" />
        <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed pt-2 italic">
          {at.vision_desc}
        </p>
      </div>

      {/* DETAILED APP EXPLANATION SECTION */}
      <div className="bg-blush/35 border border-gold/15 p-8 sm:p-12 rounded-[32px] space-y-8" id="detailed_app_explanation">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
              {at.what_title}
            </h2>
            <p className="font-sans text-sm text-charcoal/80 leading-relaxed">
              {at.what_p1}
            </p>
            <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
              {at.what_p2}
            </p>
          </div>
          <div className="space-y-4 bg-white/70 p-6 rounded-[24px] border border-gold/10">
            <h3 className="font-serif text-lg font-bold text-gold-dark">{at.delivery_orchestration}</h3>
            <ul className="space-y-3 font-sans text-xs text-charcoal/80">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#F0E4DA] text-gold-dark font-bold font-serif flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">1</span>
                <span><strong>{at.step_1_title}</strong> {at.step_1_desc}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#F0E4DA] text-gold-dark font-bold font-serif flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">2</span>
                <span><strong>{at.step_2_title}</strong> {at.step_2_desc}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#F0E4DA] text-gold-dark font-bold font-serif flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">3</span>
                <span><strong>{at.step_3_title}</strong> {at.step_3_desc}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CORE HUMAN VALUES GRID */}
      <div className="grid sm:grid-cols-3 gap-8" id="core_values_grid">
        <div className="bg-white border border-gold/15 p-8 rounded-[32px] space-y-3 capsule-shadow text-center" id="value_emotional">
          <div className="w-12 h-12 bg-[#F0E4DA] flex items-center justify-center rounded-full border border-gold/20 mx-auto text-gold-dark">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-charcoal">{at.value_1_title}</h3>
          <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
            {at.value_1_desc}
          </p>
        </div>

        <div className="bg-white border border-gold/15 p-8 rounded-[32px] space-y-3 capsule-shadow text-center" id="value_universal">
          <div className="w-12 h-12 bg-[#F0E4DA] flex items-center justify-center rounded-full border border-gold/20 mx-auto text-gold-dark">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-charcoal">{at.value_2_title}</h3>
          <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
            {at.value_2_desc}
          </p>
        </div>

        <div className="bg-white border border-gold/15 p-8 rounded-[32px] space-y-3 capsule-shadow text-center" id="value_concierge">
          <div className="w-12 h-12 bg-[#F0E4DA] flex items-center justify-center rounded-full border border-gold/20 mx-auto text-gold-dark">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-charcoal">{at.value_3_title}</h3>
          <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
            {at.value_3_desc}
          </p>
        </div>
      </div>

      {/* HOW WE WORK FLOW */}
      <div className="bg-white text-charcoal rounded-[32px] p-8 md:p-12 border border-gold/20 capsule-shadow relative overflow-hidden" id="concept_methodology_card">
        <div className="absolute inset-0 bg-gold-shimmer opacity-30 pointer-events-none" />
        
        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-4">
            <span className="font-sans text-[10px] text-gold-dark uppercase tracking-widest font-bold block">{at.ai_guidance}</span>
            <h2 className="font-serif text-2.5xl sm:text-4xl font-light leading-tight">
              {at.custom_milestone_1} <br />
              <span className="text-gold italic font-normal">{at.custom_milestone_2}</span>
            </h2>
            <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
              {at.custom_desc}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('plan-event')}
                className="bg-[#D4AF37] hover:bg-[#1A1A2E] text-white px-6 py-3.5 rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-colors flex items-center space-x-1.5 shadow-md shadow-[#D4AF37]/10"
                id="about_plan_btn"
              >
                <span>{at.sponsor_btn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Statistics milestones */}
          <div className="grid grid-cols-2 gap-4" id="stats_panel_about">
            <div className="bg-blush/60 border border-gold/20 p-5 rounded-2xl text-center space-y-1">
              <span className="font-serif text-3xl font-bold text-gold-dark">45K+</span>
              <span className="font-sans text-[10px] text-charcoal/60 uppercase tracking-wider block font-semibold">{at.capsules_delivered}</span>
            </div>
            <div className="bg-blush/60 border border-gold/20 p-5 rounded-2xl text-center space-y-1">
              <span className="font-serif text-3xl font-bold text-gold-dark">140+</span>
              <span className="font-sans text-[10px] text-charcoal/60 uppercase tracking-wider block font-semibold">{at.countries_active}</span>
            </div>
            <div className="bg-blush/60 border border-gold/20 p-5 rounded-2xl text-center space-y-1">
              <span className="font-serif text-3xl font-bold text-gold-dark">99.4%</span>
              <span className="font-sans text-[10px] text-charcoal/60 uppercase tracking-wider block font-semibold">{at.tear_rate}</span>
            </div>
            <div className="bg-blush/60 border border-gold/20 p-5 rounded-2xl text-center space-y-1">
              <span className="font-serif text-3xl font-bold text-gold-dark">24/7</span>
              <span className="font-sans text-[10px] text-charcoal/60 uppercase tracking-wider block font-semibold">{at.concierge_active}</span>
            </div>
          </div>
        </div>
      </div>

      {/* LEAD CONCIERGES TEAM DISPLAY */}
      <div className="space-y-6 text-center" id="team_showcase_section">
        <h2 className="font-serif text-2.5xl text-charcoal font-semibold">{at.creators_title}</h2>
        
        <div className="grid sm:grid-cols-3 gap-6 pt-3" id="team_card_grid">
          {[
            { 
              name: 'Harshitha', 
              title: 'Photographer', 
              link: 'https://www.linkedin.com/in/harshitha-cheruku?utm_source=share_via&utm_content=profile&utm_medium=member_android',
              pic: '/creator-harshitha.png' 
            },
            { 
              name: 'Sai Subhash', 
              title: 'Event Manager', 
              link: 'https://www.linkedin.com/in/sai-subhash-reddy-vemireddy/',
              pic: '/creator-saisubhash.png' 
            },
            { 
              name: 'Sowmya', 
              title: 'Lead Designer', 
              link: 'https://www.linkedin.com/in/yetti-sowmya',
              pic: '/creator-sowmya.png' 
            },
            { 
              name: 'KV Mohan Reddy', 
              title: 'Technical Director', 
              link: 'https://www.linkedin.com/in/k-v-mohan-reddy-75798b357?utm_source=share_via&utm_content=profile&utm_medium=member_android',
              pic: '/creator-mohan.png' 
            },
            { 
              name: 'Sujatha', 
              title: 'Creative Director', 
              link: 'https://www.linkedin.com/in/s-sujatha?utm_source=share_via&utm_content=profile&utm_medium=member_android',
              pic: '/creator-sujatha.png' 
            },
            { 
              name: 'Jeevan Teja', 
              title: 'Operations Manager', 
              link: 'https://www.linkedin.com/in/jeevan-teja-36329825a?utm_source=share_via&utm_content=profile&utm_medium=member_android',
              pic: '/creator-jeevan.png' 
            },
            { 
              name: 'Nisha', 
              title: 'Content Strategist', 
              link: 'https://www.linkedin.com/in/kolkar-nisha-888995282/',
              pic: '/creator-nisha.png' 
            }
          ].map((member, midx) => (
            <div key={midx} className="bg-white border border-gold/15 p-6 rounded-[24px] capsule-shadow space-y-4 hover:border-gold/30 transition-all duration-300" id={`team_card_${midx}`}>
              <a href={member.link} target="_blank" rel="noopener noreferrer" className="block w-24 h-24 rounded-full overflow-hidden mx-auto border-[3px] border-gold relative shadow-sm hover:scale-105 transition-transform duration-300">
                <img src={member.pic} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </a>
              <div className="space-y-0.5">
                <a href={member.link} target="_blank" rel="noopener noreferrer" className="font-serif text-base font-bold text-charcoal block hover:text-gold transition-colors">{member.name}</a>
                <span className="font-sans text-[10px] uppercase text-gold-dark block tracking-wider font-bold">{member.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
