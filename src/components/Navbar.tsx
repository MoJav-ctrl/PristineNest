import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center h-[72px] px-8 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2 active:scale-95 duration-150" onClick={closeMenu}>
            <img src="/images/logo-icon.png" alt="PristineNest" className="w-10 h-10 object-contain rounded-lg" />
            <span className="text-xl font-extrabold tracking-tight text-[#004E99]">
              PristineNest
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={clsx(
                    'text-sm font-semibold transition-colors duration-200',
                    location.pathname === link.path
                      ? 'text-[#0066CC] border-b-2 border-[#0066CC] pb-1'
                      : 'text-gray-500 hover:text-[#0066CC]'
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              to="/quote"
              className="hidden md:inline-flex bg-[#004E99] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-[#003666] transition-colors"
            >
              Get a Quote
            </Link>
            <button
              className="md:hidden text-brand-primary p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={clsx(
            'md:hidden absolute top-20 left-0 w-full bg-white border-b border-brand-surface shadow-lg transition-transform duration-300 ease-in-out',
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-[150%] shadow-none'
          )}
        >
          <ul className="flex flex-col p-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={closeMenu}
                  className={clsx(
                    'block py-4 px-4 font-body text-lg font-semibold transition-colors border-b border-brand-surface/50',
                    location.pathname === link.path
                      ? 'text-brand-primary bg-brand-surface/30'
                      : 'text-brand-dark hover:text-brand-primary hover:bg-brand-surface/10'
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-6 pb-2 px-4">
               <Link
                to="/quote"
                onClick={closeMenu}
                className="w-full inline-flex items-center justify-center bg-brand-primary text-white font-body text-lg font-semibold rounded-full px-6 py-4 shadow-sm"
              >
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>
      </nav>
  );
}
