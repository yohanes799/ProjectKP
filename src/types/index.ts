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
  level: 'SD' | 'SMP' | 'Staff';
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
  id?: string;
  nama_lengkap: string;
  nisn: string;
  nik: string;
  agama: string;
  jenis_kelamin: 'Laki-laki' | 'Perempuan';
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat_lengkap: string;
  telepon_siswa: string;
  nama_wali: string;
  pekerjaan_wali: string;
  telepon_wali: string;
  sekolah_asal: string;
  alamat_sekolah: string;
  status: 'Menunggu' | 'Diterima' | 'Ditolak';
  registeredAt: string;
  created_at?: string;
}

export interface SchoolProfile {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  accreditation: string;
  principalName: string;
  principalName2?: string;
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
  phone2?: string;
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
