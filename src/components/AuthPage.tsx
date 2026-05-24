/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Lock, Sparkles, AlertCircle, ArrowRight, Chrome } from 'lucide-react';
import { User } from '../types';

interface AuthPageProps {
  onLoginSuccess: (user: User) => void;
  onNavigate: (page: string) => void;
}

export default function AuthPage({ onLoginSuccess, onNavigate }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('United States');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in both email and password fields.');
      return;
    }
    if (isSignUp && !name) {
      setError('Please provide your full name.');
      return;
    }

    setLoading(true);
    try {
      const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          name,
          country,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York'
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Authentication error occurred.');
      }

      onLoginSuccess(data.user);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthDemo = async () => {
    setLoading(true);
    setError('');
    try {
      const demoEmail = 'saisubhashvemireddy@gmail.com';
      const demoName = 'Sarah Jenkins';

      const response = await fetch('/api/auth/google-oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: demoEmail,
          name: demoName
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'OAuth failure.');
      }

      onLoginSuccess(data.user);
    } catch (err: any) {
      setError('Google OAuth sandbox error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-ivory relative overflow-hidden">
      
      {/* Absolute decorative backdrops */}
      <div className="absolute top-12 left-12 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-12 right-12 w-64 h-64 rounded-full bg-navy-deep/5 blur-3xl" />

      <div className="bg-white rounded-[24px] max-w-md w-full p-8 md:p-10 border border-gold/15 shadow-sm relative z-10 space-y-7 animate-fade-in" id="auth_container">
        
        {/* BRAND HEAD */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-2.5 rounded-full bg-navy-deep/5 border border-gold/20 mb-2">
            <Sparkles className="w-5 h-5 text-gold-dark" />
          </div>
          <h2 className="font-serif text-2.5xl font-semibold text-navy-deep">
            {isSignUp ? 'Craft a Célèbre Account' : 'Welcome to Célèbre'}
          </h2>
          <p className="font-sans text-xs text-luxury-gray">
            {isSignUp 
              ? 'Begin orchestrating memorable surprises across the miles today.' 
              : 'Revisit your planned surprise events and scheduled capsules.'
            }
          </p>
        </div>

        {error && (
          <div className="flex items-start space-x-2.5 bg-red-50 p-4 rounded-[12px] border border-red-200/50 text-red-700 animate-fade-in" id="auth_error_box">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
            <span className="font-sans text-xs sm:text-sm leading-relaxed">{error}</span>
          </div>
        )}

        {/* AUTH FORM */}
        <form onSubmit={handleAuthSubmit} className="space-y-4" id="auth_form">
          
          {isSignUp && (
            <div className="space-y-1">
              <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/80 block">
                Your Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Jenkins"
                className="w-full bg-gold-pale/35 border border-gold/15 hover:border-gold/35 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal"
                id="signup_name_input"
                required
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/80 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gray/70" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="saisubhashvemireddy@gmail.com"
                className="w-full bg-gold-pale/35 border border-gold/15 hover:border-gold/35 focus:border-gold focus:outline-hidden pl-11 pr-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal"
                id="auth_email_input"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/80 block">
                Password
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => alert("Verification code simulated! Please check your placeholder mailbox.")}
                  className="font-sans text-[10px] text-gold-dark hover:underline"
                  id="forgot_pwd_btn"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-gray/70" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-gold-pale/35 border border-gold/15 hover:border-gold/35 focus:border-gold focus:outline-hidden pl-11 pr-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal"
                id="auth_password_input"
                required
              />
            </div>
          </div>

          {isSignUp && (
            <div className="space-y-1">
              <label className="font-sans text-[11px] font-semibold uppercase tracking-wider text-charcoal/80 block">
                Your Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-gold-pale/35 border border-gold/15 hover:border-gold/35 focus:border-gold focus:outline-hidden px-4 py-3 rounded-[12px] font-sans text-xs sm:text-sm text-charcoal"
                id="signup_country_select"
              >
                <option value="United States">United States</option>
                <option value="India">India</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Canada">Canada</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-navy-deep hover:bg-gold hover:text-navy-deep text-white py-3.5 rounded-[12px] font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center space-x-2 border border-navy-deep hover:border-gold cursor-pointer"
            id="auth_submit_btn"
          >
            <span>{loading ? 'Validating Sandbox...' : isSignUp ? 'Create Golden Account' : 'Step Inside Célèbre'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* OR DIVIDER */}
        <div className="flex items-center space-x-3 text-luxury-gray/40 text-xs">
          <div className="flex-1 h-[1px] bg-gold/15" />
          <span className="font-sans uppercase tracking-widest text-[9px] font-medium">Or Continued With</span>
          <div className="flex-1 h-[1px] bg-gold/15" />
        </div>

        {/* GOOGLE OAUTH SIMULATION DISPLAY */}
        <button
          onClick={handleOAuthDemo}
          disabled={loading}
          className="w-full bg-white hover:bg-gold-pale/10 border border-gold/25 hover:border-gold text-charcoal py-3 rounded-[12px] font-sans text-xs font-medium tracking-wide transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer"
          id="google_oauth_btn"
        >
          <Chrome className="w-4.5 h-4.5 text-red-500 fill-red-500/20" />
          <span>Continue with Google</span>
        </button>

        {/* TOGGLE FORM BUTTON */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              setError('');
              setIsSignUp(!isSignUp);
            }}
            className="font-sans text-sm font-semibold text-gold-dark hover:underline focus:outline-hidden"
            id="toggle_auth_btn"
          >
            {isSignUp ? 'Already have an account? Log In' : 'New to Célèbre? Sign up for free'}
          </button>
        </div>

      </div>

    </div>
  );
}
