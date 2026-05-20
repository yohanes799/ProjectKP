import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
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
  addNews: (item: NewsItem) => Promise<void>;
  updateNews: (id: string, item: NewsItem) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
  addTeacher: (teacher: Teacher) => Promise<void>;
  updateTeacher: (id: string, teacher: Teacher) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  addFacility: (facility: Facility) => Promise<void>;
  updateFacility: (id: string, facility: Facility) => Promise<void>;
  deleteFacility: (id: string) => Promise<void>;
  addExtracurricular: (extra: Extracurricular) => Promise<void>;
  updateExtracurricular: (id: string, extra: Extracurricular) => Promise<void>;
  deleteExtracurricular: (id: string) => Promise<void>;
  addPPDBRegistration: (reg: PPDBRegistration) => Promise<void>;
  updatePPDBRegistrationStatus: (id: string, status: PPDBRegistration['status']) => Promise<void>;
  deletePPDBRegistration: (id: string) => Promise<void>;
  resetNewsToInitial: () => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const SESSION_KEY = 'admin_session';

const defaultUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Administrator',
  },
];

// ── Firestore helpers ────────────────────────────────────────────────────────

// Seed koleksi dengan data awal jika kosong
async function seedIfEmpty<T extends { id: string }>(
  collectionName: string,
  initialData: T[]
) {
  const snap = await getDocs(collection(db, collectionName));
  if (snap.empty) {
    const batch = writeBatch(db);
    initialData.forEach((item) => {
      batch.set(doc(db, collectionName, item.id), item);
    });
    await batch.commit();
  }
}

// ── Provider ─────────────────────────────────────────────────────────────────

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
    // Restore session
    const savedSession = sessionStorage.getItem(SESSION_KEY);
    if (savedSession) {
      try { setCurrentUser(JSON.parse(savedSession)); } catch { /* ignore */ }
    }

    // Seed data awal ke Firestore jika koleksi masih kosong
    Promise.all([
      seedIfEmpty('news', initialNews),
      seedIfEmpty('teachers', initialTeachers),
      seedIfEmpty('facilities', initialFacilities),
      seedIfEmpty('extracurriculars', initialExtracurriculars),
    ]).catch(console.error);

    // Realtime listeners — data otomatis update di semua device
    const unsubNews = onSnapshot(
      query(collection(db, 'news'), orderBy('date', 'desc')),
      (snap) => {
        setNews(snap.docs.map((d) => d.data() as NewsItem));
        setInitialized(true);
      },
      () => {
        // Fallback ke initialData jika Firestore tidak bisa diakses
        setNews(initialNews);
        setInitialized(true);
      }
    );

    const unsubTeachers = onSnapshot(
      collection(db, 'teachers'),
      (snap) => setTeachers(snap.docs.map((d) => d.data() as Teacher)),
      () => setTeachers(initialTeachers)
    );

    const unsubFacilities = onSnapshot(
      collection(db, 'facilities'),
      (snap) => setFacilities(snap.docs.map((d) => d.data() as Facility)),
      () => setFacilities(initialFacilities)
    );

    const unsubExtracurriculars = onSnapshot(
      collection(db, 'extracurriculars'),
      (snap) => setExtracurriculars(snap.docs.map((d) => d.data() as Extracurricular)),
      () => setExtracurriculars(initialExtracurriculars)
    );

    const unsubPPDB = onSnapshot(
      query(collection(db, 'ppdbRegistrations'), orderBy('registeredAt', 'desc')),
      (snap) => setPpdbRegistrations(snap.docs.map((d) => d.data() as PPDBRegistration)),
      () => setPpdbRegistrations([])
    );

    return () => {
      unsubNews();
      unsubTeachers();
      unsubFacilities();
      unsubExtracurriculars();
      unsubPPDB();
    };
  }, []);

  // ── News ──────────────────────────────────────────────────────────────────
  const addNews = async (item: NewsItem) => {
    await setDoc(doc(db, 'news', item.id), item);
  };
  const updateNews = async (id: string, item: NewsItem) => {
    await setDoc(doc(db, 'news', id), item);
  };
  const deleteNews = async (id: string) => {
    await deleteDoc(doc(db, 'news', id));
  };

  // ── Teachers ──────────────────────────────────────────────────────────────
  const addTeacher = async (teacher: Teacher) => {
    await setDoc(doc(db, 'teachers', teacher.id), teacher);
  };
  const updateTeacher = async (id: string, teacher: Teacher) => {
    await setDoc(doc(db, 'teachers', id), teacher);
  };
  const deleteTeacher = async (id: string) => {
    await deleteDoc(doc(db, 'teachers', id));
  };

  // ── Facilities ────────────────────────────────────────────────────────────
  const addFacility = async (facility: Facility) => {
    await setDoc(doc(db, 'facilities', facility.id), facility);
  };
  const updateFacility = async (id: string, facility: Facility) => {
    await setDoc(doc(db, 'facilities', id), facility);
  };
  const deleteFacility = async (id: string) => {
    await deleteDoc(doc(db, 'facilities', id));
  };

  // ── Extracurriculars ──────────────────────────────────────────────────────
  const addExtracurricular = async (extra: Extracurricular) => {
    await setDoc(doc(db, 'extracurriculars', extra.id), extra);
  };
  const updateExtracurricular = async (id: string, extra: Extracurricular) => {
    await setDoc(doc(db, 'extracurriculars', id), extra);
  };
  const deleteExtracurricular = async (id: string) => {
    await deleteDoc(doc(db, 'extracurriculars', id));
  };

  // ── PPDB Registrations ────────────────────────────────────────────────────
  const addPPDBRegistration = async (reg: PPDBRegistration) => {
    await setDoc(doc(db, 'ppdbRegistrations', reg.id), reg);
  };
  const updatePPDBRegistrationStatus = async (
    id: string,
    status: PPDBRegistration['status']
  ) => {
    const existing = ppdbRegistrations.find((r) => r.id === id);
    if (existing) {
      await setDoc(doc(db, 'ppdbRegistrations', id), { ...existing, status });
    }
  };
  const deletePPDBRegistration = async (id: string) => {
    await deleteDoc(doc(db, 'ppdbRegistrations', id));
  };

  const resetNewsToInitial = () => {
    initialNews.forEach((item) => setDoc(doc(db, 'news', item.id), item));
  };

  // ── Auth ──────────────────────────────────────────────────────────────────
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
