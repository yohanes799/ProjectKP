import React, { useState } from 'react';
import {
  GraduationCap,
  Calendar,
  CheckCircle,
  Users,
  FileText,
  Send,
  User,
  Phone,
  MapPin,
  School,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { PPDBRegistration } from '../../types';

const emptyForm: PPDBRegistration = {
  nama_lengkap: '',
  jenis_kelamin: 'Laki-laki', // Beri nilai default
  tempat_lahir: '',
  tanggal_lahir: '',
  alamat_lengkap: '',
  telepon_siswa: '',
  nama_wali: '',
  telepon_wali: '',
  sekolah_asal: '',
  alamat_sekolah: '',
  registeredAt: new Date().toISOString(),
  status: 'Menunggu',
};

const PPDBPage: React.FC = () => {
  const { ppdb, addPPDBRegistration } = useData();
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState('');

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const id = `PPDB-${Date.now()}`;
    const registration: PPDBRegistration = {
      id,
      nama_lengkap: form.nama_lengkap,
      jenis_kelamin: form.jenis_kelamin as 'Laki-laki' | 'Perempuan',
      tempat_lahir: form.tempat_lahir,
      tanggal_lahir: form.tanggal_lahir,
      alamat_lengkap: form.alamat_lengkap,
      telepon_siswa: form.telepon_siswa,
      nama_wali: form.nama_wali,
      telepon_wali: form.telepon_wali,
      sekolah_asal: form.sekolah_asal,
      alamat_sekolah: form.alamat_sekolah,
      registeredAt: new Date().toISOString(),
      status: 'Menunggu',
    };

    try {
      // Tambahkan await di sini
      const success = await addPPDBRegistration(registration);

      if (!success) throw new Error('Gagal menyimpan data');

      setRegistrationId(id);
      setSubmitted(true);
      setForm(emptyForm);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert('Gagal menyimpan data. Silakan coba lagi.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <GraduationCap className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{ppdb.title}</h1>
          <p className="text-primary-200">Penerimaan Peserta Didik Baru</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Sukses */}
        {submitted && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-green-800 mb-1">
              Pendaftaran Berhasil!
            </h3>
            <p className="text-green-700 text-sm mb-2">
              Data Anda telah berhasil dikirim. Nomor pendaftaran Anda:
            </p>
            <span className="inline-block bg-green-600 text-white font-mono font-bold px-4 py-2 rounded-lg text-sm">
              {registrationId}
            </span>
            <p className="text-green-600 text-xs mt-3">
              Simpan nomor pendaftaran ini. Kami akan menghubungi Anda melalui
              nomor telepon yang didaftarkan.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 text-sm text-green-700 underline hover:text-green-900"
            >
              Daftar lagi
            </button>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 text-center border-t-4 border-primary-600">
            <Calendar className="h-7 w-7 text-primary-600 mx-auto mb-2" />
            <p className="text-xs text-gray-500 mb-1">Tanggal Mulai</p>
            <p className="font-bold text-gray-800 text-sm">
              {formatDate(ppdb.startDate)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 text-center border-t-4 border-red-500">
            <Calendar className="h-7 w-7 text-red-500 mx-auto mb-2" />
            <p className="text-xs text-gray-500 mb-1">Tanggal Selesai</p>
            <p className="font-bold text-gray-800 text-sm">
              {formatDate(ppdb.endDate)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 text-center border-t-4 border-green-500">
            <Users className="h-7 w-7 text-green-500 mx-auto mb-2" />
            <p className="text-xs text-gray-500 mb-1">Kuota Siswa</p>
            <p className="font-bold text-gray-800 text-2xl">{ppdb.quota}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center space-x-2 mb-3">
                <FileText className="h-5 w-5 text-primary-600" />
                <h3 className="font-bold text-gray-800">Informasi PPDB</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {ppdb.content}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-gray-800">Persyaratan</h3>
              </div>
              <ul className="space-y-2">
                {ppdb.requirements.map((req, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-xs leading-relaxed">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form Pendaftaran */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6 pb-3 border-b">
                <div className="bg-primary-100 p-2 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-primary-700" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800 text-lg">
                    Form Pendaftaran
                  </h2>
                  <p className="text-gray-500 text-xs">
                    Isi data diri dengan lengkap dan benar
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Data Siswa */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <User className="h-4 w-4 text-primary-600" />
                    <h3 className="font-semibold text-gray-700 text-sm">
                      Data Calon Siswa
                    </h3>
                  </div>
                  <div className="space-y-3 pl-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.nama_lengkap}
                        onChange={(e) =>
                          setForm({ ...form, nama_lengkap: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        placeholder="Nama lengkap sesuai akta kelahiran"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Jenis Kelamin <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={form.jenis_kelamin}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            jenis_kelamin: e.target.value as
                              | 'Laki-laki'
                              | 'Perempuan',
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white"
                      >
                        <option value="">-- Pilih Jenis Kelamin --</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Tempat Lahir <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.tempat_lahir}
                          onChange={(e) =>
                            setForm({ ...form, tempat_lahir: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                          placeholder="Kota lahir"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Tanggal Lahir <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={form.tanggal_lahir}
                          onChange={(e) =>
                            setForm({ ...form, tanggal_lahir: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Alamat Lengkap <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={form.alamat_lengkap}
                        onChange={(e) =>
                          setForm({ ...form, alamat_lengkap: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none"
                        placeholder="Jl. Nama Jalan No. X, Kelurahan, Kecamatan, Kota"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Nomor Telepon Siswa{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={form.telepon_siswa}
                          onChange={(e) =>
                            setForm({ ...form, telepon_siswa: e.target.value })
                          }
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Wali */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Users className="h-4 w-4 text-primary-600" />
                    <h3 className="font-semibold text-gray-700 text-sm">
                      Data Orang Tua / Wali
                    </h3>
                  </div>
                  <div className="space-y-3 pl-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Nama Wali <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.nama_wali}
                        onChange={(e) =>
                          setForm({ ...form, nama_wali: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        placeholder="Nama orang tua / wali"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Nomor Telepon Wali{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={form.telepon_wali}
                          onChange={(e) =>
                            setForm({ ...form, telepon_wali: e.target.value })
                          }
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Asal Sekolah */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <School className="h-4 w-4 text-primary-600" />
                    <h3 className="font-semibold text-gray-700 text-sm">
                      Asal Sekolah
                    </h3>
                  </div>

                  <div className="space-y-4 pl-6">
                    {/* 1. Nama Sekolah Asal */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Nama Sekolah Asal{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <School className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          required
                          type="text"
                          value={form.sekolah_asal}
                          onChange={(e) =>
                            setForm({ ...form, sekolah_asal: e.target.value })
                          }
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                          placeholder="Nama sekolah asal"
                        />
                      </div>
                    </div>

                    {/* 2. Alamat Sekolah Asal */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Alamat Sekolah Asal{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <textarea
                          required
                          rows={2}
                          value={form.alamat_sekolah}
                          onChange={(e) =>
                            setForm({ ...form, alamat_sekolah: e.target.value })
                          }
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none"
                          placeholder="Alamat lengkap sekolah asal"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-700 text-white py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors flex items-center justify-center space-x-2 mt-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Kirim Pendaftaran</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPDBPage;
