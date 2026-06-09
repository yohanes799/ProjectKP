import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ExternalLink, MessageCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import seruniLogo from '../../assets/serunilogo1.jpg';

const Footer: React.FC = () => {
  const { profile, contact } = useData();

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={seruniLogo}
                alt="Logo Sekolah"
                className="h-12 w-12 rounded-full object-cover border-2 border-primary-600 shadow"
              />
              <div>
                <h3 className="font-bold text-lg">{profile.name}</h3>
                <p className="text-primary-300 text-sm">Akreditasi {profile.accreditation}</p>
              </div>
            </div>
            <p className="text-primary-300 text-sm leading-relaxed mb-4">
              {profile.description.substring(0, 200)}...
            </p>
            <div className="flex space-x-3">
              {contact.socialMedia.facebook && (
                <a
                  href={contact.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full transition-colors"
                  title="Facebook"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
              {contact.socialMedia.whatsapp && (
                <a
                  href={contact.socialMedia.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-700 hover:bg-green-600 p-2 rounded-full transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              )}
              {contact.socialMedia.instagram && (
                <a
                  href={contact.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-700 hover:bg-pink-600 p-2 rounded-full transition-colors"
                  title="Instagram"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Tautan Cepat</h4>
            <ul className="space-y-2">
              {[
                { path: '/', label: 'Beranda' },
                { path: '/profil', label: 'Profil Sekolah' },
                { path: '/visi-misi', label: 'Visi & Misi' },
                { path: '/berita', label: 'Berita' },
                { path: '/fasilitas', label: 'Fasilitas' },
                { path: '/ekstrakulikuler', label: 'Ekstrakurikuler' },
                { path: '/ppdb', label: 'PPDB' },
                { path: '/guru', label: 'Data Guru' },
                { path: '/kontak', label: 'Kontak' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-300 hover:text-white text-sm transition-colors"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Kontak Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-primary-300 text-sm">{contact.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-primary-300 text-sm">{contact.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-primary-300 text-sm">{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-400">
            <p>© 2026 {profile.name}. Hak Cipta Dilindungi.</p>
            <p className="mt-2 md:mt-0">Dibuat dengan ❤️ untuk pendidikan Indonesia</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
