import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { CATEGORY_LIST } from '../common/products';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [lang, setLang] = useState('en');

  // Keep header button label in sync with app language
  useEffect(() => {
    const stored = localStorage.getItem('tph_lang');
    if (stored === 'en' || stored === 'ur') setLang(stored);
    const onChanged = (e) => setLang(e.detail);
    window.addEventListener('tph:lang-changed', onChanged);
    return () => window.removeEventListener('tph:lang-changed', onChanged);
  }, []);

  const toggleLanguage = () => {
    window.dispatchEvent(new Event('tph:toggleLanguage'));
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'text-white bg-red-600' : 'text-red-700 hover:text-red-900 hover:bg-red-100'
    }`;

  return (
    <header className="bg-white text-red-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex min-h-[80px] items-center justify-between py-2">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <img
              src="https://i.ibb.co/N2frfSLm/Logo.png"
              alt="The Planner Herbal International"
              className="h-14 w-auto rounded md:h-16"
              width={56}
              height={56}
              loading="eager"
            />
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <NavLink to="/shop" className={navLinkClass}>
                Shop
              </NavLink>
              {/* Dropdown */}
              {shopOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                  {CATEGORY_LIST.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/shop/${c.slug}`}
                      className="block px-3 py-2 text-sm text-red-700 hover:bg-red-100 hover:text-red-900"
                      onClick={() => setShopOpen(false)}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <NavLink to="/contact" className={navLinkClass}>
              Contact Us
            </NavLink>
            <button
              type="button"
              onClick={toggleLanguage}
              className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              aria-label="Toggle language"
              title="Translate"
            >
              {lang === 'ur' ? 'English' : 'اردو'}
            </button>
          </nav>

          {/* Mobile button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-red-700 hover:bg-red-100"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {open && (
          <div className="md:hidden pb-3">
            <nav className="flex flex-col gap-1">
              <NavLink to="/" className={navLinkClass} end onClick={() => setOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/about" className={navLinkClass} onClick={() => setOpen(false)}>
                About Us
              </NavLink>
              <NavLink to="/shop" className={navLinkClass} onClick={() => setOpen(false)}>
                Shop
              </NavLink>
              <div className="ml-3 pl-2 border-l border-red-100 flex flex-col">
                {CATEGORY_LIST.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/shop/${c.slug}`}
                    className="px-3 py-2 rounded-md text-sm font-medium text-red-700 hover:text-red-900 hover:bg-red-100"
                    onClick={() => setOpen(false)}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
              <NavLink to="/contact" className={navLinkClass} onClick={() => setOpen(false)}>
                Contact Us
              </NavLink>
              <button
                type="button"
                onClick={() => { toggleLanguage(); setOpen(false); }}
                className="mt-1 px-3 py-2 rounded-md text-sm font-semibold text-white bg-green-600 hover:bg-green-700"
                aria-label="Toggle language"
                title="Translate"
              >
                {lang === 'ur' ? 'English' : 'اردو'}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
