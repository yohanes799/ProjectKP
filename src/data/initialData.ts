import type {
  NewsItem,
  Teacher,
  Facility,
  Extracurricular,
  PPDBInfo,
  SchoolProfile,
  ContactInfo,
} from '../types';

export const schoolProfile: SchoolProfile = {
  name: 'YAYASAN SERUNI PUTIH',
  address:
    'Jl. Benda Barat 13 No. D.33, RW.10, Pd.Benda, Kecamatan Pamulang, Kota Tangerang Selatan, Banten 15416',
  phone: '081282992568',
  email: 'seruniputih01@gmail.com',
  website: 'www.smpseruniputih.sch.id',
  accreditation: 'A',
  principalName: 'Sarah Ginting S.Si',
  principalName2: 'Sensiana Paga, S.S',
  foundationChairName: 'Sarah Ginting S.Si',
  founded: '1998',
  description:
    'Yayasan Seruni Putih adalah sekolah unggulan yang telah berdiri sejak tahun 1998. Dengan pengalaman lebih dari 28 tahun, kami berkomitmen untuk mencetak generasi penerus bangsa yang cerdas, berkarakter, dan berdaya saing global.',
  vision:
    'Terlaksananya Proses Pendidikan Yang Memenuhi Standar Mutu, Berkarakter, Inovatif dan Berakar Pada Budaya Bangsa Sesusai Dengan Delapan Dimensi Profit Lulusan',
  mission: [
    'Meningkatkan Tata Kelola Managerial Satuan Pendidikan Yang Adaptif, Berkarakter Dan Menjamin Mutu.',
    'Memvasilitasi Pemebelajaran Yang Menarik Menyenangkan Dan Berkarakter Sesuai Bakat Dan Minat Murid.',
    'Menciptakan Profil Lulusan Yang Bernalar Kritis Dan kreatif Sehingga Mampu Mengkreasi Ide Dan Keterampilan Yang Inovatif.',
    'Menciptakan Lingkungan Sekolah Sebagai Tempat Perkembangan Intelektual, Sosial, Emosional, Keterampilan Dan Pengembangan Budaya Lokal Dalamm Kebhinekaan Global.',
    'Menjalin kemitraaan Dengan Orang Tua Masyarakat Dan Pemerintah Dalam Keberagaman Yang Mewadahi Kreatifitas Murid Yang Berjiwa kompetitif.',
    'Meningkatkan kompetensi GTK Melalui Pelatihan Mandiri Atau Yang diselenggarakan Oleh Pihak - Pihak Lain.',
  ],
  logo: 'https://placehold.co/120x120/1e40af/ffffff?text=SMAN1',
  principalGreeting:
    'Salam sehat,Selamat datang dan selamat bergabung Bapak/Ibu  dan  Peserta didik SD Seruni Putih Pamulang pada Tahun Pembelajaran 2026/2027.Sebagai sekolah yang ramah anak, Seruni Putih hadir memberikan fasilitas pendidikan bagi putra/putri penerus bangsa. Kami hadir untuk meningkatkan kemampuan para peserta didik di bidang akademik ataupun non akademik. Dengan semangat kebersamaan, kami berkomitmen untuk turut membangun bangsa dan negara di tengah keanekaragaman yang ada.Bapak Ibu dan anak – anak yang terkasih, mengawali Tahun Pembelajaran 2025/2026 ini saya mengajak kita semua untuk tetap semangat dan lebih rajin belajar meningkatkan kemampuan di semua bidang.Mari kita belajar lebih sungguh untuk menyongsong masa depan bangsa yang lebih cerah.Trimakasih',
  foundationGreeting:
    'Assalamualaikum Warahmatullahi Wabarakatuh,Salam Sejahtera untuk kita semua. Selamat datang di website resmi SMP Seruni Putih. Syukur kita panjatkan ke hadirat Tuhan, berkat rahmat dan karunia-Nya kita dapat terus berinovasi dan menghadirkan informasi yang transparan bagi Murid, Orang tua, dan Masyarakat luas. Di era digital saat ini, website menjadi jendela informasi utama sekolah. Kami berharap platform ini dapat memudahkan akses terhadap perkembangan terbaru di SMP Seruni Putih, baik dari segi akademik, kegiatan ekstrakurikuler, maupun prestasi sekolah. Sebagai institusi pendidikan, kami berkomitmen untuk terus mencetak generasi yang cerdas, berkarakter, dan berakhlak mulia. Semua ini tentu tidak lepas dari dukungan seluruh warga sekolah, komite, dan para orang tua murid. Mari kita bersama-sama bersinergi untuk memajukan pendidikan anak-anak kita. Terima kasih atas kunjungan dan perhatian Anda. Kritik dan saran yang membangun sangat kami harapkan untuk pengembangan sekolah ke depan. Wabillahi taufiq wal hidayah, Wassalamualaikum Warahmatullahi Wabarakatuh.',
};

export const initialNews: NewsItem[] = [
  {
    id: '1',
    title: 'Siswa SMAN 1 Nusantara Raih Juara 1 Olimpiade Sains Nasional',
    excerpt:
      'Kebanggaan bagi seluruh warga sekolah, tim olimpiade sains berhasil meraih juara pertama tingkat nasional.',
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
    excerpt:
      'PPDB tahun ajaran 2026/2027 resmi dibuka. Daftarkan putra-putri Anda sekarang.',
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
    excerpt:
      'Seluruh warga sekolah memperingati Hari Kartini dengan berbagai kegiatan budaya yang meriah.',
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
    excerpt:
      'Sekolah mengadakan workshop teknologi untuk mempersiapkan siswa menghadapi era digital.',
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
    level: 'SMP',
  },
  {
    id: '2',
    name: 'Siti Rahayu, S.Pd., M.Si.',
    subject: 'Matematika',
    education: 'S2 Matematika - Institut Teknologi Bandung',
    photo: 'https://placehold.co/300x300/059669/ffffff?text=SR',
    nip: '197203151998022001',
    position: 'Guru Senior',
    level: 'SMP',
  },
  {
    id: '3',
    name: 'Ahmad Fauzi, S.Pd.',
    subject: 'Fisika',
    education: 'S1 Pendidikan Fisika - Universitas Negeri Jakarta',
    photo: 'https://placehold.co/300x300/dc2626/ffffff?text=AF',
    nip: '198005202005011002',
    position: 'Guru',
    level: 'SMP',
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
    description:
      'Laboratorium komputer modern dengan 40 unit komputer berspesifikasi tinggi, dilengkapi koneksi internet fiber optik berkecepatan tinggi.',
    image: 'https://placehold.co/600x400/1e40af/ffffff?text=Lab+Komputer',
    capacity: '40 siswa',
  },
  {
    id: '2',
    name: 'Perpustakaan Digital',
    description:
      'Perpustakaan modern dengan koleksi lebih dari 10.000 buku fisik dan akses ke ribuan e-book serta jurnal ilmiah.',
    image: 'https://placehold.co/600x400/059669/ffffff?text=Perpustakaan',
    capacity: '100 siswa',
  },
  {
    id: '3',
    name: 'Laboratorium IPA',
    description:
      'Laboratorium IPA lengkap dengan peralatan eksperimen fisika, kimia, dan biologi yang modern dan aman.',
    image: 'https://placehold.co/600x400/dc2626/ffffff?text=Lab+IPA',
    capacity: '35 siswa',
  },
  {
    id: '4',
    name: 'Aula Serbaguna',
    description:
      'Aula berkapasitas besar yang dilengkapi sistem audio visual modern untuk berbagai kegiatan sekolah.',
    image: 'https://placehold.co/600x400/d97706/ffffff?text=Aula',
    capacity: '500 orang',
  },
  {
    id: '5',
    name: 'Lapangan Olahraga',
    description:
      'Lapangan olahraga multifungsi yang dapat digunakan untuk basket, voli, dan futsal dengan permukaan yang aman.',
    image: 'https://placehold.co/600x400/7c3aed/ffffff?text=Lapangan',
    capacity: 'Outdoor',
  },
  {
    id: '6',
    name: 'Kantin Sehat',
    description:
      'Kantin sekolah yang menyediakan makanan bergizi dan sehat dengan harga terjangkau untuk seluruh warga sekolah.',
    image: 'https://placehold.co/600x400/0891b2/ffffff?text=Kantin',
    capacity: '200 orang',
  },
];

export const initialExtracurriculars: Extracurricular[] = [
  {
    id: '1',
    name: 'Paskibra',
    description:
      'Pasukan Pengibar Bendera sekolah yang bertugas pada upacara resmi dan berbagai kegiatan kenegaraan.',
    schedule: 'Setiap Jumat, 14.00 - 17.00 WIB',
    coach: 'Sertu Agus Prasetyo',
    image: 'https://placehold.co/600x400/1e40af/ffffff?text=Paskibra',
  },
  {
    id: '2',
    name: 'Basket',
    description:
      'Tim basket sekolah yang aktif mengikuti berbagai kompetisi tingkat kota dan provinsi.',
    schedule: 'Senin & Rabu, 15.30 - 17.30 WIB',
    coach: 'Rudi Hermawan, S.Pd.',
    image: 'https://placehold.co/600x400/dc2626/ffffff?text=Basket',
  },
  {
    id: '3',
    name: 'Paduan Suara',
    description:
      'Kelompok paduan suara yang telah meraih berbagai penghargaan di tingkat regional dan nasional.',
    schedule: 'Selasa & Kamis, 14.00 - 16.00 WIB',
    coach: 'Indah Permata, S.Sn.',
    image: 'https://placehold.co/600x400/059669/ffffff?text=Paduan+Suara',
  },
  {
    id: '4',
    name: 'Robotika',
    description:
      'Klub robotika yang mengembangkan kemampuan siswa dalam bidang teknologi dan rekayasa.',
    schedule: 'Sabtu, 08.00 - 12.00 WIB',
    coach: 'Rina Kusuma, S.Kom.',
    image: 'https://placehold.co/600x400/7c3aed/ffffff?text=Robotika',
  },
  {
    id: '5',
    name: 'PMR (Palang Merah Remaja)',
    description:
      'Unit PMR yang aktif dalam kegiatan sosial, kesehatan, dan kemanusiaan di lingkungan sekolah dan masyarakat.',
    schedule: 'Setiap Sabtu, 08.00 - 11.00 WIB',
    coach: 'dr. Sari Dewi',
    image: 'https://placehold.co/600x400/d97706/ffffff?text=PMR',
  },
  {
    id: '6',
    name: 'English Club',
    description:
      'Klub bahasa Inggris untuk meningkatkan kemampuan komunikasi siswa dalam bahasa internasional.',
    schedule: 'Rabu, 14.00 - 16.00 WIB',
    coach: 'Maria Gonzalez, M.A.',
    image: 'https://placehold.co/600x400/0891b2/ffffff?text=English+Club',
  },
];

export const ppdbInfo: PPDBInfo = {
  id: '1',
  title: 'PPDB Tahun Ajaran 2026/2027',
  content:
    'SMP Seruni Putih membuka Penerimaan Peserta Didik Baru (PPDB) untuk tahun ajaran 2026/2027. Proses seleksi dilakukan secara transparan dan akuntabel berdasarkan nilai rapor, prestasi, dan zonasi.',
  startDate: '2026-06-01',
  endDate: '2026-06-30',
  requirements: [
    'Membeli Formulir Pendaftaran',
    'Foto copy Akte Kelahiran',
    'Foto copy KTP Orang Tua',
    'Foto copy Kartu Keluarga',
    'Foto copy Surat Kelulusaan SD',
    'Foto copy Ijazah SD Dilegalisir (Bisa Menyusul)',
  ],
  quota: 360,
};

export const contactInfo: ContactInfo = {
  address:
    'Jl. Benda Barat 13 No. D.33, RW.10, Pd.Benda, Kecamatan Pamulang, Kota Tangerang Selatan, Banten 15416',
  phone: '081282992568',
  email: 'seruniputih01@gmail.com',
  mapEmbed:
    'https://maps.google.com/maps?q=Jl.+Benda+Barat+13+No.D33,+RW.10,+Pd.+Benda,+Kec.+Pamulang,+Kota+Tangerang+Selatan,+Banten+15416,+Indonesia&output=embed',
  socialMedia: {
    facebook: 'https://www.facebook.com/Seruniputihedu',
    whatsapp: 'https://wa.me/+6281282992568',
    instagram: 'https://instagram.com/smpseruniputih',
  },
};
