/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, Crown, Sparkles, Star } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../translations';
import { PackageType } from '../types';

interface PackagesPageProps {
  language: LanguageCode;
  onSelectPackage: (pkg: PackageType) => void;
}

export default function PackagesPage({ language, onSelectPackage }: PackagesPageProps) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // Let's create localized feature text lists as we have them translated elegantly
  const localizedPackages = [
    {
      id: 'BASIC',
      name: t.tier_basic_title,
      priceUSD: 9,
      priceINR: 499,
      popular: false,
      desc: t.tier_basic_desc,
      features: language === 'te' ? [
        'వ్యక్తిగతీకరించిన గ్రీటింగ్ కార్డ్ (భౌతికంగా)',
        'మినీ కస్టమ్ బర్త్‌డే కేక్ (0.5 కిలోలు)',
        'తాజా పూల బొకే',
        '1 ప్రింటెడ్ కస్టమ్ ఫోటో ఫ్రేమ్',
        'కన్సియర్స్ ద్వారా స్టాండర్డ్ సర్ప్రైజ్ డెలివరీ',
        'చిన్న సెలబ్రేషన్ కార్నర్ సెటప్'
      ] : language === 'hi' ? [
        'व्यक्तिगत भौतिक ग्रीटिंग कार्ड',
        'मिनी कस्टम जन्मदिन का केक (0.5 किलो)',
        'ताजे फूलों का गुलदस्ता',
        '1 मुद्रित कस्टम फोटो फ्रेम',
        'कंसीयज द्वारा मानक सरप्राइज डिलीवरी',
        'छोटे उत्सव कॉर्नर की सजावट'
      ] : language === 'kn' ? [
        'ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಭೌತಿಕ ಶುಭಾಶಯ ಪತ್ರ',
        'ಮಿನಿ ಕಸ್ಟಮ್ ಜನ್ಮದಿನದ ಕೇಕ್ (0.5 ಕೆಜಿ)',
        'ತಾಜಾ ಹೂವಿನ ಬೊಕೆ',
        '1 ಪ್ರಿಂಟೆಡ್ ಕಸ್ಟಮ್ ಫೋಟೋ ಫ್ರೇಮ್',
        'ಕನ್ಸಿಯರ್ಜ್ ಮೂಲಕ ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಸರ್ಪ್ರೈಸ್ ವಿತರಣೆ',
        'ಸಣ್ಣ ಆಚರಣೆಯ ಕಾರ್ನರ್ ಸೆಟಪ್'
      ] : [
        'Personalized physical greeting card',
        'Mini custom birthday cake (0.5 kg)',
        'Single bouquet of fresh flowers',
        '1 printed custom photo frame',
        'Standard surprise delivery by concierge',
        'Setup of a small celebration corner'
      ]
    },
    {
      id: 'STANDARD',
      name: t.tier_standard_title,
      priceUSD: 19,
      priceINR: 1499,
      popular: true,
      desc: t.tier_standard_desc,
      features: language === 'te' ? [
        'బేసిక్ ప్యాకేజీలోని ప్రతిదీ చేర్చబడింది',
        'ప్రీమియం కస్టమ్ థీమ్ కేక్ (1 కిలో)',
        'బెలూన్లతో అందమైన గది అలంకరణ',
        'చేతితో తయారు చేసిన బ్లడ్ ఆర్ట్ / స్ట్రింగ్ ఆర్ట్ పోర్ట్రెయిట్',
        'లైవ్ అకౌస్టిక్ మ్యూజిక్ పెర్ఫార్మెన్స్ (15 నిమిషాలు)',
        'పర్సనలైజ్డ్ వీడియో మాంటేజ్ ప్రొజెక్షన్',
        'క్యూరేటెడ్ ఫిజికల్ గిఫ్ట్ బాక్స్ డెలివరీ'
      ] : language === 'hi' ? [
        'बेसिक पैकेज की सभी चीजें शामिल',
        'प्रीमियम कस्टम थीम केक (1 किलो)',
        'गुब्बारों के साथ कमरे की शानदार सजावट',
        'हस्तनिर्मित ब्लड आर्ट / स्ट्रिंग आर्ट पोर्ट्रेट',
        'लाइव ध्वनिक संगीत प्रदर्शन (15 मिनट)',
        'वैयक्तिकृत वीडियो मोंटाज प्रक्षेपण',
        'विशेष भौतिक उपहार बॉक्स की डिलीवरी'
      ] : language === 'kn' ? [
        'ಬೇಸಿಕ್ ಪ್ಯಾಕೇಜ್‌ನಲ್ಲಿರುವ ಎಲ್ಲವೂ ಒಳಗೊಂಡಿದೆ',
        'ಪ್ರೀಮಿಯಂ ಕಸ್ಟಮ್ ಥೀಮ್ ಕೇಕ್ (1 ಕೆಜಿ)',
        'ಬಲೂನ್‌ಗಳೊಂದಿಗೆ ಸೊಗಸಾದ ಕೊಠಡಿ ಅಲಂಕಾರ',
        'ಕರಕುಶಲ ಬ್ಲಡ್ ಆರ್ಟ್ / ಸ್ಟ್ರಿಂಗ್ ಆರ್ಟ್ ಭಾವಚಿತ್ರ',
        'ಲೈವ್ ಅಕೌಸ್ಟಿಕ್ ಸಂಗೀತ ಪ್ರದರ್ಶನ (15 ನಿಮಿಷಗಳು)',
        'ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ವೀಡಿಯೊ ಮಾಂಟೇಜ್ ಪ್ರೊಜೆಕ್ಷನ್',
        'ವಿಶೇಷ ಭೌತಿಕ ಉಡುಗೊರೆ ಪೆಟ್ಟಿಗೆಯ ವಿತರಣೆ'
      ] : [
        'Everything in the Basic Package',
        'Premium custom theme cake (1 kg)',
        'Elegant room decoration with balloons',
        'Handcrafted blood art / string art portrait',
        'Live acoustic music performance (15 mins)',
        'Personalized video montage projection',
        'Delivery of curated physical gift box'
      ]
    },
    {
      id: 'PREMIUM',
      name: t.tier_premium_title,
      priceUSD: 49,
      priceINR: 3499,
      popular: false,
      desc: t.tier_premium_desc,
      features: language === 'te' ? [
        'స్టాండర్డ్ ప్యాకేజీలోని ప్రతిదీ చేర్చబడింది',
        'మల్టీ-టైర్ డిజైనర్ కేక్',
        'లగ్జరీ వెన్యూ డెకరేషన్',
        'సాండ్ ఆర్ట్ లేదా లైవ్ క్యారికేచరిస్ట్ పెర్ఫార్మెన్స్',
        'ప్రొఫెషనల్ ఫోటోగ్రఫీ మరియు వీడియోగ్రఫీ',
        'లగ్జరీ కారులో ప్రయాణం (చౌఫెర్ డ్రైవెన్)',
        'ప్రీమియం పానీయాలు మరియు గోర్మెట్ హ్యాంపర్',
        '24/7 కన్సియర్స్ ఈవెంట్ ప్లానింగ్'
      ] : language === 'hi' ? [
        'स्टैंडर्ड पैकेज की सभी चीजें शामिल',
        'आकर्षक मल्टी-टियर डिज़ाइनर केक',
        'संपूर्ण लक्ज़री वेन्यू की सजावट',
        'सैंड आर्ट या लाइव कैरिकेचरिस्ट प्रदर्शन',
        'पेशेवर फोटोग्राफी और वीडियोग्राफी',
        'लक्ज़री चौफ़र-संचालित कार की सवारी',
        'प्रीमियम बेवरेज और गॉरमेट हैम्पर',
        '24/7 प्राथमिकता कंसीयज इवेंट प्लानिंग'
      ] : language === 'kn' ? [
        'ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಪ್ಯಾಕೇಜ್‌ನಲ್ಲಿರುವ ಎಲ್ಲವೂ ಒಳಗೊಂಡಿದೆ',
        'ಬಹು-ಹಂತದ ಡಿಸೈನರ್ ಕೇಕ್',
        'ಸಂಪೂರ್ಣ ಐಷಾರಾಮಿ ಸ್ಥಳದ ಅಲಂಕಾರ',
        'ಸ್ಯಾಂಡ್ ಆರ್ಟ್ ಅಥವಾ ಲೈವ್ ಕ್ಯಾರಿಕೇಚರಿಸ್ಟ್ ಪ್ರದರ್ಶನ',
        'ವೃತ್ತಿಪರ ಛಾಯಾಗ್ರಹಣ ಮತ್ತು ವೀಡಿಯೋಗ್ರಫಿ',
        'ಐಷಾರಾಮಿ ಚಾಲಕ-ಚಾಲಿತ ಕಾರು ಸವಾರಿ',
        'ಪ್ರೀಮಿಯಂ ಪಾನೀಯ ಮತ್ತು ಗಾರ್ಮೆಟ್ ಹ್ಯಾಂಪರ್',
        '24/7 ಆದ್ಯತೆಯ ಕನ್ಸಿಯರ್ಜ್ ಈವೆಂಟ್ ಯೋಜನೆ'
      ] : [
        'Everything in the Standard Package',
        'Extravagant multi-tier designer cake',
        'Full venue luxury decoration',
        'Sand art or caricaturist live performance',
        'Professional photography & videography',
        'Luxury chauffeur-driven car ride',
        'Premium beverage & gourmet hamper',
        'Priority 24/7 concierge event planning'
      ]
    }
  ];

  const getEventWord = () => {
    switch (language) {
      case 'te': return 'వేడుక';
      case 'hi': return 'उत्सव';
      case 'kn': return 'ಆಚರಣೆ';
      default: return 'event';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-16 animate-fade-in" id="packages_page_root">
      
      {/* HEADER SECTION */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-gold-dark block font-semibold">
          {t.tailored_subtitle}
        </span>
        <h1 className="font-serif text-3.5xl sm:text-5.5xl font-light text-charcoal leading-tight">
          {language === 'te' 
            ? "మీ బడ్జెట్‌కు తగిన అమూల్యమైన" 
            : language === 'hi' 
            ? "अपनी आवश्यकताओं के अनुसार सही" 
            : language === 'kn' 
            ? "ನಿಮ್ಮ ನೆನಪುಗಳಿಗೆ ಸೂಕ್ತವಾದ" 
            : "Select the Perfect Setup for"}{' '}
          <br />
          <span className="italic font-normal text-gold">
            {language === 'te' 
              ? "సరికొత్త సర్‌ప్రైజ్ ప్యాకేజీని ఎంచుకోండి" 
              : language === 'hi' 
              ? "सरप्राइज पैकेज का चयन करें" 
              : language === 'kn' 
              ? "ಸರ್ಪ್ರೈಸ್ ಆಶ್ಚರ್ಯಕರ ಪ್ಯಾಕೇಜ್ ಆರಿಸಿ" 
              : t.tailored_title}
          </span>
        </h1>
        <div className="gold-divider max-w-xs mx-auto mt-4" />
        <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed pt-2">
          {t.tailored_desc}
        </p>
      </div>

      {/* THREE CARDS COMPONENT GRID */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch" id="packages_main_grid">
        {localizedPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-[32px] p-8 md:p-10 flex flex-col justify-between transition-all duration-300 relative ${
              pkg.popular
                ? 'border-2 border-[#D4AF37] shadow-xl md:scale-105 z-10'
                : 'border border-gold/15 shadow-sm hover:border-gold/35'
            }`}
            id={`packages_page_card_${pkg.id}`}
          >
            {pkg.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white text-[9px] font-sans font-bold tracking-[0.16em] uppercase px-4.5 py-1.5 rounded-full border border-white flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-white" />
                <span>
                  {language === 'te' ? 'అత్యంత ప్రజాదరణ పొందిన ప్యాకేజీ ✨' : language === 'hi' ? 'सबसे लोकप्रिय पसंद ✨' : language === 'kn' ? 'ಅತ್ಯಂತ ಜನಪ್ರಿಯ ಪ್ಯಾಕೇಜ್ ✨' : 'Most Popular Surprise ✨'}
                </span>
              </span>
            )}

            <div className="space-y-6">
              {/* Package Head */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-bold text-charcoal block">
                    {pkg.name}
                  </span>
                  {pkg.id === 'PREMIUM' && <Crown className="w-5 h-5 text-gold-dark" />}
                </div>
                
                <p className="font-sans text-[11px] text-charcoal/60 leading-relaxed italic">
                  {pkg.desc}
                </p>

                {/* PRICE ACCENT: Rupee First, then USD ($) separated as requested */}
                <div className="flex items-baseline pt-3 pb-1 border-b border-gold/10">
                  <span className="font-serif text-2xl sm:text-3.5xl font-bold text-[#1A1A2E]">
                    ₹{pkg.priceINR}
                  </span>
                  <span className="text-xs sm:text-sm font-sans text-charcoal/65 px-1.5 font-medium">
                    /{getEventWord()}
                  </span>
                  <span className="text-charcoal/30 px-2 font-light">|</span>
                  <span className="font-serif text-lg sm:text-xl font-bold text-gold-dark">
                    ${pkg.priceUSD}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3.5 pt-2">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5" id={`packages_page_feature_${pkg.id}_${idx}`}>
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span className="font-sans text-xs sm:text-xs/relaxed text-charcoal/75">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onSelectPackage(pkg.id as PackageType)}
                className={`w-full py-4 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  pkg.popular
                    ? 'bg-[#D4AF37] hover:bg-[#1A1A2E] text-white shadow-lg shadow-[#D4AF37]/15 hover:scale-104'
                    : 'border border-[#1A1A2E] text-[#1A1A2E] hover:bg-[#1A1A2E] hover:text-white hover:scale-102'
                }`}
                id={`packages_page_select_btn_${pkg.id}`}
              >
                {t.btn_select_tier}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
