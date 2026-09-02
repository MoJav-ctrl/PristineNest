const steps = [
  {
    num: '01',
    title: 'Request a Quote',
    desc: 'Tell us about your space — home, office, hospital, or estate — and what you need done.',
  },
  {
    num: '02',
    title: 'Get a Tailored Plan',
    desc: "We recommend the right service and schedule, whether that's a one-off visit or a monthly contract.",
  },
  {
    num: '03',
    title: 'We Get to Work',
    desc: 'Vetted, uniformed staff arrive on time with the right equipment and products for the job.',
  },
  {
    num: '04',
    title: 'You Get the Proof',
    desc: 'Every visit is documented — so you always know exactly what was done, and when.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-24 w-full px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-[#004E99] mb-4">How It <span className="text-[#0066CC]">Works</span></h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
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
    </section>
  );
}
