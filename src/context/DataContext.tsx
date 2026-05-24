import { supabase } from '../utils/supabase';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type {
  NewsItem,
  Teacher,
  Facility,
  Extracurricular,
  PPDBInfo,
  PPDBRegistration,
  SchoolProfile,
  ContactInfo,
  User,
} from '../types';
import {
  initialNews,
  initialTeachers,
  initialFacilities,
  initialExtracurriculars,
  ppdbInfo,
  schoolProfile,
  contactInfo,
} from '../data/initialData';

interface DataContextType {
  news: NewsItem[];
  teachers: Teacher[];
  facilities: Facility[];
  extracurriculars: Extracurricular[];
  ppdb: PPDBInfo;
  ppdbRegistrations: PPDBRegistration[];
  profile: SchoolProfile;
  contact: ContactInfo;
  currentUser: User | null;
  initialized: boolean;
  addNews: (item: NewsItem) => void;
  updateNews: (id: string, item: NewsItem) => void;
  deleteNews: (id: string) => void;
  addTeacher: (teacher: Teacher) => void;
  updateTeacher: (id: string, teacher: Teacher) => void;
  deleteTeacher: (id: string) => void;
  addFacility: (facility: Facility) => void;
  updateFacility: (id: string, facility: Facility) => void;
  deleteFacility: (id: string) => void;
  addExtracurricular: (extra: Extracurricular) => void;
  updateExtracurricular: (id: string, extra: Extracurricular) => void;
  deleteExtracurricular: (id: string) => void;
  addPPDBRegistration: (reg: PPDBRegistration) => void;
  updatePPDBRegistrationStatus: (id: string, status: PPDBRegistration['status']) => void;
  deletePPDBRegistration: (id: string) => void;
  resetNewsToInitial: () => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = 'school_data';
const DATA_VERSION = 'v3';
const SESSION_KEY = 'admin_session';

const KEYS = {
  news: 'school_news',
  teachers: 'school_teachers',
  facilities: 'school_facilities',
  extracurriculars: 'school_extracurriculars',
  ppdbRegistrations: 'school_ppdb_registrations',
  version: 'school_data_version',
};

function saveItem(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    console.warn(`localStorage penuh, gagal menyimpan "${key}"`);
  }
}

function loadItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

const defaultUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Administrator',
  },
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>([]);
  const [ppdbRegistrations, setPpdbRegistrations] = useState<PPDBRegistration[]>([]);
  const [ppdb] = useState<PPDBInfo>(ppdbInfo);
  const [profile] = useState<SchoolProfile>(schoolProfile);
  const [contact] = useState<ContactInfo>(contactInfo);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Migrasi dari format lama (satu key) ke format baru (key terpisah)
    const savedVersion = localStorage.getItem(KEYS.version);
    if (savedVersion !== DATA_VERSION) {
      const oldData = localStorage.getItem(STORAGE_KEY);
      if (oldData) {
        try {
          const parsed = JSON.parse(oldData);
          if (parsed.news) saveItem(KEYS.news, parsed.news);
          if (parsed.teachers) saveItem(KEYS.teachers, parsed.teachers);
          if (parsed.facilities) saveItem(KEYS.facilities, parsed.facilities);
          if (parsed.extracurriculars) saveItem(KEYS.extracurriculars, parsed.extracurriculars);
          if (parsed.ppdbRegistrations) saveItem(KEYS.ppdbRegistrations, parsed.ppdbRegistrations);
        } catch { /* data lama corrupt, abaikan */ }
        localStorage.removeItem(STORAGE_KEY);
      }
      saveItem(KEYS.version, DATA_VERSION);
    }

    setNews(loadItem(KEYS.news, initialNews));
    setTeachers(loadItem(KEYS.teachers, initialTeachers));
    setFacilities(loadItem(KEYS.facilities, initialFacilities));
    setExtracurriculars(loadItem(KEYS.extracurriculars, initialExtracurriculars));
    setPpdbRegistrations(loadItem(KEYS.ppdbRegistrations, []));

    const savedSession = sessionStorage.getItem(SESSION_KEY);
    if (savedSession) {
      try { setCurrentUser(JSON.parse(savedSession)); }
      catch { sessionStorage.removeItem(SESSION_KEY); }
    }

    setInitialized(true);
  }, []);

  // Simpan tiap koleksi di key terpisah
  useEffect(() => { if (initialized) saveItem(KEYS.news, news); }, [initialized, news]);
  useEffect(() => { if (initialized) saveItem(KEYS.teachers, teachers); }, [initialized, teachers]);
  useEffect(() => { if (initialized) saveItem(KEYS.facilities, facilities); }, [initialized, facilities]);
  useEffect(() => { if (initialized) saveItem(KEYS.extracurriculars, extracurriculars); }, [initialized, extracurriculars]);
  useEffect(() => { if (initialized) saveItem(KEYS.ppdbRegistrations, ppdbRegistrations); }, [initialized, ppdbRegistrations]);

  // News
  const addNews = (item: NewsItem) => setNews((prev) => [item, ...prev]);
  const updateNews = (id: string, item: NewsItem) =>
    setNews((prev) => prev.map((n) => (n.id === id ? item : n)));
  const deleteNews = (id: string) => setNews((prev) => prev.filter((n) => n.id !== id));

  // Teachers
  const addTeacher = (teacher: Teacher) => setTeachers((prev) => [...prev, teacher]);
  const updateTeacher = async (id: string, teacher: Teacher) => {
  // 1. Mapping Skema: Menerjemahkan bahasa UI ke bahasa Database
  const payload = {
    nama_lengkap: teacher.name,
    mata_pelajaran: teacher.subject,
    jabatan: teacher.position,
    kategori_jenjang: teacher.level || 'SMP',
    foto_url: teacher.photo
  };

  // 2. Eksekusi Backend: Timpa data lama dengan payload baru berdasarkan ID
  const { error } = await supabase
    .from('guru')
    .update(payload)
    .eq('id', id);

  if (error) {
    console.error("Gagal memperbarui data di server:", error);
    alert("Gagal memperbarui data di database!");
    return; // Hentikan eksekusi, jangan ubah layar jika server menolak
  }

  // 3. Eksekusi Frontend: Perbarui UI lokal HANYA JIKA langkah 2 berhasil
  setTeachers((prev) => prev.map((t) => (t.id === id ? teacher : t)));
};
  const deleteTeacher = async (id: string) => {
  // 1. Eksekusi hapus di Backend (Database Supabase)
  const { error } = await supabase
    .from('guru')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Gagal menghapus data di server:", error);
    alert("Gagal menghapus data dari database!");
    return; // Hentikan proses jika backend menolak/gagal
  }

  // 2. Eksekusi hapus di Frontend (Local State) 
  // Ini dilakukan HANYA JIKA langkah 1 berhasil, agar layar ter-update tanpa perlu refresh
  setTeachers((prev) => prev.filter((t) => t.id !== id));
};
  const fetchTeachersData = async () => {
  const { data, error } = await supabase.from('guru').select('*');
  
  if (error) {
    console.error("Gagal menarik data:", error);
    return;
  }

  if (data) {
    // Mapping dari skema Database (Indonesia) ke skema Frontend (Inggris)
    const formattedData = data.map((item: any) => ({
      id: item.id,
      name: item.nama_lengkap,
      subject: item.mata_pelajaran,
      position: item.jabatan,
      level: item.kategori_jenjang,
      photo: item.foto_url,
      education: '', // Tambahkan ini sebagai fallback
      nip: ''        // Tambahkan ini sebagai fallback
    }));

    // Timpa dummy data lama dengan data asli dari database
    setTeachers(formattedData); 
  }
};

// Jalankan fungsi fetch sekali saat aplikasi pertama kali dimuat
useEffect(() => {
  fetchTeachersData();
}, []);


  // Facilities
  const addFacility = (facility: Facility) => setFacilities((prev) => [...prev, facility]);
  const updateFacility = (id: string, facility: Facility) =>
    setFacilities((prev) => prev.map((f) => (f.id === id ? facility : f)));
  const deleteFacility = (id: string) => setFacilities((prev) => prev.filter((f) => f.id !== id));

  // Extracurriculars
  const addExtracurricular = (extra: Extracurricular) =>
    setExtracurriculars((prev) => [...prev, extra]);
  const updateExtracurricular = (id: string, extra: Extracurricular) =>
    setExtracurriculars((prev) => prev.map((e) => (e.id === id ? extra : e)));
  const deleteExtracurricular = (id: string) =>
    setExtracurriculars((prev) => prev.filter((e) => e.id !== id));

  // PPDB Registrations
  const addPPDBRegistration = (reg: PPDBRegistration) =>
    setPpdbRegistrations((prev) => [reg, ...prev]);
  const updatePPDBRegistrationStatus = (id: string, status: PPDBRegistration['status']) =>
    setPpdbRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  const deletePPDBRegistration = (id: string) =>
    setPpdbRegistrations((prev) => prev.filter((r) => r.id !== id));

  const resetNewsToInitial = () => setNews(initialNews);

  // Auth
  const login = (username: string, password: string): boolean => {
    const user = defaultUsers.find(
      (u) => u.username === username.trim() && u.password === password.trim()
    );
    if (user) {
      setCurrentUser(user);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <DataContext.Provider
      value={{
        news,
        teachers,
        facilities,
        extracurriculars,
        ppdb,
        ppdbRegistrations,
        profile,
        contact,
        currentUser,
        initialized,
        addNews,
        updateNews,
        deleteNews,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addFacility,
        updateFacility,
        deleteFacility,
        addExtracurricular,
        updateExtracurricular,
        deleteExtracurricular,
        addPPDBRegistration,
        updatePPDBRegistrationStatus,
        deletePPDBRegistration,
        resetNewsToInitial,
        login,
        logout,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
