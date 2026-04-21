import React from 'react';
import { GraduationCap, Calendar, CheckCircle, Users, FileText } from 'lucide-react';
import { useData } from '../../context/DataContext';

const PPDBPage: React.FC = () => {
  const { ppdb } = useData();

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <GraduationCap className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{ppdb.title}</h1>
          <p className="text-primary-200">Informasi Penerimaan Peserta Didik Baru</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border-t-4 border-primary-600">
            <Calendar className="h-8 w-8 text-primary-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500 mb-1">Tanggal Mulai</p>
            <p className="font-bold text-gray-800">{formatDate(ppdb.startDate)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border-t-4 border-red-500">
            <Calendar className="h-8 w-8 text-red-500 mx-auto mb-3" />
            <p className="text-sm text-gray-500 mb-1">Tanggal Selesai</p>
            <p className="font-bold text-gray-800">{formatDate(ppdb.endDate)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 text-center border-t-4 border-green-500">
            <Users className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <p className="text-sm text-gray-500 mb-1">Kuota Siswa</p>
            <p className="font-bold text-gray-800 text-2xl">{ppdb.quota}</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-primary-600" />
            <h2 className="font-bold text-gray-800 text-xl">Informasi PPDB</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">{ppdb.content}</p>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h2 className="font-bold text-gray-800 text-xl">Persyaratan Pendaftaran</h2>
          </div>
          <ul className="space-y-3">
            {ppdb.requirements.map((req, i) => (
              <li key={i} className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-0.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-primary-800 text-white rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Siap Mendaftar?</h3>
          <p className="text-primary-200 mb-6">
            Hubungi kami untuk informasi lebih lanjut atau kunjungi langsung kantor sekolah.
          </p>
          <a
            href="/kontak"
            className="bg-white text-primary-800 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-block"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
};

export default PPDBPage;
