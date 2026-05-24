import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Users } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import ImageCropUpload from '../../components/ui/ImageCropUpload';
import type { Teacher } from '../../types';
import { supabase } from '../../utils/supabase';

const LEVELS: Teacher['level'][] = ['SD', 'SMP', 'Staff'];

const levelColors: Record<Teacher['level'], string> = {
  SD:    'bg-pink-100 text-pink-700',
  SMP:   'bg-yellow-100 text-yellow-700',
  Staff: 'bg-teal-100 text-teal-700',
};

const emptyForm: Omit<Teacher, 'id'> = {
  name: '',
  subject: '',
  education: '',
  photo: '',
  nip: '',
  position: '',
  level: 'SMP',
};

const AdminTeacherPage: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Teacher | null>(null);
  const [form, setForm] = useState<Omit<Teacher, 'id'>>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: Teacher) => {
    setEditItem(item);
    setForm({
      name: item.name,
      subject: item.subject,
      education: item.education,
      photo: item.photo,
      nip: item.nip,
      position: item.position,
      level: item.level ?? 'SMP',
    });
    setModalOpen(true);
  };

  // 1. Tambahkan kata 'async' di depan
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // 2. Siapkan penampung untuk URL foto
  let finalPhotoUrl = form.photo; 

  // Paksa TypeScript menganggap ini bisa berupa objek File
  const photoData = form.photo as any;

  // 3. FASE UPLOAD: Jika yang ada di state adalah File fisik
  if (photoData instanceof File || typeof photoData === 'object') {
    const fileExt = photoData.name ? photoData.name.split('.').pop() : 'jpg';
    const fileName = `${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('foto-guru')
      .upload(fileName, photoData);

    if (uploadError) {
      alert("Gagal mengunggah foto ke server!");
      return; 
    }

    const { data: urlData } = supabase.storage
      .from('foto-guru')
      .getPublicUrl(fileName);

    finalPhotoUrl = urlData.publicUrl;
  }

  // 4. FASE MAPPING SCHEMA (Menyesuaikan React ke Database)
  const payload = {
    nama_lengkap: form.name,
    mata_pelajaran: form.subject,
    jabatan: form.position,
    kategori_jenjang: form.level || 'SMP', // fallback default
    foto_url: finalPhotoUrl
    // NIP dan Education kita abaikan karena belum ada di skema DB
  };

  // 5. FASE EKSEKUSI DATABASE
  if (editItem) {
    // Mode Update
    const { error } = await supabase
      .from('guru')
      .update(payload)
      .eq('id', editItem.id); // Cari berdasarkan ID Supabase
      
    if (error) alert("Gagal memperbarui data!");
  } else {
    // Mode Insert
    const { error } = await supabase
      .from('guru')
      .insert([payload]);
      
    if (error) alert("Gagal menyimpan guru baru!");
  }

  // 6. Tutup modal
  setModalOpen(false);
  
  // WAJIB: Panggil ulang fungsi fetch data dari database di sini agar UI ter-update
  // fetchGuruData(); 
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Manajemen Data Guru</h2>
          <p className="text-gray-500 text-sm">{teachers.length} guru terdaftar</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center space-x-2 bg-primary-700 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Guru</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama atau mata pelajaran..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Guru</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Jabatan</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    <Users className="h-10 w-10 mx-auto mb-2 opacity-40" />
                    <p>Tidak ada guru ditemukan</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        />
                        <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                        {item.subject}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[item.level ?? 'Staff']}`}>
                        {item.level ?? 'Staff'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{item.position}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Data Guru' : 'Tambah Guru Baru'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              placeholder="Nama lengkap guru"
            />
          </div>

          {/* Mata Pelajaran & Jabatan */}
          {(() => {
            const isKepala = form.position.toLowerCase().includes('kepala sekolah');
            const isOptional = form.level === 'Staff' || isKepala;
            return (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mata Pelajaran
                    {!isOptional && <span className="text-red-500"> *</span>}
                    {isOptional && <span className="text-gray-400 text-xs font-normal"> (opsional)</span>}
                  </label>
                  <input
                    type="text"
                    required={!isOptional}
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    placeholder={isOptional ? 'Kosongkan jika tidak ada' : 'Matematika'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan *</label>
                  <input
                    type="text"
                    required
                    value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    placeholder="Guru / Kepala Sekolah"
                  />
                </div>
              </div>
            );
          })()}

          {/* Kategori Jenjang */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Jenjang *</label>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setForm({
                    ...form,
                    level: lvl,
                    // Kosongkan mata pelajaran saat beralih ke Staff
                    subject: lvl === 'Staff' ? '' : form.subject,
                  })}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border-2 transition-colors ${
                    form.level === lvl
                      ? `${levelColors[lvl]} border-current`
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {lvl === 'Staff' ? 'Staff Sekolah' : `Guru ${lvl}`}
                </button>
              ))}
            </div>
          </div>

          {/* Foto */}
          <ImageCropUpload
            label="Foto Guru"
            value={form.photo}
            onChange={(val) => setForm({ ...form, photo: val })}
          />

          {/* Actions */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors text-sm font-medium"
            >
              {editItem ? 'Simpan Perubahan' : 'Tambah Guru'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteTeacher(deleteId)}
        title="Hapus Data Guru"
        message="Apakah Anda yakin ingin menghapus data guru ini?"
      />
    </div>
  );
};

export default AdminTeacherPage;
