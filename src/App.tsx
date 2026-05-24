/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import PlanEventPage from './components/PlanEventPage';
import PaymentPage from './components/PaymentPage';
import RevealPage from './components/RevealPage';
import MyEventsPage from './components/MyEventsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ProfilePage from './components/ProfilePage';
import PackagesPage from './components/PackagesPage';

import { User, CelebrationEvent, PaymentRecord, PackageType } from './types';
import { MOCK_EVENTS } from './data';
import { Sparkles, Calendar, Globe, Heart, Shield, ArrowLeft } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from './translations';

export interface NotificationAlertType {
  id: string;
  message: string;
  type: 'primary' | 'success';
  read: boolean;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState<string>('home');
  const [events, setEvents] = useState<CelebrationEvent[]>(MOCK_EVENTS);
  const [preSelectedOccasion, setPreSelectedOccasion] = useState<import('./types').EventType | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<CelebrationEvent | null>(null);
  const [notifications, setNotifications] = useState<NotificationAlertType[]>([
    { id: 'not_1', message: "✨ Your upcoming anniversary card for Emma Jenkins is computed!", type: 'primary', read: false },
    { id: 'not_2', message: "🔒 Transaction security sandboxing is fully active.", type: 'success', read: false }
  ]);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

  const [language, setLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('celebre_lang');
    return (saved as LanguageCode) || 'en';
  });

  const t = TRANSLATIONS[language];

  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    localStorage.setItem('celebre_lang', lang);
  };

  // --- PATH DETECTING CRON ON MOUNT ---
  useEffect(() => {
    // Resolve custom secret reveal paths: e.g. /reveal/evt_1
    const path = window.location.pathname;
    if (path.startsWith('/reveal/')) {
      const parts = path.split('/');
      const parsedId = parts[parts.length - 1];
      if (parsedId) {
        // Find existing or fallback
        setSelectedEventId(parsedId);
        setActivePage('reveal');
      }
    }

    // Attempt to hydrate session from memory
    const loadState = async () => {
      try {
        const resp = await fetch('/api/events');
        if (resp.ok) {
          const list = await resp.json();
          if (Array.isArray(list) && list.length > 0) {
            setEvents(list);
          }
        }
      } catch (err) {
        // Safe backend connection fallback
      }
    };
    loadState();
  }, []);

  // Custom Navigation function
  const handleNavigate = (page: string, overrideUser?: User | null) => {
    let targetPage = page;
    const currentUser = overrideUser !== undefined ? overrideUser : user;
    const protectedPages = ['dashboard', 'plan-event', 'payment', 'my-events', 'profile'];
    if (!currentUser && protectedPages.includes(page)) {
      targetPage = 'auth';
    }
    setActivePage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOccasion = (occType: import('./types').EventType) => {
    if (user) {
      // User is logged in! Setup draft event and navigate.
      const initDraft: CelebrationEvent = {
        id: '',
        plannerId: user.id,
        plannerName: user.name,
        plannerEmail: user.email,
        recipient: {
          name: '',
          email: '',
          phone: '',
          relationship: 'Partner'
        },
        eventType: occType,
        date: '',
        time: '09:00',
        reminderDays: [1, 3],
        reminderMethod: 'Both',
        packageType: 'STANDARD',
        status: 'Draft',
        createdAt: new Date().toISOString(),
        backgroundMusic: 'track_2',
        customHeaderMessage: '',
        collage: [],
        messages: []
      };
      setEditingEvent(initDraft);
      handleNavigate('plan-event');
    } else {
      // Direct user to auth, save state.
      setPreSelectedOccasion(occType);
      handleNavigate('auth');
    }
  };

  const handleLoginSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    // Push new notification
    const helloNot: NotificationAlertType = {
      id: `hello_${Date.now()}`,
      message: `✨ Welcome back, ${authenticatedUser.name}! Ready to coordinate memories across distance?`,
      type: 'primary',
      read: false
    };
    setNotifications([helloNot, ...notifications]);

    if (preSelectedOccasion) {
      const initDraft: CelebrationEvent = {
        id: '',
        plannerId: authenticatedUser.id,
        plannerName: authenticatedUser.name,
        plannerEmail: authenticatedUser.email,
        recipient: {
          name: '',
          email: '',
          phone: '',
          relationship: 'Partner'
        },
        eventType: preSelectedOccasion,
        date: '',
        time: '09:00',
        reminderDays: [1, 3],
        reminderMethod: 'Both',
        packageType: 'STANDARD',
        status: 'Draft',
        createdAt: new Date().toISOString(),
        backgroundMusic: 'track_2',
        customHeaderMessage: '',
        collage: [],
        messages: []
      };
      setEditingEvent(initDraft);
      setPreSelectedOccasion(null); // Clear
      setTimeout(() => {
        handleNavigate('plan-event', authenticatedUser);
      }, 50);
    } else {
      setTimeout(() => {
        handleNavigate('profile', authenticatedUser);
      }, 50);
    }
  };

  const handleLogout = () => {
    setUser(null);
    handleNavigate('home');
  };

  const handleEventCreated = (createdEvt: CelebrationEvent) => {
    // Replace if existing, or prepend if new
    const exists = events.some(e => e.id === createdEvt.id);
    if (exists) {
      setEvents(events.map(e => e.id === createdEvt.id ? createdEvt : e));
    } else {
      setEvents([createdEvt, ...events]);
    }
    // Record selected ID for payment gateway routing
    setSelectedEventId(createdEvt.id);
  };

  const handlePaymentSuccess = (updatedEvt: CelebrationEvent, record: PaymentRecord) => {
    setEvents(events.map(e => e.id === updatedEvt.id ? updatedEvt : e));
    
    // Dispatch congrats notification
    const successNot: NotificationAlertType = {
      id: `pay_${Date.now()}`,
      message: `✨ Surprise capsule scheduled for ${updatedEvt.recipient.name} is now locked!`,
      type: 'success',
      read: false
    };
    setNotifications([successNot, ...notifications]);
    
    // Redirect to Workspace workspace
    handleNavigate('dashboard');
  };

  const handleCancelEvent = async (eventId: string) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, { method: 'DELETE' });
      if (response.ok) {
        setEvents(events.filter(e => e.id !== eventId));
        alert("Event cancellation succeeded! Refund processing codes will transmit to your planner mailbox. ✨");
      }
    } catch (err) {
      alert("Error canceling event capsule.");
    }
  };

  const handleDuplicateEvent = (evt: CelebrationEvent) => {
    // Setup a clean clone
    const clonedObj: CelebrationEvent = {
      ...evt,
      id: '', // Blank out for new setup
      status: 'Draft',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days in future
      createdAt: new Date().toISOString()
    };
    setEditingEvent(clonedObj);
    handleNavigate('plan-event');
  };

  const handleSelectEvent = (eventId: string, destinationPage: string) => {
    setSelectedEventId(eventId);
    const targetEvt = events.find(e => e.id === eventId) || null;
    setEditingEvent(targetEvt);
    handleNavigate(destinationPage);
  };

  const selectedEvent = events.find(e => e.id === selectedEventId) || null;

  return (
    <div className="bg-ivory text-charcoal min-h-screen flex flex-col justify-between">
      
      {/* 1. STICKY GLASS HEADER (Render unless on surprise reveal page for recipient immersion) */}
      {activePage !== 'reveal' && (
        <Navigation
          user={user}
          onLogout={handleLogout}
          currentPage={activePage}
          onNavigate={handleNavigate}
          events={events}
          unreadCountUrl={null}
          onOpenNotificationCenter={() => alert("Célèbre Notifications Dashboard: Secure sandboxing is fully active. All milestone capsule alerts are ready!")}
          language={language}
          onChangeLanguage={handleLanguageChange}
        />
      )}

      {activePage !== 'home' && activePage !== 'reveal' && activePage !== 'dashboard' && (
        <div className="max-w-7xl mx-auto px-6 w-full pt-8 pb-2 relative z-10">
          <button 
            onClick={() => user && ['plan-event', 'payment', 'my-events', 'profile'].includes(activePage) ? handleNavigate('dashboard') : handleNavigate('home')} 
            className="flex items-center space-x-2 text-charcoal/60 hover:text-gold transition-colors font-sans text-sm font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'te' ? 'వెనుకకు' : language === 'hi' ? 'वापस जाएं' : language === 'kn' ? 'ಹಿಂದಕ್ಕೆ' : 'Back'}</span>
          </button>
        </div>
      )}

      {/* 2. SWITCH ROUTING GRID CONTENT */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <LandingPage
            user={user}
            language={language}
            onNavigate={handleNavigate}
            onStartPlanning={() => { if (user) { handleNavigate('plan-event'); } else { handleNavigate('auth'); } }}
            onSelectPackage={(pkg) => { if (user) { handleNavigate('plan-event'); } else { handleNavigate('auth'); } }}
            onSelectOccasion={handleSelectOccasion}
          />
        )}

        {activePage === 'auth' && (
          <AuthPage
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'dashboard' && user && (
          <Dashboard
            user={user}
            events={events}
            onPlanNew={() => { setEditingEvent(null); handleNavigate('plan-event'); }}
            onSelectEvent={handleSelectEvent}
            onOpenNotifications={() => setShowNotificationCenter(true)}
            onDuplicateEvent={handleDuplicateEvent}
          />
        )}

        {activePage === 'plan-event' && user && (
          <PlanEventPage
            user={user}
            onEventCreated={handleEventCreated}
            onNavigate={handleNavigate}
            editingEvent={editingEvent}
          />
        )}

        {activePage === 'payment' && user && (
          <PaymentPage
            event={selectedEvent}
            onPaymentSuccess={handlePaymentSuccess}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'reveal' && selectedEvent && (
          <RevealPage
            event={selectedEvent}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'my-events' && user && (
          <MyEventsPage
            events={events}
            onSelectEvent={handleSelectEvent}
            onCancelEvent={handleCancelEvent}
            onDuplicateEvent={handleDuplicateEvent}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'profile' && user && (
          <ProfilePage
            user={user}
            events={events}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            language={language}
          />
        )}

        {activePage === 'packages' && (
          <PackagesPage
            language={language}
            onSelectPackage={(pkgId) => {
              if (user) {
                // Setup preselected package in template if possible, or just go to plan-event
                const draft: CelebrationEvent = {
                  id: '',
                  plannerId: user.id,
                  plannerName: user.name,
                  plannerEmail: user.email,
                  recipient: {
                    name: '',
                    email: '',
                    phone: '',
                    relationship: 'Partner'
                  },
                  eventType: 'Birthday',
                  date: '',
                  time: '09:00',
                  reminderDays: [1, 3],
                  reminderMethod: 'Both',
                  packageType: pkgId,
                  status: 'Draft',
                  createdAt: new Date().toISOString(),
                  backgroundMusic: 'track_2',
                  customHeaderMessage: '',
                  collage: [],
                  messages: []
                };
                setEditingEvent(draft);
                handleNavigate('plan-event');
              } else {
                handleNavigate('auth');
              }
            }}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            language={language}
          />
        )}
      </main>

      {/* 3. TRADITIONAL ELEGANT FOOTER (Strip on reveal screen and logged-in account views) */}
      {activePage !== 'reveal' && !user && (
        <footer className="bg-navy-deep text-white/90 border-t border-gold/25 pt-14 pb-8" id="corporate_footer_section">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Column 1: Brand statement */}
            <div className="space-y-4">
              <span className="font-serif text-gold text-2.5xl font-semibold tracking-wide">Célèbre</span>
              <p className="font-sans text-xs text-ivory/60 leading-relaxed">
                {t.footer_brand_desc}
              </p>
              <div className="flex space-x-3 text-gold">
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
              </div>
            </div>

            {/* Column 2: Workspace links */}
            <div className="space-y-3 font-sans text-xs">
              <span className="text-[10px] uppercase font-bold text-gold tracking-widest block font-bold">{t.footer_nav_title}</span>
              <ul className="space-y-2 text-ivory/70">
                <li><button onClick={() => handleNavigate('home')} className="hover:text-gold transition-colors cursor-pointer">{t.footer_link_home}</button></li>
                <li><button onClick={() => handleNavigate('about')} className="hover:text-gold transition-colors cursor-pointer">{t.footer_link_brand}</button></li>
                <li><button onClick={() => handleNavigate('contact')} className="hover:text-gold transition-colors cursor-pointer">{t.footer_link_faq}</button></li>
                <li><button onClick={() => user ? handleNavigate('dashboard') : handleNavigate('auth')} className="hover:text-gold transition-colors cursor-pointer">{t.footer_link_dash}</button></li>
              </ul>
            </div>

            {/* Column 3: Secure details */}
            <div className="space-y-3 font-sans text-xs">
              <span className="text-[10px] uppercase font-bold text-gold tracking-widest block font-bold">{t.footer_integrity_title}</span>
              <ul className="space-y-2 text-ivory/70">
                <li className="flex items-center space-x-1.5">
                  <Shield className="w-3.5 h-3.5 text-gold" />
                  <span>{t.footer_ssl_badge}</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5 text-gold" />
                  <span>{t.footer_delivery_badge}</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="space-y-4 font-sans text-xs">
              <span className="text-[10px] uppercase font-bold text-gold tracking-widest block font-bold">{t.footer_news_title}</span>
              <p className="text-ivory/60 leading-relaxed">
                {t.footer_news_desc}
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="saisubhash@gmail.com"
                  className="bg-white/5 border border-gold/15 hover:border-gold/35 focus:border-gold focus:outline-hidden px-3.5 py-2 rounded-l-lg text-xs text-white placeholder-ivory/30 flex-1"
                />
                <button
                  onClick={() => alert("Subscribed! Thank you for trusting Célèbre.")}
                  className="bg-gold hover:bg-gold-light text-navy-deep px-3.5 rounded-r-lg font-bold text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {t.btn_join}
                </button>
              </div>
            </div>

          </div>

          <div className="max-w-7xl mx-auto px-6 border-t border-gold/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] text-ivory/45 text-center">
            <p>{t.footer_copyright}</p>
            <div className="flex space-x-4">
              <span className="hover:underline cursor-pointer">{t.footer_secure_link}</span>
              <span className="hover:underline cursor-pointer">{t.footer_terms}</span>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}
