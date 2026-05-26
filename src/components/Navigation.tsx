/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, Bell, User, LogOut, Gift, Calendar, Globe } from 'lucide-react';
import { User as UserType, CelebrationEvent } from '../types';
import { LanguageCode, TRANSLATIONS } from '../translations';

interface NavigationProps {
  user: UserType | null;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  events: CelebrationEvent[];
  unreadCountUrl: string | null;
  onOpenNotificationCenter: () => void;
  language: LanguageCode;
  onChangeLanguage: (lang: LanguageCode) => void;
}

export default function Navigation({
  user,
  onLogout,
  currentPage,
  onNavigate,
  events,
  unreadCountUrl,
  onOpenNotificationCenter,
  language,
  onChangeLanguage
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const t = TRANSLATIONS[language];

  // Filter events to find those coming up in less than 7 days to trigger alerts
  const alertEvents = events.filter(e => {
    if (e.status !== 'Scheduled') return false;
    const daysLeft = Math.ceil((new Date(e.date).getTime() - Date.now()) / (1000 * 24 * 60 * 60));
    return daysLeft > 0 && daysLeft <= 7;
  });

  const navLinks = user
    ? user.role === 'admin'
      ? [
          { label: 'Admin Dashboard', id: 'admin-dashboard' }
        ]
      : [
          { label: t.nav_bookings, id: 'dashboard' },
          { label: t.nav_new_booking, id: 'plan-event' }
        ]
    : [
        { label: t.nav_home, id: 'home' },
        { label: t.nav_packages, id: 'packages' },
        { label: t.nav_about_us, id: 'about' },
        { label: t.nav_contact, id: 'contact' }
      ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <nav className="sticky top-0 z-[100] bg-white/30 backdrop-blur-md border-b border-gold/20 py-4 px-6 md:px-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <button
          onClick={() => onNavigate(user ? (user.role === 'admin' ? 'admin-dashboard' : 'dashboard') : 'home')}
          className="flex items-center space-x-2.5 text-left group"
          id="nav_logo_btn"
        >
          <div className="relative flex items-center justify-center w-8 w-8 h-8 h-8 rounded-full border-2 border-gold/80 bg-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-gold">
            <span className="text-gold font-serif italic text-lg leading-none font-semibold">C</span>
            <div className="absolute inset-0 border border-gold/25 rounded-full animate-ping opacity-25 group-hover:hidden" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-semibold tracking-wide text-charcoal leading-none">
              Célèbre
            </span>
            <span className="font-sans text-[9px] tracking-[0.16em] text-gold-dark uppercase mt-0.5 font-bold">
              {t.app_subtitle}
            </span>
          </div>
        </button>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isLinkActive = 
              currentPage === link.id || 
              (link.id === 'dashboard' && (currentPage === 'my-events' || currentPage === 'payment'));
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`font-sans text-sm tracking-wide transition-colors duration-300 relative py-1 hover:text-gold ${
                  isLinkActive ? 'text-gold font-semibold' : 'text-charcoal/80'
                }`}
                id={`nav_link_${link.id}`}
              >
                {link.label}
                {isLinkActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold" />
                )}
              </button>
            );
          })}
        </div>

        {/* CONTROLS */}
        <div className="hidden md:flex items-center space-x-6">
          {/* DESKTOP LANGUAGE SELECTOR */}
          <div className="flex items-center space-x-1.5 bg-[#FAF9F5] border border-gold/30 rounded-full px-3 py-1 text-navy-deep hover:border-gold transition-colors duration-300" id="desktop_nav_language_selector">
            <Globe className="w-3.5 h-3.5 text-[#B89025] shrink-0" />
            <select
              value={language}
              onChange={(e) => onChangeLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-navy-deep font-sans text-xs font-bold tracking-wide border-0 outline-hidden cursor-pointer py-1 pl-1 pr-1.5 focus:ring-0"
              id="desktop_nav_language_select"
              aria-label="Selection of preferred language"
            >
              <option value="en">English 🇬🇧</option>
              <option value="te">తెలుగు 🇮🇳</option>
              <option value="hi">हिन्दी 🇮🇳</option>
              <option value="kn">ಕನ್ನಡ 🇮🇳</option>
            </select>
          </div>

          {user ? (
            <div className="flex items-center space-x-4">
              {/* Alert Bell */}
              <button
                onClick={onOpenNotificationCenter}
                className="relative p-2 text-charcoal/85 hover:text-gold transition-colors duration-300 rounded-full hover:bg-charcoal/5"
                id="nav_bell_btn"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {alertEvents.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-dark"></span>
                  </span>
                )}
              </button>

              {/* User profile identifier */}
              <button
                onClick={() => handleLinkClick('profile')}
                className="flex items-center space-x-2 bg-blush hover:bg-gold/10 border border-gold/20 rounded-full pl-3 pr-4 py-1.5 shadow-3xs cursor-pointer transition-colors"
                title="Go to Profile"
              >
                <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center border border-gold/30">
                  <User className="w-3.5 h-3.5 text-gold-dark animate-pulse" />
                </div>
                <span className="font-sans text-xs font-semibold text-charcoal max-w-[120px] truncate">
                  {user.name}
                </span>
              </button>

              {/* Logout button */}
              <button
                onClick={onLogout}
                className="p-2 text-charcoal/60 hover:text-red-600 transition-colors duration-300 rounded-full hover:bg-charcoal/5"
                title="Log Out"
                id="nav_logout_btn"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleLinkClick('auth')}
              className="bg-[#1A1A2E] text-white px-6 py-2.5 rounded-full hover:bg-gold transition-all duration-300 shadow-lg hover:scale-105 uppercase tracking-wider font-sans text-xs font-semibold"
              id="nav_login_action"
            >
              {t.nav_login_signup}
            </button>
          )}
        </div>

        {/* MOBILE TRIGGER */}
        <div className="flex md:hidden items-center space-x-3">
          {user && (
            <button
              onClick={onOpenNotificationCenter}
              className="relative p-2 text-charcoal/85 hover:text-gold"
              id="nav_mobile_bell_btn"
            >
              <Bell className="w-5 h-5 pointer-events-none" />
              {alertEvents.length > 0 && (
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-dark"></span>
                </span>
              )}
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-charcoal hover:text-gold p-1"
            id="nav_hamburger"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE PANEL */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gold/15 flex flex-col space-y-4 px-3 pb-3 bg-white rounded-2xl shadow-xl animate-fade-in" id="mobile_menu">
          {/* MOBILE LANGUAGE SELECTOR */}
          <div className="flex items-center space-x-2 bg-[#FAF9F5] border border-gold/25 rounded-xl px-4 py-2.5" id="mobile_lang_container">
            <Globe className="w-4 h-4 text-[#B89025] shrink-0" />
            <div className="flex-1 flex flex-col items-start">
              <span className="font-sans text-[9px] uppercase tracking-wider text-charcoal/50 font-bold leading-none mb-1">Language / ಭಾಷೆ / भाषा</span>
              <select
                value={language}
                onChange={(e) => {
                  onChangeLanguage(e.target.value as LanguageCode);
                }}
                className="w-full bg-transparent text-navy-deep font-sans text-xs font-bold border-none outline-hidden focus:ring-0 focus:outline-hidden p-0"
                id="mobile_nav_language_select"
              >
                <option value="en">English 🇬🇧</option>
                <option value="te">తెలుగు 🇮🇳</option>
                <option value="hi">हिन्दी 🇮🇳</option>
                <option value="kn">ಕನ್ನಡ 🇮🇳</option>
              </select>
            </div>
          </div>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-left py-2 text-base tracking-wide transition-colors ${
                currentPage === link.id ? 'text-gold font-bold' : 'text-charcoal/80'
              }`}
              id={`mobile_nav_link_${link.id}`}
            >
              {link.label}
            </button>
          ))}
          
          {user ? (
            <div className="flex flex-col space-y-4 pt-4 border-t border-gold/15">
              <button 
                onClick={() => handleLinkClick('profile')}
                className="flex items-center space-x-3 py-1 hover:bg-gold/10 rounded-xl px-2 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center border border-gold/30">
                  <User className="w-4 h-4 text-gold-dark" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-bold text-charcoal">
                    {user.name}
                  </span>
                  <span className="font-sans text-[10px] text-charcoal/60">
                    {user.email}
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="text-left py-2 text-red-600 font-sans text-sm flex items-center gap-2"
                id="mobile_nav_link_logout"
              >
                <LogOut className="w-4.5 h-4.5" />
                {t.nav_logout}
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleLinkClick('auth')}
              className="bg-[#1A1A2E] text-white w-full text-center py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-gold transition-colors duration-300"
              id="mobile_nav_login_action"
            >
              {t.nav_login_signup}
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
