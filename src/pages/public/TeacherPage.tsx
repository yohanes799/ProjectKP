import React, { useState } from 'react';
import { Users, Search, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { Teacher } from '../../types';

const levelColors: Record<Teacher['level'], string> = {
  SD:    'bg-pink-100 text-pink-700',
  SMP:   'bg-yellow-100 text-yellow-700',
  Staff: 'bg-teal-100 text-teal-700',
};

const levelTabColors: Record<Teacher['level'], string> = {
  SD:    'bg-pink-500 text-white border-pink-500',
  SMP:   'bg-yellow-500 text-white border-yellow-500',
  Staff: 'bg-teal-500 text-white border-teal-500',
};

const levelHeaderColors: Record<Teacher['level'], string> = {
  SD:    'from-pink-600 to-pink-800',
  SMP:   'from-yellow-500 to-yellow-700',
  Staff: 'from-teal-600 to-teal-800',
};

const TeacherPage: React.FC = () => {
  const { teachers } = useData();
  const [search, setSearch] = useState('');
  const [activeLevel, setActiveLevel] = useState<Teacher['level'] | 'Semua'>('Semua');

  // Kumpulkan level yang benar-benar ada di data
  const availableLevels = Array.from(
    new Set(teachers.map((t) => t.level ?? 'Umum'))
  ) as Teacher['level'][];

  // Urutkan: SD → SMP → SMA → SMK → Umum
  const levelOrder: Teacher['level'][] = ['SD', 'SMP', 'Staff'];
  const sortedLevels = levelOrder.filter((l) => availableLevels.includes(l));

const searchFiltered = teachers.filter(
  (t) =>
    (t?.name || "").toLowerCase().includes((search || "").toLowerCase()) ||
    (t?.subject || "").toLowerCase().includes((search || "").toLowerCase())
);
  // Kelompokkan per level
  const grouped: Record<string, Teacher[]> = {};
  if (activeLevel === 'Semua') {
    sortedLevels.forEach((lvl) => {
      const group = searchFiltered.filter((t) => (t.level ?? 'Umum') === lvl);
      if (group.length > 0) grouped[lvl] = group;
    });
    // Guru tanpa level
    const noLevel = searchFiltered.filter((t) => !t.level);
    if (noLevel.length > 0) grouped['Umum'] = [...(grouped['Umum'] || []), ...noLevel];
  } else {
    const group = searchFiltered.filter((t) => (t.level ?? 'Umum') === activeLevel);
    if (group.length > 0) grouped[activeLevel] = group;
  }

  const totalFiltered = searchFiltered.length;

  const TeacherCard = ({ teacher }: { teacher: Teacher }) => {
    const lvl = teacher.level ?? 'Umum';
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className={`bg-gradient-to-br ${levelHeaderColors[lvl]} p-6 text-center`}>
          <img
            src={teacher.photo}
            alt={teacher.name}
            className="w-36 h-36 rounded-full mx-auto object-cover object-top border-4 border-white shadow-lg"
          />
        </div>
        <div className="p-5 text-center">
          <h3 className="font-bold text-gray-800 text-lg mb-1">{teacher.name}</h3>
          <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
            <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
              {teacher.subject}
            </span>
            {teacher.level && (
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[teacher.level]}`}>
                {teacher.level}
              </span>
            )}
          </div>
          <div className="space-y-2 text-sm text-gray-500 text-left border-t pt-3">
            <div className="flex items-start space-x-2">
              <Award className="h-4 w-4 text-primary-500 mt-0.5 flex-shrink-0" />
              <span>{teacher.position}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

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

        {/* Search + Tab Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama atau mata pelajaran..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>

          {/* Tab Jenjang */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveLevel('Semua')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border-2 transition-colors ${
                activeLevel === 'Semua'
                  ? 'bg-primary-700 text-white border-primary-700'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              Semua ({teachers.length})
            </button>
            {sortedLevels.map((lvl) => {
              const count = teachers.filter((t) => (t.level ?? 'Umum') === lvl).length;
              return (
                <button
                  key={lvl}
                  onClick={() => setActiveLevel(lvl)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border-2 transition-colors ${
                    activeLevel === lvl
                      ? levelTabColors[lvl]
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {lvl === 'Staff' ? `Staff Sekolah (${count})` : `Guru ${lvl} (${count})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Konten */}
        {totalFiltered === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Tidak ada guru ditemukan</p>
          </div>
        ) : Object.keys(grouped).length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Tidak ada guru di kategori ini</p>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([lvl, group]) => (
              <div key={lvl}>
                {/* Section Header */}
                {activeLevel === 'Semua' && (
                  <div className="flex items-center space-x-3 mb-5">
                    <div className={`h-1 w-8 rounded-full ${
                      lvl === 'SD' ? 'bg-pink-500' :
                      lvl === 'SMP' ? 'bg-yellow-500' : 'bg-teal-500'
                    }`} />
                    <h2 className="text-lg font-bold text-gray-800">
                      {lvl === 'Staff' ? 'Staff Sekolah' : `Guru ${lvl}`}
                    </h2>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[lvl as Teacher['level']]}`}>
                      {group.length} guru
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )}

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.map((teacher) => (
                    <TeacherCard key={teacher.id} teacher={teacher} />
                  ))}
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
