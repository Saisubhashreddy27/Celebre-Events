/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Calendar, Shield, CreditCard, Sparkles, Check, ChevronLeft, Ticket, BookOpen, Clock } from 'lucide-react';
import { CelebrationEvent, PaymentRecord, PackageType } from '../types';
import { PACKAGES } from '../data';

interface PaymentPageProps {
  event: CelebrationEvent | null;
  onPaymentSuccess: (updatedEvent: CelebrationEvent, record: PaymentRecord) => void;
  onNavigate: (page: string) => void;
}

export default function PaymentPage({ event, onPaymentSuccess, onNavigate }: PaymentPageProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  
  // Credit Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookedRecord, setBookedRecord] = useState<PaymentRecord | null>(null);

  // Fallback to avoid crashes if event is null
  if (!event) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <p className="font-serif text-lg font-medium text-navy-deep">No pending transaction found</p>
        <button onClick={() => onNavigate('dashboard')} className="bg-navy-deep text-white px-5 py-2.5 rounded-full font-sans text-xs uppercase font-semibold">
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Get base prices
  const pack = PACKAGES.find(p => p.id === event.packageType) || PACKAGES[1];
  const usdPrice = pack.priceUSD;
  const inrPrice = pack.priceINR;

  const currentUSDTotal = Math.max(0, usdPrice - promoDiscount);
  const currentINRTotal = Math.max(0, inrPrice - (promoDiscount * 100)); // Sim approximate INR promo subtraction

  // Apply code CELEBRE10 for 10% off
  const handleApplyPromo = () => {
    setPromoError('');
    if (!promoCode) return;
    
    if (promoCode.toUpperCase() === 'CELEBRE10') {
      const disc = parseFloat((usdPrice * 0.1).toFixed(2));
      setPromoDiscount(disc);
      setPromoApplied(true);
    } else {
      setPromoError('Coupon code invalid or expired.');
    }
  };

  // Secure Checkout Simulator
  const handleSimulatePayment = async (method: string) => {
    setProcessing(true);
    try {
      // POST back-end Checkout Simulator
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventId: event.id,
          packageType: event.packageType,
          promoCode: promoApplied ? promoCode : undefined,
          paymentMethod: method,
          currency: 'USD'
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Payment transaction rejected.');

      setBookedRecord(data.paymentRecord);
      setPaymentSuccess(true);
      
      // Delay to show success confetti screen or checking checkmark, then bubble up state!
      setTimeout(() => {
        onPaymentSuccess(data.event, data.paymentRecord);
      }, 3500);

    } catch (err: any) {
      alert('Sandbox Payment Lockout: ' + err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (paymentSuccess && bookedRecord) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center space-y-8 animate-fade-in" id="payment_success_screen">
        
        {/* Confetti simulation overlay visuals */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 bg-emerald-500/10 rounded-full border border-emerald-500/35 mb-2 shadow-inner">
          <Check className="w-10 h-10 text-emerald-600 animate-pulse" />
          <div className="absolute inset-0 bg-emerald-500/5 animate-ping rounded-full opacity-45" />
        </div>

        <div className="space-y-3">
          <span className="font-sans text-[11px] font-bold text-emerald-600 uppercase tracking-widest block">
            Transaction Fully Accomplished ✨
          </span>
          <h2 className="font-serif text-3xl md:text-4.5xl text-navy-deep font-light">
            Your Celebration is Scheduled!
          </h2>
          <p className="font-sans text-xs sm:text-sm text-luxury-gray max-w-sm mx-auto leading-relaxed">
            A confirmation invoice has been locked to your organizer mailbox. Our back-end schedulers are coordinating your surprise for Michael Jenkins.
          </p>
        </div>

        {/* Invoice Summary Card */}
        <div className="bg-gold-pale/35 border border-gold/15 p-6 rounded-[16px] text-left text-xs font-sans space-y-4 max-w-md mx-auto" id="invoice_summary_card">
          <div className="flex items-center justify-between border-b border-gold/15 pb-2">
            <span className="font-serif text-sm font-semibold text-navy-deep">Surprise Summary Invoice</span>
            <span className="font-mono text-[9px] text-gold-dark uppercase font-semibold">Active Booking</span>
          </div>

          <div className="space-y-1.5">
            <p className="flex justify-between"><span className="text-luxury-gray">Booking ID:</span> <span className="text-charcoal font-semibold">{bookedRecord.id}</span></p>
            <p className="flex justify-between"><span className="text-luxury-gray">Recipient:</span> <span className="text-charcoal font-semibold">{event.recipient.name}</span></p>
            <p className="flex justify-between"><span className="text-luxury-gray">Occasion:</span> <span className="text-charcoal font-semibold">{event.eventType}</span></p>
            <p className="flex justify-between"><span className="text-luxury-gray">Deploy Date:</span> <span className="text-charcoal font-semibold">{event.date} at {event.time} Local</span></p>
            <p className="flex justify-between"><span className="text-luxury-gray">Package Selected:</span> <span className="text-charcoal font-semibold">{pack.name}</span></p>
          </div>

          <div className="border-t border-gold/15 pt-2 flex justify-between font-serif text-sm font-bold text-navy-deep">
            <span>Charged:</span>
            <span>${bookedRecord.amountUSD} USD / ₹{bookedRecord.amountINR} INR</span>
          </div>
        </div>

        <div className="pt-4 text-xs font-sans text-luxury-gray flex items-center justify-center space-x-1">
          <Clock className="w-3.5 h-3.5 animate-spin" />
          <span>Redirecting back to your Planner Workspace sandbox...</span>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8 animate-fade-in" id="payment_root">
      
      {/* HEADER CRUMBS */}
      <div className="space-y-2 text-center">
        <span className="font-sans text-[11px] uppercase tracking-[0.20em] text-gold-dark font-semibold">
          Secure Payment Portal (SSL Sandboxed)
        </span>
        <h1 className="font-serif text-3xl md:text-4xl text-navy-deep font-light">
          Finalize Celebration <span className="italic font-normal">Booking</span>
        </h1>
        <div className="w-16 h-[1px] bg-gold-dark/40 mx-auto" />
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start" id="checkout_gateway_box">
        
        {/* COLUMN 1: SENSITIVE SECURED INPUTS */}
        <div className="lg:col-span-7 bg-white border border-gold/15 p-8 rounded-[24px] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gold/10 pb-3">
            <h3 className="font-serif text-xl font-semibold text-navy-deep">Billing Details</h3>
            <span className="inline-flex items-center space-x-1 text-[#D4AF37] text-[10px] uppercase font-mono bg-amber-500/5 px-2.5 py-1 rounded-full font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>Sandbox Gateway active</span>
            </span>
          </div>

          {/* CARD INFORMATION */}
          <form className="space-y-4 font-sans" onSubmit={(e) => { e.preventDefault(); handleSimulatePayment('Credit Card'); }}>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-charcoal/80 uppercase tracking-wider block">Cardholder Family Name</label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Sarah Jenkins"
                className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] text-xs sm:text-sm text-charcoal"
                id="billing_cardholder_name"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-charcoal/80 uppercase tracking-wider block">Credit Card Number</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-luxury-gray" />
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4242 •••• •••• 4242"
                  maxLength={19}
                  className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden pl-12 pr-4 py-3 rounded-[12px] text-xs sm:text-sm text-charcoal"
                  id="billing_card_number"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-charcoal/80 uppercase tracking-wider block">Expiry Parameters</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM / YY"
                  maxLength={5}
                  className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] text-xs sm:text-sm text-charcoal"
                  id="billing_card_expiry"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-charcoal/80 uppercase tracking-wider block">CVV Code</label>
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="•••"
                  maxLength={4}
                  className="w-full bg-gold-pale/35 border border-gold/15 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] text-xs sm:text-sm text-charcoal"
                  id="billing_card_cvv"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-navy-deep hover:bg-gold hover:text-navy-deep text-white py-4 rounded-[12px] font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2.5 gold-glow cursor-pointer"
                id="stripe_pay_btn"
              >
                <Shield className="w-4 h-4 text-gold-light" />
                <span>{processing ? 'Fully Authenticating Transaction...' : `Pay $${currentUSDTotal} USD / ₹${currentINRTotal} INR via Secured SSL`}</span>
              </button>
            </div>
          </form>

          {/* OR NetBanking / UPI options for domestic users */}
          <div className="pt-4 border-t border-gold/15 space-y-4 font-sans">
            <span className="text-[10px] font-semibold text-luxury-gray uppercase tracking-widest block font-bold text-center">Alternative Domestic Channels</span>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSimulatePayment('UPI QR Code')}
                disabled={processing}
                className="border border-[#D4AF37]/35 bg-white hover:bg-gold-pale/10 p-3 rounded-xl flex items-center justify-center space-x-1.5 transition-all text-xs text-charcoal font-medium cursor-pointer"
                id="razorpay_upi_btn"
              >
                <span>⚡ Razorpay UPI Transfer</span>
              </button>
              <button
                onClick={() => handleSimulatePayment('PayPal Gateway')}
                disabled={processing}
                className="border border-gold/15 bg-white hover:bg-gold-pale/10 p-3 rounded-xl flex items-center justify-center space-x-1.5 transition-all text-xs text-charcoal font-medium cursor-pointer"
                id="paypal_wallet_btn"
              >
                <span>💳 Global PayPal Gateway</span>
              </button>
            </div>
          </div>

        </div>

        {/* COLUMN 2: SUMMARY SIDEBAR */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white border border-gold/15 p-6 rounded-[24px] shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-semibold text-navy-deep border-b border-gold/10 pb-2">Order Summary</h3>
            
            <div className="space-y-3 font-sans text-xs">
              <p className="flex justify-between"><span className="text-luxury-gray">Recipient Name:</span> <span className="text-charcoal font-bold">{event.recipient.name}</span></p>
              <p className="flex justify-between"><span className="text-luxury-gray">Occasion:</span> <span className="text-charcoal font-medium">{event.eventType}</span></p>
              <p className="flex justify-between"><span className="text-luxury-gray">Scheduled Date:</span> <span className="text-charcoal font-medium">{event.date}</span></p>
              <p className="flex justify-between"><span className="text-luxury-gray">Package Tier:</span> <span className="text-navy-deep font-semibold">{pack.name}</span></p>
            </div>

            <div className="w-full h-[1px] bg-gold/15" />

            {/* Price Calculations */}
            <div className="space-y-2 font-sans text-xs">
              <p className="flex justify-between text-luxury-gray"><span>Base Package Fee:</span> <span>${usdPrice} USD</span></p>
              {promoDiscount > 0 && (
                <p className="flex justify-between text-emerald-600"><span>Coupon deduction:</span> <span>-${promoDiscount} USD</span></p>
              )}
              <div className="border-t border-gold/10 pt-2 flex justify-between font-serif text-base font-bold text-navy-deep">
                <span>Final Payable:</span>
                <div className="text-right">
                  <span className="block">${currentUSDTotal} USD</span>
                  <span className="block text-[10px] font-sans font-medium text-gold-dark mt-0.5">Approx ₹{currentINRTotal} INR</span>
                </div>
              </div>
            </div>

          </div>

          {/* Promo code card */}
          <div className="bg-white border border-gold/15 p-6 rounded-[24px] shadow-sm space-y-4">
            <div className="flex items-center space-x-1.5 text-navy-deep">
              <Ticket className="w-5 h-5 text-gold-dark" />
              <h4 className="font-serif text-sm font-semibold">Exquisite Vouchers / Coupons</h4>
            </div>
            
            {promoError && (
              <p className="font-sans text-[11px] text-red-600 animate-pulse">{promoError}</p>
            )}

            {promoApplied ? (
              <div className="flex items-center justify-between bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl text-xs font-sans font-semibold border border-emerald-200">
                <span>✓ Voucher 'CELEBRE10' Active!</span>
                <span>(10% Discount)</span>
              </div>
            ) : (
              <div className="flex space-x-2 font-sans">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter 'CELEBRE10' here..."
                  className="flex-1 bg-gold-pale/35 border border-gold/15 hover:border-gold/35 focus:border-gold focus:outline-hidden px-3.5 py-2.5 rounded-[12px] text-xs text-charcoal font-semibold tracking-wider"
                  id="promo_code_input"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="bg-navy-deep hover:bg-gold hover:text-navy-deep text-white px-4 rounded-[12px] font-sans text-xs font-semibold uppercase transition-all"
                  id="apply_promo_btn"
                >
                  Verify
                </button>
              </div>
            )}
            
            <span className="font-sans text-[10px] text-luxury-gray block leading-relaxed">
              *Tip: Type <span className="font-semibold text-gold-dark underline">CELEBRE10</span> to test the dynamic promo code validation engine!
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
