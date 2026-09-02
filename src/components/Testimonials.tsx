const testimonials = [
  {
    quote: "PristineNest doesn't just clean our facility — they document it. Every visit comes with a report our own compliance team can actually use.",
    name: 'Facilities Manager',
    role: 'Corporate Client',
  },
  {
    quote: "Our estate has never looked better. The lawn care alone changed how residents feel about coming home.",
    name: 'Estate Manager',
    role: 'Residential Estate',
  },
  {
    quote: "For a hospital, hygiene isn't optional. PristineNest treats it that way too.",
    name: 'Administrator',
    role: 'Private Clinic',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#F8FAFC] py-24 w-full px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#004E99] mb-4">What Our <span className="text-[#0066CC]">Clients Say</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#e7eeff" className="mb-4">
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/>
              </svg>
              <p className="text-gray-700 font-medium italic leading-relaxed flex-1 mb-6">"{t.quote}"</p>
              <div>
                <p className="font-bold text-[#004E99]">{t.name}</p>
                <p className="text-sm text-gray-400 font-medium">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
