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
  phone: '085923342894',
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
    'Terlaksananya Proses Pendidikan Yang Memenuhi Standar Mutu, Berkarakter, Inovatif dan Berakar Pada Budaya Bangsa Sesusai Dengan Delapan Dimensi Profil Lulusan',
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

export const initialNews: NewsItem[] = [];

export const initialTeachers: Teacher[] = [];

export const initialFacilities: Facility[] = [];

export const initialExtracurriculars: Extracurricular[] = [];

export const ppdbInfo: PPDBInfo = {
  id: '1',
  title: 'PPDB Tahun Ajaran 2026/2027',
  content:
    'SMP Seruni Putih membuka Penerimaan Peserta Didik Baru (PPDB) untuk tahun ajaran 2026/2027. Proses seleksi dilakukan secara transparan dan akuntabel berdasarkan nilai rapor, prestasi, dan zonasi.',
  startDate: '2026-06-01',
  endDate: '2026-07-30',
  requirements: [
    'Membeli Formulir Pendaftaran',
    'Foto copy Akte Kelahiran',
    'Foto copy KTP Orang Tua',
    'Foto copy Kartu Keluarga',
    'Foto copy Surat Kelulusaan SD',
    'Foto copy Ijazah SD Dilegalisir (Bisa Menyusul)',
  ],
  quota: 100,
};

export const contactInfo: ContactInfo = {
  address:
    'Jl. Benda Barat 13 No. D.33, RW.10, Pd.Benda, Kecamatan Pamulang, Kota Tangerang Selatan, Banten 15416',
  phone: '085923342894',
  email: 'seruniputih01@gmail.com',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d495.6901422782995!2d106.70609744624271!3d-6.326444000531101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e569a5eed093%3A0x58430362744f0d96!2sSekolah%20Menengah%20Pertama%20Seruni%20Putih!5e0!3m2!1sen!2sus!4v1781447398100!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade',
  socialMedia: {
    facebook: 'https://www.facebook.com/share/18xFXMMY92/',
    whatsapp: 'https://wa.me/+6285923342894',
    instagram:
      'https://www.instagram.com/yayasanseruniputih?igsh=enFmcXo1MGI0Z2dh',
  },
};
