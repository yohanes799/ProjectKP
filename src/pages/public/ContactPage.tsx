import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, ExternalLink, Send, MessageCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ContactPage: React.FC = () => {
  const { contact, profile } = useData();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Kontak Sekolah
          </h1>
          <p className="text-primary-200">
            Hubungi kami untuk informasi lebih lanjut
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-gray-800 text-xl mb-5">
                Informasi Kontak
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary-700" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Alamat</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {contact.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary-700" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Telepon</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {contact.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary-700" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {contact.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-gray-800 text-xl mb-4">
                Media Sosial
              </h2>
              <div className="flex space-x-3">
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

            {/* Map */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="font-bold text-gray-800">Lokasi Sekolah</h2>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Jl.+Benda+Barat+13+No.D33,+RW.10,+Pd.+Benda,+Kec.+Pamulang,+Kota+Tangerang+Selatan,+Banten+15416,+Indonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-sm text-primary-700 hover:text-primary-900 font-medium transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Buka di Google Maps</span>
                </a>
              </div>
              {contact.mapEmbed ? (
                <div className="relative">
                  <iframe
                    src={contact.mapEmbed}
                    width="100%"
                    height="280"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Sekolah"
                  />
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Jl.+Benda+Barat+13+No.D33,+RW.10,+Pd.+Benda,+Kec.+Pamulang,+Kota+Tangerang+Selatan,+Banten+15416,+Indonesia"
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
                  href="https://www.google.com/maps/dir/?api=1&destination=Jl.+Benda+Barat+13+No.D33,+RW.10,+Pd.+Benda,+Kec.+Pamulang,+Kota+Tangerang+Selatan,+Banten+15416,+Indonesia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-64 bg-gray-100 flex flex-col items-center justify-center hover:bg-primary-50 transition-colors group"
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

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-bold text-gray-800 text-xl mb-5">
              Kirim Pesan
            </h2>
            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 mb-4 flex items-center space-x-2">
                <Send className="h-4 w-4" />
                <span>
                  Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
                </span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    placeholder="email@contoh.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subjek
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  placeholder="Subjek pesan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pesan
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary-700 text-white py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors flex items-center justify-center space-x-2"
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
