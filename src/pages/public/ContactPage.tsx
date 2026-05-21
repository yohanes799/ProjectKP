import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, ExternalLink, Send, MessageCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ContactPage: React.FC = () => {
  const { contact, profile } = useData();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const MAPS_URL =
    'https://www.google.com/maps/dir/?api=1&destination=Jl.+Benda+Barat+13+No.D33,+RW.10,+Pd.+Benda,+Kec.+Pamulang,+Kota+Tangerang+Selatan,+Banten+15416,+Indonesia';

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Kontak Sekolah</h1>
          <p className="text-primary-200 text-sm sm:text-base">Hubungi kami untuk informasi lebih lanjut</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* ── Info Kontak — 3 kolom di md, 1 kolom di mobile ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Alamat */}
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-start space-x-4">
            <div className="bg-primary-100 p-3 rounded-full flex-shrink-0">
              <MapPin className="h-5 w-5 text-primary-700" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 text-sm">Alamat</p>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">{contact.address}</p>
            </div>
          </div>

          {/* Telepon */}
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center space-x-4">
            <div className="bg-primary-100 p-3 rounded-full flex-shrink-0">
              <Phone className="h-5 w-5 text-primary-700" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Telepon</p>
              <a
                href={`tel:${contact.phone}`}
                className="text-primary-600 text-sm mt-1 hover:underline"
              >
                {contact.phone}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center space-x-4">
            <div className="bg-primary-100 p-3 rounded-full flex-shrink-0">
              <Mail className="h-5 w-5 text-primary-700" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 text-sm">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="text-primary-600 text-sm mt-1 hover:underline break-all"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* ── Main Grid: Form + Sidebar ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

          {/* Kolom Kiri: Media Sosial + Peta */}
          <div className="space-y-6 order-2 lg:order-1">

            {/* Media Sosial */}
            <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6">
              <h2 className="font-bold text-gray-800 text-lg mb-4">Media Sosial</h2>
              <div className="flex flex-wrap gap-3">
                {contact.socialMedia.facebook && (
                  <a
                    href={contact.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Facebook</span>
                  </a>
                )}
                {contact.socialMedia.whatsapp && (
                  <a
                    href={contact.socialMedia.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {contact.socialMedia.instagram && (
                  <a
                    href={contact.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>

            {/* Peta */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="font-bold text-gray-800 text-base">Lokasi Sekolah</h2>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-xs sm:text-sm text-primary-700 hover:text-primary-900 font-medium transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Buka di Google Maps</span>
                </a>
              </div>

              {contact.mapEmbed ? (
                <div className="relative">
                  <iframe
                    src={contact.mapEmbed}
                    width="100%"
                    height="260"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Sekolah"
                  />
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 flex items-center space-x-1.5 bg-white text-primary-700 border border-primary-200 px-3 py-1.5 rounded-lg shadow text-xs font-medium hover:bg-primary-50 transition-colors"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Petunjuk Arah</span>
                  </a>
                </div>
              ) : (
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-56 bg-gray-100 flex flex-col items-center justify-center hover:bg-primary-50 transition-colors group"
                >
                  <MapPin className="h-10 w-10 mb-2 text-primary-400 group-hover:text-primary-600 transition-colors" />
                  <p className="text-sm font-medium text-gray-700 group-hover:text-primary-700">{profile.name}</p>
                  <p className="text-xs text-gray-500 text-center px-6 mt-1">{contact.address}</p>
                  <span className="mt-3 text-xs text-primary-600 font-medium flex items-center space-x-1">
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Klik untuk buka Google Maps</span>
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Form Kirim Pesan */}
          <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 order-1 lg:order-2">
            <h2 className="font-bold text-gray-800 text-lg sm:text-xl mb-5">Kirim Pesan</h2>

            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4 flex items-start space-x-2 text-sm">
                <Send className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Pesan berhasil dikirim! Kami akan segera menghubungi Anda.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama + Email — 2 kolom di sm ke atas, 1 kolom di mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    placeholder="email@contoh.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  placeholder="Subjek pesan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-700 text-white py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Send className="h-4 w-4" />
                <span>Kirim Pesan</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
