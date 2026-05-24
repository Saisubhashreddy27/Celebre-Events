/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Calendar, Trash2, Clock, CheckCircle2, Copy, FileDown, Search, ArrowLeft, RefreshCw, XCircle } from 'lucide-react';
import { CelebrationEvent } from '../types';
import { PACKAGES } from '../data';

interface MyEventsPageProps {
  events: CelebrationEvent[];
  onSelectEvent: (eventId: string, destinationPage: string) => void;
  onCancelEvent: (eventId: string) => void;
  onDuplicateEvent: (evt: CelebrationEvent) => void;
  onNavigate: (page: string) => void;
}

export default function MyEventsPage({
  events,
  onSelectEvent,
  onCancelEvent,
  onDuplicateEvent,
  onNavigate
}: MyEventsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Scheduled' | 'Delivered' | 'Draft'>('All');

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.eventType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDownloadInvoice = (evt: CelebrationEvent) => {
    // Generate lovely mock PDF invoice values as a plain TXT receipt in browser file downloads
    const pack = PACKAGES.find(p => p.id === evt.packageType) || PACKAGES[1];
    const receiptText = `
=============================================
             CÉLÈBRE SURPRISE EVENT
                OFFICIAL INVOICE
=============================================
Invoice Date: ${new Date().toLocaleDateString()}
Transaction ID: ${evt.paymentId || 'pay_draft_sim_8592'}
Event ID: ${evt.id}
Planner Name: ${evt.plannerName}
Planner Email: ${evt.plannerEmail}

------ RECIPIENT SURPRISE TARGET -----------
Recipient Name: ${evt.recipient.name}
Occasion honored: ${evt.eventType}
Deployment local date: ${evt.date} at ${evt.time} Local Time

------ PACKAGE DETAILS & COST --------------
Package Tier: ${pack.name}
Total Paid: $${pack.priceUSD} USD / ₹${pack.priceINR} INR
Status: ${evt.status}

Thank you for choosing Célèbre. 
Distance is just a coordinate when hearts connect.
=============================================
`;
    const element = document.createElement("a");
    const file = new Blob([receiptText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `CELEBRE-INVOICE-${evt.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCancelSafety = (evt: CelebrationEvent) => {
    // Check if cancellation is allowed (before 48 hours of event)
    const eventTime = new Date(`${evt.date}T${evt.time || '09:00'}:00`).getTime();
    const now = Date.now();
    const hoursLeft = (eventTime - now) / (1000 * 60 * 60);

    if (hoursLeft < 48) {
      alert("Surprise Locking Notice: This capsule is already packaged and in loading bays waiting in queue for precision timezone delivery. Cancellations must be scheduled at least 48 hours prior to launch. ✨");
      return;
    }

    if (confirm(`Are you absolutely sure you wish to cancel the surprise experience for ${evt.recipient.name}? Refund details will follow via mail.`)) {
      onCancelEvent(evt.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8 animate-fade-in" id="my_events_page_root">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold/15 pb-5">
        <div className="space-y-1">
          <button
            onClick={() => onNavigate('dashboard')}
            className="font-sans text-xs text-gold-dark hover:underline flex items-center gap-1.5 pb-1"
            id="back_to_dashboard_link"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back Dashboard</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4.5xl text-navy-deep font-light">
            Your Scheduled <span className="italic font-normal">Celebrations</span>
          </h1>
        </div>

        <button
          onClick={() => onNavigate('plan-event')}
          className="bg-navy-deep hover:bg-gold hover:text-navy-deep text-white px-5.5 py-3 rounded-full font-sans text-xs font-bold tracking-wider uppercase transition-colors"
          id="plan_new_action"
        >
          Plan new surprise
        </button>
      </div>

      {/* FILTER CONTROLS */}
      <div className="bg-white border border-gold/15 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between font-sans">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-luxury-gray" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by recipient or occasion..."
            className="w-full bg-gold-pale/15 border border-gold/15 focus:border-gold focus:outline-hidden pl-10 pr-4 py-2.5 rounded-lg text-xs sm:text-sm text-charcoal"
            id="search_filter_input"
          />
        </div>

        {/* Status Filters buttons */}
        <div className="flex flex-wrap gap-2">
          {['All', 'Scheduled', 'Delivered', 'Draft'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st as any)}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-semibold cursor-pointer transition-all ${
                statusFilter === st
                  ? 'bg-navy-deep text-gold border-navy-deep font-bold'
                  : 'bg-white text-luxury-gray border border-gold/10 hover:border-gold/30'
              }`}
              id={`status_filter_btn_${st}`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* DETAILED LISTING */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white border border-gold/10 p-16 text-center rounded-[24px] max-w-xl mx-auto space-y-4 shadow-3xs">
          <XCircle className="w-12 h-12 text-[#B89025] mx-auto animate-pulse" />
          <h3 className="font-serif text-xl font-medium text-navy-deep">No Celebrations Located</h3>
          <p className="font-sans text-xs sm:text-sm text-luxury-gray">
            We couldn't locate any events matching your selected filters. Let's plan a coming birthday or anniversary milestone!
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('plan-event')}
              className="bg-gold text-navy-deep px-5.5 py-2.5 rounded-full font-sans text-xs font-bold uppercase transition-transform hover:scale-103"
              id="empty_events_plan_action"
            >
              Start Curation Wizard
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6" id="my_events_list_wrapper">
          {filteredEvents.map((evt) => {
            const pac = PACKAGES.find(p => p.id === evt.packageType) || PACKAGES[1];
            return (
              <div
                key={evt.id}
                className="bg-white border border-gold/12 hover:border-gold/35 rounded-[20px] p-6 shadow-2xs transition-all duration-300 grid lg:grid-cols-12 gap-6 items-center"
                id={`detailed_evt_row_${evt.id}`}
              >
                
                {/* Meta details */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-sans font-bold uppercase tracking-wider border
                      ${evt.status === 'Scheduled' ? 'bg-amber-500/5 text-amber-600 border-amber-500/15' : ''}
                      ${evt.status === 'Delivered' ? 'bg-emerald-500/5 text-emerald-600 border-emerald-500/15' : ''}
                      ${evt.status === 'Draft' ? 'bg-charcoal/5 text-charcoal/70 border-charcoal/10' : ''}
                    `}>
                      {evt.status}
                    </span>
                    <span className="font-sans text-xs text-luxury-gray">
                      ID: <span className="font-mono text-[10px] text-charcoal">{evt.id}</span>
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-semibold text-charcoal">
                      {evt.recipient.name}
                    </h3>
                    <p className="font-sans text-xs text-luxury-gray">
                      Occasion honored: <span className="font-serif text-navy-deep font-semibold italic">{evt.eventType}</span>
                    </p>
                  </div>
                </div>

                {/* Scheduling and structure parameters */}
                <div className="lg:col-span-4 space-y-1.5 font-sans text-xs sm:text-sm">
                  <p className="flex justify-between lg:justify-start lg:space-x-4">
                    <span className="text-luxury-gray lg:min-w-[80px]">Deploy Date:</span>
                    <span className="text-charcoal font-medium">{evt.date} at {evt.time} Local</span>
                  </p>
                  <p className="flex justify-between lg:justify-start lg:space-x-4">
                    <span className="text-luxury-gray lg:min-w-[80px]">Package:</span>
                    <span className="text-navy-deep font-bold">{pac.name} ({pac.priceUSD} USD)</span>
                  </p>
                  <p className="flex justify-between lg:justify-start lg:space-x-4">
                    <span className="text-luxury-gray lg:min-w-[80px]">Reminders:</span>
                    <span className="text-charcoal font-medium">{evt.reminderMethod} (Channels active)</span>
                  </p>
                </div>

                {/* Surgical trigger action panels */}
                <div className="lg:col-span-4 flex flex-wrap lg:flex-nowrap gap-2 justify-end">
                  
                  {evt.status === 'Draft' ? (
                    <button
                      onClick={() => onSelectEvent(evt.id, 'plan-event')}
                      className="flex-1 bg-gold hover:bg-navy-deep hover:text-white text-navy-deep py-2.5 px-4 rounded-lg font-sans text-xs font-semibold uppercase tracking-wider transition-colors"
                      id={`list_complete_btn_${evt.id}`}
                    >
                      Complete Draft
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full" id="row_action_hub">
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            window.open(`/reveal/${evt.id}`, '_blank');
                            onSelectEvent(evt.id, 'reveal');
                          }}
                          className="flex-1 bg-navy-deep hover:bg-gold hover:text-navy-deep text-white py-2 rounded-lg font-sans text-[11px] font-semibold uppercase tracking-wider duration-300 cursor-pointer"
                          id={`list_view_reveal_${evt.id}`}
                        >
                          View Reveal Page
                        </button>
                        
                        <button
                          onClick={() => handleDownloadInvoice(evt)}
                          className="border border-gold/20 hover:border-gold text-gold-dark hover:bg-gold-pale/15 p-2 rounded-lg text-xs"
                          title="Download receipt / PDF Invoice"
                          id={`download_invoice_btn_${evt.id}`}
                        >
                          <FileDown className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex gap-2 w-full">
                        {evt.status === 'Scheduled' && (
                          <button
                            onClick={() => handleCancelSafety(evt)}
                            className="flex-1 border border-red-200 text-red-600 hover:bg-red-50 p-2 rounded-lg font-sans text-[11px] font-medium uppercase tracking-wide duration-300"
                            id={`list_cancel_btn_${evt.id}`}
                          >
                            Cancel Surprise
                          </button>
                        )}
                        
                        {evt.status === 'Delivered' && (
                          <button
                            onClick={() => onDuplicateEvent(evt)}
                            className="flex-1 border border-gold/25 font-sans font-medium text-[10px] tracking-wider text-[#B89025] uppercase py-2 hover:bg-gold-pale/15 rounded-lg flex items-center justify-center space-x-1.5"
                            id={`list_dup_btn_${evt.id}`}
                          >
                            <RefreshCw className="w-3 h-3 text-[#B89025]" />
                            <span>Plan Next Year</span>
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
  );
}
