import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  Building2,
  Trophy,
  ArrowRight,
  Star,
  BookOpen,
  Award,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import panoramaSekolah from '../../assets/panoramaSekolah.jpg';

const HomePage: React.FC = () => {
  const { news, profile, teachers, facilities } = useData();
  const latestNews = news.slice(0, 3);

  const stats = [
    { label: 'Tahun Berdiri', value: profile.founded, icon: Star },
    { label: 'Tenaga Pengajar', value: `${teachers.length}+`, icon: Users },
    { label: 'Fasilitas', value: `${facilities.length}+`, icon: Building2 },
    { label: 'Akreditasi', value: profile.accreditation, icon: Award },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          backgroundImage: `url(${panoramaSekolah})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay gelap agar teks tetap terbaca */}
        <div className="absolute inset-0 bg-primary-900/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-primary-600 text-primary-100 text-xs font-medium px-3 py-1 rounded-full">
                Akreditasi {profile.accreditation}
              </span>
              <span className="bg-primary-600 text-primary-100 text-xs font-medium px-3 py-1 rounded-full">
                Sejak {profile.founded}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Selamat Datang di{' '}
              <span className="text-primary-300">{profile.name}</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-200 mb-8 leading-relaxed">
              {profile.description.substring(0, 200)}...
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/profil"
                className="bg-white text-primary-800 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center space-x-2"
              >
                <span>Profil Sekolah</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/ppdb"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-800 transition-colors"
              >
                Daftar PPDB
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="bg-primary-100 p-3 rounded-full">
                      <Icon className="h-6 w-6 text-primary-700" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-primary-800">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visi Misi Preview */}
      <section className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="h-5 w-5 text-primary-600" />
                <span className="text-primary-600 font-medium text-sm uppercase tracking-wider">Visi Sekolah</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Visi & Misi Kami
              </h2>
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-primary-600 mb-4">
                <p className="text-gray-700 italic leading-relaxed">"{profile.vision}"</p>
              </div>
              <Link
                to="/visi-misi"
                className="inline-flex items-center space-x-2 text-primary-600 font-medium hover:text-primary-800"
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {profile.mission.slice(0, 4).map((m, i) => (
                <div key={i} className="flex items-start space-x-3 bg-white rounded-lg p-4 shadow-sm">
                  <span className="bg-primary-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 text-sm">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Berita Terkini</h2>
              <p className="text-gray-500 mt-1">Informasi dan kegiatan terbaru sekolah</p>
            </div>
            <Link
              to="/berita"
              className="hidden md:flex items-center space-x-2 text-primary-600 font-medium hover:text-primary-800"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {latestNews.map((item) => (
              <Link key={item.id} to={`/berita/${item.id}`} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="overflow-hidden h-48">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {new Date(item.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">{item.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link
              to="/berita"
              className="inline-flex items-center space-x-2 text-primary-600 font-medium"
            >
              <span>Lihat Semua Berita</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Jelajahi Sekolah Kami</h2>
            <p className="text-gray-500 mt-2">Temukan informasi lengkap tentang sekolah kami</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                path: '/fasilitas',
                title: 'Fasilitas',
                desc: 'Fasilitas modern dan lengkap untuk mendukung proses belajar mengajar.',
                icon: Building2,
                color: 'bg-blue-500',
              },
              {
                path: '/ekstrakulikuler',
                title: 'Ekstrakulikuler',
                desc: 'Berbagai kegiatan ekstrakurikuler untuk mengembangkan bakat dan minat siswa.',
                icon: Trophy,
                color: 'bg-green-500',
              },
              {
                path: '/ppdb',
                title: 'PPDB',
                desc: 'Informasi lengkap tentang Penerimaan Peserta Didik Baru tahun ajaran 2026/2027.',
                icon: GraduationCap,
                color: 'bg-purple-500',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.path} to={card.path} className="group">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                    <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-primary-700 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">{card.desc}</p>
                    <span className="text-primary-600 text-sm font-medium flex items-center space-x-1">
                      <span>Selengkapnya</span>
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Bergabunglah Bersama Kami
          </h2>
          <p className="text-primary-200 mb-8 max-w-2xl mx-auto">
            Daftarkan putra-putri Anda di {profile.name} dan wujudkan impian bersama kami.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/ppdb"
              className="bg-white text-primary-800 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Daftar Sekarang
            </Link>
            <Link
              to="/kontak"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-800 transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
