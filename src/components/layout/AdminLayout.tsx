import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Building2,
  Trophy,
  GraduationCap,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useData();

  // Deteksi ukuran layar
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setSidebarOpen(false); // reset drawer saat kembali ke desktop
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Tutup sidebar saat navigasi di mobile
  useEffect(() => {
    if (!isDesktop) setSidebarOpen(false);
  }, [location.pathname, isDesktop]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/admin/berita', label: 'Berita', icon: Newspaper },
    { path: '/admin/guru', label: 'Data Guru', icon: Users },
    { path: '/admin/fasilitas', label: 'Fasilitas', icon: Building2 },
    { path: '/admin/ekstrakulikuler', label: 'Ekstrakulikuler', icon: Trophy },
    { path: '/admin/ppdb', label: 'Pendaftar PPDB', icon: GraduationCap },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-primary-700">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-7 w-7 text-primary-300" />
          <span className="font-bold text-sm">Admin Panel</span>
        </div>
        {!isDesktop && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded hover:bg-primary-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path, item.exact);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                active
                  ? 'bg-primary-600 text-white'
                  : 'text-primary-300 hover:bg-primary-700 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
              {active && <ChevronRight className="h-4 w-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-primary-700 p-4">
        <div className="mb-3">
          <p className="text-xs text-primary-400">Masuk sebagai</p>
          <p className="text-sm font-medium text-white truncate">{currentUser?.name}</p>
          <p className="text-xs text-primary-400 capitalize">{currentUser?.role}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-primary-300 hover:bg-red-700 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm">Keluar</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ── DESKTOP: Sidebar tetap di kiri ── */}
      <aside className="hidden lg:flex w-64 bg-primary-900 text-white flex-col fixed h-full z-40">
        <SidebarContent />
      </aside>

      {/* ── MOBILE: Overlay + Drawer ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <aside className="relative w-72 max-w-[85vw] bg-primary-900 text-white flex flex-col h-full shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 lg:ml-64 min-w-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Hamburger — hanya di mobile */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                  {navItems.find((n) => isActive(n.path, n.exact))?.label || 'Admin Panel'}
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Kelola konten website sekolah</p>
              </div>
            </div>
            <Link
              to="/"
              className="text-xs sm:text-sm text-primary-600 hover:text-primary-800 font-medium flex-shrink-0"
            >
              Lihat Website →
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
