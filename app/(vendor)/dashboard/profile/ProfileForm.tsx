"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ProfileForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    id: initialData.id,
    name: initialData.name || '',
    category: initialData.category || '',
    description: initialData.description || '',
    location: initialData.location || '',
    phone: initialData.phone || '',
    website: initialData.website || '',
    avgPrice: initialData.avgPrice || '',
    workingHours: initialData.workingHours || '',
    heroImageUrl: initialData.heroImageUrl || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus('idle');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      // Create a unique file name to prevent overwriting
      const fileExt = file.name.split('.').pop();
      const fileName = `${formData.id}-${Date.now()}.${fileExt}`;

      // Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from('restaurants')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('restaurants')
        .getPublicUrl(fileName);

      // Update form state with the new image URL
      setFormData(prev => ({ ...prev, heroImageUrl: publicUrl }));
      setStatus('idle');
    } catch (error) {
      console.error("Upload error:", error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const res = await fetch('/api/vendor/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus('success');
      router.refresh(); 
    } else {
      setStatus('idle');
      alert("Failed to update profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-[32px] items-start">
      
      {/* LEFT COLUMN: Text Inputs */}
      <div className="lg:col-span-2 flex flex-col gap-[32px]">
        {/* Section 1: Basic Info */}
        <div className="bg-cream border border-line rounded-m p-[32px]">
          <h2 className="font-bold text-[1.2rem] text-ink mb-[24px]">Basic Information</h2>
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[6px]">
              <label className="text-[0.85rem] font-bold text-teal">Restaurant Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink rounded-s outline-none focus:border-teal" />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[0.85rem] font-bold text-teal">Categories / Tags (Comma separated)</label>
              <input name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Seafood, Sri Lankan, Fine Dining" className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink rounded-s outline-none focus:border-teal" />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[0.85rem] font-bold text-teal">Why it's top-rated (Description)</label>
              <textarea name="description" rows={5} value={formData.description} onChange={handleChange} className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink rounded-s outline-none focus:border-teal resize-none" />
            </div>
          </div>
        </div>

        {/* Section 2: Location & Contact */}
        <div className="bg-cream border border-line rounded-m p-[32px]">
          <h2 className="font-bold text-[1.2rem] text-ink mb-[24px]">Location & Contact</h2>
          <div className="grid grid-cols-2 gap-[20px] max-md:grid-cols-1">
            <div className="flex flex-col gap-[6px] col-span-2 max-md:col-span-1">
              <label className="text-[0.85rem] font-bold text-teal">Full Address</label>
              <input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. 12 Lighthouse Road, Unawatuna" required className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink rounded-s outline-none focus:border-teal" />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[0.85rem] font-bold text-teal">Phone Number</label>
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+94 77 123 4567" className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink rounded-s outline-none focus:border-teal" />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[0.85rem] font-bold text-teal">Website URL</label>
              <input name="website" value={formData.website} onChange={handleChange} placeholder="www.ranguscoast.lk" className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink rounded-s outline-none focus:border-teal" />
            </div>
          </div>
        </div>

        {/* Section 3: Dining Details */}
        <div className="bg-cream border border-line rounded-m p-[32px]">
          <h2 className="font-bold text-[1.2rem] text-ink mb-[24px]">Dining Details</h2>
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[6px]">
              <label className="text-[0.85rem] font-bold text-teal">Average Price</label>
              <input name="avgPrice" value={formData.avgPrice} onChange={handleChange} placeholder="e.g. LKR 2,500 per person" className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink rounded-s outline-none focus:border-teal" />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[0.85rem] font-bold text-teal">Opening Hours (Line separated)</label>
              <textarea name="workingHours" rows={4} value={formData.workingHours} onChange={handleChange} placeholder="Mon-Thu: 11:00 AM - 10:00 PM&#10;Fri-Sun: 10:00 AM - 11:30 PM" className="w-full py-[11px] px-[16px] border-[1.5px] border-line bg-transparent text-ink rounded-s outline-none focus:border-teal resize-none" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Image Upload & Submit (Sticky) */}
      <div className="lg:col-span-1 sticky top-[100px] flex flex-col gap-[24px]">
        <div className="bg-cream border border-line rounded-m p-[32px]">
          <h2 className="font-bold text-[1.2rem] text-ink mb-[16px]">Cover Image</h2>
          <p className="text-[0.85rem] text-ink/60 mb-[24px]">
            Upload a high-quality image to serve as the hero background for your listing. Max 5MB.
          </p>

          <div className="relative w-full aspect-video bg-paper border-2 border-dashed border-line rounded-s flex flex-col items-center justify-center overflow-hidden mb-[16px] group hover:border-teal transition-colors">
            {formData.heroImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={formData.heroImageUrl} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <span className="text-ink/40 text-[0.9rem] font-medium group-hover:text-teal transition-colors">
                {isUploading ? "Uploading..." : "Click to select image"}
              </span>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
            />
          </div>

          <div className="flex justify-between items-center mt-[32px] pt-[24px] border-t border-line">
            {status === 'success' && <span className="text-teal font-bold text-[0.95rem]">Saved ✓</span>}
            <button type="submit" disabled={status === 'loading' || isUploading} className="w-full font-bold text-[1rem] py-[12px] px-[24px] rounded-s bg-ink text-cream hover:bg-black transition-colors disabled:opacity-70">
              {status === 'loading' ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </div>

    </form>
  );
}