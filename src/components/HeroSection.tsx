import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative pt-12 pb-24 lg:pt-24 lg:pb-32 overflow-hidden flex items-center min-h-[85vh] bg-white">
      {/* Lobby background image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/images/office-lobby.jpg" 
          alt="" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-white/10"></div>
        <div className="absolute w-[300px] h-[300px] bg-[#0066CC] rounded-full opacity-10 -bottom-20 -right-20 blur-3xl"></div>
        <div className="absolute w-[250px] h-[250px] bg-[#82C300] rounded-full opacity-10 -top-10 -left-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 bg-[#F0F9E8] px-3 py-1 rounded-full border border-[#82C300]">
            <ShieldCheck size={16} className="text-[#82C300]" />
            <span className="text-[#82C300] text-xs font-bold uppercase tracking-wider">Top-Rated in Nigeria</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-black text-[#004E99] leading-[1.05] lg:leading-[0.95] tracking-tight">
            Redefining <span className="text-[#0066CC]">Clean</span>, One Space at a Time.
          </h1>
          
          <p className="text-lg text-gray-600 font-medium max-w-[480px]">
            Abuja's premium cleaning, fumigation, and grounds-care company — trusted by homes, hospitals, corporate offices, and estates across the Federal Capital Territory for spaces that don't just look clean, but <em>are</em> clean.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Link to="/quote" className="bg-[#004E99] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[#003666] transition-all">
              Book a Free Quote
              <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="bg-[#b1f354] text-[#004E99] px-8 py-4 rounded-full font-bold hover:bg-[#99d93c] transition-all">
              Explore Our Services
            </Link>
          </div>

          <div className="flex items-center gap-8 mt-8 pt-8 w-full max-w-md">
            <div>
              <div className="font-display text-4xl text-[#004E99] font-black">1,000+</div>
              <div className="font-body text-xs font-semibold text-gray-500 mt-1">Happy Clients</div>
            </div>
            <div>
              <div className="font-display text-4xl text-[#004E99] font-black">100%</div>
              <div className="font-body text-xs font-semibold text-gray-500 mt-1">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Image Composition */}
        <div className="relative h-[280px] sm:h-[340px] w-full lg:hidden order-first mb-2">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[62%] max-w-[260px] h-full z-20">
            <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl border-4 border-white animate-float" style={{ animationDelay: '-1s' }}>
              <img 
                src="/images/residential-staff.jpg" 
                alt="Professional cleaning" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute left-0 top-4 w-[38%] max-w-[150px] aspect-square rounded-full overflow-hidden shadow-lg border-4 border-white z-30 animate-float" style={{ animationDelay: '-4s' }}>
            <img 
              src="/images/office-desk-cleaning.jpg" 
              alt="Sparkling clean space" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute right-4 top-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg z-30 border border-gray-100 animate-float" style={{ animationDelay: '-2.5s' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#426900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 20 L14 10" />
              <path d="M13 9c1-1 3-3 6-3 0 3-2 5-3 6" />
              <path d="M9 15c-1.5 1-2.5 2.5-3 4-1.5.5-3-.5-3-2 1.5-.5 3-1.5 4-3" />
              <path d="M13 9c-1 1-2 3-1 5s4 2 5 1" />
            </svg>
          </div>
        </div>

        {/* Asymmetric Image Composition (desktop) */}
        <div className="lg:col-span-5 relative h-[500px] hidden lg:block">
          {/* Main big rounded-rect image */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-[440px] z-20">
            <div className="w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white animate-float" style={{ animationDelay: '-1s' }}>
              <img 
                src="/images/residential-staff.jpg" 
                alt="Professional cleaning" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Smaller overlapping circle image */}
          <div className="absolute left-4 top-10 w-48 h-48 rounded-full overflow-hidden shadow-xl border-8 border-white z-30 animate-float" style={{ animationDelay: '-4s' }}>
            <img 
              src="/images/office-desk-cleaning.jpg" 
              alt="Sparkling clean space" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative floating badge */}
          <div className="absolute right-6 top-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-30 border border-gray-100 animate-float" style={{ animationDelay: '-2.5s' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#426900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 20 L14 10" />
              <path d="M13 9c1-1 3-3 6-3 0 3-2 5-3 6" />
              <path d="M9 15c-1.5 1-2.5 2.5-3 4-1.5.5-3-.5-3-2 1.5-.5 3-1.5 4-3" />
              <path d="M13 9c-1 1-2 3-1 5s4 2 5 1" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
