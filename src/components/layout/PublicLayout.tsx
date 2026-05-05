import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../../context/DataContext';

const PublicLayout: React.FC = () => {
  const { logout } = useData();

  // Setiap kali user masuk ke halaman publik, hapus sesi admin
  // Ini memastikan kembali ke /admin setelah browsing publik wajib login ulang
  useEffect(() => {
    logout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
