/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { User, CelebrationEvent } from '../types';
import { ShieldAlert, User as UserIcon, Mail, Shield, ShieldCheck, MapPin, Calendar, Clock, BadgeCheck, Camera, Save } from 'lucide-react';

interface ProfilePageProps {
  user: User;
  events: CelebrationEvent[];
  onNavigate: (page: string) => void;
}

export default function ProfilePage({ user, events, onNavigate }: ProfilePageProps) {
  const [name, setName] = useState(user.name);
  const [email] = useState(user.email);
  const [timezone, setTimezone] = useState('GMT+05:30 (India Standard Time)');
  const [phone, setPhone] = useState('+1 (555) 019-2831');
  const [successMsg, setSuccessMsg] = useState('');

  const scheduledEvents = events.filter(e => e.status === 'Scheduled').length;
  const deliveredEvents = events.filter(e => e.status === 'Delivered').length;
  const totalDrafts = events.filter(e => e.status === 'Draft').length;

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    user.name = name; // Update in memory
    setSuccessMsg('✨ Your planner profile credentials have been synchronized successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 animate-fade-in" id="profile_root">
      
      {/* Header and Title */}
      <div className="space-y-2">
        <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-gold-dark uppercase block">
          Planner Security & Credentials
        </span>
        <h1 className="font-serif text-3xl sm:text-4.5xl font-light text-navy-deep">
          Your <span className="font-normal italic">Célèbre Profile</span>
        </h1>
        <p className="font-sans text-xs text-luxury-gray leading-relaxed max-w-xl">
          Manage your secure surprise coordinate records, timezone triggers, and credentials.
        </p>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 p-4 rounded-[16px] font-sans text-xs flex items-center gap-2.5 animate-slide-up" id="profile_success_banner">
          <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Avatar & Quick Info Badge */}
        <div className="md:col-span-1 bg-white border border-gold/15 p-6 rounded-[24px] shadow-2xs space-y-6 text-center" id="profile_left_card">
          <div className="relative w-24 h-24 mx-auto">
            <div className="w-full h-full rounded-full bg-blush border-2 border-gold/40 flex items-center justify-center overflow-hidden">
              <span className="font-serif text-3xl text-gold-dark font-semibold italic">
                {name.charAt(0) || 'U'}
              </span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-navy-deep text-white flex items-center justify-center border border-white hover:bg-gold transition-colors shadow-sm" id="profile_avatar_upload_btn" aria-label="Upload Photo">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-1.5">
              <h2 className="font-serif text-lg font-bold text-charcoal">{name}</h2>
              <BadgeCheck className="w-4.5 h-4.5 text-gold-dark" title="Verified Creator Account" />
            </div>
            <span className="font-sans text-[10px] bg-gold/15 text-gold-dark px-3 py-1 rounded-full font-bold uppercase tracking-wider inline-block">
              Premium Planner
            </span>
          </div>

          <div className="border-t border-gold/10 pt-4 space-y-3.5 text-left font-sans text-xs text-charcoal/85">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-gold-dark" />
              <div>
                <p className="text-[10px] text-luxury-gray uppercase font-semibold">Member Since</p>
                <p className="font-semibold text-navy-deep">May 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gold-dark" />
              <div>
                <p className="text-[10px] text-luxury-gray uppercase font-semibold">Last Login</p>
                <p className="font-semibold text-navy-deep">Today (IP Safe)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-gold-dark" />
              <div>
                <p className="text-[10px] text-luxury-gray uppercase font-semibold">Account Status</p>
                <p className="font-semibold text-emerald-600">Active Sec-Socket</p>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="border-t border-gold/10 pt-4 grid grid-cols-3 gap-2 text-center" id="profile_quick_stats">
            <div className="p-1 px-1">
              <span className="font-serif text-lg font-bold text-navy-deep block">{scheduledEvents}</span>
              <span className="font-sans text-[8px] text-luxury-gray uppercase tracking-wider">Scheduled</span>
            </div>
            <div className="p-1 px-1 border-x border-gold/10">
              <span className="font-serif text-lg font-bold text-navy-deep block">{deliveredEvents}</span>
              <span className="font-sans text-[8px] text-luxury-gray uppercase tracking-wider">Delivered</span>
            </div>
            <div className="p-1 px-1">
              <span className="font-serif text-lg font-bold text-navy-deep block">{totalDrafts}</span>
              <span className="font-sans text-[8px] text-luxury-gray uppercase tracking-wider">Drafts</span>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Credentials Form */}
        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="bg-white border border-gold/15 p-6 sm:p-8 rounded-[24px] shadow-2xs space-y-6" id="profile_edit_form">
            <h3 className="font-serif text-xl font-semibold text-navy-deep border-b border-gold/10 pb-3">
              Account Credentials
            </h3>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85 flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Planner's Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-ivory/30 border border-gold/15 hover:border-gold/35 focus:border-gold focus:outline-hidden px-4 py-3 rounded-xl text-sm transition-all text-charcoal"
                  required
                  id="profile_name_input"
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Contact Email</span>
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  title="Contact support to update registered email"
                  className="w-full bg-charcoal/5 border border-gold/10 px-4 py-3 rounded-xl text-sm text-charcoal/60 cursor-not-allowed select-none"
                  id="profile_email_input"
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Your Base Timezone</span>
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-ivory/30 border border-gold/15 hover:border-gold/35 focus:border-gold focus:outline-hidden px-4 py-3 rounded-xl text-sm transition-all text-charcoal cursor-pointer"
                  id="profile_timezone_select"
                >
                  <option>GMT+05:30 (India Standard Time)</option>
                  <option>GMT+00:00 (Greenwich Mean Time)</option>
                  <option>GMT-04:00 (Eastern Standard Time)</option>
                  <option>GMT-07:00 (Pacific Standard Time)</option>
                  <option>GMT+08:00 (Singapore Standard Time)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/85 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Planner's Phone</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-ivory/30 border border-gold/15 hover:border-gold/35 focus:border-gold focus:outline-hidden px-4 py-3 rounded-xl text-sm transition-all text-charcoal"
                  id="profile_phone_input"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gold/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="font-sans text-[11px] text-luxury-gray leading-relaxed max-w-sm">
                * Célèbre utilizes AES-256 protocols to lock surprise files. Changing timezone affects delivery dispatch hours.
              </p>
              <button
                type="submit"
                className="bg-navy-deep hover:bg-gold hover:text-navy-deep text-white px-6 py-3 rounded-xl font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2"
                id="profile_save_changes_btn"
              >
                <Save className="w-4 h-4" />
                <span>Save Credentials</span>
              </button>
            </div>
          </form>

          {/* Privacy Sec Card */}
          <div className="bg-blush/35 border border-gold/15 p-6 rounded-[24px] space-y-4" id="profile_privacy_sec_banner">
            <h4 className="font-serif text-lg font-semibold text-navy-deep flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-gold-dark animate-bounce" />
              <span>Célèbre Security Notice</span>
            </h4>
            <p className="font-sans text-xs text-charcoal/80 leading-relaxed">
              Your surprise capsules are cryptographically locked until the exact delivery date-time. Célèbre staff have zero access tokens to private video URLs or photo bundles without explicit consent. Support requests expire automatically in 24 hours.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
