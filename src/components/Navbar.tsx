import React from 'react';
import { Plane } from 'lucide-react';

const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full bg-black/50 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Plane className="text-emerald-400 w-8 h-8" />
          <span className="text-white text-2xl font-bold">Nathir Travels</span>
        </div>
        <ul className="flex gap-8">
          <li>
            <button
              onClick={() => scrollToSection('packages')}
              className="text-white hover:text-emerald-400 transition-colors duration-200 text-lg"
            >
              Packages
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-emerald-400 transition-colors duration-200 text-lg"
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;