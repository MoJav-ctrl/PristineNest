import { Link } from 'react-router-dom';
import { Zap, CalendarClock } from 'lucide-react';

export default function OneOffOrOngoing() {
  return (
    <section className="bg-[#F8FAFC] py-24 w-full px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-[#004E99] mb-4">One-Off or Ongoing — <span className="text-[#0066CC]">Your Choice</span></h2>
          <p className="text-gray-600 font-medium">Need a single deep clean, or a partner you can rely on every month? Either way, PristineNest fits how you actually work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 flex flex-col">
            <div className="w-14 h-14 rounded-full bg-[#f0f3ff] flex items-center justify-center mb-6">
              <Zap size={26} className="text-[#0066CC]" />
            </div>
            <h3 className="text-2xl font-bold text-[#004E99] mb-3">One-Time Service</h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-1">
              Perfect for move-ins, post-event resets, pre-inspection deep cleans, or the occasional deep clean your space just needs right now. No contract, no commitment — just a job done properly.
            </p>
            <Link to="/quote" className="inline-flex justify-center bg-[#004E99] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-[#003666] transition-all">
              Get a One-Off Quote
            </Link>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 flex flex-col">
            <div className="w-14 h-14 rounded-full bg-[#F0F9E8] flex items-center justify-center mb-6">
              <CalendarClock size={26} className="text-[#82C300]" />
            </div>
            <h3 className="text-2xl font-bold text-[#004E99] mb-3">Monthly Contracts</h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-1">
              Ongoing SLA-backed cleaning, grounds-care, and hygiene programmes for homes, estates, and institutions — built around your schedule, with consistent staff and documented visits.
            </p>
            <Link to="/services" className="inline-flex justify-center bg-[#b1f354] text-[#004E99] px-8 py-3.5 rounded-full font-bold hover:bg-[#99d93c] transition-all">
              Explore Subscription Plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
