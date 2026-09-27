"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ReviewForm({ restaurantId }: { restaurantId: string }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a star rating.");
    
    setStatus('loading');
    
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, text, restaurantId }),
    });

    if (res.ok) {
      setStatus('success');
      setText('');
      setRating(0);
      router.refresh(); // Automatically triggers the server to fetch the updated stats
    } else {
      setStatus('idle');
      alert("Failed to submit. Please make sure you are logged in.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-cream border border-line rounded-xl p-[24px] mt-[32px]">
      <h3 className="font-bold text-[1.2rem] text-ink mb-[16px]">Leave a Review</h3>
      
      <div className="flex gap-[8px] mb-[16px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(rating)}
            className="text-[28px] transition-colors focus:outline-none"
            style={{ color: star <= (hover || rating) ? '#B8860B' : '#d1d5db' }}
          >
            ★
          </button>
        ))}
      </div>

      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your dining experience..."
        rows={4}
        required
        className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-white text-ink rounded-s outline-none focus:border-teal resize-none mb-[16px]"
      />

      <div className="flex items-center justify-between">
        {status === 'success' ? (
          <span className="text-teal font-bold">Review published! ✓</span>
        ) : <span />}
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="bg-ink text-white font-bold py-[10px] px-[24px] rounded-s hover:bg-black transition-colors disabled:opacity-70"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}