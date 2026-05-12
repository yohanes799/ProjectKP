import type { NewsItem, Teacher, Facility, Extracurricular, PPDBInfo, SchoolProfile, ContactInfo } from '../types';

export const schoolProfile: SchoolProfile = {
  name: 'SMP SERUNI PUTIH',
  address: 'Jl. Benda Barat 13 No. D.33, RW.10, Pd.Benda, Kecamatan Pamulang, Kota Tangerang Selatan, Banten 15416',
  phone: '(021) 1234-5678',
  email: 'smpseruniputih@gmail.com',
  website: 'www.smpseruniputih.sch.id',
  accreditation: 'A',
  principalName: 'Sarah Ginting S.Si',
  foundationChairName: 'Lindah Ganda Saputra, SH',
  founded: '1975',
  description:
    'SMP SERUNI PUTIH adalah sekolah menengah pertama unggulan yang telah berdiri sejak tahun 1975. Dengan pengalaman lebih dari 49 tahun, kami berkomitmen untuk mencetak generasi penerus bangsa yang cerdas, berkarakter, dan berdaya saing global.',
  vision:
    'Terlaksananya Proses Pendidikan Yang Memenuhi Standar Mutu, Berkarakter, Inovatif dan Berakar Pada Budaya Bangsa Sesusai Dengan Delapan Dimensi Profit Lulusan',
  mission: [
    'Meningkatkan Tata Kelola Managerial Satuan Pendidikan Yang Adaptif, Berkarakter dan Menjamin Mutu.',
    'Memvasilitasi Pemebelajaran Yang Menarik Menyenangkan dan Berkarakter Sesuai Bakat Dan Minat Murid.',
    'Menciptakan Profil Lulusan Yang Bernalar Kritis dan kreatif Sehingga mampu Mengkreasi Ide dan Keterampilan Yang Inovatif.',
    'Menciptakan Lingkungan Sekolah Sebagai Tempat Perkembangan Intelektual, Sosial, Emosional, Keterampilan dan Pengembangan Budaya Lokal Dalamm Kebhinnekaan Gombal.',
    'Menjalin kemitraaan Dengan Orang Tua Masyarakat dan Pemerintah Dalam Keberagaman Yang Mewadahi Kreatifitas Murid Yang Berjiwa kompetitif.',
    'Meningkatkan kompetensi GTK Melalui Pelatihan Mandiri Atau Yang diselenggarakan Oleh Pihak - Pihak Lain.',
  ],
  logo: 'https://placehold.co/120x120/1e40af/ffffff?text=SMAN1',
  principalGreeting:
    'Assalamu\'alaikum Warahmatullahi Wabarakatuh. Puji syukur kehadirat Allah SWT atas segala limpahan rahmat dan karunia-Nya sehingga SMA Negeri 1 Nusantara terus berkembang menjadi lembaga pendidikan yang unggul dan terpercaya. Atas nama seluruh keluarga besar SMA Negeri 1 Nusantara, saya menyambut dengan hangat kehadiran Anda di website resmi kami. Kami berkomitmen untuk terus meningkatkan kualitas pendidikan, membentuk karakter siswa yang berakhlak mulia, serta mempersiapkan generasi penerus bangsa yang siap menghadapi tantangan global. Bersama seluruh tenaga pendidik yang profesional dan berdedikasi, kami yakin dapat mewujudkan cita-cita mulia tersebut. Semoga Allah SWT senantiasa membimbing langkah kita semua. Wassalamu\'alaikum Warahmatullahi Wabarakatuh.',
  foundationGreeting:
    'Assalamu\'alaikum Warahmatullahi Wabarakatuh. Dengan penuh rasa syukur dan kebanggaan, saya menyampaikan sambutan hangat kepada seluruh civitas akademika SMA Negeri 1 Nusantara. Yayasan Pendidikan Nusantara Jaya senantiasa berkomitmen untuk mendukung penuh pengembangan sekolah ini agar menjadi institusi pendidikan yang tidak hanya unggul secara akademis, tetapi juga mampu mencetak generasi yang berkarakter, berintegritas, dan berdaya saing tinggi. Kami percaya bahwa investasi terbaik adalah investasi di bidang pendidikan. Oleh karena itu, kami terus berupaya menyediakan sarana dan prasarana terbaik, mendukung pengembangan kompetensi guru, serta menciptakan lingkungan belajar yang kondusif dan inspiratif. Mari bersama-sama kita wujudkan pendidikan berkualitas untuk masa depan bangsa yang lebih cerah. Wassalamu\'alaikum Warahmatullahi Wabarakatuh.',
};

export const initialNews: NewsItem[] = [
  {
    id: '1',
    title: 'Siswa SMAN 1 Nusantara Raih Juara 1 Olimpiade Sains Nasional',
    excerpt: 'Kebanggaan bagi seluruh warga sekolah, tim olimpiade sains berhasil meraih juara pertama tingkat nasional.',
    content:
      'Tim olimpiade sains SMA Negeri 1 Nusantara berhasil meraih juara pertama dalam ajang Olimpiade Sains Nasional (OSN) yang diselenggarakan di Jakarta. Prestasi gemilang ini merupakan hasil kerja keras siswa dan bimbingan intensif dari para guru pembimbing selama berbulan-bulan. Kepala sekolah Dr. Budi Santoso menyampaikan rasa bangga dan apresiasi kepada seluruh tim yang telah mengharumkan nama sekolah di tingkat nasional.',
    date: '2026-04-15',
    image: 'https://placehold.co/800x450/1e40af/ffffff?text=Olimpiade+Sains',
    category: 'Prestasi',
    author: 'Admin Sekolah',
  },
  {
    id: '2',
    title: 'Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027 Dibuka',
    excerpt: 'PPDB tahun ajaran 2026/2027 resmi dibuka. Daftarkan putra-putri Anda sekarang.',
    content:
      'SMA Negeri 1 Nusantara dengan bangga mengumumkan pembukaan Penerimaan Peserta Didik Baru (PPDB) untuk tahun ajaran 2026/2027. Pendaftaran dapat dilakukan secara online melalui website resmi sekolah maupun secara langsung di kantor tata usaha sekolah. Kuota yang tersedia sebanyak 360 siswa yang terbagi dalam 10 rombongan belajar.',
    date: '2026-04-10',
    image: 'https://placehold.co/800x450/059669/ffffff?text=PPDB+2026',
    category: 'Pengumuman',
    author: 'Admin Sekolah',
  },
  {
    id: '3',
    title: 'Peringatan Hari Kartini: Semangat Emansipasi di Era Modern',
    excerpt: 'Seluruh warga sekolah memperingati Hari Kartini dengan berbagai kegiatan budaya yang meriah.',
    content:
      'Dalam rangka memperingati Hari Kartini, SMA Negeri 1 Nusantara mengadakan berbagai kegiatan budaya yang melibatkan seluruh warga sekolah. Kegiatan meliputi lomba busana daerah, penampilan seni tari tradisional, dan seminar tentang peran perempuan di era modern. Acara berlangsung meriah dan penuh semangat kebangsaan.',
    date: '2026-04-21',
    image: 'https://placehold.co/800x450/dc2626/ffffff?text=Hari+Kartini',
    category: 'Kegiatan',
    author: 'Admin Sekolah',
  },
  {
    id: '4',
    title: 'Workshop Coding dan Kecerdasan Buatan untuk Siswa',
    excerpt: 'Sekolah mengadakan workshop teknologi untuk mempersiapkan siswa menghadapi era digital.',
    content:
      'Dalam upaya mempersiapkan siswa menghadapi tantangan era digital, SMA Negeri 1 Nusantara mengadakan workshop coding dan kecerdasan buatan (AI) yang diikuti oleh 120 siswa pilihan. Workshop ini menghadirkan narasumber dari perusahaan teknologi terkemuka dan berlangsung selama dua hari penuh.',
    date: '2026-04-05',
    image: 'https://placehold.co/800x450/7c3aed/ffffff?text=Workshop+Coding',
    category: 'Kegiatan',
    author: 'Admin Sekolah',
  },
];

export const initialTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Budi Santoso, M.Pd.',
    subject: 'Kepala Sekolah',
    education: 'S3 Manajemen Pendidikan - Universitas Indonesia',
    photo: 'https://placehold.co/300x300/1e40af/ffffff?text=BS',
    nip: '196501011990031001',
    position: 'Kepala Sekolah',
    level: 'SMA',
  },
  {
    id: '2',
    name: 'Siti Rahayu, S.Pd., M.Si.',
    subject: 'Matematika',
    education: 'S2 Matematika - Institut Teknologi Bandung',
    photo: 'https://placehold.co/300x300/059669/ffffff?text=SR',
    nip: '197203151998022001',
    position: 'Guru Senior',
    level: 'SMA',
  },
  {
    id: '3',
    name: 'Ahmad Fauzi, S.Pd.',
    subject: 'Fisika',
    education: 'S1 Pendidikan Fisika - Universitas Negeri Jakarta',
    photo: 'https://placehold.co/300x300/dc2626/ffffff?text=AF',
    nip: '198005202005011002',
    position: 'Guru',
    level: 'SMA',
  },
  {
    id: '4',
    name: 'Dewi Lestari, S.S., M.Hum.',
    subject: 'Bahasa Indonesia',
    education: 'S2 Linguistik - Universitas Gadjah Mada',
    photo: 'https://placehold.co/300x300/d97706/ffffff?text=DL',
    nip: '197808122003122001',
    position: 'Guru Senior',
    level: 'SMP',
  },
  {
    id: '5',
    name: 'Rudi Hermawan, S.Pd.',
    subject: 'Pendidikan Jasmani',
    education: 'S1 Pendidikan Olahraga - Universitas Negeri Surabaya',
    photo: 'https://placehold.co/300x300/7c3aed/ffffff?text=RH',
    nip: '198212302006011003',
    position: 'Guru',
    level: 'SMP',
  },
  {
    id: '6',
    name: 'Rina Kusuma, S.Kom.',
    subject: 'Informatika',
    education: 'S1 Ilmu Komputer - Universitas Bina Nusantara',
    photo: 'https://placehold.co/300x300/0891b2/ffffff?text=RK',
    nip: '198507142010012004',
    position: 'Guru',
    level: 'SD',
  },
];

export const initialFacilities: Facility[] = [
  {
    id: '1',
    name: 'Laboratorium Komputer',
    description: 'Laboratorium komputer modern dengan 40 unit komputer berspesifikasi tinggi, dilengkapi koneksi internet fiber optik berkecepatan tinggi.',
    image: 'https://placehold.co/600x400/1e40af/ffffff?text=Lab+Komputer',
    capacity: '40 siswa',
  },
  {
    id: '2',
    name: 'Perpustakaan Digital',
    description: 'Perpustakaan modern dengan koleksi lebih dari 10.000 buku fisik dan akses ke ribuan e-book serta jurnal ilmiah.',
    image: 'https://placehold.co/600x400/059669/ffffff?text=Perpustakaan',
    capacity: '100 siswa',
  },
  {
    id: '3',
    name: 'Laboratorium IPA',
    description: 'Laboratorium IPA lengkap dengan peralatan eksperimen fisika, kimia, dan biologi yang modern dan aman.',
    image: 'https://placehold.co/600x400/dc2626/ffffff?text=Lab+IPA',
    capacity: '35 siswa',
  },
  {
    id: '4',
    name: 'Aula Serbaguna',
    description: 'Aula berkapasitas besar yang dilengkapi sistem audio visual modern untuk berbagai kegiatan sekolah.',
    image: 'https://placehold.co/600x400/d97706/ffffff?text=Aula',
    capacity: '500 orang',
  },
  {
    id: '5',
    name: 'Lapangan Olahraga',
    description: 'Lapangan olahraga multifungsi yang dapat digunakan untuk basket, voli, dan futsal dengan permukaan yang aman.',
    image: 'https://placehold.co/600x400/7c3aed/ffffff?text=Lapangan',
    capacity: 'Outdoor',
  },
  {
    id: '6',
    name: 'Kantin Sehat',
    description: 'Kantin sekolah yang menyediakan makanan bergizi dan sehat dengan harga terjangkau untuk seluruh warga sekolah.',
    image: 'https://placehold.co/600x400/0891b2/ffffff?text=Kantin',
    capacity: '200 orang',
  },
];

export const initialExtracurriculars: Extracurricular[] = [
  {
    id: '1',
    name: 'Paskibra',
    description: 'Pasukan Pengibar Bendera sekolah yang bertugas pada upacara resmi dan berbagai kegiatan kenegaraan.',
    schedule: 'Setiap Jumat, 14.00 - 17.00 WIB',
    coach: 'Sertu Agus Prasetyo',
    image: 'https://placehold.co/600x400/1e40af/ffffff?text=Paskibra',
  },
  {
    id: '2',
    name: 'Basket',
    description: 'Tim basket sekolah yang aktif mengikuti berbagai kompetisi tingkat kota dan provinsi.',
    schedule: 'Senin & Rabu, 15.30 - 17.30 WIB',
    coach: 'Rudi Hermawan, S.Pd.',
    image: 'https://placehold.co/600x400/dc2626/ffffff?text=Basket',
  },
  {
    id: '3',
    name: 'Paduan Suara',
    description: 'Kelompok paduan suara yang telah meraih berbagai penghargaan di tingkat regional dan nasional.',
    schedule: 'Selasa & Kamis, 14.00 - 16.00 WIB',
    coach: 'Indah Permata, S.Sn.',
    image: 'https://placehold.co/600x400/059669/ffffff?text=Paduan+Suara',
  },
  {
    id: '4',
    name: 'Robotika',
    description: 'Klub robotika yang mengembangkan kemampuan siswa dalam bidang teknologi dan rekayasa.',
    schedule: 'Sabtu, 08.00 - 12.00 WIB',
    coach: 'Rina Kusuma, S.Kom.',
    image: 'https://placehold.co/600x400/7c3aed/ffffff?text=Robotika',
  },
  {
    id: '5',
    name: 'PMR (Palang Merah Remaja)',
    description: 'Unit PMR yang aktif dalam kegiatan sosial, kesehatan, dan kemanusiaan di lingkungan sekolah dan masyarakat.',
    schedule: 'Setiap Sabtu, 08.00 - 11.00 WIB',
    coach: 'dr. Sari Dewi',
    image: 'https://placehold.co/600x400/d97706/ffffff?text=PMR',
  },
  {
    id: '6',
    name: 'English Club',
    description: 'Klub bahasa Inggris untuk meningkatkan kemampuan komunikasi siswa dalam bahasa internasional.',
    schedule: 'Rabu, 14.00 - 16.00 WIB',
    coach: 'Maria Gonzalez, M.A.',
    image: 'https://placehold.co/600x400/0891b2/ffffff?text=English+Club',
  },
];

export const ppdbInfo: PPDBInfo = {
  id: '1',
  title: 'PPDB Tahun Ajaran 2026/2027',
  content:
    'SMA Negeri 1 Nusantara membuka Penerimaan Peserta Didik Baru (PPDB) untuk tahun ajaran 2026/2027. Proses seleksi dilakukan secara transparan dan akuntabel berdasarkan nilai rapor, prestasi, dan zonasi.',
  startDate: '2026-06-01',
  endDate: '2026-06-30',
  requirements: [
    'Ijazah/Surat Keterangan Lulus SMP/MTs atau sederajat',
    'Kartu Keluarga (KK) yang masih berlaku',
    'Akta Kelahiran',
    'Pas foto terbaru ukuran 3x4 (4 lembar)',
    'Surat Keterangan Sehat dari dokter',
    'Nilai rapor semester 1-5 SMP/MTs',
    'Piagam/sertifikat prestasi (jika ada)',
  ],
  quota: 360,
};

export const contactInfo: ContactInfo = {
  address: 'Jl. Pendidikan No. 1, Kec. Maju, Kab. Sejahtera, Provinsi Nusantara 12345',
  phone: '(021) 1234-5678',
  email: 'info@sman1nusantara.sch.id',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.194741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTEnNDEuMSJTIDEwNsKwNDknMTAuNCJF!5e0!3m2!1sen!2sid!4v1234567890',
  socialMedia: {
    facebook: 'https://facebook.com/sman1nusantara',
    whatsapp: 'https://wa.me/6281234567890',
    instagram: 'https://instagram.com/sman1nusantara',
  },
};
