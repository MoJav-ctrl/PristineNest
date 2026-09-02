import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

const socialLinks = [
  { name: 'LinkedIn', href: '#', path: 'M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4zM13.32 8.48h-3.84V21h3.84v-6.57c0-3.66 4.75-4 4.75 0V21h3.85v-7.93c0-6.17-6.9-5.94-8.6-2.91z' },
  { name: 'Instagram', href: '#', path: 'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.67-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z' },
  { name: 'Facebook', href: '#', path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z' },
  { name: 'X', href: '#', path: 'M18.9 2H22l-7.4 8.44L23.3 22H16.9l-5-6.53L6.1 22H3l7.93-9.05L2.9 2h6.6l4.5 5.97L18.9 2zm-1.24 18.17h1.72L7.42 3.75H5.57L17.66 20.17z' },
  { name: 'TikTok', href: '#', path: 'M16.6 5.82c-1.02-.9-1.63-2.21-1.63-3.65h-3.14v13.5a3.05 3.05 0 1 1-2.16-2.92V9.5a6.2 6.2 0 1 0 5.3 6.15V9.75a8.35 8.35 0 0 0 4.63 1.4V8.02a4.86 4.86 0 0 1-2.98-2.2z' },
  { name: 'YouTube', href: '#', path: 'M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.6 15.5v-7l6.3 3.5-6.3 3.5z' },
];

export default function Footer() {
  return (
    <footer className="bg-[#e7eeff] w-full pt-16 mt-20 text-[#414752]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-16 max-w-7xl mx-auto pb-12 border-b border-[#004E99]/10">
        <div className="md:col-span-1 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo-icon.png" alt="PristineNest" className="w-8 h-8 object-contain rounded" />
            <span className="font-display text-2xl text-[#004E99] font-bold">
              PristineNest
            </span>
          </Link>
          <p className="font-body text-sm mt-2 leading-relaxed font-medium">
            Redefining Clean, One Space at a Time. Premium cleaning, fumigation, and grounds-care across Abuja.
          </p>
          <div className="flex items-center gap-3 mt-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#004E99] hover:bg-[#004E99] hover:text-white transition-colors shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d={social.path} /></svg>
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-display text-sm text-[#004E99] font-bold mb-2 uppercase tracking-wider">Services</h4>
          <Link to="/services" className="font-body text-sm hover:text-[#0066CC] transition-colors underline decoration-[#0066CC]/30 underline-offset-4">Residential Cleaning</Link>
          <Link to="/services" className="font-body text-sm hover:text-[#0066CC] transition-colors underline decoration-[#0066CC]/30 underline-offset-4">Commercial Cleaning</Link>
          <Link to="/services" className="font-body text-sm hover:text-[#0066CC] transition-colors underline decoration-[#0066CC]/30 underline-offset-4">Fumigation & Pest Control</Link>
          <Link to="/services" className="font-body text-sm hover:text-[#0066CC] transition-colors underline decoration-[#0066CC]/30 underline-offset-4">Lawn Mowing & Landscaping</Link>
          <Link to="/services" className="font-body text-sm hover:text-[#0066CC] transition-colors underline decoration-[#0066CC]/30 underline-offset-4">Dry Cleaning & Laundry</Link>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-display text-sm text-[#004E99] font-bold mb-2 uppercase tracking-wider">Specialty</h4>
          <Link to="/services" className="font-body text-sm hover:text-[#0066CC] transition-colors underline decoration-[#0066CC]/30 underline-offset-4">Move-In/Move-Out</Link>
          <Link to="/services" className="font-body text-sm hover:text-[#0066CC] transition-colors underline decoration-[#0066CC]/30 underline-offset-4">Car Washing</Link>
          <Link to="/services" className="font-body text-sm hover:text-[#0066CC] transition-colors underline decoration-[#0066CC]/30 underline-offset-4">Event Cleanup</Link>
          <Link to="/services" className="font-body text-sm hover:text-[#0066CC] transition-colors underline decoration-[#0066CC]/30 underline-offset-4">Hygiene Consulting</Link>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-display text-sm text-[#004E99] font-bold mb-2 uppercase tracking-wider">Contact</h4>
          <p className="font-body text-sm flex items-start gap-2">
            <MapPin className="text-[#004E99] w-4 h-4 shrink-0 mt-0.5" />
            No A2 Amaka Udomma Street, Gaduwa District, Abuja
          </p>
          <p className="font-body text-sm flex items-center gap-2 mt-2">
            <Phone className="text-[#004E99] w-4 h-4 shrink-0" />
            +234 XXX XXX XXXX
          </p>
          <p className="font-body text-sm flex items-center gap-2 mt-2">
            <Mail className="text-[#004E99] w-4 h-4 shrink-0" />
            pristinenestng@gmail.com
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-start px-6 md:px-16 py-6 text-xs font-semibold text-[#414752] max-w-7xl mx-auto">
        <span>© {new Date().getFullYear()} PristineNest Services Ltd. All rights reserved. Gaduwa District, Abuja.</span>
      </div>
    </footer>
  );
}
