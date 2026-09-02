import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen">
      <div className="pt-24 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
          <div>
            <h1 className="text-5xl lg:text-[64px] font-black text-[#004E99] leading-[1.1] mb-6">
              Redefining <span className="text-[#0066CC]">Clean</span>, One Space at a Time.
            </h1>
            <p className="text-gray-600 font-medium text-lg mb-8 max-w-[480px]">
              The story, standards, and mission behind Abuja's fastest-growing cleaning company.
            </p>
            <Link to="/quote" className="inline-flex bg-[#0066CC] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[#004E99] transition-all">
              Book Our Team
            </Link>
          </div>
          
          <div className="relative">
            <div className="h-[500px] rounded-[3rem] overflow-hidden shadow-2xl bg-white p-2">
              <img 
                src="/images/team-photo.jpg" 
                alt="PristineNest Team" 
                className="w-full h-full object-cover rounded-[2.5rem]"
              />
            </div>
            
            <div className="absolute -top-6 -right-6 sm:-right-8 w-20 h-20 sm:w-32 sm:h-32 bg-white/90 backdrop-blur-md rounded-full shadow-xl flex flex-col items-center justify-center border-4 border-white z-20">
              <span className="text-xl sm:text-3xl font-black text-[#0066CC]">100%</span>
              <span className="text-[9px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Vetted</span>
            </div>
            
            <div className="absolute -bottom-6 left-10 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 z-20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#004E99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-32">
          <h2 className="text-4xl font-black text-[#004E99] mb-8 text-center">Our Story</h2>
          <div className="flex flex-col gap-6 text-gray-600 font-medium text-lg leading-relaxed">
            <p>Abuja is not the city it was a decade ago. New estates are sprawling faster than the roads that reach them. Corporate towers are filling the skyline of the Central Business District. Hospitals, schools, and malls are being built to standards that didn't exist here before. This is a city being remade by ambition — and PristineNest Services Ltd was founded on a simple belief: a city this ambitious deserves cleaning and hygiene standards to match.</p>
            <p>We started with a gap we saw clearly. Abuja's homes, hospitals, corporate offices, and estates were being served by a cleaning industry that was, for the most part, informal — reliable one day, absent the next, with no documentation, no accountability, and no real standard beyond "we'll come again." For a private home, that might be a minor inconvenience. For a hospital ward, a mall food court, or a corporate headquarters receiving international clients, it's a risk no serious institution should have to accept.</p>
            <p>PristineNest was built to close that gap because we built the one thing the market was missing: a documented, accountable standard of cleaning and hygiene that institutions can actually rely on.</p>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50 mb-32">
          <h2 className="text-4xl font-black text-[#004E99] mb-8 text-center">More Than a Cleaning Company</h2>
          <div className="max-w-3xl mx-auto flex flex-col gap-6 text-gray-600 font-medium leading-relaxed">
            <p>We were set up to do more than clean. PristineNest exists to play an active role in promoting cleanliness and disease prevention across Abuja — treating hygiene not as a cosmetic service, but as a public-health responsibility.</p>
            <p>That shows up in how we work. Our fumigation protocols aren't just about pest removal; they're timed to Abuja's disease-vector seasons — malaria-carrying mosquitoes in the rains, termite activity as the ground softens — to actively reduce the conditions that let disease take hold in homes, schools, and workplaces.</p>
            <p>Our hospital and clinic engagements follow zone-based infection-control protocols, because we understand that in a healthcare setting, cleaning <em>is</em> patient safety. Our public and corporate hygiene guidance — published through our resources and blog — exists to raise the baseline understanding of hygiene across the city we serve, not just to sell a service.</p>
            <p>We see PristineNest as part of Abuja's broader story: a city defining what modern, health-conscious urban living looks like in Nigeria — and we intend to be one of the standards it's measured against.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-start">
          <div>
            <h2 className="text-4xl font-black text-[#004E99] mb-6">What We Do</h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-6">
              PristineNest delivers a full spectrum of professional cleaning and grounds-care services to residential and commercial clients across Abuja:
            </p>
            <ul className="flex flex-col gap-3 mb-6">
              {[
                'Deep cleaning & routine janitorial services',
                'Fumigation & pest control (NAFDAC-compliant)',
                'Lawn mowing & landscaping',
                'Dry cleaning & laundry',
                'Car washing',
                'Hygiene consulting & disease-prevention programmes for institutions',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#82C300] mt-2 shrink-0"></span>
                  <span className="text-gray-600 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-600 font-medium leading-relaxed">
              Services are available as <span className="font-bold text-[#004E99]">one-off bookings</span> for immediate needs, or as <span className="font-bold text-[#004E99]">monthly contracts</span> with a documented service-level agreement for clients who want a standard that never lapses.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-[#004E99] rounded-[2.5rem] p-10 text-white">
              <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
              <p className="font-medium leading-relaxed opacity-90">To redefine what professional cleaning means in Nigeria — combining premium service delivery with a genuine commitment to public hygiene and disease prevention, one space at a time.</p>
            </div>
            <div className="bg-[#82C300] rounded-[2.5rem] p-10 text-white">
              <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
              <p className="font-medium leading-relaxed opacity-90">To be Nigeria's most trusted name in facilities care and hygiene.</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#004E99] mb-4">Our Values</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50">
            <div className="w-16 h-16 rounded-full bg-[#0066CC] mb-6 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-[#004E99] mb-4">Thoroughness</h3>
            <p className="text-gray-600 font-medium leading-relaxed">We don't do surface-level. Every job follows a full checklist, not a shortcut.</p>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50">
            <div className="w-16 h-16 rounded-full bg-[#82C300] mb-6 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-[#004E99] mb-4">Accountability</h3>
            <p className="text-gray-600 font-medium leading-relaxed mb-6">Every visit is documented, photographed, and reportable — because trust should never have to be taken on faith.</p>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50">
            <div className="w-16 h-16 rounded-full bg-[#82C300] mb-6 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-[#004E99] mb-4">Public-mindedness</h3>
            <p className="text-gray-600 font-medium leading-relaxed">We treat hygiene as a shared civic responsibility, not just a private transaction.</p>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50">
            <div className="w-16 h-16 rounded-full bg-[#0066CC] mb-6 flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-[#004E99] mb-4">Speed with standards</h3>
            <p className="text-gray-600 font-medium leading-relaxed">We move fast as a company without ever cutting corners on a job.</p>
          </div>
        </div>

        <div className="mt-32 max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-[#004E99] mb-8 text-center">Our Standards</h2>
          <ul className="flex flex-col gap-4">
            {[
              'Vetted, background-checked, uniformed personnel',
              'NAFDAC-registered fumigation chemicals with Safety Data Sheets provided per treatment',
              'Documented standard operating procedures (SOPs) and service-level agreements for every institutional contract',
              'Digital, photo-logged checklists for every visit, residential or commercial',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#82C300" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5" /></svg>
                <span className="text-gray-600 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-16">
          <Link to="/services" className="bg-[#004E99] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[#003666] transition-all">
            Meet Our Services →
          </Link>
          <Link to="/quote" className="bg-[#b1f354] text-[#004E99] px-8 py-4 rounded-full font-bold hover:bg-[#99d93c] transition-all">
            Get a Quote →
          </Link>
        </div>

      </div>
    </div>
  );
}
