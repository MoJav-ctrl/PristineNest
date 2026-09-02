import { Link } from 'react-router-dom';

export default function ClosingCTA() {
  return (
    <section className="bg-[#004E99] py-20 w-full px-6 md:px-12 relative overflow-hidden">
      <div className="absolute w-[300px] h-[300px] bg-[#82C300] rounded-full opacity-10 -bottom-24 -left-24 blur-3xl"></div>
      <div className="absolute w-[250px] h-[250px] bg-white rounded-full opacity-10 -top-16 -right-16 blur-3xl"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          A cleaner Abuja starts with your space.
        </h2>
        <p className="text-lg text-white/80 font-medium mb-10 max-w-xl mx-auto">
          Whether it's one visit or an ongoing partnership, PristineNest is ready.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/quote" className="bg-white text-[#004E99] px-8 py-4 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-all">
            Request a Free Quote
          </Link>
          <a href="https://wa.me/234" target="_blank" rel="noopener noreferrer" className="bg-[#b1f354] text-[#004E99] px-8 py-4 rounded-full font-bold hover:bg-[#99d93c] transition-all">
            Chat With Us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
