import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Building2,
  Trophy,
  LogOut,
  Menu,
  X,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useData();

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
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-primary-900 text-white transition-all duration-300 flex flex-col fixed h-full z-40`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-primary-700">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-7 w-7 text-primary-300" />
              <span className="font-bold text-sm">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded hover:bg-primary-700 transition-colors ml-auto"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 space-y-1 px-2">
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
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                {sidebarOpen && active && <ChevronRight className="h-4 w-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="border-t border-primary-700 p-4">
          {sidebarOpen && (
            <div className="mb-3">
              <p className="text-xs text-primary-400">Masuk sebagai</p>
              <p className="text-sm font-medium text-white">{currentUser?.name}</p>
              <p className="text-xs text-primary-400 capitalize">{currentUser?.role}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg text-primary-300 hover:bg-red-700 hover:text-white transition-colors"
            title={!sidebarOpen ? 'Keluar' : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-16'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                {navItems.find((n) => isActive(n.path, n.exact))?.label || 'Admin Panel'}
              </h1>
              <p className="text-xs text-gray-500">Kelola konten website sekolah</p>
            </div>
            <Link
              to="/"
              target="_blank"
              className="text-sm text-primary-600 hover:text-primary-800 font-medium"
            >
              Lihat Website →
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
