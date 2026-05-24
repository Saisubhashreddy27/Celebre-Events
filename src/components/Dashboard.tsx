/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Gift, Calendar, Plus, Clock, Users, ArrowRight, ShieldCheck, Mail, Send, Sparkles, Volume2, FileText, CheckCircle2 } from 'lucide-react';
import { User, CelebrationEvent, PackageType } from '../types';
import { PACKAGES } from '../data';

// --- SUB-COMPONENT: Countdown Timer Ticker ---
interface EventCountdownProps {
  dateStr: string;
  timeStr: string;
  isHero?: boolean;
}

function EventCountdown({ dateStr, timeStr, isHero = false }: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: false });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(`${dateStr}T${timeStr || '09:00'}:00`).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 65)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [dateStr, timeStr]);

  if (timeLeft.isOver) {
    return (
      <span className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-sans font-semibold border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Capsule Delivered ✨</span>
      </span>
    );
  }

  if (isHero) {
    return (
      <div className="font-mono text-center text-sm md:text-base font-bold text-yellow-300 tracking-wide select-none animate-pulse" id="surprise_spark_timer_hero">
        Surprise Spark Timer: {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} seconds
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 text-center" id="countdown_timer_grid">
      <div className="bg-navy-deep/5 border border-gold/15 rounded-lg p-1.5 min-w-[50px]">
        <span className="font-serif text-base font-bold text-navy-deep block">{timeLeft.days}</span>
        <span className="text-[8px] font-sans text-luxury-gray uppercase tracking-wider font-semibold">Days</span>
      </div>
      <div className="bg-navy-deep/5 border border-gold/15 rounded-lg p-1.5 min-w-[50px]">
        <span className="font-serif text-base font-bold text-navy-deep block">{timeLeft.hours}</span>
        <span className="text-[8px] font-sans text-luxury-gray uppercase tracking-wider font-semibold">Hours</span>
      </div>
      <div className="bg-navy-deep/5 border border-gold/15 rounded-lg p-1.5 min-w-[50px]">
        <span className="font-serif text-base font-bold text-navy-deep block">{timeLeft.minutes}</span>
        <span className="text-[8px] font-sans text-luxury-gray uppercase tracking-wider font-semibold">Mins</span>
      </div>
      <div className="bg-navy-deep/5 border border-gold/15 rounded-lg p-1.5 min-w-[50px]">
        <span className="font-serif text-base font-bold text-navy-deep block text-gold-dark">{timeLeft.seconds}</span>
        <span className="text-[8px] font-sans text-gold-dark uppercase tracking-wider font-semibold">Secs</span>
      </div>
    </div>
  );
}

// --- MAIN WORKSPACE WORKSPACE AREA ---
interface DashboardProps {
  user: User;
  events: CelebrationEvent[];
  onPlanNew: () => void;
  onSelectEvent: (eventId: string, destinationPage: string) => void;
  onOpenNotifications: () => void;
  onDuplicateEvent: (evt: CelebrationEvent) => void;
}

export default function Dashboard({
  user,
  events,
  onPlanNew,
  onSelectEvent,
  onOpenNotifications,
  onDuplicateEvent
}: DashboardProps) {
  // Stats
  const upcomingEvents = events.filter(e => e.status === 'Scheduled');
  const pastEvents = events.filter(e => e.status === 'Delivered');
  const draftsCount = events.filter(e => e.status === 'Draft').length;

  // Find the closest upcoming event for hero tracking display
  const closestUpcoming = upcomingEvents.length > 0 
    ? [...upcomingEvents].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]
    : null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 animate-fade-in" id="dashboard_root">
      
      {/* HEADER HERO BANNER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white border border-gold/15 p-8 rounded-[24px] shadow-xs relative overflow-hidden" id="dashboard_greeting_card">
        {/* Background visual sparkles */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-xl pointer-events-none" />
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl">✨</span>
            <span className="font-sans text-[11px] tracking-[0.2em] font-semibold text-gold-dark uppercase">
              Planner Executive Workspace
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4.5xl font-light text-navy-deep">
            Welcome back, <span className="font-normal italic">{user.name}</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-luxury-gray max-w-lg">
            "Sunder, distance is just a coordinate." You have {upcomingEvents.length} scheduled memory capsules pending delivery.
          </p>
        </div>

        <button
          onClick={onPlanNew}
          className="bg-navy-deep hover:bg-gold hover:text-navy-deep text-white px-6.5 py-3.5 rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center space-x-2 gold-glow-hover cursor-pointer"
          id="dashboard_plan_new_btn"
        >
          <Plus className="w-4 h-4" />
          <span>Plan new Surprise</span>
        </button>
      </div>

      {/* STATS COUNT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" id="dashboard_stats_grid">
        <div className="bg-white border border-gold/10 p-6 rounded-[16px] shadow-xs flex items-center justify-between" id="stat_upcoming">
          <div className="space-y-1">
            <span className="font-sans text-[10px] text-luxury-gray uppercase tracking-widest block font-semibold">Scheduled Capsules</span>
            <span className="font-serif text-3xl font-bold text-navy-deep block">{upcomingEvents.length}</span>
          </div>
          <div className="w-11 h-11 bg-gold/5 flex items-center justify-center rounded-full border border-gold/15 text-gold-dark">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-gold/10 p-6 rounded-[16px] shadow-xs flex items-center justify-between" id="stat_delivered">
          <div className="space-y-1">
            <span className="font-sans text-[10px] text-luxury-gray uppercase tracking-widest block font-semibold">Past Deliveries</span>
            <span className="font-serif text-3xl font-bold text-navy-deep block">{pastEvents.length}</span>
          </div>
          <div className="w-11 h-11 bg-emerald-500/5 flex items-center justify-center rounded-full border border-emerald-500/15 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-gold/10 p-6 rounded-[16px] shadow-xs flex items-center justify-between" id="stat_drafts">
          <div className="space-y-1">
            <span className="font-sans text-[10px] text-luxury-gray uppercase tracking-widest block font-semibold">Surprise Drafts</span>
            <span className="font-serif text-3xl font-bold text-navy-deep block">{draftsCount}</span>
          </div>
          <div className="w-11 h-11 bg-charcoal/5 flex items-center justify-center rounded-full border border-charcoal/10 text-charcoal">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* DETAILED CLOSEST COUNTDOWN DISPLAY */}
      {closestUpcoming && (
        <div className="bg-navy-deep text-white p-7 md:p-8 rounded-[24px] shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 border border-gold/25 relative overflow-hidden" id="closest_upcoming_countdown_card">
          <div className="absolute inset-0 bg-linear-to-r from-gold/5 to-transparent pointer-events-none" />
          
          <div className="space-y-3 lg:max-w-md">
            <div className="inline-flex items-center space-x-1.5 bg-gold/10 border border-gold/30 rounded-full px-3.5 py-1 text-gold text-[10px] font-sans font-semibold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span>Next Surprise Approaching</span>
            </div>
            <h3 className="font-serif text-2xl font-light">
              Surprise for <span className="font-normal text-gold-light italic">{closestUpcoming.recipient.name}</span>
            </h3>
            <p className="font-sans text-xs text-ivory/70 leading-relaxed">
              Ours schedule is locking. Deliverable e-card & memory timeline will deploy automatically on <span className="text-white font-medium">{closestUpcoming.date}</span> at <span className="text-white font-medium">{closestUpcoming.time} UTC</span>.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-[16px] flex flex-col items-center justify-center space-y-3 min-w-[240px]">
            <span className="font-sans text-[10px] uppercase tracking-wider text-ivory/50">Surprise Spark Timer</span>
            <EventCountdown dateStr={closestUpcoming.date} timeStr={closestUpcoming.time} isHero={true} />
          </div>

        </div>
      )}

      {/* EVENTS MANAGING HUB */}
      <div className="space-y-5" id="events_managing_panel">
        <div className="flex items-center justify-between border-b border-gold/15 pb-3">
          <h2 className="font-serif text-2xl text-navy-deep font-semibold">Your Active Celebrations</h2>
          <button
            onClick={() => onSelectEvent('', 'my-events')}
            className="font-sans text-xs text-gold-dark font-medium hover:underline flex items-center space-x-1"
            id="view_all_events_btn"
          >
            <span>Manage All Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {events.length === 0 ? (
          /* Empty warning state request */
          <div className="bg-white border border-gold/10 p-12 text-center rounded-[20px] max-w-xl mx-auto space-y-4 shadow-2xs" id="empty_events_state">
            <div className="w-14 h-14 bg-gold/5 flex items-center justify-center rounded-full border border-gold/15 mx-auto text-gold-dark">
              <Gift className="w-7 h-7" />
            </div>
            <p className="font-serif text-lg font-medium text-navy-deep leading-relaxed">
              No events yet — let's plan something magical ✨
            </p>
            <p className="font-sans text-xs sm:text-sm text-luxury-gray max-w-xs mx-auto">
              Distance should never dim the milestone. Setup custom templates, AI copies, or video slide decks to bridge the mile.
            </p>
            <div className="pt-2">
              <button
                onClick={onPlanNew}
                className="bg-gold hover:bg-navy-deep hover:text-white text-navy-deep px-6 py-2.5 rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300"
                id="empty_state_action"
              >
                Plan Birthday or Anniversary
              </button>
            </div>
          </div>
        ) : (
          /* EVENTS SCROLLABLE FLEX OR GRID */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="dashboard_events_grid">
            {events.slice(0, 6).map((evt) => {
              const pack = PACKAGES.find(p => p.id === evt.packageType);
              return (
                <div
                  key={evt.id}
                  className="bg-white border border-gold/10 hover:border-gold/30 rounded-[20px] p-6 shadow-2xs hover:shadow-xs transition-all duration-300 flex flex-col justify-between space-y-6"
                  id={`evt_capsule_${evt.id}`}
                >
                  <div className="space-y-4">
                    {/* Event header metadata */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-sans font-bold tracking-wider uppercase border
                        ${evt.status === 'Scheduled' ? 'bg-amber-500/5 text-amber-600 border-amber-500/15' : ''}
                        ${evt.status === 'Delivered' ? 'bg-emerald-500/5 text-emerald-600 border-emerald-500/15' : ''}
                        ${evt.status === 'Draft' ? 'bg-charcoal/5 text-charcoal/80 border-charcoal/10' : ''}
                      `}>
                        {evt.status}
                      </span>
                      <span className="font-sans text-[10px] text-luxury-gray font-medium">
                        {evt.eventType}
                      </span>
                    </div>

                    {/* Person and detail */}
                    <div className="space-y-1">
                      <h4 className="font-serif text-lg font-semibold text-charcoal">
                        {evt.recipient.name}
                      </h4>
                      <p className="font-sans text-xs text-luxury-gray">
                        Role: <span className="text-charcoal font-medium">{evt.recipient.relationship}</span>
                      </p>
                      <p className="font-sans text-xs text-luxury-gray flex items-center space-x-1 pt-1">
                        <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                        <span>Date: {evt.date} at {evt.time}</span>
                      </p>
                    </div>

                    {/* Countdown Ticker for scheduled items */}
                    {evt.status === 'Scheduled' && (
                      <div className="pt-2 border-t border-gold/10">
                        <span className="text-[9px] font-sans uppercase tracking-widest text-luxury-gray block mb-1.5 font-semibold">Capsule Timer</span>
                        <EventCountdown dateStr={evt.date} timeStr={evt.time} />
                      </div>
                    )}
                  </div>

                  {/* Actions buttons */}
                  <div className="pt-4 border-t border-gold/10 space-y-2">
                    {evt.status === 'Draft' ? (
                      <button
                        onClick={() => onSelectEvent(evt.id, 'plan-event')}
                        className="w-full bg-gold/10 hover:bg-gold hover:text-navy-deep text-gold-dark py-2 rounded-[10px] font-sans text-xs font-semibold uppercase tracking-wider transition-colors duration-300 flex items-center justify-center space-x-1"
                        id={`complete_evt_btn_${evt.id}`}
                      >
                        <span>Complete Event Setup</span>
                      </button>
                    ) : (
                      <div className="space-y-2" id="action_btn_container">
                        <button
                          onClick={() => {
                            // Secret URL reveal action
                            window.open(`/reveal/${evt.id}`, '_blank');
                            onSelectEvent(evt.id, 'reveal');
                          }}
                          className="w-full bg-navy-deep hover:bg-gold hover:text-navy-deep text-white py-2 rounded-[10px] font-sans text-xs font-semibold uppercase tracking-wider transition-colors duration-300 flex items-center justify-center space-x-2.5 cursor-pointer"
                          id={`reveal_preview_btn_${evt.id}`}
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{evt.status === 'Delivered' ? 'View Live Capsule' : 'Admin Reveal Preview'}</span>
                        </button>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => onSelectEvent(evt.id, 'my-events')}
                            className="flex-1 border border-gold/20 hover:border-gold/55 text-gold-dark hover:bg-gold-pale/15 py-1.5 rounded-[10px] font-sans text-[10px] font-medium uppercase tracking-wide transition-all"
                            id={`duplicate_btn_${evt.id}`}
                          >
                            Details & Receipt
                          </button>
                          
                          {evt.status === 'Delivered' && (
                            <button
                              onClick={() => {
                                onDuplicateEvent(evt);
                              }}
                              className="px-3 border border-gold/25 hover:border-gold text-gold-dark hover:bg-gold-pale/15 py-1.5 rounded-[10px] font-sans text-[11px] font-medium uppercase"
                              title="Duplicate surprise for next year"
                              id={`dup_next_yr_btn_${evt.id}`}
                            >
                              ↺
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* RECENT ADVISORY TRUST BANNER */}
      <div className="bg-gold-pale/45 border border-gold/20 p-6 rounded-[20px] flex flex-col md:flex-row items-center justify-between gap-4" id="concierge_trust_advisory">
        <div className="flex items-center space-x-3.5 text-left">
          <div className="w-10 h-10 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center text-gold-dark flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <span className="font-serif text-sm font-semibold text-navy-deep block">Célèbre Concierge Guarantee</span>
            <span className="font-sans text-[11px] text-luxury-gray block">Full SSL transactional security. Automated SMS, WhatsApp, and encrypted media capsules.</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => onSelectEvent('', 'plan-event')}
            className="bg-navy-deep hover:bg-gold hover:text-navy-deep text-white py-2 px-4 rounded-lg font-sans text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            id="read_story_btn"
          >
            Plan a Surprise
          </button>
        </div>
      </div>

    </div>
  );
}
