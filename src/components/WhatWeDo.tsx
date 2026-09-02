import { Link } from 'react-router-dom';

const items = [
  {
    img: '/images/janitorial-cleaning.jpg',
    title: 'Deep Cleaning & Janitorial',
    desc: 'From single-visit deep cleans to daily office care, we clean the way a space actually needs to be cleaned — not just the way it looks.',
  },
  {
    img: '/images/fumigation.jpg',
    title: 'Fumigation & Pest Control',
    desc: "NAFDAC-registered treatments for termites, rodents, and mosquitoes, timed to Abuja's seasons and documented for every visit.",
  },
  {
    img: '/images/landscaping.jpg',
    title: 'Lawn Mowing & Landscaping',
    desc: 'From weekly lawn care to full grounds redesign — because a well-kept exterior is the first impression your property makes.',
  },
  {
    img: '/images/dry-cleaning.jpg',
    title: 'Dry Cleaning & Laundry',
    desc: 'Garment and household laundry care for homes, hotels, and hospitals, handled with the same precision as everything else we touch.',
  },
  {
    img: '/images/car-detailing.jpg',
    title: 'Car Washing',
    desc: 'On-site fleet and staff-vehicle washing for corporate campuses and residential estates.',
  },
  {
    img: '/images/hygiene.jpg',
    title: 'Hygiene & Disease-Prevention Programmes',
    desc: 'Facility-wide sanitation protocols designed with public health in mind — for hospitals, schools, and workplaces that take containment seriously.',
  },
];

export default function WhatWeDo() {
  return (
    <section className="bg-white py-24 w-full px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#004E99] mb-4">What We <span className="text-[#0066CC]">Do</span></h2>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
            Comprehensive cleaning solutions tailored for modern Nigerian living and working spaces.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="bg-[#F8FAFC] rounded-[2rem] p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-[#f0f3ff] flex items-center justify-center mb-5 overflow-hidden">
                <img src={item.img} alt="" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-[#004E99] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/services" className="inline-flex bg-[#004E99] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-[#003666] transition-all">
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
