const trustItems = [
  'NAFDAC-Compliant Fumigation',
  'Vetted, Uniformed Staff',
  'Service Level Agreement (SLA)-Backed Contracts',
  "Serving Abuja's Homes, Hospitals, Malls & Corporate Campuses",
];

export default function TrustBar() {
  return (
    <section className="bg-[#004E99] w-full py-5">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {trustItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b1f354" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="text-white text-xs sm:text-sm font-bold whitespace-nowrap">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
