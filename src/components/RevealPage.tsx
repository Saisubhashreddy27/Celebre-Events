/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sparkles, Music, Play, Pause, Heart, Gift, MessageSquare, Share2, Award, ExternalLink } from 'lucide-react';
import { CelebrationEvent, EventMessage } from '../types';
import { MUSIC_TRACKS } from '../data';

interface RevealPageProps {
  event: CelebrationEvent;
  onNavigate?: (page: string) => void;
}

export default function RevealPage({ event, onNavigate }: RevealPageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState('track_2');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Confetti particles generator on mount
  const [confetti, setConfetti] = useState<{ id: number; left: number; top: number; size: number; delay: number; color: string }[]>([]);

  useEffect(() => {
    // Generate beautiful colorful particle parameters
    const initialConfetti = Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: -10 - Math.random() * 20,
      size: Math.random() * 6 + 6,
      delay: Math.random() * 5,
      color: ['#D4AF37', '#F4D068', '#f3e5ab', '#ffc0cb', '#FFD700', '#F5F0E8'][Math.floor(Math.random() * 6)]
    }));
    setConfetti(initialConfetti);
    
    // Auto start lovely acoustic piano after opening capsule
    if (isOpen) {
      setIsPlaying(true);
    }
  }, [isOpen]);

  const handleOpenCapsule = () => {
    setIsOpen(true);
  };

  const toggleMusicPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCopyVoucher = () => {
    if (event.giftVoucherCode) {
      navigator.clipboard.writeText(event.giftVoucherCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // WhatsApp reply payload
  const handleShareJoy = () => {
    const textMsg = `Dearest ${event.plannerName}, I just opened your magnificent Célèbre surprise Memory Capsule... 💝 Oh my god, the classical music, the collage, and your letters brought me to tears! Distance is truly just a number. Thank you so much!`;
    const encoded = encodeURIComponent(textMsg);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="bg-navy-dark text-white min-h-screen relative overflow-hidden pb-20">
      
      {/* SHIMMERING STARLIGHT GROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/6 left-1/4 w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-sparkle" />
        <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-white rounded-full animate-sparkle delay-100" />
        <div className="absolute top-2/3 left-1/6 w-1 h-1 bg-gold rounded-full animate-sparkle delay-200" />
        <div className="absolute bottom-1/4 right-1/4 w-[3px] h-[3px] bg-gold-light rounded-full animate-sparkle delay-300" />
        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-white rounded-full animate-sparkle delay-75" />
      </div>

      {/* RAIN CONFETTI SIMULATOR */}
      {isOpen && (
        <div className="absolute inset-x-0 top-0 h-screen pointer-events-none overflow-hidden z-10">
          {confetti.map((conf) => (
            <div
              key={conf.id}
              className="absolute rounded-full animate-shimmer"
              style={{
                left: `${conf.left}%`,
                top: `${conf.top}vh`,
                width: `${conf.size}px`,
                height: `${conf.size}px`,
                backgroundColor: conf.color,
                opacity: 0.8,
                transform: 'translateY(110vh)',
                transition: `transform 5s ease-out ${conf.delay}s, opacity 4s ease-out ${conf.delay}s`
              }}
            />
          ))}
        </div>
      )}

      {/* === VIEW 1: LOCKED ENVELOPE OPENER === */}
      {!isOpen ? (
        <div className="min-h-screen flex items-center justify-center px-4 relative z-10 text-center animate-fade-in" id="sealed_envelope_wrapper">
          <div className="max-w-lg w-full bg-navy-deep/80 border border-gold/30 p-8.5 md:p-10 rounded-[28px] space-y-7 backdrop-blur-md shadow-2xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-navy-deep text-[10px] font-sans font-bold tracking-[0.2em] uppercase px-5 py-1.5 rounded-full border border-gold-pale">
              Pending Surprise Lock ✨
            </div>

            <div className="inline-flex p-4 bg-gold/5 border border-gold/25 rounded-full relative justify-center items-center">
              <Gift className="w-8 h-8 text-gold animate-float-slow" />
              <div className="absolute inset-0 rounded-full border border-gold/15 animate-ping opacity-30" />
            </div>

            <div className="space-y-3">
              <span className="font-sans text-[11px] text-gold-light font-bold uppercase tracking-[0.24em] block">
                A Long-Distance Orchestration
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
                An Emotional Memory Capsule <br />
                <span className="italic font-normal text-gold-light">Awaits Your Hand</span>
              </h1>
              <div className="w-16 h-[1.5px] bg-gold/30 mx-auto my-2" />
              <p className="font-sans text-xs sm:text-sm text-ivory/70 leading-relaxed max-w-sm mx-auto">
                Planned with immense love by <span className="text-white font-semibold">{event.plannerName}</span> to bridge the miles between hearts today.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={handleOpenCapsule}
                className="bg-gold hover:bg-gold-light text-navy-deep px-8 py-4 rounded-full font-sans text-xs font-bold tracking-[0.16em] uppercase transition-all duration-500 transform scale-105 hover:scale-110 gold-glow cursor-pointer"
                id="open_capsule_btn"
              >
                Open Your Memory Capsule
              </button>
            </div>

            <p className="font-sans text-[10px] text-ivory/45">
              Securely synchronized & hosted by Célèbre Event Agency
            </p>
          </div>
        </div>
      ) : (
        /* === VIEW 2: FULLY UNROLLED CELEBRATORY SURFACE === */
        <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 relative z-10 animate-fade-in" id="unlocked_capsule_surface">
          
          {/* TOP PERSISTENT HUD CONVOLVES */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gold/15 pb-4 mt-6">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-gold text-2xl font-semibold tracking-wide">Célèbre</span>
              <span className="text-white/20">|</span>
              <span className="font-sans text-xs text-ivory/60">Milestone capsule {event.id}</span>
            </div>
            
            <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-emerald-400 mt-2 sm:mt-0 px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/25 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Delivered successfully on {event.date}</span>
            </span>
          </div>

          {/* PARCHMENT PRIMARY STATEMENT */}
          <div className="bg-[#FDFBF7] text-charcoal p-8 md:p-14 rounded-[28px] border-2 border-gold shadow-2xl relative" id="glorious_letter_parchment">
            {/* Corner traditional ornaments */}
            <div className="absolute top-4 left-4 text-gold-dark/45 font-serif text-lg">✦</div>
            <div className="absolute top-4 right-4 text-gold-dark/45 font-serif text-lg">✦</div>
            <div className="absolute bottom-4 left-4 text-gold-dark/45 font-serif text-lg">✦</div>
            <div className="absolute bottom-4 right-4 text-gold-dark/45 font-serif text-lg">✦</div>

            <div className="space-y-8 max-w-2xl mx-auto text-center">
              
              <div className="flex justify-center text-gold-dark">
                <Heart className="w-10 h-10 fill-gold-dark/10" />
              </div>

              <div className="space-y-3">
                <h1 className="font-serif text-2.5xl sm:text-4xl font-normal text-navy-deep leading-relaxed italic">
                  "{event.customHeaderMessage || 'In Honor of Your Special Day!'}"
                </h1>
                <div className="w-20 h-[1.5px] bg-[#D4AF37]/50 mx-auto" />
              </div>

              <div className="font-sans text-sm sm:text-base text-charcoal leading-relaxed whitespace-pre-wrap text-left p-4 rounded-xl min-h-[140px]" id="reveal_letter_text">
                {event.messages[0].text}
              </div>

              <div className="text-right pt-4 border-t border-[rgba(212,175,55,0.25)] font-serif italic text-navy-deep text-lg">
                — With all my love, <span className="font-normal font-serif not-italic font-bold text-[#b89025]">{event.plannerName}</span>
              </div>

            </div>
          </div>

          {/* DUAL COGNATES: MUSIC PLAYER CONTROLS & VIDEO */}
          <div className="grid md:grid-cols-12 gap-8 items-stretch" id="musical_video_coordinates">
            
            {/* Audio Panel */}
            <div className="md:col-span-5 bg-navy-deep border border-gold/25 p-6 rounded-[24px] flex flex-col justify-between space-y-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-gold-light">
                  <Music className="w-4 h-4" />
                  <span className="font-sans text-[10px] uppercase font-bold tracking-widest leading-none">Acoustical Audio Guide</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-white">Soft Background String Selection</h3>
              </div>

              {/* Graphical visualizer loops */}
              <div className="flex items-center justify-center space-x-1.5 h-16 pt-2">
                {[...Array(isPlaying ? 14 : 4)].map((_, vidx) => (
                  <div
                    key={vidx}
                    className={`bg-gold w-[3px] rounded-full transition-all duration-300 ${
                      isPlaying 
                        ? 'animate-pulse' 
                        : 'h-2'
                    }`}
                    style={{
                      height: isPlaying ? `${Math.floor(20 + Math.random() * 40)}px` : '8px',
                      animationDelay: `${vidx * 150}ms`
                    }}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between" id="active_string_track_hud">
                  <div>
                    <span className="font-sans text-[9px] uppercase tracking-wider text-ivory/50">Playing Softly:</span>
                    <p className="font-sans text-xs text-white font-medium">
                      {MUSIC_TRACKS.find(t => t.id === activeTrack)?.name || 'Warm Memories Piano'}
                    </p>
                  </div>

                  <button
                    onClick={toggleMusicPlay}
                    className="w-10 h-10 rounded-full bg-gold hover:bg-gold-light text-navy-deep flex items-center justify-center transition-colors shadow-sm focus:outline-hidden cursor-pointer"
                    id="trigger_acoustic_play_pause"
                  >
                    {isPlaying ? <Pause className="w-4.5 h-4.5 text-navy-deep" /> : <Play className="w-4.5 h-4.5 text-navy-deep pl-0.5" />}
                  </button>
                </div>

                {/* Simulated playlist switches */}
                <select
                  value={activeTrack}
                  onChange={(e) => {
                    setActiveTrack(e.target.value);
                    setIsPlaying(true);
                  }}
                  className="w-full bg-white/5 border border-white/10 focus:border-gold focus:outline-hidden px-3.5 py-2.5 rounded-xl font-sans text-xs text-white cursor-pointer"
                  id="reveal_music_select"
                >
                  {MUSIC_TRACKS.map((t) => (
                    <option key={t.id} value={t.id} className="text-charcoal font-medium">
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Video or Slider Panel */}
            <div className="md:col-span-7 bg-navy-deep border border-gold/15 p-6 rounded-[24px] flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="inline-flex items-center space-x-1 text-gold-light text-[10px] uppercase font-semibold tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>Interactive Video Greeting</span>
                </span>
                <h3 className="font-serif text-lg font-medium">Your Animated Celebration Reel</h3>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video bg-black/40">
                {event.videoUrl ? (
                  <video
                    src={event.videoUrl}
                    controls
                    autoPlay={isPlaying}
                    loop
                    preload="auto"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center space-y-2 h-full">
                    <Heart className="w-8 h-8 text-gold-dark animate-pulse" />
                    <p className="font-serif text-sm font-semibold text-white">Standard memory collage loaded below</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* DYNAMIC PHOTO WALL SYSTEM - STICK ACCENT HOVER */}
          {event.collage && event.collage.length > 0 && (
            <div className="space-y-4 pt-4" id="photo_wall_system">
              <div className="space-y-1">
                <span className="font-serif text-2xl font-light text-white">Your Milestone Collage Portals</span>
                <p className="font-sans text-xs text-ivory/60">Hover and click any portrait card below to zoom into high-definition memories.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" id="zoom_grid_frame">
                {event.collage.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className="group relative cursor-pointer rounded-xl overflow-hidden border border-gold/25 h-36 md:h-44 transition-all duration-300 hover:scale-103 hover:border-gold-pale shadow-md"
                    id={`milestone_card_pic_${idx}`}
                  >
                    <img
                      src={img}
                      alt="Milestone card archive representation"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-navy-dark/40 group-hover:bg-transparent transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-gold text-navy-deep text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-xs">Zoom ✎</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GROUP CONTRIBUTION ROOM LETTERS (PREMIUM ONLY) */}
          {event.packageType === 'PREMIUM' && event.messages && event.messages.length > 1 && (
            <div className="space-y-5 pt-6 border-t border-gold/15" id="premium_group_room">
              <div className="space-y-1">
                <span className="font-serif text-2.5xl font-light text-white flex items-center gap-1.5">
                  <Heart className="w-6 h-6 text-gold-light animate-float-slow" />
                  <span>Surprise Group Contribution Wishes</span>
                </span>
                <p className="font-sans text-xs text-ivory/60">Family, friends, and parents signed this long-distance ledger to celebrate with you!</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-6" id="group_contributions_bento">
                {event.messages.slice(1).map((msg, index) => (
                  <div
                    key={msg.id || index}
                    className="bg-navy-deep border border-gold/15 p-5 rounded-[20px] shadow-sm flex flex-col justify-between space-y-4 hover:border-gold/35 transition-all"
                    id={`group_note_card_${index}`}
                  >
                    <p className="font-sans text-xs sm:text-sm italic text-ivory/80 leading-relaxed">
                      "{msg.text}"
                    </p>
                    <div className="flex items-center space-x-2.5 border-t border-white/5 pt-3.5">
                      <div className="w-8 h-8 rounded-full bg-gold/5 flex items-center justify-center font-serif text-gold-dark text-xs font-semibold border border-gold/20">
                        {msg.authorName.charAt(0)}
                      </div>
                      <div>
                        <span className="font-sans text-xs font-semibold text-white block">
                          {msg.authorName}
                        </span>
                        <span className="font-mono text-[9px] uppercase text-[#B89025] tracking-wider block font-bold mt-0.5">
                          {msg.relationship}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIRTUAL E-GIFT VOUCHER CARD (PREMIUM ONLY) */}
          {event.packageType === 'PREMIUM' && event.giftVoucherCode && (
            <div className="bg-white/5 border border-gold/25 p-8 rounded-[24px] flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden" id="premium_voucher_capsule">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gold/10 rounded-full blur-xl" />
              
              <div className="flex items-start space-x-4 text-left">
                <div className="p-4 bg-gold/15 border border-gold/30 rounded-full text-gold-dark flex-shrink-0 animate-bounce-slow">
                  <Gift className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-[#D4AF37] block">Célèbre Premium Accessory</span>
                  <h3 className="font-serif text-xl font-medium text-white">Your Unlocked €50 / ₹3500 Global E-Gift Voucher</h3>
                  <p className="font-sans text-xs text-ivory/70 leading-relaxed max-w-md">
                    Redeemable instantly with our top luxury partner global/national brands (Starbucks, Amazon, Marriott Hotels, Sephora, or Apple Resorts).
                  </p>
                </div>
              </div>

              <div className="bg-charcoal border border-gold/30 p-4 rounded-xl flex items-center space-x-3 text-sm font-mono min-w-[200px]" id="claims_voucher_hud">
                <div>
                  <span className="text-[8px] font-sans text-luxury-gray uppercase block mb-1">Copy claim code & visit brand portal:</span>
                  <p className="text-[#D4AF37] font-bold tracking-wider">{event.giftVoucherCode}</p>
                </div>
                <button
                  onClick={handleCopyVoucher}
                  className="bg-gold hover:bg-gold-light text-navy-deep text-xs font-sans uppercase px-3.5 py-2.5 rounded-lg font-bold tracking-wider cursor-pointer"
                  id="voucher_copy_btn"
                >
                  {copySuccess ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          )}

          {/* CORE RECIPIENT OUTLET CONTROLS */}
          <div className="pt-6 border-t border-gold/15 flex flex-col sm:flex-row items-center justify-between gap-4" id="capsule_back_outlets">
            <button
              onClick={handleShareJoy}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3 rounded-full font-sans text-xs font-bold tracking-[0.11em] uppercase transition-all duration-300 transform scroll-smooth hover:scale-103 cursor-pointer flex items-center space-x-2"
              id="share_joy_whatsapp_btn"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Your Joy via WhatsApp</span>
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('home')}
                className="text-gold-light hover:underline font-sans text-xs uppercase"
                id="return_celes_btn"
              >
                Return to Célèbre Website Portal ↗
              </button>
            )}
          </div>

        </div>
      )}

      {/* FULL SCREEN DYNAMIC IMAGE MODAL FOR GALLERY */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4 cursor-pointer animate-fade-in"
          onClick={() => setSelectedImage(null)}
          id="zoom_image_modal"
        >
          <div className="relative max-w-4xl max-h-[90vh] flex items-center justify-center">
            <img src={selectedImage} alt=" এইচডি জুম ইমেজ" className="max-w-full max-h-[85vh] object-contain rounded-xl border border-gold/30" referrerPolicy="no-referrer" />
            <span className="absolute bottom-4 right-4 bg-navy-dark/80 text-white text-[10px] font-sans uppercase font-bold tracking-widest px-4 py-1.5 rounded-full border border-gold/15">
              Click Anywhere To Collapse
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
