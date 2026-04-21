import React, { useState } from 'react';
import { Users, Search, BookOpen, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';

const TeacherPage: React.FC = () => {
  const { teachers } = useData();
  const [search, setSearch] = useState('');

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Users className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Data Guru</h1>
          <p className="text-primary-200">Tenaga pendidik profesional dan berpengalaman</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau mata pelajaran..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>
        </div>

        {/* Teachers Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Tidak ada guru ditemukan</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="bg-gradient-to-br from-primary-700 to-primary-900 p-6 text-center">
                  <img
                    src={teacher.photo}
                    alt={teacher.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-md"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{teacher.name}</h3>
                  <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full mb-3">
                    {teacher.subject}
                  </span>
                  <div className="space-y-2 text-sm text-gray-500 text-left border-t pt-3">
                    <div className="flex items-start space-x-2">
                      <Award className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span>{teacher.position}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <BookOpen className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
                      <span>{teacher.education}</span>
                    </div>
                    {teacher.nip && (
                      <div className="flex items-start space-x-2">
                        <span className="text-xs text-gray-400 font-medium">NIP:</span>
                        <span className="text-xs">{teacher.nip}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherPage;
