import { useState, FormEvent } from 'react';
import { submitToFormSubmit, SubmitStatus } from '../lib/formSubmit';

export default function Contact() {
  const [status, setStatus] = useState<SubmitStatus>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields: Record<string, string> = {};
    data.forEach((value, key) => { fields[key] = String(value); });

    try {
      await submitToFormSubmit('info@pristinenestng.com.ng', fields, 'New Contact Form Submission — PristineNest Website');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen">
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black text-[#004E99] mb-6">Let's Talk.</h1>
          <p className="text-lg text-gray-600 font-medium leading-relaxed">
            Whether you need a same-day quote or want to discuss a full facilities contract, PristineNest is easy to reach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Form Side */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50">
            <h2 className="text-3xl font-black text-[#004E99] mb-8">Send a Message</h2>

            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F0F9E8] flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#82C300" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <h3 className="text-xl font-bold text-[#004E99] mb-2">Message sent!</h3>
                <p className="text-gray-500 font-medium">We'll get back to you within one business day.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-bold text-[#0066CC] hover:text-[#004E99] transition-colors">
                  Send another message
                </button>
              </div>
            ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-2xl px-5 py-4">
                  Something went wrong sending your message. Please try again, or email us directly at{' '}
                  <a href="mailto:info@pristinenestng.com.ng" className="font-bold underline">info@pristinenestng.com.ng</a>.
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Full Name</label>
                  <input required name="name" type="text" placeholder="Chukwudi Okafor" className="bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Email Address</label>
                  <input required name="email" type="email" placeholder="hello@example.com" className="bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Phone Number</label>
                  <div className="flex gap-2">
                    <input type="text" value="+234" readOnly className="bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-4 py-3.5 text-sm font-medium w-20 text-center text-gray-500 cursor-not-allowed" />
                    <input name="phone" type="tel" placeholder="801 234 5678" className="flex-1 bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Subject</label>
                  <div className="relative">
                    <select name="subject" className="w-full bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all appearance-none">
                      <option>Request a quote</option>
                      <option>Existing contract support</option>
                      <option>Partnership or referral inquiry</option>
                      <option>General question</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Property Type</label>
                  <div className="relative">
                    <select name="property_type" className="w-full bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all appearance-none">
                      <option>Residential (Home/Apartment)</option>
                      <option>Commercial/Office</option>
                      <option>Event Space</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Service Required</label>
                  <div className="relative">
                    <select name="service_required" className="w-full bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all appearance-none">
                      <option>Deep Cleaning</option>
                      <option>Move-In/Move-Out</option>
                      <option>Fumigation</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Message</label>
                <textarea required name="message" rows={4} placeholder="Tell us about your space and specific needs..." className="bg-[#f0f3ff]/60 border border-gray-100 rounded-3xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all resize-none"></textarea>
              </div>

              <div className="mt-4">
                <button type="submit" disabled={status === 'submitting'} className="bg-[#426900] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[#314f00] transition-all flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed">
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  {status !== 'submitting' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                  )}
                </button>
              </div>
            </form>
            )}
          </div>

          {/* Contact Info Side */}
          <div className="flex flex-col gap-6">
            
            {/* Image Card */}
            <div className="relative h-64 rounded-[3rem] overflow-hidden shadow-sm border border-gray-50">
              <img src="/images/office-lobby.jpg" alt="Support Team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#004E99]/10"></div>
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md flex items-center gap-2 border border-white">
                <div className="w-2.5 h-2.5 bg-[#82C300] rounded-full"></div>
                <span className="text-sm font-bold text-[#004E99]">Support Team Online</span>
              </div>
            </div>

            {/* Quick Contact Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-[2.5rem] p-5 sm:p-8 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50">
                <div className="w-12 h-12 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[#0066CC] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <h4 className="font-bold text-[#004E99] mb-1">WhatsApp</h4>
                <p className="text-sm text-gray-600 font-medium mb-2">+234 XXX XXX XXXX</p>
                <a href="https://wa.me/234" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#0066CC] hover:text-[#004E99] transition-colors">Chat Now →</a>
              </div>
              <div className="bg-white rounded-[2.5rem] p-5 sm:p-8 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50">
                <div className="w-12 h-12 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[#0066CC] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <h4 className="font-bold text-[#004E99] mb-1">Phone</h4>
                <p className="text-sm text-gray-600 font-medium">+234 XXX XXX XXXX</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-[3rem] p-8 shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50 flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[#0066CC] shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-[#004E99] mb-1 text-lg">Email</h4>
                <p className="text-gray-600 font-medium leading-relaxed">
                  <a href="mailto:info@pristinenestng.com.ng" className="hover:text-[#0066CC] transition-colors underline decoration-gray-200 underline-offset-4">info@pristinenestng.com.ng</a>
                </p>
              </div>
            </div>

            {/* Office Address Card */}
            <div className="bg-white rounded-[3rem] p-8 shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50 flex flex-col gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[#0066CC] shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#004E99] mb-1 text-lg">Abuja Head Office</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">No A2 Amaka Udomma Street,<br/>Adjacent to Ebeano Supermarket,<br/>Gaduwa District, Abuja, Nigeria.</p>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white rounded-[3rem] p-8 shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50 flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[#0066CC] shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-[#004E99] mb-1 text-lg">Business Hours</h4>
                <p className="text-gray-600 font-medium leading-relaxed">Monday–Saturday, 8:00 AM – 6:00 PM.</p>
                <p className="text-gray-500 text-sm font-medium leading-relaxed mt-1">Emergency fumigation and hospital-cleaning requests accommodated outside standard hours.</p>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-[3rem] overflow-hidden shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50 h-64">
              <iframe
                title="PristineNest Abuja Office Location"
                src="https://www.google.com/maps?q=Gaduwa+District,+Abuja,+Nigeria&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

        </div>

        {/* Institutional & Corporate Enquiries */}
        <div className="mt-24 bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50 text-center">
          <h2 className="text-3xl font-black text-[#004E99] mb-4">For Institutional & Corporate Enquiries</h2>
          <p className="text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto mb-8">
            Facilities managers, procurement officers, and estate developers can reach our dedicated commercial team directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[#0066CC] shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Commercial Line</p>
                <p className="font-bold text-[#004E99]">+234 XXX XXX XXXX</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[#0066CC] shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</p>
                <a href="mailto:info@pristinenestng.com.ng" className="font-bold text-[#004E99] hover:text-[#0066CC] transition-colors">info@pristinenestng.com.ng</a>
              </div>
            </div>
          </div>
        </div>

        {/* Follow PristineNest */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-bold text-[#004E99] mb-6">Follow PristineNest</h3>
          <div className="flex items-center justify-center gap-3">
            {[
              { name: 'LinkedIn', path: 'M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4zM13.32 8.48h-3.84V21h3.84v-6.57c0-3.66 4.75-4 4.75 0V21h3.85v-7.93c0-6.17-6.9-5.94-8.6-2.91z' },
              { name: 'Instagram', path: 'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.67-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z' },
              { name: 'Facebook', path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z' },
              { name: 'X', path: 'M18.9 2H22l-7.4 8.44L23.3 22H16.9l-5-6.53L6.1 22H3l7.93-9.05L2.9 2h6.6l4.5 5.97L18.9 2zm-1.24 18.17h1.72L7.42 3.75H5.57L17.66 20.17z' },
              { name: 'TikTok', path: 'M16.6 5.82c-1.02-.9-1.63-2.21-1.63-3.65h-3.14v13.5a3.05 3.05 0 1 1-2.16-2.92V9.5a6.2 6.2 0 1 0 5.3 6.15V9.75a8.35 8.35 0 0 0 4.63 1.4V8.02a4.86 4.86 0 0 1-2.98-2.2z' },
              { name: 'YouTube', path: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.6 15.5v-7l6.3 3.5-6.3 3.5z' },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                aria-label={social.name}
                className="w-11 h-11 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#004E99] hover:bg-[#004E99] hover:text-white transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={social.path} /></svg>
              </a>
            ))}
          </div>
        </div>

        {/* Closing Line */}
        <div className="mt-16 bg-[#004E99] rounded-[3rem] p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute w-[250px] h-[250px] bg-[#82C300] rounded-full opacity-10 -bottom-16 -left-16 blur-3xl"></div>
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 relative z-10">Redefining Clean, One Space at a Time.</h3>
          <p className="text-white/80 font-medium relative z-10">Wherever you are in Abuja, PristineNest is ready to raise the standard.</p>
        </div>

      </div>
    </div>
  );
}
