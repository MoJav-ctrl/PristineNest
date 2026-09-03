import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

interface ServiceItem {
  title: string;
  desc: string;
  img: string;
  modes: ('oneoff' | 'monthly')[];
}

const residentialServices: ServiceItem[] = [
  { title: 'Deep Cleaning', desc: 'A full, top-to-bottom clean for homes — kitchens, bathrooms, living spaces, and the corners routine cleaning misses. Ideal as a one-off refresh or a recurring monthly service.', img: '/images/residential-staff.jpg', modes: ['oneoff', 'monthly'] },
  { title: 'Fumigation & Pest Control', desc: 'Termite, rodent, and mosquito treatment using NAFDAC-registered products, with a full report and Safety Data Sheet provided after every visit. Best scheduled seasonally, or on a quarterly contract.', img: '/images/fumigation.jpg', modes: ['oneoff', 'monthly'] },
  { title: 'Lawn Mowing & Landscaping', desc: 'From routine lawn mowing to full landscape design and planting — keep your compound as sharp as the inside of your home.', img: '/images/landscaping.jpg', modes: ['oneoff', 'monthly'] },
  { title: 'Dry Cleaning & Laundry', desc: 'Garment and household laundry care, collected and delivered on your schedule.', img: '/images/dry-cleaning.jpg', modes: ['oneoff', 'monthly'] },
  { title: 'Car Washing', desc: 'On-demand or scheduled washing for personal vehicles at your residence.', img: '/images/car-detailing.jpg', modes: ['oneoff', 'monthly'] },
  { title: 'Move-In/Out', desc: 'Comprehensive deep cleans to ensure a space is perfectly prepped for transitions.', img: '/images/move-in-boxes.jpg', modes: ['oneoff'] },
  { title: 'Carpet & Upholstery', desc: 'Industrial-grade extraction cleaning to revive fabrics and floor coverings.', img: '/images/living-room-carpet.jpg', modes: ['oneoff', 'monthly'] },
];

const commercialServices: ServiceItem[] = [
  { title: 'Corporate Office Cleaning', desc: "Daily, weekly, or bi-weekly janitorial contracts built around your office's actual traffic and use — not a generic schedule.", img: '/images/blog-office.jpg', modes: ['oneoff', 'monthly'] },
  { title: 'Hospital & Clinic Hygiene Programmes', desc: 'Zone-based disinfection protocols for wards, theatres, and patient areas, designed around infection-control best practice, with full visit documentation for audits and accreditation.', img: '/images/hygiene.jpg', modes: ['monthly'] },
  { title: 'Mall & Retail Common-Area Care', desc: 'Cleaning, landscaping, and pest control for shared spaces that shape how every tenant and shopper experiences your property.', img: '/images/office-lobby.jpg', modes: ['monthly'] },
  { title: 'Estate & Real Estate Grounds Management', desc: 'Full-estate cleaning, landscaping, and fumigation contracts for developers and property managers — one accountable vendor across every unit.', img: '/images/estate-grounds-management.jpg', modes: ['monthly'] },
  { title: 'Fleet & Facility Car Washing', desc: 'On-site washing for company fleets and staff parking at corporate campuses and malls.', img: '/images/car-detailing.jpg', modes: ['oneoff', 'monthly'] },
  { title: 'Institutional Laundry', desc: 'Linen and uniform laundry services for hospitals, hotels, and large staff facilities.', img: '/images/institutional-laundry.jpg', modes: ['monthly'] },
  { title: 'Pre/Post-Event', desc: 'Rapid-response cleaning for event halls, banquets, and large gatherings.', img: '/images/event-cleaning.jpg', modes: ['oneoff'] },
];

function renderServiceCard(srv: ServiceItem, idx: number) {
  return (
    <div key={idx} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-50 hover:shadow-xl transition-all group">
      <div className="relative h-48 rounded-[2rem] overflow-hidden mb-6">
        <img src={srv.img} alt={srv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#0066CC] shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-[#004E99] mb-3 px-2">{srv.title}</h3>
      <p className="text-gray-600 font-medium px-2 mb-6">{srv.desc}</p>
      <Link to="/quote" className="inline-flex items-center gap-2 text-[#0066CC] font-bold text-sm px-2 hover:text-[#004E99] transition-colors">
        Learn more <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </Link>
    </div>
  );
}

export default function Services() {
  const [activeTab, setActiveTab] = useState<'oneoff' | 'monthly'>('oneoff');
  const resultsRef = useRef<HTMLDivElement>(null);

  const allServices = [...residentialServices, ...commercialServices];
  const oneOffCount = allServices.filter((srv) => srv.modes.includes('oneoff')).length;
  const monthlyCount = allServices.filter((srv) => srv.modes.includes('monthly')).length;

  function handleTabChange(tab: 'oneoff' | 'monthly') {
    setActiveTab(tab);
    // Gentle nudge toward the results, not a hard jump — just enough to
    // bring the first grid into view so the filter's effect is visible
    // without the page feeling like it yanked control away.
    if (resultsRef.current) {
      const top = resultsRef.current.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen pb-24">
      
      {/* Header Section */}
      <div className="relative pt-32 pb-24 px-6 md:px-12 text-center overflow-hidden">
        
        {/* Background Bubbles */}
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center opacity-30">
          <img src="/images/office-lobby.jpg" className="absolute inset-0 w-full h-full object-cover opacity-10" />
          <div className="absolute w-[800px] h-[800px] bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-gray-100 shadow-sm mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0066CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
            <span className="text-[#004E99] text-xs font-bold uppercase tracking-wider">Professional Facility Management</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#004E99] mb-6 tracking-tight">
            Every Service, <span className="text-[#0066CC]">One Standard.</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto mb-10">
            Whether it's a single deep clean or a full facilities contract, every PristineNest service follows the same documented, accountable process.
          </p>
        </div>
      </div>

      {/* Cleaning Plans Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 -mt-8 mb-24">
        <div className="bg-[#b1f354] rounded-[3rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-16 shadow-xl border-4 border-white/40">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#426900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5"/><path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-6l-3.4-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.8 1.1z"/></svg>
            </div>
            <div>
              <h2 className="text-3xl font-black text-[#112000] mb-1">Our Cleaning Plans</h2>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex bg-white/80 backdrop-blur rounded-full p-2 shadow-sm">
              <button
                onClick={() => handleTabChange('oneoff')}
                className={`px-8 py-4 rounded-full font-bold text-base transition-all ${activeTab === 'oneoff' ? 'bg-[#004E99] text-white shadow-md' : 'text-[#314f00]'}`}
              >
                One-Off Service <span className={activeTab === 'oneoff' ? 'text-white/70' : 'text-[#314f00]/60'}>({oneOffCount})</span>
              </button>
              <button
                onClick={() => handleTabChange('monthly')}
                className={`px-8 py-4 rounded-full font-bold text-base transition-all ${activeTab === 'monthly' ? 'bg-[#004E99] text-white shadow-md' : 'text-[#314f00]'}`}
              >
                Monthly Contract <span className={activeTab === 'monthly' ? 'text-white/70' : 'text-[#314f00]/60'}>({monthlyCount})</span>
              </button>
            </div>
            <p className="text-xs text-[#314f00]/70 font-medium">
              Showing services available as a {activeTab === 'oneoff' ? 'one-off booking' : 'monthly contract'}.
            </p>
          </div>
        </div>
      </div>

      {/* Residential Services */}
      <div ref={resultsRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#004E99] mb-4">Residential Services</h2>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            Tailored cleaning protocols for every home, executed by vetted professionals using hospital-grade products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {residentialServices.filter((srv) => srv.modes.includes(activeTab)).map((srv, idx) => renderServiceCard(srv, idx))}
        </div>

        <div className="text-center mt-12">
          <Link to="/quote" className="inline-flex bg-[#004E99] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-[#003666] transition-all">
            Get a Residential Quote →
          </Link>
        </div>
      </div>

      {/* Commercial & Institutional Services */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#004E99] mb-4">Commercial & Institutional Services</h2>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            Accountable, SLA-backed cleaning and grounds-care contracts for the institutions Abuja depends on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {commercialServices.filter((srv) => srv.modes.includes(activeTab)).map((srv, idx) => renderServiceCard(srv, idx))}
        </div>

        <div className="text-center mt-12">
          <Link to="/quote" className="inline-flex bg-[#004E99] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-[#003666] transition-all">
            Request a Commercial Proposal →
          </Link>
        </div>
      </div>

      {/* One-Off vs Monthly/Recurring Contracts */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-[#004E99] mb-3">Need it once?</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Book a single visit for any service above — ideal for move-ins, post-construction cleanups, one-time fumigation, or a landscaping refresh.
            </p>
          </div>
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-[#004E99] mb-3">Need it every month or by subscription?</h3>
            <p className="text-gray-600 font-medium leading-relaxed">
              Move to a subscription contract and get a fixed schedule, a dedicated account manager (Standard and Premium tiers), a written SLA, and a documented visit history — without having to re-book or re-negotiate every time.
            </p>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link to="/quote" className="inline-flex bg-[#b1f354] text-[#004E99] px-8 py-3.5 rounded-full font-bold hover:bg-[#99d93c] transition-all">
            Compare Subscription Plans →
          </Link>
        </div>
      </div>

      {/* Not Sure What You Need */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="bg-[#004E99] rounded-[3rem] p-12 md:p-16">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Not Sure What You Need?</h2>
          <p className="text-white/80 font-medium text-lg mb-8 max-w-xl mx-auto">
            Tell us about your space and we'll recommend the right service and frequency — no obligation.
          </p>
          <Link to="/quote" className="inline-flex bg-white text-[#004E99] px-8 py-4 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-all">
            Get a Free Quote →
          </Link>
        </div>
      </div>
    </div>
  );
}
