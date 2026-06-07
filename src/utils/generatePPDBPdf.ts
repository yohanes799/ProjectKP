import { jsPDF } from 'jspdf';
import type { PPDBRegistration } from '../types';
import { schoolProfile } from '../data/initialData';

// Logo dari folder public — bisa diakses di dev maupun production Vercel
const LOGO_PATH = '/serunilogo1.jpg';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const formatDateTime = (iso: string) => {
  const date = new Date(iso);
  // Cek apakah tanggal valid
  if (isNaN(date.getTime())) {
    return "Tanggal Tidak Valid"; // Atau biarkan kosong
  }
  
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Load gambar sebagai base64 dari URL
const loadImageAsBase64 = (src: string): Promise<string> =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg'));
    };
    img.onerror = () => resolve(''); // fallback jika gagal
    img.src = src;
  });

export const generatePPDBPdf = async (data: PPDBRegistration) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pageW = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentW = pageW - margin * 2;
  let y = 0;

  // ── Warna hitam putih ────────────────────────────────────
  const BLACK   = [0, 0, 0] as const;
  const WHITE   = [255, 255, 255] as const;
  const GRAY_BG = [245, 245, 245] as const;
  const GRAY_BD = [180, 180, 180] as const;
  const GRAY_LB = [100, 100, 100] as const;

  // ── KOP SURAT ────────────────────────────────────────────
  // Garis atas tebal
  doc.setDrawColor(...BLACK);
  doc.setLineWidth(1.2);
  doc.line(margin, 12, pageW - margin, 12);

  // Logo sekolah (kiri)
  const logoBase64 = await loadImageAsBase64(LOGO_PATH);
  if (logoBase64) {
    doc.addImage(logoBase64, 'JPEG', margin, 14, 22, 22);
  }

  // Teks kop — mulai dari kanan logo dengan padding
  const kopX = margin + 26; // 20 margin + 22 logo + 4 gap
  const kopW = pageW - kopX - margin;
  const kopCenterX = kopX + kopW / 2;

  doc.setTextColor(...BLACK);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(schoolProfile.name.toUpperCase(), kopCenterX, 21, { align: 'center' });

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  const addressLines = doc.splitTextToSize(schoolProfile.address, kopW);
  doc.text(addressLines[0], kopCenterX, 27, { align: 'center' });
  if (addressLines[1]) {
    doc.text(addressLines[1], kopCenterX, 31, { align: 'center' });
    doc.text(
      `Telp: ${schoolProfile.phone}  |  Email: ${schoolProfile.email}`,
      kopCenterX, 35, { align: 'center' }
    );
  } else {
    doc.text(
      `Telp: ${schoolProfile.phone}  |  Email: ${schoolProfile.email}`,
      kopCenterX, 32, { align: 'center' }
    );
  }

  // Garis bawah kop (double line)
  doc.setLineWidth(1.2);
  doc.line(margin, 37, pageW - margin, 37);
  doc.setLineWidth(0.4);
  doc.line(margin, 39, pageW - margin, 39);

  y = 46;

  // ── Judul Dokumen ────────────────────────────────────────
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('BIODATA CALON PESERTA DIDIK BARU', pageW / 2, y, { align: 'center' });
  y += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Tahun Ajaran 2026/2027', pageW / 2, y, { align: 'center' });
  y += 8;

  // Garis pemisah
  doc.setLineWidth(0.3);
  doc.setDrawColor(...GRAY_BD);
  doc.line(margin, y, pageW - margin, y);
  y += 5;

  // ── Nomor Pendaftaran ────────────────────────────────────
  doc.setFillColor(...GRAY_BG);
  doc.setDrawColor(...GRAY_BD);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentW, 11, 1, 1, 'FD');
  doc.setTextColor(...GRAY_LB);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('NOMOR PENDAFTARAN', margin + 3, y + 4.5);
  doc.setTextColor(...BLACK);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(data.id ?? 'ID Tidak Tersedia', margin + 3, y + 9.5);
  y += 15;

  // ── Helper: section title ────────────────────────────────
  const sectionTitle = (title: string) => {
    doc.setFillColor(...BLACK);
    doc.rect(margin, y, contentW, 7, 'F');
    doc.setTextColor(...WHITE);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin + 3, y + 5);
    y += 10;
  };

  // ── Helper: row ──────────────────────────────────────────
  const row = (label: string, value: string, half = false, isLeft = true) => {
    const colW = half ? contentW / 2 - 1 : contentW;
    const x = half && !isLeft ? margin + contentW / 2 + 1 : margin;

    doc.setFillColor(...GRAY_BG);
    doc.setDrawColor(...GRAY_BD);
    doc.setLineWidth(0.2);
    doc.rect(x, y, colW, 13, 'FD');

    doc.setTextColor(...GRAY_LB);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(label, x + 3, y + 4.5);

    doc.setTextColor(...BLACK);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    const lines = doc.splitTextToSize(value || '-', colW - 6);
    doc.text(lines[0], x + 3, y + 10);

    if (!half || !isLeft) y += 15;
  };

  // ── DATA SISWA ───────────────────────────────────────────
  sectionTitle('DATA CALON SISWA');
  row('Nama Lengkap', data.nama_lengkap);
  row('NISN', data.nisn, true, true);
  row('NIK', data.nik, true, false);
  row('Agama', data.agama, true, true);
  row('Jenis Kelamin', data.jenis_kelamin, true, false);
  row('Tempat Lahir', data.tempat_lahir, true, true);
  row('Tanggal Lahir', formatDate(data.tanggal_lahir), true, false);
  row('No. Telepon Siswa', data.telepon_siswa, true, true);
  row('Alamat Lengkap', data.alamat_lengkap);
  y += 3;

  // ── DATA WALI ────────────────────────────────────────────
  sectionTitle('DATA ORANG TUA / WALI');
  row('Nama Wali', data.nama_wali, true, true);
  row('Pekerjaan Wali', data.pekerjaan_wali, true, false);
  row('No. Telepon Wali', data.telepon_wali);
  y += 3;

  // ── ASAL SEKOLAH ─────────────────────────────────────────
  sectionTitle('ASAL SEKOLAH');
  row('Nama Sekolah Asal', data.sekolah_asal);
  row('Alamat Sekolah Asal', data.alamat_sekolah);
  y += 3;

  // ── INFO PENDAFTARAN ─────────────────────────────────────
  sectionTitle('INFORMASI PENDAFTARAN');
  row('Tanggal Mendaftar', formatDateTime(data.created_at || new Date().toISOString()));
  y += 6;

  // ── PROTEKSI HALAMAN Penuh (Auto Page Break) ─────────────
  // Tinggi kertas A4 adalah 297mm. Jika posisi y sudah lewat dari 240mm,
  // paksa jsPDF untuk membuat halaman baru agar tanda tangan tidak terpotong.
  if (y > 240) {
    doc.addPage();
    y = 20; // Reset y ke atas untuk halaman kedua
  }

  // ── Tanda Tangan ─────────────────────────────────────────
  const sigW = 60;
  doc.setTextColor(...BLACK);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');

  // Kiri
  doc.text('Mengetahui,', margin, y);
  doc.text('Orang Tua / Wali', margin, y + 5);
  doc.setLineWidth(0.4);
  doc.setDrawColor(...BLACK);
  doc.line(margin, y + 28, margin + sigW, y + 28);
  doc.setFontSize(8);
  // Gunakan fallback titik-titik jika nama belum terisi
  doc.text(`( ${data.nama_wali || '.......................................'} )`, margin + sigW / 2, y + 33, { align: 'center' });

  // Kanan
  const rightX = pageW - margin - sigW;
  doc.setFontSize(8.5);
  doc.text('Pendaftar,', rightX, y);
  doc.text('Calon Siswa', rightX, y + 5);
  doc.line(rightX, y + 28, rightX + sigW, y + 28);
  doc.setFontSize(8);
  doc.text(`( ${data.nama_lengkap || '.......................................'} )`, rightX + sigW / 2, y + 33, { align: 'center' });

  y += 45;

  // ── Footer ───────────────────────────────────────────────
  // Pastikan footer juga tidak keluar batas bawah halaman
  if (y > 280) {
    doc.addPage();
    y = 20;
  }
  
  doc.setLineWidth(0.3);
  doc.setDrawColor(...GRAY_BD);
  doc.line(margin, y, pageW - margin, y);
  y += 4;
  doc.setTextColor(...GRAY_LB);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'italic');
  doc.text(
    `Dokumen dicetak otomatis oleh Sistem PPDB ${schoolProfile.name}`,
    pageW / 2, y, { align: 'center' }
  );

  // ── Save ─────────────────────────────────────────────────
  const fileName = `PPDB_${data.nama_lengkap.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
};
