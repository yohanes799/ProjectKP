import React from 'react';
import { Link } from 'react-router-dom';
import {
  Newspaper, Users, Building2, Trophy, TrendingUp, ArrowRight,
  GraduationCap, Bell,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminDashboard: React.FC = () => {
  const { news, teachers, facilities, extracurriculars, ppdbRegistrations, currentUser } = useData();

  const newRegistrations = ppdbRegistrations.length;

  const stats = [
    { label: 'Total Berita', value: news.length, icon: Newspaper, color: 'bg-blue-500', path: '/admin/berita' },
    { label: 'Data Guru', value: teachers.length, icon: Users, color: 'bg-green-500', path: '/admin/guru' },
    { label: 'Fasilitas', value: facilities.length, icon: Building2, color: 'bg-purple-500', path: '/admin/fasilitas' },
    { label: 'Ekstrakulikuler', value: extracurriculars.length, icon: Trophy, color: 'bg-orange-500', path: '/admin/ekstrakulikuler' },
    { label: 'Pendaftar PPDB', value: ppdbRegistrations.length, icon: GraduationCap, color: 'bg-teal-500', path: '/admin/ppdb' },
  ];

  const recentNews = news.slice(0, 4);
  const recentRegistrations = ppdbRegistrations.slice(0, 5);

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-1">
          Selamat Datang, {currentUser?.name}! 👋
        </h2>
        <p className="text-primary-200 text-sm">Kelola konten website sekolah dari panel admin ini.</p>
        {newRegistrations > 0 && (
          <div className="mt-3 inline-flex flex-wrap items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 text-yellow-200 px-3 py-1.5 rounded-lg text-xs sm:text-sm">
            <Bell className="h-4 w-4 flex-shrink-0" />
            <span>{newRegistrations} pendaftar PPDB baru</span>
            <Link to="/admin/ppdb" className="underline font-medium">Lihat →</Link>
          </div>
        )}
      </div>

      {/* Stats Grid — 2 kolom di mobile, 3 di tablet, 5 di desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.path} to={stat.path} className="block">
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow h-full">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className={`${stat.color} p-2 rounded-lg`}>
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-gray-300" />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-500 leading-tight">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Content Grid — 1 kolom di mobile, 2 di tablet ke atas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

        {/* Berita Terbaru */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">Berita Terbaru</h3>
            <Link
              to="/admin/berita"
              className="text-xs sm:text-sm text-primary-600 hover:text-primary-800 flex items-center space-x-1"
            >
              <span>Kelola</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {recentNews.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">Belum ada berita</p>
            ) : (
              recentNews.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 py-2 border-b last:border-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(item.date).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className="text-xs bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded flex-shrink-0 hidden sm:inline">
                    {item.category}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pendaftar PPDB Terbaru */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">Pendaftar PPDB Terbaru</h3>
            <Link
              to="/admin/ppdb"
              className="text-xs sm:text-sm text-primary-600 hover:text-primary-800 flex items-center space-x-1"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {recentRegistrations.length === 0 ? (
              <div className="text-center py-6 text-gray-400">
                <GraduationCap className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Belum ada pendaftar</p>
              </div>
            ) : (
              recentRegistrations.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 py-2 border-b last:border-0">
                  <div className="bg-teal-100 p-2 rounded-full flex-shrink-0">
                    <GraduationCap className="h-4 w-4 text-teal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-1">{item.fullName}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">{item.originSchool}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Aksi Cepat — 2 kolom di mobile, 3 di tablet, 5 di desktop */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
        <h3 className="font-bold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Aksi Cepat</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          {[
            { path: '/admin/berita', label: 'Tambah Berita', icon: Newspaper, color: 'text-blue-600 bg-blue-50' },
            { path: '/admin/guru', label: 'Tambah Guru', icon: Users, color: 'text-green-600 bg-green-50' },
            { path: '/admin/fasilitas', label: 'Tambah Fasilitas', icon: Building2, color: 'text-purple-600 bg-purple-50' },
            { path: '/admin/ekstrakulikuler', label: 'Tambah Ekskul', icon: Trophy, color: 'text-orange-600 bg-orange-50' },
            { path: '/admin/ppdb', label: 'Data Pendaftar', icon: GraduationCap, color: 'text-teal-600 bg-teal-50' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors group border border-gray-100"
              >
                <div className={`p-2 sm:p-3 rounded-xl mb-1.5 sm:mb-2 ${item.color}`}>
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <span className="text-xs font-medium text-gray-600 group-hover:text-primary-700 text-center leading-tight">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
