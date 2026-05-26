/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Calendar, ChevronRight, ChevronLeft, Check, AlertCircle, Trash2, Music, Upload, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { User, CelebrationEvent, EventType, PackageType, RelationshipType, EventMessage } from '../types';
import { PACKAGES, MUSIC_TRACKS } from '../data';

interface PlanEventPageProps {
  user: User;
  onEventCreated: (evt: CelebrationEvent) => void;
  onNavigate: (page: string) => void;
  editingEvent: CelebrationEvent | null;
}

export default function PlanEventPage({
  user,
  onEventCreated,
  onNavigate,
  editingEvent
}: PlanEventPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  
  // --- STATE FOR ALL 6 WIZARDS —--
  
  // Step 1: Planner Details
  const [plannerName, setPlannerName] = useState(user.name);
  const [plannerEmail, setPlannerEmail] = useState(user.email);
  const [plannerPhone, setPlannerPhone] = useState(user.phone || '');
  const [plannerCountry, setPlannerCountry] = useState(user.country);

  // Step 2: Recipient Details
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientRelationship, setRecipientRelationship] = useState<RelationshipType>('Partner');

  // Step 3: Event Type
  const [eventType, setEventType] = useState<EventType>('Birthday');
  const [customEventName, setCustomEventName] = useState('');

  // Step 4: Date & Time
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [reminderDays, setReminderDays] = useState<number[]>([1, 3]);
  const [reminderMethod, setReminderMethod] = useState<'Email' | 'SMS' | 'Both'>('Both');

  // Step 5: Customizations & Package Selection
  const [packageType, setPackageType] = useState<PackageType>('STANDARD');
  const [customHeader, setCustomHeader] = useState('');
  const [backgroundMusic, setBackgroundMusic] = useState('track_2');
  const [letterText, setLetterText] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600'
  ]);
  const [videoUrl, setVideoUrl] = useState('https://assets.mixkit.co/videos/preview/mixkit-holding-hands-of-a-happy-couple-walking-43405-large.mp4');

  // AI copywriting loader state
  const [aiLoading, setAiLoading] = useState(false);
  const [captionSuggestions, setCaptionSuggestions] = useState<string[]>([]);
  const [aiSuccessMsg, setAiSuccessMsg] = useState('');

  // Extended form states for majestic occasion planning details
  const [recipientTimezone, setRecipientTimezone] = useState(editingEvent ? (editingEvent as any).recipientTimezone || 'GMT-5' : 'GMT-5');
  const [recipientCity, setRecipientCity] = useState(editingEvent ? (editingEvent as any).recipientCity || '' : '');
  const [occasionMood, setOccasionMood] = useState(editingEvent ? (editingEvent as any).occasionMood || 'Classic Gold 💫' : 'Classic Gold 💫');
  const [customTone, setCustomTone] = useState(editingEvent ? (editingEvent as any).customTone || 'Warm & Heartfelt ❤️' : 'Warm & Heartfelt ❤️');
  const [deliverAtMidnight, setDeliverAtMidnight] = useState(editingEvent ? (editingEvent as any).deliverAtMidnight ?? true : true);
  const [friendContributors, setFriendContributors] = useState(editingEvent ? (editingEvent as any).friendContributors || '' : '');

  // Hydrate if editing an event draft
  useEffect(() => {
    if (editingEvent) {
      setPlannerName(editingEvent.plannerName || user.name);
      setPlannerEmail(editingEvent.plannerEmail || user.email);
      setRecipientName(editingEvent.recipient.name);
      setRecipientEmail(editingEvent.recipient.email);
      setRecipientPhone(editingEvent.recipient.phone || '');
      setRecipientRelationship(editingEvent.recipient.relationship);
      setEventType(editingEvent.eventType);
      setCustomEventName(editingEvent.customEventName || '');
      setDate(editingEvent.date);
      setTime(editingEvent.time || '09:00');
      setReminderDays(editingEvent.reminderDays || [1, 3]);
      setReminderMethod(editingEvent.reminderMethod || 'Both');
      setPackageType(editingEvent.packageType);
      setCustomHeader(editingEvent.customHeaderMessage || '');
      setBackgroundMusic(editingEvent.backgroundMusic || 'track_2');
      if (editingEvent.messages && editingEvent.messages.length > 0) {
        setLetterText(editingEvent.messages[0].text);
      }
      if (editingEvent.collage && editingEvent.collage.length > 0) {
        setUploadedPhotos(editingEvent.collage);
      }
      if (editingEvent.videoUrl) {
        setVideoUrl(editingEvent.videoUrl);
      }
      
      const evtAny = editingEvent as any;
      if (evtAny.recipientTimezone) setRecipientTimezone(evtAny.recipientTimezone);
      if (evtAny.recipientCity) setRecipientCity(evtAny.recipientCity);
      if (evtAny.occasionMood) setOccasionMood(evtAny.occasionMood);
      if (evtAny.customTone) setCustomTone(evtAny.customTone);
      if (evtAny.deliverAtMidnight !== undefined) setDeliverAtMidnight(evtAny.deliverAtMidnight);
      if (evtAny.friendContributors) setFriendContributors(evtAny.friendContributors);
    }
  }, [editingEvent, user]);

  // Handle reminder toggles
  const handleReminderToggle = (day: number) => {
    if (reminderDays.includes(day)) {
      setReminderDays(reminderDays.filter(d => d !== day));
    } else {
      setReminderDays([...reminderDays, day].sort());
    }
  };

  // Drag & drop photo simulator
  const fileInputRef = useRef<HTMLInputElement>(null);
  const triggerFileSelection = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handlePhotoUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Generate lovely mock Unsplash portraits based on upload request to stay high fidelity
    const sampleUnsplashImages = [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600'
    ];
    const randomIndex = Math.floor(Math.random() * sampleUnsplashImages.length);
    const addedUrl = sampleUnsplashImages[randomIndex];
    
    if (uploadedPhotos.length >= 8) {
      alert("Standard/Premium packages support up to 10 photos. You have sufficient memory space! ✨");
      return;
    }
    setUploadedPhotos([...uploadedPhotos, addedUrl]);
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index));
  };

  // --- TRIGGER ACTION: CALL SERVER SIDE GEMINI AI ---
  const handleAiCopywriter = async () => {
    if (!recipientName) {
      setErrorMessage('Please provide the recipient name in Step 1 before running the AI Copywriter.');
      setCurrentStep(1);
      return;
    }

    setAiLoading(true);
    setErrorMessage('');
    setAiSuccessMsg('');
    try {
      const resp = await fetch('/api/gemini/generate-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventType,
          recipientName,
          relationship: recipientRelationship,
          plannerName: plannerName,
          tone: `${customTone} tone of voice, perfectly aligned to recipient relationship and the golden occasion`
        })
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Gemini server call failed.');

      setLetterText(data.text);
      if (data.title) {
        setCustomHeader(data.title);
      }
      if (data.captionIdeas) {
        setCaptionSuggestions(data.captionIdeas);
      }
      setAiSuccessMsg('Célèbre AI has successfully computed a premium, tear-jerking letter matching your relationship coordinates! ✨');
    } catch (err: any) {
      setErrorMessage('AI Sandbox warning: ' + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  // Step movement controls
  const handleNextStep = () => {
    setErrorMessage('');
    // Validations (5-step layout where step 1 is recipient, step 2 is occasion, step 3 is timing, step 4 is customizations)
    if (currentStep === 1) {
      if (!recipientName || !recipientEmail) {
        setErrorMessage('Recipient Name and Delivery Email are strictly required to schedule surprise payloads.');
        return;
      }
    }
    if (currentStep === 2) {
      if (eventType === 'CustomSurprise' && !customEventName) {
        setErrorMessage('Please provide an elegant name for your Custom Celebration.');
        return;
      }
    }
    if (currentStep === 3) {
      if (!date) {
        setErrorMessage('Please select a valid date for deployment.');
        return;
      }
      // Guarantee it is a future date if creating a new one
      const selDateObj = new Date(date);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selDateObj < today && !editingEvent) {
        setErrorMessage('Surprise schedulers can only coordinate future events. Please select a coming day.');
        return;
      }
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    setCurrentStep(currentStep - 1);
  };

  // Save Event Draft or Proceed to Checkout
  const handleSaveAndCheckout = async () => {
    setErrorMessage('');
    
    const celebrationPayload: CelebrationEvent = {
      id: editingEvent ? editingEvent.id : '',
      plannerId: user.id,
      plannerName,
      plannerEmail,
      recipient: {
        name: recipientName,
        email: recipientEmail,
        phone: recipientPhone || undefined,
        relationship: recipientRelationship
      },
      eventType,
      customEventName: eventType === 'CustomSurprise' ? customEventName : undefined,
      date,
      time,
      reminderDays,
      reminderMethod,
      packageType,
      status: editingEvent ? editingEvent.status : 'Draft',
      createdAt: editingEvent ? editingEvent.createdAt : new Date().toISOString(),
      backgroundMusic,
      customHeaderMessage: customHeader || `In Honor of Your ${eventType}!`,
      collage: uploadedPhotos,
      videoUrl: packageType !== 'BASIC' ? videoUrl : undefined,
      messages: [
        {
          id: 'msg_primary',
          authorName: plannerName,
          relationship: recipientRelationship,
          text: letterText || `Best wishes on your ${eventType}! Wishing you a year of immense blessings.`
        }
      ],
      // New extended descriptors to persist on the in-memory database
      ...({
        recipientTimezone,
        recipientCity,
        occasionMood,
        customTone,
        deliverAtMidnight,
        friendContributors
      } as any)
    };

    try {
      const endpoint = editingEvent ? `/api/events/${editingEvent.id}` : '/api/events';
      const method = editingEvent ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(celebrationPayload)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Server persistence error.');

      onEventCreated(data); // Injects to App core state
      // Immediately redirect to payment gateway screen!
      onNavigate('payment');
    } catch (err: any) {
      setErrorMessage('Could not save event capsule: ' + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8 animate-fade-in" id="plan_wizard_root">
      
      {/* HEADER CRUMBS */}
      <div className="space-y-4 text-center">
        <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-gold-dark font-semibold">
          Step {currentStep} of 5 — Booking Celebration Capsule
        </span>
        <h1 className="font-serif text-3xl md:text-4.5xl text-navy-deep font-light">
          Plan Your <span className="italic">Celebration Capsule</span>
        </h1>
        <div className="w-16 h-[1.5px] bg-gold-dark/40 mx-auto" />
      </div>

      {/* ERROR / AI NOTIFICATION TOAST */}
      {errorMessage && (
        <div className="flex items-start space-x-2.5 bg-red-50 border border-red-200 p-4.5 rounded-[12px] text-red-700 animate-fade-in" id="wizard_error_box">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
          <span className="font-sans text-xs sm:text-sm leading-relaxed">{errorMessage}</span>
        </div>
      )}

      {aiSuccessMsg && (
        <div className="flex items-start space-x-2.5 bg-emerald-50 border border-emerald-200 p-4.5 rounded-[12px] text-emerald-800 animate-fade-in" id="wizard_ai_success_box">
          <Sparkles className="w-5 h-5 flex-shrink-0 text-emerald-500 mt-0.5" />
          <span className="font-sans text-xs sm:text-sm leading-relaxed">{aiSuccessMsg}</span>
        </div>
      )}

      {/* STEP INDICATORS RAIL */}
      <div className="flex items-center justify-between max-w-2xl mx-auto pb-4 border-b border-gold/10 overflow-x-auto" id="step_indicator_rail">
        {[1, 2, 3, 4, 5].map((st) => (
          <div key={st} className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-sans text-xs font-bold leading-none border transition-all duration-300 ${
              currentStep === st 
                ? 'bg-navy-deep text-gold border-gold scale-110' 
                : currentStep > st 
                  ? 'bg-gold-dark text-white border-gold-dark'
                  : 'bg-white text-luxury-gray border-gold/15'
            }`}
             id={`indicator_bubble_${st}`}
            >
              {currentStep > st ? <Check className="w-3.5 h-3.5" /> : st}
            </div>
            <span className={`font-sans text-[10px] tracking-wider uppercase hidden sm:inline ${
              currentStep === st ? 'text-navy-deep font-bold' : 'text-luxury-gray'
            }`}>
              {st === 1 ? 'Recipient' : st === 2 ? 'Occasion' : st === 3 ? 'Timing' : st === 4 ? 'Customs' : 'Confirm'}
            </span>
          </div>
        ))}
      </div>

      {/* SURGICAL CARDS WRAPPERS */}
      <div className="bg-white border border-gold/15 p-8 rounded-[24px] shadow-sm min-h-[400px]">
        
        {/* === STEP 1: RECIPIENT DETAILS === */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in" id="step_recipient_details">
            {/* PLANNER USER REGISTRATION CARD FOR HIGH-END ACCOUNT SECURITY */}
            <div className="bg-amber-100/35 border border-gold/20 p-5 rounded-[18px] space-y-2.5 animate-fade-in" id="user_planner_card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 font-sans text-[10px] font-bold uppercase tracking-widest text-[#B89025]">
                  <Check className="w-3.5 h-3.5 text-emerald-600 border border-emerald-300 rounded-full bg-emerald-50" />
                  <span>Authorized Creator Workspace (User Perspective)</span>
                </div>
                <span className="text-[9px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                  Secure Active Session
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans">
                <div>
                  <p className="text-luxury-gray text-[9px] uppercase font-bold tracking-wider">Logged-in Planner Account</p>
                  <p className="text-navy-deep font-bold text-sm">{plannerName || user.name}</p>
                </div>
                <div>
                  <p className="text-luxury-gray text-[9px] uppercase font-bold tracking-wider">Registered Contact Email</p>
                  <span className="text-charcoal font-medium font-mono text-[11px] bg-white/65 px-2 py-0.5 rounded border border-gold/10 inline-block">{plannerEmail || user.email}</span>
                </div>
                <div>
                  <p className="text-luxury-gray text-[9px] uppercase font-bold tracking-wider">Planner Base Region</p>
                  <p className="text-charcoal font-semibold">{plannerCountry || user.country || 'India Standard'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-navy-deep">Step 1 — Recipient Surprising Coordinates</h3>
              <p className="font-sans text-xs text-luxury-gray leading-relaxed">
                We monitor arrival coordinates continuously. Please configure their local destination context so the surprise unfolds exactly in their active workspace!
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 pt-3">
              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85">Recipient Full Name (Who is being surprised)</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Michael Jenkins"
                  className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal"
                  id="r_name_field"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85">Recipient Email (Delivery Location)</label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="michael.jenkins@example.com"
                  className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal"
                  id="r_email_field"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85">Recipient Phone Number (For SMS triggers)</label>
                <input
                  type="text"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal"
                  id="r_phone_field"
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85">Your Relationship with Them</label>
                <select
                  value={recipientRelationship}
                  onChange={(e) => setRecipientRelationship(e.target.value as RelationshipType)}
                  className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal cursor-pointer"
                  id="r_relation_select"
                >
                  <option value="Partner">Partner / Spouse 💍</option>
                  <option value="Friend">Close Friend 🍻</option>
                  <option value="Parent">Parent / Guardian 🌸</option>
                  <option value="Sibling">Sibling 🏡</option>
                  <option value="Colleague">Colleague / Partner 🤝</option>
                  <option value="Other">Other Category 🌟</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* === STEP 2: OCCASION TYPE === */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in" id="step_occasion_type">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-navy-deep">Step 2 — What Golden Occasion Are We Honoring?</h3>
            <p className="font-sans text-xs text-luxury-gray leading-relaxed">
              Our bespoke layouts, server-side music modules, and <strong>Gemini AI copywriter</strong> will adjust automatically to honor the spirit of your selected occasion.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              {[
                { type: 'Birthday', label: 'Birthday', image: '/birthday-card.jpg', desc: 'A grand digital card with blowing candles & custom wishes' },
                { type: 'DeathEvent', label: 'Death Event', image: '/death-card.png', desc: 'Honoring the timeless legacy of a loved one' },
                { type: 'Anniversary', label: 'Anniversary', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=300&q=80', desc: 'Milestone tracker for years of commitment & cozy music' },
                { type: 'Graduation', label: 'Graduation', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=300&q=80', desc: 'Family contribution wall & virtual cap-toss effects' },
                { type: 'Valentine', label: 'Valentine', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=300&q=80', desc: 'Immersive love letters draped in custom romance templates' },
                { type: 'Promotion', label: 'Promotion', image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=300&q=80', desc: 'Professional accolades dashboard & corporate toast tracks' },
                { type: 'BabyShower', label: 'Baby Shower', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=300&q=80', desc: 'Soft pastel graphics & countdown tickers for the newborn' },
                { type: 'BabyFirstBirthday', label: "Baby's 1st Birthday", image: '/baby-first-birthday-card.jpg', desc: 'Animated toddler toy elements, balloons, and baby music' },
                { type: 'FirstJob', label: 'First Job', image: '/first_job.gif', desc: 'Congratulatory career steps, advice cards, & celebratory streams' },
                { type: 'HouseWarming', label: 'House Warming', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80', desc: 'New home memory uploads, virtual keys & blessing guestbooks' },
                { type: 'Festival', label: 'Festival', image: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&w=300&q=80', desc: 'Traditional theme graphic styles (Diwali, Christmas, Eid)' },
                { type: 'CustomSurprise', label: 'Custom Surprise', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80', desc: 'Multi-author messages with fully manual curation templates' }
              ].map((occ) => (
                <button
                  key={occ.type}
                  type="button"
                  onClick={() => setEventType(occ.type as EventType)}
                  className={`border p-4.5 rounded-[18px] text-left transition-all duration-300 flex flex-col space-y-1.5 focus:outline-hidden ${
                    eventType === occ.type
                      ? 'bg-navy-deep text-gold border-gold scale-102 ring-1 ring-gold shadow-xs'
                      : 'bg-white text-charcoal border-gold/15 hover:border-gold/35'
                  }`}
                  id={`occasion_select_${occ.type}`}
                >
                  <img src={occ.image} alt={occ.label} className="w-full h-24 object-contain bg-black/5 rounded-xl filter drop-shadow-xs mb-2" />
                  <span className="font-sans text-xs font-semibold block">{occ.label}</span>
                  <span className={`font-sans text-[10px] sm:text-[11px] leading-tight block ${eventType === occ.type ? 'text-white/80' : 'text-luxury-gray'}`}>{occ.desc}</span>
                </button>
              ))}
            </div>

            {eventType === 'CustomSurprise' && (
              <div className="space-y-1 pt-4 border-t border-gold/15 animate-fade-in" id="custom_event_name_wrapper">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85">Specify Elegant Event Name</label>
                <input
                  type="text"
                  value={customEventName}
                  onChange={(e) => setCustomEventName(e.target.value)}
                  placeholder="Golden Jubilee / Retirement Milestone"
                  className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal"
                  id="custom_event_name_field"
                  required
                />
              </div>
            )}
          </div>
        )}

        {/* === STEP 3: DATE & DEPLOYMENT TIMING === */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in" id="step_timing_details">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-navy-deep">Step 3 — Direct Timeline & Delivery Target</h3>
            <p className="font-sans text-xs text-luxury-gray leading-relaxed">
              We align schedules precisely according to the destination clock. The system computes real-time alignment across differences.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 pt-3">
              <div className="space-y-1">
                <label className="font-sans text-xs font-semibold uppercase tracking-wider text-charcoal/85 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#B89025]" />
                  <span>Choose Date for Surprise Delivery</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal cursor-pointer"
                  id="deployment_date_field"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85">
                  Scheduled Delivery Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={deliverAtMidnight}
                  className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal cursor-pointer disabled:opacity-50"
                  id="deployment_time_field"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex items-center">
              <label className="flex items-center space-x-2 text-xs font-sans text-charcoal font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={deliverAtMidnight}
                  onChange={(e) => {
                    setDeliverAtMidnight(e.target.checked);
                    if (e.target.checked) setTime('00:00');
                  }}
                  className="rounded border-gold/30 text-navy-deep focus:ring-navy-deep cursor-pointer"
                />
                <span>Unleash exactly at midnight of their calendar date (12:00 AM)</span>
              </label>
            </div>

            {/* Reminder Options */}
            <div className="space-y-3 pt-4 border-t border-gold/15">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85 block">
                Concierge Planner Reminder Schedule
              </span>
              <p className="font-sans text-xs text-luxury-gray leading-relaxed pb-1">
                When would you like to receive automated preview and checking reminders leading up to the surprise hour?
              </p>
              
              <div className="flex flex-wrap gap-3">
                {[
                  { label: '7 Days Before', val: 7 },
                  { label: '3 Days Before', val: 3 },
                  { label: '1 Day Before', val: 1 }
                ].map((rem) => (
                  <button
                    key={rem.val}
                    type="button"
                    onClick={() => handleReminderToggle(rem.val)}
                    className={`border px-4 py-2.5 rounded-full font-sans text-xs font-semibold cursor-pointer transition-all duration-300 ${
                      reminderDays.includes(rem.val)
                        ? 'bg-navy-deep text-gold border-gold'
                        : 'bg-white text-luxury-gray border-gold/15 hover:border-gold/35'
                    }`}
                    id={`reminder_toggle_${rem.val}`}
                  >
                    {reminderDays.includes(rem.val) ? '✓ ' : ''}{rem.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reminder Method */}
            <div className="space-y-2 pt-3">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85 block">
                Reminder delivery channel
              </span>
              <div className="grid grid-cols-3 gap-3">
                {['Email', 'SMS', 'Both'].map((meth) => (
                  <button
                    key={meth}
                    type="button"
                    onClick={() => setReminderMethod(meth as any)}
                    className={`border py-2.5 rounded-xl font-sans text-xs font-semibold cursor-pointer transition-all ${
                      reminderMethod === meth
                        ? 'bg-navy-deep text-gold border-gold'
                        : 'bg-white text-luxury-gray border-gold/15'
                    }`}
                    id={`reminder_channel_${meth}`}
                  >
                    {meth}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* === STEP 4: CUSTOMIZATION AND MEDIA ARCHIVE === */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-fade-in" id="step_customization_details">
            
            {/* Package Choice Slider */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-navy-deep">Step 4 — Surprise Package and Customizations</h3>
              <p className="font-sans text-xs text-luxury-gray leading-relaxed">
                Confirm your layout structural tier. Higher tiers unlock video slide decks and multi-parent message rooms!
              </p>
              
              <div className="grid sm:grid-cols-3 gap-6 pt-2">
                {PACKAGES.map((pkg) => {
                  const inclusions = (() => {
                    if (eventType === 'Birthday' || eventType === 'BabyFirstBirthday' || eventType === 'BabyShower') {
                      if (pkg.id === 'BASIC') {
                        return [
                          "🎁 Dynamic Digital Birthday E-Card",
                          "🎈 Virtual Balloon Pop Animation",
                          "💌 1 Written Card Message"
                        ];
                      }
                      if (pkg.id === 'STANDARD') {
                        return [
                          "🎂 Fresh Delicious Cake delivery to doorstep",
                          "🎈 Beautiful Helium Balloons bouquet",
                          "🎵 Acoustic Piano & Strings reveal tracks",
                          "📸 Custom Photographic Collage"
                        ];
                      }
                      return [
                        "🎂 Premium Multi-Tier Custom Cake",
                        "🎈 Grand Room Theme Balloons set",
                        "🎻 Live Violinist on Call / Video Stream",
                        "📹 Stunning Video Montage Compilation"
                      ];
                    } else if (eventType === 'Anniversary' || eventType === 'Valentine') {
                      if (pkg.id === 'BASIC') {
                        return [
                          "💌 Digital Romance E-Card",
                          "💖 Floating Heart Animation Particles",
                          "✍️ 1 Personal Love Letter draft"
                        ];
                      }
                      if (pkg.id === 'STANDARD') {
                        return [
                          "🌹 Fresh Rose Bouquet (12 stems) delivered",
                          "🍫 Premium Belgian Chocolates",
                          "🎵 Serenade of Hearts Guitar reveal track",
                          "📸 Anniversary Memory Collage"
                        ];
                      }
                      return [
                        "🌹 Grand Luxury Red Roses (50 stems)",
                        "🍫 Customized Artisanal Chocolates box",
                        "🎻 Live Romantic Solo Musician stream",
                        "📹 Shareable Premium Memory Timeline"
                      ];
                    } else {
                      if (pkg.id === 'BASIC') {
                        return [
                          "🎁 Themed Congratulations Card",
                          "✨ Celebratory Sparkle transition effects",
                          "✍️ 1 Personal congratulate letter"
                        ];
                      }
                      if (pkg.id === 'STANDARD') {
                        return [
                          "🧁 Box of 6 Gourmet Celebration Cupcakes",
                          "🎈 Festive congrats balloon set",
                          "🎵 Cinematic Uplifting backing music",
                          "📸 Dynamic Photo slide deck (10 photos)"
                        ];
                      }
                      return [
                        "🎁 Deluxe Congratulatory Gift Hamper",
                        "🎉 Live Group Video Room for 10 guests",
                        "📹 Custom commemorating HD slideshows",
                        "🤝 24/7 Concierge & WhatsApp alerts"
                      ];
                    }
                  })();

                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setPackageType(pkg.id)}
                      className={`border p-5 rounded-[20px] text-left transition-all duration-300 flex flex-col justify-between h-full cursor-pointer relative ${
                        packageType === pkg.id
                          ? 'bg-gold-pale/45 border-2 border-gold font-normal gold-glow'
                          : 'bg-white border-gold/15 hover:border-gold/35'
                      }`}
                      id={`package_tier_select_${pkg.id}`}
                    >
                      <div className="space-y-4 w-full">
                        <div className="space-y-1 pb-3 border-b border-gold/10">
                          <span className="font-serif text-lg font-semibold text-navy-deep block">{pkg.name}</span>
                          <span className="font-sans text-xs font-bold text-navy-deep block">₹{pkg.priceINR} / ${pkg.priceUSD}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="font-sans text-[10px] font-bold text-luxury-gray uppercase tracking-wider">What you will get from our side:</p>
                          <ul className="space-y-1.5 pt-1">
                            {inclusions.map((item, index) => (
                              <li key={index} className="font-sans text-xs text-charcoal flex items-start space-x-1.5 leading-tight">
                                <span className="text-emerald-600 font-bold select-none">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="pt-4 mt-auto w-full">
                        {packageType === pkg.id ? (
                          <span className="text-[10px] font-sans font-bold text-gold-dark uppercase tracking-widest block text-center bg-gold/15 py-1.5 rounded-lg border border-gold/30">
                            ✓ Selected Tier
                          </span>
                        ) : (
                          <span className="text-[10px] font-sans font-medium text-luxury-gray uppercase tracking-widest block text-center bg-gray-50/50 hover:bg-gold-pale/10 py-1.5 rounded-lg border border-gray-200">
                            Select {pkg.name.split(' ')[0]}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom headers and music selection */}
            <div className="w-full h-[1px] bg-gold/15" />

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85 block">
                  Surprise Header Tagline
                </label>
                <input
                  type="text"
                  value={customHeader}
                  onChange={(e) => setCustomHeader(e.target.value)}
                  placeholder="To My Partner, 5 Years of Magic! 💖"
                  className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal"
                  id="custom_header_field"
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85 flex items-center gap-1">
                  <Music className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Reveal Background Music</span>
                </label>
                <select
                  value={backgroundMusic}
                  onChange={(e) => setBackgroundMusic(e.target.value)}
                  className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal cursor-pointer"
                  id="background_music_select"
                >
                  {MUSIC_TRACKS.map((track) => (
                    <option key={track.id} value={track.id}>
                      {track.name} ({track.duration})
                    </option>
                  ))}
                </select>
              </div>

              {/* Extended field: Friends Co-Contributors */}
              <div className="space-y-1 sm:col-span-2">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85 flex items-center gap-1">
                  <span>🚀 Expand Contributions — Guest Author Invite List (Standard / Premium)</span>
                </label>
                <input
                  type="text"
                  value={friendContributors}
                  onChange={(e) => setFriendContributors(e.target.value)}
                  placeholder="mom@example.com, dad@example.com, brother@example.com"
                  className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal"
                  id="guest_contributors_field"
                />
                <p className="font-sans text-[10px] text-luxury-gray">
                  Standard plans support up to 5 secondary messages; Premium supports up to 10 guest writers. Separating emails via commas works perfectly! We'll dispatch invitation forms automatically.
                </p>
              </div>
            </div>

            {/* AI Copywriting panel */}
            <div className="bg-navy-deep text-white p-6 rounded-[20px] border border-gold/25 space-y-4 relative overflow-hidden" id="ai_copywriter_panel">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold/10 rounded-full blur-lg pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-1.5 text-gold-light">
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                    <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-gold-light">Gemini AI Executive Editor</span>
                  </div>
                  <h4 className="font-serif text-lg font-medium">Let AI Write a Beautiful Letter</h4>
                  <p className="font-sans text-[11px] text-ivory/70 leading-relaxed max-w-md">
                    Instantly draft highly touching personal card copy. Gemini analyzes Relationship and Event types on the server to compose elegant milestones.
                  </p>
                  
                  {/* Dynamic Tone Dropdown Selector */}
                  <div className="space-y-1 pt-1.5 text-[#e5e5e5]">
                    <label className="font-sans text-[10px] font-bold uppercase tracking-wider text-gold-light block">Select Preferred Curation Tone</label>
                    <select
                      value={customTone}
                      onChange={(e) => setCustomTone(e.target.value)}
                      className="bg-navy-deep border border-gold/25 text-white text-[11px] px-2.5 py-1.5 rounded-lg focus:outline-hidden cursor-pointer w-full max-w-xs font-sans"
                    >
                      <option value="Warm & Heartfelt ❤️">Warm & Heartfelt (Tears Guarantee) ❤️</option>
                      <option value="Highly Romantic & Emotional 💖">Highly Romantic & Emotional 💖</option>
                      <option value="Humorous, Sarcastic & Witty 🎭">Humorous, Sarcastic & Witty 🎭</option>
                      <option value="Professional, Noble & Appreciative 🏅">Professional, Noble & Appreciative 🏅</option>
                      <option value="Deeply Nostalgic, Looking Back on Years 🕰️">Deeply Nostalgic, Looking Back on Years 🕰️</option>
                      <option value="Short & Modern Minimalist 🍃">Short & Modern Minimalist 🍃</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAiCopywriter}
                  disabled={aiLoading}
                  className="bg-gold hover:bg-gold-light text-navy-deep px-5 py-2.5 rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-103 cursor-pointer flex items-center space-x-2"
                  id="trigger_ai_draft_btn"
                >
                  {aiLoading ? (
                    <span>Curating Letter...</span>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Draft with AI ✨</span>
                    </>
                  )}
                </button>
              </div>

              {captionSuggestions.length > 0 && (
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-2 animate-fade-in" id="ai_caption_suggestions font-sans">
                  <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-gold block font-semibold">Suggested Collage Captions</span>
                  <div className="flex flex-col space-y-1.5 pt-1">
                    {captionSuggestions.map((cap, cidx) => (
                      <span key={cidx} className="text-xs text-ivory/80 italic flex items-start gap-1">
                        <Heart className="w-3 h-3 text-gold mt-1 flex-shrink-0" />
                        <span>"{cap}"</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* MESSAGE BODY EDITOR */}
            <div className="space-y-1">
              <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85">
                Surprise Card Heartfelt Message
              </label>
              <textarea
                value={letterText}
                onChange={(e) => setLetterText(e.target.value)}
                placeholder="Compose your custom heartfelt message here, or click the 'Draft with AI' button above to generate a masterpiece..."
                className="w-full bg-gold-pale/15 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal min-h-[160px] leading-relaxed"
                id="message_body_textarea"
                required
              />
            </div>

            {/* PHOTO UPLOADER COLLAGE INTERACTIVE */}
            {packageType !== 'BASIC' && (
              <div className="space-y-4 pt-4 border-t border-gold/10">
                <div className="space-y-1">
                  <span className="font-serif text-lg font-semibold text-navy-deep block">Surprise Photo Wall Showcase</span>
                  <p className="font-sans text-xs text-luxury-gray leading-relaxed">
                    Upload snapshots of your favorite roadtrips, birthdays, or family coordinates. Standard supports up to 10 photos.
                  </p>
                </div>

                {/* Drag and Drop Box */}
                <div
                  onClick={triggerFileSelection}
                  className="border-2 border-dashed border-gold/45 hover:border-gold bg-gold-pale/15 p-8 rounded-[16px] text-center cursor-pointer transition-colors space-y-2"
                  id="drag_drop_uploader"
                >
                  <Upload className="w-7 h-7 text-gold-dark mx-auto animate-bounce-slow" />
                  <span className="font-sans text-xs font-semibold text-charcoal block">Drag and drop file, or select manually</span>
                  <span className="font-sans text-[10px] text-luxury-gray block">PNG, JPG, JPEG. (Simulated upload will add random luxury assets)</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUploadSim}
                    className="hidden"
                    accept="image/*"
                    id="hidden_uploader_input"
                  />
                </div>

                {/* Uploaded Photos Showcase */}
                {uploadedPhotos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2" id="uploaded_collage_previews">
                    {uploadedPhotos.map((photo, pidx) => (
                      <div key={pidx} className="relative group rounded-xl overflow-hidden border border-gold/20 h-24">
                        <img src={photo} alt="Pre-uploaded asset mockup" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <button
                          type="button"
                          onClick={() => removePhoto(pidx)}
                          className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white shadow-xs hover:bg-red-600 transition-colors"
                          title="Remove photo"
                          id={`remove_photo_btn_${pidx}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* === STEP 5: REVIEW AND CONFIRM === */}
        {currentStep === 5 && (
          <div className="space-y-8 animate-fade-in" id="step_review_confirm">
            <div className="space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-navy-deep">Step 5 — Review Your Orchestration Ticket</h3>
              <p className="font-sans text-xs text-luxury-gray leading-relaxed">
                Look over the credentials before locking schedulers. Click any edit pen icon below to navigate back to adjust details.
              </p>
            </div>

            <div className="space-y-5" id="review_summary_box">

              {/* Dynamic Package Price and Inclusions (What They Get) */}
              {(() => {
                const currentPackage = PACKAGES.find(p => p.id === packageType) || PACKAGES[1];
                return (
                  <div className="border border-gold-dark/30 p-6 rounded-[20px] bg-gold-pale/20 space-y-4 shadow-3xs" id="review_package_invoice">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gold/20 pb-3 gap-3">
                      <div>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold-dark block">Your Selected Experience Tier</span>
                        <h4 className="font-serif text-xl font-bold text-navy-deep">{currentPackage.name}</h4>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-2xl font-serif font-bold text-navy-deep block leading-none">
                          ${currentPackage.priceUSD} <span className="text-xs text-luxury-gray font-normal font-sans">/ ₹{currentPackage.priceINR}</span>
                        </span>
                        <span className="text-[10px] font-sans bg-gold/20 text-gold-dark px-2.5 py-0.5 rounded-full font-bold mt-1 inline-block">One-Time Billing</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-sans font-bold text-charcoal block">What you get from our side:</span>
                      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-charcoal/85">
                        {currentPackage.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2 leading-tight">
                            <Check className="w-3.5 h-3.5 text-gold-dark flex-shrink-0 mt-0.5" />
                            <span className="font-sans text-[11px] text-charcoal/90">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
              
              {/* Category 1: Planner details */}
              <div className="border border-gold/15 p-5 rounded-[12px] relative bg-amber-50/10">
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B89025] block">Planner Details (User Account Perspective)</span>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs font-sans">
                    <p><span className="text-luxury-gray">Planner:</span> <span className="text-charcoal font-medium">{plannerName}</span></p>
                    <p><span className="text-luxury-gray">Email:</span> <span className="text-charcoal font-medium">{plannerEmail}</span></p>
                  </div>
                </div>
              </div>

              {/* Category 2: Recipient details */}
              <div className="border border-gold/15 p-5 rounded-[12px] relative">
                <button onClick={() => setCurrentStep(1)} className="absolute top-4 right-4 text-xs font-semibold text-gold-dark hover:underline" id="edit_link_step1">Edit ✎</button>
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B89025] block">Recipient Details & Delivery Coordinates</span>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs font-sans">
                    <p><span className="text-luxury-gray">Name:</span> <span className="text-charcoal font-bold">{recipientName}</span></p>
                    <p><span className="text-luxury-gray">Email:</span> <span className="text-charcoal font-medium">{recipientEmail}</span></p>
                    <p><span className="text-luxury-gray">Phone:</span> <span className="text-charcoal font-medium">{recipientPhone || 'Not specified'}</span></p>
                    <p><span className="text-luxury-gray">Relationship:</span> <span className="text-navy-deep font-semibold">{recipientRelationship}</span></p>
                  </div>
                </div>
              </div>

              {/* Category 3: Event parameters */}
              <div className="border border-gold/15 p-5 rounded-[12px] relative bg-gold-pale/15">
                <div className="absolute top-4 right-4 flex space-x-3.5">
                  <button onClick={() => setCurrentStep(2)} className="text-xs font-semibold text-gold-dark hover:underline" id="edit_link_step2_occ">Edit Occasion ✎</button>
                  <button onClick={() => setCurrentStep(3)} className="text-xs font-semibold text-gold-dark hover:underline" id="edit_link_step3_time">Edit Timing ✎</button>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B89025] block">Occasion & Timing Customizations</span>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs font-sans">
                    <p><span className="text-luxury-gray">Occasion:</span> <span className="text-charcoal font-medium">{eventType} {eventType === 'Custom' ? `(${customEventName})` : ''}</span></p>
                    <p><span className="text-luxury-gray">Release Target Date:</span> <span className="text-charcoal font-medium">{date}</span></p>
                    <p><span className="text-luxury-gray">Release Hour:</span> <span className="text-charcoal font-medium">{deliverAtMidnight ? 'Midnight (12:00 AM)' : time}</span></p>
                    <p><span className="text-luxury-gray">Planner Reminders:</span> <span className="text-charcoal font-medium">{reminderDays.map(d => `${d}d`).join(', ')} before via {reminderMethod}</span></p>
                  </div>
                </div>
              </div>

              {/* Category 4: Customs details */}
              <div className="border border-gold/15 p-5 rounded-[12px] relative">
                <button onClick={() => setCurrentStep(4)} className="absolute top-4 right-4 text-xs font-semibold text-gold-dark hover:underline" id="edit_link_step4">Edit ✎</button>
                <div className="space-y-3">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B89025] block">Curation & Digital Elements</span>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs font-sans">
                    <p><span className="text-luxury-gray">Package Tier:</span> <span className="text-navy-deep font-bold">{packageType}</span></p>
                    <p><span className="text-luxury-gray">Selected Music:</span> <span className="text-charcoal font-medium">{backgroundMusic}</span></p>
                    <p className="sm:col-span-2"><span className="text-luxury-gray">Guest Invite Emails:</span> <span className="text-charcoal font-medium italic">{friendContributors || 'None added'}</span></p>
                  </div>
                  <div className="text-xs font-sans pt-2 border-t border-gold/10">
                    <span className="text-[#B89025] block font-semibold text-[10px] uppercase">Tagline Summary:</span>
                    <p className="font-semibold text-navy-deep pt-1">"{customHeader || 'Best Wishes!'}"</p>
                  </div>
                  <div className="text-xs font-sans pt-1">
                    <span className="text-[#B89025] block font-semibold text-[10px] uppercase">Card text (Curation Tone: {customTone}):</span>
                    <p className="text-luxury-gray leading-normal pt-1 italic whitespace-pre-wrap max-h-36 overflow-y-auto border border-gold/5 bg-gold-pale/5 p-3 rounded-lg">
                      "{letterText || "No custom message saved. Classic templates will default."}"
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Concierge Guarantee */}
            <div className="flex items-start space-x-3 bg-navy-deep text-white p-5 rounded-[16px] border border-gold/25" id="step_6_concierge_trust">
              <ShieldCheck className="w-5 h-5 flex-shrink-0 text-gold-light mt-0.5" />
              <div className="space-y-1 text-left">
                <span className="font-serif text-sm font-semibold block">SSL Concierge Booking Lockout</span>
                <p className="font-sans text-[11px] text-ivory/70 leading-relaxed">
                  Upon clicking "Confirm & Proceed," this celebration joins pending schedulers. Standard/Premium will unlock media builders. Unpaid items will hold in Draft mode.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* RAILS NAV CONTROLS BUTTONS */}
      <div className="flex items-center justify-between pt-2">
        {currentStep > 1 ? (
          <button
            onClick={handlePrevStep}
            className="border border-[#1A1A2E]/20 hover:border-[#1A1A2E]/55 text-navy-deep px-6 py-3 rounded-full font-sans text-xs font-semibold tracking-wider uppercase transition-colors flex items-center space-x-1 cursor-pointer"
            id="wizard_back_btn"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        ) : (
          <div /> // Placeholder to slide next button right
        )}

        {currentStep < 5 ? (
          <button
            onClick={handleNextStep}
            className="bg-navy-deep hover:bg-gold hover:text-navy-deep text-white px-7.5 py-3 rounded-full font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center space-x-1 gold-glow-hover cursor-pointer"
            id="wizard_next_btn"
          >
            <span>Continue Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSaveAndCheckout}
            className="bg-gold hover:bg-gold-light text-navy-deep px-8 py-3.5 rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 gold-glow flex items-center space-x-1 shadow-sm leading-none cursor-pointer"
            id="wizard_confirm_btn"
          >
            <Heart className="w-4 h-4 text-navy-deep hover:scale-110 animate-pulse text-red-600" />
            <span>Book Now & Create Capsule ✨</span>
          </button>
        )}
      </div>

    </div>
  );
}
