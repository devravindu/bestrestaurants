"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function OnboardingPage() {
  const router = useRouter();
  const { update } = useSession(); // Used to refresh the token after role change
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/vendor/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, location, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to register restaurant.');
      }

      // Force NextAuth to fetch the newly upgraded VENDOR role
      await update(); 
      
      // Send them to the newly unlocked Vendor Dashboard
      router.push('/dashboard');
      router.refresh();

    } catch (error: any) {
      setErrorMessage(error.message);
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-paper py-[60px] px-[20px]">
      <div className="max-w-[600px] mx-auto bg-cream rounded-m shadow-soft border border-line p-[40px]">
        <h1 className="font-display text-[2rem] font-bold text-ink mb-[8px]">Register your Restaurant</h1>
        <p className="text-ink/60 mb-[32px]">Set up your business profile to start managing your digital presence.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
          {errorMessage && (
            <div className="bg-chili/10 border border-chili text-chili p-[12px] rounded-s text-[0.85rem] font-medium">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col gap-[6px]">
            <label className="text-[0.85rem] font-bold text-teal">Restaurant Name *</label>
            <input 
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rangu's Coastal Kitchen"
              className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink rounded-s outline-none focus:border-teal transition-colors"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[0.85rem] font-bold text-teal">Location / Address *</label>
            <input 
              type="text" required value={location} onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. 12 Lighthouse Road, Unawatuna"
              className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink rounded-s outline-none focus:border-teal transition-colors"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[0.85rem] font-bold text-teal">Contact Number</label>
            <input 
              type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="+94 77 123 4567"
              className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink rounded-s outline-none focus:border-teal transition-colors"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[0.85rem] font-bold text-teal">Short Description</label>
            <textarea 
              rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="What makes your restaurant top-rated?"
              className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink rounded-s outline-none focus:border-teal transition-colors resize-none"
            />
          </div>

          <button 
            type="submit" disabled={status === 'loading'}
            className="w-full font-bold text-[1rem] py-[14px] rounded-s bg-chili text-cream hover:bg-chili-deep transition-colors disabled:opacity-70 mt-[12px]"
          >
            {status === 'loading' ? 'Setting up...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
}