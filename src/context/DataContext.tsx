import { supabase } from '../utils/supabase';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
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
  addFacility: (facility: Omit<Facility, 'id'>) => Promise<void>;
  updateFacility: (id: string, facility: Facility) => void;
  deleteFacility: (id: string) => void;
  addExtracurricular: (extra: Extracurricular) => void;
  updateExtracurricular: (id: string, extra: Extracurricular) => void;
  deleteExtracurricular: (id: string) => void;
  addPPDBRegistration: (reg: PPDBRegistration) => Promise<boolean>;
  updatePPDBRegistration: (
    id: string,
    updatedData: Partial<PPDBRegistration>
  ) => Promise<void>;
  updatePPDBRegistrationStatus: (
    id: string,
    status: PPDBRegistration['status']
  ) => void;
  deletePPDBRegistration: (id: string) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  fetchFacilities: () => Promise<void>;
  fetchNews: () => Promise<void>;
  fetchExtracurriculars: () => Promise<void>;
  fetchRegistrations: () => Promise<void>;
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
    username: 'smpseruniputih',
    password: 'admin1998',
    role: 'admin',
    name: 'Administrator',
  },
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>(
    []
  );
  const [ppdbRegistrations, setPpdbRegistrations] = useState<
    PPDBRegistration[]
  >([]);
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
          if (parsed.extracurriculars)
            saveItem(KEYS.extracurriculars, parsed.extracurriculars);
          if (parsed.ppdbRegistrations)
            saveItem(KEYS.ppdbRegistrations, parsed.ppdbRegistrations);
        } catch {
          /* data lama corrupt, abaikan */
        }
        localStorage.removeItem(STORAGE_KEY);
      }
      saveItem(KEYS.version, DATA_VERSION);
    }

    setNews(loadItem(KEYS.news, initialNews));
    setTeachers(loadItem(KEYS.teachers, initialTeachers));
    setFacilities(loadItem(KEYS.facilities, initialFacilities));
    setExtracurriculars(
      loadItem(KEYS.extracurriculars, initialExtracurriculars)
    );
    setPpdbRegistrations(loadItem(KEYS.ppdbRegistrations, []));

    const savedSession = sessionStorage.getItem(SESSION_KEY);
    if (savedSession) {
      try {
        setCurrentUser(JSON.parse(savedSession));
      } catch {
        sessionStorage.removeItem(SESSION_KEY);
      }
    }

    setInitialized(true);
  }, []);

  // Simpan tiap koleksi di key terpisah
  useEffect(() => {
    if (initialized) saveItem(KEYS.news, news);
  }, [initialized, news]);
  useEffect(() => {
    if (initialized) saveItem(KEYS.teachers, teachers);
  }, [initialized, teachers]);
  useEffect(() => {
    if (initialized) saveItem(KEYS.facilities, facilities);
  }, [initialized, facilities]);
  useEffect(() => {
    if (initialized) saveItem(KEYS.extracurriculars, extracurriculars);
  }, [initialized, extracurriculars]);
  useEffect(() => {
    if (initialized) saveItem(KEYS.ppdbRegistrations, ppdbRegistrations);
  }, [initialized, ppdbRegistrations]);

  // News
  // 1. FUNGSI FETCH (Membaca data)
  const fetchNews = async () => {
    const { data, error } = await supabase.from('berita').select('*');

    if (error) {
      console.error('Gagal fetch berita:', error);
      return;
    }

    if (data) {
      const formattedData = data.map((item: any) => ({
        id: item.id,
        title: item.judul_berita, // SESUAI DATABASE: judul_berita
        category: item.kategori, // SESUAI DATABASE: kategori
        date: item.tanggal,
        excerpt: item.ringkasan,
        content: item.isi,
        author: item.penulis,
        image: item.foto_url,
      }));
      setNews(formattedData);
    }
  };

  // 2. FUNGSI TAMBAH (Create) - JARING PENGAMAN DICABUT
  const addNews = async (item: Omit<NewsItem, 'id'>) => {
    const payload = {
      judul_berita: item.title,
      kategori: item.category || 'Pengumuman',
      tanggal: item.date,
      ringkasan: item.excerpt,
      isi: item.content,
      penulis: item.author || 'Admin Sekolah',
      // JARING PENGAMAN DICABUT: Kirim apa adanya (Base64 atau URL)
      // Risiko: Error 'Payload Too Large' jika gambar terlalu besar
      foto_url: item.image,
    };

    const { error } = await supabase.from('berita').insert([payload]).select();

    if (error) {
      console.error('Gagal tambah berita:', error.message);
      alert(
        `Gagal simpan berita! Alasan: ${error.message}. (Mungkin gambar terlalu besar)`
      );
      return;
    }

    alert('Berita berhasil ditambahkan!');
    await fetchNews();
  };

  // 3. FUNGSI UPDATE (Edit) - JARING PENGAMAN DICABUT
  const updateNews = async (id: string, item: NewsItem) => {
    const payload = {
      judul_berita: item.title,
      kategori: item.category,
      tanggal: item.date,
      ringkasan: item.excerpt,
      isi: item.content,
      penulis: item.author,
      // JARING PENGAMAN DICABUT: Kirim apa adanya
      foto_url: item.image,
    };

    const { error } = await supabase
      .from('berita')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Gagal update berita:', error.message);
      alert(
        `Gagal update berita! Alasan: ${error.message}. (Mungkin gambar terlalu besar)`
      );
      return;
    }

    alert('Berita berhasil diupdate!');
    await fetchNews();
  };

  // 4. FUNGSI HAPUS (Delete)
  const deleteNews = async (id: string) => {
    const { error } = await supabase.from('berita').delete().eq('id', id);

    if (error) {
      console.error('Gagal hapus berita:', error);
      alert('Gagal menghapus berita!');
      return;
    }

    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  // Teachers
  // JALANKAN ASYNC UNTUK INSERSi BACKEND
  const addTeacher = async (teacher: Omit<Teacher, 'id'>) => {
    // 1. Mapping Skema untuk Tambah Data
    const payload = {
      nama_lengkap: teacher.name,
      mata_pelajaran: teacher.subject,
      jabatan: teacher.position,
      kategori_jenjang: teacher.level || 'SMP', // DIPERBAIKI: Menggunakan 'kategori_jenjang' sesuai DB
      foto_url: teacher.photo,
    };

    // 2. Eksekusi ke Supabase
    const { data, error } = await supabase
      .from('guru')
      .insert([payload])
      .select();

    if (error) {
      console.error('Gagal menambah data di server:', error);
      alert('Gagal menambahkan data guru ke database!');
      return;
    }

    // 3. Update UI Lokal jika Backend Sukses
    if (data && data[0]) {
      const newTeacher: Teacher = {
        ...teacher,
        id: data[0].id,
      };
      setTeachers((prev) => [...prev, newTeacher]);
    }
  };

  const updateTeacher = async (id: string, teacher: Teacher) => {
    // 1. Mapping Skema: Menerjemahkan bahasa UI ke bahasa Database
    const payload = {
      nama_lengkap: teacher.name,
      mata_pelajaran: teacher.subject,
      jabatan: teacher.position,
      kategori_jenjang: teacher.level || 'SMP', // GANTI DI SINI: kategori_jenjang -> kategori
      foto_url: teacher.photo,
    };

    // 2. Eksekusi Backend
    const { error } = await supabase.from('guru').update(payload).eq('id', id);

    if (error) {
      console.error('Gagal memperbarui data di server:', error);
      alert('Gagal memperbarui data di database!');
      return;
    }

    // 3. Eksekusi Frontend
    setTeachers((prev) => prev.map((t) => (t.id === id ? teacher : t)));
  };

  const deleteTeacher = async (id: string) => {
    const { error } = await supabase.from('guru').delete().eq('id', id);

    if (error) {
      console.error('Gagal menghapus data di server:', error);
      alert('Gagal menghapus data dari database!');
      return;
    }

    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchTeachersData = async () => {
    const { data, error } = await supabase.from('guru').select('*');

    if (error) {
      console.error('Gagal menarik data:', error);
      return;
    }

    if (data) {
      // Mapping dari skema Database ke skema Frontend
      const formattedData = data.map((item: any) => ({
        id: item.id,
        name: item.nama_lengkap,
        subject: item.mata_pelajaran,
        position: item.jabatan,
        level: item.kategori_jenjang, // GANTI DI SINI: item.kategori_jenjang -> item.kategori
        photo: item.foto_url,
        education: '',
        nip: '',
      }));

      setTeachers(formattedData);
    }
  };

  // Jalankan fungsi fetch sekali saat aplikasi pertama kali dimuat
  useEffect(() => {
    fetchTeachersData();
  }, []);

  // Facilities
  // Contoh fungsi addFacility yang benar (terhubung ke Database)
  const addFacility = async (facility: Omit<Facility, 'id'>) => {
    const payload = {
      nama_fasilitas: facility.name,
      deskripsi: facility.description,
      kapasitas: facility.capacity,
      foto_url: facility.image,
    };

    const { data, error } = await supabase
      .from('fasilitas')
      .insert([payload])
      .select();

    if (error) {
      console.error('ERROR SUPABASE:', error);
      alert('Gagal simpan: ' + error.message);
      return;
    }

    // DATA (array dari Supabase) di-map, BUKAN 'facility' (objek input)
    if (data && Array.isArray(data)) {
      const newData = data.map((item) => ({
        id: item.id,
        name: item.nama_fasilitas,
        description: item.deskripsi,
        capacity: item.kapasitas,
        image: item.foto_url,
      }));

      // Update state dengan data baru
      setFacilities((prev) => [...prev, ...newData]);
    }
  };
  const updateFacility = async (id: string, facility: Facility) => {
    // 1. Update ke Supabase
    const { data, error } = await supabase
      .from('fasilitas')
      .update(facility)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Gagal memperbarui database:', error);
      return;
    }

    // 2. Update state setelah database berhasil
    if (data) {
      setFacilities((prev) => prev.map((f) => (f.id === id ? data : f)));
    }
  };
  const deleteFacility = async (id: string) => {
    // 1. Hapus dari Supabase
    const { error } = await supabase.from('fasilitas').delete().eq('id', id);

    if (error) {
      console.error('Gagal menghapus dari database:', error);
      return;
    }

    // 2. Jika database berhasil, baru hapus dari state
    setFacilities((prev) => prev.filter((f) => f.id !== id));
  };
  const fetchFacilities = async () => {
    const { data, error } = await supabase.from('fasilitas').select('*');

    if (error) {
      console.error('Gagal fetch:', error);
      return;
    }

    if (data) {
      // Mapping data DB ke format interface Facility
      const formattedData = data.map((item) => ({
        id: item.id,
        name: item.nama_fasilitas,
        description: item.deskripsi,
        capacity: item.kapasitas,
        image: item.foto_url,
      }));
      setFacilities(formattedData);
    }
  };

  // Extracurriculars
  const fetchExtracurriculars = async () => {
    const { data, error } = await supabase.from('ekstrakurikuler').select('*');
    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      const formatted = data.map((item) => ({
        id: item.id,
        name: item.nama_ekstrakurikuler,
        description: item.deskripsi,
        schedule: item.jadwal,
        coach: item.pembina,
        image: item.foto_url,
      }));
      setExtracurriculars(formatted);
    }
  };

  // 3. FUNGSI TAMBAH (Add)
  const addExtracurricular = async (item: Extracurricular) => {
    const payload = {
      nama_ekstrakurikuler: item.name,
      deskripsi: item.description,
      jadwal: item.schedule,
      pembina: item.coach,
      foto_url: item.image,
    };
    const { error } = await supabase.from('ekstrakurikuler').insert([payload]);
    if (!error) await fetchExtracurriculars();
  };

  // 4. FUNGSI UPDATE (Edit)
  const updateExtracurricular = async (id: string, item: Extracurricular) => {
    const payload = {
      nama_ekstrakurikuler: item.name,
      deskripsi: item.description,
      jadwal: item.schedule,
      pembina: item.coach,
      foto_url: item.image,
    };
    const { error } = await supabase
      .from('ekstrakurikuler')
      .update(payload)
      .eq('id', id);
    if (!error) await fetchExtracurriculars();
  };

  // 5. FUNGSI HAPUS (Delete)
  const deleteExtracurricular = async (id: string) => {
    const { error } = await supabase
      .from('ekstrakurikuler')
      .delete()
      .eq('id', id);
    if (!error) await fetchExtracurriculars();
  };

  // PPDB Registrations
  // Pastikan fungsi ini async agar bisa menunggu respon dari Supabase
  // Tambahkan Promise<boolean> agar TypeScript tahu fungsi ini mengembalikan true/false
  const addPPDBRegistration = async (
    reg: PPDBRegistration
  ): Promise<boolean> => {
    try {
      const { registeredAt, ...dataToInsert } = reg;

      const { error } = await supabase // Hapus 'data' dari sini (fix error 1)
        .from('pendaftar_ppdb')
        .insert([dataToInsert]);

      if (error) {
        console.error('DEBUG ERROR SUPABASE:', error);
        return false; // Kembalikan false jika gagal
      }

      return true; // Kembalikan true jika sukses
    } catch (err) {
      console.error('Gagal total:', err);
      return false; // Kembalikan false jika error
    }
  };

  const updatePPDBRegistration = async (
    id: string,
    updatedData: Partial<PPDBRegistration>
  ) => {
    try {
      // Buang properti id dan waktu agar tidak menabrak aturan database saat di-update
      const {
        id: _id,
        registeredAt,
        created_at,
        ...payload
      } = updatedData as any;

      const { error } = await supabase
        .from('pendaftar_ppdb')
        .update(payload)
        .eq('id', id);

      if (error) {
        console.error('Gagal update data PPDB:', error);
        alert('Gagal memperbarui data: ' + error.message);
        return;
      }

      // Update UI langsung tanpa refresh
      setPpdbRegistrations((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        )
      );

      alert('Data pendaftar berhasil diperbarui!');
    } catch (err) {
      console.error('Error sistem update:', err);
    }
  };

  const updatePPDBRegistrationStatus = async (
    id: string,
    status: 'Menunggu' | 'Diterima' | 'Ditolak'
  ) => {
    try {
      // 1. Update status di database
      const { error } = await supabase
        .from('pendaftar_ppdb')
        .update({ status })
        .eq('id', id);
      if (error) throw error;

      // 2. Update status di tampilan
      setPpdbRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.error('Error update status:', err);
    }
  };

  const deletePPDBRegistration = async (id: string) => {
    try {
      const { error } = await supabase
        .from('pendaftar_ppdb')
        .delete()
        .eq('id', id);
      if (error) throw error;

      setPpdbRegistrations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Error menghapus data:', err);
    }
  };

  const fetchRegistrations = async () => {
    const { data } = await supabase.from('pendaftar_ppdb').select('*');
    if (data) setPpdbRegistrations(data);
  };

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
        fetchFacilities,
        addExtracurricular,
        updateExtracurricular,
        deleteExtracurricular,
        fetchExtracurriculars,
        addPPDBRegistration,
        updatePPDBRegistration,
        updatePPDBRegistrationStatus,
        deletePPDBRegistration,
        fetchNews,
        fetchRegistrations,
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
