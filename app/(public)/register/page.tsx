"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleSignup = () => {
    signIn('google', { callbackUrl: '/' });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // 1. Send data to our custom registration API
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create account.');
      }

      // 2. Automatically log the user in with their new credentials
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        throw new Error("Account created, but auto-login failed. Please log in manually.");
      }

      // 3. Force a router refresh to update the Header session, then redirect
      router.refresh();
      router.push('/');
      
    } catch (error: any) {
      setErrorMessage(error.message);
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-[20px]">
      <div className="bg-cream rounded-m shadow-[0_24px_48px_-20px_rgba(0,0,0,0.15)] border border-line w-full max-w-[440px] p-[40px]">
        
        <div className="text-center mb-[28px]">
          <h1 className="font-display text-[2rem] font-semibold mb-[8px]">Create an account</h1>
          <p className="text-ink/60 text-[0.95rem]">
            Join BestRestaurant.lk to discover spots or list your own.
          </p>
        </div>

        {/* Google Signup Button */}
        <button 
          onClick={handleGoogleSignup}
          type="button"
          className="w-full inline-flex items-center justify-center gap-[10px] font-bold text-[1rem] py-[12px] px-[20px] rounded-s bg-white border border-line text-ink hover:bg-paper transition-colors mb-[24px]"
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div className="relative flex items-center mb-[24px]">
          <div className="flex-grow border-t border-line"></div>
          <span className="flex-shrink-0 mx-[14px] text-ink/40 text-[0.85rem] font-medium uppercase tracking-wider">Or register with email</span>
          <div className="flex-grow border-t border-line"></div>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-[16px]">
          {errorMessage && (
            <div className="bg-chili/10 border border-chili text-chili p-[12px] rounded-s text-[0.85rem] font-medium">
              {errorMessage}
            </div>
          )}

          <div className="flex flex-col gap-[6px]">
            <label htmlFor="name" className="text-[0.85rem] font-bold text-teal">Full Name</label>
            <input 
              id="name"
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Nimal Perera"
              className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink font-body text-[0.95rem] rounded-s outline-none placeholder:text-ink/40 focus:border-teal transition-colors disabled:opacity-50"
              disabled={status === 'loading'}
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label htmlFor="email" className="text-[0.85rem] font-bold text-teal">Email Address</label>
            <input 
              id="email"
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink font-body text-[0.95rem] rounded-s outline-none placeholder:text-ink/40 focus:border-teal transition-colors disabled:opacity-50"
              disabled={status === 'loading'}
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label htmlFor="password" className="text-[0.85rem] font-bold text-teal">Password</label>
            <input 
              id="password"
              type="password" 
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink font-body text-[0.95rem] rounded-s outline-none placeholder:text-ink/40 focus:border-teal transition-colors disabled:opacity-50"
              disabled={status === 'loading'}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={status === 'loading' || !email || !password || !name}
            className="w-full inline-flex items-center justify-center font-bold text-[1rem] py-[13px] px-[20px] rounded-s bg-ink text-cream hover:bg-black transition-colors disabled:opacity-70 mt-[8px]"
          >
            {status === 'loading' ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-[0.9rem] text-ink/70 mt-[24px]">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-teal hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}