/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Gift, Compass, Send, CheckCircle2, ChevronRight, MessageSquare, Star, Sparkles, Clock, Image as ImageIcon, Heart, Palette, Plus, Trash, Calendar, ArrowRight, Shield, Activity } from 'lucide-react';
import { PACKAGES } from '../data';
import { PackageType, EventType, User } from '../types';
import { TRANSLATIONS, LanguageCode } from '../translations';

interface LandingPageProps {
  user?: User | null;
  language?: LanguageCode;
  onStartPlanning: () => void;
  onSelectPackage: (pkg: PackageType) => void;
  onNavigate: (page: string) => void;
  onSelectOccasion: (occType: EventType) => void;
}

interface ScheduledUpdate {
  id: string;
  targetEvent: string;
  updateAction: string;
  dateTime: string;
  status: 'Pending' | 'Active' | 'Dispatched';
}

export default function LandingPage({ user, language = 'en', onStartPlanning, onSelectPackage, onNavigate, onSelectOccasion }: LandingPageProps) {
  
  // Custom logged-in package interactive playground states
  const [selectedBasePkg, setSelectedBasePkg] = useState<'BASIC' | 'STANDARD' | 'PREMIUM'>('STANDARD');
  const [addonFrames, setAddonFrames] = useState(false);
  const [addonBloodDots, setAddonBloodDots] = useState(false);
  const [addonSketches, setAddonSketches] = useState(false);
  const [addonGoodImagesTier, setAddonGoodImagesTier] = useState<'NONE' | 'BASIC_IMG' | 'PREMIUM_IMG'>('BASIC_IMG');

  // Scheduler inputs
  const [scheduledUpdates, setScheduledUpdates] = useState<ScheduledUpdate[]>([
    { id: 'upd_1', targetEvent: 'Mom\'s 60th Golden Jubilee', updateAction: 'Inject Handcrafted Portrait Sketches', dateTime: '2026-06-01T20:00', status: 'Pending' },
    { id: 'upd_2', targetEvent: 'Sister\'s Anniversary Capsule', updateAction: 'Swap to Midnight Velvet Frame Borders & Add Blood dots', dateTime: '2026-06-12T12:00', status: 'Pending' }
  ]);
  const [targetEventInput, setTargetEventInput] = useState('');
  const [customActionInput, setCustomActionInput] = useState('Inject Handcrafted Portrait Sketches');
  const [updateDateTimeInput, setUpdateDateTimeInput] = useState('');

  // Active custom quote slider index
  const [quoteIndex, setQuoteIndex] = useState(0);

  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const quotes = [
    { text: t.quote_1, author: t.quote_author_1 },
    { text: t.quote_2, author: t.quote_author_2 },
    { text: t.quote_3, author: t.quote_author_3 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleAddUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetEventInput || !updateDateTimeInput) return;
    const item: ScheduledUpdate = {
      id: 'upd_' + Date.now().toString(36),
      targetEvent: targetEventInput,
      updateAction: customActionInput,
      dateTime: updateDateTimeInput,
      status: 'Pending'
    };
    setScheduledUpdates([item, ...scheduledUpdates]);
    setTargetEventInput('');
    setUpdateDateTimeInput('');
  };

  const handleDeleteUpdate = (id: string) => {
    setScheduledUpdates(scheduledUpdates.filter(u => u.id !== id));
  };

  const getCalculatedPrice = () => {
    let base = 500;
    if (selectedBasePkg === 'STANDARD') base = 1500;
    if (selectedBasePkg === 'PREMIUM') base = 3500;

    let addons = 0;
    if (addonFrames) addons += 500;
    if (addonBloodDots) addons += 500;
    if (addonSketches) addons += 500;

    if (addonGoodImagesTier === 'BASIC_IMG') addons += 500;
    if (addonGoodImagesTier === 'PREMIUM_IMG') addons += 1500;

    return base + addons;
  };

  const scrollToOccasions = () => {
    const sec = document.getElementById('occasions-sec');
    if (sec) {
      sec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const EVENT_TYPES = [
    {
      title: language === 'te' ? 'పుట్టినరోజు' : language === 'hi' ? 'जन्मदिन' : language === 'kn' ? 'ಜನ್ಮದಿನ' : 'Birthday',
      type: 'Birthday',
      image: '/birthday-card.jpg',
      desc: language === 'te' ? 'మైలురాయి లాంటి అద్భుతమైన జ్ఞాపకం' : language === 'hi' ? 'एक यादगार मेमोरी कैप्सूल तैयार करें' : language === 'kn' ? 'ಮೈಲಿಗಲ್ಲಿನ ಸವಿನೆನಪುಗಳ ಕ್ಯಾಪ್ಸೂಲ್ ರಚಿಸಿ' : 'Curate a milestone memory capsule',
      color: 'from-pink-500/10 to-red-500/10'
    },
    {
      title: language === 'te' ? 'మరణం' : language === 'hi' ? 'शोक संदेश' : language === 'kn' ? 'ಮರಣ' : 'Death Event',
      type: 'DeathEvent',
      image: '/death-card.png',
      desc: language === 'te' ? 'శాశ్వత జ్ఞాపకాలను గౌరవించడం' : language === 'hi' ? 'प्रियजनों की स्थायी यादों को संजोना' : language === 'kn' ? 'ಶಾಶ್ವತ ನೆನಪುಗಳನ್ನು ಗೌರವಿಸುವುದು' : 'Honoring the timeless legacy of a loved one',
      color: 'from-gray-500/10 to-slate-500/10'
    },
    {
      title: language === 'te' ? 'వార్షికోత్సవం' : language === 'hi' ? 'शादी की सालगिरह' : language === 'kn' ? 'ವಾರ್ಷಿಕೋತ್ಸವ' : 'Anniversary',
      type: 'Anniversary',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=300&q=80',
      desc: language === 'te' ? 'డిజిటల్ ప్రేమ కాలక్రమం మైళ్ళ దూరం దాటి' : language === 'hi' ? 'मीलों दूर रहकर भी डिजिटल प्रेम गाथा' : language === 'kn' ? 'ದೂರದ ಪ್ರೇಮ ಪ್ರಣಯದ ಕಾಲಾನುಕ್ರಮ ದೃಶ್ಯ' : 'A digital romance timeline across miles',
      color: 'from-amber-500/10 to-gold/10'
    },
    {
      title: language === 'te' ? 'గ్రాడ్యుయేషన్' : language === 'hi' ? 'ग्रेजुएशन' : language === 'kn' ? 'ಪದವಿ ಪ್ರದಾನ' : 'Graduation',
      type: 'Graduation',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=300&q=80',
      desc: language === 'te' ? 'విజయాలు మరియు గర్వించదగిన క్షణాలు' : language === 'hi' ? 'उपलब्धियों और गर्व के पल मनाएं' : language === 'kn' ? 'ಸಾಧನೆ ಮತ್ತು ಹೆಮ್ಮೆಯ ಕ್ಷಣಗಳನ್ನು ಆಚರಿಸಿ' : 'Celebrate achievements and pride',
      color: 'from-blue-500/10 to-indigo-500/10'
    },
    {
      title: language === 'te' ? 'ప్రేమికుల రోజు' : language === 'hi' ? 'वेलेंटाइन डे' : language === 'kn' ? 'ಪ್ರೇಮಿಗಳ ದಿನ' : 'Valentine’s Day',
      type: 'Valentine',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80',
      desc: language === 'te' ? 'లగ్జరీ లేఖలు మరియు మధుర రాగాలు' : language === 'hi' ? 'शानदार प्रेम पत्र और संगीत भेजें' : language === 'kn' ? 'ಷಾಹಿ ಪತ್ರಗಳು ಮತ್ತು ಸಂಗೀತ ಕಳುಹಿಸಿ' : 'Send luxury letters & music coordinates',
      color: 'from-rose-500/10 to-pink-500/10'
    },
    {
      title: language === 'te' ? 'ఉద్యోగ ప్రమోషన్' : language === 'hi' ? 'पदोन्नति' : language === 'kn' ? 'ಉದ್ಯೋಗ ಪ್ರಮೋಷನ್' : 'Promotion',
      type: 'Promotion',
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=300&q=80',
      desc: language === 'te' ? 'కార్పొరేట్ ఎదుగుదల మరియు విజయాలు' : language === 'hi' ? 'आधिकारिक पदोन्नति का जश्न मनाएं' : language === 'kn' ? 'ಉದ್ಯೋಗದ ಪ್ರಗತಿ ಮತ್ತು ಯಶಸ್ಸನ್ನು ಗುರುತಿಸಿ' : 'Mark corporate rise and accomplishments',
      color: 'from-yellow-500/10 to-orange-500/10'
    },
    {
      title: language === 'te' ? 'సీమంతం' : language === 'hi' ? 'गोद भराई' : language === 'kn' ? 'ಸೀಮಂತ ಆಚರಣೆ' : 'Baby Shower',
      type: 'BabyShower',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=300&q=80',
      desc: language === 'te' ? 'చిన్నారి పాదాలకు మధుర స్వరాలతో స్వాగతం' : language === 'hi' ? 'प्यारी यादों के साथ नन्हे कदमों का स्वागत करें' : language === 'kn' ? 'ಮಗುವಿನ ಹೆಜ್ಜೆಗೆ ಸಿಹಿ ನುಡಿಗಳಿಂದ ಸ್ವಾಗತಿಸಿ' : 'Welcome tiny footsteps with sweet notes',
      color: 'from-teal-500/10 to-cyan-500/10'
    },
    {
      title: language === 'te' ? 'పాప మొదటి పుట్టినరోజు' : language === 'hi' ? 'पहला जन्मदिन' : language === 'kn' ? 'ಮಗುವಿನ 1ನೇ ಜನ್ಮದಿನ' : "Baby's 1st Birthday",
      type: 'BabyFirstBirthday',
      image: '/baby-first-birthday-card.jpg',
      desc: language === 'te' ? 'చిన్నారి మొదటి పుట్టినరోజు ఆనందం' : language === 'hi' ? 'नन्ही खुशी का पहला संजोया हुआ साल' : language === 'kn' ? 'ಪುಟ್ಟ ಕಂದನ ಮೊದಲ ವರ್ಷದ ಸಂತಸ ಸವಿಯಿರಿ' : 'Honor the first circular orbit of your tiny joy',
      color: 'from-emerald-500/10 to-green-500/10'
    },
    {
      title: language === 'te' ? 'మొదటి ఉద్యోగం' : language === 'hi' ? 'पहली नौकरी' : language === 'kn' ? 'ಮೊದಲ ಉದ್ಯೋಗ' : 'First Job',
      type: 'FirstJob',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=300&q=80',
      desc: language === 'te' ? 'కెరీర్ మైలురాయి మరియు సరికొత్త ఆరంభం' : language === 'hi' ? 'करियर की शुरुआत और नए सफर का जश्न' : language === 'kn' ? 'ವೃತ್ತಿಜೀವನ ಮತ್ತು ಹೊಸ ಆರಂಭ ಆಚರಿಸಿ' : 'Celebrate career liftoff and fresh beginnings',
      color: 'from-purple-500/10 to-pink-500/10'
    },
    {
      title: language === 'te' ? 'గృహప్రవేశం' : language === 'hi' ? 'गृह प्रवेश' : language === 'kn' ? 'ಗೃಹಪ್ರವೇಶ' : 'House Warming',
      type: 'HouseWarming',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80',
      desc: language === 'te' ? 'కొత్త నివాసానికి దీవెనలు' : language === 'hi' ? 'नए आशियाने के लिए दिव्य शुभकामनाएं' : language === 'kn' ? 'ಮಹೋನ್ನತ ಹಸಿರು ಮನೆಗೆ ಶುಭ ಹಾರೈಸಿ' : 'Bestow blessings upon a majestic new sanctuary',
      color: 'from-indigo-500/10 to-sky-500/10'
    },
    {
      title: language === 'te' ? 'పండుగలు' : language === 'hi' ? 'त्योहार' : language === 'kn' ? 'ಹಬ್ಬ ಹರಿದಿನಗಳು' : 'Festivals',
      type: 'Festival',
      image: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&w=300&q=80',
      desc: language === 'te' ? 'అనుకూల దైవిక ఆశీస్సులు శ్రేయస్సు' : language === 'hi' ? 'त्योहारों पर दिव्य आशीर्वाद साझा करें' : language === 'kn' ? 'ದೈವಿಕ ಆಶೀರ್ವಾದದ ಕಿರಣ ಕಳುಹಿಸಿ' : 'Send customized divine blessings and light coordinates',
      color: 'from-amber-500/10 to-yellow-500/10'
    },
    {
      title: language === 'te' ? 'కస్టమ్ సర్‌ప్రైజ్ వేడుక' : language === 'hi' ? 'कस्टम सरप्राइज' : language === 'kn' ? 'ಕಸ್ಟಮ್ ಸರ್ಪ್ರೈಸ್' : 'Custom Surprise Event',
      type: 'CustomSurprise',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80',
      desc: language === 'te' ? 'ఆశ్చర్యకరమైన క్షణాలను స్వయంగా రూపొందించండి' : language === 'hi' ? 'अपनी पसंद के अनूठे सरप्राइज को खुद डिजाइन करें' : language === 'kn' ? 'ನಿಮ್ಮದೇ ಶೈಲಿಯ ಆಶ್ಚರ್ಯಕರ ದೃಶ್ಯ ವಿನ್ಯಾಸಗೊಳಿಸಿ' : 'Tailor-make isochronous visual coordinates of your choice',
      color: 'from-violet-500/10 to-rose-500/10'
    }
  ];

  const HOW_IT_WORKS = [
    {
      step: '01',
      title: language === 'te' ? 'మీ ఆశ్చర్యకరమైన ప్లాన్ సిద్ధం చేయండి' : language === 'hi' ? 'अपने सरप्राइज की योजना बनाएं' : language === 'kn' ? 'ನಿಮ್ಮ ಆಶ್ಚರ್ಯಕರ ಪ್ಲಾನ್ ನಿಗದಿಪಡಿಸಿ' : 'Plan Your surprise',
      desc: language === 'te' ? 'స్వీకర్త సమయ మండలం, మీ సంబంధాలు మరియు ఖచ్చితమైన సమయాన్ని ఎంపిక చేయండి.' : language === 'hi' ? 'प्राप्तकर्ता का टाइमज़ोन, उनके साथ संबंध दर्ज करें और डिलीवरी का सही घंटा निर्धारित करें।' : language === 'kn' ? 'ಸ್ವೀಕರಿಸುವವರ ಟೈಮ್‌ಝೋನ್, ಸಂಬಂಧಗಳು ಮತ್ತು ನಿಖರವಾದ ತಲುಪಿಸುವ ಸಮಯವನ್ನು ನಿಗದಿಪಡಿಸಿ।' : 'Enter recpient timezone, relationships, and schedule the exact hour of delivery.',
      icon: <Clock className="w-6 h-6 text-gold" />
    },
    {
      step: '02',
      title: language === 'te' ? 'AI కాపీరైటర్‌తో అద్భుతమైన లేఖలు' : language === 'hi' ? 'एआई राइटिंग से सजाएं' : language === 'kn' ? 'AI ಬರಹಗಾರರೊಂದಿಗೆ ಚಮತ್ಕಾರ' : 'Craft with AI Copywriter',
      desc: language === 'te' ? 'మా జెమిని-ఆధారిత కాపీరైటర్ ప్రియమైనవారి హృదయాలను తాకే కస్టమ్ లేఖలను సిద్ధం చేస్తుంది.' : language === 'hi' ? 'हमारे जेमिनी संचालित राइटर को अपने प्रियजनों के लिए दिल छू लेने वाले कस्टमाइज्ड पत्र तैयार करने दें।' : language === 'kn' ? 'ನಮ್ಮ ಜೆಮಿನಿ-ಚಾಲಿತ AI ಮೂಲಕ ನಿಮ್ಮ ಪ್ರೀತಿಪಾತ್ರ ಹೃದಯಸ್ಪರ್ಶಿ ಪತ್ರಗಳ ಕರಡನ್ನು ಸಿದ್ಧಪಡಿಸಿ।' : 'Let our Gemini-powered copywriter draft custom, heartwarming letters for your loved one.',
      icon: <Sparkles className="w-6 h-6 text-gold" />
    },
    {
      step: '03',
      title: language === 'te' ? 'లగ్జరీ ప్యాకేజీని ఎంచుకోండి' : language === 'hi' ? 'शानदार पैकेज चुनें' : language === 'kn' ? 'ಲಕ್ಷುರಿ ಪ್ಯಾಕೇಜ್ ಆಯ್ಕೆಮಾಡಿ' : 'Select a luxury package',
      desc: language === 'te' ? 'బేసిక్ షెడ్యూల్, స్టాండర్డ్ మీడియా గ్యాలరీలు లేదా ప్రీమియం మెమరీ గదులను ఎంచుకోండి.' : language === 'hi' ? 'मूल ई-कार्ड, मीडिया दीर्घाओं, या प्रीमियम मल्टी-यूज़र मेमोरी रूम में से चुनें।' : language === 'kn' ? 'ಬೇಸಿಕ್ ಕಾರ್ಡ್, ಪ್ರಮಾಣಿತ ಗ್ಯಾಲರಿಗಳು ಅಥವಾ ಪ್ರೀಮಿಯಂ ಮೆಮರಿ ಕೊಠಡಿಗಳನ್ನು ಆರಿಸಿ।' : 'Choose basic schedule, standard media galleries, or premium multi-user memory rooms.',
      icon: <Gift className="w-6 h-6 text-gold" />
    },
    {
      step: '04',
      title: language === 'te' ? 'దూరాలను అధిగమించే బంధం' : language === 'hi' ? 'दूरी मिटाना आसान' : language === 'kn' ? 'ದೂರದ ಬೆಸುಗೆ' : 'Bridging the Distance',
      desc: language === 'te' ? 'ఆ ప్రత్యేక రోజున మేము ఆటోమేటిక్‌గా ఒక సురక్షితమైన, ఇంటరాక్టివ్ రివీల్ లింక్‌ను పంపుతాము.' : language === 'hi' ? 'हम जादुई अनुभव को प्रकट करने के लिए उनके विशेष दिन पर एक सुरक्षित और लिंक भेजते हैं।' : language === 'kn' ? 'ನಾವು ಅವರ ವಿಶೇಷ ದಿನದಂದು ಮ್ಯಾಜಿಕ್ ತೆರೆದಿಡಲು ಸುರಕ್ಷಿತ, ಸಂವಾದಾತ್ಮಕ ರಿವೀಲ್ ಲಿಂಕ್ ಅನ್ನು ಕಳುಹಿಸುತ್ತೇವೆ।' : 'We automatically send a secure, interactive Reveal Link on their special day to unfold the magic.',
      icon: <Send className="w-6 h-6 text-gold" />
    }
  ];

  const TESTIMONIALS = [
    {
      quote: language === 'te' 
        ? "నా భాగస్వామి మా వార్షికోత్సవం కోసం Célèbre ని పంపినప్పుడు, నేను లండన్ ఫ్లాట్‌లో కూర్చుని నిజంగా ఎమోషనల్ అయ్యాను. అకౌస్టిక్ సంగీతం, చేతితో రాసిన లేఖలు మరియు మమ్మల్ని ఒకే దగ్గర నిలబెట్టాయి."
        : language === 'hi'
        ? "जब मेरे साथी ने हमारे वर्षगांठ पर Célèbre के माध्यम से सरप्राइज भेजा, तो मैं खुशी से झूम उठा। वह मधुर संगीत, हस्तलिखित पत्र और सुंदर तस्वीरों के कोलाज ने दिल जीत लिया।"
        : language === 'kn'
        ? "ನನ್ನ ಸಂಗಾತಿ ವಾರ್ಷಿಕೋತ್ಸವಕ್ಕಾಗಿ Célèbre ಕಳುಹಿಸಿದಾಗ, ನಾನು ಲಂಡನ್ ಫ್ಲಾಟ್‌ನಲ್ಲಿ ಕುಳಿತು ಆನಂದಭಾಷ್ಪ ಸುರಿಸಿದೆ. ಸುಂದರ ಸಂಗೀತ, ಕೈಬರಹದ ಪತ್ರಗಳು ನಾವಿಬ್ಬರು ಜೊತೆಯಾಗಿರುವಂತೆ ಭಾಸವಾಗಿಸಿತು."
        : "When my partner sent me Célèbre for our anniversary, I sat crying in my London flat standardly overwhelmed. The acoustic music, the handwritten letters, and our photo wall made me feel like he was right with me.",
      author: "Eleanor Sterling",
      loc: language === 'te' ? "లండన్, UK (భాగస్వామి న్యూయార్క్‌లో ఉన్నారు)" : language === 'hi' ? "लंदन, यूके (साथी न्यूयॉर्क में)" : language === 'kn' ? "ಲಂಡನ್, ಯುಕೆ (ಸಂಗಾತಿ ಎನ್‌ವೈಸಿಯಲ್ಲಿ)" : "London, UK (Partner in NYC)",
      rating: 5
    },
    {
      quote: language === 'te'
        ? "నేను బెంగుళూరు నుండి నా సోదరుడి గ్రాడ్యుయేషన్ కోసం ప్రీమియం మెమరీ క్యాప్సూల్‌ను ఏర్పాటు చేసాను. పది మంది కుటుంబ సభ్యులు తమ మనోహరమైన ఆడియో బ్లెస్సింగ్స్ అందించారు. కాలక్రమం అద్భుతంగా కుదిరింది."
        : language === 'hi'
        ? "मैंने बेंगलुरु से अपने भाई के ग्रेजुएशन के लिए प्रीमियम मेमोरी कैप्सूल बुक किया था। परिवार के दस सदस्यों ने वीडियो के जरिए शुभकामनाएं दीं। यह बेजोड़ अनुभव था, बिल्कुल अमूल्य।"
        : language === 'kn'
        ? "ನಾನು ಬೆಂಗಳೂರಿನಿಂದ ನನ್ನ ಸಹೋದರನ ಪದವಿ ಪ್ರದಾನಕ್ಕಾಗಿ ಪ್ರೀಮಿಯಂ ಮೆಮರಿ ಕ್ಯಾಪ್ಸೂಲ್ ವ್ಯವಸ್ಥೆ ಮಾಡಿದ್ದೆ. ಕುಟುಂಬದ ಹತ್ತು ಸದಸ್ಯರು ವಿಡಿಯೋ ಮೂಲಕ ಆಶೀರ್ವದಿಸಿದರು. ಇದು ಅತ್ಯದ್ಭುತ ಅನುಭವ."
        : "I arranged a Premium Memory Capsule for my Sibling's graduation from Bangalore. Ten family members added video blessings. The timeline compiled beautifully. Truly unique and priceless service.",
      author: "Subhash V.",
      loc: language === 'te' ? "శాన్ ఫ్రాన్సిస్కో, USA" : language === 'hi' ? "सैन फ्रांसिस्को, यूएसए" : language === 'kn' ? "ಸ್ಯಾನ್ ಫ್ರಾನ್ಸಿಸ್ಕೋ, ಯುಎಸ್ಎ" : "San Francisco, USA",
      rating: 5
    },
    {
      quote: language === 'te'
        ? "మా నాన్నగారి 60వ పుట్టినరోజు సందర్భంగా మేము దీనిని పంపాము. సాధారణ పుట్టినరోజు సందేశాలు యాంత్రికంగా అనిపించాయి. కానీ Célèbre మాకు శాశ్వత జ్ఞాపకాలను ఇచ్చే సామర్థ్యాన్ని ఇచ్చింది."
        : language === 'hi'
        ? "हमने अपने पिताजी को उनके 60वें जन्मदिन पर यह भेजा था। साधारण संदेशों की तुलना में Célèbre ने हमारे लिए एक बेहतरीन स्थायी गैलरी स्थापित करने की अनुमति दी। उत्तम प्रस्तुति!"
        : language === 'kn'
        ? "ನಮ್ಮ ತಂದೆಯವರ 60ನೇ ಜನ್ಮದಿನದಂದು ನಾವು ಇದನ್ನು ಕಳುಹಿಸಿದ್ದೇವೆ. ಸಾಮಾನ್ಯ ಶುಭಾಶಯ ಸಂದೇಶಗಳು ಸಾಧಾರಣ ಎನಿಸಿದರೆ Célèbre ಸದಾಕಾಲ ಉಳಿಯುವ ಸುಂದರ ಮೆಮೊರಿ ಕ್ಯಾಪ್ಸೂಲ್ ನೀಡಲು ಸಹಕರಿಸಿತು."
        : "We sent one to our Dad on his 60th birthday. Standard birthday messages felt cold. Célèbre allowed us to establish a lifetime archive that he opens almost every weekend. Stunning execution.",
      author: "Marcus Vance",
      loc: language === 'te' ? "సిడ్నీ, ఆస్ట్రేలియా" : language === 'hi' ? "सिडनी, ऑस्ट्रेलिया" : language === 'kn' ? "ಸಿಡ್ನಿ, ಆಸ್ಟ್ರೇಲಿಯಾ" : "Sydney, Australia",
      rating: 5
    }
  ];

  const localizedPackages = [
    {
      id: 'BASIC',
      name: t.tier_basic_title,
      priceUSD: 9,
      priceINR: 499,
      features: language === 'te' ? [
        'టెంప్లేట్ల నుండి అనుకూలీకరించిన రంగురంగుల డిజిటల్ ఈ-కార్డ్',
        'టార్గెట్ రిసిపియంట్‌కు నేరుగా షెడ్యూల్డ్ ఈమెయిల్ డెలివరీ',
        'నిజ-సమయ కౌంట్‌డౌన్ విడ్జెట్',
        '1 కస్టమ్ వ్యక్తిగత సందేశం (500 పదాల వరకు)',
        'ప్లానర్‌కు 1 రోజు ముందు ఆటోమేటిక్ ఈమెయిల్ అలర్ట్',
        'అద్భుతమైన క్లాసిక్ టైపోగ్రాఫిక్ డిజైన్ లేఅవుట్'
      ] : language === 'hi' ? [
        'टेंपलेट्स से कस्टमाइज्ड रंगीन डिजिटल ई-कार्ड',
        'प्राप्तकर्ता को सीधे ईमेल द्वारा व्यवस्थित डिलीवरी',
        'रीयल-टाइम काउंटडाउन विजेट',
        '1 कस्टमाइज्ड व्यक्तिगत संदेश (500 शब्दों तक)',
        'उत्सव योजनाकार को 1 दिन पहले ईमेल रिमाइंडर',
        'सुंदर क्लासिक टाइपोग्राफिक लेआउट'
      ] : language === 'kn' ? [
        'ಟೆಂಪ್ಲೇಟ್‌ಗಳಿಂದ ಸಿದ್ಧಪಡಿಸಿದ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಇ-ಕಾರ್ಡ್',
        'ಸ್ವೀಕರಿಸುವವರಿಗೆ ನೇರ ನಿಗದಿತ ಇಮೇಲ್ ವಿತರಣೆ',
        'ಅತ್ಯಾಕರ್ಷಕ ರಿಯಲ್-ಟೈಮ್ ಕೌಂಟ್‌ಡೌನ್ ವಿಜೆಟ್',
        '1 ಕಸ್ಟಮ್ ವೈಯಕ್ತಿಕ ಸಂದೇಶ (500 ಪದಗಳವರೆಗೆ)',
        'ಪ್ಲಾನರ್‌ಗೆ 1 ದಿನ ಮುಂಚಿತವಾಗಿ ಇಮೇಲ್ ನೆನಪೋಲೆ',
        'ಅದ್ಭುತ ಕ್ಲಾಸಿಕ್ ಡಿಜಿಟಲ್ ಮುದ್ರಣ ಲೇಔಟ್'
      ] : [
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
      name: t.tier_standard_title,
      priceUSD: 19,
      priceINR: 1499,
      popular: true,
      features: language === 'te' ? [
        'బేసిక్ ప్యాకేజీలో ఉన్నవన్నీ కలవు',
        'గరిష్టంగా 10 ఫోటోలతో అనుకూల ఫోటో కొల్లాజ్',
        'యానిమేటెడ్ సుందరమైన వీడియో గ్రీటింగ్ కార్డ్',
        'సున్నితమైన యానిమేషన్స్ గల ప్రత్యేక రివీల్ లింక్',
        'ఈమెయిల్ + SMS ద్వారా 3 రోజుల ముందు మరియు 1 రోజు ముందు అలర్ట్స్',
        'రివీల్ రోజు కోసం బ్యాక్‌గ్రౌండ్ మ్యూజిక్ ఎంపిక',
        'రోజ్ హార్ట్స్/స్పార్కిల్స్ ఎఫెక్ట్ గల ఇంటరాక్టివ్ కార్డ్'
      ] : language === 'hi' ? [
        'बेसिक पैकेज की सभी सुविधाएं शामिल हैं',
        'कस्टम फोटो कोलाज (10 तस्वीरों तक)',
        'एनिमेटेड सुंदर वीडियो विसिंग ग्रीटिंग कार्ड',
        'स्मूथ एनिमेशन के साथ समर्पित सरप्राइज रिवील लिंक पेज',
        'ईमेल + एसएमएस रिमाइंडर्स (3 दिन + 1 दिन पहले)',
        'रहस्योद्घाटन दिन के लिए मधुर पृष्ठभूमि संगीत संग्रह',
        'हार्ट और कंफ़ेद्दी प्रभाव के साथ सुंदर इंटरैक्टिव स्क्रीन'
      ] : language === 'kn' ? [
        'ಬೇಸಿಕ್ ಪ್ಯಾಕೇಜ್‌ನಲ್ಲಿರುವ ಎಲ್ಲಾ ಫೀಚರ್ಸ್‌ಗಳು',
        'ಕಸ್ಟಮ್ ಫೋಟೋ ಕೊಲಾಜ್ (ಗರಿಷ್ಠ 10 ಫೋಟೋಗಳು)',
        'ಅಲಂಕೃತ ಅನಿಮೇಟೆಡ್ ವಿಡಿಯೋ ಶುಭಾಶಯ ಪತ್ರ',
        'ಸ್ಮೂತ್ ಅನಿಮೇಷನ್ ಹೊಂದಿರುವ ವಿಶೇಷ ಕ್ಯುರೇಟೆಡ್ ಲಿಂಕ್',
        'ಇಮೇಲ್ + SMS ರಿಮೈಂಡರ್‌ಗಳು (3 ದಿನ + 1 ದಿನ ಮುಂಚೆ)',
        'ಹಿನ್ನೆಲೆಯಲ್ಲಿ ಪ್ಲೇ ಮಾಡಲು ಮಧುರ ಸಂಗೀತದ ಆಯ್ಕೆ',
        'ಹೃದಯದ ಸ್ಪಾರ್ಕಲ್ ಎಫೆಕ್ಟ್‌ಗಳೊಂದಿಗೆ ಸಂವಾದಾತ್ಮಕ ಅತ್ಯಾಕರ್ಷಕ ಪರದೆ'
      ] : [
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
      name: t.tier_premium_title,
      priceUSD: 49,
      priceINR: 3499,
      features: language === 'te' ? [
        'స్టాండర్డ్ ప్యాకేజీలో ఉన్నవన్నీ కలవు',
        'గరిష్టంగా 10 మంది బంధుమిత్రులు ఆడియో/వీడియో జోడించే గది',
        'మల్టీ-యూజర్ మెమరీ క్యాప్సూల్ యానిమేటెడ్ రివీల్ అనుభవం',
        'గ్లోబల్/నేషనల్ బ్రాండ్స్ ఈ-గిఫ్ట్ వోచర్ కోడ్స్',
        'కంబైన్డ్ మీడియా నుండి అందమైన జ్ఞాపకాల వీడియో మొంటేజ్',
        '24/7 ప్రాధాన్యత కలిగిన కస్టమర్ సపోర్ట్',
        'స్వీకర్తకు నేరుగా వాట్సాప్ ద్వారా డెలివరీ ఆప్షన్',
        'ఈమెయిల్ + SMS + వాట్సాప్ రిమైండర్‌లు (7, 3, 1 రోజుల ముందు)',
        'సురక్షితమైన జీవితకాల మెమరీ ఆర్కైవ్ యాక్సెస్'
      ] : language === 'hi' ? [
        'मानक पैकेज की सभी सुविधाएं शामिल हैं',
        'ग्रुप कंट्रीब्यूशन रूम (10 दोस्त ऑडियो/वीडियो/संदेश जोड़ सकते हैं)',
        'पूर्ण इंटरएक्टिव अनिमेटेड मेमोरी कैप्सूल रहस्योद्घाटन अनुभव',
        'ग्लोबल और नेशनल ब्रांड्स के लिए ई-गिफ्ट वाउचर',
        'अपलोड किए गए मीडिया से स्वचालित रूप से बनाई गई शानदार वीडियो मोंटाज',
        'प्राथमिकता वाली वीआईपी कस्टमर केयर सहायता (24/7)',
        'प्राप्तकर्ता को सीधे व्हाट्सएप द्वारा भेजने की सुविधा',
        'व्हाट्सएप + ईमेल + एसएमएस द्वारा पूर्ण रिमाइंडर्स (7, 3, 1 दिन पहले)',
        'सुरक्षित लाइफटाइम मेमोरी क्लाउड होस्टिंग और स्थायी साझाकरण लिंक'
      ] : language === 'kn' ? [
        'ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಪ್ಯಾಕೇಜ್‌ನಲ್ಲಿರುವ ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳು',
        'ಗ್ರೂಪ್ ಕಾಂಟ್ರಿಬ್ಯೂಷನ್ ರೂಮ್ (10 ಸ್ನೇಹಿತರು ಆಡಿಯೋ/ವಿಡಿಯೋ ಸೇರಿಸಬಹುದು)',
        'ಸಂಪೂರ್ಣ ಸಂವಾದಾತ್ಮಕ ಅನಿಮೇಟೆಡ್ ಮೆಮರಿ ಕ್ಯಾಪ್ಸೂಲ್ ಅನುಭವ',
        'ಜಾಗತಿಕ ಮತ್ತು ರಾಷ್ಟ್ರೀಯ ಬ್ರಾಂಡ್‌ಗಳ ಈ-ಗಿಫ್ಟ್ ವೋಚರ್',
        'ಸೇರಿಸಲಾದ ಮೀಡಿಯಾಗಳಿಂದ ಅತ್ಯುತ್ತಮ ವಿಡಿಯೋ ಮೌಂಟೇಜ್ ಸಂಗ್ರಹ',
        'ವಿಐಪಿ ಕಸ್ಟಮರ್ ಕೇರ್ ಆದ್ಯತೆಯ ಬೆಂಬಲ (24/7 ಸಕ್ರಿಯ)',
        'ನೇರವಾಗಿ ಸ್ವೀಕರಿಸುವವರ ವಾಟ್ಸಾಪ್‌ಗೆ ವಿತರಿಸುವ ಆಯ್ಕೆ',
        'ಇಮೇಲ್ + SMS + ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಪ್ರಮುಖ ರಿಮೈಂಡರ್‌ಗಳು (7, 3, 1 ದಿನ ಮುಂಚೆ)',
        'ಸುರಕ್ಷಿತ ಶಾಶ್ವತ ಜೀವಮಾನದ ಮೆಮರಿ ಸಂಗ್ರಹಣೆ ಹಾಗೂ ಗ್ಯಾಲರಿ ಲಿಂಕ್'
      ] : [
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

  if (user) {
    return (
      <div className="bg-ivory min-h-screen text-charcoal pb-16 animate-fade-in" id="logged_in_home_root">
        
        {/* HERO BANNER SECTION */}
        <section className="relative px-6 pt-16 pb-12 text-center overflow-hidden">
          {/* Shimmer Ambient Glow */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D4AF37]/5 -z-10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/4 h-full bg-[#1A1A2E]/5 -z-10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#FAF9F5] border border-gold/35 rounded-full px-4.5 py-1.5 shadow-3xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B89025] animate-spin-slow" />
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-navy-deep font-bold">
                {t.pavilion_workspace}
              </span>
            </div>

            <h1 className="font-serif text-3.5xl sm:text-5xl font-medium tracking-tight text-navy-deep">
              {t.welcome_back}, <span className="italic text-[#B89025]">{user.name}</span>
            </h1>

            {/* DYNAMIC SHIFTING QUOTE PANEL - HIGHLIGHTS 'NEVER MISS A PERSON' */}
            <div className="bg-white/85 border border-gold/20 p-8 rounded-[28px] max-w-2xl mx-auto shadow-xs relative overflow-hidden transition-all duration-500">
              <div className="absolute top-3 left-4 text-3xl font-serif text-gold-dark/25">“</div>
              <div className="absolute bottom-1 right-5 text-3xl font-serif text-gold-dark/25">”</div>
              
              <div className="space-y-4 relative z-10">
                <blockquote className="font-serif text-lg sm:text-xl text-charcoal/90 leading-relaxed italic">
                  {quotes[quoteIndex].text}
                </blockquote>
                <cite className="font-sans text-[10px] uppercase tracking-wider text-[#B89025] font-bold block not-italic">
                  — {quotes[quoteIndex].author}
                </cite>
              </div>

              {/* Page dot indicator */}
              <div className="flex justify-center space-x-1.5 pt-4">
                {quotes.map((_, qIdx) => (
                  <button
                    key={qIdx}
                    onClick={() => setQuoteIndex(qIdx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${quoteIndex === qIdx ? 'bg-[#B89025] w-3.5' : 'bg-gold/35'}`}
                    aria-label={`Show quote ${qIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE CUSTOMIZABLE PACKAGES & PRICING PLAYGROUND */}
        <section className="max-w-7xl mx-auto px-6 py-8 space-y-10">
          <div className="border-t border-gold/15 pt-10 grid lg:grid-cols-12 gap-10">
            
            {/* LEFT COLUMN: Package Selector & Add-ons Configuration Form */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <span className="font-sans text-xs tracking-[0.15em] font-bold text-[#B89025] uppercase block">
                  {t.bespoke_configurator}
                </span>
                <h2 className="font-serif text-2.5xl sm:text-3.5xl font-semibold text-navy-deep">
                  {t.bespoke_title}
                </h2>
                <p className="font-sans text-xs text-luxury-gray leading-normal">
                  {t.bespoke_desc}
                </p>
              </div>

              {/* BASE PACKAGE SELECTION */}
              <div className="space-y-3.5">
                <label className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#B89025] block">
                  {t.step_1}
                </label>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { id: 'BASIC', name: t.tier_basic_title, price: 500, desc: t.tier_basic_desc },
                    { id: 'STANDARD', name: t.tier_standard_title, price: 1500, desc: t.tier_standard_desc },
                    { id: 'PREMIUM', name: t.tier_premium_title, price: 3500, desc: t.tier_premium_desc }
                  ].map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedBasePkg(pkg.id as any)}
                      className={`border p-4.5 rounded-[20px] text-left transition-all duration-300 flex flex-col justify-between space-y-3 focus:outline-hidden ${
                        selectedBasePkg === pkg.id
                          ? 'bg-navy-deep text-white border-gold scale-102 ring-1 ring-gold shadow-md'
                          : 'bg-white text-charcoal border-gold/15 hover:border-gold/35 hover:scale-101'
                      }`}
                      id={`playground_base_${pkg.id}`}
                    >
                      <div className="space-y-1">
                        <span className="font-serif text-sm font-bold block">{pkg.name}</span>
                        <span className="font-sans text-[10px] leading-snug block opacity-85">{pkg.desc}</span>
                      </div>
                      <div className="pt-2 border-t border-gold/10 flex items-baseline justify-between w-full">
                        <span className="font-sans text-[11px] opacity-75">{t.base_charge_label}:</span>
                        <span className="font-mono text-xs font-bold text-[#B89025]">₹{pkg.price} INR</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* PREMIUM INTERACTIVE ADD-ONS (FRAMES, BLOOD DOTS, SKETCHES, REAL IMAGES) */}
              <div className="space-y-4 bg-white border border-gold/15 p-6 rounded-[28px] shadow-3xs">
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-[#B89025]" />
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-navy-deep">
                    {t.step_2}
                  </span>
                </div>

                <p className="font-sans text-[11px] text-luxury-gray leading-normal">
                  {t.step_2_desc}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  
                  {/* FRAMES ADDON */}
                  <label className={`flex items-start space-x-3.5 p-3.5 border rounded-[18px] cursor-pointer transition-all duration-250 ${addonFrames ? 'bg-gold-pale/35 border-gold/50' : 'bg-white/50 border-gold/10 hover:border-gold/25'}`}>
                    <input
                      type="checkbox"
                      checked={addonFrames}
                      onChange={(e) => setAddonFrames(e.target.checked)}
                      className="mt-0.5 rounded border-gold/40 text-navy-deep focus:ring-[#B89025] cursor-pointer"
                      id="checkbox_addon_frames"
                    />
                    <div className="space-y-0.5">
                      <span className="font-serif text-xs font-bold text-navy-deep block">{t.addon_frames} (+₹500)</span>
                      <span className="font-sans text-[10px] text-charcoal/70 block">{t.addon_frames_desc}</span>
                    </div>
                  </label>

                  {/* BLOOD DOTS ADDON */}
                  <label className={`flex items-start space-x-3.5 p-3.5 border rounded-[18px] cursor-pointer transition-all duration-250 ${addonBloodDots ? 'bg-gold-pale/35 border-gold/50' : 'bg-white/50 border-gold/10 hover:border-gold/25'}`}>
                    <input
                      type="checkbox"
                      checked={addonBloodDots}
                      onChange={(e) => setAddonBloodDots(e.target.checked)}
                      className="mt-0.5 rounded border-gold/40 text-navy-deep focus:ring-[#B89025] cursor-pointer"
                      id="checkbox_addon_blood_dots"
                    />
                    <div className="space-y-0.5">
                      <span className="font-serif text-xs font-bold text-navy-deep block">{t.addon_blood} (+₹500)</span>
                      <span className="font-sans text-[10px] text-charcoal/70 block">{t.addon_blood_desc}</span>
                    </div>
                  </label>

                  {/* SKETCHES ADDON */}
                  <label className={`flex items-start space-x-3.5 p-3.5 border rounded-[18px] cursor-pointer transition-all duration-250 ${addonSketches ? 'bg-gold-pale/35 border-gold/50' : 'bg-white/50 border-gold/10 hover:border-gold/25'}`}>
                    <input
                      type="checkbox"
                      checked={addonSketches}
                      onChange={(e) => setAddonSketches(e.target.checked)}
                      className="mt-0.5 rounded border-gold/40 text-navy-deep focus:ring-[#B89025] cursor-pointer"
                      id="checkbox_addon_sketches"
                    />
                    <div className="space-y-0.5">
                      <span className="font-serif text-xs font-bold text-navy-deep block">{t.addon_sketches} (+₹500)</span>
                      <span className="font-sans text-[10px] text-charcoal/70 block">{t.addon_sketches_desc}</span>
                    </div>
                  </label>

                  {/* GOOD IMAGES QUANTITY/TIER SELECTOR */}
                  <div className="flex flex-col space-y-1.5 p-3.5 border rounded-[18px] bg-white/50 border-gold/10">
                    <span className="font-serif text-xs font-bold text-[#B89025] block">{t.addon_gallery}</span>
                    <select
                      value={addonGoodImagesTier}
                      onChange={(e) => setAddonGoodImagesTier(e.target.value as any)}
                      className="bg-white border border-gold/20 text-charcoal text-[11px] py-1.5 px-2 rounded-lg focus:outline-hidden cursor-pointer w-full font-sans"
                      id="select_good_images_tier"
                    >
                      <option value="NONE">{t.select_standard_illus}</option>
                      <option value="BASIC_IMG">{t.select_premium_stock} (+₹500)</option>
                      <option value="PREMIUM_IMG">{t.select_deluxe_hi_res} (+₹1500)</option>
                    </select>
                    <span className="font-sans text-[9px] text-charcoal/50 leading-tight">{t.addon_gallery_desc}</span>
                  </div>

                </div>
              </div>

              {/* WHAT WE PROVIDE (TICKET BLUEPRINT INFO SECTION) */}
              <div className="bg-[#FAF9F5]/80 border border-gold/20 p-5 rounded-[22px] space-y-3.5">
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-navy-deep block">
                  ⚙️ {t.what_we_provide}
                </span>
                <div className="grid sm:grid-cols-2 gap-4 text-xs font-sans text-charcoal/80 leading-normal">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B89025] flex-shrink-0" />
                    <span>{t.provide_1}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B89025] flex-shrink-0" />
                    <span>{t.provide_2}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B89025] flex-shrink-0" />
                    <span>{t.provide_3}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B89025] flex-shrink-0" />
                    <span>{t.provide_4}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Real-Time Dynamic Aesthetic Card Preview */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              <div className="space-y-3 bg-white border border-gold/20 p-6 rounded-[32px] shadow-sm relative overflow-hidden flex-grow flex flex-col justify-between">
                
                {/* Visual Label */}
                <div className="flex items-center justify-between border-b border-gold/10 pb-3">
                  <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-navy-deep flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-red-500 animate-pulse" />
                    {t.live_preview}
                  </span>
                  <span className="font-mono text-[10px] bg-navy-deep text-gold px-2.5 py-0.5 rounded-full font-bold">
                    {t.total}: ₹{getCalculatedPrice()}
                  </span>
                </div>

                {/* THE CARD DESIGN BEING CONFIGURED */}
                <div className={`my-4 relative overflow-hidden rounded-2xl transition-all duration-300 ${addonFrames ? 'p-3 border-8 border-double border-amber-400 bg-amber-50/10 shadow-lg' : 'p-1 border border-gold/15'}`} id="live_aesthetic_card_preview">
                  
                  {/* Good Image Component Grid */}
                  <div className="relative h-44 rounded-xl overflow-hidden bg-charcoal/5 flex items-center justify-center">
                    
                    {addonGoodImagesTier === 'NONE' ? (
                      <div className="text-center p-4 space-y-1">
                        <span className="text-3xl">🎁</span>
                        <span className="font-serif text-xs font-bold text-navy-deep block">Standard Minimalist Greeting Layout</span>
                        <span className="font-sans text-[10px] text-charcoal/50">Illustrations loaded upon schedule</span>
                      </div>
                    ) : (
                      <img
                        src={addonGoodImagesTier === 'PREMIUM_IMG' 
                          ? "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80"
                          : "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80"
                        }
                        referrerPolicy="no-referrer"
                        alt="Bespoke Curation Preview"
                        className={`w-full h-full object-cover transition-all duration-500 ${addonSketches ? 'contrast-125 filter grayscale opacity-75 b&w-effect' : ''}`}
                      />
                    )}

                    {/* CSS overlays simulating sketched canvas */}
                    {addonSketches && (
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent flex items-end p-3 pointer-events-none">
                        <span className="font-serif text-[10px] tracking-wide text-white uppercase font-bold bg-[#1a1a2e]/65 px-2 py-0.5 rounded border border-white/20">
                          ✏️ {t.sketch_overlay_label}
                        </span>
                      </div>
                    )}

                    {/* Blood dots representation pulsing across */}
                    {addonBloodDots && (
                      <div className="absolute top-2.5 right-2.5 flex space-x-1 z-20">
                        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-600 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600 animate-pulse" />
                        <span className="font-sans text-[8px] uppercase font-bold text-white bg-red-600/95 px-1.5 py-0.5 rounded tracking-widest leading-none">
                          {t.blood_dots_badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card text details */}
                  <div className="p-4 space-y-2 bg-[#FAF9F5]/45 rounded-b-xl">
                    <span className="font-serif text-base font-bold text-charcoal block">{t.card_preview_title}</span>
                    <p className="font-sans text-[11px] text-luxury-gray leading-normal">
                      {t.card_preview_desc}
                    </p>
                    
                    {/* Addons active check badge pill list */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      <span className="font-sans text-[9px] bg-gold/15 text-navy-deep px-2 py-0.5 rounded font-semibold">{selectedBasePkg} Tier</span>
                      {addonFrames && <span className="font-sans text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">{t.tier_luxury_frames}</span>}
                      {addonBloodDots && <span className="font-sans text-[9px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-semibold">{t.tier_pulse_dots}</span>}
                      {addonSketches && <span className="font-sans text-[9px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-semibold">{t.tier_pencil_sketch}</span>}
                      {addonGoodImagesTier !== 'NONE' && <span className="font-sans text-[9px] bg-green-100 text-green-800 px-2 py-0.5 rounded font-semibold">{t.tier_good_imagery}</span>}
                    </div>
                  </div>
                </div>

                {/* Confirm CTA Trigger */}
                <div className="space-y-3 pt-4 border-t border-gold/10">
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="text-luxury-gray">{t.configured_price}:</span>
                    <span className="font-mono font-bold text-navy-deep text-sm">₹{getCalculatedPrice()} INR / approx $9-{selectedBasePkg === 'PREMIUM' ? '49' : '19'}</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      onStartPlanning();
                    }}
                    className="w-full bg-[#1A1A2E] hover:bg-gold text-white hover:text-navy-deep py-4 rounded-full font-serif font-bold uppercase tracking-widest text-[11px] transition-all duration-300 hover:scale-102 flex items-center justify-center gap-2"
                    id="book_custom_card_now_btn"
                  >
                    <span>{t.book_now_cta} ✨</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="font-sans text-[10px] text-luxury-gray text-center block">
                    {t.redirect_msg}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* cron / updates scheduler section */}
        <section className="bg-white border-y border-gold/15 py-16 px-6 max-w-7xl mx-auto shadow-3xs rounded-[36px]" id="schedule-updates-sec">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="font-sans text-xs tracking-[0.2em] font-bold uppercase text-[#B89025] block">
                {t.schedule_subtitle}
              </span>
              <h3 className="font-serif text-2.5xl sm:text-3.5xl font-semibold text-navy-deep">
                {t.schedule_title}
              </h3>
              <p className="font-sans text-xs text-luxury-gray max-w-lg mx-auto leading-relaxed">
                {t.schedule_desc}
              </p>
            </div>

            {/* SCHEDULE NEW UPDATE TRIGGER FORM */}
            <form onSubmit={handleAddUpdate} className="bg-gold-pale/15 border border-gold/15 p-6 rounded-[24px] grid sm:grid-cols-12 gap-5 items-end">
              
              <div className="sm:col-span-4 space-y-1.5 text-left">
                <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal block">{t.target_celebration}</label>
                <input
                  type="text"
                  required
                  value={targetEventInput}
                  onChange={(e) => setTargetEventInput(e.target.value)}
                  placeholder="e.g., Brother's Birthday"
                  className="w-full bg-white border border-gold/20 focus:border-gold px-3.5 py-2.5 rounded-xl font-sans text-xs text-charcoal placeholder:text-gray-400 focus:outline-hidden"
                  id="sched_update_target"
                />
              </div>

              <div className="sm:col-span-4 space-y-1.5 text-left">
                <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal block">{t.bespoke_action}</label>
                <select
                  value={customActionInput}
                  onChange={(e) => setCustomActionInput(e.target.value)}
                  className="w-full bg-white border border-gold/20 focus:border-gold px-3.5 py-2.5 rounded-xl font-sans text-xs text-charcoal focus:outline-hidden"
                  id="sched_update_action"
                >
                  <option value="Inject Handcrafted Portrait Sketches">{t.action_option_sketches} (₹500)</option>
                  <option value="Embed Beating Blood-Dots Sync">{t.action_option_blood} (₹500)</option>
                  <option value="Swap/Update Global Floating Frames">{t.action_option_frames} (₹500)</option>
                  <option value="Re-Hydrate High-HQ Good Images Room">{t.action_option_gallery} (₹1,500)</option>
                  <option value="Recalculate Gemini AI Wording Balance">{t.action_option_gemini} (Included)</option>
                </select>
              </div>

              <div className="sm:col-span-4 space-y-1.5 text-left">
                <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-charcoal block">{t.execution_time}</label>
                <input
                  type="datetime-local"
                  required
                  value={updateDateTimeInput}
                  onChange={(e) => setUpdateDateTimeInput(e.target.value)}
                  className="w-full bg-white border border-gold/20 focus:border-gold px-3.5 py-2.5 rounded-xl font-sans text-xs text-charcoal focus:outline-hidden"
                  id="sched_update_dt"
                />
              </div>

              <div className="sm:col-span-12 flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-navy-deep hover:bg-gold text-white hover:text-navy-deep px-6 py-3 rounded-full font-serif font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all duration-300 transform hover:scale-102 shadow-xs cursor-pointer"
                  id="submit_background_update_btn"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.add_cron_btn}</span>
                </button>
              </div>

            </form>

            {/* LIVE SCHEDULED UPDATES TIMELINE FEED */}
            <div className="space-y-3.5">
              <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-navy-deep block text-left">
                🗓️ {t.active_cron_triggers}
              </span>
              
              {scheduledUpdates.length === 0 ? (
                <div className="text-center p-8 bg-gold-pale/10 border border-dashed border-gold/20 rounded-xl font-sans text-xs text-luxury-gray">
                  {t.no_cron}
                </div>
              ) : (
                <div className="space-y-3" id="live_update_timeline_flow">
                  {scheduledUpdates.map((upd) => (
                    <div
                      key={upd.id}
                      className="bg-white border border-gold/15 p-4.5 rounded-[18px] hover:border-gold/30 transition-all duration-300 flex items-center justify-between gap-4 shadow-3xs"
                      id={`timeline_update_row_${upd.id}`}
                    >
                      <div className="flex items-start space-x-3.5 text-left">
                        <div className="w-9 h-9 rounded-full bg-gold-pale flex items-center justify-center text-[#B89025] shrink-0 border border-gold/10">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <span className="font-serif text-sm font-bold text-charcoal block">{upd.targetEvent}</span>
                          <p className="font-sans text-xs text-navy-deep font-semibold">Action: <span className="text-charcoal/80 font-normal">{upd.updateAction}</span></p>
                          <div className="flex items-center space-x-2 pt-1 font-sans text-[10px] text-light-gray">
                            <Calendar className="w-3 h-3 text-[#B89025]" />
                            <span className="font-mono">{new Date(upd.dateTime).toLocaleString()}</span>
                            <span className="text-gold-dark">•</span>
                            <span className="bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold uppercase tracking-widest text-[8px]">{t.arm_label}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteUpdate(upd.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                        title="Cancel Update"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </section>

      </div>
    );
  }

  return (
    <div className="bg-ivory relative min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative bg-ivory text-charcoal mt-4 pt-16 md:pt-24 pb-20 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Glow Shimmers */}
        <div className="absolute top-0 right-0 w-1/2 h-full gold-shimmer -z-10 pointer-events-none" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#1A1A2E]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Sparkle background ambient graphics */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-gold rounded-full blur-xs animate-ping" />
          <div className="absolute top-2/3 right-1/5 w-2 h-2 bg-gold rounded-full filter blur-xs animate-pulse" />
          <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-gold rounded-full filter blur-xs animate-pulse delay-75" />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-charcoal rounded-full blur-xs animate-ping delay-200" />
        </div>

        <div className="max-w-4xl mx-auto z-10 space-y-8 px-4 flex flex-col items-center">
          
          <div className="inline-flex items-center space-x-2 bg-charcoal/5 border border-gold/30 rounded-full px-4.5 py-1.5 mb-2 hover:border-gold/60 transition-colors duration-300">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold-dark font-bold">
              {t.hero_subtitle}
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl leading-[1.1] font-light tracking-tight text-charcoal max-w-4xl">
            {t.hero_title_1} <br />
            <span className="italic font-normal text-gold font-serif">{t.hero_title_2}</span>
          </h1>

          <p className="font-sans text-lg sm:text-xl text-charcoal/70 max-w-2xl font-light leading-relaxed italic">
            {t.hero_desc}
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center gap-5 justify-center w-full">
            <button
              onClick={scrollToOccasions}
              className="bg-gold hover:bg-charcoal text-white px-10 py-5 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 transform scroll-smooth hover:scale-105 shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center space-x-2.5 w-full sm:w-auto"
              id="hero_start_planning_btn"
            >
              <span>{t.btn_start_planning}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const sec = document.getElementById('how-it-works-sec');
                if (sec) sec.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-charcoal/20 hover:border-charcoal/55 text-charcoal bg-white/50 hover:bg-white/80 px-10 py-5 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-1.5"
              id="hero_how_it_works_btn"
            >
              <span>{t.btn_see_how_it_works}</span>
            </button>
          </div>

        </div>
      </section>

      {/* THREE THEME FOCUS (PLAN / SELECT / NOTIFY) */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="how-it-works-sec">
        <div className="text-center space-y-4 mb-16">
          <span className="font-sans text-xs tracking-[0.2em] font-bold uppercase text-gold-dark">
            {t.pillars_subtitle}
          </span>
          <h2 className="font-serif text-3.5xl sm:text-5xl text-charcoal font-semibold tracking-tight">
            {t.pillars_title}
          </h2>
          <div className="gold-divider max-w-xs mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-white p-10 rounded-[32px] capsule-shadow border border-white hover:border-gold/30 transition-all duration-300 space-y-6" id="pillar_1">
            <div className="w-12 h-12 rounded-full bg-[#F0E4DA] flex items-center justify-center text-gold-dark">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-semibold italic text-charcoal">{t.pillar_1_title}</h3>
            <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
              {t.pillar_1_desc}
            </p>
          </div>

          <div className="bg-white p-10 rounded-[32px] capsule-shadow border border-white hover:border-gold/30 transition-all duration-300 space-y-6" id="pillar_2">
            <div className="w-12 h-12 rounded-full bg-[#F0E4DA] flex items-center justify-center text-gold-dark">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-semibold italic text-charcoal">{t.pillar_2_title}</h3>
            <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
              {t.pillar_2_desc}
            </p>
          </div>

          <div className="bg-white p-10 rounded-[32px] capsule-shadow border border-white hover:border-gold/30 transition-all duration-300 space-y-6" id="pillar_3">
            <div className="w-12 h-12 rounded-full bg-[#F0E4DA] flex items-center justify-center text-gold-dark">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-semibold italic text-charcoal">{t.pillar_3_title}</h3>
            <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
              {t.pillar_3_desc}
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS TIMELINE */}
      <section className="bg-white text-charcoal py-24 px-6 border-y border-gold/15 relative overflow-hidden">
        {/* Ambient background shimmers */}
        <div className="absolute inset-0 bg-gold-shimmer opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          <div className="space-y-6">
            <span className="font-sans text-xs tracking-[0.2em] font-bold text-gold-dark uppercase block">
              {t.blueprint_subtitle}
            </span>
            <h2 className="font-serif text-4xl sm:text-5.5xl font-light tracking-tight leading-[1.1] text-charcoal">
              {t.blueprint_title_1} <br />
              <span className="italic font-normal text-gold">{t.blueprint_title_2}</span>
            </h2>
            <p className="font-sans text-charcoal/70 text-sm sm:text-base leading-relaxed max-w-lg">
              {t.blueprint_desc}
            </p>
            <div className="pt-4">
              <button
                onClick={scrollToOccasions}
                className="bg-[#D4AF37] hover:bg-[#1A1A2E] text-white px-8 py-4.5 rounded-full font-serif font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:scale-105 shadow-lg shadow-[#D4AF37]/15"
                id="blueprint_cta"
              >
                {t.btn_schedule_capsule}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {HOW_IT_WORKS.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-5 bg-[#F5F0E8]/70 border border-gold/15 p-6 rounded-[24px] hover:border-gold/35 transition-all duration-300 shadow-3xs"
                id={`timeline_item_${index}`}
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#F0E4DA] flex items-center justify-center font-serif text-gold-dark text-sm font-bold border border-white">
                  {item.step}
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-charcoal">{item.title}</h4>
                  <p className="font-sans text-xs text-charcoal/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SUPPORTED OCCASIONS SHOWCASE */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center" id="occasions-sec">
        <div className="space-y-4 mb-16">
          <span className="font-sans text-xs tracking-[0.2em] font-bold uppercase text-gold-dark">
            {t.milestones_subtitle}
          </span>
          <h2 className="font-serif text-3.5xl sm:text-4.5xl text-charcoal font-semibold">
            {t.milestones_title}
          </h2>
          <div className="gold-divider max-w-xs mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {EVENT_TYPES.map((evt, idx) => (
            <div
              key={idx}
              onClick={() => onSelectOccasion(evt.type as EventType)}
              className={`bg-white border border-gold/15 rounded-[24px] p-6 text-center cursor-pointer capsule-shadow hover:border-gold hover:scale-105 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center space-y-4 ${
                idx === EVENT_TYPES.length - 1 ? 'col-span-2 sm:col-span-1' : ''
              }`}
              id={`occasion_card_${idx}`}
            >
              <img src={(evt as any).image} alt={evt.title} className="w-full h-32 object-cover rounded-xl shadow-sm filter drop-shadow-xs" />
              <div className="space-y-1">
                <span className="text-sm font-serif font-bold text-charcoal block">{evt.title}</span>
                <span className="text-[11px] text-charcoal/60 font-sans block leading-relaxed">{evt.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* TESTIMONIALS SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <span className="font-sans text-xs tracking-[0.2em] font-bold uppercase text-gold-dark">
            {t.testimonials_subtitle}
          </span>
          <h2 className="font-serif text-3.5xl sm:text-4.5xl text-charcoal font-semibold">
            {t.testimonials_title}
          </h2>
          <div className="gold-divider max-w-xs mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((test, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-[24px] border border-gold/15 capsule-shadow flex flex-col justify-between space-y-6"
              id={`testimonial_${index}`}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-gold">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-sans text-sm italic text-charcoal/70 leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              <div className="border-t border-gold/10 pt-4 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#F0E4DA] border border-gold/20 flex items-center justify-center font-serif text-gold-dark text-xs font-bold">
                  {test.author.charAt(0)}
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-charcoal block leading-tight">
                    {test.author}
                  </span>
                  <span className="font-sans text-[10px] text-charcoal/60 block mt-0.5">
                    {test.loc}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="bg-ivory text-charcoal py-20 px-6 text-center border-t border-gold/15 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-52 h-52 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="max-w-2xl mx-auto space-y-6 z-10 relative">
          <h2 className="font-serif text-3.5xl sm:text-5xl font-light">
            {t.footer_cta_title_1} <span className="italic text-gold block mt-2">{t.footer_cta_title_2}</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-charcoal/70 max-w-lg mx-auto">
            {t.footer_cta_desc}
          </p>
          <div className="pt-4">
            <button
              onClick={scrollToOccasions}
              className="bg-[#1A1A2E] hover:bg-gold text-white px-10 py-5 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 shadow-xl shadow-[#1A1A2E]/10"
              id="footer_cta_start_planning_btn"
            >
              {t.btn_start_planning}
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-charcoal/60 py-12 px-6 border-t border-gold/15 text-center text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-gold text-lg font-bold tracking-wide">Célèbre</span>
            <span className="text-charcoal/20">|</span>
            <span className="font-sans text-[11px] font-medium text-charcoal/50">Since 2026. All Rights Reserved.</span>
          </div>
          <div className="flex space-x-6 text-[11px] font-sans">
            <button onClick={() => onNavigate('home')} className="hover:text-gold transition-colors duration-300 font-semibold">Home</button>
            <button onClick={() => onNavigate('packages')} className="hover:text-gold transition-colors duration-300 font-semibold">Packages</button>
            <button onClick={() => onNavigate('about')} className="hover:text-gold transition-colors duration-300 font-semibold">About Us</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-gold transition-colors duration-300 font-semibold">Contact</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
