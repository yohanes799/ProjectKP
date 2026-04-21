import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { useData } from './context/DataContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import ProfilePage from './pages/public/ProfilePage';
import VisiMisiPage from './pages/public/VisiMisiPage';
import NewsPage from './pages/public/NewsPage';
import NewsDetailPage from './pages/public/NewsDetailPage';
import FacilityPage from './pages/public/FacilityPage';
import ExtracurricularPage from './pages/public/ExtracurricularPage';
import PPDBPage from './pages/public/PPDBPage';
import TeacherPage from './pages/public/TeacherPage';
import ContactPage from './pages/public/ContactPage';

// Auth
import LoginPage from './pages/LoginPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNewsPage from './pages/admin/AdminNewsPage';
import AdminTeacherPage from './pages/admin/AdminTeacherPage';
import AdminFacilityPage from './pages/admin/AdminFacilityPage';
import AdminExtracurricularPage from './pages/admin/AdminExtracurricularPage';

// Protected Route
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useData();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/visi-misi" element={<VisiMisiPage />} />
        <Route path="/berita" element={<NewsPage />} />
        <Route path="/berita/:id" element={<NewsDetailPage />} />
        <Route path="/fasilitas" element={<FacilityPage />} />
        <Route path="/ekstrakulikuler" element={<ExtracurricularPage />} />
        <Route path="/ppdb" element={<PPDBPage />} />
        <Route path="/guru" element={<TeacherPage />} />
        <Route path="/kontak" element={<ContactPage />} />
      </Route>

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="berita" element={<AdminNewsPage />} />
        <Route path="guru" element={<AdminTeacherPage />} />
        <Route path="fasilitas" element={<AdminFacilityPage />} />
        <Route path="ekstrakulikuler" element={<AdminExtracurricularPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
