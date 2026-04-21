import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Users, Building2, Trophy, TrendingUp, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminDashboard: React.FC = () => {
  const { news, teachers, facilities, extracurriculars, currentUser } = useData();

  const stats = [
    {
      label: 'Total Berita',
      value: news.length,
      icon: Newspaper,
      color: 'bg-blue-500',
      path: '/admin/berita',
    },
    {
      label: 'Data Guru',
      value: teachers.length,
      icon: Users,
      color: 'bg-green-500',
      path: '/admin/guru',
    },
    {
      label: 'Fasilitas',
      value: facilities.length,
      icon: Building2,
      color: 'bg-purple-500',
      path: '/admin/fasilitas',
    },
    {
      label: 'Ekstrakulikuler',
      value: extracurriculars.length,
      icon: Trophy,
      color: 'bg-orange-500',
      path: '/admin/ekstrakulikuler',
    },
  ];

  const recentNews = news.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white rounded-xl p-6">
        <h2 className="text-xl font-bold mb-1">Selamat Datang, {currentUser?.name}! 👋</h2>
        <p className="text-primary-200 text-sm">
          Kelola konten website sekolah dari panel admin ini.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.path} to={stat.path}>
              <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className={`${stat.color} p-2 rounded-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-gray-300" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent News */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Berita Terbaru</h3>
            <Link
              to="/admin/berita"
              className="text-sm text-primary-600 hover:text-primary-800 flex items-center space-x-1"
            >
              <span>Kelola</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentNews.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">Belum ada berita</p>
            ) : (
              recentNews.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 py-2 border-b last:border-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(item.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded flex-shrink-0">
                    {item.category}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-4">Aksi Cepat</h3>
          <div className="space-y-3">
            {[
              { path: '/admin/berita', label: 'Tambah Berita Baru', icon: Newspaper, color: 'text-blue-600 bg-blue-50' },
              { path: '/admin/guru', label: 'Tambah Data Guru', icon: Users, color: 'text-green-600 bg-green-50' },
              { path: '/admin/fasilitas', label: 'Tambah Fasilitas', icon: Building2, color: 'text-purple-600 bg-purple-50' },
              { path: '/admin/ekstrakulikuler', label: 'Tambah Ekstrakulikuler', icon: Trophy, color: 'text-orange-600 bg-orange-50' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">
                    {item.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-300 ml-auto group-hover:text-primary-600" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
