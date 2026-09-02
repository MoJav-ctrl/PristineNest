import HeroSection from '../components/HeroSection';
import TrustBar from '../components/TrustBar';
import WhatWeDo from '../components/WhatWeDo';
import OneOffOrOngoing from '../components/OneOffOrOngoing';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import ClosingCTA from '../components/ClosingCTA';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPublicPosts, PublicPost } from '../lib/publicApi';

const FALLBACK_IMAGE = '/images/blog-office.jpg';

function formatDate(dateStr: string | null) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
}

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<PublicPost[] | null>(null);

  useEffect(() => {
    fetchPublicPosts()
      .then((posts) => setLatestPosts(posts.slice(0, 3)))
      .catch(() => setLatestPosts([]));
  }, []);

  return (
    <div className="w-full">
      <HeroSection />

      <TrustBar />

      <section className="bg-white py-20 w-full px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed">
            Abuja is a city in motion — new estates rising in Asokoro, Apo, Guzape and Katampe, corporate towers filling the Central Business District, hospitals and malls setting new standards for the people who use them every day. A city built for this kind of ambition deserves spaces that match it. That's the standard <span className="font-bold text-[#004E99]">PristineNest</span> exists to deliver: not just cleaning, but a visible, disciplined commitment to hygiene — the kind that protects health, preserves property, and quietly tells everyone who walks through your door that this space is cared for.
          </p>
        </div>
      </section>

      <WhatWeDo />
      
      <section className="bg-[#F8FAFC] py-24 w-full px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#004E99]">Some Facts About Us</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {[
            { value: '1225', label: 'Orders' },
            { value: '843', label: 'Clients' },
            { value: '315', label: 'Houses' },
            { value: '237', label: 'Followers' }
          ].map((stat, i) => (
            <div key={i} className="flex justify-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-[#0066CC] text-white flex flex-col items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="text-xl sm:text-2xl md:text-3xl font-black">{stat.value}</div>
                <div className="text-xs sm:text-sm font-semibold mt-1 opacity-90">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 max-w-2xl mx-auto text-center">
          <div className="text-4xl text-[#82C300] opacity-50 mb-4">"</div>
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-5 h-5 text-[#82C300]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            ))}
          </div>
          <h4 className="text-xl font-bold text-[#004E99] mb-2">Natasha Raymond</h4>
          <p className="text-gray-500 italic">"Customer's Service is Top Notch, reliable and quick delivery"</p>
        </div>
      </section>

      <OneOffOrOngoing />

      <section className="bg-[#F8FAFC] py-24 w-full px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-4xl font-black text-[#004E99] mb-4">Why Abuja Chooses <span className="text-[#0066CC]">PristineNest</span></h2>
            </div>
            
            <div className="flex flex-col gap-4">
              {[
                { title: 'We show up with a system, not just a mop.', desc: 'Every visit follows a documented checklist, logged and photographed — so you always know exactly what was done, and when.' },
                { title: "We're built for institutions, not just individuals.", desc: 'Hospitals, malls, corporate HQs, and large estates trust us because we operate like the accountable partner their standards require.' },
                { title: 'We think beyond clean.', desc: 'Our work is rooted in hygiene as public health — reducing disease vectors, containing outbreaks of pests, and protecting the people who live and work in the spaces we serve.' },
                { title: "We're fast, and we're growing faster.", desc: "As Abuja's fastest-growing cleaning company, we've built our reputation one space, one client, one flawless visit at a time." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#e7eeff] flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#f0f3ff] flex items-center justify-center shrink-0">
                    <div className="w-4 h-4 bg-[#0066CC] rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#004E99]">{item.title}</h4>
                    <p className="text-sm text-gray-500 font-medium mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative h-[420px] sm:h-[520px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white">
            <img src="/images/living-room-clean.jpg" alt="Clean living room" className="w-full h-full object-cover" />
            
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-10 sm:left-10 sm:right-10 bg-white/90 backdrop-blur-md rounded-[2rem] p-4 sm:p-6 shadow-xl border border-white flex gap-4 items-center">
              <img src="/images/client-testimonial.jpg" alt="Reviewer" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-[#004E99] font-bold italic">"PristineNest transformed my office space. Their attention to detail is unmatched in Abuja."</p>
                <p className="text-[11px] sm:text-xs font-semibold text-[#0066CC] mt-2">- Amina O., Facility Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />

      <Testimonials />

      <ClosingCTA />

      {latestPosts && latestPosts.length > 0 && (
      <section className="bg-white py-24 w-full px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#004E99] mb-4">Latest Blog</h2>
            <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">From the latest cleaning trends to product reviews and DIY hacks, we're dedicated to helping you achieve a neater, more organized living and working space.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group cursor-pointer flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img src={post.coverImageUrl || FALLBACK_IMAGE} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{formatDate(post.publishedAt)}</span>
                  <h3 className="text-xl font-bold text-[#004E99] mb-4 leading-snug">{post.title}</h3>
                  <div className="mt-auto self-end">
                    <div className="w-10 h-10 rounded-full bg-[#82C300] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
