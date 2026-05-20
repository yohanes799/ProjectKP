import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useData } from '../../context/DataContext';
import seruniLogo from '../../assets/serunilogo1.jpg';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const location = useLocation();
  const { profile } = useData();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/profil', label: 'Profil Sekolah' },
    { path: '/visi-misi', label: 'Visi & Misi' },
    { path: '/berita', label: 'Berita' },
    { path: '/guru', label: 'Data Guru' },
    { path: '/kontak', label: 'Kontak' },
  ];

  const categoryLinks = [
    { path: '/fasilitas', label: 'Fasilitas' },
    { path: '/ekstrakulikuler', label: 'Ekstrakulikuler' },
    { path: '/ppdb', label: 'PPDB' },
  ];

  return (
    <nav className="bg-primary-800 text-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-900 py-1 px-4 text-xs text-primary-200 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>{profile.address}</span>
          <span>{profile.phone} | {profile.email}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={seruniLogo}
              alt="Logo Sekolah"
              className="h-10 w-10 rounded-full object-cover border-2 border-white shadow"
            />
            <div className="hidden sm:block">
              <p className="font-bold text-sm leading-tight">{profile.name}</p>
              <p className="text-primary-300 text-xs">Akreditasi {profile.accreditation}</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary-600 text-white'
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  categoryLinks.some((l) => isActive(l.path))
                    ? 'bg-primary-600 text-white'
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                }`}
              >
                Kategori
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
              </button>
              {categoryOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {categoryLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setCategoryOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive(link.path)
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-primary-200 hover:text-white hover:bg-primary-700"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-primary-900 border-t border-primary-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(link.path)
                    ? 'bg-primary-600 text-white'
                    : 'text-primary-200 hover:bg-primary-700 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-primary-700 pt-2 mt-2">
              <p className="px-3 py-1 text-xs text-primary-400 uppercase tracking-wider">Kategori</p>
              {categoryLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(link.path)
                      ? 'bg-primary-600 text-white'
                      : 'text-primary-200 hover:bg-primary-700 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
