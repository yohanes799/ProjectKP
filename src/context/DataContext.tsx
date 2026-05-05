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
const DATA_VERSION = 'v2'; // Naikkan versi ini untuk reset data lama
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
    localStorage.removeItem('current_user');

    // Cek versi data — jika versi lama, reset ke initial data
    const savedVersion = localStorage.getItem('school_data_version');
    if (savedVersion !== DATA_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem('school_data_version', DATA_VERSION);
    }

    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setNews(parsed.news || initialNews);
      setTeachers(parsed.teachers || initialTeachers);
      setFacilities(parsed.facilities || initialFacilities);
      setExtracurriculars(parsed.extracurriculars || initialExtracurriculars);
      setPpdbRegistrations(parsed.ppdbRegistrations || []);
    } else {
      setNews(initialNews);
      setTeachers(initialTeachers);
      setFacilities(initialFacilities);
      setExtracurriculars(initialExtracurriculars);
    }

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

  useEffect(() => {
    if (!initialized) return;
    const dataToSave = {
      news,
      teachers,
      facilities,
      extracurriculars,
      ppdbRegistrations,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [initialized, news, teachers, facilities, extracurriculars, ppdbRegistrations]);

  // News
  const addNews = (item: NewsItem) => setNews((prev) => [item, ...prev]);
  const updateNews = (id: string, item: NewsItem) =>
    setNews((prev) => prev.map((n) => (n.id === id ? item : n)));
  const deleteNews = (id: string) => setNews((prev) => prev.filter((n) => n.id !== id));

  // Teachers
  const addTeacher = (teacher: Teacher) => setTeachers((prev) => [...prev, teacher]);
  const updateTeacher = (id: string, teacher: Teacher) =>
    setTeachers((prev) => prev.map((t) => (t.id === id ? teacher : t)));
  const deleteTeacher = (id: string) => setTeachers((prev) => prev.filter((t) => t.id !== id));

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
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const user = defaultUsers.find(
      (u) => u.username === trimmedUsername && u.password === trimmedPassword
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
