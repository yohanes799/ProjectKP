import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type {
  NewsItem,
  Teacher,
  Facility,
  Extracurricular,
  PPDBInfo,
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
  profile: SchoolProfile;
  contact: ContactInfo;
  currentUser: User | null;
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
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = 'school_data';
const USER_KEY = 'current_user';

// Default admin user
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
  const [ppdb] = useState<PPDBInfo>(ppdbInfo);
  const [profile] = useState<SchoolProfile>(schoolProfile);
  const [contact] = useState<ContactInfo>(contactInfo);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setNews(parsed.news || initialNews);
      setTeachers(parsed.teachers || initialTeachers);
      setFacilities(parsed.facilities || initialFacilities);
      setExtracurriculars(parsed.extracurriculars || initialExtracurriculars);
    } else {
      setNews(initialNews);
      setTeachers(initialTeachers);
      setFacilities(initialFacilities);
      setExtracurriculars(initialExtracurriculars);
    }

    const savedUser = localStorage.getItem(USER_KEY);
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    setInitialized(true);
  }, []);

  // Save data to localStorage only after initial load is complete
  useEffect(() => {
    if (!initialized) return;
    const dataToSave = {
      news,
      teachers,
      facilities,
      extracurriculars,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [initialized, news, teachers, facilities, extracurriculars]);

  // News operations
  const addNews = (item: NewsItem) => {
    setNews((prev) => [item, ...prev]);
  };

  const updateNews = (id: string, item: NewsItem) => {
    setNews((prev) => prev.map((n) => (n.id === id ? item : n)));
  };

  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  // Teacher operations
  const addTeacher = (teacher: Teacher) => {
    setTeachers((prev) => [...prev, teacher]);
  };

  const updateTeacher = (id: string, teacher: Teacher) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? teacher : t)));
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  // Facility operations
  const addFacility = (facility: Facility) => {
    setFacilities((prev) => [...prev, facility]);
  };

  const updateFacility = (id: string, facility: Facility) => {
    setFacilities((prev) => prev.map((f) => (f.id === id ? facility : f)));
  };

  const deleteFacility = (id: string) => {
    setFacilities((prev) => prev.filter((f) => f.id !== id));
  };

  // Extracurricular operations
  const addExtracurricular = (extra: Extracurricular) => {
    setExtracurriculars((prev) => [...prev, extra]);
  };

  const updateExtracurricular = (id: string, extra: Extracurricular) => {
    setExtracurriculars((prev) => prev.map((e) => (e.id === id ? extra : e)));
  };

  const deleteExtracurricular = (id: string) => {
    setExtracurriculars((prev) => prev.filter((e) => e.id !== id));
  };

  // Auth operations
  const login = (username: string, password: string): boolean => {
    const user = defaultUsers.find((u) => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <DataContext.Provider
      value={{
        news,
        teachers,
        facilities,
        extracurriculars,
        ppdb,
        profile,
        contact,
        currentUser,
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
