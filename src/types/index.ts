export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  author: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  education: string;
  photo: string;
  nip: string;
  position: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
  capacity?: string;
}

export interface Extracurricular {
  id: string;
  name: string;
  description: string;
  schedule: string;
  coach: string;
  image: string;
}

export interface PPDBInfo {
  id: string;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  requirements: string[];
  quota: number;
}

export interface PPDBRegistration {
  id: string;
  fullName: string;
  gender: 'Laki-laki' | 'Perempuan';
  birthPlace: string;
  birthDate: string;
  address: string;
  guardianName: string;
  studentPhone: string;
  guardianPhone: string;
  originSchool: string;
  originSchoolAddress: string;
  registeredAt: string;
  status: 'Menunggu' | 'Diterima' | 'Ditolak';
}

export interface SchoolProfile {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  accreditation: string;
  principalName: string;
  foundationChairName: string;
  founded: string;
  description: string;
  vision: string;
  mission: string[];
  logo: string;
  principalGreeting: string;
  foundationGreeting: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  mapEmbed: string;
  socialMedia: {
    facebook?: string;
    whatsapp?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
  name: string;
}
