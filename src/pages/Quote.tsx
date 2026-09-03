import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { submitToFormSubmit, SubmitStatus } from '../lib/formSubmit';

const serviceOptions = [
  'Deep cleaning',
  'Fumigation',
  'Lawn mowing & landscaping',
  'Dry cleaning/laundry',
  'Car washing',
  'Hygiene consulting',
  'Not sure',
];

const steps = [
  {
    num: '1',
    title: 'We review your request',
    desc: 'Within one business day.',
  },
  {
    num: '2',
    title: 'For larger commercial and institutional sites',
    desc: 'We schedule a brief walkthrough to assess scope accurately.',
  },
  {
    num: '3',
    title: 'You receive a tailored quote',
    desc: 'A fixed price for one-off jobs, or a subscription-tier recommendation with pricing for ongoing service.',
  },
  {
    num: '4',
    title: 'You approve, and we schedule',
    desc: 'Your first visit — or your recurring contract begins.',
  },
];

const reasons = [
  'No-obligation, transparent pricing',
  'Response within one business day',
  'Site assessments for commercial and institutional properties, at no cost',
  'Flexible between one-off jobs and monthly contracts — switch anytime',
  "Every quote comes with the same documented standard, whether it's a single home or a full hospital wing",
];

export default function Quote() {
  const [serviceType, setServiceType] = useState<'oneoff' | 'monthly' | 'unsure'>('oneoff');
  const [status, setStatus] = useState<SubmitStatus>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields: Record<string, string> = {};
    data.forEach((value, key) => {
      if (key === 'services') {
        fields.services = fields.services ? `${fields.services}, ${value}` : String(value);
      } else {
        fields[key] = String(value);
      }
    });
    fields.service_type = serviceType === 'oneoff' ? 'One-off visit' : serviceType === 'monthly' ? 'Monthly contract' : 'Not sure yet';

    try {
      await submitToFormSubmit('info@pristinenestng.com.ng', fields, 'New Quote Request — PristineNest Website');
      setStatus('success');
      form.reset();
      setServiceType('oneoff');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen">
      <div className="pt-24 pb-24 px-6 md:px-12 max-w-7xl mx-auto">

        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black text-[#004E99] mb-6 tracking-tight">
            Get Your Free, <span className="text-[#0066CC]">No-Obligation Quote</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Tell us about your space. We'll respond within one business day with a tailored recommendation and pricing — whether you need a single visit or a monthly plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-24">

          {/* Form */}
          <div className="lg:col-span-2 bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50">
            <h2 className="text-2xl font-black text-[#004E99] mb-1">Step 1</h2>
            <p className="text-gray-500 font-medium mb-8">Tell Us About Your Space</p>

            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#F0F9E8] flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#82C300" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <h3 className="text-xl font-bold text-[#004E99] mb-2">Request received!</h3>
                <p className="text-gray-500 font-medium">We'll respond within one business day with your tailored quote.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-bold text-[#0066CC] hover:text-[#004E99] transition-colors">
                  Submit another request
                </button>
              </div>
            ) : (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-2xl px-5 py-4">
                  Something went wrong submitting your request. Please try again, or reach us on WhatsApp instead.
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
                    <input required name="phone" type="tel" placeholder="801 234 5678" className="flex-1 bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Property Type</label>
                  <div className="relative">
                    <select name="property_type" className="w-full bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all appearance-none">
                      <option>Residential home</option>
                      <option>Estate</option>
                      <option>Corporate office</option>
                      <option>Hospital or clinic</option>
                      <option>Mall or retail</option>
                      <option>Other</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Location (District/Area in Abuja)</label>
                  <input required name="location" type="text" placeholder="e.g. Gaduwa, Asokoro, Guzape" className="bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Approximate Size</label>
                  <input name="size" type="text" placeholder="sqm, or number of rooms/units" className="bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Service(s) Needed</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {serviceOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-4 py-3 text-sm font-medium cursor-pointer hover:bg-[#f0f3ff] transition-all">
                      <input type="checkbox" name="services" value={opt} className="accent-[#0066CC] w-4 h-4 shrink-0" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Service Type</label>
                <div className="inline-flex bg-[#f0f3ff]/60 rounded-full p-1.5 border border-gray-100 w-fit">
                  <button
                    type="button"
                    onClick={() => setServiceType('oneoff')}
                    className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${serviceType === 'oneoff' ? 'bg-[#004E99] text-white shadow-md' : 'text-gray-500'}`}
                  >
                    One-off visit
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('monthly')}
                    className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${serviceType === 'monthly' ? 'bg-[#004E99] text-white shadow-md' : 'text-gray-500'}`}
                  >
                    Monthly contract
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('unsure')}
                    className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${serviceType === 'unsure' ? 'bg-[#004E99] text-white shadow-md' : 'text-gray-500'}`}
                  >
                    Not sure yet
                  </button>
                </div>
              </div>

              {serviceType === 'oneoff' && (
                <div className="flex flex-col gap-2 md:w-1/2">
                  <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Preferred Date</label>
                  <input name="preferred_date" type="date" className="bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all" />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Additional Details</label>
                <textarea name="details" rows={4} placeholder="Access instructions, specific concerns, current pain points..." className="bg-[#f0f3ff]/60 border border-gray-100 rounded-3xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all resize-none"></textarea>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <button type="submit" disabled={status === 'submitting'} className="bg-[#426900] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[#314f00] transition-all flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed">
                  {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
                  {status !== 'submitting' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                  )}
                </button>
                <a href="https://wa.me/234" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] font-bold text-sm hover:text-[#004E99] transition-colors">
                  Chat With Us on WhatsApp Instead →
                </a>
              </div>
            </form>
            )}
          </div>

          {/* Sidebar: Why Request With Us */}
          <div className="bg-[#004E99] rounded-[3rem] p-8 md:p-10 text-white">
            <h3 className="text-2xl font-bold mb-6">Why Request a Quote With Us</h3>
            <ul className="flex flex-col gap-4">
              {reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b1f354" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5" /></svg>
                  <span className="font-medium text-sm leading-relaxed opacity-90">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#004E99] mb-1">Step 2</h2>
            <p className="text-gray-500 font-medium text-lg">What Happens Next</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#004E99] text-white flex items-center justify-center font-black text-xl shadow-lg mb-5 z-10">
                  {step.num}
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-[2px] bg-[#e7eeff] -z-0"></div>
                )}
                <h3 className="text-lg font-bold text-[#004E99] mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-[240px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prefer to Talk First */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-[#004E99] mb-3">Prefer to Talk First?</h3>
          <p className="text-gray-600 font-medium">
            Call, WhatsApp, or email us directly — details on our <Link to="/contact" className="text-[#0066CC] font-bold hover:text-[#004E99] transition-colors">Contact page →</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
